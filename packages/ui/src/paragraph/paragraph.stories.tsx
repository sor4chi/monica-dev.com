import type { Meta, StoryObj } from "@storybook/react";
import { Paragraph } from "./paragraph";

const meta: Meta<typeof Paragraph> = {
	title: "Components/Paragraph",
	component: Paragraph,
};

export default meta;

type Story = StoryObj<typeof Paragraph>;

export const Default: Story = {
	args: {
		children: "This is a paragraph component.",
	},
};
