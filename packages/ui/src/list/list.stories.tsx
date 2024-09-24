import type { Meta, StoryObj } from "@storybook/react";
import { Article } from "../article";
import { Li, Ol, Ul } from "./list";

const meta: Meta = {
	title: "Components/List",
};

export default meta;

type Story = StoryObj;

export const UnorderedList: Story = {
	render: () => (
		<Ul>
			<Li>Item 1</Li>
			<Li>Item 2</Li>
			<Li>Item 3</Li>
		</Ul>
	),
};

export const OrderedList: Story = {
	render: () => (
		<Ol>
			<Li>Item 1</Li>
			<Li>Item 2</Li>
			<Li>Item 3</Li>
		</Ol>
	),
};

export const Overview: Story = {
	render: () => (
		<Article>
			<Ul>
				<Li>List 1</Li>
				<Ul>
					<Li>List 2</Li>
					<Ul>
						<Li>List 3</Li>
						<Li>List 4</Li>
					</Ul>
				</Ul>
				<Li>List 5</Li>
				<Ul>
					<Li>List 6</Li>
					<Li>List 7</Li>
				</Ul>
			</Ul>
		</Article>
	),
};
