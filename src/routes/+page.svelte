<script lang="ts">
	import Hero from '$lib/components/home/Hero.svelte';
	import About from '$lib/components/home/About.svelte';
	import Projects from '$lib/components/home/FeaturedProjects.svelte';
	import Contact from '$lib/components/home/Contact.svelte';
	import SEOHead from '$lib/components/ui/SEOHead.svelte';
	import { personalInfo } from '$lib/data/personal.js';
</script>

<SEOHead
	data={{
		title: `${personalInfo.title} - ${personalInfo.name}`,
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

<Hero />
<About />
<Projects />
<Contact />
