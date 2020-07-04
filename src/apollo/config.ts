import { ApolloClient } from "apollo-client";
import { ApolloLink, concat } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";

const defaultOptions = {
  wsEndpoint: process.env.VUE_APP_GRAPHQL_WS || "ws://localhost:4000/graphql",
  persisting: false,
  tokenName: "APOLLO_TOKEN",
  websocketsOnly: false,
  ssr: false,
  cache: new InMemoryCache()
};

const middlewareLink = new ApolloLink((operation, forward) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("AUTH_TOKEN");
  // return the headers to the context so httpLink can read them
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : ""
    }
  });
  return forward(operation);
});

const clientHasuraOptions = {
  // You can use `https` for secure connection (recommended in production)
  httpEndpoint: process.env.VUE_APP_HASURA_GRAPHQL_API,
  link: concat(
    middlewareLink,
    createHttpLink({
      uri: process.env.VUE_APP_HASURA_GRAPHQL_API
    })
  )
};

const clientLaravelOptions = {
  httpEndpoint: process.env.VUE_APP_LARAVEL_GRAPHQL_API,
  link: concat(
    middlewareLink,
    createHttpLink({
      uri: process.env.VUE_APP_LARAVEL_GRAPHQL_API
    })
  )
};

// Call this in the Vue app file
export function createProvider(options = {}) {
  const a = new ApolloClient({
    ...defaultOptions,
    ...clientHasuraOptions
  });

  const b = new ApolloClient({
    ...defaultOptions,
    ...clientLaravelOptions
  });

  const apolloProvider = new VueApollo({
    clients: {
      a,
      b
    },
    defaultClient: a
  });

  return apolloProvider;
}
