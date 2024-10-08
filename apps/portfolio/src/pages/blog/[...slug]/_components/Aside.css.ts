import { vars } from "@sor4chi/design-system/theme.css";
import { style } from "@vanilla-extract/css";

import {
	ASIDE_WIDTH,
	BREAKPOINT_MOBILE,
	BREAKPOINT_TABLET,
} from "@/styles/constants";

export const styles = {
	aside: style({
		position: "sticky",
		top: `calc(${vars.spacing.absolute[8]} + 0.25rem)`,
		height: "fit-content",
		width: ASIDE_WIDTH,
		flexShrink: 0,
		display: "flex",
		flexDirection: "column",
	}),
	left: style({
		"@media": {
			[`screen and (max-width: ${BREAKPOINT_MOBILE})`]: {
				display: "none",
			},
		},
	}),
	right: style({
		"@media": {
			[`screen and (max-width: ${BREAKPOINT_TABLET})`]: {
				display: "none",
			},
		},
	}),
};
