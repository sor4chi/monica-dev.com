---
title: 「ぱずかる」をリリースしました
description: 人気ソーシャルゲーム Puzzle & Dragons 通常「パズドラ」の計算機「ぱずかる」を作りました。ランク経験値を計算するWebアプリケーションです。
publishedAt: 2020/03/08
updatedAt: 2023/05/08
---

## 紹介

人気ソーシャルゲーム Puzzle & Dragons の計算機「ぱずかる」を作りました。

<https://pazcal.net>

**ぱずかる**は、ゲーム内においてランク上げをする人のために、**必要経験値量**や**必要課金料**、**周回数**、**所要時間**などを入力データに基づいて算出するWebアプリケーションです。

[iOS-Pazcal](https://apps.apple.com/jp/app/pazcal/id1513600331) もあります。こちらはiOSエンジニアの友人に委託してリリースしました。

プログラミング始めたばかりの時に作ったので、技術やデザインなどがとても拙いです...。

ありがたいことに現在**100万PV**を超え、たくさんのユーザーの方々に利用していただいております。

ユーザーのインタレストはTwitterで[#ぱずかる](https://twitter.com/search?q=%23ぱずかる&src=typed_query)と検索するとご覧いただけます。

## メディア

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">【ご報告】この度新たにパズドラ経験値計算機公式Twitterを設けました。毎度ご利用頂きありがとうございます。<br>サイトに関して最新情報を随時更新予定なので、是非フォローをよろしくお願いします。<br><br>2020/3/25 運営一同 <a href="https://t.co/YTPStk8asE">pic.twitter.com/YTPStk8asE</a></p>&mdash; 【公式】｢ぱずかる｣パズドラ経験値計算機 (@pad_calculator_) <a href="https://twitter.com/pad_calculator_/status/1242813183179407363?ref_src=twsrc%5Etfw">March 25, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

![Pazcal Web](https://monica-log.s3.ap-northeast-1.amazonaws.com/blog/Capture-2023-05-08-145625.png)

![Pazcal iOS](https://monica-log.s3.ap-northeast-1.amazonaws.com/blog/Capture-2023-05-08-145656.png)

## 構成

HTML / CSS (Static)
Django (Rest Framework API)
