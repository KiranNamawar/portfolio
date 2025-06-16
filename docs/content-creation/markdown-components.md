# Markdown Components

Enhance your blog posts and project pages with powerful custom components. This guide covers all available components and how to use them effectively.

## 🎯 Available Components

### Core Components

These components are available in all markdown files:

#### `<Callout>`

Highlight important information with styled callouts.

```markdown
<Callout type="info">
This is an info callout with useful information.
</Callout>

<Callout type="warning">
This is a warning callout for important notes.
</Callout>

<Callout type="error">
This is an error callout for critical information.
</Callout>

<Callout type="success">
This is a success callout for positive feedback.
</Callout>
```

**Props:**

- `type`: `"info" | "warning" | "error" | "success"`
- `title`: Optional title for the callout

#### `<CodeBlock>`

Enhanced code blocks with syntax highlighting and copy functionality.

```markdown
<CodeBlock language="javascript" title="example.js">
const greeting = "Hello, World!";
console.log(greeting);
</CodeBlock>
```

**Props:**

- `language`: Programming language for syntax highlighting
- `title`: Optional filename or title
- `lineNumbers`: Show line numbers (default: true)
- `copy`: Enable copy button (default: true)

#### `<Image>`

Responsive images with lazy loading and captions.

```markdown
<Image 
  src="/gallery/project-screenshot.jpg" 
  alt="Project screenshot showing the dashboard"
  caption="Dashboard view with analytics"
  width={800}
  height={600}
/>
```

**Props:**

- `src`: Image source URL
- `alt`: Alt text for accessibility
- `caption`: Optional image caption
- `width`: Image width
- `height`: Image height
- `lazy`: Enable lazy loading (default: true)

#### `<VideoEmbed>`

Embed videos from YouTube, Vimeo, or other platforms.

```markdown
<VideoEmbed 
  src="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  title="Video Title"
  aspectRatio="16:9"
/>
```

**Props:**

- `src`: Video URL
- `title`: Video title
- `aspectRatio`: Aspect ratio (default: "16:9")

### Layout Components

#### `<Grid>`

Create responsive grid layouts.

```markdown
<Grid cols="2" gap="md">
  <div>Grid item 1</div>
  <div>Grid item 2</div>
</Grid>
```

**Props:**

- `cols`: Number of columns (1-4)
- `gap`: Gap size ("sm" | "md" | "lg")
- `responsive`: Enable responsive behavior (default: true)

#### `<Flex>`

Flexible layouts with flexbox.

```markdown
<Flex direction="row" justify="space-between" align="center">
  <div>Left item</div>
  <div>Right item</div>
</Flex>
```

**Props:**

- `direction`: "row" | "column"
- `justify`: "start" | "center" | "end" | "space-between" | "space-around"
- `align`: "start" | "center" | "end" | "stretch"
- `gap`: Gap size ("sm" | "md" | "lg")

### Interactive Components

#### `<Tabs>`

Organize content in tabbed interface.

```markdown
<Tabs>
  <Tab title="Overview">
    Content for overview tab
  </Tab>
  <Tab title="Technical Details">
    Content for technical details tab
  </Tab>
  <Tab title="Results">
    Content for results tab
  </Tab>
</Tabs>
```

#### `<Accordion>`

Collapsible content sections.

```markdown
<Accordion>
  <AccordionItem title="What technologies were used?">
    This project used React, Node.js, and MongoDB for the tech stack.
  </AccordionItem>
  <AccordionItem title="How long did it take to build?">
    The project took approximately 3 months to complete.
  </AccordionItem>
</Accordion>
```

### Data Visualization

#### `<ProgressBar>`

Show progress or skill levels.

```markdown
<ProgressBar label="JavaScript" value={90} />
<ProgressBar label="React" value={85} />
<ProgressBar label="Node.js" value={80} />
```

**Props:**

- `label`: Progress bar label
- `value`: Progress value (0-100)
- `color`: Custom color
- `showValue`: Show percentage value (default: true)

#### `<Timeline>`

Display chronological information.

```markdown
<Timeline>
  <TimelineItem date="2024-01" title="Project Started">
    Initial project setup and planning phase.
  </TimelineItem>
  <TimelineItem date="2024-03" title="MVP Completed">
    Minimum viable product with core features.
  </TimelineItem>
  <TimelineItem date="2024-06" title="Project Launched">
    Full project launch with all features.
  </TimelineItem>
</Timeline>
```

### Technology Badges

#### `<TechStack>`

Display technology badges for projects.

```markdown
<TechStack technologies={["React", "TypeScript", "Node.js", "MongoDB"]} />
```

#### `<Badge>`

Individual technology or status badges.

```markdown
<Badge type="tech">React</Badge>
<Badge type="status" color="green">Completed</Badge>
<Badge type="difficulty" color="orange">Intermediate</Badge>
```

**Props:**

- `type`: "tech" | "status" | "difficulty" | "category"
- `color`: Badge color
- `variant`: "filled" | "outlined"

## 🎨 Styling Components

### `<GlassCard>`

