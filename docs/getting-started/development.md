# Development Workflow

Master the daily development practices for working with your SvelteKit portfolio. This guide covers everything from starting your development server to advanced development techniques.

## 🚀 Daily Development Routine

### Starting Your Development Session

1. **Navigate to your project:**

   ```bash
   cd your-portfolio
   ```

2. **Start the development server:**

   ```bash
   bun dev
   # or npm run dev
   ```

3. **Open in browser:**

   - Visit `http://localhost:5173`
   - Bookmark this URL for quick access

4. **Open your code editor:**
   ```bash
   code .  # VS Code
   # or your preferred editor
   ```

### During Development

- **Hot reload** automatically refreshes changes
- **Check console** for any errors (F12 → Console)
- **Test on multiple devices** using DevTools device emulation
- **Save frequently** - auto-save is recommended

### Ending Your Session

```bash
# Stop development server
Ctrl+C (or Cmd+C on Mac)

# Commit your changes
git add .
git commit -m "Add new blog post about React hooks"
git push
```

## 📁 File Organization

### Understanding the Structure

```
your-portfolio/
├── src/
│   ├── content/           # Your blog posts and projects
│   │   ├── blogs/        # Blog markdown files
│   │   └── projects/     # Project markdown files
│   ├── lib/
│   │   ├── components/   # Reusable components
│   │   ├── data/        # Site configuration
│   │   ├── utils/       # Utility functions
│   │   └── stores/      # State management
│   ├── routes/          # SvelteKit pages/routes
│   ├── styles/          # Global stylesheets
│   └── app.html         # HTML template
├── static/              # Static assets (images, etc.)
├── docs/               # Documentation (you're reading this!)
└── Configuration files
```

### Where to Make Changes

| What you want to do  | File/Directory to edit                      |
| -------------------- | ------------------------------------------- |
| Add blog post        | `src/content/blogs/new-post.md`             |
| Add project          | `src/content/projects/new-project.md`       |
| Update personal info | `src/lib/data/personal.js`                  |
| Add images           | `static/images/` or `static/gallery/`       |
| Customize colors     | `src/styles/variables.css`                  |
| Modify navigation    | `src/lib/components/ui/FloatingDock.svelte` |
| Update site metadata | `src/app.html`                              |

## ✍️ Content Creation Workflow

### Creating a New Blog Post

1. **Create the file:**

   ```bash
   # Use kebab-case for filename
   touch src/content/blogs/my-new-post.md
   ```

2. **Add frontmatter:**

   ```markdown
   ---
   title: 'My New Blog Post'
   description: 'A brief description of what this post covers'
   date: '2025-06-15'
   published: true
   featured: false
   tags: ['web-dev', 'tutorial']
   ---
   ```

3. **Write your content:**

   ```markdown
   # Introduction

   This is where your blog post content goes...

   ## Key Points

   - Point 1
   - Point 2
   - Point 3
   ```

4. **Preview your changes:**
   - Save the file
   - Check `http://localhost:5173/blog`
   - View your new post

### Creating a New Project

1. **Create the project file:**

   ```bash
   touch src/content/projects/my-awesome-project.md
   ```

2. **Add comprehensive frontmatter:**

   ```markdown
   ---
   title: 'My Awesome Project'
   description: 'Brief description of the project'
   date: '2025-06-15'
   technologies: ['React', 'TypeScript', 'Node.js']
   github: 'https://github.com/yourusername/project'
   demo: 'https://your-project.vercel.app'
   featured: true
   published: true
   gallery:
     - src: '/gallery/project-home.png'
       alt: 'Project homepage'
       caption: 'Clean homepage design'
   ---
   ```

3. **Write project details:**

   ```markdown
   ## Overview

   Detailed description of your project...

   ## Features

   - Feature 1
   - Feature 2

   ## Technical Implementation

   How you built it...
   ```

### Adding Images

1. **Organize images in static directory:**

   ```bash
   static/
   ├── images/
   │   ├── profile.jpg        # Your profile photo
   │   └── blog-hero.png     # Blog feature images
   ├── gallery/
   │   ├── project1-home.png  # Project screenshots
   │   └── project1-detail.png
   └── icons/
       └── favicon.png
   ```

2. **Reference in markdown:**

   ```markdown
   <!-- Basic image -->

   ![Project Screenshot](/gallery/project1-home.png)

   <!-- Enhanced image component -->

   <Image 
     src="/gallery/project1-home.png"
     alt="Project homepage interface"
     caption="Clean, modern homepage design"
     clickToExpand={true}
   />
   ```

## 🛠️ Development Commands

### Essential Commands

```bash
# Start development server
bun dev

# Build for production
bun run build

# Preview production build
bun run preview

# Type checking
bun run check

# Format code
bun run format

# Lint code
bun run lint
```

### Package Management

```bash
# Install dependencies
bun install

# Add new dependency
bun add package-name

# Add dev dependency
bun add -d package-name

# Update dependencies
bun update

# Remove dependency
bun remove package-name
```

### Git Workflow

```bash
# Check status
git status

# Add changes
git add .
# or add specific files
git add src/content/blogs/new-post.md

# Commit changes
git commit -m "Add blog post about SvelteKit performance"

# Push to repository
git push origin main

# Create new branch for feature
git checkout -b new-feature
```

## 🧪 Testing Your Changes

### Local Testing Checklist

Before publishing new content:

- **[ ]** Content displays correctly on homepage
- **[ ]** Individual page loads without errors
- **[ ]** Images load and display properly
- **[ ]** Links work correctly
- **[ ]** Mobile layout looks good
- **[ ]** Dark/light theme both work
- **[ ]** Search finds your content
- **[ ]** No console errors

### Manual Testing Process

1. **Test homepage:**

   - Visit `http://localhost:5173`
   - Check featured content appears
   - Verify navigation works

