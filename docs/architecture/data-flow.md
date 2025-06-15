# Data Flow Architecture

This document explains how data flows through the portfolio application, from markdown files to rendered pages. Understanding this architecture is crucial for maintaining and extending the application.

## 🎯 Overview

The portfolio uses a centralized data flow architecture that ensures consistency, type safety, and maintainability. All content flows through utility functions that act as single sources of truth.

## 📊 Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                 PORTFOLIO DATA FLOW                                        │
│                          SvelteKit Application Architecture                                │
└─────────────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                    📁 SOURCE LAYER                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘

📂 src/content/
├── 📁 blogs/                           # Blog markdown files
│   ├── 📄 welcome.md                   # Blog posts with frontmatter
│   ├── 📄 enhanced-markdown-demo.md    # Advanced markdown features
│   └── 📄 [your-posts].md             # Automatically discovered
└── 📁 projects/                        # Project markdown files
    ├── 📄 ecommerce-platform.md        # Project documentation
    ├── 📄 weather-dashboard.md         # With galleries & timelines
    └── 📄 [your-projects].md           # Automatically discovered

┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                🔧 PROCESSING LAYER                                         │
└─────────────────────────────────────────────────────────────────────────────────────────┘

📄 mdsvex.config.js                     # Markdown processing configuration
├── 🎨 Shiki Syntax Highlighter         # Code block highlighting
│   ├── 🌞 github-light theme           # Light mode code theme
│   ├── 🌙 github-dark theme            # Dark mode code theme
│   └── 📋 Language detection            # Automatic language detection
├── 🔗 Rehype Plugins                   # HTML processing
│   ├── rehype-slug                     # Auto-generate heading IDs
│   └── rehype-autolink-headings        # Add heading anchor links
└── 📦 MDSvex Pipeline                  # Markdown to Svelte conversion
    ├── Frontmatter extraction          # YAML metadata parsing
    ├── Markdown to HTML conversion     # Content processing
    └── Svelte component integration    # Component embedding

        ↓ PROCESSING FLOW ↓

┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                               📊 DATA UTILITY LAYER                                        │
└─────────────────────────────────────────────────────────────────────────────────────────┘

📄 src/lib/utils/blog.ts                # Blog data utilities
├── 🔄 getBlogPosts()                   # ⭐ SINGLE SOURCE OF TRUTH
│   ├── import.meta.glob() discovery    # Auto-discover blog files
│   ├── Frontmatter parsing             # Extract metadata
│   ├── Reading time calculation        # Auto-calculate read time
│   ├── Published content filtering     # Only show published: true
│   └── Date sorting (newest first)     # Chronological ordering
├── 🎯 getBlogPost(slug)                # Get single blog post
│   └── ↳ Calls getBlogPosts() internally for consistency
├── ⭐ getFeaturedBlogPosts()           # Get featured content
│   └── ↳ Calls getBlogPosts() + filters for featured: true
└── 🔍 Feeds into searchContent()       # Powers search functionality

📄 src/lib/utils/project.ts             # Project data utilities
├── 🔄 getProjects()                    # ⭐ SINGLE SOURCE OF TRUTH
│   ├── import.meta.glob() discovery    # Auto-discover project files
│   ├── Frontmatter parsing             # Extract metadata
│   ├── Reading time calculation        # Auto-calculate read time
│   ├── Published content filtering     # Only show published: true
│   └── Date sorting (newest first)     # Chronological ordering
├── 🎯 getProject(slug)                 # Get single project
│   └── ↳ Calls getProjects() internally for consistency
├── ⭐ getFeaturedProjects()            # Get featured content
│   └── ↳ Calls getProjects() + filters for featured: true
└── 🔍 Feeds into searchContent()       # Powers search functionality

📄 src/lib/utils/search.ts              # Search utilities
├── 🔍 searchContent(query)             # Unified search function
│   ├── ↳ Receives data from getBlogPosts()
│   ├── ↳ Receives data from getProjects()
│   ├── Fuzzy matching implementation   # Flexible search matching
│   └── Returns unified search results  # Combined blog + project results
└── 🎯 Used by SearchDialog component   # Powers search interface

        ↓ DATA FLOW ↓

┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              🚀 SVELTEKIT ROUTE LAYER                                      │
└─────────────────────────────────────────────────────────────────────────────────────────┘

