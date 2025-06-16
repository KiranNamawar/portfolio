# Theme Customization

Personalize your portfolio's visual identity by customizing colors, typography, spacing, and effects. This guide covers everything from simple color changes to complete theme overhauls.

## 🎨 Theme System Overview

### CSS Custom Properties Architecture

The portfolio uses a comprehensive CSS custom properties system for theming:

```css
/* src/styles/variables.css */
:root {
	/* Color Palette */
	--color-primary: 59 130 246; /* Blue */
	--color-secondary: 139 92 246; /* Purple */
	--color-accent: 16 185 129; /* Emerald */
	--color-neutral: 107 114 128; /* Gray */

	/* Semantic Colors */
	--bg-primary: rgba(var(--color-primary), 0.05);
	--bg-secondary: rgba(var(--color-secondary), 0.05);
	--text-primary: 15 23 42; /* Slate 900 */
	--text-secondary: 71 85 105; /* Slate 600 */

	/* Glass Effect Variables */
	--glass-bg: rgba(255, 255, 255, 0.1);
	--glass-border: rgba(255, 255, 255, 0.2);
	--glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Dark Mode Overrides */
[data-theme='dark'] {
	--bg-primary: rgba(var(--color-primary), 0.1);
	--text-primary: 248 250 252; /* Slate 50 */
	--text-secondary: 203 213 225; /* Slate 300 */
	--glass-bg: rgba(0, 0, 0, 0.3);
	--glass-border: rgba(255, 255, 255, 0.1);
}
```

### Theme Structure

The theme system is organized into layers:

1. **Base Variables**: Core color values and measurements
2. **Semantic Variables**: Purpose-specific color assignments
3. **Component Variables**: Component-specific theming
4. **Mode Overrides**: Dark/light mode variations

## 🌈 Color Customization

### Changing Brand Colors

Update your brand colors in `src/styles/variables.css`:

```css
:root {
	/* Primary Brand Color */
	--color-primary: 220 38 127; /* Pink */
	--color-primary-50: 253 242 248;
	--color-primary-100: 252 231 243;
	--color-primary-500: 220 38 127;
	--color-primary-900: 112 26 87;

	/* Secondary Brand Color */
	--color-secondary: 34 197 94; /* Green */
	--color-secondary-50: 240 253 244;
	--color-secondary-500: 34 197 94;
	--color-secondary-900: 20 83 45;

	/* Accent Color */
	--color-accent: 249 115 22; /* Orange */
}
```

### Color Palette Generator

Use this tool to generate consistent color palettes:

```javascript
// scripts/generate-palette.js
function generatePalette(baseColor) {
	const [h, s, l] = baseColor;

	return {
		50: `${h} ${Math.max(s - 40, 10)} ${Math.min(l + 40, 95)}`,
		100: `${h} ${Math.max(s - 30, 15)} ${Math.min(l + 35, 90)}`,
		200: `${h} ${Math.max(s - 20, 20)} ${Math.min(l + 25, 85)}`,
		300: `${h} ${Math.max(s - 10, 25)} ${Math.min(l + 15, 80)}`,
		400: `${h} ${s} ${Math.min(l + 10, 75)}`,
		500: `${h} ${s} ${l}`, // Base color
		600: `${h} ${s} ${Math.max(l - 10, 25)}`,
		700: `${h} ${s} ${Math.max(l - 20, 20)}`,
		800: `${h} ${s} ${Math.max(l - 30, 15)}`,
		900: `${h} ${s} ${Math.max(l - 40, 10)}`
	};
}

// Generate palette for your brand color
const brandPalette = generatePalette([220, 70, 50]); // HSL values
console.log(brandPalette);
```

### Semantic Color Mapping

Map your brand colors to semantic purposes:

```css
:root {
	/* Status Colors */
	--color-success: var(--color-green-500);
	--color-warning: var(--color-yellow-500);
	--color-error: var(--color-red-500);
	--color-info: var(--color-blue-500);

	/* UI Colors */
	--color-border: var(--color-gray-200);
	--color-border-focus: var(--color-primary-500);
	--color-shadow: var(--color-gray-900);

	/* Background Colors */
	--bg-page: var(--color-gray-50);
	--bg-card: rgba(255, 255, 255, 0.8);
	--bg-overlay: rgba(0, 0, 0, 0.5);
}
```

## 🔤 Typography Customization

### Font Selection

Update font choices in `src/app.css`:

