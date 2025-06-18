---
title: 'Hierarchical Table of Contents Demo'
description: 'A comprehensive demonstration of the new hierarchical, accordion-style Table of Contents with nested headings and smart expand/collapse behavior.'
published: true
date: '2024-01-15'
category: 'Development'
tags: ['UI/UX', 'SvelteKit', 'Navigation', 'Accessibility']
featured: false
badge: tutorial
---

# Hierarchical Table of Contents Demo

This blog post demonstrates the new hierarchical Table of Contents (TOC) with accordion-style navigation. The TOC will automatically expand and collapse sections based on your scroll position, and you can manually toggle sections by clicking the chevron icons.

## Getting Started

This section covers the basics of how the hierarchical TOC works and its key features.

### Key Features

The new TOC includes several important improvements over the traditional flat list approach.

#### Auto-Expand/Collapse

As you scroll through the document, the TOC automatically expands the section you're currently reading and collapses others to keep the navigation clean and focused.

#### Manual Toggle Override

You can manually expand or collapse any section by clicking the chevron icons. This override persists until you navigate to a different section.

### Smart History Management

The TOC uses intelligent history management to provide a better browsing experience.

#### Back Button Behavior

When you click a TOC link and then use the browser's back button, it will take you back to the blog list (or projects list) rather than through each heading you visited.

#### URL Management

The TOC updates the URL hash as you navigate, but uses `replaceState` to avoid cluttering the browser history with every section visit.

## Advanced Features

The TOC includes several advanced features for better usability and accessibility.

### Responsive Design

The TOC adapts to different screen sizes with different behaviors:

#### Desktop Experience

On desktop (1024px+), the TOC appears as a persistent sidebar that doesn't interfere with content reading.

#### Tablet Experience

On tablets (769px-1023px), the TOC appears as an overlay with glass effects and can be toggled via a floating button.

#### Mobile Experience

On mobile devices (≤768px), the TOC appears as a full-width overlay that can be quickly accessed and dismissed.

### Accessibility Features

The TOC is built with accessibility in mind and includes several important features.

#### Keyboard Navigation

All TOC elements are fully keyboard accessible with proper focus management and tab order.

#### Screen Reader Support

The TOC includes proper ARIA labels, roles, and states for screen reader compatibility.

#### Focus Management

When sections expand or collapse, focus is managed appropriately to provide a smooth experience for keyboard users.

## Technical Implementation

This section covers the technical aspects of how the hierarchical TOC is implemented.

### Data Structure

The TOC uses a tree data structure to represent the hierarchical relationship between headings.

#### Tree Building Algorithm

The system converts the flat list of headings into a hierarchical tree structure that maintains parent-child relationships.

#### State Management

Each tree node maintains its own state including expansion status, active status, and manual toggle overrides.

### Performance Optimizations

Several optimizations ensure the TOC performs well even with large documents.

#### Intersection Observer

The system uses Intersection Observer API for efficient scroll-based section detection without impacting scroll performance.

#### Debounced Updates

State updates are debounced to prevent excessive re-renders during rapid scrolling or interaction.

## Usage Examples

Here are some practical examples of how to use the hierarchical TOC effectively.

### Navigation Patterns

The TOC supports several common navigation patterns that users expect from modern documentation.

#### Jump to Section

Click any heading in the TOC to instantly jump to that section in the document.

#### Explore Structure

Use the chevron icons to explore the document structure without scrolling through the entire content.

### Content Organization

The hierarchical TOC encourages better content organization and structure.

#### Logical Hierarchy

The visual hierarchy in the TOC reflects the logical structure of your content, making it easier for readers to understand the relationship between different sections.

#### Progressive Disclosure

The accordion-style interface allows readers to progressively explore content at their own pace, expanding only the sections they're interested in.

## Best Practices

Follow these best practices to get the most out of the hierarchical TOC.

### Content Structure

Organize your content with a clear hierarchical structure for the best TOC experience.

#### Consistent Heading Levels

Use heading levels consistently (don't skip from h2 to h4) to ensure proper tree structure.

#### Meaningful Headings

Write descriptive headings that clearly indicate the content of each section.

### TOC Configuration

The TOC can be configured for different use cases and content types.

#### Minimum Headings Threshold

Set the minimum number of headings required before the TOC appears (default is 3).

#### Auto-Expand Behavior

Configure how sections should auto-expand based on scroll position and user interaction.

## Conclusion

The hierarchical Table of Contents provides a modern, accessible, and user-friendly way to navigate long-form content. With its smart expand/collapse behavior, responsive design, and accessibility features, it enhances the reading experience across all devices and user preferences.

### Future Enhancements

Several potential enhancements could further improve the TOC experience:

#### Search Integration

Adding search functionality to quickly find and jump to specific sections.

#### Reading Progress

Integrating with reading progress indicators to show completion status for each section.

#### Customization Options

Providing more customization options for styling and behavior preferences.

### Getting Started

To start using the hierarchical TOC in your own projects, check out the implementation guide and examples in the documentation.
