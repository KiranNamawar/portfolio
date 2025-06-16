# Folder Structure

Understanding the project organization will help you navigate and maintain the codebase effectively. This guide explains every directory and file in the project.

## 📁 Project Root

```
portfolio/
├── 📄 bun.lock              # Bun lockfile for consistent dependencies
├── 📄 eslint.config.js      # ESLint configuration
├── 📄 mdsvex.config.js      # MDSvex configuration for markdown
├── 📄 package.json          # Project dependencies and scripts
├── 📄 README.md             # Project documentation
├── 📄 setup-template.js     # Interactive template setup script
├── 📄 svelte.config.js      # SvelteKit configuration
├── 📄 template.config.js    # Template customization settings
├── 📄 tsconfig.json         # TypeScript configuration
├── 📄 vite.config.ts        # Vite build configuration
├── 📁 audit/               # Project audit documentation
├── 📁 docs/                # Comprehensive documentation
├── 📁 src/                 # Source code
└── 📁 static/              # Static assets
```

## 🎯 Source Directory (`src/`)

The main application code lives in the `src/` directory:

### Core Files

```
src/
├── 📄 app.css              # Global styles and CSS variables
├── 📄 app.d.ts             # TypeScript ambient declarations
├── 📄 app.html             # HTML template for the application
└── 📄 hooks.server.ts      # Server-side hooks
```

### Routes (`src/routes/`)

SvelteKit's file-based routing system:

```
routes/
├── 📄 +layout.svelte       # Root layout component
├── 📄 +page.svelte         # Homepage
├── 📁 about/              # About page
│   ├── 📄 +page.svelte
│   └── 📄 +page.ts
├── 📁 blog/               # Blog section
│   ├── 📄 +page.svelte     # Blog listing
│   ├── 📄 +page.ts         # Blog data loading
│   └── 📁 [slug]/         # Individual blog posts
│       ├── 📄 +page.svelte
│       └── 📄 +page.ts
├── 📁 projects/           # Projects section
│   ├── 📄 +page.svelte     # Projects listing
│   ├── 📄 +page.ts         # Projects data loading
│   └── 📁 [slug]/         # Individual project pages
│       ├── 📄 +page.svelte
│       └── 📄 +page.ts
├── 📁 og-image/           # Open Graph image generation
└── 📁 sitemap.xml/        # Dynamic sitemap generation
```

#### Route File Conventions

- **`+page.svelte`**: The page component
- **`+page.ts`**: Data loading for the page
- **`+layout.svelte`**: Layout component for nested routes
- **`+layout.ts`**: Layout data loading
- **`[slug]`**: Dynamic route parameters

### Components (`src/lib/components/`)

Organized by feature and functionality:

```
components/
├── 📁 about/              # About page components
│   ├── 📄 AboutHero.svelte
│   ├── 📄 SkillsGrid.svelte
│   └── 📄 WorkExperience.svelte
├── 📁 home/               # Homepage components
│   ├── 📄 FeaturedBlog.svelte
│   ├── 📄 FeaturedProjects.svelte
│   └── 📄 Hero.svelte
├── 📁 layouts/            # Layout components
│   ├── 📄 BlogLayout.svelte
│   ├── 📄 ProjectLayout.svelte
│   └── 📄 PageLayout.svelte
└── 📁 ui/                 # Reusable UI components
    ├── 📄 Button.svelte
    ├── 📄 Card.svelte
    ├── 📄 Modal.svelte
    ├── 📄 SearchDialog.svelte
    └── 📄 ThemeToggle.svelte
```

#### Component Organization Principles

- **Feature-based**: Components grouped by page/feature
- **Reusability**: Common UI components in `/ui`
- **Single Responsibility**: Each component has one clear purpose
- **Composition**: Components can be composed together

### Utilities (`src/lib/utils/`)

Centralized business logic and data processing:

```
utils/
├── 📄 analytics.ts         # Analytics integration
├── 📄 blog.ts             # Blog data processing
├── 📄 codeBlocks.ts       # Code syntax highlighting
├── 📄 contentProcessor.ts # Markdown processing
├── 📄 date.ts             # Date formatting utilities
├── 📄 icons.ts            # Icon exports
├── 📄 languageDetection.ts # Programming language detection
├── 📄 markdown.ts         # Markdown parsing utilities
├── 📄 project.ts          # Project data processing
├── 📄 readingTime.ts      # Reading time calculation
└── 📄 search.ts           # Search functionality
```

#### Utility Function Patterns

- **Pure Functions**: No side effects, predictable outputs
- **Type Safety**: Full TypeScript coverage
- **Error Handling**: Proper error boundaries
- **Performance**: Optimized for speed and memory

### Types (`src/lib/types/`)

TypeScript definitions for the entire application:

```
types/
├── 📄 about.ts            # About page types
├── 📄 blog.ts             # Blog post types
├── 📄 project.ts          # Project types
└── 📄 skills.ts           # Skills and experience types
```

### Stores (`src/lib/stores/`)

Global state management:

```
stores/
└── 📄 theme.ts            # Theme (dark/light) management
```

### Data (`src/lib/data/`)

Static configuration and content:

