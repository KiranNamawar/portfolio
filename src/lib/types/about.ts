export interface Social {
	github?: string;
	linkedin?: string;
	twitter?: string;
	instagram?: string;
	youtube?: string;
	website?: string;
}

export interface Stat {
	label: string;
	value: string;
}

export interface Skill {
	name: string;
	level: number;
	icon: string;
}

export interface Experience {
	title: string;
	company: string;
	period: string;
	description: string;
	technologies: string[];
}

export interface AboutData {
	name: string;
	title: string;
	tagline: string;
	bio: string;
	extended_bio?: string;
	location?: string;
	email?: string;
	resume_url?: string;
	social?: Social;
	stats?: Stat[];
	skills?: Skill[];
	experience?: Experience[];
}
