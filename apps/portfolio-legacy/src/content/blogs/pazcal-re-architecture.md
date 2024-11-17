---
title: ぱずかるをリアーキテクチャした話
description: 自分がプログラミングを始めた時に作ったWebアプリ「ぱずかる」を新たな技術スタックで一新しました。
publishedAt: 2023/06/13
updatedAt: 2023/06/23
---

この度[ぱずかる](https://pazcal.net)をリアーキテクチャしました。

ぱずかるは、私が高校 3 年でプログラミングを始めた時に作った Web アプリケーションです。

もはやぱずかるを作りたいというモチベーションでプログラミングを始めたと言った方が正しいかもしれません...

今回は移行した経緯と技術選定、パフォーマンスの変化などについて書きたいと思います。

## 移行した経緯

いままでのぱずかるには

- デザインがダサい
- a11y、UX が悪い
- パフォーマンスが悪い（特に FCP と LCP）
- コードの保守性が悪すぎる

といった問題がありました。

と言ってもつい最近までずっと 2 つの企業でインターンを掛け持ちしていたので忙しすぎてなかなかリプレイスする暇がなく...

今回たまたま自由に開発できる時間ができたので今しかないと思い開発することにしました。

## 技術選定

今までのサイトの使用技術はこのような感じでした

|    カテゴリ    |                      使用技術                       |
| :------------: | :-------------------------------------------------: |
| フロントエンド |      `HTML`+`CSS`+`JavaScript` (静的、直書き)       |
|  バックエンド  | `Django (Python)` (ランクデータを返すAPIがあるだけ) |
|    インフラ    |              Xserver + Python Anywhere              |

自分がプログラミング学びたての時に頑張って考えたアーキテクチャです...懐かしい...

今回作ったサイトの使用技術はこんな感じです。

|    カテゴリ    |           使用技術            |
| :------------: | :---------------------------: |
| フロントエンド |  `React` + `vite-plugin-ssr`  |
|  バックエンド  |         `JavaScript`          |
|    インフラ    | Cloudflare Pages + (Function) |

自分の技術力の向上を感じます...

## デザインの話

もちろん当時 Web 初学者だった私が数日かけて調べに調べて作ったサイトですのでデザインはとても絶望的でした。

- 要素の大きさが強調したい順になっていない
- ハンバーガーメニューの主張が異様に強い
- よくあるごちゃごちゃなデザイン詰め合わせのようになっている

私は去年[Wizleap Inc.](https://wizleap.co.jp/)でフロントエンドのテックリードとして社内 UI ライブラリ（フロントエンドの共通化基盤）を構築していたので、その知見を活かして軽くデザインシステムを組みました。

```ts
const GRAYS = {
  "50": "#eff3f8",
  "100": "#d8e2ea",
  "200": "#c1ceda",
  "300": "#a8bac9",
  "400": "#94a8bb",
  "500": "#7f98ad",
  "600": "#71889a",
  "700": "#607382",
  "800": "#505f6c",
  "900": "#3e4953",
};

const BLUES = {
  "50": "#e4f2ff",
  "100": "#bdddff",
  "200": "#93c8ff",
  "300": "#68b2ff",
  "400": "#4ba1ff",
  "500": "#3991ff",
  "600": "#3b83f6",
  "700": "#3a70e2",
  "800": "#395ecf",
  "900": "#353eaf",
};
```

簡単ですがこのような形で**Color Tokens**を設けたり**0.25rem unit(4px unit)** でのレイアウトを心がけるようにしました。

結果一貫性のある綺麗なデザインを構築できたのではないかなと思っています。
シンプルが一番ですね🙃

![デザインの紹介](https://monica-log.s3.ap-northeast-1.amazonaws.com/blog/Frame_64.png)

## a11y、UXの話

今までのサイトでは、計算ボタンを押した時にガタつきがあったり、いちいちユーザーにスクロールを要求するような設計になっていました。

そこで今回はスクロールせずに**First View内で計算できる**や**ガタつきを産まない**というコンセプトをモットーに構築しました。

さらに、**値を入力する**という行動も億劫だと感じため、よく計算に使われるキリ番（200 ランクずつ）を**予測候補としてボタンで提示**することにしました。
結果的にアクセスしてからボタンを 3 回押すだけで計算できる状況を演出し、**ページ離脱率**を抑えることに成功しました。

今回、機能として計算結果の表示を Universal 式と日本語式で切り替えられるような機能をつけたのですが、ここでもレイアウトシフトがないようにあらかじめ高さを確保する工夫を施しています。

![Universal式の計算結果表示](https://monica-log.s3.ap-northeast-1.amazonaws.com/blog/ScreenCapture_2023-06-22_21.02.22.png)

![日本語式の計算結果表示](https://monica-log.s3.ap-northeast-1.amazonaws.com/blog/ScreenCapture_2023-06-22_21.02.28.png)

<!-- ![Universal式の計算結果表示](https://monica-log.s3.ap-northeast-1.amazonaws.com/blog/ScreenCapture_2023-06-22_21.02.22.png) -->

<!-- ![日本語式の計算結果表示](https://monica-log.s3.ap-northeast-1.amazonaws.com/blog/ScreenCapture_2023-06-22_21.02.28.png) -->

## パフォーマンスの話

今までインフラは xserver というオンプレミスのレンタルサーバーを利用していましたが、`http/1.1` で通信していたり、ランクデータを提供している APi がめちゃくちゃ遅かったりでページリソースの収集に大体 1.2 秒くらいかかっていました
（設定がめんどくさかったのもあります）

![以前のサイトの計測結果](https://monica-log.s3.ap-northeast-1.amazonaws.com/blog/ScreenCapture_2023-06-22_20.13.00.png)

今回から、インフラを cloudflare pages という CDN サーバーに載せるました。
ssl 化や brotil 圧縮を勝手にやってくれたり、main ブランチへの github push hook で自動的にデプロイしてくれたりして、とても素晴らしい使いやすさでした。

`http/3` で通信できていることや、api サーバを使わずに ssg 時でランクデータを保持しているため、ページリソースの収集が大体 0.18 秒くらいになりました。（すごすぎないですか😮）

![今回作ったサイトの計測結果](https://monica-log.s3.ap-northeast-1.amazonaws.com/blog/ScreenCapture_2023-06-22_20.14.04.png)

最終的にこれまで FCP や LCP が低かったサイトが

![以前のサイトのLighthouse](https://monica-log.s3.ap-northeast-1.amazonaws.com/blog/ScreenCapture_2023-06-22_20.10.06.png)

ここまで劇的な改善をしました。

[トップページ](https://pazcal.net/)

![トップページのLighthouse](https://monica-log.s3.ap-northeast-1.amazonaws.com/blog/ScreenCapture_2023-06-22_20.04.43.png)

[周回計算機ページ](https://pazcal.net/lap)

![周回計算機ページのLighthouse](https://monica-log.s3.ap-northeast-1.amazonaws.com/blog/ScreenCapture_2023-06-22_20.05.14.png)

## 保守性の話

今回から[@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/)を利用したコンポーネントテストを行っております。

また、デザインシステムを効率よく、かつ保守的に組むために自分がめちゃくちゃ推してる[vanilla-extract](https://vanilla-extract.style/)をつかって型安全な Zero Runtime CSS in JS の恩恵を存分に受けています。

~~今とても気になっている Panda CSS でも良かったなと少し後悔しています~~

## あとがき

ぱずかるにデータを提供してくださっているトップランカーの[じゃぶおじさん](https://twitter.com/jab_ozzy)様が史上初のランク 2000 に到達したそうです、本当におめでとうございます。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ランク2000に到達しました❗️<a href="https://twitter.com/hashtag/%E3%83%91%E3%82%BA%E3%83%89%E3%83%A9?src=hash&amp;ref_src=twsrc%5Etfw">#パズドラ</a> <a href="https://t.co/FFx3ZOj0cE">pic.twitter.com/FFx3ZOj0cE</a></p>&mdash; じゃぶおじさん (@jab_ozzy) <a href="https://twitter.com/jab_ozzy/status/1667903966196400129?ref_src=twsrc%5Etfw">June 11, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

すごすぎますよね...自分がランク上げをやってた 5 年前、ランク 1000 になっただけで大喜びしてたのが懐かしいです。
