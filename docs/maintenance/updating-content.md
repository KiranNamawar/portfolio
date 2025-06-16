# Updating Content

Keep your portfolio fresh and engaging with regular content updates. This guide covers strategies for maintaining and expanding your content over time.

## 📝 Content Update Workflow

### Regular Update Schedule

**Weekly Tasks:**

- [ ] Review and update project statuses
- [ ] Check for broken links
- [ ] Update skills proficiency levels
- [ ] Respond to contact form submissions

**Monthly Tasks:**

- [ ] Add new blog posts (aim for 1-2 per month)
- [ ] Update project galleries with new screenshots
- [ ] Review and optimize SEO performance
- [ ] Update social media links and profiles

**Quarterly Tasks:**

- [ ] Major content audit and reorganization
- [ ] Update personal information and bio
- [ ] Add new projects to portfolio
- [ ] Review and update technology stack

**Annual Tasks:**

- [ ] Complete design refresh
- [ ] Major feature additions
- [ ] Performance optimization review
- [ ] Analytics and goal assessment

### Content Planning

#### Editorial Calendar

Create a content calendar to plan your updates:

```markdown
## June 2024

### Week 1

- [ ] Blog: "Building a SvelteKit Portfolio"
- [ ] Update: Project gallery for E-commerce Platform
- [ ] Fix: Mobile navigation bug

### Week 2

- [ ] Blog: "TypeScript Best Practices"
- [ ] Add: New skill assessments
- [ ] Update: About page with recent achievements

### Week 3

- [ ] Project: Add Weather Dashboard project
- [ ] Update: Homepage hero section
- [ ] SEO: Optimize meta descriptions

### Week 4

- [ ] Blog: "Performance Optimization Tips"
- [ ] Update: Contact information
- [ ] Review: Monthly analytics report
```

## 📊 Blog Content Updates

### Adding New Blog Posts

1. **Create the file:**

   ```bash
   # Navigate to blog directory
   cd src/content/blogs

   # Create new blog post
   touch my-new-blog-post.md
   ```

2. **Add frontmatter:**

   ```yaml
   ---
   title: 'My New Blog Post'
   description: 'A comprehensive guide to...'
   date: '2024-06-16'
   published: true
   featured: false
   tags: ['tutorial', 'javascript', 'webdev']
   ---
   ```

3. **Write content:**

   ```markdown
   # Introduction

   Start with an engaging introduction...

   ## Main Content

   Use headings to structure your content...
   ```

4. **Test locally:**
   ```bash
   bun dev
   # Visit http://localhost:5173/blog/my-new-blog-post
   ```

### Updating Existing Posts

#### Content Updates

- **Keep information current**: Update outdated information
- **Add new sections**: Expand on topics with new insights
- **Improve readability**: Break up long paragraphs, add lists
- **Update code examples**: Keep code samples current

#### SEO Updates

- **Meta descriptions**: Keep them compelling and under 160 characters
- **Tags**: Add relevant tags for better categorization
- **Internal links**: Link to related posts and projects
- **Images**: Add alt text and optimize file sizes

### Blog Maintenance Tasks

#### Weekly

```bash
# Check for broken links in blog posts
npm install -g markdown-link-check
find src/content/blogs -name "*.md" -exec markdown-link-check {} \;
```

#### Monthly

1. **Performance audit:**

   ```bash
   # Analyze blog page performance
   lighthouse http://localhost:5173/blog --output html --output-path blog-audit.html
   ```

2. **Content audit:**

   - Review post performance in analytics
   - Identify top-performing content
   - Plan similar content based on successful posts

3. **SEO review:**
   - Check search rankings for target keywords
   - Update meta descriptions based on performance
   - Optimize images and loading times

## 🚀 Project Updates

### Adding New Projects

1. **Create project file:**

   ```bash
   cd src/content/projects
   touch amazing-new-project.md
   ```

2. **Complete frontmatter:**

   ```yaml
   ---
   title: 'Amazing New Project'
   description: 'A groundbreaking application that...'
   date: '2024-06-16'
   published: true
   featured: true
   technologies: ['React', 'Node.js', 'PostgreSQL']
   githubUrl: 'https://github.com/username/amazing-project'
   liveUrl: 'https://amazing-project.com'
   status: 'completed'
   timeline: { start: '2024-01-01', end: '2024-06-01' }
   ---
   ```

3. **Add project gallery images:**

   ```bash
   # Add images to static/gallery/
   cp project-screenshots/* static/gallery/amazing-new-project/
   ```

4. **Write project case study:**

   ```markdown
   ## Overview

   Brief description of what the project does...

   ## Technologies Used

   <TechStack technologies={["React", "Node.js", "PostgreSQL"]} />

   ## Key Features

   - Feature 1: Description
   - Feature 2: Description

   ## Challenges and Solutions

   Describe technical challenges...

   ## Results and Impact

   Quantify the project's success...
   ```

### Updating Project Status

#### In-Progress Projects

```yaml
---
# ... other frontmatter
status: 'in-progress'
completionPercentage: 75
currentPhase: 'testing'
nextMilestone: 'deployment'
---
```

#### Completed Projects

```yaml
---
# ... other frontmatter
status: 'completed'
completionDate: '2024-06-16'
results:
  {
    metrics: ['10,000+ users', '99.9% uptime', '4.8/5 rating'],
    achievements: ['Featured on Product Hunt', 'TechCrunch mention']
  }
---
```

### Project Gallery Management

#### Image Organization

