const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const http = require('http');
const cors = require('cors');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');

async function startServer() {
    const app = express();
    const httpServer = http.createServer(app);
    
    // Create Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    
    // Start the server
    await server.start();
    
    // Apply Apollo GraphQL middleware
    app.use(
        '/graphql',
        cors(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                // Add any context data here (e.g., user authentication)
                return {};
            },
        }),
    );
    
    const PORT = process.env.PORT || 4000;
    
    await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
    
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`📊 GraphQL Studio available at http://localhost:${PORT}/graphql`);
}

startServer().catch(err => {
    console.error('Error starting server:', err);
});