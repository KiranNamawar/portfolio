# Frontmatter Reference Guide

Complete reference for all frontmatter fields used in blog posts and project pages.

## 📝 What is Frontmatter?

Frontmatter is YAML metadata at the top of your markdown files, enclosed by `---`:

```yaml
---
title: 'My Blog Post'
description: 'A great description'
date: '2025-06-15'
published: true
---
Your content starts here...
```

## 📚 Blog Post Frontmatter

### Required Fields

```yaml
---
title: string # Post title
description: string # SEO description (150-160 chars)
date: string # Publication date (YYYY-MM-DD)
published: boolean # Whether to show the post
layout: 'blog' # Must be 'blog' for blog posts
---
```

### Optional Fields

```yaml
---
# Content Classification
tags: string[] # Topic tags ['web-dev', 'tutorial']
featured: boolean # Show in featured section
author: string # Author name (defaults to personal info)

# Media & Visuals
image: string # Featured image path
imageAlt: string # Alt text for featured image

# SEO & Social
keywords: string[] # Additional SEO keywords
socialImage: string # Custom social sharing image

# Organization
series: string # Part of a blog series
seriesOrder: number # Order in series
category: string # Primary category
---
```

### Complete Blog Example

```yaml
---
# Required
title: 'Building Modern Web Apps with SvelteKit'
description: 'Learn to create fast, scalable web applications using SvelteKit, TypeScript, and modern development practices.'
date: '2025-06-15'
published: true
layout: blog

# Optional - Content
tags: ['sveltekit', 'typescript', 'web-development', 'tutorial']
featured: true
author: 'Kiran'
category: 'tutorials'

# Optional - Media
image: '/blog-images/sveltekit-guide.webp'
imageAlt: 'SvelteKit logo with code in the background'
socialImage: '/blog-images/sveltekit-social.webp'

# Optional - Series
series: 'SvelteKit Mastery'
seriesOrder: 1

# Optional - SEO
keywords: ['svelte', 'javascript', 'frontend', 'framework']
---
```

## 🏗️ Project Frontmatter

### Required Fields

```yaml
---
title: string # Project name
description: string # Project description
date: string # Project completion/start date
image: string # Main project image
technologies: string[] # Tech stack array
published: boolean # Whether to show the project
layout: 'project' # Must be 'project' for projects
---
```

### Optional Fields

```yaml
---
# Links & Demo
github: string # GitHub repository URL
demo: string # Live demo URL
documentation: string # Documentation URL

# Classification
featured: boolean # Show in featured section
status: string # 'completed', 'in-progress', 'planned'
category: string # Project category

# Media & Gallery
gallery: GalleryImage[] # Image gallery array
videoUrl: string # Demo video URL

# Project Details
duration: string # Project duration
teamSize: number # Team size
role: string # Your role in the project

# Timeline
timeline: TimelineItem[] # Project timeline array
---
```

### Gallery Image Format

```yaml
gallery:
  - src: '/gallery/project-home.webp'
    alt: 'Homepage of the application'
    caption: 'Clean, modern homepage design'
    category: 'ui'
  - src: '/gallery/project-dashboard.webp'
    alt: 'Dashboard view'
    caption: 'Analytics dashboard with real-time data'
    category: 'features'
```

### Timeline Item Format

```yaml
timeline:
  - id: 'planning'
    title: 'Project Planning & Research'
    description: 'Initial research and architecture design'
    date: '2024-10-01'
    status: 'completed'
    category: 'planning'
    details:
      - 'Market research and competitor analysis'
      - 'Technology stack selection'
      - 'UI/UX wireframe creation'
    achievements:
      - 'Project roadmap finalized'
      - 'Tech stack approved'
```

### Complete Project Example

```yaml
---
# Required
title: 'E-commerce Platform'
description: 'Full-stack e-commerce platform with modern UI, secure payments, and admin dashboard'
date: '2024-12-01'
image: '/projects/ecommerce-hero.webp'
technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Stripe', 'Tailwind CSS']
published: true
layout: project

# Links & Demo
github: 'https://github.com/username/ecommerce-platform'
demo: 'https://ecommerce-demo.vercel.app'
documentation: 'https://docs.ecommerce-demo.com'

# Classification
featured: true
status: 'completed'
category: 'web-application'

# Project Details
duration: '3 months'
teamSize: 1
role: 'Full Stack Developer'

# Media
gallery:
  - src: '/gallery/ecommerce-home.webp'
    alt: 'Homepage with product grid'
    caption: 'Modern homepage with featured products'
    category: 'ui'
  - src: '/gallery/ecommerce-cart.webp'
    alt: 'Shopping cart page'
    caption: 'Intuitive shopping cart with quantity controls'
    category: 'features'

# Timeline
timeline:
  - id: 'setup'
    title: 'Project Setup'
    description: 'Initial setup and configuration'
    date: '2024-09-01'
    status: 'completed'
    category: 'development'
    details:
      - 'Next.js project initialization'
      - 'Database schema design'
      - 'Authentication setup'
    achievements:
      - 'Development environment ready'
      - 'Core architecture established'
---
```

