// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '../../lib/graphql/typeDefs'
import resolvers from '../../lib/graphql/resolvers'
import admin from '../../lib/firebase/init-admin'
import { authServer } from '../../lib/hooks/authServer'

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: async (ctx : any) => {
    
    const db=admin.firestore()
    const session=await authServer(ctx)
    
    return {db, session, admin}
  } 
});

export  const  config  =  {
  api:  {
      bodyParser:  false
  }
};

export default server.createHandler({ path:  "/api/graphql"  })