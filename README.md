# SvelteKit Portfolio Template

A modern, professional portfolio template built with SvelteKit, featuring glassmorphism design, comprehensive blog system, and project showcases. Perfect for developers, designers, and creative professionals.

## ✨ Features

- 🎨 **Modern Glassmorphism Design** - Beautiful, professional UI
- 📝 **Complete Blog System** - Write posts in Markdown with MDSvex
- 💼 **Project Showcases** - Galleries, timelines, and detailed case studies
- 🔍 **Advanced Search** - Full-text search across all content
- 🌙 **Dark/Light Mode** - Automatic theme switching
- 📱 **Fully Responsive** - Perfect on all devices
- ⚡ **Performance Optimized** - 95+ Lighthouse scores
- 🎯 **SEO Ready** - Meta tags, sitemaps, structured data
- 🛠️ **Developer Friendly** - TypeScript, comprehensive docs

## 🚀 Quick Start (5 Minutes)

### 1. Use as Template

```bash
# Clone this repository
git clone https://github.com/your-username/portfolio-template.git my-portfolio
cd my-portfolio

# Install dependencies
bun install
# or npm install

# Start development server
bun dev
# or npm run dev
```

Visit `http://localhost:5173` - your portfolio is running!

### 2. Essential Customization (15 Minutes)

1. **Update your info** in `template.config.js`
2. **Replace profile image** in `static/profile.svg`
3. **Write your first blog post** in `src/content/blogs/`
4. **Add your first project** in `src/content/projects/`
5. **Deploy** (see deployment options below)

**👉 [Complete Template Guide](docs/getting-started/using-as-template.md)**

## 📖 Documentation

Comprehensive documentation is available:

- **[Template Usage Guide](docs/getting-started/using-as-template.md)** - Turn this into your portfolio
- **[Installation & Setup](docs/getting-started/installation.md)** - Detailed setup instructions
- **[Content Creation](docs/content-creation/README.md)** - Writing blogs and adding projects
- **[Customization](docs/maintenance/README.md)** - Personalizing your portfolio
- **[Component System](docs/components/README.md)** - Understanding the components
- **[Architecture](docs/architecture/README.md)** - Technical implementation details

## 🛠️ Technology Stack

- **Framework**: SvelteKit 5.x
- **Package Manager**: Bun (or npm)
- **Styling**: CSS with glassmorphism design system
- **Content**: MDSvex for markdown processing
- **Icons**: Lucide Svelte
- **Build Tool**: Vite
- **Language**: TypeScript

## 🎨 Live Demo

[View Live Demo](https://your-demo-site.com) | [Documentation](docs/README.md)

## 📱 Screenshots

| Desktop                             | Mobile                            | Dark Mode                     |
| ----------------------------------- | --------------------------------- | ----------------------------- |
| ![Desktop](screenshots/desktop.png) | ![Mobile](screenshots/mobile.png) | ![Dark](screenshots/dark.png) |

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build command: bun run build
# Publish directory: build
```

### Other Platforms

- **GitHub Pages**: Use SvelteKit static adapter
- **Cloudflare Pages**: Direct GitHub integration
- **Self-hosted**: Upload `build` folder after `bun run build`

## 📋 Template Checklist

### Essential Setup

- [ ] Update `template.config.js` with your information
- [ ] Replace `static/profile.svg` with your photo
- [ ] Update `src/app.html` meta tags
- [ ] Create your first blog post
- [ ] Add your first project
- [ ] Test on mobile devices

### Customization

- [ ] Update colors in `src/styles/variables.css`
- [ ] Replace favicon and manifest icons
- [ ] Customize navigation in `FloatingDock.svelte`
- [ ] Add your skills and technologies
- [ ] Set up analytics (optional)

### Launch

- [ ] Deploy to your preferred platform
- [ ] Set up custom domain
- [ ] Test all functionality
- [ ] Share your new portfolio!

## 🤝 Contributing

This template is open source and welcomes contributions:

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Submit a pull request

## 📝 License

MIT License - feel free to use this for personal and commercial projects.

## 🆘 Support

- **Documentation**: [docs/README.md](docs/README.md)
- **Issues**: [GitHub Issues](https://github.com/your-username/portfolio-template/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/portfolio-template/discussions)

## 🎉 Success Stories

Used this template? We'd love to see what you built! Open an issue to share your portfolio.

---

**Ready to get started?** 👉 [Template Usage Guide](docs/getting-started/using-as-template.md)

Made with ❤️ using SvelteKit
