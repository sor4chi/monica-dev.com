import { format } from "prettier";
import rehypeStringify from "rehype-stringify";
import remarkDirective from "remark-directive";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { remarkTimeline } from "./remark-timeline";

describe("remarkTimeline", () => {
  it("should convert timeline syntax to valid html", async () => {
    const input = /* md */ `
::::timeline

## [1234] Hello World

This is a timeline item

## [2345] Hello World 2

This is a timeline item 2

::::
`.trim();

    const expectedOutput = /* html */ `
<div class="timeline">
  <div class="timeline-item markdown-contents">
    <h2 class="timeline-title" data-time="1234">Hello World</h2>
    <p>This is a timeline item</p>
  </div>
  <div class="timeline-item markdown-contents">
    <h2 class="timeline-title" data-time="2345">Hello World 2</h2>
    <p>This is a timeline item 2</p>
  </div>
</div>
`.trim();

    const result = await unified()
      .use(remarkParse)
      .use(remarkDirective)
      .use(remarkTimeline)
      .use(remarkRehype, {
        handlers: {
          ...remarkTimeline.handlers,
        },
      })
      .use(rehypeStringify)
      .process(input);

    const formattedResult = await format(result.value.toString(), {
      parser: "html",
    });
    const formattedExpectedOutput = await format(expectedOutput, {
      parser: "html",
    });

    expect(formattedResult).toBe(formattedExpectedOutput);
  });
});
