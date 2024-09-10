import { keyframes } from "@vanilla-extract/css";

import { vars } from "./theme.css";

export const slideIn = keyframes({
	from: {
		opacity: 0,
		transform: `translateY(${vars.spacing.absolute[4]})`,
	},
	to: {
		opacity: 1,
		transform: "translateY(0)",
	},
});
