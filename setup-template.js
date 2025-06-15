#!/usr/bin/env node

/**
 * Template Setup Script
 *
 * This script helps new users quickly customize the portfolio template
 * by prompting for essential information and updating the necessary files.
 *
 * Usage: node setup-template.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { createInterface } from 'readline';

// ANSI color codes for better output
const colors = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	green: '\x1b[32m',
	blue: '\x1b[34m',
	yellow: '\x1b[33m',
	red: '\x1b[31m',
	cyan: '\x1b[36m'
};

// Helper function to colorize output
const colorize = (text, color) => `${colors[color]}${text}${colors.reset}`;

// Create readline interface
const rl = createInterface({
	input: process.stdin,
	output: process.stdout
});

// Helper function to prompt user for input
const prompt = (question) => {
	return new Promise((resolve) => {
		rl.question(question, resolve);
	});
};

// Template customization data
let templateData = {};

async function main() {
	console.log(colorize('\n🎉 Welcome to the SvelteKit Portfolio Template Setup!', 'bright'));
	console.log(
		colorize('This script will help you customize the template with your information.\n', 'cyan')
	);

	try {
		// Gather user information
		await gatherUserInfo();

		// Update configuration files
		await updateConfigFiles();

		// Show next steps
		showNextSteps();

		console.log(colorize('\n✅ Template setup complete!', 'green'));
		console.log(colorize('Your portfolio is ready to customize further.\n', 'cyan'));
	} catch (error) {
		console.error(colorize('❌ Error during setup:', 'red'), error.message);
		process.exit(1);
	} finally {
		rl.close();
	}
}

async function gatherUserInfo() {
	console.log(colorize('📝 Please provide your information:\n', 'blue'));

	// Personal information
	templateData.name = await prompt('Your full name: ');
	templateData.title = await prompt('Your professional title (e.g., "Full Stack Developer"): ');
	templateData.email = await prompt('Your email address: ');
	templateData.location = await prompt('Your location (e.g., "San Francisco, CA"): ');
	templateData.bio = await prompt('Short professional bio (1-2 sentences): ');

	console.log(colorize('\n🔗 Social media links (press Enter to skip any):\n', 'blue'));

	// Social media links
	templateData.github = await prompt('GitHub URL (https://github.com/username): ');
	templateData.linkedin = await prompt('LinkedIn URL (https://linkedin.com/in/username): ');
	templateData.twitter = await prompt('Twitter URL (https://twitter.com/username): ');

	console.log(colorize('\n🌐 Website information:\n', 'blue'));

	// Website settings
	templateData.siteTitle =
		(await prompt(`Site title (default: "${templateData.name} - Portfolio"): `)) ||
		`${templateData.name} - Portfolio`;
	templateData.siteDescription = await prompt('Site description for SEO: ');
	templateData.siteUrl = await prompt('Your website URL (for production): ');

	console.log(colorize('\n💻 Technical skills (comma-separated):\n', 'blue'));

	// Skills
	templateData.frontendSkills = await prompt(
		'Frontend technologies (e.g., JavaScript, React, Vue): '
	);
	templateData.backendSkills = await prompt(
		'Backend technologies (e.g., Node.js, Python, PostgreSQL): '
	);
	templateData.tools = await prompt('Tools and platforms (e.g., Git, Docker, AWS): ');
}

async function updateConfigFiles() {
	console.log(colorize('\n🔧 Updating configuration files...', 'yellow'));

	try {
		// Update template.config.js
		await updateTemplateConfig();

		// Update app.html
		await updateAppHtml();

		// Update personal.js
		await updatePersonalJs();

		console.log(colorize('✅ Configuration files updated successfully!', 'green'));
	} catch (error) {
		throw new Error(`Failed to update configuration files: ${error.message}`);
	}
}

async function updateTemplateConfig() {
	const configPath = 'template.config.js';

	try {
		let configContent = readFileSync(configPath, 'utf8');

		// Replace placeholder values
		configContent = configContent
			.replace('name: "Your Name"', `name: "${templateData.name}"`)
			.replace('title: "Your Professional Title"', `title: "${templateData.title}"`)
			.replace('email: "your.email@domain.com"', `email: "${templateData.email}"`)
			.replace('location: "Your City, Country"', `location: "${templateData.location}"`)
			.replace(
				'bio: "Your professional bio or elevator pitch. Keep it concise but engaging."',
				`bio: "${templateData.bio}"`
			)
			.replace('title: "Your Name - Portfolio"', `title: "${templateData.siteTitle}"`)
			.replace(
				'description: "Professional portfolio showcasing my work in web development and design"',
				`description: "${templateData.siteDescription}"`
			)
			.replace('url: "https://yoursite.com"', `url: "${templateData.siteUrl}"`);

		// Update social media links
		if (templateData.github) {
			configContent = configContent.replace(
				'github: "https://github.com/yourusername"',
				`github: "${templateData.github}"`
			);
		}
		if (templateData.linkedin) {
			configContent = configContent.replace(
				'linkedin: "https://linkedin.com/in/yourusername"',
				`linkedin: "${templateData.linkedin}"`
			);
		}
		if (templateData.twitter) {
			configContent = configContent.replace(
				'twitter: "https://twitter.com/yourusername"',
				`twitter: "${templateData.twitter}"`
			);
		}

		writeFileSync(configPath, configContent);
		console.log(colorize('  ✓ template.config.js updated', 'green'));
	} catch (error) {
		throw new Error(`Failed to update template.config.js: ${error.message}`);
	}
}

async function updateAppHtml() {
	const appHtmlPath = 'src/app.html';

	try {
		let htmlContent = readFileSync(appHtmlPath, 'utf8');

		// Update meta tags
		htmlContent = htmlContent
			.replace('<title>%sveltekit.title%</title>', `<title>${templateData.siteTitle}</title>`)
			.replace(
				'<meta name="description" content="%sveltekit.description%" />',
				`<meta name="description" content="${templateData.siteDescription}" />`
			)
			.replace(
				'<meta property="og:title" content="%sveltekit.title%" />',
				`<meta property="og:title" content="${templateData.siteTitle}" />`
			)
			.replace(
				'<meta property="og:description" content="%sveltekit.description%" />',
				`<meta property="og:description" content="${templateData.siteDescription}" />`
			);

		writeFileSync(appHtmlPath, htmlContent);
		console.log(colorize('  ✓ src/app.html updated', 'green'));
	} catch {
		console.log(colorize('  ⚠ Could not update app.html (file might not exist yet)', 'yellow'));
	}
}

async function updatePersonalJs() {
	const personalJsPath = 'src/lib/data/personal.js';

	try {
		// Create a basic personal.js file if it doesn't exist
		const personalJsContent = `// Personal information configuration
// This file contains your personal information used throughout the portfolio

export const personalInfo = {
  name: "${templateData.name}",
  title: "${templateData.title}",
  email: "${templateData.email}",
  location: "${templateData.location}",
  bio: "${templateData.bio}",
  
  social: {
    ${templateData.github ? `github: "${templateData.github}",` : '// github: "https://github.com/yourusername",'}
    ${templateData.linkedin ? `linkedin: "${templateData.linkedin}",` : '// linkedin: "https://linkedin.com/in/yourusername",'}
    ${templateData.twitter ? `twitter: "${templateData.twitter}",` : '// twitter: "https://twitter.com/yourusername",'}
    email: "mailto:${templateData.email}"
  },
  
  skills: {
    frontend: [${
			templateData.frontendSkills
				? templateData.frontendSkills
						.split(',')
						.map((s) => `"${s.trim()}"`)
						.join(', ')
				: '"JavaScript", "HTML", "CSS"'
		}],
    backend: [${
			templateData.backendSkills
				? templateData.backendSkills
						.split(',')
						.map((s) => `"${s.trim()}"`)
						.join(', ')
				: '"Node.js", "Python"'
		}],
    tools: [${
			templateData.tools
				? templateData.tools
						.split(',')
						.map((s) => `"${s.trim()}"`)
						.join(', ')
				: '"Git", "VS Code"'
		}]
  }
};

export default personalInfo;
`;

		writeFileSync(personalJsPath, personalJsContent);
		console.log(colorize('  ✓ src/lib/data/personal.js created', 'green'));
	} catch {
		console.log(
			colorize('  ⚠ Could not create personal.js (directory might not exist yet)', 'yellow')
		);
	}
}

function showNextSteps() {
	console.log(colorize('\n🎯 Next Steps:', 'bright'));
	console.log(colorize('1. Replace static/profile.svg with your profile photo', 'cyan'));
	console.log(colorize('2. Create your first blog post in src/content/blogs/', 'cyan'));
	console.log(colorize('3. Add your first project in src/content/projects/', 'cyan'));
	console.log(colorize('4. Run the development server: bun dev (or npm run dev)', 'cyan'));
	console.log(colorize('5. Customize colors in src/styles/variables.css', 'cyan'));
	console.log(colorize('6. Deploy your portfolio to your preferred platform', 'cyan'));

	console.log(colorize('\n📚 Helpful Resources:', 'bright'));
	console.log(colorize('• Template Guide: docs/getting-started/using-as-template.md', 'cyan'));
	console.log(colorize('• Writing Blogs: docs/content-creation/writing-blogs.md', 'cyan'));
	console.log(colorize('• Adding Projects: docs/content-creation/creating-projects.md', 'cyan'));
	console.log(colorize('• Customization: docs/maintenance/README.md', 'cyan'));
}

// Run the setup script
main().catch((error) => {
	console.error(colorize('❌ Setup failed:', 'red'), error.message);
	process.exit(1);
});
