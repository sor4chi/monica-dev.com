import { createGlobalTheme } from "@vanilla-extract/css";

import { colorVars } from "./contract.css";

createGlobalTheme(".light", colorVars, {
	gray: {
		1: "hsl(0 0% 99.0%)",
		2: "hsl(0 0% 97.3%)",
		3: "hsl(0 0% 95.1%)",
		4: "hsl(0 0% 93.0%)",
		5: "hsl(0 0% 90.9%)",
		6: "hsl(0 0% 85.8%)",
		7: "hsl(0 0% 78.0%)",
		8: "hsl(0 0% 56.1%)",
		9: "hsl(0 0% 52.3%)",
		10: "hsl(0 0% 43.5%)",
		11: "hsl(0 0% 25.0%)",
		12: "hsl(0 0% 9.0%)",
	},
	blue: {
		1: "hsl(206 100% 99.2%)",
		2: "hsl(210 100% 98.0%)",
		3: "hsl(209 100% 96.5%)",
		4: "hsl(210 98.8% 94.0%)",
		5: "hsl(209 95.0% 90.1%)",
		6: "hsl(209 81.2% 84.5%)",
		7: "hsl(208 77.5% 76.9%)",
		8: "hsl(206 81.9% 65.3%)",
		9: "hsl(206 100% 50.0%)",
		10: "hsl(208 100% 47.3%)",
		11: "hsl(211 100% 43.2%)",
		12: "hsl(211 100% 15.0%)",
	},
});

createGlobalTheme(".dark", colorVars, {
	gray: {
		1: "hsl(0 0% 8.5%)",
		2: "hsl(0 0% 11.0%)",
		3: "hsl(0 0% 13.6%)",
		4: "hsl(0 0% 15.8%)",
		5: "hsl(0 0% 20.5%)",
		6: "hsl(0 0% 24.3%)",
		7: "hsl(0 0% 31.2%)",
		8: "hsl(0 0% 43.9%)",
		9: "hsl(0 0% 49.4%)",
		10: "hsl(0 0% 62.8%)",
		11: "hsl(0 0% 78.0%)",
		12: "hsl(0 0% 93.0%)",
	},
	blue: {
		1: "hsl(212 35.0% 9.2%)",
		2: "hsl(216 50.0% 11.8%)",
		3: "hsl(214 59.4% 15.3%)",
		4: "hsl(214 65.8% 17.9%)",
		5: "hsl(213 71.2% 20.2%)",
		6: "hsl(212 77.4% 23.1%)",
		7: "hsl(211 85.1% 27.4%)",
		8: "hsl(211 89.7% 34.1%)",
		9: "hsl(206 100% 50.0%)",
		10: "hsl(209 100% 60.6%)",
		11: "hsl(210 100% 66.1%)",
		12: "hsl(206 98.0% 95.8%)",
	},
});

const fontVars = createGlobalTheme(":root", {
	size: {
		xs: "0.75rem",
		sm: "0.875rem",
		base: "1rem",
		lg: "1.125rem",
		xl: "1.25rem",
		"2xl": "1.5rem",
	},
	weight: {
		normal: "400",
		medium: "500",
		bold: "600",
	},
});

const spacingVars = createGlobalTheme(":root", {
	0: "0",
	full: "100%",
	absolute: {
		1: "0.25rem",
		2: "0.5rem",
		3: "0.75rem",
		4: "1rem",
		6: "1.5rem",
		8: "2rem",
		10: "2.5rem",
		12: "3rem",
		16: "4rem",
	},
	relative: {
		1: "0.25em",
		2: "0.5em",
		3: "0.75em",
		4: "1em",
		6: "1.5em",
		8: "2em",
		10: "2.5em",
		12: "3em",
		16: "4em",
	},
});

export const vars = {
	color: colorVars,
	font: fontVars,
	spacing: spacingVars,
	zIndex: {
		normal: 0,
		forward: 1,
		float: 10,
		windowFloat: 100,
		modal: 1000,
	},
};
