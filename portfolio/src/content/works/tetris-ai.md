---
title: "深層強化学習を用いたテトリスBotの作成"
createdAt: 2024/3/31
description: "友人とテトリスを自動でプレイする Bot を共同開発しました。"
authors: ["sor4chi", "thirofoo", "seiei-n"]
---

g@sor4chi , g@thirofoo , g@seiei-n の３人で、深層強化学習を用いて **テトリスを自動でプレイする Bot** を作成しました。

高校生の頃、Youtube で [テトリスの AI を遺伝的アルゴリズムで学習させる動画](https://www.youtube.com/watch?v=D7rjGRoiCeM) にハマり、それを見て自分でも作ってみたいと思っていました。

今回、[松尾研究室スプリングセミナー2024](https://weblab.t.u-tokyo.ac.jp/spring2024/) で深層強化学習の講義を受講したので、その修了研究としてこのテーマを選びました。

今回作成した Bot は、テトリスのフィールドの状態を観測し、その状態から次にどのような操作を行うかを決定するモデルを深層強化学習で学習しました。

当プロジェクトのリポジトリは以下になります。

<https://github.com/seihirochi/tetris-project>

実際に最終モデル (NN6) でプレイさせた様子は以下の動画でご覧いただけます。

::youtube[FmZQF8BpEhc]

最終的には、一晩学習させたモデルでプレイしたところ、永遠に終わらないレベルでプレイできるようになりました。
（動画ではスコアが 10M を超えているところをご覧いただけます）

色々な試行錯誤やモデルの改善を経て、最終的にはこのような結果を得ることができました。
技術的な解説は以下のスライドや g@thirofoo のブログ記事にまとめています。もし興味があればそちらもご覧ください。

<https://zenn.dev/through/articles/ebe77ac5d02f2d>

また、最終発表に使用したスライドは以下になります。

<iframe class="speakerdeck-iframe" frameborder="0" src="https://speakerdeck.com/player/712caed0a4844905a2dd69741dda05a1" title="深層強化学習を用いたテトリスBotの作成の試行" allowfullscreen="true" style="border: 0px; background: padding-box padding-box rgba(0, 0, 0, 0.1); margin: 0px; padding: 0px; border-radius: 6px; box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 40px; width: 100%; height: auto; aspect-ratio: 560 / 315;" data-ratio="1.7777777777777777"></iframe>
