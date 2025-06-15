# Troubleshooting

Having issues with your portfolio? This section provides solutions to common problems and guidance for resolving errors quickly.

## 🚨 Quick Fixes

### Most Common Issues

1. **Portfolio not loading**: Check if development server is running (`bun dev`)
2. **Content not appearing**: Verify `published: true` in frontmatter
3. **Images not showing**: Check file paths and ensure images are in `static/` folder
4. **Build failing**: Check for TypeScript errors and missing dependencies
5. **Styles not applying**: Verify CSS variables and check for conflicts

## 📋 Troubleshooting Categories

### 🛠️ [Common Issues](common-issues.md)

Frequent problems and their solutions:

- Development server issues
- Content not appearing
- Image loading problems
- Navigation issues
- Theme switching problems

### 💻 [Development Errors](development-errors.md)

Development-specific problems:

- TypeScript compilation errors
- Svelte compilation issues
- Build process failures
- Dependency conflicts
- MDSvex processing errors

### 📝 [Content Errors](content-errors.md)

Content creation and management issues:

- Frontmatter validation errors
- Markdown parsing problems
- Component usage errors
- Gallery and timeline issues
- SEO metadata problems

## 🔧 Quick Diagnostic Steps

### 1. Check the Basics

**Is the development server running?**

```bash
bun dev
# or
npm run dev
```

**Are there any console errors?**

- Open browser DevTools (F12)
- Check Console tab for errors
- Look for red error messages

**Is the file structure correct?**

```
src/content/
├── blogs/          # Blog posts here
└── projects/       # Projects here
```

### 2. Verify Content Format

**Check frontmatter syntax:**

```markdown
---
title: 'Your Title' # Quoted strings
date: '2025-06-15' # YYYY-MM-DD format
published: true # Boolean, not quoted
technologies: ['React'] # Array format
---
```

**Common frontmatter mistakes:**

```markdown
---
# ❌ Wrong
title: My Title           # Missing quotes
date: 06/15/2025         # Wrong date format
published: "true"        # Boolean in quotes

# ✅ Correct  
title: 'My Title'
date: '2025-06-15'
published: true
---
```

### 3. Check File Paths

**Image paths should start with `/`:**

```markdown
# ❌ Wrong

![Image](images/photo.jpg)

# ✅ Correct

![Image](/images/photo.jpg)
```

**Files should be in the correct directories:**

- Blog posts: `src/content/blogs/filename.md`
- Projects: `src/content/projects/filename.md`
- Images: `static/images/filename.jpg`

## 🆘 Getting Help

### Self-Help Checklist

Before seeking help, try these steps:

1. **Read error messages carefully** - They often contain the solution
2. **Check recent changes** - What did you modify last?
3. **Test with minimal content** - Create a simple blog post or project
4. **Clear browser cache** - Hard refresh with Ctrl+F5
5. **Restart development server** - Stop and start `bun dev`

### Error Message Patterns

**"Cannot read property 'X' of undefined"**

- Usually missing data in frontmatter
- Check required fields are present

**"Module not found"**

- Missing import or wrong file path
- Check file exists and path is correct

**"Unexpected token"**

- Syntax error in code or frontmatter
- Check for missing commas, quotes, or brackets

**"Failed to compile"**

- TypeScript or Svelte compilation error
- Check component syntax and types

## 🔍 Debugging Techniques

### Browser DevTools

**Console Debugging:**

```javascript
// Add console logs to debug
console.log('Debug info:', data);
```

**Network Tab:**

- Check if files are loading correctly
- Look for 404 errors on missing resources

**Elements Tab:**

- Inspect HTML structure
- Check if CSS classes are applied

### Development Tools

**Check build output:**

```bash
bun run build
# Look for build errors
```

**Validate TypeScript:**

```bash
bun run check
# Check for type errors
```

**Check dependencies:**

```bash
bun install
# Ensure all packages are installed
```

## 📱 Platform-Specific Issues

### Windows Users

**Path separator issues:**

- Use forward slashes `/` in file paths
- Avoid backslashes `\` in URLs

**PowerShell execution policy:**

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### macOS Users

**Permission issues:**

```bash
sudo chown -R $(whoami) ~/.bun
```

**Node.js version conflicts:**

- Use node version manager (nvm)
- Ensure Node.js 18+ is installed

### Linux Users

**Package manager issues:**

```bash
# Update package lists
sudo apt update

# Install Node.js if needed
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 🛟 Emergency Fixes

### Reset to Working State

**If everything breaks:**

1. **Backup your content:**

   ```bash
   cp -r src/content /backup/location
   ```

2. **Reset to last known good state:**

   ```bash
   git reset --hard HEAD~1
   ```

3. **Restore your content:**
   ```bash
   cp -r /backup/location/* src/content/
   ```

### Clean Installation

**If dependencies are corrupted:**

1. **Remove dependencies:**

   ```bash
   rm -rf node_modules
   rm bun.lockb  # or package-lock.json
   ```

2. **Reinstall:**

   ```bash
   bun install
   # or npm install
   ```

3. **Clear cache:**
   ```bash
   rm -rf .svelte-kit
   ```

### Content Recovery

**If content gets corrupted:**

1. **Check git history:**

   ```bash
   git log --oneline
   git show COMMIT_HASH:src/content/blogs/filename.md
   ```

2. **Use git to restore:**
   ```bash
   git checkout HEAD~1 -- src/content/blogs/filename.md
   ```

## 📞 When to Seek Help

### Documentation First

Before asking for help:

1. Check relevant documentation sections
2. Search existing issues in repository
3. Try the troubleshooting steps above
4. Test with minimal reproduction case

### Reporting Issues

When reporting problems, include:

- **Error message** (full text)
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Environment info** (OS, Node version, browser)
- **Relevant code snippets** or files

### Contact Options

- **Documentation**: Check all relevant sections first
- **GitHub Issues**: For bugs and feature requests
- **Community**: Forums and discussion boards

## 🎯 Prevention Tips

### Best Practices

**Regular Maintenance:**

- Keep dependencies updated
- Test changes frequently
- Backup content regularly
- Use version control effectively

**Code Quality:**

- Follow TypeScript best practices
- Validate frontmatter before committing
- Test on multiple devices and browsers
- Use consistent file naming

**Performance:**

- Optimize images before adding
- Monitor bundle size
- Test with slow connections
- Check mobile performance

---

## 📚 Related Documentation

For specific issues, check:

- **[Common Issues](common-issues.md)** - Frequent problems
- **[Development Errors](development-errors.md)** - Build and compilation issues
- **[Content Errors](content-errors.md)** - Content creation problems
- **[Installation Guide](../getting-started/installation.md)** - Setup issues
- **[Component Usage](../components/component-usage-guide.md)** - Component problems

**Still stuck?** The specific troubleshooting guides have detailed solutions for common scenarios!
