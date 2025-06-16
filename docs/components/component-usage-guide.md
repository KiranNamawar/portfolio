# Component Usage Guide

Learn how to effectively use and customize the component system in your portfolio. This guide covers component patterns, best practices, and advanced usage techniques.

## 🎯 Component Philosophy

### Design Principles

1. **Composability**: Components work together seamlessly
2. **Consistency**: Unified design language across all components
3. **Flexibility**: Easy to customize and extend
4. **Performance**: Optimized for speed and efficiency
5. **Accessibility**: WCAG 2.1 AA compliant by default

### Component Categories

- **Layout**: Structure and positioning (`Container`, `Grid`, `Flex`)
- **UI**: Interactive elements (`Button`, `Card`, `Modal`)
- **Content**: Content display (`BlogPost`, `ProjectCard`, `Timeline`)
- **Form**: Input and form elements (`SearchBox`, `ContactForm`)
- **Navigation**: Navigation elements (`Header`, `FloatingDock`, `Breadcrumbs`)

## 🧩 Component Composition

### Basic Usage

```svelte
<script>
	import { Card, Button, Badge } from '$lib/components/ui';
</script>

<Card variant="glass" padding="lg">
	<h3>Project Title</h3>
	<p>Project description goes here.</p>
	<div class="badges">
		<Badge type="tech">React</Badge>
		<Badge type="tech">TypeScript</Badge>
	</div>
	<Button href="/projects/project-slug" variant="primary">View Project</Button>
</Card>
```

### Advanced Composition

```svelte
<Grid cols={{ base: 1, md: 2, lg: 3 }} gap="lg">
	{#each projects as project}
		<ProjectCard {project}>
			<svelte:fragment slot="header">
				<ProjectStatus status={project.status} />
			</svelte:fragment>

			<svelte:fragment slot="actions">
				<Button variant="outline" size="sm">View Code</Button>
				<Button variant="primary" size="sm">Live Demo</Button>
			</svelte:fragment>
		</ProjectCard>
	{/each}
</Grid>
```

## 🎨 Theming and Customization

### CSS Custom Properties

Components use CSS custom properties for consistent theming:

```css
:root {
	/* Color system */
	--color-primary: 219 234 254;
	--color-secondary: 244 244 245;
	--color-accent: 59 130 246;

	/* Glass effects */
	--glass-bg: rgba(255, 255, 255, 0.1);
	--glass-border: 1px solid rgba(255, 255, 255, 0.2);
	--glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

	/* Spacing */
	--spacing-xs: 0.25rem;
	--spacing-sm: 0.5rem;
	--spacing-md: 1rem;
	--spacing-lg: 1.5rem;
	--spacing-xl: 2rem;

	/* Border radius */
	--radius-sm: 0.25rem;
	--radius-md: 0.5rem;
	--radius-lg: 0.75rem;
	--radius-xl: 1rem;
}
```

### Component Variants

Most components support variant props for different styles:

```svelte
<!-- Button variants -->
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>

<!-- Card variants -->
<Card variant="default">Default card</Card>
<Card variant="glass">Glass morphism card</Card>
<Card variant="elevated">Elevated card</Card>
<Card variant="outlined">Outlined card</Card>
```

### Size System

Consistent sizing across components:

```svelte
<!-- Component sizes -->
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

<!-- Spacing sizes -->
<Container padding="sm">Small padding</Container>
<Container padding="md">Medium padding</Container>
<Container padding="lg">Large padding</Container>
```

## 🔄 State Management

### Component State

```svelte
<script lang="ts">
	import { writable } from 'svelte/store';
	import { Modal, Button } from '$lib/components/ui';

	let showModal = writable(false);

	function openModal() {
		showModal.set(true);
	}

	function closeModal() {
		showModal.set(false);
	}
</script>

<Button on:click={openModal}>Open Modal</Button>

<Modal bind:open={$showModal} title="Modal Title">
	<p>Modal content goes here.</p>

	<svelte:fragment slot="actions">
		<Button variant="outline" on:click={closeModal}>Cancel</Button>
		<Button variant="primary" on:click={closeModal}>Confirm</Button>
	</svelte:fragment>
</Modal>
```

### Global State Integration

```svelte
<script lang="ts">
	import { theme } from '$lib/stores/theme';
	import { ThemeToggle } from '$lib/components/ui';
</script>

<!-- Theme toggle automatically syncs with global theme store -->
<ThemeToggle />

<!-- Components automatically adapt to theme -->
<Card variant="glass">
	Content adapts to {$theme} theme
</Card>
```

