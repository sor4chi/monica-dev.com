import type { Meta, StoryObj } from "@storybook/react";
import { Article } from "../article";
import { Paragraph } from "../paragraph";
import { Strong } from "./strong";

const meta: Meta<typeof Strong> = {
	title: "Components/Strong",
	component: Strong,
};

export default meta;

type Story = StoryObj<typeof Strong>;

export const Default: Story = {
	args: {
		children: "This is a strong component.",
	},
};

export const Overview: Story = {
	render: () => (
		<Article>
			<Paragraph>
				This is a <Strong>STRONG</Strong> component.
			</Paragraph>
		</Article>
	),
};
