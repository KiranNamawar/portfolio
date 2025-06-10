# Glass Effect System Documentation

## Overview

The Glass Effect System provides a comprehensive set of CSS utility classes and variables for implementing consistent glassmorphism design throughout the portfolio. The system was extracted from the beautiful glass effects used in the ProjectGallery lightbox overlays.

## File Structure

```
src/styles/
├── variables.css    # CSS custom properties for glass effects
└── utilities.css    # Glass effect utility classes
```

## CSS Variables

### Light Mode Variables

```css
:root {
	/* Enhanced Glass Effects for Components */
	--glass-overlay-bg: rgba(255, 255, 255, 0.15);
	--glass-overlay-border: rgba(255, 255, 255, 0.25);
	--glass-overlay-hover-bg: rgba(255, 255, 255, 0.2);
	--glass-overlay-shadow: 0 8px 32px rgba(194, 65, 12, 0.12);

	/* Glass Modal/Lightbox Effects */
	--glass-modal-bg: rgba(255, 255, 255, 0.15);
	--glass-modal-border: rgba(255, 255, 255, 0.25);
	--glass-modal-backdrop: rgba(0, 0, 0, 0.95);
	--glass-modal-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}
```

### Dark Mode Variables

```css
[data-theme='dark'] {
	/* Enhanced Glass Effects for Components */
	--glass-overlay-bg: rgba(0, 0, 0, 0.3);
	--glass-overlay-border: rgba(255, 255, 255, 0.15);
	--glass-overlay-hover-bg: rgba(0, 0, 0, 0.4);
	--glass-overlay-shadow: 0 8px 32px rgba(14, 165, 233, 0.15);

	/* Glass Modal/Lightbox Effects */
	--glass-modal-bg: rgba(0, 0, 0, 0.3);
	--glass-modal-border: rgba(255, 255, 255, 0.15);
	--glass-modal-backdrop: rgba(0, 0, 0, 0.95);
	--glass-modal-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}
```

## Utility Classes

### Basic Glass Effects

#### `.glass`

Basic glass effect with background blur.

```css
.glass {
	background: var(--glass-bg);
	backdrop-filter: var(--glass-backdrop);
	border: 1px solid var(--glass-border);
	box-shadow: 0 4px 6px -1px var(--glass-shadow);
}
```

#### `.glass-card`

Glass card with padding and rounded corners.

```css
.glass-card {
	background: var(--glass-bg);
	backdrop-filter: var(--glass-backdrop);
	border: 1px solid var(--glass-border);
	box-shadow: 0 4px 6px -1px var(--glass-shadow);
	border-radius: var(--radius-xl);
	padding: var(--space-6);
	width: 100%;
	box-sizing: border-box;
}
```

#### `.glass-button`

Interactive glass button with hover effects.

```css
.glass-button {
	background: var(--glass-bg);
	backdrop-filter: var(--glass-backdrop);
	border: 1px solid var(--glass-border);
	box-shadow: 0 4px 6px -1px var(--glass-shadow);
	border-radius: var(--radius-lg);
	padding: var(--space-3) var(--space-6);
	transition: all var(--transition-fast);
}

.glass-button:hover {
	transform: translateY(-2px);
	box-shadow: 0 8px 16px var(--glass-shadow);
}
```

### Advanced Glass Overlays

#### `.glass-overlay`

Static glass overlay with hover enhancement.

```css
.glass-overlay {
	background: var(--glass-overlay-bg);
	border: 1px solid var(--glass-overlay-border);
	border-radius: 0.75rem;
	backdrop-filter: blur(20px);
	box-shadow: var(--glass-overlay-shadow);
	transition: all 0.3s ease;
}

.glass-overlay:hover {
	background: var(--glass-overlay-hover-bg);
	transform: translateY(-1px);
}
```

#### `.glass-overlay-auto-hide`

Auto-hiding glass overlay that appears on parent hover.

```css
.glass-overlay-auto-hide {
	background: var(--glass-overlay-bg);
	border: 1px solid var(--glass-overlay-border);
	border-radius: 0.75rem;
	backdrop-filter: blur(20px);
	box-shadow: var(--glass-overlay-shadow);
	opacity: 0;
	transition:
		opacity 0.3s ease,
		transform 0.3s ease;
	transform: translateY(10px);
	pointer-events: none;
}

.glass-overlay-auto-hide.visible,
.glass-overlay-container:hover .glass-overlay-auto-hide {
	opacity: 0.95;
	transform: translateY(0);
	pointer-events: auto;
}

.glass-overlay-auto-hide:hover {
	opacity: 1;
}
```