2. **Test content pages:**

   - Visit `/blog` and `/projects`
   - Click through to individual posts/projects
   - Test all interactive features

3. **Test responsive design:**

   - Open DevTools (F12)
   - Toggle device emulation
   - Test mobile, tablet, desktop sizes

4. **Test theme switching:**
   - Click theme toggle in navigation
   - Verify all themes work properly
   - Check components look good in both modes

## 🎨 Customization Workflow

### Updating Personal Information

1. **Edit personal data:**

   ```javascript
   // src/lib/data/personal.js
   export const personalInfo = {
   	name: 'Your Name',
   	title: 'Your Professional Title',
   	email: 'your.email@domain.com'
   	// ... update with your information
   };
   ```

2. **Update social links:**
   ```javascript
   social: {
     github: "https://github.com/yourusername",
     linkedin: "https://linkedin.com/in/yourusername",
     twitter: "https://twitter.com/yourusername",
   }
   ```

### Customizing Colors and Theme

1. **Edit CSS variables:**

   ```css
   /* src/styles/variables.css */
   :root {
   	/* Primary brand colors */
   	--primary-500: 249, 115, 22; /* Your brand color */
   	--primary-600: 234, 88, 12;

   	/* Update these RGB values */
   }
   ```

2. **Test your changes:**
   - Changes apply immediately in development
   - Test both light and dark modes
   - Verify accessibility contrast

### Adding Custom Components

1. **Create component file:**

   ```bash
   touch src/lib/components/ui/MyComponent.svelte
   ```

2. **Build your component:**

   ```svelte
   <script lang="ts">
   	interface Props {
   		title: string;
   		description?: string;
   	}

   	let { title, description }: Props = $props();
   </script>

   <div class="my-component">
   	<h3>{title}</h3>
   	{#if description}
   		<p>{description}</p>
   	{/if}
   </div>

   <style>
   	.my-component {
   		background: var(--glass-bg);
   		padding: var(--space-4);
   		border-radius: var(--radius-lg);
   	}
   </style>
   ```

3. **Export for use:**
   ```javascript
   // src/lib/components/ui/index.ts
   export { default as MyComponent } from './MyComponent.svelte';
   ```

## 🔍 Debugging Workflow

### When Something Breaks

1. **Check the console:**

   - Open DevTools (F12)
   - Look for red error messages
   - Read error messages carefully

2. **Check recent changes:**

   ```bash
   git diff  # See what changed
   git log --oneline -5  # Recent commits
   ```

3. **Test with minimal content:**

   - Create simple blog post
   - Remove complex features temporarily
   - Identify what's causing the issue

4. **Restart development server:**
   ```bash
   # Stop server (Ctrl+C)
   bun dev  # Restart
   ```

### Common Debugging Scenarios

**Content not appearing:**

- Check `published: true` in frontmatter
- Verify file is in correct directory
- Check frontmatter syntax

**Images not loading:**

- Verify image path starts with `/`
- Check file exists in `static/` folder
- Ensure filename matches exactly

**Styles not working:**

- Check CSS variable definitions
- Verify class names are correct
- Check for conflicting styles

## 📊 Performance Monitoring

### Development Performance

Monitor your site's performance during development:

1. **Lighthouse audit:**

   - Open DevTools
   - Go to Lighthouse tab
   - Run audit for Performance, Accessibility, SEO

2. **Bundle analysis:**

   ```bash
   bun run build:analyze
   # Check for large dependencies
   ```

3. **Development metrics:**
   - Page load times
   - Time to interactive
   - Image optimization

### Performance Best Practices

- **Optimize images** before adding to `static/`
- **Use lazy loading** for images below the fold
- **Keep bundle size small** by avoiding unnecessary dependencies
- **Test on slow connections** using DevTools throttling

## 🚀 Deployment Workflow

### Pre-deployment Checklist

- **[ ]** All content is published and tested
- **[ ]** Images are optimized and loading correctly
- **[ ]** No console errors on any page
- **[ ]** Site works on mobile devices
- **[ ]** Meta tags and SEO are updated
- **[ ]** Contact information is current

### Production Build

```bash
# Create production build
bun run build

# Test production build locally
bun run preview
# Visit http://localhost:4173
```

### Deployment Commands

**Vercel:**

```bash
vercel --prod
```

**Netlify:**

```bash
netlify deploy --prod
```

**Static hosting:**

```bash
# Build and upload 'build' folder
bun run build
# Upload contents of 'build/' to your hosting provider
```

## 💡 Development Tips

### Productivity Tips

1. **Use auto-save** in your editor
2. **Keep DevTools open** to catch errors quickly
3. **Test frequently** rather than making many changes at once
4. **Use consistent naming** for files and folders
5. **Comment your code** when doing complex customizations

### Code Organization

- **Group related files** together
- **Use descriptive filenames**
- **Follow existing patterns** in the codebase
- **Keep components small** and focused
- **Extract reusable logic** into utility functions

### Version Control Best Practices

```bash
# Make frequent, small commits
git add src/content/blogs/new-post.md
git commit -m "Add blog post about TypeScript tips"

# Use descriptive commit messages
git commit -m "Fix mobile navigation styling issue"

# Create branches for major changes
git checkout -b redesign-homepage
```

## 🎯 Next Steps

Ready to dive deeper into development?

- **[Creating Projects](../content-creation/creating-projects.md)** - Detailed project creation
- **[Component Usage](../components/component-usage-guide.md)** - Advanced component techniques
- **[Troubleshooting](../troubleshooting/README.md)** - Solve common development issues
- **[Deployment Guide](deployment.md)** - Get your portfolio live

**Want to contribute to the project?** Check out the component source code and follow the patterns you see for creating your own customizations!
