import { MouseEvent, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { Nav, NavLinkProps } from 'react-bootstrap';

interface IProps extends NavLinkProps {
	children: ReactNode; // JSX.Element;
	to: string;
	navigateExtraProps?: { [key: string]: any };
}

const CustomLinkContainer = ({ children, to, navigateExtraProps }: IProps) => {
	const navigate = useNavigate();

	return (
		<Nav.Link
			href={`${to}`}
			onClick={(event: MouseEvent<HTMLButtonElement>) => {
				event.preventDefault();
				navigate(`${to}`, navigateExtraProps);
			}}
		>
			{children}
		</Nav.Link>
	);
};

export default CustomLinkContainer;
