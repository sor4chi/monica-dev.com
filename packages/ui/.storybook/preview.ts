import "@sor4chi/design-system/global.css";

import { withThemeByClassName } from "@storybook/addon-themes";
import type { Parameters } from "@storybook/react";

const preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		withThemeByClassName({
			themes: {
				light: "light",
				dark: "dark",
			},
			defaultTheme: "light",
		}),
	],
} satisfies Parameters;

export default preview;
