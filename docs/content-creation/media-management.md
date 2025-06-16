# Media Management

Learn how to effectively manage images, videos, and other media assets in your portfolio. This guide covers organization, optimization, and best practices.

## 📁 Media Organization

### Directory Structure

```
static/
├── 📁 gallery/              # Project screenshots and galleries
│   ├── project-1-hero.jpg
│   ├── project-1-detail.jpg
│   └── project-2-screenshots/
├── 📁 blog/                # Blog post images
│   ├── 2024-06-16-tutorial/
│   └── featured-images/
├── 📁 profile/             # Profile photos and avatars
│   ├── profile.jpg
│   └── profile-variants/
└── 📁 assets/              # General assets
    ├── icons/
    ├── logos/
    └── backgrounds/
```

### Naming Conventions

**Project Images:**

```
project-name-hero.jpg          # Main project image
project-name-screenshot-1.jpg  # Additional screenshots
project-name-gallery-*.jpg     # Gallery images
project-name-mobile.jpg        # Mobile view
project-name-desktop.jpg       # Desktop view
```

**Blog Images:**

```
blog-slug-featured.jpg         # Featured image
blog-slug-figure-1.jpg         # Inline figures
blog-slug-diagram.svg          # Diagrams and illustrations
```

**Profile Images:**

```
profile.jpg                    # Main profile photo
profile-casual.jpg             # Casual photo
profile-professional.jpg       # Professional headshot
avatar-square.jpg              # Square avatar for social
```

## 🖼️ Image Management

### Supported Formats

**Recommended Formats:**

- **JPEG**: Photos, complex images with many colors
- **PNG**: Images with transparency, simple graphics
- **WebP**: Modern format with better compression
- **SVG**: Icons, logos, simple illustrations
- **AVIF**: Next-generation format (when supported)

### Image Optimization

#### Manual Optimization

**Command Line Tools:**

```bash
# Install imagemagick for batch processing
brew install imagemagick  # macOS
sudo apt install imagemagick  # Ubuntu

# Optimize JPEG images
mogrify -strip -interlace Plane -gaussian-blur 0.05 -quality 85% *.jpg

# Resize images
mogrify -resize 1920x1080> *.jpg

# Convert to WebP
for i in *.jpg; do
  cwebp -q 85 "$i" -o "${i%.jpg}.webp"
done
```

**Online Tools:**

