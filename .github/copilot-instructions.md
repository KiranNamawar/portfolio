# Copilot Instructions

## 🏗️ Architecture & Framework

- Use Latest Svelte version 5.x and its latest features and syntax. https://svelte.dev/llms.txt
- Use Bun as the package manager.
- use glassmorphism design style.
- use glass effects for big components like cards, modals, floating components etc.
- use @lucide/svelte for icons in Svelte components. https://lucide.dev/guide/packages/lucide-svelte
- create composable components for reusability.
- components should be responsive and dark and light mode compatible.
- create a consistent design system.
- try not to hardcode colors, use CSS variables instead.

## 🎨 Animations & Interactions

- use svelte animation for interactive components.
  animations should be smooth, subtle and responsive.

## 📚 Content Management & Data Flow

**CRITICAL**: Maintain the established data flow architecture (see DATA_FLOW_AUDIT.md)

### Blog Content Pipeline

- use mdsvex for blog. https://mdsvex.pngwn.io/docs
- create a blog pipeline so that i can write blog posts in .md files using mdsvex.
  and create components that i can use to write blog posts easily.
  and create utility functions to extract data from .md files.
  use plugins and existing libraries.
  if i create a new blog post, it should be automatically added to the blog page, search dialog, featured blog, etc.
  all components should be reusable and composable, with a consistent design system and responsive design.
  all components should be dark and light mode compatible.
  write documentation for the components and utility functions.
  I will write blogs in content/blogs directory.

### Data Flow Architecture Rules

**NEVER violate these core principles:**

1. **Single Source of Truth**:

   - ALL blog data must flow through `getBlogPosts()` in `src/lib/utils/blog.ts`
   - ALL project data must flow through `getProjects()` in `src/lib/utils/project.ts`
   - No direct markdown imports in components

2. **Centralized Data Processing**:

   - Use `calculateReadingTime()` for all content (automatic in utility functions)
   - Always filter by `published: true` status
   - Sort by date (newest first) consistently
   - Use TypeScript interfaces (`BlogPost`, `Project`) for type safety

3. **Dependent Function Pattern**:

   - `getBlogPost(slug)` must call `getBlogPosts()` internally for consistency
   - `getFeaturedBlogPosts()` must call `getBlogPosts()` and filter
   - `getProject(slug)` must call `getProjects()` internally
   - `getFeaturedProjects()` must call `getProjects()` and filter

4. **Route Loader Pattern**:

   - Use SvelteKit's `+page.ts` files to call utility functions
   - Never call utility functions directly in components
   - Pass data through SvelteKit's data loading system

5. **Search Integration**:
   - `SearchDialog` must use `searchContent()` from `src/lib/utils/search.ts`
   - Search function receives data from both `getBlogPosts()` and `getProjects()`

### Content Structure

- Blog markdown files: `src/content/blogs/*.md`
- Project markdown files: `src/content/projects/*.md`
- Frontmatter must match TypeScript interfaces exactly
- Reading time is calculated automatically (don't add to frontmatter)

## 🧭 Navigation

- for navigation, use a floating dock at the bottom of the screen for desktop and bottom bar like mobile apps for mobile.
  this should have icons for home, blog, search dialog trigger, etc. and also a theme toggle button.

## 🎯 Design System

- use a consistent design system for the entire application.

### Glass Effect System

**IMPORTANT**: Use the comprehensive glass effect system for consistent glassmorphism design.

#### Glass Effect Utility Classes

**Basic Glass Effects:**

- `.glass` - Basic glass effect with background blur
- `.glass-card` - Glass card with padding and rounded corners
- `.glass-button` - Interactive glass button with hover effects

**Advanced Glass Overlays (ProjectGallery Style):**

- `.glass-overlay` - Static glass overlay with hover enhancement
- `.glass-overlay-auto-hide` - Auto-hiding glass overlay (appears on parent hover)
- `.glass-overlay-container` - Parent container for auto-hide overlays
- `.glass-modal` - Full glass modal with enhanced backdrop
- `.glass-modal-backdrop` - Modal backdrop with glass blur effect

**Glass Control Elements:**

- `.glass-control-btn` - Control buttons for overlays/modals
- `.glass-control-btn.danger` - Danger variant (red tint)
- `.glass-nav-btn` - Navigation buttons (circular, larger)

#### CSS Variables

**Light Mode Glass Variables:**

```css
--glass-overlay-bg: rgba(255, 255, 255, 0.15);
--glass-overlay-border: rgba(255, 255, 255, 0.25);
--glass-overlay-hover-bg: rgba(255, 255, 255, 0.2);
--glass-modal-bg: rgba(255, 255, 255, 0.15);
--glass-modal-backdrop: rgba(0, 0, 0, 0.95);
```

**Dark Mode Glass Variables:**

```css
--glass-overlay-bg: rgba(0, 0, 0, 0.3);
--glass-overlay-border: rgba(255, 255, 255, 0.15);
--glass-overlay-hover-bg: rgba(0, 0, 0, 0.4);
--glass-modal-bg: rgba(0, 0, 0, 0.3);
--glass-modal-backdrop: rgba(0, 0, 0, 0.95);
```

#### Usage Examples

**Auto-hiding Header/Footer (like ProjectGallery):**

```svelte
<div class="glass-overlay-container">
	<div class="glass-overlay-auto-hide">
		<!-- Header content -->
	</div>
	<!-- Main content -->
	<div class="glass-overlay-auto-hide">
		<!-- Footer content -->
	</div>
</div>
```

**Glass Modal:**

```svelte
<div class="glass-modal-backdrop">
	<div class="glass-modal">
		<!-- Modal content -->
	</div>
</div>
```

**Glass Controls:**

```svelte
<button class="glass-control-btn">
	<Icon />
</button>
<button class="glass-control-btn danger">
	<X />
</button>
```

## 📋 Code Quality

- Follow TypeScript best practices
- Use proper error handling in utility functions
- Maintain consistent naming conventions
- Document complex functions and components
- Implement proper loading states and error boundaries

## 🚀 Performance

- Use SvelteKit's built-in optimizations
- Implement lazy loading where appropriate
- Monitor bundle size and performance metrics
- Use efficient data loading patterns (avoid unnecessary re-fetching)
