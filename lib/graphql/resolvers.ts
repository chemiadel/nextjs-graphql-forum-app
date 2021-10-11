import admin from '../firebase/init-admin'
import { customAlphabet  } from 'nanoid'
var slug = require('slug')

const nanoid = customAlphabet('1234567890', 6)

const resolvers = {
    Query : {
        Posts: async (parent: any, args: any, {db} : any) => {

            let postsRef = db.collection('posts')
            let snapshot = await postsRef
            .where('published','==',true)
            .orderBy("created","desc")
            // .startAt(args?.page || 0)
            .limit(4)
            .get()
            
            if (snapshot.empty) {
            console.log('No matching documents.');
            return []
            }  
            
            var data : any =[]
            snapshot.forEach((doc: any) => {
                // console.log(doc.id, '=>', doc.data());
                data.push({
                    id:doc.id,
                    ...doc.data()
                })
            });
    
            return data
        },
        Comments : async (parent: any, args: any, {db} : any) => {
            let postsRef = db.collection('comments')
            let snapshot = await postsRef
            .where('pid','==',args.pid)
            .get()
            
            if (snapshot.empty) {
            console.log('No matching documents.');
            return []
            }  
            
            var data : any =[]
            snapshot.forEach((doc: any) => {
                // console.log(doc.id, '=>', doc.data());
                data.push({
                    id:doc.id,
                    ...doc.data()
                })
            });
    
            return data
        },
        Post: async (parent: any, args: any, {db, session} : any) => {
            let postsRef = db.collection('posts')
            let snapshot = await postsRef
            .where('nid','==',args.nid)
            .where('slug','==',args.slug)
            .get()
            
            if (snapshot.empty) {
            console.log('No matching documents.');
            return null
            }  
            
            var data : any ={}
            snapshot.forEach((doc: any) => {
                // console.log(doc.id, '=>', doc.data());
                data={
                    id:doc.id,
                    ...doc.data()
                }
            });
            
            if(data.published===true) return data
            if(data.published===false && session?.uid===data.uid) return data
            return null
        },
        User: async (parent: any, args: any, {db, admin} : any) => {
            const userDoc=await db.collection('users').doc(args.username).get()
            if(!userDoc.exists) return null
    
            const userData=userDoc?.data()
            if(!userData) return null
            
            return admin
            .auth()
            .getUser(userData.uid)
            .then((userRecord: any) => ( {...userRecord, username: userRecord.customClaims.username} ) )
            .catch((error: any) => console.log('res.POST.user',error ));
    
        },
        checkUsername : async (parent: any, args: any, { db, session } : any) =>  {
            const doc = await db.collection('users').doc(args.username).get()
            const docData = doc.data()

            if (doc.exists && (docData.uid!==session.uid)) return false
        
            return true
        },
        Like : async (parent: any, args: any, { db, session } : any) =>  {
            const query = db.collection('likes')
            .where('uid','==',session.uid)
            .where('pid','==',args.pid)

            const QuerySnapshot = await query.get()
            return !QuerySnapshot.empty

        },
        Save : async (parent: any, args: any, { db, session} : any) =>  {
            const query = db.collection('saves')
            .where('uid','==',session.uid)
            .where('pid','==',args.pid)

            const QuerySnapshot = await query.get()
            return !QuerySnapshot.empty

        },
        Follow : async (parent: any, args: any, { db, session} : any) =>  {

            const query = db.collection('follows')
            .where('uid','==',session.uid)
            .where('to_uid','==',args.to_uid)

            const QuerySnapshot = await query.get()
            return !QuerySnapshot.empty
        },
        Me : async (parent: any, args: any, { db, session} : any) => {
            const userDoc=await db.collection('users').doc(session.username).get()
            const userData=userDoc?.data()

            return admin
            .auth()
            .getUser(userData?.uid)
            .then((userRecord: any) => ( {...userRecord, username: userRecord.customClaims.username} ) )
            .catch((error: any) => console.log('res.POST.user',error ));
        }
    },
    Mutation: {
        addPost: async (parent: any, {input}: any, { db, session} : any) => {

            const collection = db.collection('posts');
            const result=await collection.add({
                ...input,
                tags: input?.tags?.split(",").map((tag : string) =>slug(tag)) || [],
                created: new Date(),
                nid: nanoid(),
                slug: slug(input.title),
                uid: session.uid
            })
    
            return { id: result.id }
        },
        editPost: async (parent: any, { pid, input}: any, { db, session} : any) => {

            const doc = db.collection('posts').doc(pid)
            const docData= await doc.get().then((doc:any)=>doc.data())

            if(session.uid!==docData.uid) return null

            return await doc.set({
                ...input,
                tags: input?.tags?.split(",").map((tag : string) =>slug(tag)) || [],
            }, { merge: true })
            .then(() => ({id: pid}))

        },
        addComment: async (parent: any, args: any, { db, session} : any) => {
            const collection = db.collection('comments');
            const result=await collection.add({
                uid: session.uid,
                created: new Date(),
                pid: args.pid,
                comment: args.comment
            })
    
            return { id: result.id }
        },
        deleteComment: async (parent: any, args: any, { db, session} : any) => {
            return await db.collection("comments")
            .doc(args.commentId)
            .where("uid", "==", session.uid)
            .get()
            .then((querySnapshot: any) => querySnapshot?.docs[0]?.delete())
            .then(() => true)
        },
        editUser : async (parent: any, args: any, { db, session } : any) => {
                const isAvailable= await checkUsername(parent, args, { db, session })
                console.log("isAvailable", isAvailable)

                if(!isAvailable) return null
                
                const ref= db.collection('users')

                if(session.username) await ref.doc(session.username).delete()

                await ref.doc(args.input.username).set({
                    uid: session.uid
                })

                await admin
                .auth()
                .setCustomUserClaims(session.uid, { 
                    username: args.input.username,
                    name: args.input.name                
                })
                
                const newDoc= await ref.doc(args.input.username).get()
                const newData=newDoc.data()

                console.log('changed',newData)
                return { 
                    uid: session.uid ,
                    ...args.input
                }
        },
        toggleLike: async (parent: any, args: any, { db, session } : any) => {

            return db.collection('likes')
            .where('uid','==',session.uid)
            .where('pid','==',args.pid)
            .get()
            .then((QuerySnapshot : any) => {
                if(QuerySnapshot.empty){
                    db.collection('likes').doc().set({
                        pid: args.pid,
                        uid: session.uid
                    })
                    return true
                }
    
                QuerySnapshot.docs[0].delete()
                return false
            })



        },
        toggleSave: async (parent: any, args: any, { db, session } : any) => {
            return db.collection('saves')
            .where('uid','==',session.uid)
            .where('pid','==',args.pid)
            .get()
            .then((QuerySnapshot : any) => {
                if(QuerySnapshot.empty){
                    db.collection('saves').doc().set({
                        pid: args.pid,
                        uid: session.uid
                    })
                    return true
                }
    
                QuerySnapshot.docs[0].delete()
                return false
            })

        },
        toggleFollow: async (parent: any, args: any, { db, session } : any) => {
            return db.collection('saves')
            .where('uid','==',session.uid)
            .where('pid','==',args.pid)
            .get()
            .then((QuerySnapshot : any) => {
                if(QuerySnapshot.empty){
                    db.collection('saves').doc().set({
                        pid: args.pid,
                        uid: session.uid
                    })
                    return true
                }
    
                QuerySnapshot.docs[0].delete()
                return false
            })

        },
    },
    Post : {
        user : async (parent: any, args: any, {db, admin} : any) => {
            
            return admin
            .auth()
            .getUser(parent.uid)
            .then((userRecord: any) => (
                // console.log('userRecord',userRecord),
                {...userRecord, username: userRecord.customClaims.username}) 
                )
            .catch((error: any) => console.log('res.POST.user',error ));
    
        },
        like : async (parent: any, args: any, context : any) =>  {
            const session = context.session
            if(!session) return null

            const query = context.db.collection('likes')
            .where('uid','==',session.uid)
            .where('pid','==',parent.id)

            const QuerySnapshot = await query.get()

            return !QuerySnapshot.empty
        },
        save : async (parent: any, args: any, context : any) =>  {
            const session = context.session
            if(!session) return null

            const query = context.db.collection('saves')
            .where('uid','==',session.uid)
            .where('pid','==',parent.id)

            const QuerySnapshot = await query.get()

            return !QuerySnapshot.empty
        },
        likes : async (parent: any, args: any, context : any) =>  null,
        saves : async (parent: any, args: any, context : any) =>  null,

    },
    User : {
        posts : async (parent: any, args: any, {db, admin} : any) => {
            const snapshot = await db.collection('posts')
            .where('uid','==',parent.uid)
            .where('published','==',true).get()

            if (snapshot.empty) {
            console.log('No matching documents.');
            return []
            }  
            
            var data : any =[]
            snapshot.forEach((doc: any) => {
                // console.log(doc.id, '=>', doc.data());
                data.push({
                    id:doc.id,
                    ...doc.data()
                })
            });

            return data
        } 
    },
    Me : {
        posts : async (parent: any, args: any, {db} : any) => {
            let postsRef = db.collection('posts')
            let snapshot = await postsRef
            // .where('published','==',true)
            .where('uid','==',parent.uid)
            // .orderBy("created","desc")
            // .startAt(args?.page || 0)
            // .limit(4)
            .get()
            
            if (snapshot.empty) {
            console.log('No matching documents.');
            return []
            }  
            
            var data : any =[]
            snapshot.forEach((doc: any) => {
                // console.log(doc.id, '=>', doc.data());
                data.push({
                    id:doc.id,
                    ...doc.data()
                })
            });
    
            return data
        },
        savedPosts : async (parent: any, args: any, {db} : any) => {
            let postsRef = db.collection('saves')
            let snapshot = await postsRef
            // .where('published','==',true)
            .where('uid','==',parent.uid)
            // .orderBy("created","desc")
            // .startAt(args?.page || 0)
            // .limit(4)
            .get()
            
            if (snapshot.empty) {
            console.log('No matching documents.');
            return []
            }  
            
            var data : any =[]
            snapshot.forEach((doc: any) =>  data.push(db.collection('posts').doc(doc.data().pid)
                .get()
                .then( (postDoc:any)=> ( { id:postDoc.id, ...postDoc.data() } ) )
            ))
            
            const solvedData=await Promise.all(data)
            return solvedData
        }
    },
    Comment : {
        user : async (parent: any, args: any, {db, admin} : any) => {
            
            return admin
            .auth()
            .getUser(parent.uid)
            .then((userRecord: any) => (
                // console.log('userRecord',userRecord),
                {...userRecord, username: userRecord.customClaims.username}) 
                )
            .catch((error: any) => console.log('res.POST.user',error ));
    
        },
    }
};


    
const checkUsername = async (parent: any, args: any, { db, session } : any) =>  {
    const doc = await db.collection('users').doc(args.input.username).get()
    
    if (doc.exists) {
        const docData = doc.data()
        if(docData.uid!==session.uid) return true

        return true
    } 

    return ({
        isAvailable:true
    })
}

export default resolvers