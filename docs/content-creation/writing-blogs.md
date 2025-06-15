# Writing Blog Posts

This guide covers everything you need to know about creating and managing blog posts in your portfolio.

## 📍 Quick Start

1. Create a new `.md` file in `src/content/blogs/`
2. Add frontmatter with required fields
3. Write your content using markdown
4. Save and the blog will automatically appear on your site

## 📁 File Structure

Blog posts are stored in:

```
src/content/blogs/
├── welcome.md                 # Example blog post
├── your-new-post.md          # Your new posts go here
└── another-post.md           # As many as you want!
```

## 📝 Blog Post Template

Create a new file with this template:

```markdown
---
title: 'Your Blog Post Title'
description: 'A compelling description that appears in previews and SEO'
date: '2025-06-15'
tags: ['web-development', 'sveltekit', 'tutorial']
published: true
featured: false
layout: blog
---

Your blog content starts here! You can use all markdown features plus special components.

## Headings Work Great

Regular markdown content flows naturally.

### Using Components

You can use special components in your blog posts:

<Callout type="info" title="Pro Tip">
This is how you add callouts to highlight important information!
</Callout>

## Code Examples

\`\`\`javascript
// Code blocks are automatically syntax highlighted
function greetUser(name) {
return `Hello, ${name}! Welcome to my blog.`;
}
\`\`\`

## Images

![Alt text](/path-to-your-image.jpg)

_Caption text goes here_
```

## 🏷️ Frontmatter Reference

### Required Fields

| Field         | Type    | Description                     | Example                                               |
| ------------- | ------- | ------------------------------- | ----------------------------------------------------- |
| `title`       | string  | Blog post title                 | `'Getting Started with SvelteKit'`                    |
| `description` | string  | SEO description (150-160 chars) | `'Learn how to build modern web apps with SvelteKit'` |
| `date`        | string  | Publication date (YYYY-MM-DD)   | `'2025-06-15'`                                        |
| `published`   | boolean | Whether to show the post        | `true`                                                |
| `layout`      | string  | Must be `'blog'`                | `'blog'`                                              |

### Optional Fields

| Field      | Type    | Description                             | Example                             |
| ---------- | ------- | --------------------------------------- | ----------------------------------- |
| `tags`     | array   | Topic tags for categorization           | `['svelte', 'tutorial', 'web-dev']` |
| `featured` | boolean | Show in featured section                | `true`                              |
| `image`    | string  | Featured image path                     | `'/blog-images/my-post.jpg'`        |
| `author`   | string  | Author override (defaults to your name) | `'Guest Author'`                    |

### Frontmatter Example

```yaml
---
title: 'Building a Modern Portfolio with SvelteKit'
description: 'A comprehensive guide to creating a portfolio website using SvelteKit, TypeScript, and modern web technologies.'
date: '2025-06-15'
tags: ['sveltekit', 'portfolio', 'web-development', 'typescript']
published: true
featured: true
layout: blog
image: '/blog-images/sveltekit-portfolio.jpg'
---
```

## 🧩 Available Components

### Callout Component

Highlight important information with styled callouts:

```markdown
<Callout type="info" title="Information">
This is an informational callout.
</Callout>

<Callout type="warning" title="Warning">
This is a warning callout.
</Callout>

<Callout type="success" title="Success">
This is a success callout.
</Callout>

<Callout type="error" title="Error">
This is an error callout.
</Callout>
```

**Available types**: `info`, `warning`, `success`, `error`

### Image Component

Enhanced images with lazy loading and optimization:

```markdown
<Image 
    src="/blog-images/my-image.jpg" 
    alt="Description of the image"
    caption="Optional caption text"
    width={800}
    height={400}
/>
```

### Code Blocks

Syntax highlighting is automatic:

````markdown
```javascript
// JavaScript
const greeting = 'Hello, World!';
console.log(greeting);
```

```css
/* CSS */
.my-class {
	color: var(--primary-color);
	background: var(--glass-bg);
}
```

```bash
# Terminal commands
bun install
bun run dev
```
````

## 📊 Content Organization

### File Naming

Use descriptive, URL-friendly names:

- ✅ `getting-started-with-sveltekit.md`
- ✅ `advanced-css-techniques.md`
- ❌ `My New Post.md` (spaces)
- ❌ `post1.md` (not descriptive)

### Date Format

Always use ISO date format (YYYY-MM-DD):

- ✅ `'2025-06-15'`
- ❌ `'June 15, 2025'`
- ❌ `'15/06/2025'`

### Tags Best Practices

