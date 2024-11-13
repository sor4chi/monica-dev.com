import { FSBlogRepository } from "@/infrastructure/repository/fs/blog";
import Link from "next/link";

export default async function BlogOverview() {
	const blogRepository = new FSBlogRepository();
	const blogs = await blogRepository.getBlogs();

	return (
		<div>
			{blogs.map((blog) => (
				<div key={blog.slug}>
					<Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
				</div>
			))}
		</div>
	);
}
