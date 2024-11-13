export type BlogListItem = {
	slug: string;
	title: string;
	description: string;
	publishedAt: Date;
};

export type BlogList = BlogListItem[];

export type BlogContent = {
	slug: string;
	title: string;
	description: string;
	publishedAt: Date;
	updatedAt?: Date;
	authors?: string[];
	noindex?: boolean;
	content: string;
};

export interface IBlogRepository {
	getBlogs(): Promise<BlogList>;
	getBlogDetail(slug: string): Promise<BlogContent>;
}
