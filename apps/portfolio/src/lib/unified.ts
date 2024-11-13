import remarkParse from "remark-parse";

import * as remarkPlugins from "@sor4chi/unified-plugins/remark";
import { unified } from "unified";

export const markdownProcessor = unified()
	.use(remarkParse)
	.use(remarkPlugins.remarkAnnotation)
	.use(remarkPlugins.remarkBreaks)
	.use(remarkPlugins.remarkDetails)
	.use(remarkPlugins.remarkDirective)
	.use(remarkPlugins.remarkEmbed)
	.use(remarkPlugins.remarkFlexBlock)
	.use(remarkPlugins.remarkGFM)
	.use(remarkPlugins.remarkTimeline)
	.use(remarkPlugins.remarkLinkCard)
	.use(remarkPlugins.remarkMath)
	.use(remarkPlugins.remarkMention)
	.use(remarkPlugins.remarkSection)
	.use(remarkPlugins.remarkShiki)
	.use(remarkPlugins.remarkTimeline)
	.use(remarkPlugins.remarkVideo);
