import { format } from "prettier";
import rehypeStringify from "rehype-stringify";
import remarkDirective from "remark-directive";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { describe, expect, it } from "vitest";

import { remarkLinkCard } from "./remark-link-card";

const mdProcessor = unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(remarkLinkCard)
  .use(remarkRehype)
  .use(rehypeStringify);

describe("remarkLinkCard", () => {
  it("should convert flex directives to flex blocks", async () => {
    const input = /* md */ `
<https://monica-dev.com>
`.trim();

    const expectedOutput = /* html */ `
<p>
  <a
    href="https://monica-dev.com"
    data-title="Monica&#x26;#39;s Portfolio"
    data-image="https://monica-dev.com/images/ogp/default.png"
    data-favicon="https://monica-dev.com/favicon.ico"
    >https://monica-dev.com</a
  >
</p>
`.trim();

    const result = await mdProcessor
      .process(input)
      .then((file) => file.toString());

    const formattedResult = await format(result, { parser: "html" });
    const formattedExpectedOutput = await format(expectedOutput, {
      parser: "html",
    });

    expect(formattedResult).toBe(formattedExpectedOutput);
  });

  it("should not convert links in list items", async () => {
    const input = /* md */ `
- <https://monica-dev.com>
`.trim();

    const expectedOutput = /* html */ `
<ul>
  <li><a href="https://monica-dev.com">https://monica-dev.com</a></li>
</ul>
`.trim();

    const result = await mdProcessor
      .process(input)
      .then((file) => file.toString());

    const formattedResult = await format(result, { parser: "html" });
    const formattedExpectedOutput = await format(expectedOutput, {
      parser: "html",
    });

    expect(formattedResult).toBe(formattedExpectedOutput);
  });
});
