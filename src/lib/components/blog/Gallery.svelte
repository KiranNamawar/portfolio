<script lang="ts">
	import Image from '../ui/Image.svelte';
	export let images: Array<{ src: string; alt: string; caption?: string }>;
	export let title: string = 'Gallery';
	export let columns: number = 2;
</script>

<section class="gallery-section">
	<h3 class="gallery-section-title">{title}</h3>
	<div class="gallery-grid" style:--columns={columns}>
		{#each images as image, index}
			<Image
				src={image.src}
				alt={image.alt}
				caption={image.caption}
				fit="cover"
				radius="lg"
				shadow={true}
				loading={index < 4 ? 'eager' : 'lazy'}
				clickToExpand={true}
				aspectRatio="4/3"
			/>
		{/each}
	</div>
</section>

<style>
	.gallery-section {
		margin: var(--space-8) 0;
	}

	.gallery-section-title {
		font-size: var(--text-xl);
		font-weight: 600;
		color: var(--color-text-primary);
		margin-bottom: var(--space-4);
		text-align: center;
	}

	.gallery-grid {
		display: grid;
		gap: var(--space-4);
		grid-template-columns: repeat(var(--columns), 1fr);
	}

	@media (max-width: 768px) {
		.gallery-grid {
			grid-template-columns: 1fr;
			gap: var(--space-3);
		}
	}
</style>
