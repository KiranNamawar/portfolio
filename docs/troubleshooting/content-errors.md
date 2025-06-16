# Content Errors

Troubleshoot issues related to blog posts, project pages, markdown processing, and content management. This guide covers frontmatter errors, markdown rendering issues, and content validation problems.

## 📝 Frontmatter Errors

### Invalid YAML Syntax

**Error:** `YAMLException: bad indentation`

**Common Issues:**

```yaml
# ❌ Incorrect - Mixed tabs and spaces
---
title: "Blog Post"
description: "Description"
	tags: ["tag1", "tag2"]  # Tab used here
---

# ✅ Correct - Consistent spaces
---
title: "Blog Post"
description: "Description"
tags: ["tag1", "tag2"]
---
```

**Error:** `YAMLException: duplicated mapping key`

**Solutions:**

```yaml
# ❌ Incorrect - Duplicate keys
---
title: "Blog Post"
date: "2024-06-16"
title: "Different Title"  # Duplicate key
---

# ✅ Correct - Unique keys
---
title: "Blog Post"
date: "2024-06-16"
description: "Post description"
---
```

### Missing Required Fields

**Error:** Blog post not appearing in listings

**Check required frontmatter:**

```yaml
# Required fields for blog posts
---
title: 'Your Blog Post Title' # Required
description: 'SEO-friendly description' # Required
date: '2024-06-16' # Required
published: true # Required to show
---
# Required fields for projects
---
title: 'Project Name' # Required
description: 'Project description' # Required
date: '2024-06-16' # Required
published: true # Required to show
technologies: ['React', 'Node.js'] # Required
---
```

### Date Format Issues

**Error:** Invalid date format

**Solutions:**

```yaml
# ❌ Incorrect date formats
date: "June 16, 2024"
date: "16/06/2024"
date: "2024-6-16"

# ✅ Correct date format (ISO 8601)
date: "2024-06-16"
date: "2024-06-16T10:30:00Z"  # With time
```

### Boolean and Array Issues

**Error:** Type validation failures

**Solutions:**

```yaml
# ❌ Incorrect - String instead of boolean
published: "true"
featured: "false"

# ✅ Correct - Proper boolean values
published: true
featured: false

# ❌ Incorrect - String instead of array
tags: "javascript, react, tutorial"

# ✅ Correct - Proper array syntax
tags: ["javascript", "react", "tutorial"]

# ✅ Alternative array syntax
tags:
  - javascript
  - react
  - tutorial
```

## 🔧 Markdown Rendering Issues

### Broken Images

**Error:** Images not displaying

**Common causes and solutions:**

1. **Incorrect file paths:**

```markdown
# ❌ Incorrect - Relative path that doesn't work

![Alt text](../images/screenshot.png)

# ✅ Correct - Absolute path from static folder

![Alt text](/gallery/project-screenshot.png)

# ✅ Alternative - Using Image component

<Image 
  src="/gallery/project-screenshot.png"
  alt="Project screenshot showing dashboard"
  width={800}
  height={600}
/>
```

2. **Missing images:**

```bash
# Check if image exists
ls -la static/gallery/

# Verify image file extension
find static/ -name "*.jpg" -o -name "*.png" -o -name "*.svg"
```

3. **Image optimization issues:**

```bash
# Check image sizes
du -h static/gallery/*

# Optimize large images
mogrify -resize 1200x800> static/gallery/*.jpg
mogrify -quality 85% static/gallery/*.jpg
```

### Code Block Issues

**Error:** Syntax highlighting not working

**Solutions:**

1. **Check language specification:**

````markdown
# ❌ Incorrect - Invalid language

```javascripts
const hello = "world";
```
````

# ✅ Correct - Valid language

```javascript
const hello = 'world';
```

# ✅ Alternative languages

```typescript
const hello: string = 'world';
```

```svelte
<script>
	let hello = 'world';
</script>
```

````

2. **MDSvex configuration:**
```javascript
// mdsvex.config.js
import { createHighlighter } from 'shiki';

const highlighter = await createHighlighter({
  themes: ['github-dark', 'github-light'],
  langs: [
    'javascript',
    'typescript',
    'svelte',
    'css',
    'html',
    'bash',
    'json',
    'yaml'
  ]
});

export default {
  highlight: {
    highlighter: (code, lang) => {
      if (!lang || !highlighter.getLoadedLanguages().includes(lang)) {
        return `<pre><code>${escapeHtml(code)}</code></pre>`;
      }

      return highlighter.codeToHtml(code, {
        lang,
        theme: 'github-dark'
      });
    }
  }
};
````

### Link Issues

**Error:** Broken internal links

**Solutions:**

1. **Check link format:**

```markdown
# ❌ Incorrect - Missing file extension

[Read more](/blog/my-post)

# ✅ Correct - Proper SvelteKit route

[Read more](/blog/my-post-slug)

# ✅ External links

