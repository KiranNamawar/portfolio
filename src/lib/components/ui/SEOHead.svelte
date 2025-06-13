<script lang="ts">
	import {
		generateSEOTags,
		generateStructuredData,
		generateBreadcrumbData,
		createPageTitle,
		type SEOData
	} from '$lib/utils/seo.js';

	interface Props {
		data: SEOData;
		breadcrumbs?: Array<{ name: string; url: string }>;
		structuredData?: boolean;
	}

	let { data, breadcrumbs = [], structuredData = true }: Props = $props();

	// Generate meta tags
	const metaTags = generateSEOTags(data);

	// Generate structured data
	const jsonLd = structuredData ? generateStructuredData(data) : null;

	// Generate breadcrumb data
	const breadcrumbData = breadcrumbs.length > 0 ? generateBreadcrumbData(breadcrumbs) : null;

	// Create optimized title
	const pageTitle = createPageTitle(data.title);
</script>

<svelte:head>
	<!-- Title -->
	<title>{pageTitle}</title>

	<!-- Basic Meta Tags -->
	<meta name="description" content={metaTags.description} />
	<meta name="author" content={metaTags.author} />

	{#if metaTags.keywords}
		<meta name="keywords" content={metaTags.keywords} />
	{/if}

	<!-- Canonical URL -->
	<link rel="canonical" href={metaTags.canonical} />

	<!-- Open Graph -->
	<meta property="og:title" content={metaTags['og:title']} />
	<meta property="og:description" content={metaTags['og:description']} />
	<meta property="og:url" content={metaTags['og:url']} />
	<meta property="og:image" content={metaTags['og:image']} />
	<meta property="og:image:alt" content={metaTags['og:image:alt']} />
	<meta property="og:type" content={metaTags['og:type']} />
	<meta property="og:site_name" content={metaTags['og:site_name']} />
	<meta property="og:locale" content={metaTags['og:locale']} />

	<!-- Article specific Open Graph -->
	{#if metaTags['og:type'] === 'article'}
		<meta property="article:author" content={metaTags['article:author']} />
		{#if metaTags['article:published_time']}
			<meta property="article:published_time" content={metaTags['article:published_time']} />
		{/if}
		{#if metaTags['article:modified_time']}
			<meta property="article:modified_time" content={metaTags['article:modified_time']} />
		{/if}
		{#if metaTags['article:tag']}
			<meta property="article:tag" content={metaTags['article:tag']} />
		{/if}
	{/if}

	<!-- Twitter Card -->
	<meta name="twitter:card" content={metaTags['twitter:card']} />
	<meta name="twitter:title" content={metaTags['twitter:title']} />
	<meta name="twitter:description" content={metaTags['twitter:description']} />
	<meta name="twitter:image" content={metaTags['twitter:image']} />
	<meta name="twitter:image:alt" content={metaTags['twitter:image:alt']} />

	{#if metaTags['twitter:site']}
		<meta name="twitter:site" content={metaTags['twitter:site']} />
	{/if}
	{#if metaTags['twitter:creator']}
		<meta name="twitter:creator" content={metaTags['twitter:creator']} />
	{/if}

	<!-- Additional Meta -->
	<meta name="theme-color" content={metaTags['theme-color']} />
	<meta name="color-scheme" content={metaTags['color-scheme']} />

	{#if metaTags['reading-time']}
		<meta name="reading-time" content={metaTags['reading-time']} />
	{/if}

	<!-- Robots and SEO -->
	<meta
		name="robots"
		content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
	/>
	<meta name="googlebot" content="index, follow" />

	<!-- Preconnect to external domains for performance -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link rel="preconnect" href="https://cdn.jsdelivr.net" />

	<!-- Structured Data -->
	{#if jsonLd}
		{@html `<script type="application/ld+json">${jsonLd}</script>`}
	{/if}

	<!-- Breadcrumb Structured Data -->
	{#if breadcrumbData}
		{@html `<script type="application/ld+json">${breadcrumbData}</script>`}
	{/if}
</svelte:head>
