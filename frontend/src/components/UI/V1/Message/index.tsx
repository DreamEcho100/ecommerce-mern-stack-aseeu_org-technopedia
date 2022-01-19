import { Alert } from 'react-bootstrap';

interface IMessageProps {
	variant: 'success' | 'info' | 'danger';
	className?: string;
}

interface IProps extends IMessageProps {
	children: React.ReactNode;
}

const Message = ({ variant, className, children }: IProps): JSX.Element => {
	const messageProps: IMessageProps = (() => {
		const obj: IMessageProps = {
			variant,
		};

		if (className) {
			obj.className = className;
		}

		return obj;
	})();

	return <Alert {...messageProps}>{children}</Alert>;
};

Message.defaultProps = {
	variant: 'info',
};

export default Message;
