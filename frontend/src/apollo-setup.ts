import { ApolloClient, InMemoryCache } from "@apollo/client";

/** Editable Code START **/
const cache = new InMemoryCache();
/** Editable Code END **/

export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache,
});