```css
/* Import fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
	/* Font Families */
	--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace;
	--font-serif: 'Merriweather', Georgia, serif;

	/* Font Sizes */
	--text-xs: 0.75rem; /* 12px */
	--text-sm: 0.875rem; /* 14px */
	--text-base: 1rem; /* 16px */
	--text-lg: 1.125rem; /* 18px */
	--text-xl: 1.25rem; /* 20px */
	--text-2xl: 1.5rem; /* 24px */
	--text-3xl: 1.875rem; /* 30px */
	--text-4xl: 2.25rem; /* 36px */
	--text-5xl: 3rem; /* 48px */

	/* Font Weights */
	--font-light: 300;
	--font-normal: 400;
	--font-medium: 500;
	--font-semibold: 600;
	--font-bold: 700;

	/* Line Heights */
	--leading-tight: 1.25;
	--leading-normal: 1.5;
	--leading-relaxed: 1.75;
}
```

### Typography Scale

Create a consistent typography scale:

```css
/* Heading Styles */
.heading-1 {
	font-size: var(--text-5xl);
	font-weight: var(--font-bold);
	line-height: var(--leading-tight);
	letter-spacing: -0.025em;
}

.heading-2 {
	font-size: var(--text-4xl);
	font-weight: var(--font-semibold);
	line-height: var(--leading-tight);
}

.heading-3 {
	font-size: var(--text-3xl);
	font-weight: var(--font-semibold);
	line-height: var(--leading-normal);
}

/* Body Text Styles */
.body-large {
	font-size: var(--text-lg);
	line-height: var(--leading-relaxed);
}

.body-base {
	font-size: var(--text-base);
	line-height: var(--leading-normal);
}

.body-small {
	font-size: var(--text-sm);
	line-height: var(--leading-normal);
}
```

### Responsive Typography

Implement responsive font sizes:

```css
/* Fluid Typography */
:root {
	--text-fluid-sm: clamp(0.875rem, 0.8rem + 0.4vw, 1rem);
	--text-fluid-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem);
	--text-fluid-lg: clamp(1.125rem, 1rem + 0.6vw, 1.25rem);
	--text-fluid-xl: clamp(1.25rem, 1.1rem + 0.8vw, 1.5rem);
	--text-fluid-2xl: clamp(1.5rem, 1.3rem + 1vw, 2rem);
	--text-fluid-3xl: clamp(1.875rem, 1.5rem + 1.5vw, 2.5rem);
}

/* Usage */
h1 {
	font-size: var(--text-fluid-3xl);
}

h2 {
	font-size: var(--text-fluid-2xl);
}

p {
	font-size: var(--text-fluid-base);
}
```

## 📏 Spacing and Layout

### Spacing Scale

Customize the spacing system:

```css
:root {
	/* Spacing Scale */
	--space-0: 0;
	--space-1: 0.25rem; /* 4px */
	--space-2: 0.5rem; /* 8px */
	--space-3: 0.75rem; /* 12px */
	--space-4: 1rem; /* 16px */
	--space-5: 1.25rem; /* 20px */
	--space-6: 1.5rem; /* 24px */
	--space-8: 2rem; /* 32px */
	--space-10: 2.5rem; /* 40px */
	--space-12: 3rem; /* 48px */
	--space-16: 4rem; /* 64px */
	--space-20: 5rem; /* 80px */
	--space-24: 6rem; /* 96px */

	/* Component Spacing */
	--padding-sm: var(--space-3);
	--padding-md: var(--space-4);
	--padding-lg: var(--space-6);
	--padding-xl: var(--space-8);

	--margin-sm: var(--space-2);
	--margin-md: var(--space-4);
	--margin-lg: var(--space-8);
	--margin-xl: var(--space-12);
}
```

### Border Radius

Customize border radius values:

```css
:root {
	/* Border Radius */
	--radius-none: 0;
	--radius-sm: 0.125rem; /* 2px */
	--radius-base: 0.25rem; /* 4px */
	--radius-md: 0.375rem; /* 6px */
	--radius-lg: 0.5rem; /* 8px */
	--radius-xl: 0.75rem; /* 12px */
	--radius-2xl: 1rem; /* 16px */
	--radius-3xl: 1.5rem; /* 24px */
	--radius-full: 9999px; /* Fully rounded */

	/* Component Radius */
	--radius-button: var(--radius-md);
	--radius-card: var(--radius-lg);
	--radius-modal: var(--radius-xl);
	--radius-input: var(--radius-base);
}
```

## ✨ Glass Effect Customization

### Glass Effect Variables

Customize the glassmorphism effects:

