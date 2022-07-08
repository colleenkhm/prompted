// import gql tagged template function
const { gql } = require('apollo-server-express');

// create typeDefs
const typeDefs = gql`
type Entry {
    _id: ID
    entryText: String
    createdAt: String
    username: String
}

type User {
    _id: ID
    username: String
    email: String
    supporterCount: Int
    entries: [Entry]
    supporters: [User]
}

type Query {
    users: [User]
    user(username: String!): User
    entries(username: String): [Entry]
    entry(_id: ID!): Entry
}
`;

// export typeDefs
module.exports = typeDefs;