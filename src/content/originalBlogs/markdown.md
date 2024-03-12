---
title: monica-dev.comがサポートしているMarkdownの記法
description: デザイン確認の意味も込めてmonica-dev.comがサポートしているMarkdownの記法をまとめてみました。
publishedAt: 2024/03/11
---

デザイン確認の意味も込めて当サイト(monica-dev.com)がサポートしているMarkdownの記法をまとめてみました。

## Paragraphs

日本は北緯35度から45度の範囲に位置し、東経122度から153度の範囲に位置しています。日本列島は、北海道、本州、四国、九州などの大小の島々からなり、その総面積は約37万8千平方キロメートルです。

Japan is located in the range of 35 to 45 degrees north latitude and 122 to 153 degrees east longitude. The Japanese archipelago consists of large and small islands such as Hokkaido, Honshu, Shikoku, and Kyushu, with a total area of about 378,000 square kilometers.

```markdown
日本は北緯35度から45度の範囲に位置し、東経122度から153度の範囲に位置しています。日本列島は、北海道、本州、四国、九州などの大小の島々からなり、その総面積は約37万8千平方キロメートルです。

Japan is located in the range of 35 to 45 degrees north latitude and 122 to 153 degrees east longitude. The Japanese archipelago consists of large and small islands such as Hokkaido, Honshu, Shikoku, and Kyushu, with a total area of about 378,000 square kilometers.
```

## Headings

## H2

### H3

#### H4

```markdown
## H2

### H3

#### H4
```

## Lists

### Unordered

- Item 1
- Item 2
  - Item 2.1
    - Item 2.1.1
    - Item 2.1.2
  - Item 2.2
- Item 3

```markdown
- Item 1
- Item 2
  - Item 2.1
    - Item 2.1.1
    - Item 2.1.2
  - Item 2.2
- Item 3
```

### Ordered

1. Item 1
2. Item 2
   1. Item 2.1
      1. Item 2.1.1
      2. Item 2.1.2
   2. Item 2.2
3. Item 3

```markdown
1. Item 1
2. Item 2
   1. Item 2.1
      1. Item 2.1.1
      2. Item 2.1.2
   2. Item 2.2
3. Item 3
```

## Inline Links

