<script lang="ts">
	import IntroSection from '$lib/components/home/IntroSection.svelte';
	import SkillsShowcase from '$lib/components/home/SkillsShowcase.svelte';
	import ProjectsPreview from '$lib/components/home/ProjectsPreview.svelte';
	import BlogPreview from '$lib/components/home/BlogPreview.svelte';
	import ConnectSection from '$lib/components/home/ConnectSection.svelte';
	import SEOHead from '$lib/components/ui/SEOHead.svelte';
	import { personalInfo } from '$lib/data/personal.js';
</script>

<SEOHead
	data={{
		title: `Home`,
		description: personalInfo.bio,
		keywords: [
			'full stack developer',
			'web developer',
			'software engineer',
			'portfolio',
			'react',
			'svelte',
			'typescript',
			'javascript'
		],
		type: 'profile',
		url: '/',
		image: '/og-image.png'
	}}
/>

<main id="main-content" class="homepage">
	<IntroSection />
	<SkillsShowcase />
	<ProjectsPreview />
	<BlogPreview />
	<ConnectSection />
</main>

<style>
	.homepage {
		min-height: 100vh;
		position: relative;
	}
</style>
