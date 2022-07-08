const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers} = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3002;
// create Apollo server and pass in schema data
const server = new ApolloServer({
    typeDefs, 
    resolvers
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// new instance of Apollo server with graphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();


// integrate Apollo server with Express app as middleware
    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}!`);
            // log where to test GQL API
            console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
};

startApolloServer(typeDefs, resolvers);