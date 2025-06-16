# Layout Components

Master the layout system that provides structure and consistency across your portfolio. These components handle page structure, responsive design, and content organization.

## 🏗️ Core Layout Components

### `PageLayout`

The foundational layout component that wraps all pages.

**Location:** `src/lib/components/layouts/PageLayout.svelte`

```svelte
<PageLayout title="Page Title" description="Page description">
	<!-- Page content goes here -->
</PageLayout>
```

**Props:**

- `title` (string): Page title for SEO and browser tab
- `description` (string): Meta description for SEO
- `keywords` (string[]): SEO keywords
- `ogImage` (string): Open Graph image URL
- `canonicalUrl` (string): Canonical URL for SEO

**Features:**

- Automatic meta tag generation
- Open Graph and Twitter Card support
- Structured data for SEO
- Responsive viewport configuration
- Theme support integration

### `BlogLayout`

Specialized layout for blog posts with enhanced features.

**Location:** `src/lib/components/layouts/BlogLayout.svelte`

```svelte
<BlogLayout
	title="Blog Post Title"
	description="Post description"
	publishDate="2024-06-16"
	readingTime="5 min read"
	tags={['React', 'Tutorial']}
>
	<!-- Blog content rendered here -->
</BlogLayout>
```

**Props:**

- `title` (string): Blog post title
- `description` (string): Post description
- `publishDate` (string): Publication date
- `readingTime` (string): Estimated reading time
- `tags` (string[]): Post tags
- `author` (object): Author information
- `featuredImage` (string): Featured image URL

**Features:**

- Article structured data
- Reading progress indicator
- Table of contents generation
- Social sharing buttons
- Related posts section
- Author bio card

### `ProjectLayout`

Layout optimized for project showcases.

**Location:** `src/lib/components/layouts/ProjectLayout.svelte`

```svelte
<ProjectLayout
	title="Project Name"
	description="Project description"
	technologies={['React', 'Node.js']}
	githubUrl="https://github.com/user/repo"
	liveUrl="https://project-demo.com"
>
	<!-- Project content -->
</ProjectLayout>
```

**Props:**

- `title` (string): Project name
- `description` (string): Project description
- `technologies` (string[]): Tech stack
- `githubUrl` (string): GitHub repository URL
- `liveUrl` (string): Live demo URL
- `status` (string): Project status
- `timeline` (object): Project timeline

**Features:**

- Project metadata display
- Technology badge integration
- Action buttons (GitHub, Live Demo)
- Project gallery support
- Timeline visualization
- Performance metrics display

## 📱 Responsive Layout System

### Breakpoint System

```css
/* CSS Custom Properties */
:root {
	--breakpoint-sm: 640px;
	--breakpoint-md: 768px;
	--breakpoint-lg: 1024px;
	--breakpoint-xl: 1280px;
	--breakpoint-2xl: 1536px;
}
```

### Container Components

#### `Container`

Responsive container with max-width constraints.

```svelte
<Container size="lg" padding="md">
	<!-- Content with responsive max-width -->
</Container>
```

**Props:**

- `size`: "sm" | "md" | "lg" | "xl" | "2xl" | "full"
- `padding`: "none" | "sm" | "md" | "lg" | "xl"
- `center`: boolean (default: true)

#### `Section`

Semantic section wrapper with spacing.

```svelte
<Section id="about" spacing="lg" background="glass">
	<SectionHeader title="About Me" subtitle="Learn more about my background" />
	<!-- Section content -->
</Section>
```

**Props:**

- `id` (string): Section ID for navigation
- `spacing`: "sm" | "md" | "lg" | "xl"
- `background`: "none" | "glass" | "solid" | "gradient"
- `fullHeight`: boolean for 100vh sections

### Grid System

#### `Grid`

Flexible CSS Grid wrapper.

```svelte
<Grid cols={{ base: 1, md: 2, lg: 3 }} gap="md" alignItems="start">
	<GridItem span={{ base: 1, md: 2 }}>
		<!-- Spans 2 columns on md+ -->
	</GridItem>
	<GridItem>
		<!-- Regular grid item -->
	</GridItem>
</Grid>
```

**Props:**

- `cols`: Responsive column configuration
- `rows`: Responsive row configuration
- `gap`: Gap size between items
- `alignItems`: Vertical alignment
- `justifyItems`: Horizontal alignment

#### `Flex`

Flexbox layout component.

```svelte
<Flex
	direction={{ base: 'column', md: 'row' }}
	justify="space-between"
	align="center"
	wrap="wrap"
	gap="md"
>
	<!-- Flex items -->
</Flex>
```

**Props:**

- `direction`: Flex direction (responsive)
- `justify`: Justify content
- `align`: Align items
- `wrap`: Flex wrap
- `gap`: Gap between items

## 📄 Header and Navigation

### `Header`

Main site header with navigation.

**Location:** `src/lib/components/layouts/Header.svelte`

```svelte
<Header transparent={false} sticky={true} showSearch={true} />
```