#### `.glass-overlay-container`

Parent container for auto-hide overlays.

### Modal Effects

#### `.glass-modal`

Full glass modal with enhanced backdrop.

```css
.glass-modal {
	background: var(--glass-modal-bg);
	border: 1px solid var(--glass-modal-border);
	border-radius: 1rem;
	backdrop-filter: blur(20px);
	box-shadow: var(--glass-modal-shadow);
	color: white;
}
```

#### `.glass-modal-backdrop`

Modal backdrop with glass blur effect.

```css
.glass-modal-backdrop {
	background: var(--glass-modal-backdrop);
	backdrop-filter: blur(20px);
}
```

### Control Elements

#### `.glass-control-btn`

Control buttons for overlays/modals.

```css
.glass-control-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 0.5rem;
	color: white;
	cursor: pointer;
	transition: all 0.3s ease;
	backdrop-filter: blur(10px);
}

.glass-control-btn:hover {
	background: rgba(255, 255, 255, 0.2);
	transform: scale(1.05);
}
```

#### `.glass-control-btn.danger`

Danger variant with red tint.

```css
.glass-control-btn.danger {
	background: rgba(239, 68, 68, 0.2);
	border-color: rgba(239, 68, 68, 0.3);
}

.glass-control-btn.danger:hover {
	background: rgba(239, 68, 68, 0.3);
}
```

#### `.glass-nav-btn`

Navigation buttons (circular, larger).

```css
.glass-nav-btn {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 48px;
	height: 48px;
	background: rgba(255, 255, 255, 0.1);
	border: 1px solid rgba(255, 255, 255, 0.2);
	border-radius: 50%;
	color: white;
	cursor: pointer;
	transition: all 0.3s ease;
	backdrop-filter: blur(10px);
}

.glass-nav-btn:hover:not(:disabled) {
	background: rgba(255, 255, 255, 0.2);
	transform: scale(1.1);
}

.glass-nav-btn:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}
```

## Usage Examples

### Auto-hiding Header/Footer (ProjectGallery Style)

```svelte
<div class="glass-overlay-container">
	<div class="glass-overlay-auto-hide">
		<div class="flex items-center justify-between p-3">
			<span>Header content</span>
			<button class="glass-control-btn">
				<X size={20} />
			</button>
		</div>
	</div>

	<!-- Main content -->
	<div class="main-content">
		<!-- Your content here -->
	</div>

	<div class="glass-overlay-auto-hide">
		<div class="flex items-center justify-center gap-4 p-3">
			<button class="glass-nav-btn">
				<ChevronLeft size={24} />
			</button>
			<div class="flex gap-2">
				<!-- Navigation items -->
			</div>
			<button class="glass-nav-btn">
				<ChevronRight size={24} />
			</button>
		</div>
	</div>
</div>
```

### Glass Modal

```svelte
{#if showModal}
	<div class="fixed inset-0 glass-modal-backdrop flex items-center justify-center">
		<div class="glass-modal p-6 max-w-md">
			<div class="flex items-center justify-between mb-4">
				<h2 class="text-xl font-semibold">Modal Title</h2>
				<button class="glass-control-btn" on:click={closeModal}>
					<X size={20} />
				</button>
			</div>
			<p class="text-sm opacity-90">Modal content goes here...</p>
			<div class="flex gap-3 mt-6">
				<button class="glass-button">Cancel</button>
				<button class="glass-control-btn danger">Delete</button>
			</div>
		</div>
	</div>
{/if}
```

### Glass Card Component

```svelte
<div class="glass-card">
	<h3 class="text-lg font-semibold mb-3">Card Title</h3>
	<p class="text-sm opacity-80">Card content with beautiful glass effect.</p>
	<button class="glass-button mt-4"> Learn More </button>
</div>
```

### Simple Glass Overlay

```svelte
<div class="relative group">
	<img src="/image.jpg" alt="Description" class="w-full h-64 object-cover rounded-lg" />
	<div
		class="absolute inset-0 glass-overlay opacity-0 group-hover:opacity-100 flex items-center justify-center"
	>
		<button class="glass-control-btn">
			<ZoomIn size={20} />
		</button>
	</div>
</div>
```

## Implementation Notes

### Browser Support

