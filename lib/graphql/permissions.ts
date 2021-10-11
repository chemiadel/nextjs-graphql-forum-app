
import { shield, rule, and, or, inputRule } from 'graphql-shield'
import { profileSchema, postSchema, commentSchema} from './validations'

const isAuth = rule()(async (parent, args, {session}, info) => {
  return session!==null
})

const isCompleted = rule()(async (parent, args, {session}, info) => {
  return session.username!==null
})

const permissions = shield({
  Mutation: {
    editUser: isAuth,
    addPost: and(isAuth,isCompleted),
    editPost: and(isAuth,isCompleted),
    addComment: and(isAuth,isCompleted),
    deleteComment: and(isAuth,isCompleted),
    toggleLike: and(isAuth,isCompleted),
    toggleSave: and(isAuth,isCompleted),
    toggleFollow: and(isAuth,isCompleted)
  },
})

const postValidation = rule()(async (parent, args, ctx, info) => {
  return args
})


const profileValidation = rule()(async (parent, args, ctx, info) => {
  return args
})


const commentValidation = rule()(async (parent, args, ctx, info) => {
  return args
})


export default permissions