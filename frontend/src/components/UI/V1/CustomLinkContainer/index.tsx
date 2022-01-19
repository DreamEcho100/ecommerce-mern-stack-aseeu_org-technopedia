import { MouseEvent, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { Nav, NavLinkProps } from 'react-bootstrap';

interface IProps extends NavLinkProps {
	children: ReactNode; // JSX.Element;
	to: string;
}

const CustomLinkContainer = ({ children, to }: IProps) => {
	const navigate = useNavigate();

	return (
		<Nav.Link
			href={`${to}`}
			onClick={(event: MouseEvent<HTMLButtonElement>) => {
				event.preventDefault();
				navigate(`${to}`);
			}}
		>
			{children}
		</Nav.Link>
	);
};

export default CustomLinkContainer;
