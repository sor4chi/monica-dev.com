import rehypeStringify from 'rehype-stringify'
import remarkBreaks from 'remark-breaks'
import remarkDirective from 'remark-directive'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { describe, expect, it } from 'vitest'

import { remarkSection } from '../remark/remark-section'
import { rehypeAnnotationBlock } from './rehype-annotation-block'

const render = async (markdown: string) =>
  String(
    await unified()
      .use(remarkParse)
      .use(remarkDirective)
      .use(remarkSection)
      .use(remarkBreaks)
      .use(remarkRehype)
      .use(rehypeAnnotationBlock)
      .use(rehypeStringify)
      .process(markdown),
  )

describe('GitHub alerts', () => {
  it.each(['NOTE', 'TIP', 'IMPORTANT', 'WARNING', 'CAUTION'])(
    'renders %s with the existing site classes and complete body',
    async (kind) => {
      const result = await render(
        `> [!${kind}]\n> First sentence with **bold** text.\n> Second sentence.`,
      )
      expect(result).toContain('class="annotation-block markdown-contents"')
      expect(result).toContain(`data-annotation-type="${kind.toLowerCase()}"`)
      expect(result).toContain(`class="annotation-block__label">${kind}</span>`)
      expect(result).toContain(
        'First sentence with <strong>bold</strong> text.',
      )
      expect(result).toContain('Second sentence.')
      expect(result).not.toContain(`[!${kind}]`)
    },
  )

  it('supports alerts nested inside section directives', async () => {
    const result = await render(':::section\n\n> [!NOTE]\n> Nested body\n\n:::')
    expect(result).toContain('data-annotation-type="note"')
    expect(result).toContain('Nested body')
  })

  it('leaves ordinary quotations containing a marker as ordinary quotations', async () => {
    const result = await render('> This mentions [!NOTE] in a sentence.')
    expect(result).not.toContain('annotation-block')
    expect(result).toContain('This mentions [!NOTE] in a sentence.')
  })

  it('does not crash on an empty blockquote', async () => {
    expect(await render('>')).toContain('<blockquote>')
  })
})
