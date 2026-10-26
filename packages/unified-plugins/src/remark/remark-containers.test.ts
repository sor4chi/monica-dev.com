import rehypeStringify from 'rehype-stringify'
import remarkDirective from 'remark-directive'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { describe, expect, it } from 'vitest'

import { remarkDetails } from './remark-details'
import { remarkSection } from './remark-section'

const render = async (markdown: string) =>
  String(
    await unified()
      .use(remarkParse)
      .use(remarkDirective)
      .use(remarkSection)
      .use(remarkDetails)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(markdown),
  )

describe('standard directive containers', () => {
  it('preserves section content and starts animation numbering per document', async () => {
    const markdown =
      ':::section\n\n# First\n\n:::details[Read **more**]\n\nBody with [a link](/blog).\n\n:::\n\n:::\n\n:::section\n\nSecond\n\n:::'
    const first = await render(markdown)
    const second = await render(markdown)
    expect(first).toBe(second)
    expect(first).toContain(
      'class="markdown-section markdown-contents" style="animation-delay: 0s"',
    )
    expect(first).toContain('animation-delay: 0.2s')
    expect(first).toContain('<h1>First</h1>')
    expect(first).toContain('<summary>Read <strong>more</strong></summary>')
    expect(first).toContain('<a href="/blog">a link</a>')
  })

  it('keeps nested details and their separate summaries', async () => {
    const result = await render(
      '::::details[Outer]\n\n:::details[Inner]\n\nInner body\n\n:::\n\n::::',
    )
    expect(result.match(/<details>/g)).toHaveLength(2)
    expect(result).toContain('<summary>Outer</summary>')
    expect(result).toContain('<summary>Inner</summary>')
    expect(result).toContain('class="details-contents markdown-contents"')
    expect(result).toContain('<p>Inner body</p>')
  })

  it('does not reinterpret an unlabeled details directive as a disclosure', async () => {
    const result = await render(':::details\n\nPlain content\n\n:::')
    expect(result).not.toContain('<details>')
    expect(result).not.toContain('<summary>')
    expect(result).toContain('Plain content')
  })
})
