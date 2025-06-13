# TableOfContents Component

A sophisticated Table of Contents component that automatically generates navigation for blog posts and project documentation with glassmorphism design.

## Features

- **Automatic Heading Detection**: Scans content for h2-h6 headings and generates navigation
- **Active Section Highlighting**: Tracks which section is currently visible using Intersection Observer
- **Smooth Scrolling**: Provides smooth navigation between sections
- **Responsive Design**: Adapts to different screen sizes with mobile-optimized behavior
- **Glassmorphism Design**: Follows the established design system with glass effects
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance Optimized**: Efficient scroll tracking with proper cleanup

## Usage

### Basic Usage

The component is automatically integrated into `BlogLayout` and `ProjectLayout`. It will appear when content has 3 or more headings.

```svelte
<script>
	import TableOfContents from '$lib/components/ui/TableOfContents.svelte';
</script>

<TableOfContents />
```

### With Custom Configuration

```svelte
<TableOfContents isOpen={false} showToggle={true} minHeadings={3} />
```

## Props

| Prop          | Type      | Default | Description                                     |
| ------------- | --------- | ------- | ----------------------------------------------- |
| `isOpen`      | `boolean` | `false` | Controls the initial open/closed state          |
| `showToggle`  | `boolean` | `true`  | Shows or hides the toggle button                |
| `minHeadings` | `number`  | `3`     | Minimum number of headings required to show TOC |

## Behavior

### Desktop

- Positioned as a floating panel on the right side of the screen
- Toggle button shows content count and expand/collapse state
- Smooth hover effects and active section highlighting

### Mobile

- Positioned above the floating dock at the bottom of the screen
- Automatically closes after navigation to prevent blocking content
- Responsive sizing for smaller screens
- Hidden on very small screens (< 480px)

### Tablet

- Adapts positioning and sizing for tablet viewports
- Maintains functionality with touch-friendly interactions

## Heading Structure

The component automatically generates navigation based on heading hierarchy:

```markdown
## Level 2 Heading (h2)

### Level 3 Heading (h3)

#### Level 4 Heading (h4)

##### Level 5 Heading (h5)

###### Level 6 Heading (h6)
```

- **h1** headings are ignored (typically used for page titles)
- **h2-h6** headings are included in the navigation
- Proper indentation shows heading hierarchy
- Automatic slug generation for headings without IDs

## Styling

The component uses CSS variables from the design system:

### Key Variables

- `--glass-bg`: Glass background with blur effect
- `--glass-border`: Glass border color
- `--glass-shadow`: Glass shadow effects
- `--primary-*`: Primary color variants for active states
- `--color-text-*`: Text color hierarchy

### Glass Effects

- **Toggle Button**: `.glass-button` with hover effects
- **Content Panel**: `.glass-card` with backdrop blur
- **Active Links**: Primary color highlighting with glass background

## Accessibility

### Keyboard Navigation

- **Escape**: Close the TOC when open
- **Tab**: Navigate through TOC links
- **Enter/Space**: Activate TOC links

### Screen Reader Support

- Proper ARIA labels and roles
- Semantic HTML structure
- Descriptive link text

### Motion Preferences

- Respects `prefers-reduced-motion` setting
- Disables animations for users who prefer reduced motion

## Browser Support

- **Chrome**: 58+ (Intersection Observer support)
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+

## Integration

### Blog Posts

Automatically included in `BlogLayout.svelte`:

```svelte
<TableOfContents />
```

### Project Documentation

Automatically included in `ProjectLayout.svelte`:

```svelte
<TableOfContents />
```

### Custom Integration

Can be used in any component that renders markdown content:

```svelte
<script>
	import TableOfContents from '$lib/components/ui/TableOfContents.svelte';
</script>

<TableOfContents minHeadings={2} />
<main>
	<!-- Your content here -->
</main>
```

## Technical Details

### Intersection Observer

Uses Intersection Observer API for efficient scroll tracking:

```javascript
const options = {
	rootMargin: '-20% 0px -60% 0px',
	threshold: 0
};
```

### Slug Generation

Automatic slug generation for headings without IDs:

```javascript
function generateSlug(text) {
	return text
		.toLowerCase()
		.replace(/[^\w\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/--+/g, '-')
		.trim();
}
```

### Performance Optimizations

- Lazy heading extraction after content renders
- Efficient observer cleanup on component destruction
- Minimal DOM manipulation during scroll tracking

## Customization

### Styling

Override CSS variables in your theme:

```css
:root {
	--toc-width: 320px;
	--toc-max-height: 70vh;
	--toc-indent-base: 1rem;
}
```

### Behavior

Customize behavior through props:

```svelte
<TableOfContents minHeadings={2} isOpen={true} showToggle={false} />
```

## Best Practices

### Content Structure

1. Use logical heading hierarchy (h2 → h3 → h4)
2. Write descriptive, meaningful headings
3. Avoid skipping heading levels
4. Keep headings concise but descriptive

### Performance

1. Content with 10+ headings works well
2. Very long pages (50+ headings) may need custom styling
3. Component automatically handles cleanup

### UX Considerations

1. TOC appears automatically when content has sufficient headings
2. Mobile users can close TOC by clicking outside
3. Active section highlighting helps users track progress
4. Smooth scrolling provides polished navigation experience

## Examples

### Blog Post Integration

```markdown
---
title: 'My Blog Post'
description: 'A comprehensive guide'
date: '2025-06-13'
---

# My Blog Post

## Introduction

Content here...

## Getting Started

### Prerequisites

### Installation

## Advanced Topics

### Configuration

### Customization

## Conclusion
```

### Project Documentation

```markdown
---
title: 'Project Documentation'
description: 'Technical documentation'
date: '2025-06-13'
---

# Project Documentation

## Overview

## Architecture

### Frontend

### Backend

## API Reference

### Endpoints

### Authentication

## Deployment
```

The TableOfContents component will automatically generate navigation for both examples, showing proper hierarchy and active section tracking.