## 📱 Responsive Design

### Responsive Props

Many components accept responsive prop objects:

```svelte
<Grid
	cols={{
		base: 1, // Mobile: 1 column
		sm: 2, // Small: 2 columns
		md: 3, // Medium: 3 columns
		lg: 4 // Large: 4 columns
	}}
	gap={{
		base: 'sm', // Mobile: small gap
		md: 'md', // Medium: medium gap
		lg: 'lg' // Large: large gap
	}}
>
	<!-- Grid items -->
</Grid>
```

### Responsive Utilities

```svelte
<div class="responsive-container">
	<!-- Hidden on mobile, visible on md+ -->
	<div class="hidden md:block">Desktop content</div>

	<!-- Visible on mobile, hidden on md+ -->
	<div class="block md:hidden">Mobile content</div>
</div>
```

## 🎭 Animation and Interactions

### Built-in Animations

Components include smooth animations:

```svelte
<!-- Hover animations -->
<Card hover="lift">Lifts on hover</Card>
<Card hover="glow">Glows on hover</Card>

<!-- Loading states -->
<Button loading={isLoading}>
	{#if isLoading}
		<Spinner size="sm" />
	{/if}
	Submit
</Button>

<!-- Transition effects -->
<Modal transition="fade" duration={300} open={showModal}>Modal content</Modal>
```

### Custom Animations

```svelte
<script>
	import { fly, fade } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
</script>

<div in:fly={{ x: -100, duration: 500, easing: quintOut }} out:fade={{ duration: 300 }}>
	Animated content
</div>
```

## 🔍 Form Components

### Form Composition

```svelte
<script>
	import { Form, FormField, Input, Textarea, Select, Button } from '$lib/components/ui';

	let formData = {
		name: '',
		email: '',
		message: '',
		category: ''
	};

	async function handleSubmit() {
		// Handle form submission
	}
</script>

<Form on:submit={handleSubmit}>
	<FormField label="Name" required>
		<Input bind:value={formData.name} placeholder="Your name" autocomplete="name" />
	</FormField>

	<FormField label="Email" required>
		<Input
			type="email"
			bind:value={formData.email}
			placeholder="your@email.com"
			autocomplete="email"
		/>
	</FormField>

	<FormField label="Category">
		<Select
			bind:value={formData.category}
			options={[
				{ value: 'general', label: 'General Inquiry' },
				{ value: 'project', label: 'Project Discussion' },
				{ value: 'collaboration', label: 'Collaboration' }
			]}
		/>
	</FormField>

	<FormField label="Message" required>
		<Textarea bind:value={formData.message} placeholder="Your message..." rows={4} />
	</FormField>

	<Button type="submit" variant="primary" fullWidth>Send Message</Button>
</Form>
```

### Form Validation

```svelte
<script>
	import { z } from 'zod';
	import { createForm } from '$lib/utils/form';

	const schema = z.object({
		name: z.string().min(2, 'Name must be at least 2 characters'),
		email: z.string().email('Invalid email address'),
		message: z.string().min(10, 'Message must be at least 10 characters')
	});

	const { form, errors, isValid, handleSubmit } = createForm(schema);
</script>

<FormField label="Name" error={$errors.name}>
	<Input bind:value={$form.name} invalid={!!$errors.name} placeholder="Your name" />
</FormField>
```

## 📊 Data Display Components

### Lists and Tables

```svelte
<script>
	import { DataTable, List, ListItem } from '$lib/components/ui';

	const tableData = [
		{ name: 'React', proficiency: 95, years: 3 },
		{ name: 'TypeScript', proficiency: 90, years: 2 },
		{ name: 'Svelte', proficiency: 85, years: 1 }
	];

	const columns = [
		{ key: 'name', label: 'Technology' },
		{ key: 'proficiency', label: 'Proficiency', type: 'progress' },
		{ key: 'years', label: 'Experience' }
	];
</script>

<DataTable data={tableData} {columns} />

<List variant="unstyled">
	{#each skills as skill}
		<ListItem>
			<SkillBar label={skill.name} value={skill.level} color={skill.color} />
		</ListItem>
	{/each}
</List>
```

### Progress and Status