- **Backdrop-filter**: Supported in modern browsers (Chrome 76+, Firefox 103+, Safari 14+)
- **Fallback**: Glass effects degrade gracefully to solid backgrounds in unsupported browsers

### Performance Considerations

- Backdrop-filter can be performance-intensive on mobile devices
- Use sparingly and test on target devices
- Consider reducing blur intensity on mobile if needed

### Accessibility

- Ensure sufficient contrast ratios for text over glass effects
- Provide focus styles for interactive glass elements
- Test with screen readers and keyboard navigation

### Customization

- All glass effects use CSS custom properties for easy theming
- Colors automatically adapt to light/dark mode
- Border radius and spacing use design system tokens

## Best Practices

1. **Consistency**: Use the utility classes instead of custom CSS for glass effects
2. **Performance**: Limit the number of glass elements visible at once
3. **Accessibility**: Ensure text remains readable over glass backgrounds
4. **Mobile**: Test glass effects on mobile devices for performance
5. **Fallbacks**: Provide solid color fallbacks for unsupported browsers

## Migration Guide

### From Custom Glass CSS

Replace custom glass effect CSS with utility classes:

```css
/* Before */
.custom-glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* After */
<div class="glass-overlay">
```

### Adding to Existing Components

1. Replace custom glass CSS with utility classes
2. Use `glass-overlay-container` for auto-hide behavior
3. Apply `glass-control-btn` to buttons within glass overlays
4. Use `glass-modal-backdrop` for modal backgrounds

This system provides a complete, reusable solution for glassmorphism effects throughout the portfolio while maintaining consistency and performance.

- **Modularity**: Reusable utility classes for different use cases
- **Performance**: Optimized backdrop-filter usage

## 🔧 System Architecture

### 1. CSS Custom Properties (`src/styles/variables.css`)

#### Light Theme (Warm Tint)

```css
--glass-bg: rgba(255, 251, 247, 0.7);
--glass-border: rgba(249, 115, 22, 0.2);
--glass-shadow: rgba(194, 65, 12, 0.1);
--glass-backdrop: blur(20px);

/* Enhanced Glass Effects */
--glass-overlay-bg: rgba(255, 255, 255, 0.15);
--glass-overlay-border: rgba(255, 255, 255, 0.25);
--glass-overlay-hover-bg: rgba(255, 255, 255, 0.2);
--glass-overlay-shadow: 0 8px 32px rgba(194, 65, 12, 0.12);

/* Modal/Lightbox Effects */
--glass-modal-bg: rgba(255, 255, 255, 0.15);
--glass-modal-border: rgba(255, 255, 255, 0.25);
--glass-modal-backdrop: rgba(0, 0, 0, 0.95);
--glass-modal-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
```

#### Dark Theme (Cool Tint)

```css
--glass-bg: rgba(12, 20, 32, 0.8);
--glass-border: rgba(56, 189, 248, 0.2);
--glass-shadow: rgba(14, 165, 233, 0.2);

/* Enhanced Glass Effects */
--glass-overlay-bg: rgba(0, 0, 0, 0.3);
--glass-overlay-border: rgba(255, 255, 255, 0.15);
--glass-overlay-hover-bg: rgba(0, 0, 0, 0.4);
--glass-overlay-shadow: 0 8px 32px rgba(14, 165, 233, 0.15);

/* Modal/Lightbox Effects */
--glass-modal-bg: rgba(0, 0, 0, 0.3);
--glass-modal-border: rgba(255, 255, 255, 0.15);
--glass-modal-backdrop: rgba(0, 0, 0, 0.95);
--glass-modal-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
```

### 2. Utility Classes (`src/styles/utilities.css`)

#### Basic Glass Effects

```css
.glass
.glass-card
.glass-button
```

#### Enhanced Glass Effects (ProjectGallery Style)

```css
.glass-overlay
.glass-overlay-auto-hide
.glass-overlay-container
.glass-modal
.glass-modal-backdrop
```

#### Control Elements

```css
.glass-control-btn
.glass-control-btn.danger
.glass-nav-btn
```

## 📚 Usage Examples

### 1. Basic Glass Card

```svelte
<div class="glass-card">
	<h2>Glass Card Content</h2>
	<p>This card has a beautiful glass effect.</p>
</div>
```

### 2. Auto-Hide Glass Overlay (ProjectGallery Style)

