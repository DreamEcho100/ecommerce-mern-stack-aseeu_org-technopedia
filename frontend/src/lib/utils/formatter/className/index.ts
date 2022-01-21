import { useCallback } from 'react';

const joinArrayWith1EmptySpace = (arr: string[]): string => arr.join(' ');

export const joinClassNames = (...classes: string[]): string =>
	joinArrayWith1EmptySpace(classes);

export const useJoinClassNamesMemoized = (...classes: string[]): string =>
	useCallback(
		(classes): string => joinArrayWith1EmptySpace(classes),
		[classes]
	)(classes);
