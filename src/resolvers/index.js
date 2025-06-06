const authorResolvers = require('./authorResolvers');
const bookResolvers = require('./bookResolvers');

// Merge all resolvers
const resolvers = {
  Query: {
    ...authorResolvers.Query,
    ...bookResolvers.Query
  },
  Mutation: {
    ...authorResolvers.Mutation,
    ...bookResolvers.Mutation
  },
  Author: authorResolvers.Author,
  Book: bookResolvers.Book
};

module.exports = resolvers;