**Props:**

- `transparent`: Transparent background
- `sticky`: Sticky positioning
- `showSearch`: Show search trigger
- `showLogo`: Show site logo

**Features:**

- Responsive navigation menu
- Mobile hamburger menu
- Theme toggle integration
- Search trigger button
- Smooth scrolling navigation
- Glass effect styling

### `Navigation`

Main navigation component.

```svelte
<Navigation items={navigationItems} orientation="horizontal" showIcons={true} />
```

**Props:**

- `items`: Navigation items array
- `orientation`: "horizontal" | "vertical"
- `showIcons`: Display icons
- `activeClass`: Active item styling

### `FloatingDock`

Bottom floating navigation dock.

**Location:** `src/lib/components/layouts/FloatingDock.svelte`

```svelte
<FloatingDock items={dockItems} position="bottom-center" autoHide={false} />
```

**Props:**

- `items`: Dock items configuration
- `position`: Dock position
- `autoHide`: Auto-hide on scroll
- `glassMorphism`: Enable glass effects

**Features:**

- Icon-based navigation
- Smooth animations
- Touch-friendly interactions
- Glass morphism effects
- Active state indicators

## 🦶 Footer Components

### `Footer`

Main site footer.

**Location:** `src/lib/components/layouts/Footer.svelte`

```svelte
<Footer showSocial={true} showNewsletter={false} compact={false} />
```

**Props:**

- `showSocial`: Display social links
- `showNewsletter`: Newsletter signup
- `compact`: Compact layout
- `backgroundColor`: Background color

**Features:**

- Social media links
- Contact information
- Copyright notice
- Quick navigation links
- Newsletter signup (optional)

## 🎯 Specialized Layouts

### `AuthorLayout`

Layout for author/about pages.

```svelte
<AuthorLayout author={authorData} showContact={true} showSocial={true}>
	<!-- Author content -->
</AuthorLayout>
```

### `ArchiveLayout`

Layout for content archives (blog, projects).

```svelte
<ArchiveLayout
	title="Blog Archive"
	items={blogPosts}
	itemType="blog"
	showFilters={true}
	showSearch={true}
>
	<!-- Archive content -->
</ArchiveLayout>
```

### `ErrorLayout`

Layout for error pages (404, 500).

```svelte
<ErrorLayout
	errorCode={404}
	title="Page Not Found"
	message="The page you're looking for doesn't exist."
	showHomeLink={true}
/>
```

## 🎨 Layout Styling

### Glass Effect Integration

All layout components support glass morphism:

```svelte
<PageLayout glassEffect="medium">
	<!-- Content with glass background -->
</PageLayout>
```

### Theme Support

Components automatically adapt to dark/light themes:

```css
.layout-component {
	background: var(--bg-primary);
	color: var(--text-primary);
	border: 1px solid var(--border-color);
}
```

### Animation System

Layout transitions use consistent timing:

```css
.layout-transition {
	transition: all var(--transition-duration) var(--transition-easing);
}
```

## 📱 Mobile Optimization

### Touch-Friendly Design

- Minimum 44px touch targets
- Gesture-friendly navigation
- Mobile-optimized spacing
- Thumb-zone considerations

### Performance

- Lazy-loaded components
- Optimized re-renders
- Efficient event handling
- Memory leak prevention

## 🔧 Customization

### Layout Props System

```typescript
interface LayoutProps {
	// Visual
	background?: 'none' | 'glass' | 'solid';
	padding?: 'none' | 'sm' | 'md' | 'lg';
	spacing?: 'tight' | 'normal' | 'loose';

	// Behavior
	sticky?: boolean;
	fullHeight?: boolean;
	centered?: boolean;

	// Content
	title?: string;
	description?: string;
	metadata?: MetaData;
}
```

### CSS Custom Properties

Override layout variables:

```css
.custom-layout {
	--layout-max-width: 1400px;
	--layout-padding: 2rem;
	--layout-gap: 1.5rem;
	--layout-border-radius: 0.75rem;
}
```

## 📋 Best Practices

### Performance

1. **Lazy Loading**: Non-critical layout components
2. **Code Splitting**: Route-based component loading
3. **Event Optimization**: Debounced resize handlers
4. **Memory Management**: Proper cleanup in onDestroy

### Accessibility

1. **Semantic HTML**: Proper heading hierarchy
2. **Landmark Roles**: Navigation, main, complementary
3. **Focus Management**: Proper focus order
4. **Screen Readers**: Descriptive labels and states

### SEO

1. **Structured Data**: JSON-LD in layout heads
2. **Meta Tags**: Comprehensive meta information
3. **Performance**: Fast loading layouts
4. **Mobile-First**: Responsive design principles

---

**Related Documentation:**

- [UI Components](ui-components.md) - Interactive UI elements
- [Glass Effect System](glass-effect-system.md) - Visual effects system
- [Architecture](../architecture/folder-structure.md) - Component organization
