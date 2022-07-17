import { gql } from 'apollo-server';

export default gql`
# We extend the User type from the User service.
# Our gateway only needs a reference to the Type via primary key
# to enable ALL user data to be resolved from the User service.
extend type User @key(fields: "walletId") {
  walletId: String @external
  }
type AssetBalance {
  amount: String
  value: String
}
type CryptoAsset {
  currency: String
  balance: AssetBalance,
}
type Wallet {
  walletId: ID!
  user: User
  assets: [CryptoAsset]
}
type Query {
  getWallets: [Wallet]
  getWalletById(walletId: ID): Wallet
}
  
`;