```svelte
<script>
	import { ProgressBar, StatusBadge, Timeline, TimelineItem } from '$lib/components/ui';
</script>

<!-- Progress indicators -->
<ProgressBar label="Project Progress" value={75} />
<ProgressBar label="Skills Assessment" value={90} color="green" showValue={true} />

<!-- Status badges -->
<StatusBadge status="completed" />
<StatusBadge status="in-progress" />
<StatusBadge status="planned" />

<!-- Timeline -->
<Timeline>
	<TimelineItem date="2024-01" title="Project Started" status="completed">
		Initial planning and setup phase.
	</TimelineItem>
	<TimelineItem date="2024-03" title="MVP Development" status="completed">
		Core features implemented.
	</TimelineItem>
	<TimelineItem date="2024-06" title="Launch" status="in-progress">
		Final testing and deployment.
	</TimelineItem>
</Timeline>
```

## 🔧 Custom Component Creation

### Component Template

```svelte
<!-- src/lib/components/ui/CustomComponent.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// Props with defaults
	export let variant: 'default' | 'primary' | 'secondary' = 'default';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled: boolean = false;
	export let loading: boolean = false;

	// Event dispatcher
	const dispatch = createEventDispatcher<{
		click: MouseEvent;
		hover: MouseEvent;
	}>();

	// Reactive statements
	$: classes = [
		'custom-component',
		`variant-${variant}`,
		`size-${size}`,
		disabled && 'disabled',
		loading && 'loading'
	]
		.filter(Boolean)
		.join(' ');
</script>

<button
	class={classes}
	{disabled}
	on:click={(e) => dispatch('click', e)}
	on:mouseenter={(e) => dispatch('hover', e)}
>
	{#if loading}
		<Spinner size="sm" />
	{/if}
	<slot />
</button>

<style>
	.custom-component {
		/* Base styles */
		display: inline-flex;
		align-items: center;
		gap: var(--spacing-sm);
		padding: var(--spacing-md);
		border-radius: var(--radius-md);
		border: none;
		font-family: inherit;
		font-size: inherit;
		cursor: pointer;
		transition: all var(--transition-duration) var(--transition-easing);

		/* Glass effect base */
		background: var(--glass-bg);
		backdrop-filter: blur(10px);
		border: var(--glass-border);
	}

	/* Variants */
	.variant-primary {
		background: rgb(var(--color-primary));
		color: white;
	}

	.variant-secondary {
		background: rgb(var(--color-secondary));
		color: rgb(var(--color-text));
	}

	/* Sizes */
	.size-sm {
		padding: var(--spacing-sm) var(--spacing-md);
		font-size: 0.875rem;
	}

	.size-lg {
		padding: var(--spacing-lg) var(--spacing-xl);
		font-size: 1.125rem;
	}

	/* States */
	.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.loading {
		cursor: wait;
	}

	/* Hover effects */
	.custom-component:hover:not(.disabled) {
		transform: translateY(-2px);
		box-shadow: var(--shadow-lg);
	}
</style>
```

### TypeScript Types

```typescript
// src/lib/types/components.ts
export interface ComponentProps {
	variant?: 'default' | 'primary' | 'secondary';
	size?: 'sm' | 'md' | 'lg';
	disabled?: boolean;
	loading?: boolean;
}

export interface CustomComponentEvents {
	click: MouseEvent;
	hover: MouseEvent;
}
```

## 📋 Best Practices

### Performance

1. **Lazy Loading**: Import components dynamically when needed
2. **Event Optimization**: Use event delegation for lists
3. **State Management**: Keep component state minimal
4. **Re-render Optimization**: Use reactive statements wisely

### Accessibility

1. **Semantic HTML**: Use proper HTML elements
2. **ARIA Labels**: Provide descriptive labels
3. **Keyboard Navigation**: Support keyboard interactions
4. **Focus Management**: Proper focus indicators
5. **Screen Reader Support**: Test with screen readers

### Maintenance

1. **Consistent Naming**: Follow naming conventions
2. **Documentation**: Document props and usage
3. **Testing**: Unit tests for complex components
4. **Version Control**: Track component changes

### Code Organization

```
components/
├── ui/              # Basic UI components
├── layout/          # Layout components
├── content/         # Content-specific components
├── forms/           # Form components
└── navigation/      # Navigation components
```

---

**Related Documentation:**

- [UI Components](ui-components.md) - Individual component details
- [Glass Effect System](glass-effect-system.md) - Visual effects
- [Layout Components](layout-components.md) - Layout system
