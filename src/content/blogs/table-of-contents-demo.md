---
title: 'Table of Contents Demo'
description: 'A comprehensive guide demonstrating the Table of Contents component with multiple heading levels and sections.'
date: '2025-06-13'
tags: ['demo', 'ui', 'component']
published: true
featured: false
badge: demo
---

# Table of Contents Demo

This is a demonstration of the Table of Contents component that automatically generates navigation for your blog posts and project documentation.

## Overview

The Table of Contents (TOC) component provides an elegant way to navigate through long-form content. It automatically detects headings in your content and creates a floating navigation panel.

### Key Features

The TOC component offers several powerful features:

- **Automatic Detection**: Scans your content for headings (h2-h6)
- **Active Section Highlighting**: Shows which section you're currently reading
- **Smooth Scrolling**: Provides smooth navigation between sections
- **Responsive Design**: Adapts to different screen sizes
- **Glassmorphism Design**: Follows your design system's glass effects

#### Implementation Details

The component uses modern web APIs to provide the best user experience:

##### Intersection Observer API

The component uses the Intersection Observer API to track which section is currently visible in the viewport. This provides accurate active section highlighting without performance overhead.

##### Smooth Scrolling

When you click on a TOC link, the page smoothly scrolls to the target section using the native `scrollIntoView` method with smooth behavior.

## Getting Started

To use the Table of Contents component in your project, simply import and include it in your layout components.

### Installation

The component is already integrated into your blog and project layouts. It will automatically appear when your content has 3 or more headings.

### Configuration Options

You can customize the TOC behavior with several props:

- `isOpen`: Controls the initial open/closed state
- `showToggle`: Shows or hides the toggle button
- `minHeadings`: Minimum number of headings required to show the TOC

## Advanced Usage

### Custom Styling

The component follows your existing design system and CSS variables. You can customize its appearance by modifying the CSS variables in your theme.

### Mobile Optimization

On mobile devices, the TOC adapts its behavior:

- Positioned above the floating dock
- Automatically closes after navigation
- Responsive sizing for smaller screens

## Best Practices

### Content Structure

For the best TOC experience, follow these content structure guidelines:

#### Logical Heading Hierarchy

Use headings in a logical order (h2, then h3, then h4, etc.) to create a clear content hierarchy.

#### Descriptive Headings

Write clear, descriptive headings that accurately represent the section content.

### Performance Considerations

The TOC component is optimized for performance:

- Uses Intersection Observer for efficient scroll tracking
- Implements proper cleanup to prevent memory leaks
- Minimal DOM manipulation for smooth interactions

## Accessibility Features

The component includes several accessibility enhancements:

### Keyboard Navigation

- Escape key closes the TOC
- Proper focus management
- Screen reader friendly labels

### ARIA Attributes

The component uses appropriate ARIA attributes to ensure compatibility with assistive technologies.

## Browser Support

The Table of Contents component works in all modern browsers:

- Chrome 58+
- Firefox 55+
- Safari 12+
- Edge 79+

## Conclusion

The Table of Contents component enhances the reading experience by providing easy navigation through your content. It automatically adapts to your content structure and provides a seamless, accessible way for users to jump between sections.

Whether you're writing technical documentation, long-form blog posts, or project documentation, the TOC component will help your readers navigate your content more effectively.
