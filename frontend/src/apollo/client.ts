
import { ApolloClient, InMemoryCache, NormalizedCacheObject, createHttpLink } from '@apollo/client';

const cache = new InMemoryCache({
	resultCaching: false,
});

/**
 * The credentials: 'include' allows cookies to be automatically sent
 * along with the request 'include' because backend is on another domain.
 *
 * @see https://www.apollographql.com/docs/react/networking/authentication/#cookie
 */
const link = createHttpLink({
	uri: `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/graphql`,
})

const client = new ApolloClient({
	connectToDevTools: true,
	link,
	cache,
	defaultOptions: {
		watchQuery: {
			fetchPolicy: "no-cache",
            errorPolicy: "ignore",
		}, 
		query: {
            fetchPolicy: "no-cache",
            errorPolicy: "all",
        }
	}
});

export default client;