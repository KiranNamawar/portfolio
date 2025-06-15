# Creating Project Pages

Learn how to create compelling project showcases that highlight your work with detailed case studies, galleries, and timelines.

## 🎯 Quick Start

Creating a new project page takes just a few minutes:

1. **Create the markdown file** in `src/content/projects/`
2. **Add required frontmatter** with project details
3. **Write your project description** in markdown
4. **Add optional features** like galleries and timelines
5. **Test and publish** your project

## 📁 Project File Structure

Projects are stored in `src/content/projects/` as markdown files:

```
src/content/projects/
├── my-awesome-app.md          # Your project file
├── ecommerce-platform.md      # Example project
├── weather-dashboard.md       # Example project
└── task-management-app.md     # Example project
```

### File Naming Best Practices

- Use **lowercase** with **hyphens** for spaces
- Keep names **descriptive** but **concise**
- Avoid special characters and spaces

**Good examples:**

- `my-portfolio-website.md`
- `task-management-app.md`
- `ecommerce-platform.md`

**Avoid:**

- `My Project.md`
- `project_1.md`
- `awesome-project-with-very-long-name-that-goes-on-forever.md`

## ⚙️ Required Frontmatter

Every project needs this basic frontmatter:

```markdown
---
title: 'Your Project Name'
description: 'Brief description of what your project does'
date: '2025-06-15'
published: true
---
```

### Required Fields Explained

- **`title`**: The name of your project (appears in headlines)
- **`description`**: Brief summary (used for SEO and project cards)
- **`date`**: Project completion or last update date (YYYY-MM-DD format)
- **`published`**: Set to `true` to make the project visible

## 🚀 Complete Project Template

Here's a complete project template with all available options:

```markdown
---
title: 'My Awesome Project'
description: 'A modern web application built with cutting-edge technologies'
date: '2025-06-15'
image: '/project-placeholder.svg'
technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS']
github: 'https://github.com/yourusername/project'
demo: 'https://your-project.vercel.app'
featured: true
published: true
layout: project
timeline:
  - id: 'planning'
    title: 'Project Planning'
    description: 'Initial planning and architecture design'
    date: '2025-05-01'
    status: 'completed'
    category: 'planning'
    details:
      - 'Requirements gathering'
      - 'Technology selection'
      - 'UI/UX design'
    achievements:
      - 'Project scope defined'
      - 'Tech stack selected'
  - id: 'development'
    title: 'Development Phase'
    description: 'Core application development'
    date: '2025-05-15'
    status: 'completed'
    category: 'development'
    details:
      - 'Frontend development'
      - 'Backend API creation'
      - 'Database design'
    achievements:
      - 'MVP completed'
      - 'Core features implemented'
gallery:
  - src: '/gallery/project-home.svg'
    alt: 'Project homepage screenshot'
    caption: 'Clean, modern homepage design'
  - src: '/gallery/project-dashboard.svg'
    alt: 'Dashboard interface'
    caption: 'User-friendly dashboard with analytics'
---

Your project description starts here...

## Features

- Feature 1
- Feature 2
- Feature 3

## Technical Implementation

Describe how you built the project...
```

## 📋 Frontmatter Field Reference

### Basic Information

| Field         | Type    | Required | Description       |
| ------------- | ------- | -------- | ----------------- |
| `title`       | String  | ✅ Yes   | Project name      |
| `description` | String  | ✅ Yes   | Brief summary     |
| `date`        | String  | ✅ Yes   | Date (YYYY-MM-DD) |
| `published`   | Boolean | ✅ Yes   | Visibility status |

### Project Details

| Field          | Type    | Required | Description           |
| -------------- | ------- | -------- | --------------------- |
| `image`        | String  | ❌ No    | Featured image path   |
| `technologies` | Array   | ❌ No    | Tech stack list       |
| `github`       | String  | ❌ No    | GitHub repository URL |
| `demo`         | String  | ❌ No    | Live demo URL         |
| `featured`     | Boolean | ❌ No    | Show on homepage      |
| `layout`       | String  | ❌ No    | Always use 'project'  |

### Advanced Features

| Field      | Type  | Required | Description        |
| ---------- | ----- | -------- | ------------------ |
| `timeline` | Array | ❌ No    | Project milestones |
| `gallery`  | Array | ❌ No    | Image gallery      |
| `tags`     | Array | ❌ No    | Project categories |

## 🖼️ Adding Project Images

