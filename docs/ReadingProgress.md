# ReadingProgress Component

A responsive reading progress indicator that tracks how much of an article the user has read, with smooth animations and glassmorphism design.

## Features

- **Smart Detection**: Automatically detects blog posts and project detail pages
- **Smooth Animation**: Uses Svelte 5's Tween class for fluid progress transitions
- **Glassmorphism Design**: Consistent with the site's design system
- **Percentage Display**: Shows reading progress percentage in a floating badge
- **Responsive**: Adapts to mobile devices with smaller dimensions
- **Accessibility**: ARIA labels and progressbar role for screen readers
- **Theme Aware**: Works with both dark and light modes

## Usage

```svelte
<script>
	import ReadingProgress from '$lib/components/ui/ReadingProgress.svelte';
</script>

<!-- Add at the top of your page layout -->
<ReadingProgress />

<!-- Your article content -->
<article class="blog-post">
	<!-- Blog content -->
</article>

<!-- OR -->

<article class="project-detail">
	<!-- Project content -->
</article>
```

## Props

| Prop             | Type      | Default | Description                                           |
| ---------------- | --------- | ------- | ----------------------------------------------------- |
| `showAfter`      | `number`  | `100`   | Show progress after scrolling this many pixels        |
| `hideOnComplete` | `boolean` | `false` | Hide progress bar when reading is complete            |
| `smoothness`     | `number`  | `100`   | Animation duration in milliseconds (lower = smoother) |

## How It Works

1. **Article Detection**: Automatically finds articles with `.blog-post` or `.project-detail` classes
2. **Progress Calculation**: Calculates reading progress based on scroll position relative to article content
3. **Smooth Animation**: Uses Svelte's Tween for smooth progress bar animation
4. **Visibility Logic**: Shows after scrolling past the threshold and optionally hides when complete

## Styling

The component uses CSS variables from the design system:

```css
/* Progress bar styling */
--glass-bg: Background with glassmorphism effect --glass-border: Border color
	--glass-backdrop: Backdrop filter blur --primary-500: Progress bar color --accent-500: Accent
	gradient color /* Z-index */ --z-sticky: Fixed positioning layer;
```

## Browser Support

- Modern browsers with backdrop-filter support
- Graceful degradation for older browsers
- Reduced motion support for accessibility

## Examples

### Basic Usage

```svelte
<ReadingProgress />
```

### Custom Configuration

```svelte
<ReadingProgress showAfter={200} hideOnComplete={true} smoothness={200} />
```

### With Custom Styling

```svelte
<ReadingProgress />

<style>
	:global(.reading-progress) {
		/* Custom overrides */
		height: 6px;
	}
</style>
```

## Technical Implementation

- **Reactive calculations** using Svelte's reactive statements
- **Intersection logic** for article boundary detection
- **Smooth animations** with configurable easing curves
- **Performance optimized** with efficient scroll listeners
- **Memory leak prevention** with proper cleanup

## Accessibility

- Uses proper ARIA roles (`progressbar`)
- Includes `aria-valuenow`, `aria-valuemin`, `aria-valuemax` attributes
- Supports reduced motion preferences
- High contrast mode compatible

## Related Components

- [ThemeToggle](./ThemeToggle.md) - For theme switching
- [SearchDialog](./SearchDialog.md) - For content search