Apply glassmorphism effects to content.

```markdown
<GlassCard>
  <h3>Card Title</h3>
  <p>Content with glass effect background.</p>
</GlassCard>
```

### `<Highlight>`

Highlight text with background color.

```markdown
<Highlight color="yellow">This text is highlighted</Highlight>
<Highlight color="blue">This text has blue highlight</Highlight>
```

## 📊 Blog-Specific Components

### `<BlogMeta>`

Display blog post metadata.

```markdown
<BlogMeta
readingTime="5 min read"
publishDate="2024-06-16"
tags={["React", "Tutorial", "JavaScript"]}
/>
```

### `<AuthorCard>`

Author information card.

```markdown
<AuthorCard
name="Your Name"
bio="Full Stack Developer with passion for modern web technologies"
avatar="/profile.jpg"
social={{
    github: "https://github.com/username",
    twitter: "https://twitter.com/username"
  }}
/>
```

### `<RelatedPosts>`

Show related blog posts.

```markdown
<RelatedPosts
posts={[
{ title: "Related Post 1", slug: "related-post-1" },
{ title: "Related Post 2", slug: "related-post-2" }
]}
/>
```

## 🚀 Project-Specific Components

### `<ProjectGallery>`

Image gallery for project showcases.

```markdown
<ProjectGallery
images={[
{ src: "/gallery/project-1.jpg", alt: "Project screenshot 1" },
{ src: "/gallery/project-2.jpg", alt: "Project screenshot 2" },
{ src: "/gallery/project-3.jpg", alt: "Project screenshot 3" }
]}
/>
```

### `<ProjectLinks>`

Project link buttons.

```markdown
<ProjectLinks 
  githubUrl="https://github.com/username/project"
  liveUrl="https://project-demo.com"
  documentationUrl="https://docs.project.com"
/>
```

### `<ProjectStats>`

Display project statistics.

```markdown
<ProjectStats
stats={[
{ label: "Lines of Code", value: "10,000+" },
{ label: "Components", value: "25" },
{ label: "Tests", value: "150+" },
{ label: "Performance Score", value: "95/100" }
]}
/>
```

## 🔧 Advanced Usage

### Custom Styling

Components accept CSS custom properties for styling:

```markdown
<GlassCard style="--glass-bg: rgba(255, 255, 255, 0.1); --glass-border: 1px solid rgba(255, 255, 255, 0.2);">
  Custom styled glass card
</GlassCard>
```

### Responsive Behavior

Most components are responsive by default:

```markdown
<Grid cols="1" sm="2" lg="3">
  <div>Responsive grid item</div>
  <div>Responsive grid item</div>
  <div>Responsive grid item</div>
</Grid>
```

### Combining Components

Components can be nested and combined:

```markdown
<GlassCard>
  <Tabs>
    <Tab title="Code">
      <CodeBlock language="javascript">
        console.log("Hello, World!");
      </CodeBlock>
    </Tab>
    <Tab title="Result">
      <Callout type="success">
        Code executed successfully!
      </Callout>
    </Tab>
  </Tabs>
</GlassCard>
```

## 📝 Best Practices

### Performance

1. **Lazy Loading**: Large components are lazy-loaded
2. **Image Optimization**: Use `<Image>` component for optimized images
3. **Code Splitting**: Components are code-split automatically

### Accessibility

1. **Alt Text**: Always provide alt text for images
2. **Semantic HTML**: Components use proper semantic elements
3. **Keyboard Navigation**: Interactive components are keyboard accessible
4. **Screen Reader Support**: Components include proper ARIA attributes

### SEO

1. **Structured Data**: Components generate appropriate structured data
2. **Meta Tags**: Image components contribute to Open Graph tags
3. **Performance**: Fast-loading components improve SEO scores

### Content Strategy

1. **Progressive Enhancement**: Content works without JavaScript
2. **Mobile First**: Design for mobile, enhance for desktop
3. **Consistent Styling**: Use component system for visual consistency

## 🛠️ Creating Custom Components

### Component Structure

Create new components in `src/lib/components/markdown/`:

```svelte
<!-- CustomComponent.svelte -->
<script lang="ts">
	export let title: string;
	export let content: string;
	export let variant: 'primary' | 'secondary' = 'primary';
</script>

<div class="custom-component {variant}">
	<h3>{title}</h3>
	<div class="content">
		{@html content}
	</div>
</div>

<style>
	.custom-component {
		/* Component styles */
	}
</style>
```

### Register Component

Add to MDSvex configuration:

```javascript
// mdsvex.config.js
import CustomComponent from './src/lib/components/markdown/CustomComponent.svelte';

export default {
	// ... other config
	layout: {
		_: './src/lib/components/layouts/BlogLayout.svelte'
	},
	// Make component available globally
	globals: {
		CustomComponent
	}
};
```

---

**Related Documentation:**

- [Writing Blogs](writing-blogs.md) - Complete blog writing guide
- [Creating Projects](creating-projects.md) - Project page creation
- [Glass Effect System](../components/glass-effect-system.md) - Styling system
