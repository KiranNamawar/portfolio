import { generateSitemapEntries, type SitemapEntry } from '$lib/utils/seo.js';
import { getBlogPosts } from '$lib/utils/blog.js';
import { getProjects } from '$lib/utils/project.js';

export async function GET() {
	try {
		// Get blog posts and projects
		const blogPosts = await getBlogPosts();
		const projects = await getProjects();

		// Transform data for sitemap
		const blogData = blogPosts.map((post) => ({
			slug: post.slug,
			date: new Date(post.date).toISOString()
		}));

		const projectData = projects.map((project) => ({
			slug: project.slug,
			date: new Date(project.date).toISOString()
		}));

		// Generate sitemap entries
		const entries = generateSitemapEntries(blogData, projectData);

		// Generate XML sitemap
		const sitemap = generateSitemapXML(entries);

		return new Response(sitemap, {
			headers: {
				'Content-Type': 'application/xml',
				'Cache-Control': 'max-age=3600' // Cache for 1 hour
			}
		});
	} catch (error) {
		console.error('Error generating sitemap:', error);
		return new Response('Error generating sitemap', { status: 500 });
	}
}

function generateSitemapXML(entries: SitemapEntry[]): string {
	const urls = entries
		.map((entry) => {
			const url = entry.url.startsWith('http') ? entry.url : `https://keyrun.site${entry.url}`;
			return `
	<url>
		<loc>${url}</loc>
		${entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : ''}
		${entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : ''}
		${entry.priority ? `<priority>${entry.priority}</priority>` : ''}
	</url>`;
		})
		.join('');

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}