### Featured Image

Add a featured image that represents your project:

```markdown
---
image: '/project-hero.png'
---
```

**Image Guidelines:**

- **Size**: 1200x630px (optimal for social sharing)
- **Format**: PNG, JPG, or WebP
- **Location**: Place in `static/` folder
- **Naming**: Use descriptive names

### Project Gallery

Showcase multiple screenshots with a gallery:

```markdown
---
gallery:
  - src: '/gallery/project-home.png'
    alt: 'Homepage showing main features'
    caption: 'Clean homepage with call-to-action'
  - src: '/gallery/project-dashboard.png'
    alt: 'User dashboard interface'
    caption: 'Intuitive dashboard with real-time data'
  - src: '/gallery/project-mobile.png'
    alt: 'Mobile responsive design'
    caption: 'Fully responsive mobile experience'
---
```

**Gallery Best Practices:**

- Use **consistent image sizes** when possible
- Add **descriptive alt text** for accessibility
- Include **helpful captions** that explain the image
- Organize images in **logical order** (home → features → details)

## 📊 Project Timeline

Show your development process with an interactive timeline:

```markdown
---
timeline:
  - id: 'research'
    title: 'Research & Planning'
    description: 'Market research and project planning phase'
    date: '2025-04-01'
    status: 'completed'
    category: 'planning'
    details:
      - 'Competitive analysis'
      - 'User research surveys'
      - 'Technical feasibility study'
    achievements:
      - 'Market opportunity identified'
      - 'User personas created'
      - 'Technical architecture planned'
  - id: 'design'
    title: 'UI/UX Design'
    description: 'User interface and experience design'
    date: '2025-04-15'
    status: 'completed'
    category: 'design'
    details:
      - 'Wireframe creation'
      - 'Visual design system'
      - 'Prototype development'
    achievements:
      - 'Design system established'
      - 'Interactive prototype completed'
  - id: 'development'
    title: 'Development'
    description: 'Core application development and testing'
    date: '2025-05-01'
    status: 'completed'
    category: 'development'
    details:
      - 'Frontend development'
      - 'Backend API creation'
      - 'Database implementation'
      - 'Testing and debugging'
    achievements:
      - 'MVP completed'
      - 'All core features implemented'
      - '95% test coverage achieved'
  - id: 'deployment'
    title: 'Deployment & Launch'
    description: 'Production deployment and project launch'
    date: '2025-05-20'
    status: 'completed'
    category: 'deployment'
    details:
      - 'Production environment setup'
      - 'Performance optimization'
      - 'Security configuration'
      - 'Launch preparation'
    achievements:
      - 'Successfully deployed to production'
      - 'Performance metrics: 95+ Lighthouse score'
      - 'Security audit passed'
---
```

### Timeline Categories

Use these categories for consistent styling:

- **`planning`** - Project planning, research, requirements
- **`design`** - UI/UX design, wireframes, prototypes
- **`development`** - Coding, implementation, testing
- **`testing`** - QA, debugging, optimization
- **`deployment`** - Production deployment, launch

### Timeline Status Options

- **`completed`** - ✅ Finished milestones
- **`in-progress`** - 🔄 Currently working on
- **`planned`** - 📅 Future milestones

## 🛠️ Technology Stack

List the technologies you used:

```markdown
---
technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS', 'Vercel']
---
```

**Technology Categories:**

- **Frontend**: React, Vue, Svelte, HTML, CSS, JavaScript
- **Backend**: Node.js, Python, PHP, Java, .NET
- **Database**: PostgreSQL, MongoDB, MySQL, Firebase
- **Cloud**: AWS, Vercel, Netlify, Heroku
- **Tools**: Git, Docker, Webpack, Vite

## 📝 Writing Great Project Content

### Project Structure Template

Follow this structure for compelling project descriptions:

