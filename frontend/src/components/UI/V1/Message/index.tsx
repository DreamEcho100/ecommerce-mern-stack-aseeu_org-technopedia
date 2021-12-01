import { Alert } from 'react-bootstrap';

interface Props {
	variant: 'info' | 'danger';
	children: JSX.Element | string;
}

const Message = ({ variant, children }: Props) => {
	return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
	variant: 'info',
};

export default Message;
