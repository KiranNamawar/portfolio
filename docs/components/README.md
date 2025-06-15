# Component System

Welcome to the comprehensive component documentation! This portfolio uses a modern, reusable component system built with SvelteKit that makes customization and extension easy.

## 🎯 Overview

The component system is organized into several categories:

- **[UI Components](ui-components.md)** - Interactive elements and widgets
- **[Layout Components](layout-components.md)** - Page structures and containers
- **[Glass Effect System](glass-effect-system.md)** - Modern glassmorphism design utilities
- **[Component Usage Guide](component-usage-guide.md)** - How to use components effectively

## 🏗️ Component Architecture

### Component Organization

```
src/lib/components/
├── about/              # About page specific components
│   └── DetailedSkillsShowcase.svelte
├── home/               # Homepage components
│   ├── BlogPreview.svelte
│   ├── ConnectSection.svelte
│   ├── IntroSection.svelte
│   ├── ProjectsPreview.svelte
│   └── SkillsShowcase.svelte
├── layouts/            # Layout templates
│   ├── BaseContentLayout.svelte
│   ├── BlogLayout.svelte
│   └── ProjectLayout.svelte
└── ui/                 # Reusable UI components
    ├── Background.svelte
    ├── Callout.svelte
    ├── FloatingDock.svelte
    ├── Image.svelte
    ├── ProjectGallery.svelte
    ├── ProjectTimeline.svelte
    ├── SearchDialog.svelte
    └── ThemeToggle.svelte
```

### Design Principles

**🎨 Glassmorphism Design**

- Consistent glass effects across all components
- Light/dark mode compatibility
- Smooth transitions and animations

**♿ Accessibility First**

- WCAG compliant components
- Keyboard navigation support
- Screen reader friendly
- Focus management

**📱 Responsive Design**

- Mobile-first approach
- Flexible layouts that work on all screen sizes
- Touch-friendly interactions

**⚡ Performance Optimized**

- Lazy loading where appropriate
- Minimal bundle impact
- Efficient re-rendering

## 🧩 Component Categories

### UI Components

Interactive elements you can use throughout your portfolio:

| Component           | Purpose                            | Key Features                         |
| ------------------- | ---------------------------------- | ------------------------------------ |
| **Background**      | Animated neural network background | Canvas animation, responsive         |
| **Callout**         | Highlighted content blocks         | Multiple variants, icons             |
| **FloatingDock**    | Main navigation                    | Glass effect, responsive             |
| **Image**           | Enhanced image display             | Lazy loading, optimization           |
| **ProjectGallery**  | Image galleries for projects       | Lightbox, responsive grid            |
| **ProjectTimeline** | Development milestones             | Interactive, expandable              |
| **SearchDialog**    | Global search functionality        | Real-time search, keyboard shortcuts |
| **ThemeToggle**     | Dark/light mode switcher           | System preference detection          |

### Layout Components

Page structure and content organization:

| Component             | Purpose                         | Usage                            |
| --------------------- | ------------------------------- | -------------------------------- |
| **BaseContentLayout** | Base template for content pages | Headers, metadata, navigation    |
| **BlogLayout**        | Blog post template              | Reading progress, TOC, sharing   |
| **ProjectLayout**     | Project showcase template       | Galleries, timelines, tech stack |

### Specialized Components

Components for specific sections:

| Component                  | Purpose                   | Location        |
| -------------------------- | ------------------------- | --------------- |
| **BlogPreview**            | Homepage blog preview     | Homepage        |
| **ConnectSection**         | Contact/social links      | Homepage, About |
| **IntroSection**           | Hero/introduction         | Homepage        |
| **ProjectsPreview**        | Homepage project showcase | Homepage        |
| **SkillsShowcase**         | Skills display            | Homepage, About |
| **DetailedSkillsShowcase** | Extended skills section   | About page      |

## 🎨 Glass Effect System

The portfolio uses a comprehensive glassmorphism design system. See the complete [Glass Effect System documentation](glass-effect-system.md) for details.

### Quick Glass Effect Reference

```css
/* Basic glass effects */
.glass                    /* Basic glass background */
.glass-card              /* Glass card with padding */
.glass-button            /* Interactive glass button */

/* Advanced glass overlays */
.glass-overlay           /* Static glass overlay */
.glass-overlay-auto-hide /* Auto-hiding overlay */
.glass-modal            /* Full glass modal */

/* Control elements */
.glass-control-btn      /* Control buttons */
.glass-nav-btn         /* Navigation buttons */
```

## 🔧 Using Components

### In Svelte Files

```svelte
<script>
	import { Callout, Image, ProjectGallery } from '$lib/components/ui';
	import { BlogLayout } from '$lib/components/layouts';
</script>

<!-- Use components in your Svelte files -->
<BlogLayout title="My Blog Post" date="2025-06-15">
	<Callout type="info">This is an informational callout!</Callout>

	<Image src="/my-image.jpg" alt="Description" caption="Image caption" clickToExpand={true} />
</BlogLayout>
```

### In Markdown Files

Components are automatically available in MDSvex markdown files:

