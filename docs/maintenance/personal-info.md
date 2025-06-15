# Updating Personal Information

This guide covers how to update your personal information, skills, and other dynamic content in your portfolio.

## 📍 Quick Overview

Your personal information is centralized in `src/lib/data/personal.js`. This file contains:

- Basic personal information (name, title, bio)
- Contact details
- Skills and experience levels
- Social media links
- Work experience and education

## 📁 File Location

```
src/lib/data/personal.js    # Main personal data file
```

## 👤 Basic Information

### Personal Details

```javascript
export const personalInfo = {
	name: 'Your Full Name',
	title: 'Your Professional Title',
	bio: `Your brief bio - this appears on the homepage and about page. 
Keep it concise but engaging.`,
	description: `Extended description that appears in certain contexts. 
This can be longer and more detailed.`,
	email: 'your.email@domain.com',
	location: 'Your City, Country',
	resumeUrl: '/resume.pdf' // Place PDF in static/ folder
};
```

### Hero Section Phrases

The typing animation on your homepage cycles through these phrases:

```javascript
export const heroTypingPhrases = [
	'Full Stack Developer',
	'Creative Problem Solver',
	'Technology Enthusiast',
	'Digital Innovator'
	// Add more phrases as needed
];
```

**Tips for hero phrases:**

- Keep them 2-4 words
- Make them relevant to your career
- Use action-oriented language
- Aim for 4-6 total phrases

## 🛠️ Skills Management

### Skill Levels

The portfolio uses a 5-level skill system:

| Level          | Description           | When to Use                              |
| -------------- | --------------------- | ---------------------------------------- |
| `foundational` | Just learning         | New technologies, basics understood      |
| `developing`   | Building competency   | Some projects completed, still learning  |
| `proficient`   | Comfortable using     | Regular use, good understanding          |
| `expert`       | Advanced knowledge    | Deep expertise, can teach others         |
| `master`       | Exceptional expertise | Industry-level expertise, thought leader |

### Adding Skills

```javascript
export const skills = [
	{
		name: 'JavaScript',
		level: 'expert', // Use the level system above
		icon: '🚀', // Emoji or icon
		category: 'programming', // Group skills by category
		description: 'Modern ES6+, async/await, DOM manipulation'
	},
	{
		name: 'SvelteKit',
		level: 'proficient',
		icon: '⚡',
		category: 'framework',
		description: 'Full-stack development, SSR, routing'
	}
];
```

### Skill Categories

Organize skills into logical categories:

```javascript
// Common categories
'programming'; // Languages (JS, TS, Python, etc.)
'framework'; // Frameworks and libraries
'database'; // Database technologies
'tools'; // Development tools
'design'; // Design and UI/UX
'cloud'; // Cloud platforms and services
'other'; // Everything else
```

### Complete Skills Example

```javascript
export const skills = [
	// Programming Languages
	{
		name: 'JavaScript',
		level: 'expert',
		icon: '🚀',
		category: 'programming',
		description: 'ES6+, async/await, functional programming'
	},
	{
		name: 'TypeScript',
		level: 'proficient',
		icon: '📘',
		category: 'programming',
		description: 'Type safety, interfaces, generics'
	},

	// Frameworks
	{
		name: 'SvelteKit',
		level: 'expert',
		icon: '⚡',
		category: 'framework',
		description: 'SSR, routing, state management'
	},
	{
		name: 'React',
		level: 'proficient',
		icon: '⚛️',
		category: 'framework',
		description: 'Hooks, context, component patterns'
	},

	// Tools & Technologies
	{
		name: 'Git',
		level: 'expert',
		icon: '🌿',
		category: 'tools',
		description: 'Version control, branching strategies'
	}
];
```

## 🔗 Social Links

### Adding Social Media

```javascript
export const socialLinks = [
	{
		name: 'GitHub',
		url: 'https://github.com/yourusername',
		icon: 'github', // Lucide icon name
		username: '@yourusername'
	},
	{
		name: 'LinkedIn',
		url: 'https://linkedin.com/in/yourprofile',
		icon: 'linkedin',
		username: 'Your Name'
	},
	{
		name: 'Twitter',
		url: 'https://twitter.com/yourusername',
		icon: 'twitter',
		username: '@yourusername'
	}
];
```

### Available Icons

The portfolio uses Lucide icons. Common social media icons:

- `github`
- `linkedin`
- `twitter`
- `instagram`
- `youtube`
- `mail`
- `globe` (for websites)

## 💼 Work Experience

### Adding Work History

```javascript
export const workExperience = [
	{
		company: 'Company Name',
		position: 'Your Job Title',
		duration: 'Jan 2023 - Present',
		location: 'City, Country',
		description: 'Brief description of your role and key achievements.',
		technologies: ['JavaScript', 'React', 'Node.js'],
		achievements: [
			'Increased application performance by 40%',
			'Led a team of 3 developers',
			'Implemented CI/CD pipeline'
		]
	}
];
```

