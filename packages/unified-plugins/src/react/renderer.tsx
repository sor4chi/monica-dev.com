import {
	Annotation,
	BlockMath,
	Blockquote,
	CodeBlock,
	Detail,
	Heading,
	Img,
	InlineMath,
	Li,
	Line,
	Link,
	LinkCard,
	Ol,
	Paragraph,
	Strong,
	TBody,
	THead,
	Table,
	Td,
	Tr,
	Ul,
	Video,
} from "@sor4chi/ui";
import type { Paragraph as MdastParagraph, RootContent } from "mdast";
import type { ReactNode } from "react";

interface RenderOptions {
	link?: React.ElementType;
	fetcherEndpoint: string;
}

interface MarkdownContentProps {
	content: RootContent;
	options: RenderOptions;
}

interface MarkdownProps {
	contents: RootContent[];
	options: RenderOptions;
}

const pStringify = (node: MdastParagraph): string => {
	const _stringify = (node: RootContent): string => {
		if (node.type === "text") return node.value;
		if (node.type === "strong") return node.children.map(_stringify).join("");
		if (node.type === "emphasis") return node.children.map(_stringify).join("");
		if (node.type === "delete") return node.children.map(_stringify).join("");
		if (node.type === "inlineMath") return node.value;
		console.warn("unexpected node", node.type, "in paragraph");
		return "";
	};
	return node.children.map(_stringify).join("");
};

// 順序に気を付ける。例えばリンクカードは特定条件のリンクを置き換えるため、リンクよりも先に処理する必要がある
const MarkdownContent = ({ content, options }: MarkdownContentProps) => {
	if (content.type === "blockLink") {
		if (options.link) {
			return (
				<LinkCard
					as={options.link}
					href={content.url}
					fetcherEndpoint={options.fetcherEndpoint}
				>
					<Markdown contents={content.children} options={options} />
				</LinkCard>
			);
		}

		return (
			<LinkCard href={content.url} fetcherEndpoint={options.fetcherEndpoint}>
				<Markdown contents={content.children} options={options} />
			</LinkCard>
		);
	}

	if (content.type === "link") {
		if (options.link) {
			return (
				<Link as={options.link} href={content.url}>
					<Markdown contents={content.children} options={options} />
				</Link>
			);
		}
		return (
			<Link href={content.url}>
				<Markdown contents={content.children} options={options} />
			</Link>
		);
	}

	if (content.type === "shikiCodeBlock") {
		return (
			<CodeBlock>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
				<div dangerouslySetInnerHTML={{ __html: content.html }} />
			</CodeBlock>
		);
	}

	if (content.type === "inlineMath") {
		return <InlineMath content={content.value} />;
	}

	if (content.type === "math") {
		return <BlockMath content={content.value} />;
	}

	if (content.type === "list") {
		const ListComponent = content.ordered ? Ol : Ul;
		return (
			<ListComponent>
				<Markdown contents={content.children} options={options} />
			</ListComponent>
		);
	}

	if (content.type === "listItem") {
		return (
			<Li>
				<Markdown contents={content.children} options={options} />
			</Li>
		);
	}

	if (content.type === "strong") {
		return (
			<Strong>
				<Markdown contents={content.children} options={options} />
			</Strong>
		);
	}

	if (content.type === "table") {
		const [head, ...body] = content.children;
		return (
			<Table>
				<THead>
					<Tr>
						{head.children.map((cell, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<Td key={index}>
								<Markdown contents={cell.children} options={options} />
							</Td>
						))}
					</Tr>
				</THead>
				<TBody>
					{body.map((row, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<Tr key={index}>
							{row.children.map((cell, index) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								<Td key={index}>
									<Markdown contents={cell.children} options={options} />
								</Td>
							))}
						</Tr>
					))}
				</TBody>
			</Table>
		);
	}

	if (content.type === "details")
		return (
			<Detail summary={pStringify(content.summary)}>
				<Markdown contents={content.children} options={options} />
			</Detail>
		);

	if (content.type === "annotation")
		return (
			<Annotation type={content.annotationType}>
				<Markdown contents={content.children} options={options} />
			</Annotation>
		);

	if (content.type === "blockquote")
		return (
			<Blockquote>
				<Markdown contents={content.children} options={options} />
			</Blockquote>
		);

	if (content.type === "heading")
		return (
			<Heading as={`h${content.depth}`}>
				<Markdown contents={content.children} options={options} />
			</Heading>
		);

	if (content.type === "paragraph")
		return (
			<Paragraph>
				<Markdown contents={content.children} options={options} />
			</Paragraph>
		);

	if (content.type === "emphasis")
		return (
			<em>
				<Markdown contents={content.children} options={options} />
			</em>
		);

	if (content.type === "delete")
		return (
			<del>
				<Markdown contents={content.children} options={options} />
			</del>
		);

	if (content.type === "image")
		return <Img src={content.url} alt={content.alt ?? undefined} />;

	if (content.type === "video") return <Video src={content.url} />;

	if (content.type === "thematicBreak") return <Line />;

	if (content.type === "text") return content.value;

	if (content.type === "break") return <br />;

	return null;
};

const Markdown = ({ contents, options }: MarkdownProps) => {
	return contents.map((content, index) => {
		// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
		return <MarkdownContent key={index} content={content} options={options} />;
	});
};

export const renderMdast = (
	nodes: RootContent[],
	option: RenderOptions,
): ReactNode => {
	return <Markdown contents={nodes} options={option} />;
};
