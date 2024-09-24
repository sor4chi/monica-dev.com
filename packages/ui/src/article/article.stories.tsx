import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "../heading";
import { Link } from "../link";
import { LinkCard } from "../link-card";
import { Paragraph } from "../paragraph";
import { Article } from "./article";

const meta: Meta<typeof Article> = {
	title: "Components/Article",
	component: Article,
};

export default meta;

type Story = StoryObj<typeof Article>;

export const Overview: Story = {
	render: () => (
		<Article>
			<Heading as="h1">Article Component</Heading>
			<Paragraph>
				This is an article component. It can be used to wrap a section of
				content. <br />
				Please use this component to wrap your content.
			</Paragraph>
			<Heading as="h2">Links</Heading>
			<Paragraph>
				This component is used in{" "}
				<Link as="a" href="https://monica-dev.com">
					this site
				</Link>
				.
			</Paragraph>
			<Paragraph>You can also embed a link card like below:</Paragraph>
			<LinkCard
				as="a"
				href="https://monica-dev.com"
				linkMetaFetcher={async () => ({
					imageUrl: "https://monica-dev.com/assets/ogp/default.png",
					title: "Monica's Portfolio",
					faviconUrl: "https://monica-dev.com/favicon.ico",
				})}
			/>
		</Article>
	),
};
