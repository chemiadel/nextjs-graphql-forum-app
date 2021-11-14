// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApolloServer, makeExecutableSchema } from 'apollo-server-micro';
import { permissions, typeDefs, resolvers} from '@/lib/graphql'
import admin from '@/lib/firebase/init-admin'
import { authServer } from '@/lib/hooks/authServer';
import { applyMiddleware } from 'graphql-middleware'


const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  // permissions,
)

const server = new ApolloServer({ 
  schema,
  context: async (ctx : any) => {
    const session = await authServer(ctx)
    const db = admin.firestore()
    const auth = admin.auth()
    return {session, db, auth}
  },
});

export const  config  =  {
  api: {
      bodyParser:  false
  }
};

export default server.createHandler({ path:  "/api/graphql"  })