- Use lowercase, hyphenated tags
- Be consistent with tag names
- Include 3-7 relevant tags per post
- Examples: `'web-development'`, `'tutorial'`, `'sveltekit'`, `'typescript'`

## 🎨 Writing Best Practices

### Structure Your Content

1. **Start with a hook** - Grab attention in the first paragraph
2. **Use clear headings** - Break content into scannable sections
3. **Include examples** - Show, don't just tell
4. **End with action** - Give readers next steps

### SEO Optimization

- **Title**: 50-60 characters, include main keyword
- **Description**: 150-160 characters, compelling summary
- **Headings**: Use H2, H3 hierarchy properly
- **Images**: Always include alt text
- **Internal links**: Link to your other posts and projects

### Code Examples

- Always test your code examples
- Include necessary imports and setup
- Explain complex concepts
- Use comments to clarify logic

## 🔄 Publishing Workflow

### 1. Draft Your Post

Start with `published: false` while working:

```yaml
---
title: 'My Draft Post'
# ... other fields
published: false # Won't appear on site
---
```

### 2. Review and Edit

- Check spelling and grammar
- Verify all links work
- Test code examples
- Optimize images

### 3. Publish

Change to `published: true`:

```yaml
published: true # Now visible on site
```

### 4. Promote (Optional)

Set as featured for homepage showcase:

```yaml
featured: true # Shows in featured section
```

## 📱 Preview Your Posts

### Development Server

While running `bun run dev`:

1. Save your markdown file
2. Navigate to `/blog/your-post-slug`
3. Changes auto-reload

### Blog List

Your new posts automatically appear:

- Blog index page (`/blog`)
- Search results
- Featured section (if `featured: true`)
- RSS feed (coming soon)

## 🖼️ Adding Images

### Image Organization

Store blog images in:

```
static/
├── blog-images/
│   ├── my-post-hero.jpg
│   ├── code-example.png
│   └── diagram.svg
```

### Image Best Practices

- **Format**: Use WebP for photos, SVG for diagrams
- **Size**: Optimize for web (< 500KB per image)
- **Dimensions**: Consider 16:9 for hero images
- **Alt text**: Always include descriptive alt text

### Example Usage

```markdown
<!-- Simple image -->

![My awesome diagram](/blog-images/diagram.svg)

<!-- Enhanced image with component -->

<Image 
    src="/blog-images/hero-image.webp"
    alt="Screenshot of the final application"
    caption="The completed project running in the browser"
    width={1200}
    height={675}
/>
```

## 🔍 SEO and Discoverability

### Automatic Features

Your blog posts automatically get:

- ✅ Meta tags for social sharing
- ✅ Structured data for search engines
- ✅ Reading time calculation
- ✅ Table of contents generation
- ✅ Syntax highlighted code blocks

### Manual Optimization

- Write compelling titles and descriptions
- Use relevant tags consistently
- Include internal links to other posts
- Add alt text to all images
- Structure content with proper headings

## 📋 Content Checklist

Before publishing, ensure:

- [ ] All required frontmatter fields present
- [ ] Title is compelling and SEO-friendly
- [ ] Description is under 160 characters
- [ ] Date is in correct format (YYYY-MM-DD)
- [ ] Tags are relevant and consistent
- [ ] All images have alt text
- [ ] Code examples are tested
- [ ] Links work correctly
- [ ] Content is spell-checked
- [ ] `published: true` when ready

## 🚀 Advanced Tips

### Series of Posts

For multi-part series, use consistent naming:

```
part-1-introduction-to-sveltekit.md
part-2-routing-in-sveltekit.md
part-3-state-management.md
```

### Cross-References

Link to your other content:

```markdown
As I discussed in [my previous post about SvelteKit](/blog/getting-started-sveltekit),
the framework makes it easy to...

Check out my [Weather Dashboard project](/projects/weather-dashboard) for a
complete example.
```

### Code Snippets Library

Keep reusable code snippets for common patterns:

- Component imports
- Markdown examples
- Callout patterns
- Image usage

## 🔧 Troubleshooting

### Common Issues

**Post not appearing**

- Check `published: true`
- Verify file is in `src/content/blogs/`
- Check frontmatter syntax

**Images not loading**

- Verify path starts with `/`
- Check file exists in `static/`
- Ensure correct file extension

**Code not highlighting**

- Check language identifier after ```
- Verify supported language
- Try `text` for plain text

**Build errors**

- Check frontmatter YAML syntax
- Verify all required fields present
- Look for unclosed components

---

**Next**: [Creating Project Pages →](creating-projects.md)  
**Related**: [Markdown Components →](markdown-components.md)
