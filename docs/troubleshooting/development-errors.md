# Development Errors

Troubleshoot common development issues you might encounter while working with the portfolio. This guide covers SvelteKit, TypeScript, build, and deployment errors.

## 🔧 SvelteKit Errors

### Module Resolution Errors

**Error:** `Cannot resolve module '$lib/...'`

**Solutions:**

```bash
# 1. Ensure SvelteKit sync is up to date
bun run prepare

# 2. Check tsconfig.json paths
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "$lib": ["src/lib"],
      "$lib/*": ["src/lib/*"]
    }
  }
}

# 3. Restart development server
bun dev
```

**Error:** `Module '"$app/..."' has no exported member`

**Solutions:**

```bash
# Update SvelteKit to latest version
bun update @sveltejs/kit

# Check imports match current SvelteKit version
import { page } from '$app/stores';
import { goto } from '$app/navigation';
```

### Route Loading Errors

**Error:** `Error in load function`

**Common causes and solutions:**

1. **Async/Await Issues:**

```typescript
// ❌ Incorrect
export async function load() {
	const data = getBlogPosts(); // Missing await
	return { posts: data };
}

// ✅ Correct
export async function load() {
	const data = await getBlogPosts();
	return { posts: data };
}
```

2. **Return Type Issues:**

```typescript
// ❌ Incorrect
export async function load() {
	return getBlogPosts(); // Direct return
}

// ✅ Correct
export async function load() {
	const posts = await getBlogPosts();
	return { posts };
}
```

3. **Error Handling:**

```typescript
// ✅ Proper error handling
export async function load() {
	try {
		const posts = await getBlogPosts();
		return { posts };
	} catch (error) {
		console.error('Failed to load posts:', error);
		return { posts: [] };
	}
}
```

### Server-Side Rendering Issues

**Error:** `ReferenceError: window is not defined`

**Solutions:**

```typescript
// ❌ Incorrect
const width = window.innerWidth;

// ✅ Correct - Check if running in browser
import { browser } from '$app/environment';

const width = browser ? window.innerWidth : 0;

// ✅ Alternative - Use onMount
import { onMount } from 'svelte';

let width = 0;
onMount(() => {
	width = window.innerWidth;
});
```

**Error:** `Document is not defined`

**Solutions:**

```typescript
// ✅ Use browser check
import { browser } from '$app/environment';

if (browser) {
	document.addEventListener('click', handleClick);
}

// ✅ Use onMount lifecycle
import { onMount } from 'svelte';

onMount(() => {
	document.addEventListener('click', handleClick);

	return () => {
		document.removeEventListener('click', handleClick);
	};
});
```

## 📝 TypeScript Errors

### Type Definition Issues

**Error:** `Property does not exist on type`

**Solutions:**

```typescript
// ❌ Incorrect
const post = await getBlogPost(slug);
console.log(post.title); // May be undefined

// ✅ Correct - Type guard
const post = await getBlogPost(slug);
if (post) {
	console.log(post.title);
}

// ✅ Alternative - Optional chaining
console.log(post?.title);

// ✅ Best - Proper typing
interface BlogPost {
	title: string;
	content: string;
	date: string;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
	// Implementation
}
```

**Error:** `Argument of type 'X' is not assignable to parameter of type 'Y'`

**Solutions:**

```typescript
// ❌ Incorrect
const skills: Skill[] = skillsData; // Type mismatch

// ✅ Correct - Type assertion (use carefully)
const skills: Skill[] = skillsData as Skill[];

// ✅ Better - Type validation
function isSkill(obj: any): obj is Skill {
	return obj && typeof obj.name === 'string' && typeof obj.level === 'number';
}

const skills: Skill[] = skillsData.filter(isSkill);

// ✅ Best - Proper typing from source
import type { Skill } from '$lib/types/skills';
import skillsData from '$lib/data/skills.json';

const skills: Skill[] = skillsData.technical;
```

### Generic Type Errors

**Error:** `Type 'unknown' is not assignable`

**Solutions:**