```markdown
---
title: My Project
layout: project
---

This is my project description.

<Callout type="success">
✅ **Achievement**: Successfully implemented real-time features!
</Callout>

<Image 
  src="/project-screenshot.png"
  alt="Project interface"
  caption="Main application interface"
  aspectRatio="16/9"
  clickToExpand={true}
/>
```

## 🎯 Common Component Patterns

### Glass Cards

Create beautiful glass effect containers:

```svelte
<div class="glass-card">
	<h3>Card Title</h3>
	<p>Card content with glassmorphism background.</p>
</div>
```

### Interactive Buttons

Glass effect buttons with hover states:

```svelte
<button class="glass-button">
	<Icon size={16} />
	Button Text
</button>
```

### Modal Dialogs

Full glass modal with backdrop:

```svelte
<div class="glass-modal-backdrop">
	<div class="glass-modal">
		<h2>Modal Title</h2>
		<p>Modal content...</p>

		<button class="glass-control-btn danger">
			<X size={16} />
		</button>
	</div>
</div>
```

## 🎨 Theming and Customization

### CSS Variables

The component system uses CSS variables for consistent theming:

```css
/* Primary colors */
--primary-50: 255, 247, 237;
--primary-500: 249, 115, 22;
--primary-900: 154, 52, 18;

/* Glass effects */
--glass-bg: rgba(255, 255, 255, 0.1);
--glass-border: rgba(255, 255, 255, 0.2);
--glass-backdrop: blur(20px) saturate(180%);

/* Spacing */
--space-1: 0.25rem;
--space-4: 1rem;
--space-8: 2rem;
```

### Customizing Components

1. **Override CSS variables** in `src/styles/variables.css`
2. **Extend component styles** in your custom CSS
3. **Create component variants** by copying and modifying existing components

## 🔍 Component Development

### Creating New Components

1. **Create the component file** in appropriate directory
2. **Follow naming conventions** (PascalCase for components)
3. **Include TypeScript props** for type safety
4. **Add responsive design** considerations
5. **Include accessibility features**
6. **Export from index files** for easy imports

### Component Template

```svelte
<script lang="ts">
	// Props with TypeScript
	interface Props {
		title: string;
		description?: string;
		variant?: 'primary' | 'secondary';
		size?: 'sm' | 'md' | 'lg';
	}

	let { title, description, variant = 'primary', size = 'md' }: Props = $props();

	// Computed classes
	const classes = $derived(`
    my-component
    my-component--${variant}
    my-component--${size}
  `);
</script>

<!-- Component markup -->
<div class={classes}>
	<h3 class="my-component__title">{title}</h3>
	{#if description}
		<p class="my-component__description">{description}</p>
	{/if}
</div>

<style>
	.my-component {
		/* Base styles using design system variables */
		background: var(--glass-bg);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		padding: var(--space-4);
		transition: all var(--transition-fast);
	}

	.my-component--primary {
		/* Primary variant styles */
	}

	.my-component--sm {
		padding: var(--space-2);
	}

	/* Responsive styles */
	@media (max-width: 768px) {
		.my-component {
			padding: var(--space-3);
		}
	}
</style>
```

## 📚 Component Documentation

Each component category has detailed documentation:

### 📖 Essential Reading

1. **[UI Components](ui-components.md)** - Complete reference for all interactive components
2. **[Layout Components](layout-components.md)** - Page templates and structure components
3. **[Component Usage Guide](component-usage-guide.md)** - Best practices and common patterns

### 🎨 Design System

4. **[Glass Effect System](glass-effect-system.md)** - Complete glassmorphism implementation guide

## 🚀 Performance Considerations

### Optimization Strategies

**Lazy Loading**

- Images load only when needed
- Components render progressively
- Heavy animations disabled on low-power devices

**Bundle Optimization**

- Tree-shaking removes unused code
- Dynamic imports for large components
- Icon optimization with selective imports

**Runtime Performance**

- Efficient reactivity with Svelte 5
- Minimal DOM updates
- CSS-based animations over JavaScript

### Performance Monitoring

Monitor component performance:

```javascript
// Performance timing for component loads
const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			performance.mark('component-visible');
		}
	});
});
```

## 🔧 Troubleshooting Components

### Common Issues

**Component not rendering:**

- Check import paths
- Verify component is exported
- Check for TypeScript errors

**Styles not applying:**

- Verify CSS variables are defined
- Check for style conflicts
- Ensure responsive styles are correct

**Glass effects not working:**

- Check backdrop-filter support
- Verify CSS variables are set
- Check for conflicting styles

### Getting Help

For component-specific issues:

1. Check component documentation
2. Review example usage in existing files
3. Check browser developer tools for errors
4. Validate TypeScript props and types

---

## 🎯 Next Steps

Ready to dive deeper into components?

- **[UI Components Guide](ui-components.md)** - Learn about all interactive components
- **[Layout Components](layout-components.md)** - Understand page structure templates
- **[Usage Guide](component-usage-guide.md)** - Best practices and patterns
- **[Glass Effect System](glass-effect-system.md)** - Master the design system

**Want to create custom components?** Follow the development patterns above and study existing components for reference!
