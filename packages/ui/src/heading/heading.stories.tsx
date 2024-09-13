import type { Meta, StoryObj } from "@storybook/react";
import { Fragment } from "react/jsx-runtime";
import { Article } from "../article";
import { Paragraph } from "../paragraph";
import { Heading } from "./heading";

const meta: Meta<typeof Heading> = {
	title: "Components/Heading",
	component: Heading,
};

export default meta;

type Story = StoryObj<typeof Heading>;

export const H1: Story = {
	args: {
		as: "h1",
		children: "Heading 1",
	},
};

export const H2: Story = {
	args: {
		as: "h2",
		children: "Heading 2",
	},
};

export const H3: Story = {
	args: {
		as: "h3",
		children: "Heading 3",
	},
};

export const H4: Story = {
	args: {
		as: "h4",
		children: "Heading 4",
	},
};

export const H5: Story = {
	args: {
		as: "h5",
		children: "Heading 5",
	},
};

export const H6: Story = {
	args: {
		as: "h6",
		children: "Heading 6",
	},
};

export const Overview: Story = {
	render: () => (
		<Article>
			{(["h1", "h2", "h3", "h4", "h5", "h6"] as const).map((as) => (
				<Fragment key={as}>
					<Heading as={as}>{as}</Heading>
					<Paragraph>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
						eiusmod
					</Paragraph>
				</Fragment>
			))}
		</Article>
	),
};