This is a [link](https://www.google.com). The format is below.

```markdown
This is a [link](https://www.google.com). The format is below.
```

## Block Link

<https://www.google.com>

```markdown
<https://www.google.com>
```

## Images

![とてもかっこいい、夜の幻想的な風景画像](/images/blogs/markdown/image.webp)

```markdown
![とてもかっこいい、夜の幻想的な風景画像](/images/blogs/markdown/image.webp)
```

## Blockquotes

> JavaScript（ジャバスクリプト）は、プログラミング言語であり、HyperText Markup Language（HTML）やCascading Style Sheets（CSS）と並ぶ World Wide Web（WWW）の中核技術の一つである。

<https://ja.wikipedia.org/wiki/JavaScript>

```markdown
> JavaScript（ジャバスクリプト）は、プログラミング言語であり、HyperText Markup Language（HTML）やCascading Style Sheets（CSS）と並ぶ World Wide Web（WWW）の中核技術の一つである。
```

## Code Blocks

```javascript
function mandelbrot(c, maxIterations) {
  let z = 0;
  let n = 0;
  while (Math.abs(z) <= 2 && n < maxIterations) {
    z = z * z + c;
    n++;
  }
  if (n === maxIterations) {
    return maxIterations;
  }
  return n + 1 - Math.log(Math.log2(Math.abs(z)));
}
```

This is a code block.

````markdown
```javascript
function mandelbrot(c, maxIterations) {
  let z = 0;
  let n = 0;
  while (Math.abs(z) <= 2 && n < maxIterations) {
    z = z * z + c;
    n++;
  }
  if (n === maxIterations) {
    return maxIterations;
  }
  return n + 1 - Math.log(Math.log2(Math.abs(z)));
}
```
````

## Tables

| Name           | Browser | Managed by |
| -------------- | ------- | ---------- |
| V8             | Chrome  | Google     |
| SpiderMonkey   | Firefox | Mozilla    |
| Chakra         | Edge    | Microsoft  |
| JavaScriptCore | Safari  | Apple      |

```markdown
| Name           | Browser | Managed by |
| -------------- | ------- | ---------- |
| V8             | Chrome  | Google     |
| SpiderMonkey   | Firefox | Mozilla    |
| Chakra         | Edge    | Microsoft  |
| JavaScriptCore | Safari  | Apple      |
```

## Horizontal Rules

---

```markdown
---
```

## Text Modifiers

This is **bold** and this is *italic* and this is `code` and this is ~~strikethrough~~.

```markdown
This is **bold** and this is *italic* and this is `code` and this is ~~strikethrough~~.
```

## Footnotes

This is a paragraph with a footnote[^1].

[^1]: This is a footnote.

```markdown
This is a paragraph with a footnote[^1]

[^1]: This is a footnote.
```

## Task Lists

- [x] Task 1
- [ ] Task 2
  - [x] Task 2.1
  - [ ] Task 2.2
  - [ ] Task 2.3
- [ ] Task 3

```markdown
- [x] Task 1
- [ ] Task 2
  - [x] Task 2.1
  - [ ] Task 2.2
  - [ ] Task 2.3
- [ ] Task 3
```

## Block Math

$$
\begin{aligned}
\mathcal{L}(\theta) &= \mathbb{E}_{s_t, a_t \sim \mathcal{D}} \left[ \frac{1}{2} \left( Q_{\phi}(s_t, a_t) - (r_t + \gamma (1 - d_t) \mathbb{E}_{a_{t+1} \sim \pi_{\theta}}[Q_{\phi'}(s_{t+1}, a_{t+1}) - \alpha \log \pi_{\theta}(a_{t+1} | s_{t+1})]) \right)^2 \right] \\
&+ \mathbb{E}_{s_t \sim \mathcal{D}} \left[ \mathbb{E}_{a_t \sim \pi_{\theta}}[-Q_{\phi}(s_t, a_t) + \alpha \log \pi_{\theta}(a_t | s_t)] \right]
\end{aligned}
$$

```markdown
$$
\begin{aligned}
\mathcal{L}(\theta) &= \mathbb{E}_{s_t, a_t \sim \mathcal{D}} \left[ \frac{1}{2} \left( Q_{\phi}(s_t, a_t) - (r_t + \gamma (1 - d_t) \mathbb{E}_{a_{t+1} \sim \pi_{\theta}}[Q_{\phi'}(s_{t+1}, a_{t+1}) - \alpha \log \pi_{\theta}(a_{t+1} | s_{t+1})]) \right)^2 \right] \\
&+ \mathbb{E}_{s_t \sim \mathcal{D}} \left[ \mathbb{E}_{a_t \sim \pi_{\theta}}[-Q_{\phi}(s_t, a_t) + \alpha \log \pi_{\theta}(a_t | s_t)] \right]
\end{aligned}
$$
```

## Inline Math

$Q_{\phi}(s_t, a_t)$は状態$s_t$と行動$a_t$に対する行動価値関数を表し、$\pi_{\theta}(a_t | s_t)$は状態$s_t$における行動$a_t$の確率を表します。

```markdown
$Q_{\phi}(s_t, a_t)$は状態$s_t$と行動$a_t$に対する行動価値関数を表し、$\pi_{\theta}(a_t | s_t)$は状態$s_t$における行動$a_t$の確率を表します。
```

## Alert

> [!NOTE]
> Highlights information that users should take into account, even when skimming.

```markdown
> [!NOTE]
> Highlights information that users should take into account, even when skimming.
```

> [!IMPORTANT]
> Crucial information necessary for users to succeed.

```markdown
> [!IMPORTANT]
> Crucial information necessary for users to succeed.
```

> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.

```markdown
> [!WARNING]
> Critical content demanding immediate user attention due to potential risks.
```

## Flex Block

This is a flex block

:::flex

![Image](/images/blogs/markdown/image.webp)

This is a flex default block
The default is `center`

:::

## Timeline

::::timeline

### [12/01] timeline 1

This is a timeline content

### [12/02] timeline 2

You can insert any content you like.

### [12/03] timeline 3

This feature is useful for displaying a list of items in chronological order.

### [12/04] timeline 4

For example, competition logs, progress reports, etc.

::::

```markdown
::::timeline

### [12/01] timeline 1

This is a timeline content

### [12/02] timeline 2

You can insert any content you like.

### [12/03] timeline 3

This feature is useful for displaying a list of items in chronological order.

### [12/04] timeline 4

For example, competition logs, progress reports, etc.

::::
```
