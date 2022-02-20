import { TDate } from 'src/react-app-env';
import { formatDate } from 'src/lib/utils/date';

export const handleFormatDate = (dateHolder?: TDate) => {
	if (!dateHolder) return '??';

	const dateObj = formatDate(new Date(dateHolder));
	const { date, time } = dateObj;

	return time ? `${date}, ${time}` : date;
};
