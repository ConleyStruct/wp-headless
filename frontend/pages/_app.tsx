import '../src/styles/index.scss';
import GraphQlProvider from './graphql-provider';
import type { AppProps } from 'next/app'

function MyApp( { Component, pageProps }: AppProps ) {
	return (
		<GraphQlProvider>
			<Component {...pageProps} />
		</GraphQlProvider>
	);
}

export default MyApp;