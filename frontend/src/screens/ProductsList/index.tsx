import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import CustomLinkContainer from '@src/components/UI/CustomLinkContainer';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import { useMainStoreSelector } from '@src/store';
import {
	addProductToList,
	deleteProductFromList,
	handleListProducts,
} from '@src/store/actions/productsList';

import Message from '@src/components/UI/Message';
import Loader from '@src/components/UI/Loader';
import {
	adminCreateProduct,
	adminCreateProductRequestReset,
	adminDeleteProduct,
	adminDeleteProductRequestReset,
} from '@src/store/actions/user';
import { INewProductData, IProduct } from '@src/vite-env';

type Props = {};

const ProductsListScreen = (props: Props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [newProductData, setNewProductData] = useState<INewProductData>({
		name: 'AOT Insignia Badge',
		price: 10,
		image: '/images/AOT Insignia Badge.webp',
		brand: 'Local seller',
		category: 'Sample badge',
		countInStock: 8,
		description:
			'AOT Insignia Badge| pre-order | Pins | Anime | Manga | Gift | Attack On Titan | Wings |',
	});

	const { user, admin: adminData, productList } = useMainStoreSelector();
	const {
		isLoading: isLoadingProductList,
		error: errorProductList,
		products,
	} = productList;
	const { info: userInfo } = user;
	const actions = adminData?.actions;
	const requestsDeleteProduct = actions?.requests.deleteProduct;
	const requestsCreateProduct = actions?.requests.createProduct;

	const resetRequestsIfError = useCallback(() => {
		if (requestsDeleteProduct?.error || requestsDeleteProduct?.success)
			dispatch(adminDeleteProductRequestReset());
		if (requestsCreateProduct?.error || requestsCreateProduct?.success)
			dispatch(adminCreateProductRequestReset());
	}, [
		dispatch,
		requestsCreateProduct?.error,
		requestsCreateProduct?.success,
		requestsDeleteProduct?.error,
		requestsDeleteProduct?.success,
	]);

	const deleteHandler = async (_id: string) => {
		if (window.confirm('Are you sure')) {
			resetRequestsIfError();
			const productIdToDelete = await dispatch(adminDeleteProduct(_id));
			if (productIdToDelete) {
				dispatch(
					deleteProductFromList(productIdToDelete as unknown as IProduct['_id'])
				);
				// dispatch(adminDeleteProductRequestReset());
			}
		}
	};

	const createProductHandler = async () => {
		setNewProductData(newProductData);
		resetRequestsIfError();
		const newProduct = await dispatch(adminCreateProduct(newProductData));

		if (newProduct) {
			dispatch(addProductToList(newProduct as unknown as IProduct));
			// dispatch(adminCreateProductRequestReset());
		}
	};

	useEffect(() => {
		dispatch(adminCreateProductRequestReset());
	}, [dispatch]);

	useEffect(() => {
		if (userInfo?.isAdmin) {
			dispatch(handleListProducts());
		} else {
			navigate('/login');
		}
	}, [dispatch, navigate, userInfo]);

	if (!adminData) {
		return <></>;
	}

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-right'>
					<Button
						className='my-3'
						onClick={() => createProductHandler()}
						disabled={
							requestsDeleteProduct?.isLoading ||
							requestsCreateProduct?.isLoading
						}
					>
						<i className='fas fa-plus'></i> Create Product
					</Button>
				</Col>
			</Row>
			{(requestsDeleteProduct?.isLoading ||
				requestsCreateProduct?.isLoading) && <Loader />}
			{(requestsDeleteProduct?.error || requestsCreateProduct?.error) && (
				<Message variant='danger'>
					{requestsDeleteProduct?.error || requestsCreateProduct?.error}
				</Message>
			)}
			{isLoadingProductList ? (
				<Loader />
			) : errorProductList ? (
				<Message variant='danger'>{errorProductList}</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>${product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>
									<Button
										variant='light'
										className='btn-sm'
										disabled={
											requestsDeleteProduct?.isLoading ||
											requestsCreateProduct?.isLoading
										}
									>
										<CustomLinkContainer
											to={`/admin/product/${product._id}/edit`}
										>
											<i className='fas fa-edit'></i>
										</CustomLinkContainer>
									</Button>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => deleteHandler(product._id)}
										disabled={
											requestsDeleteProduct?.isLoading ||
											requestsCreateProduct?.isLoading
										}
									>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default ProductsListScreen;
