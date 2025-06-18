export interface ProjectHeading {
	id: string;
	text: string;
	level: number; // 1-6 for h1-h6
}

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
	badge?: 'demo' | 'prototype' | 'example' | 'template' | string;
	readingTime?: number;
	wordCount?: number;
	content?: string;
	headings?: ProjectHeading[];
	[key: string]: unknown; // Index signature for compatibility
}
