# 📚 Book GraphQL API

Book GraphQL API is a GraphQL-based API for managing books and authors using **Node.js**, **Apollo Server v4**, **Express**, and **SQLite**.

## 🚀 Features
- **GraphQL mutations for Authors** (Create, Update, Delete)
- **GraphQL queries for Authors** (Get all, Get by ID)
- **GraphQL mutations for Books** (Create, Update, Delete)
- **GraphQL queries for Books** (Get all, Get by ID, Get by Author)
- **Relationship between Books and Authors**
- **Lightweight database with SQLite**
- **Apollo Studio for interactive GraphQL development**
- **Modern Apollo Server v4 implementation**

---

## 🛠 Installation

### 1️⃣ Clone or create the project directory
```sh
mkdir book-graphql-api
cd book-graphql-api
```

### 2️⃣ Initialize and install dependencies
```sh
npm init -y
npm install @apollo/server @apollo/subgraph express sqlite3 cors graphql graphql-tag
npm install --save-dev nodemon
```

### 3️⃣ Update package.json scripts
```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  }
}
```

### 4️⃣ Start the server
```sh
npm run dev
```

✅ The server will start at: `http://localhost:4000/graphql`
✅ GraphQL Studio available at: `http://localhost:4000/graphql`

---

## 📌 GraphQL Schema

### **Types**
```graphql
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
```

### **Queries**
```graphql
type Query {
  authors: [Author!]!
  author(id: ID!): Author
  books: [Book!]!
  book(id: ID!): Book
  booksByAuthor(authorId: ID!): [Book!]!
}
```

### **Mutations**
```graphql
type Mutation {
  createAuthor(input: AuthorInput!): Author!
  updateAuthor(id: ID!, input: AuthorInput!): Author!
  deleteAuthor(id: ID!): Boolean!
  
  createBook(input: BookInput!): Book!
  updateBook(id: ID!, input: BookInput!): Book!
  deleteBook(id: ID!): Boolean!
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
```

---

## 🔍 Example Queries and Mutations

### **Create an Author**
```graphql
mutation {
  createAuthor(input: {
    name: "J.K. Rowling"
    nationality: "British"
  }) {
    id
    name
    nationality
  }
}
```

### **Get All Authors with Their Books**
```graphql
query {
  authors {
    id
    name
    nationality
    books {
      id
      title
      publication_year
    }
  }
}
```

### **Create a Book**
```graphql
mutation {
  createBook(input: {
    title: "Harry Potter and the Philosopher's Stone"
    publication_year: 1997
    author_id: 1
  }) {
    id
    title
    publication_year
    author {
      name
      nationality
    }
  }
}
```

### **Get Books by Author**
```graphql
query {
  booksByAuthor(authorId: "1") {
    id
    title
    publication_year
    author {
      name
    }
  }
}
```

### **Update a Book**
```graphql
mutation {
  updateBook(id: "1", input: {
    title: "Harry Potter and the Sorcerer's Stone"
    publication_year: 1997
    author_id: 1
  }) {
    id
    title
    publication_year
  }
}
```

### **Delete an Author**
```graphql
mutation {
  deleteAuthor(id: "1")
}
```

---

## 📁 Project Structure

```
src/
├── config/
│   └── db.js              # Database configuration
├── resolvers/
│   ├── authorResolvers.js # Author GraphQL resolvers
│   ├── bookResolvers.js   # Book GraphQL resolvers
│   └── index.js           # Combined resolvers
├── schema/
│   └── typeDefs.js        # GraphQL type definitions
├── services/
│   ├── authorService.js   # Author business logic
│   └── bookService.js     # Book business logic
├── models/
│   ├── Author.js          # Author model
│   └── Book.js            # Book model
└── server.js              # Main server file
```

---

## 🛠 Development

For development with auto-restart:
```sh
npm run dev
```

---

## 🌐 GraphQL Studio

Once the server is running, visit `http://localhost:4000/graphql` to access Apollo Studio where you can:
- Explore the schema with intelligent autocomplete
- Write and test queries/mutations with real-time validation
- View comprehensive documentation
- Access query performance metrics
- Use the modern, interactive GraphQL IDE

> **Note**: This project uses Apollo Server v4, which provides Apollo Studio instead of the deprecated GraphQL Playground. Apollo Studio offers the same functionality with a more modern and feature-rich interface.

---

## 📜 License
This project is open-source and available under the **MIT License**.

---

💡 **Happy GraphQL Coding!** 🚀