```svelte
<div class="glass-overlay-container">
	<!-- Main content -->
	<div class="main-content">Content here</div>

	<!-- Auto-hide overlay -->
	<div class="glass-overlay-auto-hide">
		<p>This appears on hover</p>
	</div>
</div>
```

### 3. Glass Modal

```svelte
<div class="glass-modal-backdrop">
	<div class="glass-modal">
		<h2>Modal Title</h2>
		<p>Modal content with glass effect</p>
	</div>
</div>
```

### 4. Glass Control Buttons

```svelte
<button class="glass-control-btn">
	<Icon size={20} />
</button>

<button class="glass-control-btn danger">
	<X size={20} />
</button>
```

## 🎯 Implementation Examples

### ProjectGallery Lightbox

The ProjectGallery component demonstrates the most advanced usage:

```svelte
<div class="lightbox-backdrop glass-modal-backdrop">
	<div class="lightbox-content glass-overlay-container">
		<!-- Auto-hide header -->
		<div class="lightbox-header glass-overlay-auto-hide">
			<div class="lightbox-info">...</div>
			<div class="lightbox-controls">
				<button class="glass-control-btn">...</button>
				<button class="glass-control-btn danger">...</button>
			</div>
		</div>

		<!-- Auto-hide navigation -->
		<div class="lightbox-navigation glass-overlay-auto-hide">
			<button class="glass-nav-btn">...</button>
			<button class="glass-nav-btn">...</button>
		</div>
	</div>
</div>
```

## 🔄 Auto-Hide Behavior

The auto-hide system works through CSS-only interactions:

1. **Default State**: `opacity: 0`, `pointer-events: none`
2. **On Container Hover**: `opacity: 0.95`, `pointer-events: auto`
3. **On Element Hover**: `opacity: 1`

This creates a smooth, non-intrusive user experience where controls appear when needed.

## 🎨 Visual Characteristics

### Light Theme (Warm)

- **Base Color**: Warm white with orange tint
- **Border**: Subtle orange glow
- **Shadow**: Warm orange undertones
- **Backdrop**: 20px blur for depth

### Dark Theme (Cool)

- **Base Color**: Dark navy with blue tint
- **Border**: Cool blue glow
- **Shadow**: Blue undertones
- **Backdrop**: Enhanced contrast for visibility

## 🚀 Performance Considerations

1. **Backdrop Filter**: Used judiciously with 20px blur
2. **GPU Acceleration**: Triggered through transforms
3. **Transition Optimization**: Uses `transform` and `opacity` for smooth animations
4. **Reduced Motion**: Respects user preferences

## 📱 Responsive Behavior

- **Mobile**: Auto-hide overlays become always visible for touch interfaces
- **Desktop**: Hover-based interactions work as expected
- **Accessibility**: Focus states and keyboard navigation preserved

## 🔧 Customization

### Adding New Glass Effects

1. Define new CSS custom properties in `variables.css`
2. Create utility classes in `utilities.css`
3. Test in both light and dark themes

### Extending Auto-Hide Behavior

Use the `.glass-overlay-container` and `.glass-overlay-auto-hide` pattern:

```css
.my-container {
	/* Apply to parent container */
}

.my-overlay {
	/* Extend .glass-overlay-auto-hide */
	@extend .glass-overlay-auto-hide;
	/* Add custom positioning/styling */
}
```

## 🎯 Best Practices

1. **Consistent Blur**: Always use 20px backdrop-filter for consistency
2. **Semantic Classes**: Use purpose-specific classes over generic ones
3. **Theme Testing**: Test all glass effects in both themes
4. **Performance**: Limit the number of elements with backdrop-filter
5. **Accessibility**: Ensure sufficient contrast and focus indicators

## 🔍 Troubleshooting

### Common Issues

1. **Blur Not Showing**: Check if backdrop-filter is supported
2. **Poor Performance**: Reduce number of elements with backdrop-filter
3. **Theme Inconsistency**: Verify CSS custom properties are properly defined

### Browser Support

- **Modern Browsers**: Full support
- **Safari**: Requires `-webkit-backdrop-filter`
- **Firefox**: Full support (recent versions)
- **Edge/Chrome**: Full support

## 📈 Future Enhancements

1. **Additional Variants**: Different blur levels, opacity levels
2. **Animation Presets**: Pre-defined animation patterns
3. **Color Customization**: Per-component color overrides
4. **Performance Monitoring**: Backdrop-filter performance metrics
