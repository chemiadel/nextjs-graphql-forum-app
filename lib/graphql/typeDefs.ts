import { gql } from 'apollo-server-micro'

export const typeDefs =gql`
#Scalars
      scalar Date

#Enums
      enum enumPost {
        post
      }

#POST
      input inputPost {
        title: String!
        tags: String
        published: Boolean
        content: inputContent
      }

      input inputContent {
        type: enumPost!
        data: String!
      }

      type Post {
        id: ID!
        created: Date
        uid: String
        nid: String
        slug: String
        title: String
        tags: [String]
        published: Boolean
        content: Content
        user: User
        like: Boolean
        save: Boolean
        likes: Int
        saves: Int
      }

      type Content {
        type: String,
        data: String
      }

#USER
      type User {
        uid: ID!
        username: String
        email: String
        displayName: String
        photoURL: String
        bio: String
        posts: [Post]
      }

      input inputUser {
        username: String!
        name: String
      }


#ME   
      type Me {
        uid: ID!
        username: String
        email: String
        displayName: String
        photoURL: String
        bio: String
        posts: [Post]
        comments: [Comment]
        savedPosts : [Post]
        likedPosts : [Post]
      }

#Comment
      type Comment {
        id: ID!
        created: Date
        uid: String
        comment: String
        user: User
      }

#QUERY
      type Query {
        Me : Me
        Posts (page: Int) : [Post]
        Comments ( pid: String! ) : [Comment]
        Post (nid: String!, slug:String!) : Post
        User (username: String!): User
        checkUsername ( username: String! ): Boolean
        TopTags : [String]

        Like ( pid: String! ): Boolean
        Save ( pid: String! ): Boolean
        Follow ( to_uid: String! ): Boolean
      }

#MUTATION
      type Mutation {
        addPost( input : inputPost! ) : Post
        editPost( pid:String, input : inputPost! ) : Post

        addComment ( pid:String!, comment: String! ) : Comment
        deleteComment (commentId: String!) : Boolean
        editUser( input: inputUser! ) : User

        toggleLike ( pid: String! ) : Boolean
        toggleSave ( pid: String! ) : Boolean
        toggleFollow ( to_uid: String! ) : Boolean
      }
`
export default typeDefs