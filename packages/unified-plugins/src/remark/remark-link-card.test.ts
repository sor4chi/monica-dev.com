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

import { remarkLinkCard } from './remark-link-card'

const mdProcessor = unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(remarkLinkCard)
  .use(remarkRehype, { handlers: remarkLinkCard.handlers })
  .use(rehypeStringify)

describe('remarkLinkCard', () => {
  it('should mark standalone links for static card rendering', async () => {
    const input = /* md */ `
<https://monica-dev.com>
`.trim()

    const expectedOutput =
      '<a class="link-card" href="https://monica-dev.com">https://monica-dev.com</a>'

    const result = await mdProcessor
      .process(input)
      .then((file) => file.toString())

    const formattedResult = await format(result, { parser: 'html' })
    const formattedExpectedOutput = await format(expectedOutput, {
      parser: 'html',
    })

    expect(formattedResult).toBe(formattedExpectedOutput)
  })

  it('should not convert links in list items', async () => {
    const input = /* md */ `
- <https://monica-dev.com>
`.trim()

    const expectedOutput = /* html */ `
<ul>
  <li><a href="https://monica-dev.com">https://monica-dev.com</a></li>
</ul>
`.trim()

    const result = await mdProcessor
      .process(input)
      .then((file) => file.toString())

    const formattedResult = await format(result, { parser: 'html' })
    const formattedExpectedOutput = await format(expectedOutput, {
      parser: 'html',
    })

    expect(formattedResult).toBe(formattedExpectedOutput)
  })
})
