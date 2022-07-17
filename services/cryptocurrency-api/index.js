import restAPI from "./rest-apis";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import { ApolloGateway } from "@apollo/gateway";
import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
dotenv.config();
import {buildFederatedSchema} from "@apollo/federation"
const { PORT = 5003, COINMARKETCAP_API_KEY} =process.env;
const {CoinmarketcapAPI} = restAPI;

const server = new ApolloServer({
schema: buildFederatedSchema([{typeDefs,resolvers}]),
dataSources: ()=>{
    return {
        coinmarketcapAPI: new CoinmarketcapAPI()
    };
},
context: async ({req})=>{
    const authToken = req.headers['x-auth-key'];
    const authorized =authToken === 'key123';
    if(authToken && !authorized){
        throw new AuthenticationError("Auth Failure");
    }
    const cmcApiKey =COINMARKETCAP_API_KEY;
    return {
        
        cmcApiKey
    };
}

});

server.listen({port:PORT}).then(({url}) =>{
    console.log(`server ready at ${url} ${COINMARKETCAP_API_KEY}`)
} )