# Deployment Guide

Get your portfolio live on the web with this comprehensive deployment guide. We'll cover the most popular deployment platforms and provide step-by-step instructions for each.

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)

**Perfect for:** SvelteKit projects with zero configuration

1. **Prepare your project:**

   ```bash
   bun run build
   ```

2. **Deploy to Vercel:**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy (follow prompts)
   vercel
   ```

3. **Custom domain (optional):**
   - Go to your Vercel dashboard
   - Add your custom domain
   - Update DNS settings

### Option 2: Netlify

**Perfect for:** Simple deployment with great CI/CD

1. **Build your project:**

   ```bash
   bun run build
   ```

2. **Deploy via Git:**

   - Connect your GitHub repository
   - Set build command: `bun run build`
   - Set publish directory: `build`
   - Deploy automatically on push

3. **Manual deployment:**

   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli

   # Deploy
   netlify deploy --prod --dir=build
   ```

### Option 3: GitHub Pages

**Perfect for:** Free hosting with GitHub integration

1. **Install adapter:**

   ```bash
   bun add -D @sveltejs/adapter-static
   ```

2. **Update svelte.config.js:**

   ```javascript
   import adapter from '@sveltejs/adapter-static';

   export default {
   	kit: {
   		adapter: adapter({
   			pages: 'build',
   			assets: 'build',
   			fallback: undefined,
   			precompress: false,
   			strict: true
   		})
   	}
   };
   ```

3. **Add deploy script to package.json:**

   ```json
   {
   	"scripts": {
   		"deploy": "bun run build && npx gh-pages -d build"
   	}
   }
   ```

4. **Deploy:**
   ```bash
   bun run deploy
   ```

## 🔧 Pre-Deployment Checklist

### Essential Preparations

- [ ] **Build successfully**: `bun run build` completes without errors
- [ ] **Update personal info**: All placeholder content replaced
- [ ] **Test locally**: `bun run preview` works correctly
- [ ] **Optimize images**: All images compressed and properly sized
- [ ] **Check meta tags**: SEO information is complete and accurate
- [ ] **Verify links**: All external and internal links work
- [ ] **Test responsive design**: Layout works on mobile and desktop

### Performance Optimization

- [ ] **Run Lighthouse audit**: Aim for 90+ scores
- [ ] **Optimize bundle size**: Remove unused dependencies
- [ ] **Compress images**: Use WebP format where possible
- [ ] **Enable caching**: Configure proper cache headers
- [ ] **Test loading speed**: Use tools like GTMetrix or PageSpeed Insights

### SEO Verification

- [ ] **Meta descriptions**: Each page has unique, compelling descriptions
- [ ] **Open Graph tags**: Social media previews work correctly
- [ ] **Structured data**: Rich snippets are properly configured
- [ ] **Sitemap**: XML sitemap is generated and accessible
- [ ] **Robots.txt**: Search engine crawling rules are correct

## 🌐 Environment Configuration

### Environment Variables

Create `.env` files for different environments:

**.env.local** (development):

```env
PUBLIC_SITE_URL=http://localhost:5173
PUBLIC_ANALYTICS_ID=your-dev-analytics-id
```

**.env.production** (production):

```env
PUBLIC_SITE_URL=https://yourdomain.com
PUBLIC_ANALYTICS_ID=your-prod-analytics-id
PUBLIC_CONTACT_FORM_ENDPOINT=your-form-handler
```

### Platform-Specific Configuration

#### Vercel

Create `vercel.json`:

```json
{
	"buildCommand": "bun run build",
	"outputDirectory": "build",
	"framework": "sveltekit",
	"env": {
		"PUBLIC_SITE_URL": "https://yourdomain.com"
	}
}
```

#### Netlify

Create `netlify.toml`:

