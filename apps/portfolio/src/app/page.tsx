import { Col } from "@/components/layout/col-grid";
import { FSProfileRepository } from "@/infrastructure/repository/fs/profile";
import { markdownProcessor, renderMdast } from "@/lib/unified";
import { Article, Line } from "@sor4chi/ui";
import type { Root } from "mdast";
import { ProfileCard } from "./_components/profile-card/profile-card";

export default async function Home() {
	const profileRepository = new FSProfileRepository();
	const profile = await profileRepository.getProfile();
	const parsedMdast = markdownProcessor.parse(profile.content);
	const transformedMdast = (await markdownProcessor.run(parsedMdast)) as Root;

	return (
		<Col.Grid>
			<Col.Item start={2} end={3}>
				<ProfileCard
					github={profile.socials.github}
					x={profile.socials.x}
					title={profile.title}
					subtitle={profile.subtitle}
				/>
				<Line />
				<Article as="article">{renderMdast(transformedMdast)}</Article>
			</Col.Item>
		</Col.Grid>
	);
}
