import { MouseEvent, ReactNode } from 'react';
import { useNavigate } from 'react-router';
import { Nav, NavDropdown } from 'react-bootstrap';

const AnchorLink = ({
	children,
	...props
}: {
	children: ReactNode;
	[key: string]: any;
}) => <a {...props}>{children}</a>;

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
	elementType,
	props = {},
}: IProps) => {
	const navigate = useNavigate();

	const ElementsMap = {
		NavLink: Nav.Link,
		NavDropdownItem: NavDropdown.Item,
	};

	const Element = elementType ? ElementsMap[elementType] : AnchorLink;

	return (
		<Element
			{...props}
			href={`${to}`}
			onClick={(event: MouseEvent<HTMLButtonElement>) => {
				event.preventDefault();
				navigate(`${to}`, navigateExtraProps);
				if (props.onClick) {
					props.onClick(event);
				}
			}}
		>
			{children}
		</Element>
	);
};

export default CustomLinkContainer;
