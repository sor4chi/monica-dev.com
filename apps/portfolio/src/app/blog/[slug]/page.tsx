import { FSBlogRepository } from "@/infrastructure/repository/fs/blog";
import { markdownProcessor } from "@/lib/unified";
import { Article } from "@sor4chi/ui";
import { renderMdast } from "@sor4chi/unified-plugins/react";
import type { Root } from "mdast";
import Link from "next/link";
import { Layout } from "./_components/layout";

interface BlogDetailParams {
	slug: string;
}

export async function generateStaticParams() {
	const blogRepository = new FSBlogRepository();
	const blogs = await blogRepository.getBlogs();

	return blogs.map((blog) => ({
		slug: blog.slug,
	})) satisfies BlogDetailParams[];
}

export default async function BlogDetail({
	params,
}: {
	params: Promise<BlogDetailParams>;
}) {
	const { slug } = await params;
	const blogRepository = new FSBlogRepository();
	const blog = await blogRepository.getBlogDetail(slug);
	const parsedMdast = markdownProcessor.parse(blog.content);
	const transformedMdast = (await markdownProcessor.run(parsedMdast)) as Root;

	return (
		<Layout>
			<div />
			<div>
				<h1>{blog.title}</h1>
				<Article>
					{renderMdast(transformedMdast.children, {
						link: Link,
						fetcherEndpoint: "https://embed.monica-dev.com/meta",
					})}
				</Article>
			</div>
			<div />
		</Layout>
	);
}
