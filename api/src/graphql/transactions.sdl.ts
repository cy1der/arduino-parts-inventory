export const schema = gql`
  type Transaction {
    id: Int!
    date: DateTime!
    user: User!
    userId: Int!
    type: TransactionType!
    parts: [JSON]!
  }

  enum TransactionType {
    in
    out
  }

  enum FilterTransactionsByType {
    in
    out
    both
  }

  type UserTransactions {
    transactions: [Transaction!]!
    filter: FilterTransactionsByType!
  }

  type Query {
    transactions(filter: FilterTransactionsByType!): UserTransactions!
      @requireAuth(roles: "admin")
    transaction(id: Int!): Transaction @requireAuth(roles: "admin")
    userTransactions(
      userId: Int!
      filter: FilterTransactionsByType!
    ): UserTransactions! @requireAuth
  }

  input CreateTransactionInput {
    date: DateTime!
    userId: Int!
    type: TransactionType!
    parts: [JSON]!
  }

  input UpdateTransactionInput {
    date: DateTime
    userId: Int
    type: TransactionType
    parts: [JSON]!
  }

  type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction! @requireAuth
    returnTransaction(id: Int!, userId: Int!): Transaction! @requireAuth
    updateTransaction(id: Int!, input: UpdateTransactionInput!): Transaction!
      @requireAuth(roles: "admin")
    deleteTransaction(id: Int!): Transaction! @requireAuth(roles: "admin")
  }
`
