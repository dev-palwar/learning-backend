const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: String!
    friends: [User!]!
  }

  type Query {
    AllTheUsers: [User!]
    user(id: ID!): User!
  }

  input userInput {
    id: ID
    username: String!
    name: String!
    age: Int!
    nationality: String!
  }

  input updateUserNameInput {
    id: ID!
    newUsername: String!
  }

  type Mutation {
    createUser(input: userInput): User
    updateUsername(input: updateUserNameInput): User
    deleteUser(id: ID): User
  }
`;

module.exports = { typeDefs };
