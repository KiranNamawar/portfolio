# Common Issues

Solutions to the most frequently encountered problems when using the portfolio template.

## 🚨 Critical Issues (Fix These First!)

### Portfolio Not Loading

**Problem**: Portfolio shows blank page or "This site can't be reached"

**Solutions**:

1. **Check if development server is running:**

   ```bash
   bun dev
   # Should see: "Local: http://localhost:5173"
   ```

2. **Verify port is not in use:**

   ```bash
   # Kill process using port 5173
   lsof -ti:5173 | xargs kill -9
   # Then restart
   bun dev
   ```

3. **Check for errors in terminal:**
   - Look for red error messages
   - Fix any compilation errors
   - Restart server after fixes

**Expected Result**: Portfolio loads at `http://localhost:5173`

---

### Content Not Appearing

**Problem**: Blog posts or projects don't show up on the site

**Common Causes & Solutions**:

#### 1. Missing `published: true`

```markdown
---
title: 'My Post'
published: true # ← This must be present and true
---
```

#### 2. Wrong file location

```bash
# ✅ Correct locations
src/content/blogs/my-post.md      # For blog posts
src/content/projects/my-app.md    # For projects

# ❌ Wrong locations
src/content/my-post.md           # Missing subdirectory
content/blogs/my-post.md         # Wrong parent directory
```

#### 3. Invalid frontmatter syntax

```markdown
---
# ❌ Wrong
title: My Post Title        # Missing quotes
date: 06/15/2025           # Wrong date format
technologies [React]       # Missing colon

# ✅ Correct
title: 'My Post Title'
date: '2025-06-15'
technologies: ['React']
---
```

#### 4. File extension issues

```bash
# ✅ Correct
my-post.md

# ❌ Wrong
my-post.txt
my-post.markdown
my-post.mdx
```

---

### Images Not Loading

**Problem**: Images show as broken links or don't display

**Solutions**:

#### 1. Check file path format

```markdown
# ❌ Wrong paths

![Image](images/photo.jpg) # Missing leading slash
![Image](./static/photo.jpg) # Includes 'static' in path
![Image](/static/photo.jpg) # Includes 'static' in path

# ✅ Correct paths

![Image](/images/photo.jpg) # Starts with slash, no 'static'
![Image](/gallery/screenshot.png) # Organized in subdirectories
```

#### 2. Verify file exists in static directory

```bash
# Files should be in static/ folder
static/
├── images/
│   ├── profile.jpg
│   └── hero.png
├── gallery/
│   ├── project1.png
│   └── project2.png
└── favicon.png
```

#### 3. Check file names match exactly

```bash
# ❌ Case mismatch
File: Project-Screenshot.PNG
Code: /gallery/project-screenshot.png

# ✅ Exact match
File: project-screenshot.png
Code: /gallery/project-screenshot.png
```

#### 4. Image component syntax

```markdown
# ❌ Wrong

<Image src="photo.jpg" />

# ✅ Correct

<Image 
  src="/photos/photo.jpg"
  alt="Description of image"
/>
```

---

## 🔧 Development Server Issues

### Server Won't Start

**Problem**: `bun dev` fails or shows errors

**Solutions**:

#### 1. Port already in use

```bash
# Find what's using port 5173
lsof -i :5173

# Kill the process
kill -9 [PID]

# Or use different port
bun dev --port 3000
```

#### 2. Missing dependencies

```bash
# Reinstall dependencies
rm -rf node_modules
rm bun.lockb    # or package-lock.json
bun install
```

#### 3. Node.js version issues

```bash
# Check Node.js version (should be 18+)
node --version

# Update if needed
nvm install node
nvm use node
```

#### 4. Permission issues (macOS/Linux)

```bash
# Fix npm/bun permissions
sudo chown -R $(whoami) ~/.bun
sudo chown -R $(whoami) ~/.npm
```

---

### Hot Reload Not Working

**Problem**: Changes don't appear automatically

**Solutions**:

1. **Restart development server:**

   ```bash
   # Ctrl+C to stop, then
   bun dev
   ```

2. **Clear browser cache:**

   - Hard refresh: `Ctrl+F5` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Open DevTools → Right-click refresh → Empty Cache and Hard Reload

3. **Check file watchers (Linux):**
   ```bash
   # Increase file watcher limit
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

---

## 🎨 Styling and Display Issues

### Glass Effects Not Working

**Problem**: Components look flat, missing glassmorphism effect

**Solutions**:

#### 1. Check browser support

- Glass effects require `backdrop-filter` support
- Test in Chrome/Firefox/Safari (recent versions)
- IE/older browsers won't show effects

#### 2. Verify CSS variables

```css
/* Check these variables exist in variables.css */
:root {
	--glass-bg: rgba(255, 255, 255, 0.1);
	--glass-border: rgba(255, 255, 255, 0.2);
	--glass-backdrop: blur(20px) saturate(180%);
}
```

#### 3. Check glass classes are applied

```svelte
<!-- ❌ Missing glass classes -->
<div class="card">Content</div>