[Visit website](https://example.com)

# ✅ Internal links with anchor

[Jump to section](#heading-id)
```

2. **Validate all links:**

```bash
# Install link checker
npm install -g markdown-link-check

# Check all markdown files
find src/content -name "*.md" -exec markdown-link-check {} \;
```

### Table of Contents Issues

**Error:** TOC not generating or incorrect

**Solutions:**

1. **Check heading structure:**

```markdown
# ❌ Incorrect - Skipping heading levels

# Main Title

### Subsection (skips h2)

# ✅ Correct - Proper hierarchy

# Main Title

## Section

### Subsection

#### Sub-subsection
```

2. **TOC component configuration:**

```svelte
<!-- src/lib/components/blog/TableOfContents.svelte -->
<script lang="ts">
	export let headings: Array<{
		id: string;
		level: number;
		text: string;
	}>;

	// Filter headings by level (h2-h4 only)
	$: tocHeadings = headings.filter((h) => h.level >= 2 && h.level <= 4);
</script>

{#if tocHeadings.length > 0}
	<nav class="table-of-contents">
		<h3>Table of Contents</h3>
		<ul>
			{#each tocHeadings as heading}
				<li class="level-{heading.level}">
					<a href="#{heading.id}">{heading.text}</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
```

## 🎯 Content Validation Issues

### Blog Post Validation

**Error:** Posts not showing in blog listing

**Validation checklist:**

```typescript
// src/lib/utils/contentValidation.ts
interface BlogPostValidation {
	title: string;
	description: string;
	date: string;
	published: boolean;
	slug: string;
}

export function validateBlogPost(post: any): BlogPostValidation | null {
	const errors: string[] = [];

	// Required fields
	if (!post.title) errors.push('Missing title');
	if (!post.description) errors.push('Missing description');
	if (!post.date) errors.push('Missing date');
	if (typeof post.published !== 'boolean') errors.push('Published must be boolean');

	// Date validation
	if (post.date && !isValidDate(post.date)) {
		errors.push('Invalid date format (use YYYY-MM-DD)');
	}

	// Content validation
	if (!post.content || post.content.trim().length === 0) {
		errors.push('Empty content');
	}

	if (errors.length > 0) {
		console.error(`Blog post validation failed: ${errors.join(', ')}`);
		return null;
	}

	return post as BlogPostValidation;
}

function isValidDate(dateString: string): boolean {
	const date = new Date(dateString);
	return date instanceof Date && !isNaN(date.getTime());
}
```

### Project Validation

**Error:** Projects not appearing or missing information

**Validation script:**

```typescript
// src/lib/utils/projectValidation.ts
export function validateProject(project: any) {
	const warnings: string[] = [];
	const errors: string[] = [];

	// Required fields
	if (!project.title) errors.push('Missing title');
	if (!project.description) errors.push('Missing description');
	if (!project.technologies || !Array.isArray(project.technologies)) {
		errors.push('Missing or invalid technologies array');
	}

	// Optional but recommended fields
	if (!project.githubUrl) warnings.push('Missing GitHub URL');
	if (!project.liveUrl) warnings.push('Missing live demo URL');
	if (!project.status) warnings.push('Missing project status');

	// Gallery validation
	if (project.gallery && Array.isArray(project.gallery)) {
		project.gallery.forEach((image: any, index: number) => {
			if (!image.src) errors.push(`Gallery image ${index} missing src`);
			if (!image.alt) warnings.push(`Gallery image ${index} missing alt text`);
		});
	}

	if (errors.length > 0) {
		console.error(`Project validation failed: ${errors.join(', ')}`);
		return false;
	}

	if (warnings.length > 0) {
		console.warn(`Project warnings: ${warnings.join(', ')}`);
	}

	return true;
}
```

## 🔍 Content Processing Errors

### File Reading Issues

**Error:** `ENOENT: no such file or directory`

**Solutions:**

1. **Check file paths:**

```typescript
// src/lib/utils/blog.ts
import { glob } from 'glob';
import path from 'path';

export async function getBlogPosts() {
	try {
		// Use absolute path from project root
		const blogPath = path.join(process.cwd(), 'src/content/blogs');
		const files = await glob('**/*.md', { cwd: blogPath });

		console.log(`Found ${files.length} blog files in ${blogPath}`);

		// Process files...
	} catch (error) {
		console.error('Error reading blog files:', error);
		return [];
	}
}
```

2. **Verify file structure:**

```bash
# Check if content directory exists
ls -la src/content/

# Check blog files
find src/content/blogs -name "*.md" -type f

# Check file permissions
ls -la src/content/blogs/
```

### Frontmatter Parsing Errors

**Error:** `Cannot read properties of undefined`

**Solutions:**

1. **Safe frontmatter parsing:**

```typescript
// src/lib/utils/markdown.ts
import matter from 'gray-matter';

export function parseMarkdown(content: string) {
	try {
		const { data, content: markdownContent } = matter(content);

		// Validate required fields with defaults
		const frontmatter = {
			title: data.title || 'Untitled',
			description: data.description || '',
			date: data.date || new Date().toISOString().split('T')[0],
			published: data.published ?? false,
			featured: data.featured ?? false,
			tags: Array.isArray(data.tags) ? data.tags : [],
			...data
		};

		return {
			frontmatter,
			content: markdownContent
		};
	} catch (error) {
		console.error('Error parsing markdown:', error);
		return null;
	}
}
```

### Content Processing Pipeline Issues

**Error:** Content not updating after changes

**Solutions:**

1. **Clear build cache:**

```bash
# Clear SvelteKit cache
rm -rf .svelte-kit/

# Restart development server
bun dev
```

2. **Check file watching:**

```javascript
// vite.config.ts
export default defineConfig({
	plugins: [sveltekit()],
	server: {
		watch: {
			usePolling: true, // For some file systems
			interval: 100
		}
	}
});
```

3. **Force content reload:**

```typescript
// src/lib/utils/blog.ts
let cachedPosts: BlogPost[] | null = null;
let lastCacheTime = 0;
const CACHE_DURATION = 1000 * 60; // 1 minute in dev

export async function getBlogPosts(forceRefresh = false) {
	const now = Date.now();

	if (forceRefresh || !cachedPosts || now - lastCacheTime > CACHE_DURATION) {
		console.log('Refreshing blog posts cache...');
		cachedPosts = await loadBlogPostsFromDisk();
		lastCacheTime = now;
	}

	return cachedPosts;
}
```

## 🛠️ Content Development Tools

### Content Validation Script

```javascript
// scripts/validate-content.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

async function validateContent() {
	const contentDir = path.join(process.cwd(), 'src/content');
	const errors = [];
	const warnings = [];

	// Validate blog posts
	const blogDir = path.join(contentDir, 'blogs');
	if (fs.existsSync(blogDir)) {
		const blogFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));

		for (const file of blogFiles) {
			const filePath = path.join(blogDir, file);
			const content = fs.readFileSync(filePath, 'utf-8');

			try {
				const { data } = matter(content);

				// Validate required fields
				if (!data.title) errors.push(`${file}: Missing title`);
				if (!data.description) errors.push(`${file}: Missing description`);
				if (!data.date) errors.push(`${file}: Missing date`);
				if (typeof data.published !== 'boolean') {
					warnings.push(`${file}: Published should be boolean`);
				}

				// Validate date format
				if (data.date && isNaN(Date.parse(data.date))) {
					errors.push(`${file}: Invalid date format`);
				}
			} catch (error) {
				errors.push(`${file}: YAML parsing error - ${error.message}`);
			}
		}
	}

	// Report results
	if (errors.length > 0) {
		console.error('❌ Content validation errors:');
		errors.forEach((error) => console.error(`  ${error}`));
	}

	if (warnings.length > 0) {
		console.warn('⚠️  Content validation warnings:');
		warnings.forEach((warning) => console.warn(`  ${warning}`));
	}

	if (errors.length === 0 && warnings.length === 0) {
		console.log('✅ All content validation passed!');
	}

	process.exit(errors.length > 0 ? 1 : 0);
}

validateContent().catch(console.error);
```

### Content Linting

```bash
#!/bin/bash
# scripts/lint-content.sh

echo "🔍 Linting content files..."

# Check for required frontmatter
echo "Checking frontmatter..."
node scripts/validate-content.js

# Check for broken links
echo "Checking for broken links..."
find src/content -name "*.md" -exec markdown-link-check {} \;

# Check image references
echo "Checking image references..."
grep -r "!\[.*\](" src/content/ | while read -r line; do
  file=$(echo "$line" | cut -d: -f1)
  image=$(echo "$line" | grep -o "!\[.*\]([^)]*)" | sed 's/.*(\([^)]*\)).*/\1/')

  if [[ $image == /* ]]; then
    # Absolute path from static folder
    if [[ ! -f "static$image" ]]; then
      echo "❌ Missing image: $image in $file"
    fi
  fi
done

echo "✅ Content linting complete!"
```

## 📋 Content Error Prevention

### Pre-publish Checklist

- [ ] **Frontmatter validation**: All required fields present
- [ ] **Date format**: ISO 8601 format (YYYY-MM-DD)
- [ ] **Boolean values**: Use true/false, not strings
- [ ] **Array format**: Proper YAML array syntax
- [ ] **Image paths**: Absolute paths from static folder
- [ ] **Alt text**: All images have descriptive alt text
- [ ] **Link validation**: All links work correctly
- [ ] **Code blocks**: Proper language specification
- [ ] **Heading hierarchy**: Logical h1-h6 structure
- [ ] **Content length**: Sufficient content for reading time

### Automated Validation

```yaml
# .github/workflows/content-validation.yml
name: Content Validation

on:
  pull_request:
    paths:
      - 'src/content/**'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Validate content
        run: npm run validate:content
      - name: Check links
        run: npm run check:links
```

---

**Related Documentation:**

- [Writing Blogs](../content-creation/writing-blogs.md) - Blog creation guide
- [Creating Projects](../content-creation/creating-projects.md) - Project creation guide
- [Frontmatter Reference](../content-creation/frontmatter-reference.md) - Complete field reference
