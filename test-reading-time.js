import fs from 'fs';
const content = fs.readFileSync('src/content/blogs/welcome.md', 'utf8');

// Simple word count calculation
const cleanText = content
	.replace(/^---[\s\S]*?---/, '') // Remove frontmatter
	.replace(/<[^>]*>/g, '') // Remove HTML
	.replace(/```[\s\S]*?```/g, '') // Remove code blocks
	.replace(/`[^`]*`/g, '') // Remove inline code
	.replace(/[#*_~]/g, '') // Remove markdown
	.replace(/\s+/g, ' ')
	.trim();

const words = cleanText.split(/\s+/).filter((w) => w.length > 0).length;
const readingTime = Math.max(1, Math.ceil(words / 200));

console.log('Word count:', words);
console.log('Calculated reading time:', readingTime, 'minutes');
console.log('Frontmatter reading time:', 2, 'minutes');
console.log('');
console.log('The reading time is coming from: FRONTMATTER (not calculated)');