### Work Experience Best Practices

- **Duration**: Use consistent format (Jan 2023 - Present)
- **Description**: Focus on impact and results
- **Technologies**: List relevant tech used
- **Achievements**: Quantify results when possible

## 🎓 Education

### Adding Education

```javascript
export const education = [
	{
		institution: 'University Name',
		degree: 'Bachelor of Computer Science',
		duration: '2019 - 2023',
		location: 'City, Country',
		description: 'Relevant coursework, projects, or achievements',
		gpa: '3.8/4.0', // Optional
		honors: ['Magna Cum Laude', "Dean's List"] // Optional
	}
];
```

## 🏆 Certifications

### Adding Certifications

```javascript
export const certifications = [
	{
		name: 'AWS Certified Developer',
		issuer: 'Amazon Web Services',
		date: '2024',
		credentialId: 'ABC123', // Optional
		url: 'https://credential-url.com' // Optional
	}
];
```

## 📞 Contact Information

### Contact Methods

```javascript
export const contactInfo = {
	email: 'your.email@domain.com',
	phone: '+1 (555) 123-4567', // Optional
	location: 'Your City, Country',
	timezone: 'EST', // Optional
	availability: 'Available for freelance work' // Optional
};
```

### Resume/CV

Place your resume PDF in the `static/` folder:

```
static/
├── resume.pdf          # Your resume file
└── cv.pdf             # Alternative CV file
```

Update the resume URL:

```javascript
export const personalInfo = {
	// ... other fields
	resumeUrl: '/resume.pdf' // Points to static/resume.pdf
};
```

## 🎨 Customization Tips

### Bio Writing

**Homepage Bio** (keep concise):

- 2-3 sentences maximum
- Focus on your value proposition
- Include personality

**Extended Description**:

- Can be longer and more detailed
- Include background and interests
- Mention career goals

### Skills Assessment

**Be Honest**: Use accurate skill levels
**Stay Current**: Update as you learn
**Be Specific**: Include relevant details in descriptions

### Professional Presentation

- Use professional email address
- Keep social links work-appropriate
- Update resume regularly
- Maintain consistent branding

## 🔄 Update Workflow

### Regular Updates

1. **Monthly Review**: Check if any information needs updating
2. **After New Skills**: Add technologies you've learned
3. **Job Changes**: Update work experience immediately
4. **New Projects**: Reflect skills gained in project work

### Testing Changes

1. **Save your changes** to `personal.js`
2. **Check the development server** for errors
3. **View the about page** to see your updates
4. **Test all social links** to ensure they work

### Backup Strategy

Before major changes:

```bash
# Create a backup
cp src/lib/data/personal.js src/lib/data/personal.backup.js
```

## 📋 Update Checklist

### New Job/Role

- [ ] Update work experience
- [ ] Add new technologies learned
- [ ] Update bio if role significantly changed
- [ ] Update professional title if needed
- [ ] Refresh resume PDF

### Skill Progression

- [ ] Promote skills that have improved
- [ ] Add new technologies learned
- [ ] Remove outdated or unused skills
- [ ] Update skill descriptions

### General Maintenance

- [ ] Verify all links work
- [ ] Check email address is current
- [ ] Update location if moved
- [ ] Refresh hero phrases if desired
- [ ] Update availability status

## 🚨 Common Mistakes

### Skill Level Inflation

❌ Don't overstate your abilities
✅ Be honest about your current level

### Outdated Information

❌ Leaving old job titles or locations
✅ Regular updates and maintenance

### Broken Links

❌ Social media links that don't work
✅ Test all URLs before publishing

### Inconsistent Formatting

❌ Mixed date formats, inconsistent naming
✅ Follow established patterns

## 🔧 Troubleshooting

### Changes Not Appearing

1. **Check syntax**: Ensure valid JavaScript
2. **Restart dev server**: Stop and start `bun run dev`
3. **Clear cache**: Hard refresh browser (Ctrl+Shift+R)

### Build Errors

```bash
# Check for JavaScript errors
bun run check

# View detailed error messages
bun run build
```

### Common JavaScript Errors

```javascript
// ❌ Missing comma
export const skills = [
	{ name: 'JavaScript', level: 'expert' }
	{ name: 'React', level: 'proficient' }  // Missing comma above
];

// ✅ Correct syntax
export const skills = [
	{ name: 'JavaScript', level: 'expert' },  // Comma required
	{ name: 'React', level: 'proficient' }
];
```

---

**Related**: [Adding Skills →](adding-skills.md) | [Theme Customization →](theme-customization.md)