```markdown
# Brief project introduction (1-2 sentences)

A modern e-commerce platform that provides seamless shopping experiences with advanced features like real-time inventory management and AI-powered recommendations.

## Overview

More detailed description of what the project does, who it's for, and why it matters.

## Key Features

- **Feature 1**: Description of what it does and why it's valuable
- **Feature 2**: Description with benefits
- **Feature 3**: Include user benefits

## Technical Implementation

### Architecture Overview

Describe your technical approach, architecture decisions, and implementation details.

### Key Technologies

- **Frontend**: React with TypeScript for type safety
- **Backend**: Node.js with Express for API development
- **Database**: PostgreSQL for reliable data storage
- **Deployment**: Vercel for seamless CI/CD

### Challenges & Solutions

#### Challenge 1: Performance Optimization

**Problem**: Initial page load times were too slow for good UX.

**Solution**: Implemented lazy loading, code splitting, and CDN optimization.

**Result**: Reduced load time from 3.2s to 1.1s (65% improvement).

## Lessons Learned

- What you learned during the project
- What you would do differently
- Key takeaways for future projects

## Future Enhancements

- Planned features or improvements
- Ideas for scaling or expanding
- Lessons that will inform future work
```

### Writing Tips

**Do:**

- ✅ Start with a clear, compelling overview
- ✅ Focus on problems you solved
- ✅ Include specific metrics and results
- ✅ Explain your technical decisions
- ✅ Show the impact of your work

**Don't:**

- ❌ Just list features without context
- ❌ Use overly technical jargon
- ❌ Forget to explain why the project matters
- ❌ Ignore the user/business value
- ❌ Make it all about the technology

## 🎨 Using Components in Projects

You can use special components within project markdown:

### Callouts

```markdown
<Callout type="info">
💡 **Pro Tip**: Always start with user research before jumping into development.
</Callout>

<Callout type="warning">
⚠️ **Challenge**: Real-time features can be complex to implement correctly.
</Callout>

<Callout type="success">
✅ **Result**: Achieved 99.9% uptime with proper error handling.
</Callout>
```

### Enhanced Images

```markdown
<Image 
  src="/gallery/architecture-diagram.png"
  alt="System architecture diagram"
  caption="High-level system architecture showing microservices"
  fit="contain"
  clickToExpand={true}
  aspectRatio="16/9"
/>
```

## 📈 SEO Optimization for Projects

### SEO-Friendly Frontmatter

```markdown
---
title: 'E-commerce Platform - Full Stack Development'
description: 'Modern e-commerce solution built with React, Node.js, and PostgreSQL. Features real-time inventory, payment processing, and admin dashboard.'
technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS']
---
```

### SEO Best Practices

- **Descriptive titles** that include key technologies
- **Detailed descriptions** with relevant keywords
- **Proper heading structure** (H1, H2, H3)
- **Alt text for all images**
- **Internal links** to related projects or blog posts

## 🚀 Publishing Your Project

### Before Publishing

1. **Review your content** for clarity and completeness
2. **Check all links** (GitHub, demo, images)
3. **Test locally** with `bun dev`
4. **Verify images display** correctly
5. **Check timeline renders** properly (if used)

### Publishing Checklist

- [ ] Frontmatter is complete and valid
- [ ] All required fields are filled
- [ ] Images are optimized and accessible
- [ ] Links work correctly
- [ ] Content is well-structured and engaging
- [ ] `published: true` is set
- [ ] Project appears in project list
- [ ] SEO metadata is optimized

### Making Projects Featured

To show a project on your homepage:

```markdown
---
featured: true
---
```

**Featured Project Guidelines:**

- Choose your **best 2-3 projects**
- Ensure they have **high-quality images**
- Include **compelling descriptions**
- Represent **diverse skills** and technologies

## 🔧 Troubleshooting

### Common Issues

**Project doesn't appear:**

- Check `published: true` in frontmatter
- Verify file is in `src/content/projects/`
- Check for frontmatter syntax errors

**Images not loading:**

- Verify image path starts with `/`
- Check image exists in `static/` folder
- Ensure image filename matches exactly

**Timeline not rendering:**

- Check timeline array syntax
- Verify all required timeline fields
- Check for missing commas in YAML

**GitHub/demo links not working:**

- Ensure URLs include `https://`
- Test links in browser
- Check for typos in URLs

### Getting Help

If you encounter issues:

1. Check the [troubleshooting guide](../troubleshooting/README.md)
2. Review [example projects](../../src/content/projects/) for reference
3. Validate your frontmatter syntax
4. Test with minimal content first

---

## 🎯 Next Steps

After creating your project:

1. **[Add project images](media-management.md)** - Optimize and organize your assets
2. **[Customize components](../components/README.md)** - Enhance your project pages
3. **[SEO optimization](../maintenance/seo-optimization.md)** - Improve search visibility
4. **[Create related blog posts](writing-blogs.md)** - Write about your development process

**Ready to create your first project?** Start with the [project template](#complete-project-template) above!
