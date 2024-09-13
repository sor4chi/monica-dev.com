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
		linkMetaFetcher: async () => ({
			imageUrl: "https://monica-dev.com/assets/ogp/default.png",
			title: "Monica's Portfolio",
			faviconUrl: "https://monica-dev.com/favicon.ico",
		}),
	},
};

export const Loading: Story = {
	render: (args) => (
		<Article>
			<LinkCard {...args} />
		</Article>
	),
	args: {
		as: "a",
		href: "https://monica-dev.com",
		linkMetaFetcher: async () => new Promise(() => {}), // Simulate loading
	},
};

export const FetchError: Story = {
	render: (args) => (
		<Article>
			<LinkCard {...args} />
		</Article>
	),
	args: {
		as: "a",
		href: "https://monica-dev.com",
		linkMetaFetcher: async () => null,
	},
};

export const Simulation: Story = {
	render: (args) => (
		<Article>
			<LinkCard {...args} />
		</Article>
	),
	args: {
		as: "a",
		href: "https://monica-dev.com",
		linkMetaFetcher: async () => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			if (Math.random() < 0.5) {
				throw new Error("Failed to fetch link meta");
			}
			return {
				imageUrl: "https://monica-dev.com/assets/ogp/default.png",
				title: "Monica's Portfolio",
				faviconUrl: "https://monica-dev.com/favicon.ico",
			};
		},
	},
};
