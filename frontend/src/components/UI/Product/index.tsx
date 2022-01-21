// import React from 'react'
import { /* Link */ NavLink } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import { IProduct } from 'src/react-app-env';
import Rating from '../Rating';

interface Props {
	singleItem: IProduct;
}

const ProductComponent = ({ singleItem }: Props): JSX.Element => {
	return (
		<div>
			<Card className='my-3 p-3 rounded'>
				<NavLink to={`/product/${singleItem._id}`}>
					<Card.Img src={singleItem.image} variant='top' />
				</NavLink>

				<Card.Body>
					<NavLink to={`/product/${singleItem._id}`}>
						<Card.Title as='div'>
							<strong>{singleItem.name}</strong>
						</Card.Title>
					</NavLink>

					<Card.Text as='div'>
						<div className='my-3'>
							{/* {singleItem.rating} from {singleItem.numReviews} reviews */}
							<Rating value={singleItem.rating} text={singleItem.numReviews} />
						</div>
					</Card.Text>

					<Card.Text as='h3'>${singleItem.price}</Card.Text>
				</Card.Body>
			</Card>
		</div>
	);
};

export default ProductComponent;