```
static/gallery/
├── project-name/
│   ├── hero.jpg              # Main project image
│   ├── screenshot-1.jpg      # Feature screenshots
│   ├── screenshot-2.jpg
│   ├── mobile-view.jpg       # Responsive views
│   ├── desktop-view.jpg
│   └── architecture.png      # Technical diagrams
```

#### Image Optimization

```bash
# Batch optimize project images
cd static/gallery/project-name/
mogrify -strip -interlace Plane -quality 85% *.jpg
mogrify -resize 1200x800> *.jpg
```

## 👤 Personal Information Updates

### Profile Information

Update `src/lib/data/personal.js`:

```javascript
export const personal = {
	// Basic info
	name: 'Your Name',
	title: 'Senior Full Stack Developer', // Update as you advance
	bio: 'Updated bio reflecting current role and interests...',

	// Contact
	email: 'new@email.com',
	location: 'New City, Country',

	// Professional
	experience: 4, // Update years of experience
	currentRole: 'Senior Developer at Tech Company',
	availability: 'Available for freelance projects',

	// Updated achievements
	achievements: [
		'Led development of 3 major projects',
		'Mentored 5 junior developers',
		'Spoke at 2 tech conferences'
	]
};
```

### Skills Assessment Updates

Update `src/lib/data/skills.json`:

```json
{
	"technical": [
		{
			"name": "JavaScript",
			"level": 95,
			"years": 4,
			"lastUpdated": "2024-06-16"
		},
		{
			"name": "React",
			"level": 90,
			"years": 3,
			"lastUpdated": "2024-06-16"
		},
		{
			"name": "New Technology",
			"level": 70,
			"years": 1,
			"lastUpdated": "2024-06-16"
		}
	]
}
```

### Work Experience Updates

```javascript
// src/lib/data/personal.js
export const workExperience = [
	{
		company: 'Current Company',
		position: 'Senior Full Stack Developer',
		duration: '2023 - Present',
		location: 'Remote',
		description: 'Leading development of...',
		achievements: [
			'Improved application performance by 40%',
			'Led team of 3 developers',
			'Implemented CI/CD pipeline'
		],
		technologies: ['React', 'Node.js', 'AWS']
	}
	// ... previous positions
];
```

## 🔗 Social Media and Contact Updates

### Social Links

Update social media links in `template.config.js`:

```javascript
export const templateConfig = {
	social: {
		github: 'https://github.com/new-username',
		linkedin: 'https://linkedin.com/in/updated-profile',
		twitter: 'https://twitter.com/new-handle',
		instagram: 'https://instagram.com/creative-handle',
		email: 'mailto:updated@email.com'
	}
};
```

### Contact Information

```javascript
// src/lib/data/personal.js
export const contact = {
	email: 'updated@email.com',
	phone: '+1 (555) 123-4567', // Optional
	location: 'New City, State',
	timezone: 'EST',
	availability: 'Available for new opportunities',
	preferredContact: 'email',
	responseTime: 'Within 24 hours'
};
```

## 📈 Analytics and Performance Updates

### Content Performance Review

```bash
# Install analytics tools
bun add @google-analytics/data

# Create analytics report script
node scripts/analytics-report.js
```

### SEO Performance

```bash
# Check SEO performance
lighthouse https://yoursite.com --output json --output-path seo-audit.json

# Extract SEO scores
node -e "console.log(JSON.parse(require('fs').readFileSync('seo-audit.json')).categories.seo.score * 100)"
```

### Update Tracking

Keep a changelog of major updates:

```markdown
# Changelog

## 2024-06-16

### Added

- New project: Weather Dashboard
- Blog post: TypeScript Best Practices
- Skill: Vue.js (Intermediate level)

### Updated

- About page with current role
- Project gallery images for E-commerce Platform
- Contact information with new email

### Fixed

- Mobile navigation responsiveness
- Blog post loading performance
- Search functionality edge cases
```

## 🔄 Automation and Tools

### Content Update Scripts

```bash
#!/bin/bash
# scripts/update-content.sh

echo "🔄 Updating content..."

# Update dependencies
bun update

# Check for issues
bun run check
bun run lint

# Optimize images
./scripts/optimize-images.sh

# Generate sitemap
bun run build
echo "✅ Content update complete!"
```

### Automated Checks

```yaml
# .github/workflows/content-check.yml
name: Content Check

on:
  schedule:
    - cron: '0 9 * * 1' # Weekly on Monday

jobs:
  check-content:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Check for broken links
        run: |
          npm install -g markdown-link-check
          find src/content -name "*.md" -exec markdown-link-check {} \;
      - name: Check image optimization
        run: ./scripts/check-image-sizes.sh
```

## 📋 Content Quality Checklist

### Before Publishing

- [ ] **Spelling and grammar**: Use tools like Grammarly
- [ ] **Links work**: Test all internal and external links
- [ ] **Images optimized**: Proper alt text and file sizes
- [ ] **Mobile friendly**: Test on various devices
- [ ] **SEO optimized**: Meta descriptions and titles
- [ ] **Performance**: Check loading times

### After Publishing

- [ ] **Social sharing**: Share on relevant platforms
- [ ] **Analytics setup**: Ensure tracking is working
- [ ] **Feedback collection**: Monitor comments and reactions
- [ ] **Search console**: Submit to Google Search Console
- [ ] **Backup**: Ensure content is backed up

---

**Related Documentation:**

- [Personal Info Guide](personal-info.md) - Updating personal details
- [SEO Optimization](seo-optimization.md) - SEO best practices
- [Performance](../architecture/performance.md) - Performance optimization