📁 src/routes/                          # SvelteKit routes
├── 📄 +page.ts                         # Homepage data loader
│   ├── ↳ Calls getFeaturedBlogPosts()  # Featured blog posts
│   └── ↳ Calls getFeaturedProjects()   # Featured projects
├── 📄 blog/+page.ts                    # Blog index data loader
│   └── ↳ Calls getBlogPosts()          # All published blog posts
├── 📄 blog/[slug]/+page.ts             # Individual blog post loader
│   └── ↳ Calls getBlogPost(slug)       # Single blog post
├── 📄 projects/+page.ts                # Projects index data loader
│   └── ↳ Calls getProjects()           # All published projects
└── 📄 projects/[slug]/+page.ts         # Individual project loader
    └── ↳ Calls getProject(slug)        # Single project

        ↓ ROUTE DATA ↓

┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                              🎨 COMPONENT RENDERING LAYER                                  │
└─────────────────────────────────────────────────────────────────────────────────────────┘

📄 src/routes/+page.svelte              # Homepage component
├── 📊 Receives featured blog posts     # From getFeaturedBlogPosts()
├── 📊 Receives featured projects       # From getFeaturedProjects()
├── 🎨 Renders BlogPreview components   # Preview cards for blogs
└── 🎨 Renders ProjectsPreview          # Preview cards for projects

📄 src/routes/blog/+page.svelte         # Blog index component
├── 📊 Receives all blog posts          # From getBlogPosts()
└── 🎨 Renders blog list with search    # Searchable blog listing

📄 src/routes/projects/+page.svelte     # Projects index component
├── 📊 Receives all projects            # From getProjects()
└── 🎨 Renders project grid             # Project showcase grid

📄 SearchDialog.svelte                  # Search component
├── 🔍 Uses searchContent() function    # Unified search
└── 🎨 Renders combined search results  # Blogs + projects in one interface
```

## 🏗️ Core Architecture Principles

### 1. Single Source of Truth

**Critical Rule**: All data must flow through central utility functions.

```typescript
// ✅ CORRECT - All blog data flows through getBlogPosts()
export async function getBlogPosts(): Promise<BlogPost[]> {
	// This is the ONLY place where blog files are directly imported
	const blogModules = import.meta.glob('/src/content/blogs/*.md');
	// ... processing logic
}

// ✅ CORRECT - Dependent functions call the central function
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
	const posts = await getBlogPosts(); // Uses central function
	return posts.find((post) => post.slug === slug) || null;
}

// ❌ INCORRECT - Direct import bypasses central function
const blogModule = await import(`/src/content/blogs/${slug}.md`);
```

### 2. Consistent Data Processing

All content gets the same processing pipeline:

```typescript
// Applied to every piece of content
const processedContent = {
	...frontmatter,
	slug: generateSlug(filepath),
	readingTime: calculateReadingTime(content), // Automatic
	published: frontmatter.published === true // Explicit filtering
	// ... other standardized fields
};
```

### 3. Type Safety

TypeScript interfaces ensure data consistency:

```typescript
// src/lib/types/blog.ts
export interface BlogPost {
	title: string;
	description: string;
	date: string;
	slug: string;
	published: boolean;
	featured?: boolean;
	tags?: string[];
	readingTime: number; // Automatically calculated
	// ... other fields
}
```

## 🔄 Data Flow Patterns

### Route Data Loading Pattern

Every route follows the same pattern:

```typescript
// src/routes/blog/+page.ts
import { getBlogPosts } from '$lib/utils/blog';

export async function load() {
	return {
		posts: await getBlogPosts() // Always use utility function
	};
}
```

### Component Data Consumption Pattern

Components receive data through SvelteKit's data loading:

```svelte
<!-- src/routes/blog/+page.svelte -->
<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	// Data is already loaded and processed
	$: posts = data.posts;
