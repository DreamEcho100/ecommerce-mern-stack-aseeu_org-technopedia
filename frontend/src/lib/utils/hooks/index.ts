import { useCallback } from 'react';
import { joinArrayWith1EmptySpace } from '../arrays';

export const useJoinClassNamesMemoized = (...classes: string[]): string =>
	useCallback(
		(classes): string => joinArrayWith1EmptySpace(classes),
		[classes]
	)(classes);
