import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";


import carritoDao from "./DAO/carritoDao.js";


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Carrito {
    id: ID!
    timestamp: String,
    productos: [String]
  }

  input CarritoInput {
    id: ID!
  }

  type Query {
    getCarritos: [Carrito]
  }

`);

// The root provides a resolver function for each API endpoint
var root = {
    getCarritos: async () => {
    return await carritoDao.getCarritos()
  },
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');