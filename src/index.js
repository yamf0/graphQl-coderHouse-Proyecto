import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";


import carritoControllers from "./controllers/carritoController.js";


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Carrito {
        id: ID!
        timestamp: String,
        productos: [Producto]
    }

    type Producto {
        id: ID!
    }

    input inputProducto{
        id: ID!
    }

    type Query {
        getCarritos: [Carrito]
        getCarrito(id: ID!): Carrito
        getProductos(id: ID!): [Producto]
    }

    type Mutation {
        createCarrito: Carrito
        deleteCarrito(id: ID!): Carrito!
        addProducto(id: ID!, producto: inputProducto!): Carrito
        deleteProducto(id: ID!, producto: inputProducto!): Producto
    }

`);

// The root provides a resolver function for each API endpoint
var root = {
    ...carritoControllers
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');