export const setItem = (name: string, value: any): void => {
	if ((value && typeof value === 'object') || Array.isArray(value))
		localStorage.setItem(name, JSON.stringify(value));
	else localStorage.setItem(name, value);
};

export const getItem = <R>(name: string, defaultReturn: R): R => {
	if (typeof window === 'undefined') return defaultReturn;

	const item: string | null = localStorage.getItem(name);
	if (item) {
		if (item.startsWith('{') || item.startsWith('[')) return JSON.parse(item!);
		return item as unknown as R;
	}

	return defaultReturn;
};

export const checkItem = (name: string): boolean =>
	typeof window !== 'undefined' && !!localStorage.getItem(name);

export const deleteItem = (name: string): boolean => {
	if (checkItem(name)) {
		localStorage.removeItem(name);
		return true;
	}

	return false;
};

const ls = {
	set: setItem,
	get: getItem,
	check: checkItem,
	delete: deleteItem,
};

export default ls;
