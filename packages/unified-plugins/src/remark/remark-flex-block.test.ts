import remarkDirective from "remark-directive";
import remarkParse from "remark-parse";
import { remarkFlexBlock } from "./remark-flex-block";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { describe, expect, it } from "vitest";
import { format } from "prettier";
import { unified } from "unified";

describe("remarkFlexBlock", () => {
  it("should convert flex directives to flex blocks", async () => {
    const input = /* md */ `
:::flex

This is left

This is right

:::
`.trim();

    const expectedOutput = /* html */ `
<div class="flex-block">
  <p>This is left</p>
  <p>This is right</p>
</div>
`.trim();

    const result = await unified()
      .use(remarkParse)
      .use(remarkDirective)
      .use(remarkFlexBlock)
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
