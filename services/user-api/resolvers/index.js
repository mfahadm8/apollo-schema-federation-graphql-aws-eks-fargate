import {users} from '../models';


export default {

Query: {
user: async(parent,{id})=>{
    
    const userById=users.find((user)=>user.id===id);
    return userById;
}

},

User:{
    __resolveReference(reference){
        const {walletId}=reference;
        return users.find((user)=>user.walletId===walletId);
    }
}

}