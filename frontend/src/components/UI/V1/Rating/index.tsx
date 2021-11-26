import React from 'react';
import { Product } from 'src/react-app-env';

interface Props {
	value: Product['rating'];
	text: string | number;
	color: string;
}

const Rating = ({ value, text, color }: Props) => {
	return (
		<div>
			<span>{value}</span>
			<span>
				<i
					style={{ color }}
					className={
						value >= 1
							? 'fas fa-star'
							: value >= 0.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						value >= 2
							? 'fas fa-star'
							: value >= 1.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						value >= 3
							? 'fas fa-star'
							: value >= 2.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						value >= 4
							? 'fas fa-star'
							: value >= 3.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				></i>
			</span>
			<span>
				<i
					style={{ color }}
					className={
						value >= 5
							? 'fas fa-star'
							: value >= 4.5
							? 'fas fa-star-half-alt'
							: 'far fa-star'
					}
				></i>
			</span>{' '}
			<span>{text && `(${text})`}</span>
		</div>
	);
};

Rating.defaultProps = {
	color: '#f8e825',
};

export default Rating;
