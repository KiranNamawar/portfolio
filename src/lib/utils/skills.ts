/**
 * Skills data utilities for loading and processing skill information
 */

import skillsData from '../../data/skills.json';
import type { SkillLevel, SkillCategory, Skill } from '$lib/types/skills';

/**
 * Get all skill levels with their configurations
 */
export function getSkillLevels(): Record<string, SkillLevel> {
	return skillsData.skillLevels as Record<string, SkillLevel>;
}

/**
 * Get all skill categories with their configurations
 */
export function getSkillCategories(): Record<string, SkillCategory> {
	return skillsData.categories as Record<string, SkillCategory>;
}

/**
 * Get all skills
 */
export function getAllSkills(): Skill[] {
	return skillsData.skills as Skill[];
}

/**
 * Get skills filtered by category
 */
export function getSkillsByCategory(category: string): Skill[] {
	return getAllSkills().filter((skill) => skill.category === category);
}

/**
 * Get skills filtered by level
 */
export function getSkillsByLevel(level: string): Skill[] {
	return getAllSkills().filter((skill) => skill.level === level);
}

/**
 * Get skill by ID
 */
export function getSkillById(id: string): Skill | undefined {
	return getAllSkills().find((skill) => skill.id === id);
}

/**
 * Get skills sorted by experience level (highest to lowest)
 */
export function getSkillsByExperience(): Skill[] {
	const skillLevels = getSkillLevels();
	return getAllSkills().sort((a, b) => {
		const aLevel = skillLevels[a.level]?.order || 0;
		const bLevel = skillLevels[b.level]?.order || 0;
		return bLevel - aLevel;
	});
}

/**
 * Get skills grouped by category with category metadata
 */
export function getSkillsGroupedByCategory(): Array<{
	category: string;
	categoryInfo: SkillCategory;
	skills: Skill[];
}> {
	const categories = getSkillCategories();
	const skills = getAllSkills();

	return Object.entries(categories)
		.map(([categoryKey, categoryInfo]) => ({
			category: categoryKey,
			categoryInfo,
			skills: skills.filter((skill) => skill.category === categoryKey)
		}))
		.filter((group) => group.skills.length > 0);
}

/**
 * Get recently used skills (within specified months)
 */
export function getRecentlyUsedSkills(withinMonths: number = 6): Skill[] {
	const cutoffDate = new Date();
	cutoffDate.setMonth(cutoffDate.getMonth() - withinMonths);

	return getAllSkills().filter((skill) => {
		if (!skill.lastUsed) return false;
		const lastUsedDate = new Date(skill.lastUsed);
		return lastUsedDate >= cutoffDate;
	});
}

/**
 * Get skills with most projects completed
 */
export function getMostActiveSkills(limit: number = 10): Skill[] {
	return getAllSkills()
		.sort((a, b) => (b.projectsCompleted || 0) - (a.projectsCompleted || 0))
		.slice(0, limit);
}

/**
 * Get skills by topic/keyword search
 */
export function searchSkillsByTopic(searchTerm: string): Skill[] {
	const term = searchTerm.toLowerCase();
	return getAllSkills().filter(
		(skill) =>
			skill.topics.some((topic: string) => topic.toLowerCase().includes(term)) ||
			skill.name.toLowerCase().includes(term) ||
			skill.description.toLowerCase().includes(term)
	);
}

/**
 * Get related skills for a given skill ID
 */
export function getRelatedSkills(skillId: string): Skill[] {
	const skill = getSkillById(skillId);
	if (!skill || !skill.relatedSkills) return [];

	return skill.relatedSkills.map((id: string) => getSkillById(id)).filter(Boolean) as Skill[];
}

/**
 * Get skill statistics
 */
export function getSkillStatistics() {
	const skills = getAllSkills();
	const skillLevels = getSkillLevels();
	const categories = getSkillCategories();

	const totalSkills = skills.length;
	const levelCounts = Object.keys(skillLevels).reduce(
		(acc, level) => {
			acc[level] = skills.filter((skill) => skill.level === level).length;
			return acc;
		},
		{} as Record<string, number>
	);

	const categoryCounts = Object.keys(categories).reduce(
		(acc, category) => {
			acc[category] = skills.filter((skill) => skill.category === category).length;
			return acc;
		},
		{} as Record<string, number>
	);

	const totalYearsExperience = skills.reduce(
		(sum, skill) => sum + (skill.yearsOfExperience || 0),
		0
	);
	const totalProjectsCompleted = skills.reduce(
		(sum, skill) => sum + (skill.projectsCompleted || 0),
		0
	);

	return {
		totalSkills,
		levelCounts,
		categoryCounts,
		averageYearsExperience: Math.round((totalYearsExperience / totalSkills) * 10) / 10,
		totalProjectsCompleted
	};
}

/**
 * Get skills for homepage showcase (filtered and organized)
 */
export function getHomepageSkills(): Array<{
	id: string;
	title: string;
	description: string;
	icon: string;
	color: string;
	skills: Skill[];
}> {
	const categories = getSkillCategories();
	const skills = getAllSkills();

	// Define which categories to show on homepage and their order
	const homepageCategories = ['frontend', 'backend', 'devops'];

	return homepageCategories
		.map((categoryKey) => {
			const categoryInfo = categories[categoryKey];
			const categorySkills = skills
				.filter((skill) => skill.category === categoryKey)
				.sort((a, b) => {
					const skillLevels = getSkillLevels();
					const aLevel = skillLevels[a.level]?.order || 0;
					const bLevel = skillLevels[b.level]?.order || 0;
					return bLevel - aLevel; // Highest level first
				});

			return {
				id: categoryKey,
				title: categoryInfo.label,
				description: categoryInfo.description,
				icon: categoryInfo.icon,
				color: categoryInfo.color,
				skills: categorySkills
			};
		})
		.filter((category) => category.skills.length > 0);
}

/**
 * Legacy compatibility - convert to old format for gradual migration
 * @deprecated Use the new functions above instead
 */
export function getLegacySkills(): Array<{
	name: string;
	level: string;
	icon: string;
	category: string;
	achievements?: string[];
	description?: string;
}> {
	return getAllSkills().map((skill) => ({
		name: skill.name,
		level: skill.level,
		icon: skill.icon,
		category: skill.category,
		achievements: skill.achievements,
		description: skill.description
	}));
}

/**
 * Legacy compatibility - get skill levels in old format
 * @deprecated Use getSkillLevels() instead
 */
export function getLegacySkillLevels(): Record<
	string,
	{ order: number; label: string; color: string }
> {
	const levels = getSkillLevels();
	return Object.entries(levels).reduce(
		(acc, [key, level]) => {
			acc[key] = {
				order: level.order,
				label: level.label,
				color: `from-${level.color.replace('#', '')}-400 to-${level.color.replace('#', '')}-500`
			};
			return acc;
		},
		{} as Record<string, { order: number; label: string; color: string }>
	);
}