- [TinyPNG](https://tinypng.com/) - PNG and JPEG compression
- [Squoosh](https://squoosh.app/) - Modern image optimizer
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - SVG optimization

#### Automated Optimization

**Vite Plugin Setup:**

```bash
bun add -D vite-plugin-imagemin
```

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import { imagemin } from 'vite-plugin-imagemin';

export default defineConfig({
	plugins: [
		imagemin({
			mozjpeg: { quality: 85 },
			pngquant: { quality: [0.65, 0.8] },
			svgo: {
				plugins: [{ name: 'removeViewBox', active: false }]
			}
		})
	]
});
```

### Image Sizes and Responsive Images

#### Standard Sizes

**Project Images:**

- Hero: 1200x675 (16:9 ratio)
- Gallery: 800x600 (4:3 ratio)
- Thumbnails: 400x300 (4:3 ratio)

**Blog Images:**

- Featured: 1200x675 (16:9 ratio)
- Inline: 800x450 (16:9 ratio)
- Figures: Variable based on content

**Profile Images:**

- Main: 400x400 (1:1 ratio)
- Hero: 800x600 (4:3 ratio)
- Avatar: 150x150 (1:1 ratio)

#### Responsive Image Component

```svelte
<!-- src/lib/components/ui/ResponsiveImage.svelte -->
<script lang="ts">
	export let src: string;
	export let alt: string;
	export let sizes: string = '100vw';
	export let width: number;
	export let height: number;
	export let loading: 'lazy' | 'eager' = 'lazy';

	// Generate srcset for different sizes
	const generateSrcSet = (src: string) => {
		const baseName = src.replace(/\.[^/.]+$/, '');
		const extension = src.split('.').pop();

		return [
			`${baseName}-400w.${extension} 400w`,
			`${baseName}-800w.${extension} 800w`,
			`${baseName}-1200w.${extension} 1200w`,
			`${baseName}-1600w.${extension} 1600w`
		].join(', ');
	};
</script>

<img
	{src}
	{alt}
	{width}
	{height}
	{loading}
	srcset={generateSrcSet(src)}
	{sizes}
	class="responsive-image"
/>

<style>
	.responsive-image {
		width: 100%;
		height: auto;
		border-radius: var(--border-radius);
	}
</style>
```

#### Usage in Markdown

```markdown
<ResponsiveImage 
  src="/gallery/project-hero.jpg"
  alt="Project dashboard showing analytics"
  width={1200}
  height={675}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

## 🎥 Video Management

### Video Formats

**Recommended Formats:**

- **MP4 (H.264)**: Universal compatibility
- **WebM (VP9)**: Better compression for modern browsers
- **MOV**: High quality for showcasing work

### Video Optimization

#### Compression Settings

**For Project Demos:**

```bash
# High quality for detailed UI
ffmpeg -i input.mov -c:v libx264 -crf 18 -preset slow -c:a aac -b:a 192k output.mp4

# Smaller file size for web
ffmpeg -i input.mov -c:v libx264 -crf 28 -preset fast -c:a aac -b:a 128k output.mp4

# WebM version
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 30 -b:v 0 -c:a libopus output.webm
```

#### Video Component

```svelte
<!-- src/lib/components/ui/Video.svelte -->
<script lang="ts">
	export let src: string;
	export let poster: string;
	export let autoplay: boolean = false;
	export let loop: boolean = false;
	export let muted: boolean = true;
	export let controls: boolean = true;
	export let width: number = 800;
	export let height: number = 450;
</script>

<video
	{width}
	{height}
	{poster}
	{autoplay}
	{loop}
	{muted}
	{controls}
	class="video-player"
	preload="metadata"
>
	<source src="{src}.webm" type="video/webm" />
	<source src="{src}.mp4" type="video/mp4" />
	<p>Your browser doesn't support video playback.</p>
</video>

<style>
	.video-player {
		width: 100%;
		height: auto;
		border-radius: var(--border-radius);
		box-shadow: var(--shadow-lg);
	}
</style>
```

### Embedded Videos

#### YouTube Integration

```svelte
<!-- src/lib/components/ui/YouTubeEmbed.svelte -->
<script lang="ts">
	export let videoId: string;
	export let title: string;
	export let aspectRatio: string = '16:9';

	const [width, height] = aspectRatio.split(':').map(Number);
	const paddingTop = `${(height / width) * 100}%`;
</script>

<div class="video-container" style="padding-top: {paddingTop}">
	<iframe
		src="https://www.youtube-nocookie.com/embed/{videoId}"
		{title}
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
		allowfullscreen
	></iframe>
</div>

<style>
	.video-container {
		position: relative;
		width: 100%;
		height: 0;
	}

	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: var(--border-radius);
	}
</style>
```

## 📊 Asset Performance

### Loading Strategies

#### Lazy Loading

```svelte
<script lang="ts">
	import { onMount } from 'svelte';

	let imageElement: HTMLImageElement;
	let isVisible = false;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						isVisible = true;
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.1 }
		);

		if (imageElement) {
			observer.observe(imageElement);
		}
	});
</script>

<div bind:this={imageElement} class="image-placeholder">
	{#if isVisible}
		<img {src} {alt} loading="lazy" />
	{:else}
		<div class="skeleton">Loading...</div>
	{/if}
</div>
```

#### Progressive Loading

```svelte
<script lang="ts">
	export let src: string;
	export let placeholder: string;
	export let alt: string;

	let loaded = false;
	let error = false;
</script>

<div class="progressive-image">
	<img src={placeholder} alt="" class="placeholder" class:hidden={loaded} />
	<img
		{src}
		{alt}
		class="main-image"
		class:loaded
		on:load={() => (loaded = true)}
		on:error={() => (error = true)}
	/>
</div>

<style>
	.progressive-image {
		position: relative;
		overflow: hidden;
	}

	.placeholder {
		filter: blur(5px);
		transition: opacity 0.3s ease;
	}

	.placeholder.hidden {
		opacity: 0;
	}

	.main-image {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.main-image.loaded {
		opacity: 1;
	}
</style>
```

### CDN Integration

#### Cloudinary Setup

```typescript
// src/lib/utils/imageOptimization.ts
const CLOUDINARY_CLOUD_NAME = 'your-cloud-name';
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export function getOptimizedImageUrl(
	publicId: string,
	options: {
		width?: number;
		height?: number;
		quality?: number;
		format?: 'auto' | 'webp' | 'jpg' | 'png';
		crop?: 'fill' | 'fit' | 'scale';
	} = {}
) {
	const { width, height, quality = 85, format = 'auto', crop = 'fill' } = options;

	const transformations = [
		`q_${quality}`,
		`f_${format}`,
		width && `w_${width}`,
		height && `h_${height}`,
		crop && `c_${crop}`
	]
		.filter(Boolean)
		.join(',');

	return `${CLOUDINARY_BASE_URL}/${transformations}/${publicId}`;
}
```

## 🎨 Image Editing Workflow

### Batch Processing

**Create Multiple Sizes:**

```bash
#!/bin/bash
# scripts/process-images.sh

for image in src/*.jpg; do
  filename=$(basename "$image" .jpg)

  # Create different sizes
  convert "$image" -resize 400x300^ -gravity center -crop 400x300+0+0 "dist/${filename}-400w.jpg"
  convert "$image" -resize 800x600^ -gravity center -crop 800x600+0+0 "dist/${filename}-800w.jpg"
  convert "$image" -resize 1200x900^ -gravity center -crop 1200x900+0+0 "dist/${filename}-1200w.jpg"

  # Create WebP versions
  cwebp -q 85 "dist/${filename}-400w.jpg" -o "dist/${filename}-400w.webp"
  cwebp -q 85 "dist/${filename}-800w.jpg" -o "dist/${filename}-800w.webp"
  cwebp -q 85 "dist/${filename}-1200w.jpg" -o "dist/${filename}-1200w.webp"
done
```

### Design Tools Integration

**Figma Export:**

- Use Figma plugins for optimized exports
- Set up consistent export presets
- Automate with Figma API for large projects

**Adobe Creative Suite:**

- Save for Web & Devices in Photoshop
- Use Export As in Illustrator for SVGs
- Batch process with Adobe Bridge

## 📋 Media Checklist

### Before Adding Media

- [ ] **Optimize file size**: Compress without losing quality
- [ ] **Choose correct format**: JPEG for photos, PNG for graphics, SVG for icons
- [ ] **Add alt text**: Describe the image for accessibility
- [ ] **Create multiple sizes**: For responsive images
- [ ] **Check copyright**: Ensure you have rights to use the media

### After Adding Media

- [ ] **Test loading**: Verify images load correctly
- [ ] **Check responsive behavior**: Test on different screen sizes
- [ ] **Validate alt text**: Ensure descriptions are helpful
- [ ] **Monitor performance**: Check page load times
- [ ] **Update references**: Ensure all links are correct

## 🔧 Troubleshooting

### Common Issues

**Images Not Loading:**

```bash
# Check file paths
ls -la static/gallery/

# Verify image permissions
chmod 644 static/gallery/*.jpg
```

**Large File Sizes:**

```bash
# Check file sizes
du -h static/gallery/*

# Compress large images
mogrify -strip -interlace Plane -quality 85% static/gallery/*.jpg
```

**Missing Alt Text:**

```bash
# Search for images without alt text
grep -r "<img" src/ | grep -v "alt="
```

---

**Related Documentation:**

- [Creating Projects](creating-projects.md) - Project page creation with media
- [Writing Blogs](writing-blogs.md) - Blog posts with images
- [Performance](../architecture/performance.md) - Media performance optimization
