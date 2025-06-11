<!-- Enhanced Grid/Net background with animations and effects -->
<script lang="ts">
	export let variant: 'default' | 'subtle' | 'vibrant' = 'vibrant';
	export let gridSize: number = 50; // Size of grid squares in pixels
	export let lineWidth: number = 1; // Width of grid lines
	export let perspective: boolean = true; // 3D perspective effect
</script>

<div
	class="grid-background {variant}"
	class:perspective
	style="--grid-size: {gridSize}px; --line-width: {lineWidth}px"
>
	<div class="grid-lines"></div>
	<div class="grid-accent-lines"></div>
	<div class="grid-highlights"></div>
</div>

<style>
	.grid-background {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: -1;
		overflow: hidden;
	}
	.grid-lines {
		width: 100%;
		height: 100%;
		background-image:
			linear-gradient(
				to right,
				rgba(51, 65, 85, 0.15) var(--line-width),
				transparent var(--line-width)
			),
			linear-gradient(
				to bottom,
				rgba(71, 85, 105, 0.15) var(--line-width),
				transparent var(--line-width)
			);
		background-size: var(--grid-size) var(--grid-size);
	}
	.grid-accent-lines {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image:
			linear-gradient(
				to right,
				rgba(30, 41, 59, 0.2) calc(var(--line-width) * 2),
				transparent calc(var(--line-width) * 2)
			),
			linear-gradient(
				to bottom,
				rgba(15, 23, 42, 0.2) calc(var(--line-width) * 2),
				transparent calc(var(--line-width) * 2)
			);
		background-size: calc(var(--grid-size) * 5) calc(var(--grid-size) * 5);
	}

	.grid-highlights {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image:
			radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 40%),
			radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.06) 0%, transparent 40%),
			radial-gradient(circle at 50% 20%, rgba(34, 197, 94, 0.05) 0%, transparent 35%);
		opacity: 0.7;
	}
	/* Perspective 3D effect */
	.perspective {
		transform: perspective(1000px) rotateX(20deg);
		transform-origin: center top;
	}

	.perspective .grid-lines {
		transform: translateZ(-100px);
	}

	.perspective .grid-accent-lines {
		transform: translateZ(-50px);
	}

	.perspective .grid-highlights {
		transform: translateZ(0);
	} /* Variant styles */
	.subtle .grid-lines {
		background-image:
			linear-gradient(
				to right,
				rgba(99, 102, 241, 0.15) var(--line-width),
				transparent var(--line-width)
			),
			linear-gradient(
				to bottom,
				rgba(99, 102, 241, 0.15) var(--line-width),
				transparent var(--line-width)
			);
	}

	.subtle .grid-accent-lines {
		background-image:
			linear-gradient(
				to right,
				rgba(168, 85, 247, 0.2) calc(var(--line-width) * 2),
				transparent calc(var(--line-width) * 2)
			),
			linear-gradient(
				to bottom,
				rgba(236, 72, 153, 0.2) calc(var(--line-width) * 2),
				transparent calc(var(--line-width) * 2)
			);
	}

	.vibrant .grid-lines {
		background-image:
			linear-gradient(
				to right,
				rgba(99, 102, 241, 0.5) var(--line-width),
				transparent var(--line-width)
			),
			linear-gradient(
				to bottom,
				rgba(99, 102, 241, 0.5) var(--line-width),
				transparent var(--line-width)
			);
	}

	.vibrant .grid-accent-lines {
		background-image:
			linear-gradient(
				to right,
				rgba(168, 85, 247, 0.6) calc(var(--line-width) * 2),
				transparent calc(var(--line-width) * 2)
			),
			linear-gradient(
				to bottom,
				rgba(236, 72, 153, 0.6) calc(var(--line-width) * 2),
				transparent calc(var(--line-width) * 2)
			);
	} /* Dark mode adjustments - LIGHT COLORS */
	:global(.dark) .grid-lines {
		background-image:
			linear-gradient(
				to right,
				rgba(255, 255, 255, 0.08) var(--line-width),
				transparent var(--line-width)
			),
			linear-gradient(
				to bottom,
				rgba(255, 255, 255, 0.08) var(--line-width),
				transparent var(--line-width)
			);
	}

	:global(.dark) .grid-accent-lines {
		background-image:
			linear-gradient(
				to right,
				rgba(255, 255, 255, 0.12) calc(var(--line-width) * 2),
				transparent calc(var(--line-width) * 2)
			),
			linear-gradient(
				to bottom,
				rgba(255, 255, 255, 0.12) calc(var(--line-width) * 2),
				transparent calc(var(--line-width) * 2)
			);
	}

	/* Dark mode variant adjustments */
	:global(.dark) .subtle .grid-lines {
		background-image:
			linear-gradient(
				to right,
				rgba(255, 255, 255, 0.04) var(--line-width),
				transparent var(--line-width)
			),
			linear-gradient(
				to bottom,
				rgba(255, 255, 255, 0.04) var(--line-width),
				transparent var(--line-width)
			);
	}

	:global(.dark) .subtle .grid-accent-lines {
		background-image:
			linear-gradient(
				to right,
				rgba(255, 255, 255, 0.06) calc(var(--line-width) * 2),
				transparent calc(var(--line-width) * 2)
			),
			linear-gradient(
				to bottom,
				rgba(255, 255, 255, 0.06) calc(var(--line-width) * 2),
				transparent calc(var(--line-width) * 2)
			);
	}

	:global(.dark) .vibrant .grid-lines {
		background-image:
			linear-gradient(
				to right,
				rgba(255, 255, 255, 0.15) var(--line-width),
				transparent var(--line-width)
			),
			linear-gradient(
				to bottom,
				rgba(255, 255, 255, 0.15) var(--line-width),
				transparent var(--line-width)
			);
	}

	:global(.dark) .vibrant .grid-accent-lines {
		background-image:
			linear-gradient(
				to right,
				rgba(255, 255, 255, 0.2) calc(var(--line-width) * 2),
				transparent calc(var(--line-width) * 2)
			),
			linear-gradient(
				to bottom,
				rgba(255, 255, 255, 0.2) calc(var(--line-width) * 2),
				transparent calc(var(--line-width) * 2)
			);
	}

	/* Mobile optimizations */
	@media (max-width: 768px) {
		.grid-background {
			--grid-size: 40px;
		}
	}
</style>
