---
title: 2024年夏休みの振り返り
description: 2024年夏休みの振り返りをしてみました。
publishedAt: 2024/09/29
---

## やったこと

### 競プロ

#### AtCoder

::::flex

:::left

945 -> 988 (+43)
![AtCoder Algo](/assets/blogs/look-back-on-2024-summer-vacation/atcoder-algo.webp)

:::

:::right

1297 -> 1598 (+301)
![AtCoder Heuristic](/assets/blogs/look-back-on-2024-summer-vacation/atcoder-heu.webp)

:::

::::

- [AHC036](https://atcoder.jp/contests/ahc036) 入賞 (61 位 / 1103・学生 19 位)
- [AHC037](https://atcoder.jp/contests/ahc037) (232 位 / 985)

![ビジュアライザのGif](/assets/blogs/look-back-on-2024-summer-vacation/vis-ahc036.gif)

#### Marathon Match

- [MM155](https://www.topcoder.com/challenges/4a89bbc5-1d56-41a0-a284-3e3ec5859b28) (17 位 / 64)
- [MM156](https://www.topcoder.com/challenges/240acb6f-5e29-4d52-9c3d-5ac139dcf3d3) (11 位 / 33)

#### その他のコンテスト

- [TUATPC2024Summer](https://mofecoder.com/contests/tuatpc2024summer_h/standings) (3 位 / 19)

![ビジュアライザのGif](../../../public/assets/blogs/look-back-on-2024-summer-vacation/vis-tuatpc.gif)

### 研究

- 論文読み 3 件 (LLM の Grounding/Planning 技術関連)

### その他の活動

#### 技術雑誌の記事執筆

Software Design 2024 年 10 月号「Durable Objects が広げる Cloudflare Workers の可能性」を執筆した。
[Hono DO](https://github.com/sor4chi/hono-do) をはじめとした Cloudflare Workers を使った開発経験のなかで得た知見をもとに、Durable Objects がエッジでどんな動きをしどういう機能をもたらしてくれるのかを解説した。

![Software Design 2024年10月号](http://image.gihyo.co.jp/assets/images/cover/2024/642410.jpg)

#### 夏休み講習会

Youtube 配信をする形式でサークル内で夏休み講習会を開催した。
（資料はサークル内でのみ公開）

#### Ranking Notifier

::::flex

:::left

AHC の順位表を 1 時間おきに取ってきて Discord に通知する Bot を作成した。

Cloudflare Workers Queue と Discord Webhook を使った

:::

![ランキング通知](/assets/blogs/look-back-on-2024-summer-vacation/ranking-notifier.webp)

::::

#### Kalman Filter Simulator

`y=x` 上を外乱ありの環境で移動し、その位置をカルマンフィルタで推定しながら進行するシミュレータを作成した。

<https://github.com/sor4chi/kalman-filter-simulator>

#### JSON Receiver

JSON の POST エンドポイントを 1 コマンドで建てられ、標準出力やログファイルに受信した JSON を出力するツールを作成した。

`npx json-receiver`

<https://github.com/sor4chi/json-receiver>

#### OSS

Hono Storage の Star が 100 を超えた。

<https://github.com/sor4chi/hono-storage>

### その他（技術以外）

自動車運転免許を取得した（オートマ限定）

AHC036 の懇親会に出席した

::::flex

![懇親会の様子1](/assets/blogs/look-back-on-2024-summer-vacation/konshinkai-1.webp)

![懇親会の様子2](/assets/blogs/look-back-on-2024-summer-vacation/konshinkai-2.webp)

![懇親会の様子3](/assets/blogs/look-back-on-2024-summer-vacation/konshinkai-3.webp)

::::

実家（北海道）へ帰省した

::::flex

![実家でBBQ](/assets/blogs/look-back-on-2024-summer-vacation/bbq.webp)

![麻雀](/assets/blogs/look-back-on-2024-summer-vacation/maj.webp)

::::

サークルのイベントでボーリング大会に参加した

![ボーリング大会](/assets/blogs/look-back-on-2024-summer-vacation/balling.webp)

## 感想

- 思ったよりも成果が出てなくて悔しい
- ヒューリスティックは予想以上に良い成果が出ており、引き続き取り組んでいきたい
  - バチャをもっと入念にやる
- Web エンジニアじゃないかもしれない...
- 来月から Cyber Agent で内定者バイトがあるので切り替えて頑張りたい
- 卒業研究引き続き全力で取り組む
- ISUCON 頑張りたい。今年こそは...
