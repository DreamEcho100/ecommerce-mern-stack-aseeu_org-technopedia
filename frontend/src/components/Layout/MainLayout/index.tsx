import { ReactNode } from 'react';
import Header from 'src/components/UI/Header';
import Footer from 'src/components/UI/Footer';

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
