// SHOULD MOVE THIS TOKEN TO AN .ENV FILE
// const STRATZ_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiYWMyMmIyZTItNjA3NS00OWQxLThhNTItNDhlZGMwOTRjNjcwIiwiU3RlYW1JZCI6IjEyNTcyMzI3NzgiLCJBUElVc2VyIjoidHJ1ZSIsIm5iZiI6MTc5MDc5MzQyOSwiZXhwIjoxODIyMzI5NDI5LCJpYXQiOjE3OTA3OTM0MjksImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.QmylSwDP5gFp-JORUXZ5OXOY-EKhHhc4MgRoYyVTqjw"

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';

import { ErrorLink } from '@apollo/client/link/error'

const STRATZ_TOKEN = import.meta.env.VITE_STRATZ_TOKEN
console.log(STRATZ_TOKEN)
const httpLink = new HttpLink({
  uri: 'https://api.stratz.com/graphql',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${STRATZ_TOKEN}`,
    'User-Agent': 'STRATZ API'
  },
});


const errorLink = new ErrorLink(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});



// I HAVE NO IDEA WHAT THE THINGS BELOW DO. SHOULD DO MORE RESEARCH



// Create the Apollo Client instance
export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            merge(existing = [], incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});