import { GET_MENUS } from '@/src/queries/get-menus';
import client from '../src/apollo/client';
import Layout from '@/src/components/layout/index';

export default function Page({ data }: IndexPageProps): JSX.Element {
	return (
		<Layout data={data}>
			content
		</Layout>
	);
}

interface IndexPageProps {
	data: {
		menus: {
			headerMenus: any[];
			footerMenus: any[];
		}
	};
}
export async function getStaticProps() {
	const { data, loading, networkStatus } = await client.query({
	  query: GET_MENUS,
	});
  
	return {
	  props: {
		data: {
			menus: {
			  headerMenus: data?.headerMenus?.edges,
			  footerMenus: data?.footerMenus?.edges,
			},
		}
	  },
	};
  }