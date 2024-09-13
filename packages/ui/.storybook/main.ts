import type { StorybookConfig } from "@storybook/react-vite";

const config = {
	stories: ["../src/**/*.stories.@(ts|tsx)"],
	addons: [
		"@storybook/addon-onboarding",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
		"@storybook/addon-themes"
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
} satisfies StorybookConfig;

export default config;
