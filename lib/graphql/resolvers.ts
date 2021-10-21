import { customAlphabet  } from 'nanoid'
import * as admin from 'firebase-admin/lib/firebase-namespace'

var slug = require('slug')

const nanoid = customAlphabet('1234567890', 6)

type TContext = {
    db : admin.firestore.Firestore,
    session: any,
    auth: admin.auth.Auth
}

const resolvers = {
    Query : {
        Posts: (parent: any, args: any, {db} : TContext) => {
            return  db.collection("posts")
                        .orderBy("created","desc")
                        .where('published','==',true)
                        .offset((args.page || 0) * 4)
                        .limit(4)
                        .get()
                        .then( (snapshot : admin.firestore.QuerySnapshot ) => {
                            return snapshot
                            .docs
                            .map((doc : admin.firestore.DocumentSnapshot)=> ({id: doc.id, ...doc.data() }))
                        })  
            
        },
        PostsByTag: (parent: any, {tag, page}: {tag: string, page: number}, {db} : TContext) => {
            return db.collection('posts')
            .orderBy("created","desc")
            .where('tags', 'array-contains', tag)
            .offset((page || 0) * 4)
            .limit(4)
            .get()
            .then( (snapshot : admin.firestore.QuerySnapshot ) => {
                return snapshot
                .docs
                .map((doc : admin.firestore.DocumentSnapshot)=> ({id: doc.id, ...doc.data() }))
            }) 
        },
        Search: (parent: any, {queryText}: {queryText:string}, {db} : TContext) => {
            return db.collection('posts')
            .where('slug', '>=', queryText).where('slug', '<=', queryText+ '\uf8ff')
            .limit(5)
            .get()
            .then( (snapshot : admin.firestore.QuerySnapshot ) => {
                return snapshot
                .docs
                .map((doc : admin.firestore.DocumentSnapshot)=> ({id: doc.id, ...doc.data() }))
            }) 
        },
        Comments : async (parent: any, args: any, {db} : TContext) => {
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
        Post: async (parent: any, args: any, {db, session} : TContext) => {
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
        User: async (parent: any, args: any, {db, auth} : TContext) => {
            const userDoc=await db.collection('users').doc(args.username).get()
            if(!userDoc.exists) return null
    
            const userData=userDoc?.data()
            if(!userData) return null
            
            return auth
            .getUser(userData.uid)
            .then((userRecord: any) => ( {...userRecord, username: userRecord.customClaims.username} ) )
            .catch((error: any) => console.log('res.POST.user',error ));
    
        },
        checkUsername : async (parent: any, args: any, { db, session } : TContext) =>  {
            const doc = await db.collection('users').doc(args.username).get()
            const docData = doc.data()

            if (doc.exists && (docData?.uid!==session.uid)) return false
        
            return true
        },
        Like : async (parent: any, args: any, { db, session } : TContext) =>  {
            const query = db.collection('likes')
            .where('uid','==',session.uid)
            .where('pid','==',args.pid)

            const QuerySnapshot = await query.get()
            return !QuerySnapshot.empty

        },
        Save : async (parent: any, args: any, { db, session} : TContext) =>  {
            const query = db.collection('saves')
            .where('uid','==',session.uid)
            .where('pid','==',args.pid)

            const QuerySnapshot = await query.get()
            return !QuerySnapshot.empty

        },
        Follow : async (parent: any, args: any, { db, session} : TContext) =>  {

            const query = db.collection('follows')
            .where('uid','==',session.uid)
            .where('to_uid','==',args.to_uid)

            const QuerySnapshot = await query.get()
            return !QuerySnapshot.empty
        },
        Me : async (parent: any, args: any, { db, session, auth} : TContext) => {
            const userDoc=await db.collection('users').doc(session.username).get()
            const userData=userDoc?.data()

            return auth
            .getUser(userData?.uid)
            .then((userRecord: any) => ( {...userRecord, username: userRecord.customClaims.username} ) )
            .catch((error: any) => console.log('res.POST.user',error ));
        },
        TopTags : async (parent: any, args: any, { db, session} : TContext) => {
            return db.collection('posts')
            .where('published','==',true)
            .get()
            .then(async (snapshot : any)=>{
                if (!snapshot.empty) {

                    var tagsArr : string[]=[]
                    snapshot.forEach((doc : any)=> {
                        tagsArr.push( ...doc.data().tags )
                    })

                    // var allTypesArray : string[] = ["4", "4", "2", "2", "2", "6", "2", "6", "6"];
                    var map = tagsArr.reduce<Record<string, any>>((p, c) => {
                    p[c] = (p[c] || 0) + 1;
                    return p;
                    }, {});

                    var newTypesArray = Object.keys(map).sort(function(a, b) {
                    return map[b] - map[a];
                    });

                    console.log({newTypesArray})
                    return newTypesArray
                }  
            })
        }
    },
    Mutation: {
        addPost: async (parent: any, {input}: any, { db, session} : TContext) => {

            const collection = db.collection('posts');
            const result=await collection.add({
                ...input,
                tags: input?.tags?.split(",").filter((word:string) => word.trim().length > 0).map((tag : string) =>slug(tag)) || [],
                created: new Date(),
                nid: nanoid(),
                slug: slug(input.title),
                uid: session.uid
            })
    
            return { id: result.id }
        },
        editPost: async (parent: any, { pid, input}: any, { db, session} : TContext) => {

            const doc = db.collection('posts').doc(pid)
            const docData= await doc.get().then((doc:any)=>doc.data())

            if(session.uid!==docData.uid) return null

            return await doc.set({
                ...input,
                tags: input?.tags?.split(",").filter((word:string) => word.trim().length > 0).map((tag : string) =>slug(tag)) || [],
            }, { merge: true })
            .then(() => ({id: pid}))

        },
        addComment: async (parent: any, args: any, { db, session} : TContext) => {
            const collection = db.collection('comments');
            const result=await collection.add({
                uid: session.uid,
                created: new Date(),
                pid: args.pid,
                comment: args.comment
            })
    
            return { id: result.id }
        },
        deleteComment: async (parent: any, args: any, { db, session} : TContext) => {
            return await db.collection("comments")
            .doc(args.commentId)
            .get()
            .then((querySnapshot: any) => {
                let doc=querySnapshot?.docs[0]

                if(doc.uid!==session.uid) return false

                doc.delete()
                return true
            })
        },
        editUser : async (parent: any, args: any, { db, session, auth } : TContext) => {
                const isAvailable= await checkUsername(parent, args, { db, session })
                console.log("isAvailable", isAvailable)

                if(!isAvailable) return null
                
                const ref= db.collection('users')

                if(session.username) await ref.doc(session.username).delete()

                await ref.doc(args.input.username).set({
                    uid: session.uid
                })

                await auth
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
        toggleLike: async (parent: any, args: any, { db, session } : TContext) => {

            return db.collection('likes')
            .where('uid','==',session.uid)
            .where('pid','==',args.pid)
            .get()
            .then((QuerySnapshot : any) => {
                if(QuerySnapshot.empty){
                    db.collection('likes').add({
                        pid: args.pid,
                        uid: session.uid
                    })
                    return true
                }
    
                QuerySnapshot.docs[0].ref.delete()
                return false
            })



        },
        toggleSave: async (parent: any, args: any, { db, session } : TContext) => {
            return db.collection('saves')
            .where('uid','==',session.uid)
            .where('pid','==',args.pid)
            .get()
            .then((QuerySnapshot : any) => {
                if(QuerySnapshot.empty){
                    db.collection('saves').add({
                        pid: args.pid,
                        uid: session.uid
                    })
                    return true
                }
    
                QuerySnapshot.docs[0].ref.delete()
                return false
            })

        },
        toggleFollow: async (parent: any, args: any, { db, session } : TContext) => {
            return db.collection('follows')
            .where('uid','==',session.uid)
            .where('to_uid','==',args.to_uid)
            .get()
            .then((QuerySnapshot : any) => {
                if(QuerySnapshot.empty){
                    db.collection('follows').add({
                        to_uid: args.to_uid,
                        uid: session.uid
                    })
                    return true
                }
    
                QuerySnapshot.docs[0].ref.delete()
                return false
            })

        },
    },
    Post : {
        user : async (parent: any, args: any, {db, auth} : TContext) => {
            
            return auth
            .getUser(parent.uid)
            .then((userRecord: any) => (
                // console.log('userRecord',userRecord),
                {...userRecord, username: userRecord.customClaims.username}) 
                )
            .catch((error: any) => console.log('res.POST.user',error ));
    
        },
        like : async (parent: any, args: any, context : TContext) =>  {
            const session = context.session
            if(!session) return null

            const query = context.db.collection('likes')
            .where('uid','==',session.uid)
            .where('pid','==',parent.id)

            const QuerySnapshot = await query.get()

            return !QuerySnapshot.empty
        },
        save : async (parent: any, args: any, context : TContext) =>  {
            const session = context.session
            if(!session) return null

            const query = context.db.collection('saves')
            .where('uid','==',session.uid)
            .where('pid','==',parent.id)

            const QuerySnapshot = await query.get()

            return !QuerySnapshot.empty
        },
        likes : async (parent: any, args: any, context : TContext) =>  null,
        saves : async (parent: any, args: any, context : TContext) =>  null,

    },
    User : {
        posts : async (parent: any, args: any, {db} : TContext) => {
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
        posts : async (parent: any, args: any, {db} : TContext) => {
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
        savedPosts : async (parent: any, args: any, {db} : TContext) => {

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
        user : async (parent: any, args: any, {db, auth} : TContext) => {
            
            return auth
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