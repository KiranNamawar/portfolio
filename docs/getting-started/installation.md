# Installation & Setup Guide

This guide will help you set up the SvelteKit portfolio project on your local machine.

## 📋 Prerequisites

Before starting, ensure you have the following installed:

### Required Software

1. **Node.js** (v18 or higher)

   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **Bun** (Package Manager)

   - Install: `npm install -g bun` or visit [bun.sh](https://bun.sh/)
   - Verify installation: `bun --version`

3. **Git** (Version Control)
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation: `git --version`

### Recommended Tools

- **VS Code** with Svelte extension
- **Chrome/Firefox** with dev tools
- **Terminal** of your choice (PowerShell, CMD, etc.)

## 🚀 Quick Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd portfolio
```

### 2. Install Dependencies

```bash
bun install
```

This will install all necessary dependencies including:

- SvelteKit 5.x
- MDSvex for markdown processing
- TypeScript for type safety
- Lucide Svelte for icons
- Development tools and linters

### 3. Start Development Server

```bash
bun run dev
```

The development server will start at `http://localhost:5173`

### 4. Verify Installation

Open your browser and navigate to `http://localhost:5173`. You should see:

- ✅ Homepage loading correctly
- ✅ Navigation working
- ✅ Blog page accessible
- ✅ Projects page accessible
- ✅ Theme toggle working

## 📁 Project Structure Overview

After installation, your project structure will look like this:

```
portfolio/
├── src/                        # Source code
│   ├── content/               # Markdown content
│   │   ├── blogs/            # Blog posts
│   │   └── projects/         # Project pages
│   ├── lib/                  # Shared libraries
│   │   ├── components/       # Svelte components
│   │   ├── utils/           # Utility functions
│   │   └── stores/          # Svelte stores
│   ├── routes/              # SvelteKit routes
│   └── styles/              # Global styles
├── static/                  # Static assets
├── docs/                    # Documentation (you're here!)
└── package.json            # Dependencies and scripts
```

## 🔧 Configuration Files

The project includes several configuration files:

- **`svelte.config.js`** - SvelteKit configuration
- **`mdsvex.config.js`** - Markdown processing setup
- **`vite.config.ts`** - Build tool configuration
- **`tsconfig.json`** - TypeScript configuration
- **`package.json`** - Project dependencies and scripts

## 📜 Available Scripts

| Script            | Description               |
| ----------------- | ------------------------- |
| `bun run dev`     | Start development server  |
| `bun run build`   | Build for production      |
| `bun run preview` | Preview production build  |
| `bun run check`   | Type-check the project    |
| `bun run lint`    | Run linter                |
| `bun run format`  | Format code with Prettier |

## 🌍 Environment Setup

### Development Environment

The project works out of the box with default settings. No environment variables are required for basic functionality.

### Optional Environment Variables

Create a `.env` file in the root directory for optional configuration:

```env
# Optional: Analytics tracking ID
PUBLIC_GA_ID=your-google-analytics-id

# Optional: Site URL for SEO
PUBLIC_SITE_URL=https://your-domain.com
```

## 🎨 Customization Setup

### Personal Information

1. Open `src/lib/data/personal.js`
2. Update your personal information:
   - Name, title, bio
   - Contact information
   - Skills and experience
   - Social links

### Theme Colors

1. Open `src/styles/variables.css`
2. Customize CSS variables for colors and glass effects
3. Both light and dark mode variables are available

## ✅ Verification Checklist

After installation, verify everything works:

- [ ] Development server starts without errors
- [ ] Homepage displays your information
- [ ] Blog page shows sample posts
- [ ] Projects page displays sample projects
- [ ] Search functionality works
- [ ] Theme toggle works (light/dark mode)
- [ ] Navigation is responsive on mobile
- [ ] Glass effects are visible

## 🔧 Troubleshooting

### Common Installation Issues

**Node modules not found**

```bash
# Clean install
rm -rf node_modules bun.lockb
bun install
```

**Port already in use**

```bash
# Start on different port
bun run dev --port 3000
```

**TypeScript errors**

```bash
# Check types
bun run check
```

**Build fails**

```bash
# Clean build
rm -rf .svelte-kit
bun run build
```

### Next Steps

Once installation is complete:

1. **[Read the Development Guide](development.md)** - Learn the development workflow
2. **[Create Your First Blog Post](../content-creation/writing-blogs.md)** - Start adding content
3. **[Customize Your Information](../maintenance/personal-info.md)** - Update personal details

## 📞 Need Help?

If you encounter issues:

1. Check [Common Issues](../troubleshooting/common-issues.md)
2. Review [Development Errors](../troubleshooting/development-errors.md)
3. Ensure all prerequisites are correctly installed

---

**Next**: [Development Workflow →](development.md)
