const express = require("express");
const cors = require("cors");
const expressGraphQL = require("express-graphql").graphqlHTTP;

const schema = require("./schema/schema");

const app = express();

app.use(cors());

app.use(
  "/graphql",
  expressGraphQL({
    graphiql: true,
    schema,
  })
);

app.listen(4000, () => {
  console.log("Listening to Port 4000");
});