<!-- ✅ With glass effects -->
<div class="glass-card">Content</div>
```

---

### Dark Mode Not Working

**Problem**: Theme toggle doesn't switch themes properly

**Solutions**:

#### 1. Check theme attribute

```html
<!-- Should see this in HTML -->
<html data-theme="dark"></html>
```

#### 2. Verify CSS variables for dark mode

```css
/* Should exist in variables.css */
:root[data-theme='dark'] {
	--color-background: 17, 24, 39;
	--color-text-primary: 249, 250, 251;
	/* ... other dark theme variables */
}
```

#### 3. Clear localStorage

```javascript
// In browser console
localStorage.removeItem('theme');
// Then refresh page
```

---

### Responsive Design Issues

**Problem**: Site doesn't look good on mobile

**Solutions**:

#### 1. Check viewport meta tag

```html
<!-- Should be in app.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

#### 2. Test with device emulation

- Open DevTools (F12)
- Click device toggle icon
- Test different screen sizes

#### 3. Check CSS media queries

```css
/* Mobile-first approach */
.component {
	/* Mobile styles */
}

@media (min-width: 768px) {
	.component {
		/* Desktop styles */
	}
}
```

---

## 📝 Content Issues

### Frontmatter Errors

**Problem**: "Cannot read property" or parsing errors

**Solutions**:

#### 1. Check YAML syntax

```markdown
---
# ❌ Common mistakes
title: My Title             # Missing quotes
technologies: React, Vue    # Should be array
featured true              # Missing colon

# ✅ Correct syntax
title: 'My Title'
technologies: ['React', 'Vue']
featured: true
---
```

#### 2. Validate frontmatter online

- Use YAML validator tools
- Check for invisible characters
- Ensure proper indentation

#### 3. Required vs optional fields

```markdown
---
# Required for all content
title: 'Your Title'
description: 'Brief description'
date: '2025-06-15'
published: true

# Optional but recommended
featured: false
tags: ['web-dev', 'tutorial']
---
```

---

### Markdown Rendering Issues

**Problem**: Markdown doesn't render correctly

**Solutions**:

#### 1. Check MDSvex syntax

```markdown
<!-- ❌ Wrong component syntax -->
<Callout type=info>
<Callout type="info">Text</Callout>

<!-- ✅ Correct syntax -->
<Callout type="info">
  Your content here
</Callout>
```

#### 2. Verify component imports

Components are automatically available in markdown:

- `<Callout>`
- `<Image>`
- `<ProjectGallery>`

#### 3. Check for conflicting syntax

```markdown
<!-- ❌ Can cause issues -->
<div>
# Heading inside HTML
</div>

<!-- ✅ Better approach -->
<div>
  <h1>Heading</h1>
</div>
```

---

## 🔍 Search and Navigation Issues

### Search Not Working

**Problem**: Search dialog doesn't open or find results

**Solutions**:

#### 1. Check search shortcut

- Press `Cmd+K` (Mac) or `Ctrl+K` (Windows/Linux)
- Or click search icon in navigation dock

#### 2. Verify content is published

```markdown
---
published: true # Required for search indexing
---
```

#### 3. Test with simple queries

- Try searching for exact title words
- Check if content exists and is published

---

### Navigation Issues

**Problem**: Links don't work or navigation is broken

**Solutions**:

#### 1. Check link formats

```markdown
<!-- ❌ Wrong internal links -->

[Link](../blog/post.md)
[Link](src/routes/about.html)

<!-- ✅ Correct internal links -->

[Link](/blog/post-slug)
[Link](/about)
```

#### 2. Verify floating dock

- Should appear at bottom of screen
- Check if it's hidden behind other elements
- Test on different screen sizes

---

## 🚀 Build and Deployment Issues

### Build Failures

**Problem**: `bun run build` fails

**Solutions**:

#### 1. Check TypeScript errors

```bash
bun run check
# Fix any TypeScript errors first
```

#### 2. Verify all imports exist

```javascript
// ❌ Importing non-existent file
import { Component } from '$lib/components/Missing.svelte';

// ✅ Check file exists
import { Component } from '$lib/components/ui/Component.svelte';
```

#### 3. Check for missing dependencies

```bash
bun install
# Ensure all packages are installed
```

---

### Deployment Issues

**Problem**: Site works locally but not in production

**Solutions**:

#### 1. Check adapter configuration

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-auto';
// Ensure correct adapter for your platform
```

#### 2. Verify environment variables

- Check if any required environment variables are missing
- Ensure build process has access to needed variables

#### 3. Test production build locally

```bash
bun run build
bun run preview
# Test at http://localhost:4173
```

---

## 🛠️ Quick Fixes Checklist

When something breaks, try these in order:

1. **[ ]** Hard refresh browser (`Ctrl+F5`)
2. **[ ]** Restart development server
3. **[ ]** Check console for errors
4. **[ ]** Verify recent file changes
5. **[ ]** Check frontmatter syntax
6. **[ ]** Confirm file paths are correct
7. **[ ]** Clear browser cache
8. **[ ]** Reinstall dependencies
9. **[ ]** Check git history for working version

---

## 📞 Still Need Help?

If these solutions don't resolve your issue:

1. **Check specific guides:**

   - [Development Errors](development-errors.md) - For build/compilation issues
   - [Content Errors](content-errors.md) - For content creation problems

2. **Search documentation:**

   - Use the search function to find relevant sections
   - Check component documentation for usage examples

3. **Create minimal reproduction:**
   - Test with simplest possible content
   - Isolate the specific issue

**Remember**: Most issues are simple mistakes that are easy to fix once identified. Take your time and check each step carefully!
