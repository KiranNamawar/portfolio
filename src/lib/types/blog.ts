export interface BlogHeading {
	id: string;
	text: string;
	level: number; // 1-6 for h1-h6
}

export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags?: string[];
	category?: string;
	published: boolean;
	featured?: boolean;
	readingTime?: number;
	wordCount?: number;
	image?: string;
	content?: string;
	headings?: BlogHeading[];
}
