# UI Components

Complete reference for all interactive UI components in the portfolio. Each component is designed with glassmorphism aesthetics, accessibility, and responsive design in mind.

## 🎯 Available Components

| Component                           | Purpose                            | Key Features                             |
| ----------------------------------- | ---------------------------------- | ---------------------------------------- |
| [Background](#background)           | Animated neural network background | Canvas animation, performance optimized  |
| [Callout](#callout)                 | Highlighted content blocks         | 5 variants, icon support, accessibility  |
| [FloatingDock](#floatingdock)       | Main navigation dock               | Glass effect, responsive, touch-friendly |
| [Image](#image)                     | Enhanced image display             | Lazy loading, optimization, lightbox     |
| [ProjectGallery](#projectgallery)   | Image galleries for projects       | Grid layout, lightbox, responsive        |
| [ProjectTimeline](#projecttimeline) | Development milestones             | Interactive, expandable, animations      |
| [SearchDialog](#searchdialog)       | Global search functionality        | Real-time search, keyboard shortcuts     |
| [ThemeToggle](#themetoggle)         | Dark/light mode switcher           | System preference, smooth transitions    |

## 🖼️ Background

Animated neural network background that creates an engaging visual experience.

### Usage

```svelte
<script>
	import { Background } from '$lib/components/ui';
</script>

<Background />
```

### Props

| Prop                 | Type     | Default | Description                           |
| -------------------- | -------- | ------- | ------------------------------------- |
| `particleCount`      | `number` | `50`    | Number of particles in animation      |
| `connectionDistance` | `number` | `150`   | Max distance for particle connections |
| `animationSpeed`     | `number` | `1`     | Animation speed multiplier            |
| `opacity`            | `number` | `0.6`   | Background opacity                    |

### Example

```svelte
<Background particleCount={75} connectionDistance={200} animationSpeed={0.8} opacity={0.4} />
```

### Performance Notes

- Automatically reduces particle count on mobile
- Pauses animation when not visible
- Uses `requestAnimationFrame` for smooth performance
- Respects `prefers-reduced-motion` settings

---

## 💬 Callout

Highlighted content blocks for important information, tips, warnings, and more.

### Usage

```svelte
<script>
	import { Callout } from '$lib/components/ui';
</script>

<Callout type="info">This is an informational callout with useful information.</Callout>
```

### In Markdown

```markdown
<Callout type="success">
✅ **Success**: Your project has been successfully deployed!
</Callout>

<Callout type="warning">
⚠️ **Warning**: This feature is experimental and may change.
</Callout>
```

### Props

| Prop    | Type                                                     | Default  | Description         |
| ------- | -------------------------------------------------------- | -------- | ------------------- |
| `type`  | `'info' \| 'success' \| 'warning' \| 'danger' \| 'note'` | `'info'` | Callout variant     |
| `title` | `string?`                                                | -        | Optional title text |
| `icon`  | `boolean`                                                | `true`   | Show type icon      |

### Callout Types

#### Info (Default)

```svelte
<Callout type="info">💡 **Pro Tip**: Use semantic HTML for better accessibility.</Callout>
```

#### Success

```svelte
<Callout type="success">✅ **Completed**: All tests are passing successfully.</Callout>
```

#### Warning

```svelte
<Callout type="warning">⚠️ **Caution**: This operation cannot be undone.</Callout>
```

#### Danger

```svelte
<Callout type="danger">❌ **Error**: Invalid configuration detected.</Callout>
```

#### Note

```svelte
<Callout type="note">📝 **Note**: Remember to update your dependencies regularly.</Callout>
```

### Custom Styling

```css
/* Override callout colors */
.callout--custom {
	--callout-bg: rgba(147, 51, 234, 0.1);
	--callout-border: rgba(147, 51, 234, 0.3);
	--callout-text: rgb(147, 51, 234);
}
```

---

## 🧭 FloatingDock

Main navigation component that provides easy access to different sections of the portfolio.

### Usage

```svelte
<script>
	import { FloatingDock } from '$lib/components/ui';
</script>

<FloatingDock />
```

### Features

- **Glass Effect**: Beautiful glassmorphism design
- **Responsive**: Adapts to different screen sizes
- **Touch Friendly**: Optimized for mobile interactions
- **Keyboard Navigation**: Full keyboard accessibility
- **Theme Integration**: Includes theme toggle

### Navigation Items

The dock automatically includes:

- Home
- Blog
- Projects
- Search (opens search dialog)
- Theme Toggle

### Customization

To customize navigation items, edit `src/lib/components/ui/FloatingDock.svelte`:

```svelte
const navItems = [
  { href: '/', icon: Home, label: 'Home', ariaLabel: 'Go to homepage' },
  { href: '/blog', icon: FileText, label: 'Blog', ariaLabel: 'View blog posts' },
  { href: '/projects', icon: FolderOpen, label: 'Projects', ariaLabel: 'View projects' },
  // Add your custom navigation items
];
```

### Positioning

The dock automatically positions itself:

- **Desktop**: Bottom center, fixed position
- **Mobile**: Bottom edge, full width

---

## 🖼️ Image

Enhanced image component with optimization, lazy loading, and lightbox functionality.

### Usage

```svelte
<script>
	import { Image } from '$lib/components/ui';
</script>

<Image src="/my-image.jpg" alt="Description of the image" caption="Optional image caption" />
```

### In Markdown

```markdown
<Image 
  src="/gallery/project-screenshot.png"
  alt="Project interface showing main dashboard"
  caption="Clean, intuitive dashboard design"
  clickToExpand={true}
  aspectRatio="16/9"
  fit="cover"
/>
```

### Props

| Prop            | Type                                     | Default   | Description                        |
| --------------- | ---------------------------------------- | --------- | ---------------------------------- |
| `src`           | `string`                                 | -         | Image source URL                   |
| `alt`           | `string`                                 | -         | Alt text for accessibility         |
| `caption`       | `string?`                                | -         | Optional image caption             |
| `width`         | `number?`                                | -         | Image width                        |
| `height`        | `number?`                                | -         | Image height                       |
| `aspectRatio`   | `string?`                                | -         | Aspect ratio (e.g., "16/9", "4/3") |
| `fit`           | `'cover' \| 'contain' \| 'fill'`         | `'cover'` | How image fits container           |
| `clickToExpand` | `boolean`                                | `false`   | Enable lightbox on click           |
| `lazy`          | `boolean`                                | `true`    | Enable lazy loading                |
| `radius`        | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`    | Border radius                      |
| `shadow`        | `boolean`                                | `false`   | Add drop shadow                    |

### Examples

#### Basic Image

```svelte
<Image src="/hero-image.jpg" alt="Portfolio hero image" width={800} height={400} />
```

#### Image with Lightbox

```svelte
<Image
	src="/gallery/project-detail.png"
	alt="Detailed project interface"
	caption="Advanced features and user interface"
	clickToExpand={true}
	aspectRatio="16/10"
	shadow={true}
/>
```

#### Contained Image

```svelte
<Image
	src="/architecture-diagram.svg"
	alt="System architecture"
	fit="contain"
	aspectRatio="4/3"
	radius="lg"
/>
```

### Optimization Features

- **Lazy Loading**: Images load when visible
- **Responsive**: Automatically serves appropriate sizes
- **Format Detection**: Prefers WebP when supported
- **Loading States**: Shows placeholder while loading
- **Error Handling**: Graceful fallback for failed loads

---

## 🖼️ ProjectGallery

Interactive image gallery component for showcasing project screenshots and media.

### Usage

```svelte
<script>
	import { ProjectGallery } from '$lib/components/ui';

	const gallery = [
		{
			src: '/gallery/project-home.png',
			alt: 'Project homepage',
			caption: 'Clean homepage design'
		},
		{
			src: '/gallery/project-dashboard.png',
			alt: 'User dashboard',
			caption: 'Intuitive dashboard interface'
		}
	];
</script>

<ProjectGallery {gallery} />
```

### In Project Frontmatter

```markdown
---
gallery:
  - src: '/gallery/ecommerce-dashboard.svg'
    alt: 'Admin dashboard interface'
    caption: 'Comprehensive admin tools and analytics'
  - src: '/gallery/ecommerce-products.svg'
    alt: 'Product catalog page'
    caption: 'User-friendly product browsing'
---
```

### Props

| Prop             | Type                            | Default  | Description                          |
| ---------------- | ------------------------------- | -------- | ------------------------------------ |
| `gallery`        | `GalleryItem[]`                 | `[]`     | Array of gallery items               |
| `layout`         | `'grid' \| 'masonry' \| 'auto'` | `'auto'` | Gallery layout type                  |
| `enableLightbox` | `boolean`                       | `true`   | Enable lightbox functionality        |
| `showCaptions`   | `boolean`                       | `true`   | Show image captions                  |
| `columnCount`    | `number?`                       | -        | Fixed column count (auto by default) |

### Gallery Item Type

```typescript
interface GalleryItem {
	src: string; // Image source URL
	alt: string; // Alt text for accessibility
	caption?: string; // Optional caption
	width?: number; // Optional width
	height?: number; // Optional height
}
```

### Layout Options

#### Auto Layout (Default)

Automatically chooses the best layout based on image count and aspect ratios.

#### Grid Layout

```svelte
<ProjectGallery {gallery} layout="grid" columnCount={3} />
```

#### Masonry Layout

```svelte
<ProjectGallery {gallery} layout="masonry" />
```

### Lightbox Features

- **Full-screen viewing** with overlay
- **Navigation controls** (prev/next, close)
- **Keyboard support** (arrow keys, escape)
- **Touch gestures** on mobile
- **Auto-hiding controls** for clean viewing

---

## 📅 ProjectTimeline

Interactive timeline component for showcasing project development milestones and progress.

### Usage

```svelte
<script>
	import { ProjectTimeline } from '$lib/components/ui';

	const milestones = [
		{
			id: 'planning',
			title: 'Project Planning',
			description: 'Initial planning and research phase',
			date: '2025-04-01',
			status: 'completed',
			category: 'planning'
		}
	];
</script>

<ProjectTimeline {milestones} />
```

### In Project Frontmatter

```markdown
---
timeline:
  - id: 'design'
    title: 'UI/UX Design'
    description: 'User interface and experience design'
    date: '2025-04-15'
    status: 'completed'
    category: 'design'
    details:
      - 'Wireframe creation'
      - 'Visual design system'
      - 'User testing'
    achievements:
      - 'Design system established'
      - 'User feedback incorporated'
---
```

### Props

| Prop           | Type                         | Default      | Description                       |
| -------------- | ---------------------------- | ------------ | --------------------------------- |
| `milestones`   | `Milestone[]`                | `[]`         | Array of timeline milestones      |
| `layout`       | `'vertical' \| 'horizontal'` | `'vertical'` | Timeline orientation              |
| `showProgress` | `boolean`                    | `true`       | Show progress indicator           |
| `allowExpand`  | `boolean`                    | `true`       | Allow expanding milestone details |

### Milestone Type

```typescript
interface Milestone {
	id: string; // Unique identifier
	title: string; // Milestone title
	description: string; // Brief description
	date: string; // Date (YYYY-MM-DD)
	status: 'completed' | 'in-progress' | 'planned';
	category?: 'planning' | 'design' | 'development' | 'testing' | 'deployment';
	details?: string[]; // Detailed task list
	achievements?: string[]; // Key accomplishments
}
```

### Categories and Styling

Each category has distinct visual styling:

- **Planning** 📅 - Blue theme
- **Design** 🎨 - Purple theme
- **Development** 💻 - Green theme
- **Testing** 🧪 - Orange theme
- **Deployment** 🚀 - Red theme

### Interactive Features

- **Expandable details** - Click to reveal more information
- **Progress tracking** - Visual progress indicator
- **Responsive design** - Adapts to mobile screens
- **Smooth animations** - Entrance and interaction animations

---

## 🔍 SearchDialog

Global search component that provides real-time search across blog posts and projects.

### Usage

The SearchDialog is automatically included in the FloatingDock. Users can:

- Click the search icon in the navigation
- Use keyboard shortcut `Cmd/Ctrl + K`

### Features

- **Real-time search** with instant results
- **Keyboard navigation** with arrow keys
- **Search suggestions** based on content
- **Fuzzy matching** for typo tolerance
- **Category filtering** (blogs, projects)

### Search Capabilities

The search covers:

- **Blog post titles** and content
- **Project titles** and descriptions
- **Technology tags** and skills
- **Content metadata** and keywords

### Keyboard Shortcuts

- `Cmd/Ctrl + K` - Open search dialog
- `Escape` - Close search dialog
- `Arrow Keys` - Navigate results
- `Enter` - Open selected result

### Customization

To modify search behavior, edit `src/lib/utils/search.ts`:

```typescript
export async function searchContent(query: string, type?: 'blog' | 'project') {
	// Custom search logic
	const results = await performSearch(query, type);
	return results;
}
```

---

## 🌙 ThemeToggle

Theme switcher component that allows users to toggle between light, dark, and system themes.

### Usage

```svelte
<script>
	import { ThemeToggle } from '$lib/components/ui';
</script>

<ThemeToggle />
```

### Features

- **Three theme modes**: Light, Dark, System
- **System preference detection** - Automatically detects user's OS theme
- **Smooth transitions** between themes
- **Persistent preference** - Remembers user choice
- **Accessible** - Proper ARIA labels and keyboard support

### Theme States

1. **Light Mode** ☀️ - Bright theme for well-lit environments
2. **Dark Mode** 🌙 - Dark theme for low-light environments
3. **System Mode** 🖥️ - Follows operating system preference

### Integration

The ThemeToggle automatically:

- Updates CSS variables for theme colors
- Persists choice in localStorage
- Listens for system theme changes
- Provides smooth transitions

### Custom Theme Colors

To customize theme colors, edit `src/styles/variables.css`:

```css
/* Light theme colors */
:root {
	--color-background: 255, 255, 255;
	--color-text-primary: 17, 24, 39;
	/* ... other variables */
}

/* Dark theme colors */
:root[data-theme='dark'] {
	--color-background: 17, 24, 39;
	--color-text-primary: 249, 250, 251;
	/* ... other variables */
}
```

---

## 🎨 Component Styling

### Glass Effect Integration

All UI components use the glass effect system. Key classes:

```css
.glass-card        /* Basic glass card */
.glass-button      /* Interactive glass button */
.glass-overlay     /* Glass overlay effect */
.glass-modal       /* Full modal with backdrop */
```

### Responsive Design

Components adapt to different screen sizes:

```css
/* Mobile-first approach */
.component {
	/* Mobile styles */
}

@media (min-width: 768px) {
	.component {
		/* Tablet and desktop styles */
	}
}
```

### Dark Mode Support

Components automatically adapt to theme changes:

```css
.component {
	color: var(--color-text-primary);
	background: var(--color-surface-primary);
}

/* Colors automatically update based on theme */
```

## ♿ Accessibility Features

All components include:

- **Semantic HTML** - Proper HTML elements and structure
- **ARIA labels** - Screen reader support
- **Keyboard navigation** - Full keyboard accessibility
- **Focus management** - Visible focus indicators
- **Color contrast** - WCAG AA compliant colors
- **Motion preferences** - Respects `prefers-reduced-motion`

## 🔧 Troubleshooting

### Common Issues

**Component not importing:**

```svelte
// ❌ Wrong import {Component} from '$lib/components'; // ✅ Correct import {Component} from '$lib/components/ui';
```

**Styles not applying:**

- Check CSS variable definitions
- Verify component is within a layout
- Check for style conflicts

**Props not working:**

- Verify TypeScript prop types
- Check for required vs optional props
- Review component documentation

### Performance Issues

**Large galleries loading slowly:**

- Enable lazy loading: `lazy={true}`
- Optimize image sizes
- Use appropriate image formats (WebP)

**Animations causing lag:**

- Check `prefers-reduced-motion` settings
- Reduce particle count on Background component
- Use CSS transforms instead of changing layout properties

---

## 🚀 Next Steps

Ready to use these components effectively?

- **[Layout Components](layout-components.md)** - Learn about page templates
- **[Component Usage Guide](component-usage-guide.md)** - Best practices and patterns
- **[Glass Effect System](glass-effect-system.md)** - Master the design system

**Need to customize a component?** Check the source code in `src/lib/components/ui/` for implementation details and customization options!
