import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { Button, createMuiTheme, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { themeDark } from '@/styles/theme/theme';
import { useState } from 'react';

const httpLink = new HttpLink({
  uri: `http://localhost:4000/graphql`,
})

const authLink = setContext(async (_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach((graphQLError) => {
          // eslint-disable-next-line no-console
          console.error(graphQLErrors);
        });
      }
      if (networkError) throw new Error(`[Network error]: ${networkError}`);
    }),
    authLink.concat(httpLink),
  ]),
  cache: new InMemoryCache(),
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={themeDark}>
      <CssBaseline />
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ThemeProvider>
  );
}


