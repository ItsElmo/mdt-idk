import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ChakraProvider } from '@chakra-ui/react';

const client = new ApolloClient({
	uri: 'https://localhost:4000',
	cache: new InMemoryCache(),
	credentials: 'include',
});
ReactDOM.render(
	<ApolloProvider client={client}>
		<ChakraProvider>
			<App />
		</ChakraProvider>
	</ApolloProvider>,

	document.getElementById('root')
);
