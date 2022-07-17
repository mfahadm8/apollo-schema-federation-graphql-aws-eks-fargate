import {ApolloServer,gql} from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';

const { PORT = 5002 } = process.env;

import typeDefs from "./schema"
import resolvers from './resolvers';
const server = new ApolloServer({
    schema:buildFederatedSchema([{typeDefs,resolvers}])
})

server.listen({port:PORT}).then(({url})=>{
    console.log(`server listening at ${url} `)
})