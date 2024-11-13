import type { Meta, StoryObj } from "@storybook/react";
import { Article } from "../article";
import { LinkCard } from "./link-card";

const meta: Meta<typeof LinkCard> = {
	title: "Components/LinkCard",
	component: LinkCard,
};

export default meta;

type Story = StoryObj<typeof LinkCard>;

// LinkCard は Article コンポーネントに依存する (Inner Container Componentのため)
export const Basic: Story = {
	render: (args) => (
		<Article>
			<LinkCard {...args} />
		</Article>
	),
	args: {
		as: "a",
		href: "https://monica-dev.com",
		fetcherEndpoint: "https://embed.monica-dev.com/meta",
	},
};
