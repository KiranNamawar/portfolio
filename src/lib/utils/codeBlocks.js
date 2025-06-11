// Ultra-lightweight copy functionality for code blocks
export function initializeCodeBlocks() {
	document.addEventListener('click', async (e) => {
		const btn = e.target?.closest?.('.code-block-copy-btn');
		if (!btn?.dataset?.code) return;

		try {
			// Decode base64 encoded code
			const code = atob(btn.dataset.code);

			await navigator.clipboard.writeText(code);

			// Store original icon
			const originalHTML = btn.innerHTML;

			// Show success tick mark
			btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="20,6 9,17 4,12"></polyline>
			</svg>`;
			btn.style.color = 'var(--success-500)';

			// Restore original icon after 1.5 seconds
			setTimeout(() => {
				btn.innerHTML = originalHTML;
				btn.style.color = '';
			}, 1500);
		} catch {
			// Show error state
			btn.style.color = 'var(--danger-500)';
			setTimeout(() => (btn.style.color = ''), 1500);
		}
	});
}
