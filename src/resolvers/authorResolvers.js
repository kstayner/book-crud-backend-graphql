const AuthorService = require('../services/authorService');
const BookService = require('../services/bookService');

const authorResolvers = {
  Query: {
    authors: async () => {
      try {
        return await AuthorService.getAllAuthors();
      } catch (error) {
        throw new Error(`Failed to fetch authors: ${error.message}`);
      }
    },

    author: async (_, { id }) => {
      try {
        const author = await AuthorService.getAuthorById(id);
        if (!author) {
          throw new Error('Author not found');
        }
        return author;
      } catch (error) {
        throw new Error(`Failed to fetch author: ${error.message}`);
      }
    }
  },

  Mutation: {
    createAuthor: async (_, { input }) => {
      try {
        const { name, nationality } = input;
        return await AuthorService.createAuthor(name, nationality);
      } catch (error) {
        throw new Error(`Failed to create author: ${error.message}`);
      }
    },

    updateAuthor: async (_, { id, input }) => {
      try {
        const { name, nationality } = input;
        const updated = await AuthorService.updateAuthor(id, name, nationality);
        
        if (!updated) {
          throw new Error('Author not found');
        }
        
        return await AuthorService.getAuthorById(id);
      } catch (error) {
        throw new Error(`Failed to update author: ${error.message}`);
      }
    },

    deleteAuthor: async (_, { id }) => {
      try {
        const deleted = await AuthorService.deleteAuthor(id);
        if (!deleted) {
          throw new Error('Author not found');
        }
        return true;
      } catch (error) {
        throw new Error(`Failed to delete author: ${error.message}`);
      }
    }
  },

  Author: {
    books: async (parent) => {
      try {
        return new Promise((resolve, reject) => {
          BookService.getBooksByAuthor(parent.id, (err, books) => {
            if (err) return reject(err);
            resolve(books || []);
          });
        });
      } catch (error) {
        throw new Error(`Failed to fetch author's books: ${error.message}`);
      }
    }
  }
};

module.exports = authorResolvers;