import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "./codeblock";

const meta: Meta<typeof CodeBlock> = {
	title: "Components/CodeBlock",
	component: CodeBlock,
};

export default meta;

type Story = StoryObj<typeof CodeBlock>;

export const Basic: Story = {
	args: {
		children: "console.log('Hello, world!');",
	},
};