```toml
[build]
  command = "bun run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

## 🔍 Post-Deployment Testing

### Functionality Testing

1. **Navigation**: Test all menu items and links
2. **Search**: Verify search functionality works
3. **Blog posts**: Check all blog posts load and display correctly
4. **Project pages**: Ensure project galleries and links work
5. **Contact form**: Test form submissions (if applicable)
6. **Theme switching**: Verify dark/light mode toggle

### Performance Testing

1. **Page Speed:**

   - Use Google PageSpeed Insights
   - Test both mobile and desktop
   - Aim for scores above 90

2. **Load Testing:**

   - Test with slow connections
   - Verify images load progressively
   - Check for layout shifts

3. **Cross-Browser Testing:**
   - Test in Chrome, Firefox, Safari, Edge
   - Check mobile browsers
   - Verify consistent behavior

### SEO Testing

1. **Search Console:**

   - Submit sitemap to Google Search Console
   - Monitor for crawling errors
   - Check indexing status

2. **Social Media:**
   - Test sharing on Facebook, Twitter, LinkedIn
   - Verify Open Graph images display
   - Check descriptions and titles

## 🔄 Continuous Deployment

### GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Bun
        uses: oven-sh/setup-bun@v1

      - name: Install dependencies
        run: bun install

      - name: Build
        run: bun run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Manual Deployment Script

Create `scripts/deploy.sh`:

```bash
#!/bin/bash

echo "🚀 Starting deployment..."

# Build the project
echo "📦 Building project..."
bun run build

# Run tests
echo "🧪 Running tests..."
bun run test

# Deploy
echo "🌐 Deploying to production..."
vercel --prod

echo "✅ Deployment complete!"
echo "🔗 Your site is live at: https://yourdomain.com"
```

## 🛠️ Troubleshooting Deployment Issues

### Common Build Errors

**Error: "Module not found"**

```bash
# Clear node modules and reinstall
rm -rf node_modules
bun install
```

**Error: "Build failed"**

```bash
# Check for TypeScript errors
bun run check

# Build with verbose output
bun run build --verbose
```

### Platform-Specific Issues

#### Vercel Issues

- **Build timeout**: Increase timeout in vercel.json
- **Function size**: Optimize bundle size
- **Environment variables**: Check they're set correctly

#### Netlify Issues

- **Build fails**: Check Node.js version in netlify.toml
- **Redirects not working**: Verify netlify.toml configuration
- **Form handling**: Set up Netlify Forms properly

#### GitHub Pages Issues

- **404 errors**: Ensure static adapter is configured
- **Base path**: Configure base path for subdirectory deployment
- **HTTPS**: Enable HTTPS in repository settings

## 📊 Monitoring & Analytics

### Performance Monitoring

1. **Google Analytics 4:**

   - Set up GA4 property
   - Add tracking code to app.html
   - Configure conversion tracking

2. **Core Web Vitals:**
   - Monitor loading performance
   - Track user interactions
   - Set up alerts for performance issues

### Error Tracking

Consider adding error tracking:

```bash
# Install Sentry for error tracking
bun add @sentry/sveltekit
```

Configure in `hooks.client.ts`:

```typescript
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: 'YOUR_DSN_HERE',
	environment: 'production'
});
```

## 🎯 Best Practices

### Security

- [ ] Enable HTTPS on your domain
- [ ] Set up security headers
- [ ] Keep dependencies updated
- [ ] Use environment variables for sensitive data

### Performance

- [ ] Enable compression (gzip/brotli)
- [ ] Set up CDN for static assets
- [ ] Optimize images with modern formats
- [ ] Implement proper caching strategies

### Maintenance

- [ ] Set up automated backups
- [ ] Monitor uptime and performance
- [ ] Keep deployment scripts updated
- [ ] Document any custom configurations

---

**Next Steps:**

- [Maintenance Guide](../maintenance/README.md) - Keep your portfolio updated
- [Performance Optimization](../architecture/performance.md) - Optimize for speed
- [SEO Guide](../maintenance/seo-optimization.md) - Improve search rankings

**Need Help?**

- [Troubleshooting](../troubleshooting/README.md) - Common deployment issues
- [Common Issues](../troubleshooting/common-issues.md) - Quick fixes