```typescript
// ❌ Incorrect
async function fetchData(url: string) {
	const response = await fetch(url);
	const data = await response.json();
	return data; // Type is 'any'
}

// ✅ Correct - Generic function
async function fetchData<T>(url: string): Promise<T> {
	const response = await fetch(url);
	const data = await response.json();
	return data as T;
}

// ✅ Usage with type
interface ApiResponse {
	posts: BlogPost[];
}

const result = await fetchData<ApiResponse>('/api/posts');
```

### Import/Export Type Errors

**Error:** `Module has no default export`

**Solutions:**

```typescript
// ❌ Incorrect
import BlogPost from '$lib/types/blog'; // No default export

// ✅ Correct - Named import
import type { BlogPost } from '$lib/types/blog';

// ✅ Alternative - Import all
import * as BlogTypes from '$lib/types/blog';
type BlogPost = BlogTypes.BlogPost;
```

## 🏗️ Build Errors

### Vite Build Issues

**Error:** `Failed to resolve import`

**Solutions:**

```bash
# 1. Clear cache and reinstall
rm -rf node_modules .svelte-kit
bun install

# 2. Check vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      // Add any custom aliases here
    }
  }
});

# 3. Restart development server
bun dev
```

**Error:** `Rollup failed to resolve import`

**Solutions:**

```javascript
// vite.config.ts
export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		include: ['problem-package'], // Force include problematic packages
		exclude: ['another-package'] // Exclude packages that shouldn't be optimized
	},
	ssr: {
		noExternal: ['package-name'] // Handle SSR issues
	}
});
```

### MDSvex Build Errors

**Error:** `MDSvex failed to process file`

**Solutions:**

```bash
# 1. Check MDSvex configuration
# mdsvex.config.js
import { defineMDSveXConfig as defineConfig } from 'mdsvex';

export default defineConfig({
  extensions: ['.md'],
  layout: './src/lib/components/layouts/BlogLayout.svelte',
  highlight: {
    highlighter: async (code, lang) => {
      // Syntax highlighting implementation
      return `<pre><code class="language-${lang}">${escapeHtml(code)}</code></pre>`;
    }
  }
});

# 2. Validate markdown files
find src/content -name "*.md" -exec head -10 {} \; | grep -E "^---$"
```

**Error:** `Syntax highlighting failed`

**Solutions:**

```javascript
// mdsvex.config.js
import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({
	themes: ['github-dark', 'github-light'],
	langs: ['javascript', 'typescript', 'svelte', 'css', 'html']
});

export default defineConfig({
	highlight: {
		highlighter: (code, lang) => {
			try {
				return highlighter.codeToHtml(code, {
					lang,
					theme: 'github-dark'
				});
			} catch (error) {
				console.warn(`Failed to highlight ${lang}:`, error);
				return `<pre><code>${escapeHtml(code)}</code></pre>`;
			}
		}
	}
});
```

### Memory and Performance Issues

**Error:** `JavaScript heap out of memory`

**Solutions:**

```bash
# 1. Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" bun run build

# 2. Add to package.json scripts
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' vite build"
  }
}

# 3. Optimize bundle size
bun run build:analyze

# 4. Check for memory leaks in components
# Use Chrome DevTools Memory tab
```

## 🌐 Deployment Errors

### Vercel Deployment Issues

**Error:** `Build failed on Vercel`

**Solutions:**

```bash
# 1. Check build logs in Vercel dashboard
# 2. Test build locally first
bun run build
bun run preview

# 3. Ensure proper adapter configuration
# svelte.config.js
import adapter from '@sveltejs/adapter-vercel';

export default {
  kit: {
    adapter: adapter({
      // Vercel-specific configuration
      runtime: 'nodejs18.x',
      memory: 1024
    })
  }
};
```

**Error:** `Function payload is too large`

**Solutions:**

```javascript
// svelte.config.js
export default {
	kit: {
		adapter: adapter({
			split: true, // Split large functions
			memory: 512 // Reduce memory if needed
		})
	}
};
```

### Netlify Deployment Issues

**Error:** `Build command failed`

**Solutions:**

