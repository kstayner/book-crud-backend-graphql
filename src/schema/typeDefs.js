const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    nationality: String!
    books: [Book!]!
  }

  type Book {
    id: ID!
    title: String!
    publication_year: Int!
    author_id: Int!
    author: Author!
  }

  input AuthorInput {
    name: String!
    nationality: String!
  }

  input BookInput {
    title: String!
    publication_year: Int!
    author_id: Int!
  }

  type Query {
    # Author queries
    authors: [Author!]!
    author(id: ID!): Author
    
    # Book queries
    books: [Book!]!
    book(id: ID!): Book
    booksByAuthor(authorId: ID!): [Book!]!
  }

  type Mutation {
    # Author mutations
    createAuthor(input: AuthorInput!): Author!
    updateAuthor(id: ID!, input: AuthorInput!): Author!
    deleteAuthor(id: ID!): Boolean!
    
    # Book mutations
    createBook(input: BookInput!): Book!
    updateBook(id: ID!, input: BookInput!): Book!
    deleteBook(id: ID!): Boolean!
  }
`;

module.exports = typeDefs;