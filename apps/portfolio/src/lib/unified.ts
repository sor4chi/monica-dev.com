import remarkParse from "remark-parse";

import { renderMdast as originalRenderMdast } from "@sor4chi/unified-plugins/react";
import * as remarkPlugins from "@sor4chi/unified-plugins/remark";
import type { Root } from "mdast";
import Link from "next/link";
import { unified } from "unified";

export const markdownProcessor = unified()
	.use(remarkParse)
	.use(remarkPlugins.remarkAnnotation)
	.use(remarkPlugins.remarkBreaks)
	.use(remarkPlugins.remarkDetails)
	.use(remarkPlugins.remarkDirective)
	.use(remarkPlugins.remarkEmbed)
	.use(remarkPlugins.remarkGFM)
	.use(remarkPlugins.remarkTimeline)
	.use(remarkPlugins.remarkLinkCard)
	.use(remarkPlugins.remarkMath)
	.use(remarkPlugins.remarkMention)
	.use(remarkPlugins.remarkSection)
	.use(remarkPlugins.remarkShiki)
	.use(remarkPlugins.remarkTimeline)
	.use(remarkPlugins.remarkVideo);

export const renderMdast = (mdast: Root) => {
	return originalRenderMdast(mdast, {
		link: Link,
		fetcherEndpoint: "https://embed.monica-dev.com/meta",
	});
};
