const BookService = require('../services/bookService');
const AuthorService = require('../services/authorService');

const bookResolvers = {
  Query: {
    books: async () => {
      try {
        return await BookService.getAllBooks();
      } catch (error) {
        throw new Error(`Failed to fetch books: ${error.message}`);
      }
    },

    book: async (_, { id }) => {
      try {
        const book = await BookService.getBookById(id);
        if (!book) {
          throw new Error('Book not found');
        }
        return book;
      } catch (error) {
        throw new Error(`Failed to fetch book: ${error.message}`);
      }
    },

    booksByAuthor: async (_, { authorId }) => {
      try {
        // First check if author exists
        const author = await AuthorService.getAuthorById(authorId);
        if (!author) {
          throw new Error('Author not found');
        }

        return new Promise((resolve, reject) => {
          BookService.getBooksByAuthor(authorId, (err, books) => {
            if (err) return reject(err);
            resolve(books || []);
          });
        });
      } catch (error) {
        throw new Error(`Failed to fetch books by author: ${error.message}`);
      }
    }
  },

  Mutation: {
    createBook: async (_, { input }) => {
      try {
        const { title, publication_year, author_id } = input;
        return await BookService.createBook(title, publication_year, author_id);
      } catch (error) {
        throw new Error(`Failed to create book: ${error.message}`);
      }
    },

    updateBook: async (_, { id, input }) => {
      try {
        const { title, publication_year, author_id } = input;
        const updated = await BookService.updateBook(id, title, publication_year, author_id);
        
        if (!updated) {
          throw new Error('Book not found');
        }
        
        return await BookService.getBookById(id);
      } catch (error) {
        throw new Error(`Failed to update book: ${error.message}`);
      }
    },

    deleteBook: async (_, { id }) => {
      try {
        const deleted = await BookService.deleteBook(id);
        if (!deleted) {
          throw new Error('Book not found');
        }
        return true;
      } catch (error) {
        throw new Error(`Failed to delete book: ${error.message}`);
      }
    }
  },

  Book: {
    author: async (parent) => {
      try {
        const author = await AuthorService.getAuthorById(parent.author_id);
        if (!author) {
          throw new Error('Author not found for this book');
        }
        return author;
      } catch (error) {
        throw new Error(`Failed to fetch book's author: ${error.message}`);
      }
    }
  }
};

module.exports = bookResolvers;