</script>
```

### Search Integration Pattern

Search combines data from all sources:

```typescript
// src/lib/utils/search.ts
export async function searchContent(query: string) {
	const [blogPosts, projects] = await Promise.all([
		getBlogPosts(), // Uses central blog function
		getProjects() // Uses central project function
	]);

	// Unified search across all content
	return [...searchBlogs(blogPosts, query), ...searchProjects(projects, query)];
}
```

## 📦 Content Processing Pipeline

### 1. File Discovery

```typescript
// Automatic discovery of markdown files
const modules = import.meta.glob('/src/content/blogs/*.md');
const filePaths = Object.keys(modules);
```

### 2. Content Loading

```typescript
// Load and parse each file
const module = await modules[filePath]();
const { metadata, default: content } = module;
```

### 3. Data Enhancement

```typescript
// Add computed fields
const enhancedPost = {
	...metadata,
	slug: extractSlugFromPath(filePath),
	readingTime: calculateReadingTime(content),
	excerpt: generateExcerpt(content)
};
```

### 4. Filtering and Sorting

```typescript
// Apply consistent filtering and sorting
return posts
	.filter((post) => post.published === true)
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
```

## 🔍 Search Architecture

### Unified Search Strategy

```typescript
// Search combines all content types
export async function searchContent(query: string): Promise<SearchResult[]> {
	const [blogPosts, projects] = await Promise.all([getBlogPosts(), getProjects()]);

	const blogResults = blogPosts
		.filter((post) => matchesQuery(post, query))
		.map((post) => ({ ...post, type: 'blog' as const }));

	const projectResults = projects
		.filter((project) => matchesQuery(project, query))
		.map((project) => ({ ...project, type: 'project' as const }));

	return [...blogResults, ...projectResults].sort(
		(a, b) => calculateRelevanceScore(b, query) - calculateRelevanceScore(a, query)
	);
}
```

### Search Integration

```svelte
<!-- SearchDialog.svelte -->
<script lang="ts">
	import { searchContent } from '$lib/utils/search';

	async function handleSearch(query: string) {
		results = await searchContent(query); // Unified search
	}
</script>
```

## ⚠️ Critical Rules

### Data Flow Violations

**❌ NEVER DO THIS**:

```typescript
// Direct import bypasses the central system
const post = await import(`/src/content/blogs/${slug}.md`);

// Multiple sources of truth
const blogPosts1 = await loadBlogsDirectly();
const blogPosts2 = await getBlogPosts();

// Inconsistent processing
const post = { ...frontmatter }; // Missing readingTime, slug, etc.
```

**✅ ALWAYS DO THIS**:

```typescript
// Use central utility functions
const posts = await getBlogPosts();
const post = await getBlogPost(slug);

// Consistent data processing
const posts = await getBlogPosts(); // Includes all standard fields
```

### Component Integration Rules

```svelte
<!-- ✅ CORRECT: Use SvelteKit data loading -->
<script lang="ts">
    export let data: PageData;
    $: posts = data.posts; // Data loaded in +page.ts
</script>

<!-- ❌ INCORRECT: Direct utility calls in components -->
<script lang="ts">
    import { getBlogPosts } from '$lib/utils/blog';

    let posts = getBlogPosts(); // Should be in +page.ts
</script>
```

## 🛠️ Debugging Data Flow

### Common Issues

**Content not appearing**:

1. Check `published: true` in frontmatter
2. Verify file is in correct directory
3. Check frontmatter syntax
4. Ensure utility function is used correctly

**Inconsistent data**:

1. Verify all content goes through utility functions
2. Check that dependent functions call central functions
3. Ensure consistent field names across content types

**Search not working**:

1. Verify search function receives data from utility functions
2. Check that content is properly indexed
3. Ensure search component uses unified search function

### Debugging Tools

```typescript
// Add debugging to utility functions
export async function getBlogPosts(): Promise<BlogPost[]> {
	console.log('🔍 Loading blog posts...');
	const posts = await loadAndProcessPosts();
	console.log(`✅ Loaded ${posts.length} blog posts`);
	return posts;
}
```

## 📋 Data Flow Checklist

### For New Content Types

- [ ] Create utility functions following the pattern
- [ ] Implement single source of truth function
- [ ] Add dependent functions that call the central function
- [ ] Integrate with search functionality
- [ ] Add TypeScript interfaces
- [ ] Create route data loaders
- [ ] Test data flow end-to-end

### For Modifications

- [ ] Ensure changes go through utility functions
- [ ] Maintain consistent field processing
- [ ] Update TypeScript types if needed
- [ ] Test all dependent functionality
- [ ] Verify search integration still works

---

**Related**: [Build System →](build-system.md) | [Performance →](performance.md)
