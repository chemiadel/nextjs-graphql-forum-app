import { gql } from 'apollo-server-micro'

const typeDefs =gql`
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
        bio: String
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
        savedPosts : [Post]
        likedPosts : [Post]
      }
      
#QUERY
      type Query {
        Me : User
        Posts (page: Int, tags: String) : [Post]
        Post (nid: String!, slug:String!) : Post
        User (username: String!): User
        checkUsername ( username: String! ): Boolean

        Like ( pid: String! ): Boolean
        Save ( pid: String! ): Boolean
        Follow ( to_uid: String! ): Boolean

      }
#MUTATION
      type Mutation {
        addPost( input : inputPost! ) : Post
        editUser( input: inputUser! ) : User

        toggleLike ( pid: String! ) : Boolean
        toggleSave ( pid: String! ) : Boolean
        toggleFollow ( to_uid: String! ) : Boolean
      }
`
export default typeDefs