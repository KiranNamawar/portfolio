import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

// Create a writable store for the theme
function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('light');

	return {
		subscribe,
		set,
		update,
		toggle: () => update((theme) => (theme === 'light' ? 'dark' : 'light')),
		init: () => {
			if (!browser) return;

			// Check for saved theme preference or default to 'light'
			const savedTheme = localStorage.getItem('theme') as Theme;
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

			set(initialTheme);
			applyTheme(initialTheme);
		}
	};
}

export const theme = createThemeStore();

// Apply theme to the document
export function applyTheme(newTheme: Theme) {
	if (!browser) return;

	document.documentElement.setAttribute('data-theme', newTheme);
	localStorage.setItem('theme', newTheme);
}

// Subscribe to theme changes and apply them
if (browser) {
	theme.subscribe(applyTheme);
}
