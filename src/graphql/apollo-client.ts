// import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
// import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
// import { createClient } from 'graphql-ws';

// const link = createHttpLink({
//   uri: `http://localhost:4000/graphql`,
//   credentials: "include",
// });

// export const client = new ApolloClient({
//   link,
//   cache: new InMemoryCache(),
// });

import { split, HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { useStore } from "effector-react";
import { $user } from "../utils/store";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/",
  credentials: "include",
});
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:4000/subscriptions",
    connectionParams: {
      userId: localStorage.getItem("id"),
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
