import type { Meta, StoryObj } from "@storybook/react";

import { Article } from "../article";
import { Paragraph } from "../paragraph";
import { Link } from "./link";

const meta: Meta<typeof Link> = {
	title: "Components/Link",
	component: Link,
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Basic: Story = {
	args: {
		as: "a",
		to: "https://example.com",
		children: "Link",
	},
};

export const Overview: Story = {
	render: (args) => (
		<Article>
			<Paragraph>
				This is a inline link component. It can be used to link to other pages
				or websites. <br />
				Please visit my <Link {...args} /> for more information.
			</Paragraph>
			<Paragraph>
				このコンポーネントはインラインリンクです。他のページやウェブサイトへのリンクに使用できます。
				<br />
				詳細は <Link {...args} /> をご覧ください。
			</Paragraph>
		</Article>
	),
	args: {
		as: "a",
		href: "https://monica-dev.com",
		children: "Portfolio",
	},
};
