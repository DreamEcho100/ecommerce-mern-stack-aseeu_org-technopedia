import { ICartItem } from '@src/vite-env';

export const addDecimals = (num: number): string => {
	return (Math.round(num * 100) / 100).toFixed(2);
};

export const calcItemsPrice = (items: ICartItem[]) => {
	if (!items || items.length === 0) return '00.00';

	return addDecimals(
		items.reduce(
			(acc: number, item: ICartItem) => acc + item.price * item.quantity,
			0
		)
	);
};
export const calcItemsQuantity = (items: ICartItem[]) => {
	if (!items || items.length === 0) return 0;

	return items.reduce((acc: number, item: ICartItem) => acc + item.quantity, 0);
};
export const calcShippingPrice = (itemsPrice: string) =>
	addDecimals(Number(itemsPrice) > 100 ? 0 : 100);

export const calcTaxPrice = (itemsPrice: string) =>
	addDecimals(Number((0.15 * Number(itemsPrice)).toFixed(2)));
export const calcTotalPrice = (
	itemsPrice: string,
	shippingPrice: string,
	taxPrice: string
) => (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2);

export const handleCartItemsCalcs = (items: ICartItem[]) => {
	if (!items || items.length === 0)
		return {
			itemsPrice: '00.00',
			shippingPrice: '00.00',
			taxPrice: '00.00',
			totalPrice: '00.00',
		};

	const itemsPrice = calcItemsPrice(items);
	const shippingPrice = calcShippingPrice(itemsPrice);
	const taxPrice = calcTaxPrice(itemsPrice);
	const totalPrice = calcTotalPrice(itemsPrice, shippingPrice, taxPrice);

	return {
		itemsPrice,
		shippingPrice,
		taxPrice,
		totalPrice,
	};
};
