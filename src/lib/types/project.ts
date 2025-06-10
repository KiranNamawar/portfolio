export interface Project {
	slug: string;
	title: string;
	description: string;
	date: string;
	image?: string;
	technologies?: string[];
	github?: string;
	demo?: string;
	featured?: boolean;
	published: boolean;
	readingTime?: number;
	wordCount?: number;
	content?: string;
}