## 🎯 Field Details & Validation

### String Fields

**Title**

- Length: 10-100 characters
- Should be descriptive and SEO-friendly
- Avoid special characters that break URLs

**Description**

- Length: 100-200 characters (blog), 50-150 (projects)
- Clear, compelling summary
- Include main keywords naturally

**Date**

- Format: `'YYYY-MM-DD'` (ISO 8601)
- Must be quoted string
- Examples: `'2025-06-15'`, `'2024-12-01'`

### Array Fields

**Tags**

```yaml
tags: ['web-development', 'tutorial', 'sveltekit']
# - Use lowercase, hyphenated format
# - 3-7 tags recommended
# - Be consistent across posts
```

**Technologies**

```yaml
technologies: ['SvelteKit', 'TypeScript', 'CSS', 'Bun']
# - Use proper capitalization
# - Order by importance
# - Include all major tech used
```

### Boolean Fields

```yaml
published: true # Show content (required)
featured: false # Highlight on homepage (optional)
```

### Image Paths

```yaml
image: '/projects/my-project.webp'
# - Start with '/' for absolute paths
# - Store in static/ directory
# - Use optimized formats (WebP recommended)
```

### URL Fields

```yaml
github: 'https://github.com/username/repo'
demo: 'https://my-demo.vercel.app'
# - Must be complete URLs with protocol
# - Verify links work before publishing
```

## 🔍 SEO Best Practices

### Title Optimization

- Include primary keyword
- Keep under 60 characters
- Make it compelling and clickable

### Description Optimization

- Include primary and secondary keywords
- Write for humans, not just search engines
- End with a call-to-action when appropriate

### Tag Strategy

- Use consistent tag naming
- Create tag hierarchies (e.g., 'web-development' → 'frontend' → 'sveltekit')
- Don't over-tag (3-7 tags optimal)

## ⚠️ Common Mistakes

### YAML Syntax Errors

❌ **Incorrect**:

```yaml
title: My Blog Post # Missing quotes
tags: web-dev tutorial # Missing array syntax
date: June 15, 2025 # Wrong date format
```

✅ **Correct**:

```yaml
title: 'My Blog Post'
tags: ['web-dev', 'tutorial']
date: '2025-06-15'
```

### Missing Required Fields

❌ **Missing layout**:

```yaml
title: 'My Post'
# layout field is required!
```

✅ **Complete**:

```yaml
title: 'My Post'
layout: 'blog' # Required for proper processing
```

### Image Path Issues

❌ **Incorrect paths**:

```yaml
image: blog-images/my-image.jpg    # Missing leading slash
image: './images/photo.png'        # Relative path won't work
```

✅ **Correct paths**:

```yaml
image: '/blog-images/my-image.jpg' # Absolute path from static/
```

## 🔧 Validation & Testing

### Frontmatter Validation

The build process validates frontmatter automatically:

- Missing required fields → Build error
- Invalid date format → Build error
- Invalid YAML syntax → Build error

### Testing Your Frontmatter

1. **Development server**: Save file and check for errors
2. **Build test**: Run `bun run build` to catch issues
3. **Type checking**: Run `bun run check` for TypeScript validation

### Debug Common Issues

```bash
# Check for YAML syntax errors
bun run check

# Build to catch frontmatter issues
bun run build

# View detailed error messages
bun run dev --verbose
```

## 📋 Frontmatter Templates

### Quick Blog Template

```yaml
---
title: ''
description: ''
date: '2025-06-15'
tags: []
published: false
layout: blog
---
```

### Quick Project Template

```yaml
---
title: ''
description: ''
date: '2025-06-15'
image: ''
technologies: []
github: ''
demo: ''
published: false
layout: project
---
```

### Featured Content Template

```yaml
---
title: ''
description: ''
date: '2025-06-15'
featured: true
published: true
layout: blog # or project
# ... other fields
---
```

## 🚀 Advanced Usage

### Dynamic Content

Use frontmatter for dynamic behavior:

```yaml
# Conditional rendering
showTableOfContents: true
allowComments: false

# Custom styling
customCSS: 'blog-special.css'
theme: 'dark-only'

# Feature flags
experimentalFeatures: true
```

### Series Management

```yaml
# Part of a series
series: 'SvelteKit Deep Dive'
seriesOrder: 3
previousPost: '/blog/sveltekit-routing'
nextPost: '/blog/sveltekit-stores'
```

---

**Related**: [Writing Blogs →](writing-blogs.md) | [Creating Projects →](creating-projects.md)
