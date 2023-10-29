const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./Schemas/type-def");
const { resolvers } = require("./Schemas/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Your API is running at: ${url}`);
});
