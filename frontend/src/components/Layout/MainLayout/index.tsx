import { ReactNode } from 'react';
import Header from 'src/components/UI/V1/Header';
import Footer from 'src/components/UI/V1/Footer';

interface Props {
	children: ReactNode;
}

const MainLayout = ({ children }: Props): JSX.Element => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default MainLayout;
