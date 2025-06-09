/**
 * Date utility functions using date-fns for consistent date formatting
 */
import { format, formatDistanceToNow, parseISO } from 'date-fns';

export function formatDate(date: string): string {
	return format(parseISO(date), 'd MMM yyyy');
}

export function formatDateShort(date: string): string {
	return format(parseISO(date), 'd MMM');
}

export function formatDateISO(date: string): string {
	return format(parseISO(date), 'yyyy-MM-dd');
}

export function getRelativeTime(date: string): string {
	return formatDistanceToNow(parseISO(date), { addSuffix: true });
}

export function formatDateTime(date: string): string {
	return format(parseISO(date), "d MMM yyyy 'at' h:mm a");
}
