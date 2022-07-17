import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";
import { ApolloServer, gql } from 'apollo-server';
import dotenv from "dotenv";


dotenv.config();

const { PORT = 4000 } = process.env;

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
 willSendRequest({request,context}){
  const {authKey} = context;
  if (authKey){
    request.http.headers.set('x-auth-key',authKey);
  }
 }
}

(async () => {

  const gateway = new ApolloGateway({

    buildService({ name, url }) {
      return new AuthenticatedDataSource({ url });
    },
    serviceList: [
      { name: 'user-api', url: 'http://localhost:5001' },
      { name: 'wallet-api', url: 'http://localhost:5002' },
      {name: 'cryptocurrency-api',url:'http://localhost:5003'}
    ]
  });




  const server = new ApolloServer({
    context: async ({req}) => {
      const authKey = 'key123'
      return {
        authKey
      };
    },
    gateway,
    subscriptions: false,
  });

  server.listen({ port: PORT }).then(({ url }) => {
    console.log(` server ready at ${url}`);
  });

})();