```css
:root {
	/* Glass Effect Base */
	--glass-bg-light: rgba(255, 255, 255, 0.1);
	--glass-bg-medium: rgba(255, 255, 255, 0.15);
	--glass-bg-strong: rgba(255, 255, 255, 0.2);

	--glass-border-light: rgba(255, 255, 255, 0.1);
	--glass-border-medium: rgba(255, 255, 255, 0.2);
	--glass-border-strong: rgba(255, 255, 255, 0.3);

	--glass-shadow-sm: 0 4px 16px rgba(0, 0, 0, 0.1);
	--glass-shadow-md: 0 8px 32px rgba(0, 0, 0, 0.15);
	--glass-shadow-lg: 0 16px 64px rgba(0, 0, 0, 0.2);

	/* Backdrop Blur */
	--glass-blur-sm: blur(8px);
	--glass-blur-md: blur(12px);
	--glass-blur-lg: blur(16px);
}

/* Dark Mode Overrides */
[data-theme='dark'] {
	--glass-bg-light: rgba(0, 0, 0, 0.2);
	--glass-bg-medium: rgba(0, 0, 0, 0.3);
	--glass-bg-strong: rgba(0, 0, 0, 0.4);

	--glass-border-light: rgba(255, 255, 255, 0.05);
	--glass-border-medium: rgba(255, 255, 255, 0.1);
	--glass-border-strong: rgba(255, 255, 255, 0.15);
}
```

### Custom Glass Components

Create your own glass effect variations:

```css
/* Custom Glass Cards */
.glass-card-subtle {
	background: var(--glass-bg-light);
	backdrop-filter: var(--glass-blur-sm);
	border: 1px solid var(--glass-border-light);
	box-shadow: var(--glass-shadow-sm);
}

.glass-card-prominent {
	background: var(--glass-bg-strong);
	backdrop-filter: var(--glass-blur-lg);
	border: 1px solid var(--glass-border-strong);
	box-shadow: var(--glass-shadow-lg);
}

.glass-card-colored {
	background: rgba(var(--color-primary), 0.1);
	backdrop-filter: var(--glass-blur-md);
	border: 1px solid rgba(var(--color-primary), 0.2);
	box-shadow: 0 8px 32px rgba(var(--color-primary), 0.1);
}
```

## 🌗 Dark Mode Customization

### Advanced Dark Mode

Create sophisticated dark mode themes:

```css
[data-theme='dark'] {
	/* Dark Background Variations */
	--bg-primary: rgb(15, 23, 42); /* Slate 900 */
	--bg-secondary: rgb(30, 41, 59); /* Slate 800 */
	--bg-tertiary: rgb(51, 65, 85); /* Slate 700 */

	/* Dark Text Colors */
	--text-primary: rgb(248, 250, 252); /* Slate 50 */
	--text-secondary: rgb(203, 213, 225); /* Slate 300 */
	--text-tertiary: rgb(148, 163, 184); /* Slate 400 */

	/* Dark Accent Colors */
	--color-primary: 99 102 241; /* Indigo 500 */
	--color-secondary: 168 85 247; /* Purple 500 */
	--color-accent: 34 197 94; /* Green 500 */

	/* Dark Borders */
	--border-primary: rgb(71, 85, 105); /* Slate 600 */
	--border-secondary: rgb(51, 65, 85); /* Slate 700 */
}
```

### Theme Toggle Animation

Enhance the theme transition:

```css
/* Smooth Theme Transitions */
* {
	transition:
		background-color 0.3s ease,
		border-color 0.3s ease,
		color 0.3s ease,
		fill 0.3s ease,
		stroke 0.3s ease,
		opacity 0.3s ease,
		box-shadow 0.3s ease,
		transform 0.3s ease;
}

/* Prevent transitions on page load */
.preload * {
	transition: none !important;
}
```

## 🎯 Component-Specific Theming

### Button Themes

```css
.btn-primary {
	background: linear-gradient(135deg, rgb(var(--color-primary)), rgb(var(--color-secondary)));
	color: white;
	border: none;
	box-shadow: 0 4px 16px rgba(var(--color-primary), 0.3);
}

.btn-primary:hover {
	transform: translateY(-2px);
	box-shadow: 0 8px 24px rgba(var(--color-primary), 0.4);
}

.btn-glass {
	background: var(--glass-bg-medium);
	backdrop-filter: var(--glass-blur-md);
	border: 1px solid var(--glass-border-medium);
	color: rgb(var(--text-primary));
}
```

### Card Themes

```css
.card-gradient {
	background: linear-gradient(
		135deg,
		rgba(var(--color-primary), 0.1),
		rgba(var(--color-secondary), 0.1)
	);
	border: 1px solid rgba(var(--color-primary), 0.2);
}

.card-neon {
	background: var(--bg-secondary);
	border: 2px solid rgb(var(--color-accent));
	box-shadow:
		0 0 20px rgba(var(--color-accent), 0.3),
		inset 0 0 20px rgba(var(--color-accent), 0.1);
}
```

