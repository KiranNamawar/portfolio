# Enhanced Image Component

The Enhanced Image component is a feature-rich, accessible image component built with Svelte 5 and inspired by the ProjectGallery component. It provides advanced functionality including glassmorphism effects, zoom controls, pan functionality, and fullscreen support.

## Features

### 🎨 Visual Effects

- **Glassmorphism Design**: Auto-hiding glass overlays with backdrop blur
- **Smooth Animations**: Hover effects with scale and lift transformations
- **Theme Compatibility**: Automatically adapts to light/dark modes
- **Responsive Design**: Mobile-optimized with touch-friendly controls

### 🔍 Advanced Lightbox

- **Zoom Controls**: Zoom in/out with configurable min/max levels
- **Pan Functionality**: Drag to pan when zoomed, with keyboard arrow support
- **Fullscreen Mode**: Native fullscreen API integration
- **Keyboard Navigation**: Comprehensive keyboard shortcuts

### ⚡ Performance

- **Lazy Loading**: IntersectionObserver-based lazy loading
- **Error Handling**: Graceful fallbacks for failed image loads
- **Loading States**: Smooth loading animations

### ♿ Accessibility

- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus handling in lightbox mode
- **High Contrast Support**: Respects user preferences

## Props

### Basic Props

```typescript
export let src: string; // Image source URL
export let alt: string = ''; // Alt text for accessibility
export let caption: string = ''; // Optional caption text
export let width: string | number = 'auto'; // Image width
export let height: string | number = 'auto'; // Image height
export let aspectRatio: string = 'auto'; // CSS aspect-ratio value
```

### Feature Toggles

```typescript
export let zoomable: boolean = true; // Enable/disable zoom functionality
export let lazy: boolean = true; // Enable/disable lazy loading
export let enablePan: boolean = true; // Enable/disable pan in lightbox
export let enableFullscreen: boolean = true; // Enable/disable fullscreen
```

### Advanced Configuration

```typescript
export let maxZoom: number = 3; // Maximum zoom level
export let minZoom: number = 0.5; // Minimum zoom level
```

## Usage Examples

### Basic Usage

```svelte
<Image src="/path/to/image.jpg" alt="Description of the image" caption="Optional caption text" />
```

### Custom Dimensions

```svelte
<Image
	src="/path/to/image.jpg"
	alt="Custom sized image"
	width={400}
	aspectRatio="16/9"
	caption="400px wide with 16:9 aspect ratio"
/>
```

### Advanced Configuration

```svelte
<Image
	src="/path/to/image.jpg"
	alt="High-resolution image"
	caption="Supports 5x zoom with pan and fullscreen"
	maxZoom={5}
	enablePan={true}
	enableFullscreen={true}
/>
```

### Disabled Features

```svelte
<Image
	src="/path/to/image.jpg"
	alt="Simple image"
	zoomable={false}
	lazy={false}
	caption="No zoom or lazy loading"
/>
```

## Keyboard Shortcuts

When the lightbox is open, the following keyboard shortcuts are available:

| Key          | Action                |
| ------------ | --------------------- |
| `+` or `=`   | Zoom in               |
| `-`          | Zoom out              |
| `0`          | Reset zoom to 100%    |
| `f` or `F`   | Toggle fullscreen     |
| `Arrow Keys` | Pan image when zoomed |
| `Escape`     | Close lightbox        |

## Glass Effect System

The component uses the established glass effect system with the following classes:

- `.glass-overlay-container` - Parent container for auto-hide overlays
- `.glass-overlay-auto-hide` - Auto-hiding glass overlay (appears on hover)
- `.glass-control-btn` - Glassmorphism control buttons
- `.glass-modal-backdrop` - Full-screen modal backdrop
- `.glass-modal` - Modal content with glass effects

## CSS Custom Properties

The component uses CSS custom properties for consistent theming:

```css
:root {
	--image-border-radius: 1rem;
	--image-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	--image-hover-scale: 1.05;
	--image-hover-lift: -8px;
}
```

## States and Interactions

### Loading State

- Shows animated spinner while image loads
- Smooth opacity transition when loaded
- Lazy loading with IntersectionObserver

### Error State

- Displays error icon and message if image fails to load
- Maintains consistent layout structure
- Accessible error description

### Hover State

- Glass overlay appears with zoom icon
- Image scales and lifts with smooth animation
- Copy URL button becomes visible

### Lightbox State

- Full-screen overlay with glass backdrop
- Zoom controls in header
- Pan functionality when zoomed
- Keyboard navigation support

## Responsive Behavior

### Desktop

- Hover effects and smooth animations
- Auto-hiding glass overlays
- Full keyboard navigation support

### Mobile

- Touch-friendly controls
- Overlays always visible (no hover dependency)
- Optimized lightbox layout
- Reduced motion support

## Accessibility Features

### Screen Readers

- Proper ARIA labels and descriptions
- Role attributes for interactive elements
- Alternative text for all visual elements

### Keyboard Navigation

- Tab navigation through all interactive elements
- Keyboard shortcuts for lightbox controls
- Focus management in modal state

### User Preferences

- Respects `prefers-reduced-motion`
- Supports `prefers-contrast: high`
- Compatible with system theme preferences

## Integration with Design System

The Enhanced Image component integrates seamlessly with the existing design system:

- Uses CSS variables from the global theme
- Follows established spacing and typography patterns
- Implements consistent glassmorphism effects
- Supports both light and dark modes

## Performance Considerations

- Lazy loading reduces initial page load
- Efficient IntersectionObserver usage
- Optimized event listeners with proper cleanup
- Minimal DOM manipulation during interactions

## Browser Support

- Modern browsers with ES6+ support
- Graceful degradation for older browsers
- Fullscreen API support (optional feature)
- IntersectionObserver with polyfill fallback

## Demo

Visit `/image-demo` to see the Enhanced Image component in action with various configurations and use cases.
