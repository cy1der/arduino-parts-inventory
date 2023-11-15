export const schema = gql`
  type Part {
    id: Int!
    name: String!
    description: String
    availableStock: Int!
    imageUrl: String!
    createdAt: DateTime!
  }

  type PartPage {
    parts: [Part!]!
    count: Int!
    page: Int!
    sort: SortMethod!
    order: SortOrder!
    search: String
  }

  enum SortMethod {
    id
    name
    description
    stock
    createdAt
  }

  enum SortOrder {
    ascending
    descending
  }

  type Query {
    partPage(
      page: Int!
      sort: SortMethod!
      order: SortOrder!
      searchQuery: String
    ): PartPage @skipAuth
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
    updatePart(id: Int!, input: UpdatePartInput!): Part!
      @requireAuth(roles: "admin")
    deletePart(id: Int!): Part! @requireAuth(roles: "admin")
  }
`
