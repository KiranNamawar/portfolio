import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	return {
		title: 'Enhanced Image Component Demo',
		description:
			'Demonstration of the enhanced Image component with glassmorphism effects and advanced features'
	};
};
