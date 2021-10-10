
import { shield, rule, and, or, inputRule } from 'graphql-shield'

const isAuth = rule()(async (parent, args, {session}, info) => {
  return session!==null
})

const hasUsername = rule()(async (parent, args, {session}, info) => {
  return session.username!==null
})

const permissions = shield({
  Mutation: {
    addPost: isAuth,
    editPost: isAuth,
    addComment: isAuth,
    deleteComment: isAuth,
    editUser: isAuth,
    toggleLike: isAuth,
    toggleSave: isAuth,
    toggleFollow: isAuth
  },
})

export default permissions