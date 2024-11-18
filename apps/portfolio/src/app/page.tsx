import { FSProfileRepository } from "@/infrastructure/repository/fs/profile";
import { markdownProcessor, renderMdast } from "@/lib/unified";
import { Article } from "@sor4chi/ui";
import type { Root } from "mdast";

export default async function Home() {
	const profileRepository = new FSProfileRepository();
	const profile = await profileRepository.getProfile();
	const parsedMdast = markdownProcessor.parse(profile.content);
	const transformedMdast = (await markdownProcessor.run(parsedMdast)) as Root;

	return <Article as="article">{renderMdast(transformedMdast)}</Article>;
}
