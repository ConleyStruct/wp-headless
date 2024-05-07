import { GET_MENUS } from '@/src/queries/get-menus';
import client from '../src/apollo/client';
import Layout from '@/src/components/layout/index';

export default function Page({ data }: IndexPageProps): JSX.Element {
	return (
		<Layout>
			content
		</Layout>
	);
}

