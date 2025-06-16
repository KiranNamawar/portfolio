# Architecture Overview

Welcome to the architecture documentation. This section explains the technical design decisions, system architecture, and structural patterns used in the portfolio project.

## 📋 Architecture Documentation

### [Data Flow](data-flow.md)

Complete system for managing content and data flow throughout the application.

### [Folder Structure](folder-structure.md)

Detailed explanation of how the project is organized and file naming conventions.

### [Build System](build-system.md)

Understanding Vite, SvelteKit's build process, and optimization techniques.

### [Performance](performance.md)

Performance optimization strategies and monitoring techniques.

## 🏗️ System Overview

### Technology Stack

- **Framework**: SvelteKit 5.x with latest features
- **Language**: TypeScript for type safety
- **Build Tool**: Vite for fast development and building
- **Package Manager**: Bun for fast package management
- **Styling**: CSS with custom properties and glassmorphism
- **Content**: MDSvex for enhanced markdown processing
- **Icons**: Lucide Svelte for consistent iconography

### Architecture Principles

1. **Single Source of Truth**: All data flows through centralized utilities
2. **Type Safety**: Comprehensive TypeScript coverage
3. **Performance First**: Lazy loading, code splitting, optimized assets
4. **Developer Experience**: Hot reload, helpful error messages, clear structure
5. **Maintainability**: Clear separation of concerns, documented patterns

### Design Patterns

- **Utility-First Content**: Centralized data processing in `/lib/utils`
- **Component Composition**: Reusable, composable UI components
- **Route-Based Loading**: SvelteKit's file-based routing with proper data loading
- **Store Management**: Reactive stores for global state (theme, search)
- **Progressive Enhancement**: Works without JavaScript, enhanced with it

## 🔄 Data Architecture

### Content Processing Pipeline

```
Markdown Files → Utility Functions → Route Loaders → Components → UI
```

1. **Content Sources**: `.md` files in `/src/content/`
2. **Processing**: Utility functions in `/src/lib/utils/`
3. **Loading**: Route-based loaders in `+page.ts` files
4. **Rendering**: Svelte components receive processed data
5. **Display**: Glass-morphism UI with responsive design

### State Management

- **Theme**: Global theme store for dark/light mode
- **Search**: Client-side search state management
- **Navigation**: URL-based state with SvelteKit routing
- **Content**: Server-side rendering with client-side hydration

## 📁 Key Directories

```
src/
├── routes/              # SvelteKit file-based routing
├── lib/
│   ├── components/      # Reusable UI components
│   ├── utils/          # Data processing utilities
│   ├── stores/         # Global state management
│   ├── types/          # TypeScript definitions
│   └── data/           # Static configuration data
├── content/            # Markdown content files
└── styles/             # Global CSS and design system
```

## 🎯 Quality Assurance

### Code Quality

- **TypeScript**: Full type coverage with strict mode
- **ESLint**: Code linting with Svelte-specific rules
- **Prettier**: Consistent code formatting
- **Svelte Check**: Component-level type checking

### Performance

- **Bundle Analysis**: Regular bundle size monitoring
- **Core Web Vitals**: Performance metrics tracking
- **Lighthouse**: Automated performance testing
- **Image Optimization**: Proper image formats and sizes

### Testing Strategy

- **Component Testing**: Unit tests for utility functions
- **Integration Testing**: End-to-end user flows
- **Performance Testing**: Core Web Vitals monitoring
- **Accessibility Testing**: WCAG compliance verification

---

**Deep Dive:**

- [Data Flow](data-flow.md) - Understand content processing
- [Performance](performance.md) - Optimization techniques
- [Build System](build-system.md) - Build process details
