export const schema = gql`
  type Part {
    id: Int!
    name: String!
    description: String
    availableStock: Int!
    imageUrl: String!
    createdAt: DateTime!
  }

  type Query {
    parts: [Part!]! @skipAuth
    part(id: Int!): Part @skipAuth
  }

  input CreatePartInput {
    name: String!
    description: String
    availableStock: Int!
    imageUrl: String!
  }

  input UpdatePartInput {
    name: String
    description: String
    availableStock: Int
    imageUrl: String
  }

  type Mutation {
    createPart(input: CreatePartInput!): Part! @requireAuth
    updatePart(id: Int!, input: UpdatePartInput!): Part! @requireAuth
    deletePart(id: Int!): Part! @requireAuth
  }
`
