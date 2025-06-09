import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

// Create a writable store for the theme
function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('light');

	return {
		subscribe,
		set: (value: Theme) => {
			set(value);
			applyTheme(value);
		},
		update,
		toggle: () =>
			update((theme) => {
				const newTheme = theme === 'light' ? 'dark' : 'light';
				applyTheme(newTheme);
				return newTheme;
			}),
		init: () => {
			if (!browser) return;

			// Check for saved theme preference or default to system preference
			const savedTheme = localStorage.getItem('theme') as Theme | null;
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
	document.documentElement.classList.remove('light', 'dark');
	document.documentElement.classList.add(newTheme);
	localStorage.setItem('theme', newTheme);
}
