# Theme Toggle Component

A modern, accessible theme toggle button component with glassmorphism design and smooth animations.

## Features

- ✨ **Glassmorphism Design**: Beautiful glass effect with backdrop blur
- 🌙 **Dark/Light Mode**: Seamless theme switching with system preference detection
- 📱 **Responsive**: Optimized for both desktop and mobile devices
- ♿ **Accessible**: ARIA labels, keyboard navigation, and focus indicators
- 🎨 **Customizable**: Multiple sizes and variants
- ⚡ **Animated**: Smooth transitions and micro-interactions
- 💾 **Persistent**: Remembers user preference in localStorage

## Usage

### Basic Usage

```svelte
<script>
	import { ThemeToggle } from '$lib';
</script>

<ThemeToggle />
```

### With Props

```svelte
<ThemeToggle size="lg" variant="floating" class="custom-class" />
```

## Props

| Prop      | Type                                   | Default     | Description               |
| --------- | -------------------------------------- | ----------- | ------------------------- |
| `size`    | `'sm' \| 'md' \| 'lg'`                 | `'md'`      | Size of the toggle button |
| `variant` | `'default' \| 'floating' \| 'minimal'` | `'default'` | Visual style variant      |
| `class`   | `string`                               | `''`        | Additional CSS classes    |

## Variants

### Default

Standard glassmorphism button with backdrop blur and border.

```svelte
<ThemeToggle variant="default" />
```

### Floating

Enhanced glass effect with additional shadow and glow.

```svelte
<ThemeToggle variant="floating" />
```

### Minimal

Subtle hover effect without glass styling.

```svelte
<ThemeToggle variant="minimal" />
```

## Sizes

- **sm**: 32x32px (mobile-optimized)
- **md**: 40x40px (default)
- **lg**: 48x48px (desktop emphasis)

## Theme Store

The component uses a global theme store that can be accessed throughout your application:

```svelte
<script>
	import { theme } from '$lib';

	// Subscribe to theme changes
	$: console.log('Current theme:', $theme);

	// Programmatically toggle theme
	function toggleTheme() {
		theme.toggle();
	}
</script>
```

### Theme Store Methods

- `theme.set(newTheme)` - Set theme directly
- `theme.toggle()` - Toggle between light and dark
- `theme.init()` - Initialize theme from localStorage/system preference

## Styling

The component uses CSS variables for consistent theming:

```css
:root {
	--glass-bg: rgba(255, 255, 255, 0.1);
	--glass-border: rgba(255, 255, 255, 0.2);
	--glass-shadow: rgba(0, 0, 0, 0.1);
	--glass-backdrop: blur(20px);
}

[data-theme='dark'] {
	--glass-bg: rgba(0, 0, 0, 0.3);
	--glass-border: rgba(255, 255, 255, 0.1);
	--glass-shadow: rgba(0, 0, 0, 0.3);
}
```

## Accessibility

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Indicators**: Visible focus states
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **High Contrast**: Works with system contrast settings

## Browser Support

- **Modern Browsers**: Chrome 88+, Firefox 94+, Safari 14+
- **Backdrop Filter**: Graceful degradation on unsupported browsers
- **CSS Variables**: Full support in target browsers

## Integration with Floating Dock

The theme toggle is automatically included in the FloatingDock component and can be positioned for optimal user experience on both desktop and mobile devices.

```svelte
<script>
	import { FloatingDock } from '$lib';
</script>

<FloatingDock />
```

## Customization

### Custom Styling

```svelte
<ThemeToggle class="my-custom-toggle" />

<style>
	:global(.my-custom-toggle) {
		/* Custom styles */
		--glass-bg: rgba(100, 200, 255, 0.1);
	}
</style>
```

### Custom Icons

The component uses Lucide icons (`Sun` and `Moon`). You can create a similar component with different icons by following the same pattern.

## Performance

- **Tree Shaking**: Only imports used icons
- **Minimal Bundle**: Small footprint with efficient animations
- **Optimized Transitions**: Hardware-accelerated transforms
- **Lazy Loading**: Theme initialization only in browser

## Best Practices

1. **Single Instance**: Use one theme toggle per page
2. **Consistent Placement**: Keep in navigation or floating dock
3. **Mobile Optimization**: Use smaller size on mobile devices
4. **Accessibility**: Always include proper ARIA labels

## Troubleshooting

### Theme Not Persisting

Ensure the theme store is properly initialized in your root layout:

```svelte
<!-- +layout.svelte -->
<script>
	import { onMount } from 'svelte';
	import { theme } from '$lib';

	onMount(() => {
		theme.init();
	});
</script>
```

### Glass Effects Not Working

Check if the browser supports backdrop-filter:

```css
@supports (backdrop-filter: blur(20px)) {
	.glass {
		backdrop-filter: var(--glass-backdrop);
	}
}
```
