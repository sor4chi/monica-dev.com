import type { Meta, StoryObj } from "@storybook/react";
import { Article } from "../article";
import { Line } from "./line";

const meta: Meta<typeof Line> = {
	title: "Components/Line",
	component: Line,
};

export default meta;

type Story = StoryObj<typeof Line>;

export const Default: Story = {};
