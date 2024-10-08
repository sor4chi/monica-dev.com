import { vars } from "@sor4chi/design-system/theme.css";
import { style } from "@vanilla-extract/css";

import { BREAKPOINT_TABLET } from "@/styles/constants";

export const styles = {
	container: style({
		marginTop: vars.spacing.absolute[4],
	}),
	notPC: style({
		display: "none",

		"@media": {
			[`screen and (max-width: ${BREAKPOINT_TABLET})`]: {
				display: "contents",
			},
		},
	}),
};
