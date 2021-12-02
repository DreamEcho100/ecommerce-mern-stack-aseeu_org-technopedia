import { Alert } from 'react-bootstrap';

interface Props {
	variant: 'info' | 'danger';
	children: React.ReactNode;
}

const Message = ({ variant, children }: Props) => {
	return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
	variant: 'info',
};

export default Message;