```toml
# netlify.toml
[build]
  command = "bun run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Error:** `Function bundling failed`

**Solutions:**

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-netlify';

export default {
	kit: {
		adapter: adapter({
			split: false, // Disable function splitting for Netlify
			edge: false // Use regular functions instead of edge
		})
	}
};
```

## 🎨 Styling and CSS Errors

### CSS Import Issues

**Error:** `Failed to resolve CSS import`

**Solutions:**

```css
/* ❌ Incorrect relative path */
@import '../styles/variables.css';

/* ✅ Correct - use absolute path */
@import '$lib/styles/variables.css';

/* ✅ Alternative - import in component */
<style>
  @import '$lib/styles/variables.css';

  .component {
    color: var(--text-primary);
  }
</style>
```

### CSS Custom Properties Issues

**Error:** `CSS variable not defined`

**Solutions:**

```css
/* 1. Check variable definition */
:root {
	--color-primary: 59 130 246;
}

/* 2. Use fallback values */
.component {
	color: rgb(var(--color-primary, 59 130 246));
	background: var(--bg-primary, #ffffff);
}

/* 3. Check theme application */
[data-theme='dark'] {
	--color-primary: 99 102 241;
}
```

### Glass Effect Issues

**Error:** `backdrop-filter not working`

**Solutions:**

```css
/* 1. Check browser support */
.glass-card {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px); /* Safari support */
}

/* 2. Fallback for unsupported browsers */
@supports not (backdrop-filter: blur(10px)) {
	.glass-card {
		background: rgba(255, 255, 255, 0.8);
	}
}

/* 3. Ensure parent has background */
.glass-container {
	position: relative;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## 🔍 Debugging Strategies

### Console Debugging

```typescript
// Debug utility functions
export const debug = {
	log: (label: string, data: any) => {
		if (import.meta.env.DEV) {
			console.log(`🐛 ${label}:`, data);
		}
	},

	error: (label: string, error: Error) => {
		console.error(`❌ ${label}:`, error);
	},

	time: (label: string) => {
		if (import.meta.env.DEV) {
			console.time(`⏱️ ${label}`);
		}
	},

	timeEnd: (label: string) => {
		if (import.meta.env.DEV) {
			console.timeEnd(`⏱️ ${label}`);
		}
	}
};

// Usage in components
import { debug } from '$lib/utils/debug';

export async function load() {
	debug.time('Loading blog posts');

	try {
		const posts = await getBlogPosts();
		debug.log('Blog posts loaded', posts.length);
		return { posts };
	} catch (error) {
		debug.error('Failed to load blog posts', error);
		return { posts: [] };
	} finally {
		debug.timeEnd('Loading blog posts');
	}
}
```

### Network Debugging

```typescript
// Network request debugging
async function debugFetch(url: string, options?: RequestInit) {
	console.log(`🌐 Fetching: ${url}`, options);

	try {
		const response = await fetch(url, options);
		console.log(`✅ Response: ${response.status}`, response);

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}

		const data = await response.json();
		console.log(`📦 Data:`, data);

		return data;
	} catch (error) {
		console.error(`❌ Fetch failed:`, error);
		throw error;
	}
}
```

## 📋 Error Prevention Checklist

### Development Setup

- [ ] Use latest stable Node.js version
- [ ] Keep dependencies updated
- [ ] Use TypeScript strict mode
- [ ] Enable ESLint and Prettier
- [ ] Set up proper editor configuration

### Code Quality

- [ ] Write type-safe code
- [ ] Handle async operations properly
- [ ] Use proper error boundaries
- [ ] Implement loading states
- [ ] Add proper error handling

### Testing

- [ ] Test in development mode
- [ ] Test production build locally
- [ ] Test on different devices
- [ ] Validate all routes work
- [ ] Check console for warnings

### Deployment

- [ ] Test build process locally
- [ ] Verify environment variables
- [ ] Check adapter configuration
- [ ] Monitor deployment logs
- [ ] Test deployed site thoroughly

---

**Related Documentation:**

- [Common Issues](common-issues.md) - General troubleshooting
- [Content Errors](content-errors.md) - Content-specific issues
- [Build System](../architecture/build-system.md) - Build configuration
