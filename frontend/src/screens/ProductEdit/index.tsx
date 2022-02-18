import {
	ChangeEvent,
	FormEvent,
	useState,
	useEffect,
	useCallback,
} from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import {
	handleProductDetails,
	updateProductDetails,
} from 'src/store/actions/productDetails';
import { useMainStoreSelector } from 'src/store';

import Message from 'src/components/UI/Message';
import Loader from 'src/components/UI/Loader';
import FormContainer from 'src/components/UI/FormContainer';
import { IProduct } from 'src/react-app-env';
import { updateProductToList } from 'src/store/actions/productsList';
import {
	adminUpdateProduct,
	// adminUpdateProductRequestReset,
} from 'src/store/actions/user';
import { BACK_END_ROOT_URL } from 'src/config';

type Props = {};

const ProductEditScreen = (props: Props) => {
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();
	const productId = params.id;

	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');
	const [uploading, setUploading] = useState(false);

	const { user, admin: adminData, productDetails } = useMainStoreSelector();

	const { info: userInfo } = user;
	const actions = adminData?.actions;
	const {
		isLoading: isLoadingProductDetails,
		error: errorProductDetails,
		product,
	} = productDetails;
	const requestsUpdateProduct = actions?.requests.updateProduct;

	const returnDataToUpdate = useCallback(() => {
		const dataToUpdate: {
			name?: IProduct['name'];
			price?: IProduct['price'];
			image?: IProduct['image'];
			brand?: IProduct['brand'];
			category?: IProduct['category'];
			countInStock?: IProduct['countInStock'];
			description?: IProduct['description'];
		} = {};
		let atLeastOneItemProvided: boolean = false;

		if (name) dataToUpdate.name = name;
		if (price) dataToUpdate.price = price;
		if (image) dataToUpdate.image = image;
		if (brand) dataToUpdate.brand = brand;
		if (category) dataToUpdate.category = category;
		if (countInStock) dataToUpdate.countInStock = countInStock;
		if (description) dataToUpdate.description = description;

		let item: keyof typeof dataToUpdate;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		for (item in dataToUpdate) {
			atLeastOneItemProvided = true;
			break;
		}

		return {
			dataToUpdate,
			atLeastOneItemProvided,
		};
	}, [brand, category, countInStock, description, image, name, price]);

	const uploadFileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
		if (!event.target.files || !event.target.files[0])
			return console.error(`Error, File not found!`);
		const file = event.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			// const config = {};

			const data: string = await fetch(
				`${BACK_END_ROOT_URL}/api/uploads/image`,
				{
					method: 'POST',
					// headers: {
					// 	'Content-Type': 'multipart/form-data',
					// 	boundary: '', // 'MyBoundary'
					// },
					body: formData,
				}
			).then((response) => response.text());

			setImage(data);
			setUploading(false);
		} catch (error) {
			if (error instanceof Error) console.error(error.message);
			setUploading(false);
		}
	};

	const submitHandler = async (event: FormEvent) => {
		event.preventDefault();

		if (!productId) throw new Error('Product ID Not Provided!');

		const { dataToUpdate, atLeastOneItemProvided } = returnDataToUpdate();

		if (!atLeastOneItemProvided)
			throw new Error('No Product data to Update Provided!');

		const updatedProductId = await dispatch(
			adminUpdateProduct(productId, dataToUpdate)
		);

		if (typeof updatedProductId === 'string') {
			dispatch(updateProductDetails(dataToUpdate));
			dispatch(updateProductToList(productId, dataToUpdate));
			// dispatch(adminUpdateProductRequestReset());
		}
	};

	useEffect(() => {
		if (!userInfo || !userInfo.isAdmin) {
			navigate('/login');
			return;
		}
		if (!productId) {
			navigate('/');
			return;
		}
		if (!product || !product.name || product._id !== productId) {
			dispatch(handleProductDetails(productId));
		} else {
			setName(product.name);
			setPrice(product.price);
			setImage(product.image);
			setBrand(product.brand);
			setCategory(product.category);
			setCountInStock(product.countInStock);
			setDescription(product.description);
		}
	}, [dispatch, productId, product, navigate, userInfo]);

	if (!adminData || !actions) {
		return <></>;
	}

	return (
		<>
			<Link to='/admin/productsList' className='btn btn-light my-3'>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{isLoadingProductDetails || requestsUpdateProduct?.isLoading ? (
					<Loader />
				) : errorProductDetails || requestsUpdateProduct?.error ? (
					<Message variant='danger'>
						{errorProductDetails || requestsUpdateProduct?.error}
					</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter name'
								value={name}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setName(event.target.value)
								}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='price'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter price'
								value={price}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setPrice(
										parseFloat(parseFloat(event.target.value).toFixed(2))
									)
								}
							></Form.Control>
						</Form.Group>

						{/* <Form.Group controlId='image'>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter image url'
								value={image}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setImage(event.target.value)
								}
							></Form.Control>
							<Form.File
								id='image-file'
								label='Choose File'
								custom
								onChange={uploadFileHandler}
							></Form.File>
							{uploading && <Loader />}
						</Form.Group> */}
						{/* https://react-bootstrap.netlify.app/forms/form-control/#file-input */}
						<Form.Group
							controlId='imageFormFile'
							// className='mb-3'
						>
							<Form.Label>Image</Form.Label>
							<Form.Control
								type='file'
								// placeholder='Enter image url'
								// value={image}
								// onChange={(event: ChangeEvent<HTMLInputElement>) =>
								// 	setImage(event.target.value)
								// }
								// id='image-file'
								// label='Choose File'
								// custom
								onChange={uploadFileHandler}
							/>
							{uploading && <Loader />}
						</Form.Group>

						<Form.Group controlId='brand'>
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter brand'
								value={brand}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setBrand(event.target.value)
								}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='countInStock'>
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter countInStock'
								value={countInStock}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setCountInStock(
										parseFloat(parseFloat(event.target.value).toFixed(2))
									)
								}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='category'>
							<Form.Label>Category</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter category'
								value={category}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setCategory(event.target.value)
								}
							></Form.Control>
						</Form.Group>

						<Form.Group controlId='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter description'
								value={description}
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setDescription(event.target.value)
								}
							></Form.Control>
						</Form.Group>

						{requestsUpdateProduct?.error && (
							<Message className='my-3' variant='danger'>
								{requestsUpdateProduct?.error}
							</Message>
						)}

						{requestsUpdateProduct?.success && (
							<Message className='my-3' variant='success'>
								Product Data Updated Successfully!
							</Message>
						)}

						<Button
							type='submit'
							variant='primary'
							disabled={
								isLoadingProductDetails || requestsUpdateProduct?.isLoading
							}
							className='my-3'
						>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
};

export default ProductEditScreen;
