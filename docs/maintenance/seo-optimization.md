# SEO Implementation Guide

This document outlines the comprehensive SEO implementation for the portfolio website at `keyrun.site`.

## Overview

The SEO system includes:

- **Meta Tags**: Dynamic generation of title, description, keywords, and social media tags
- **Structured Data**: JSON-LD markup for search engines
- **Open Graph**: Social media sharing optimization
- **Twitter Cards**: Twitter-specific sharing optimization
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine crawling instructions
- **Performance**: Optimized loading and technical SEO

## Key Components

### 1. SEO Utilities (`src/lib/utils/seo.ts`)

Central utilities for generating SEO data:

- `generateSEOTags()` - Creates all meta tags
- `generateStructuredData()` - Creates JSON-LD markup
- `generateBreadcrumbData()` - Creates breadcrumb markup
- `createPageTitle()` - Optimizes page titles
- `siteConfig` - Central site configuration

### 2. SEO Head Component (`src/lib/components/ui/SEOHead.svelte`)

Reusable component that handles all head elements:

```svelte
<SEOHead
	data={{
		title: 'Page Title',
		description: 'Page description',
		keywords: ['keyword1', 'keyword2'],
		type: 'website' | 'article' | 'profile',
		url: '/page-url',
		image: '/og-image.png'
	}}
	breadcrumbs={[
		{ name: 'Home', url: '/' },
		{ name: 'Page', url: '/page' }
	]}
/>
```

## Page-Specific SEO

### Home Page

- **Type**: Profile
- **Focus**: Personal branding and skills
- **Keywords**: Full stack developer, web developer, portfolio

### Blog Pages

- **Listing**: General blog description with keywords
- **Individual Posts**: Article type with publish dates, reading time, tags

### Project Pages

- **Listing**: Project showcase description
- **Individual Projects**: Article type with technology tags

## Technical SEO Features

### 1. Meta Tags

- Dynamic title generation
- Meta descriptions
- Keywords (when relevant)
- Author information
- Canonical URLs
- Theme colors

### 2. Open Graph

- og:title, og:description, og:image
- og:type (website, article, profile)
- Article metadata (publish time, tags)
- Site name and locale

### 3. Twitter Cards

- Large image cards
- Creator and site attribution
- Optimized for Twitter sharing

### 4. Structured Data (JSON-LD)

- **Website**: Main site markup with search action
- **Person**: Profile/about page markup
- **BlogPosting**: Individual blog posts
- **Breadcrumbs**: Navigation hierarchy

### 5. Sitemap (`/sitemap.xml`)

- Automatic generation from content
- Includes blog posts and projects
- Proper priority and change frequency
- Last modification dates

## Configuration

### Site Configuration

Update `src/lib/utils/seo.ts` with your information:

```typescript
export const siteConfig: SiteConfig = {
	name: "Your Name's Portfolio",
	url: 'https://yourdomain.com',
	description: 'Your description',
	author: {
		name: 'Your Name',
		email: 'your@email.com',
		url: 'https://yourdomain.com',
		twitter: '@yourhandle',
		github: 'https://github.com/yourusername',
		linkedin: 'https://linkedin.com/in/yourusername'
	}
	// ... other config
};
```

### Personal Information

Update `src/lib/data/personal.js` with your details.

## Performance Optimizations

### 1. Preconnect/DNS Prefetch

```html
<link rel="preconnect" href="//fonts.googleapis.com" />
<link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
```

### 2. Optimized Images

- WebP format when possible
- Proper alt attributes
- Lazy loading implemented

### 3. Critical CSS

- Inline critical styles
- Defer non-critical CSS

## Monitoring & Analytics

### Recommended Tools

1. **Google Search Console** - Monitor search performance
2. **Google Analytics** - Track user behavior
3. **PageSpeed Insights** - Monitor performance
4. **Schema Markup Validator** - Test structured data

### Key Metrics to Track

- Organic search traffic
- Page load speeds
- Core Web Vitals
- Click-through rates
- Social media shares

## Content Guidelines

### Blog Posts

Include in frontmatter:

```yaml
---
title: 'Descriptive Title'
description: 'SEO-optimized description'
date: 2024-01-15
tags: ['relevant', 'tags']
published: true
featured: true
image: '/blog-image.jpg'
---
```

### Projects

Include in frontmatter:

```yaml
---
title: 'Project Name'
description: 'Project description'
date: 2024-01-15
tech: ['React', 'TypeScript', 'Node.js']
featured: true
image: '/project-image.jpg'
demo: 'https://demo.com'
github: 'https://github.com/user/repo'
---
```

## Validation Checklist

- [ ] All pages have unique titles and descriptions
- [ ] Open Graph tags are present and correct
- [ ] Structured data validates (use Google's Rich Results Test)
- [ ] Sitemap is accessible and valid
- [ ] Robots.txt is properly configured
- [ ] Images have proper alt attributes
- [ ] Internal linking is optimized
- [ ] Core Web Vitals pass

## Future Enhancements

1. **Dynamic OG Images**: Generate custom social media images
2. **RSS Feed**: Add blog RSS feed
3. **AMP**: Consider AMP for blog posts
4. **Multilingual**: Add language-specific SEO
5. **Local SEO**: Add local business markup if applicable

## Deployment Considerations

### Environment Variables

Consider adding:

```env
PUBLIC_SITE_URL=https://keyrun.site
PUBLIC_ANALYTICS_ID=your-analytics-id
```

### Build-Time Optimizations

- Generate sitemap during build
- Optimize images during build
- Inline critical CSS

This implementation provides a solid foundation for SEO while remaining maintainable and extensible.
