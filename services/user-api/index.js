import {ApolloServer,gql} from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";
import { spawn } from 'child_process'
import fs from 'fs'

import resolvers from "./resolvers";
import typeDefs from "./schema";

const {PORT=5001} =process.env;

const server=new ApolloServer({
    schema: buildFederatedSchema([{typeDefs,resolvers}])
});

server.listen({port: PORT}).then(({url}) => {
console.log(`Server ready at ${url}`)

const child = spawn('node', [
    'dist/server.js'
  ], {
    detached: true,
    stdio: 'ignore'
  })
  child.unref()
  
  if (typeof child.pid !== 'undefined') {
    fs.writeFileSync('.server.pid', child.pid, {
      encoding: 'utf8'
    })
  }
});