```
data/
├── 📄 personal.js         # Personal information
└── 📄 skills.json         # Skills and proficiency data
```

## 📝 Content Directory (`src/content/`)

Markdown content files organized by type:

```
content/
├── 📁 blogs/              # Blog posts
│   ├── 📄 enhanced-markdown-demo.md
│   ├── 📄 hierarchical-toc-demo.md
│   ├── 📄 table-of-contents-demo.md
│   └── 📄 welcome.md
└── 📁 projects/           # Project showcases
    ├── 📄 ecommerce-platform.md
    ├── 📄 sample-project.md
    ├── 📄 task-management-app.md
    └── 📄 weather-dashboard.md
```

### Content File Structure

Each content file follows a consistent pattern:

1. **Frontmatter**: YAML metadata at the top
2. **Content**: Markdown body with enhanced features
3. **Assets**: Referenced images and media

### Frontmatter Requirements

**Blog Posts**:

```yaml
---
title: 'Your Blog Post Title'
description: 'SEO-friendly description'
date: '2025-06-16'
published: true
featured: false
tags: ['tag1', 'tag2']
---
```

**Projects**:

```yaml
---
title: 'Project Name'
description: 'Project description'
date: '2025-06-16'
published: true
featured: true
technologies: ['React', 'Node.js']
githubUrl: 'https://github.com/username/repo'
liveUrl: 'https://project-demo.com'
---
```

## 🎨 Styles Directory (`src/styles/`)

Organized CSS architecture:

```
styles/
├── 📄 base.css            # Reset and base styles
├── 📄 blog.css            # Blog-specific styles
├── 📄 codeBlocks.css      # Code syntax highlighting
├── 📄 prose.css           # Markdown content styles
├── 📄 utilities.css       # Utility classes
└── 📄 variables.css       # CSS custom properties
```

### CSS Architecture

- **CSS Custom Properties**: For theming and consistency
- **Glassmorphism System**: Comprehensive glass effect utilities
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Complete dark/light theme system

## 📦 Static Assets (`static/`)

Public files served directly:

```
static/
├── 📄 blog-placeholder.svg    # Default blog images
├── 📄 favicon.png            # Site favicon
├── 📄 manifest.json          # PWA manifest
├── 📄 og-image.svg           # Default Open Graph image
├── 📄 profile.svg            # Default profile image
├── 📄 project-placeholder.svg # Default project images
├── 📄 robots.txt             # Search engine crawling rules
└── 📁 gallery/              # Project gallery images
    ├── 📄 ecommerce-checkout.svg
    ├── 📄 ecommerce-dashboard.svg
    ├── 📄 ecommerce-orders.svg
    ├── 📄 ecommerce-products.svg
    ├── 📄 task-details.svg
    └── 📄 task-kanban.svg
```

## 📚 Documentation (`docs/`)

Complete project documentation:

```
docs/
├── 📄 README.md                    # Documentation entry point
├── 📄 IMPLEMENTATION_SUMMARY.md    # Development summary
├── 📁 getting-started/            # Setup and installation
├── 📁 content-creation/           # Content guides
├── 📁 components/                 # Component documentation
├── 📁 architecture/               # Technical architecture
├── 📁 maintenance/                # Maintenance guides
└── 📁 troubleshooting/            # Common issues
```

## 🔧 Configuration Files

### Key Configuration Files

- **`svelte.config.js`**: SvelteKit and adapter configuration
- **`vite.config.ts`**: Build tool configuration
- **`mdsvex.config.js`**: Markdown processing configuration
- **`template.config.js`**: Template customization settings
- **`tsconfig.json`**: TypeScript compiler options
- **`eslint.config.js`**: Code linting rules

### Environment Files

```
.env.local          # Local development variables
.env.production     # Production environment variables
```

## 📋 File Naming Conventions

### Components

- **PascalCase**: `ComponentName.svelte`
- **Descriptive**: Clear purpose from the name
- **Feature-grouped**: Organized by functionality

### Utilities

- **camelCase**: `utilityFunction.ts`
- **Descriptive**: Clear purpose from the name
- **Single responsibility**: One main function per file

### Content Files

- **kebab-case**: `blog-post-title.md`
- **Descriptive**: SEO-friendly URLs
- **Date-independent**: Don't include dates in filenames

### Styles

- **kebab-case**: `component-styles.css`
- **Purpose-based**: Named for their function
- **Modular**: Organized by feature or component

## 🚀 Adding New Files

### Adding a New Component

1. Create in appropriate directory (`/ui`, `/home`, etc.)
2. Use PascalCase naming
3. Export from `/lib/index.ts` if needed
4. Document props and usage

### Adding New Content

1. Create `.md` file in `/content/blogs` or `/content/projects`
2. Add proper frontmatter
3. Use kebab-case filename
4. Content will be automatically discovered

### Adding New Utilities

1. Create in `/lib/utils/`
2. Export pure functions
3. Add proper TypeScript types
4. Include error handling

---

**Related Documentation:**

- [Data Flow](data-flow.md) - Understand how data moves through the system
- [Build System](build-system.md) - Learn about the build process
- [Component Guide](../components/ui-components.md) - Component usage patterns
