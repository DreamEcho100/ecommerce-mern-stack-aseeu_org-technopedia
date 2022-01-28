import { MouseEvent, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { Nav, NavDropdown } from 'react-bootstrap';

interface IProps {
	children: ReactNode; // JSX.Element;
	to: string;
	navigateExtraProps?: { [key: string]: any };
	elementType?: 'NavLink' | 'NavDropdownItem';
	props?: { [key: string]: any };
}

const CustomLinkContainer = ({
	children,
	to,
	navigateExtraProps,
	elementType = 'NavLink',
	props = {},
}: IProps) => {
	const navigate = useNavigate();

	const ElementsMap = {
		NavLink: Nav.Link,
		NavDropdownItem: NavDropdown.Item,
	};

	const Element = ElementsMap[elementType];

	return (
		<Element
			href={`${to}`}
			onClick={(event: MouseEvent<HTMLButtonElement>) => {
				event.preventDefault();
				navigate(`${to}`, navigateExtraProps);
			}}
			{...props}
		>
			{children}
		</Element>
	);
};

export default CustomLinkContainer;
