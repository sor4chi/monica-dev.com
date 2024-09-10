import { style } from "@vanilla-extract/css";

import { BREAKPOINT_TABLET } from "@/styles/constants";

export const styles = {
	notPC: style({
		display: "none",

		"@media": {
			[`screen and (max-width: ${BREAKPOINT_TABLET})`]: {
				display: "contents",
			},
		},
	}),
};
