// import React from 'react';
import Header from 'src/components/UI/V1/Header';
import Footer from 'src/components/UI/V1/Footer';

interface Props {
	children: JSX.Element;
}

const MainLayout = ({ children }: Props) => {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	);
};

export default MainLayout;
