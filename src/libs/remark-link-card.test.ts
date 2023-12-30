import remarkDirective from "remark-directive";
import remarkParse from "remark-parse";
import remarkLinkCard from "./remark-link-card";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { describe, expect, it } from "vitest";
import { format } from "prettier";
import { unified } from "unified";

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

    const result = await unified()
      .use(remarkParse)
      .use(remarkDirective)
      .use(remarkLinkCard)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(input)
      .then((file) => file.toString());

    const formattedResult = await format(result, { parser: "html" });
    const formattedExpectedOutput = await format(expectedOutput, {
      parser: "html",
    });

    expect(formattedResult).toBe(formattedExpectedOutput);
  });
});
