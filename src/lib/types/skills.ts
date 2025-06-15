/**
 * TypeScript types for skills data structure
 */

export interface SkillLevel {
	order: number;
	label: string;
	description: string;
	color: string;
	bgColor: string;
	borderColor: string;
}

export interface SkillCategory {
	label: string;
	description: string;
	icon: string;
	color: string;
}

export interface Skill {
	id: string;
	name: string;
	level: string;
	category: string;
	icon: string;
	description: string;
	topics: string[];
	achievements: string[];
	yearsOfExperience?: number;
	projectsCompleted?: number;
	lastUsed?: string;
	certifications?: string[];
	relatedSkills?: string[];
}

export interface SkillsData {
	skillLevels: Record<string, SkillLevel>;
	categories: Record<string, SkillCategory>;
	skills: Skill[];
}

export interface SkillStatistics {
	totalSkills: number;
	levelCounts: Record<string, number>;
	categoryCounts: Record<string, number>;
	averageYearsExperience: number;
	totalProjectsCompleted: number;
}

export interface HomepageSkillCategory {
	id: string;
	title: string;
	description: string;
	icon: string;
	color: string;
	skills: Skill[];
}

export interface SkillCategoryGroup {
	category: string;
	categoryInfo: SkillCategory;
	skills: Skill[];
}

// Legacy types for backward compatibility
export interface LegacySkill {
	name: string;
	level: string;
	icon: string;
	category: string;
	achievements?: string[];
	description?: string;
}

export interface LegacySkillLevel {
	order: number;
	label: string;
	color: string;
}
