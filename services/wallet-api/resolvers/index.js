//import wallets data
import { wallets } from '../models';

//Define resolvers
export default {
  Query: {
    getWallets: async (parent) => {
      return wallets;
    },
    getWalletById: async (parent, { walletId }) => {
        console.log(wallets);
        console.log(walletId);
      const walletById = wallets.find((wallet) => wallet.walletId === walletId);
      return walletById;
    }
  },
  Wallet: {
    // Our wallet contains the User entity extended from the User service
    // To resolve user data, we send a wallet ID reference to find the owner of the wallet
    user(reference) {
      //'reference' contains wallet information including the wallet ID
      const { walletId } = reference;
      return { __typename: "User", walletId: walletId };
    }
  }
};