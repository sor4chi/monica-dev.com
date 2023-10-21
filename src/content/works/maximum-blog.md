---
title: "Maximum Blog"
createdAt: 2023/5/2
description: "埼玉大学プログラミングサークル「Maximum」の技術ブログサイト"
---

弊学のプログラミングサークル「Maximum」の技術ブログサイトを作りました。
公開資料を置く目的で開発しており、講義資料の共有や、イベントの告知、技術発信などに使っていきたいと思っています。

<https://blog.maximum.vc>

技術スタックは以下の通りです。

- [Next.js 13 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Github Pages](https://pages.github.com/)

単純なな SSG 目的で Next.js を使っていますが、Github Pages でホストするために `next export` ではなく `next build` でビルドしています。