## 🎨 Theme Presets

### Pre-built Themes

Create theme presets for quick switching:

```css
/* Ocean Theme */
[data-theme='ocean'] {
	--color-primary: 14 165 233; /* Sky Blue */
	--color-secondary: 6 182 212; /* Cyan */
	--color-accent: 34 211 238; /* Light Blue */
	--glass-bg: rgba(14, 165, 233, 0.1);
	--glass-border: rgba(14, 165, 233, 0.2);
}

/* Forest Theme */
[data-theme='forest'] {
	--color-primary: 34 197 94; /* Green */
	--color-secondary: 101 163 13; /* Lime */
	--color-accent: 132 204 22; /* Light Green */
	--glass-bg: rgba(34, 197, 94, 0.1);
	--glass-border: rgba(34, 197, 94, 0.2);
}

/* Sunset Theme */
[data-theme='sunset'] {
	--color-primary: 249 115 22; /* Orange */
	--color-secondary: 244 63 94; /* Rose */
	--color-accent: 251 191 36; /* Yellow */
	--glass-bg: rgba(249, 115, 22, 0.1);
	--glass-border: rgba(249, 115, 22, 0.2);
}
```

### Theme Selector Component

```svelte
<!-- src/lib/components/ui/ThemeSelector.svelte -->
<script lang="ts">
	import { theme } from '$lib/stores/theme';

	const themes = [
		{ id: 'light', name: 'Light', colors: ['#3b82f6', '#8b5cf6'] },
		{ id: 'dark', name: 'Dark', colors: ['#6366f1', '#a855f7'] },
		{ id: 'ocean', name: 'Ocean', colors: ['#0ea5e9', '#06b6d4'] },
		{ id: 'forest', name: 'Forest', colors: ['#22c55e', '#65a30d'] },
		{ id: 'sunset', name: 'Sunset', colors: ['#f97316', '#f43f5e'] }
	];

	function setTheme(themeId: string) {
		theme.set(themeId);
		document.documentElement.setAttribute('data-theme', themeId);
	}
</script>

<div class="theme-selector">
	{#each themes as themeOption}
		<button
			class="theme-option"
			class:active={$theme === themeOption.id}
			on:click={() => setTheme(themeOption.id)}
		>
			<div class="theme-preview">
				{#each themeOption.colors as color}
					<div class="color-swatch" style="background: {color}"></div>
				{/each}
			</div>
			<span>{themeOption.name}</span>
		</button>
	{/each}
</div>
```

## 🔧 Theme Development Tools

### CSS Variable Inspector

```javascript
// scripts/inspect-variables.js
function inspectCSSVariables() {
	const root = document.documentElement;
	const computed = getComputedStyle(root);
	const variables = {};

	for (let i = 0; i < computed.length; i++) {
		const name = computed[i];
		if (name.startsWith('--')) {
			variables[name] = computed.getPropertyValue(name).trim();
		}
	}

	console.table(variables);
	return variables;
}

// Run in browser console
inspectCSSVariables();
```

### Theme Validation

```javascript
// scripts/validate-theme.js
function validateTheme() {
	const requiredVariables = [
		'--color-primary',
		'--color-secondary',
		'--color-accent',
		'--text-primary',
		'--text-secondary',
		'--bg-primary',
		'--bg-secondary'
	];

	const missing = requiredVariables.filter((variable) => {
		const value = getComputedStyle(document.documentElement).getPropertyValue(variable);
		return !value || value.trim() === '';
	});

	if (missing.length > 0) {
		console.error('Missing required CSS variables:', missing);
	} else {
		console.log('✅ All required theme variables are defined');
	}
}
```

## 📋 Theme Customization Checklist

### Basic Customization

- [ ] Update primary brand color
- [ ] Update secondary brand color
- [ ] Update accent color
- [ ] Test color contrast ratios
- [ ] Verify dark mode compatibility

### Advanced Customization

- [ ] Customize typography (fonts, sizes, weights)
- [ ] Adjust spacing scale
- [ ] Modify border radius values
- [ ] Customize glass effects
- [ ] Create component-specific themes

### Testing

- [ ] Test in light mode
- [ ] Test in dark mode
- [ ] Test on different devices
- [ ] Verify accessibility standards
- [ ] Check color blindness compatibility

### Documentation

- [ ] Document color choices
- [ ] Create theme style guide
- [ ] Update component documentation
- [ ] Create theme switching guide

---

**Related Documentation:**

- [Glass Effect System](../components/glass-effect-system.md) - Visual effects
- [UI Components](../components/ui-components.md) - Component theming
- [Personal Info](personal-info.md) - Brand customization
