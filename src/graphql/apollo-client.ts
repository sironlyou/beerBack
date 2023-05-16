import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
const httpLink = new HttpLink({
  uri: `http://localhost:4000/graphql`,
  credentials: "include",
});
const link = createHttpLink({
  uri: `http://localhost:4000/graphql`,
  credentials: "include",
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link,
// });
