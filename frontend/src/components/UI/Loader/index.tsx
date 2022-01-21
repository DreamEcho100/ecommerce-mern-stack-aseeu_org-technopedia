import { Spinner } from 'react-bootstrap';

interface Props {}

const Loader = (props: Props): JSX.Element => {
	return (
		<Spinner
			animation='border'
			role='status'
			style={{
				width: '6.25rem',
				height: '6.25rem',
				margin: 'auto',
				display: 'block',
			}}
		>
			<span className='sr-only'>Loading...</span>
		</Spinner>
	);
};

export default Loader;
