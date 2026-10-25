import { format as oxfmt } from 'oxfmt'

const format = async (source: string, _options: unknown) => {
  const result = await oxfmt('assertion.html', source)
  if (result.errors.length) throw new Error(JSON.stringify(result.errors))
  return result.code
}
import rehypeStringify from 'rehype-stringify'
import remarkDirective from 'remark-directive'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

import { remarkFlexBlock } from './remark-flex-block'

describe('remarkFlexBlock', () => {
  it('should convert flex directives to flex blocks', async () => {
    const input = /* md */ `
:::flex

This is left

This is right

:::
`.trim()

    const expectedOutput = /* html */ `
<div class="flex-block">
  <p>This is left</p>
  <p>This is right</p>
</div>
`.trim()

    const result = await unified()
      .use(remarkParse)
      .use(remarkDirective)
      .use(remarkFlexBlock)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(input)
      .then((file) => file.toString())

    const formattedResult = await format(result, { parser: 'html' })
    const formattedExpectedOutput = await format(expectedOutput, {
      parser: 'html',
    })

    expect(formattedResult).toBe(formattedExpectedOutput)
  })
})
