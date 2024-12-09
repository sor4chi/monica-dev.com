---
title: ISUCON14に参加してきました
description: 2024/12/08に開催された ISUCON14 に参加してきました。対策や参加した感想をまとめました。
publishedAt: 2024/12/08
---

今回も去年同様、 t@a01sa01to と t@Ryoga_exe と私 t@sor4chi の 3 人で **Maxif.** というチーム名で参加してきました。参加2回目でございます。
結果は **24640** 点くらい、総チーム数 834 中 **29** 位で学生 **4** 位でした！2年連続入賞です！
チームメンバーに本当に助けられました、ありがとう。

## チームメンバーの参加記

<https://a01sa01to.com/articles/2024/12/isucon14>

## 練習

練習も去年同様、弊学のプログラミングサークル [Maximum](https://maximum.vc) から 8 人と助っ人の筑波大学の 1 人から 3 チーム (Maxif., Maximum-Y.N.K.S, Maxipus) を結成し、それぞれのチームで練習をしていました。

今年も g@matsuu さんの [cloud-init-isucon](https://github.com/matsuu/cloud-init-isucon) およびデプロイ先のさくらのクラウドさんの [Terraform Provider SakuraCloud](https://registry.terraform.io/providers/sacloud/sakuracloud) には大変お世話になりました。

## 本戦

実際のコードはこちらにあります。

<https://github.com/isucon-maxif/isucon14>

今年から Maxif. も Github Organization 作りました。やったね。

今回もスコアが明確に変化した段階でタグを切るようにしています。[ここ](https://github.com/isucon-maxif/isucon14/tags)から各変更がどれだけスコアに影響したかを見ることができます。
(若干ずれててすいません...)

### チーム分担

毎年問題内容によって変わりますが、今年は以下のように分担しました。

| 名前        | 担当の流れ                                                          |
| ----------- | ------------------------------------------------------------------- |
| t@sor4chi   | セットアップ → App のチューニング → Nginx/MySQLのチューニング       |
| t@a01sa01to | 仕様書読む → App のチューニング → サーバー分割 → App のチューニング |
| t@Ryoga_exe | 仕様書読む → App のチューニング                                     |

### 改善時系列

::::timeline

#### [10:42] 初期点 (1022)

初期点は **1022** でした。

自分が配布された Cloudformation の Security Group にアウトバウンドの設定がないことに気づかず、用意していた pprotein.sor4chi.com に pprotein-agent の集計結果が送信できずつまづき、結局サーバー内にpproteinを立ててLocalForwardするという力技で解決しました。
この時点で開始から42分ほど経過していて申し訳ない...。

#### [11:00] Index 貼り (3004)

t@a01sa01to が Index をガンガン貼って行ってくれました。
自分が pprotein を調整している間、Slow Query Logは既に出せていたので、セットアップが終わった瞬間に計測してスコアUPというなんとも素晴らしい初動でした。

自分が見た時にはもう Slow Query Log で見つけられる Index の貼り忘れはほぼない状態でした。

#### [11:04] appGetNearbyChairs の高速化 (3408)

t@Ryoga_exe が appGetNearbyChairs が条件の評価順を変えれば早期リターンできることに気づき、高速化してくれました。

<https://github.com/isucon-maxif/isucon14/pull/13>

#### [11:08] chairAuthMiddleware の 高速化 (4225)

この時点で、pprof では chairAuthMiddleware 直下の GetContext が大部分を占めていました。
t@sor4chi が accessToken から引ける chair のオンメモリキャッシュをし、Middleware 上で DB へクエリする回数が減りスコアが上がりました。

<https://github.com/isucon-maxif/isucon14/pull/14>

#### [12:13] RetryAfterMs を 500ms に (6940)

ここを見つけるまで1時間以上詰まりました。

明らかに Notification 系のエンドポイントの呼び出し回数と、それに基づく Access Log の Sum Time が多いことに気づき、実装を見ると、RetryAfterMs が 30ms に設定されていました。
(仕様書にも書いてたらしいのですが、メンバー誰も見当をつけておらず偶然の発見となってしまいました...)
t@sor4chi が RetryAfterMs を 500ms に変更すると、トランザクションの占有時間が減り他がリクエストを多く捌けるようになったのか、スコアが上がりました。

<https://github.com/isucon-maxif/isucon14/pull/18>

#### [13:19] 椅子マッチングを貪欲に (13073)

t@a01sa01to が 椅子マッチングが効率の悪い乱択実装になっているのを見つけ、貪欲にマッチングさせる方向で実装することで高速・より良いマッチになりました。
なんとこのチーム、**3人とも Atcoder Heuristic 青コーダー** なんですよ。まあISUCONの8時間で最適化を実装する余地なんてないわけですが。
t@a01sa01to がしきりに「**Flow流せるんじゃね？GoのACLにFlowないかな**」とか呟いてて面白かったです。

<https://github.com/isucon-maxif/isucon14/pull/19>

この頃、他のチームのベンチ状況で**1 位になる瞬間**があり、上位を走れていたんじゃないかなと思います。
![一時的に1位になった図](/assets/blogs/isucon14/top-temporary.png)

#### [13:45] getLatestRideStatus 関連の N+1 解消 (14674)

t@sor4chi が getLatestRideStatus関連 の N+1 問題を解消しました。

<https://github.com/isucon-maxif/isucon14/pull/23>

#### [~3時間] 沈黙の時間

この間3時間、ほとんど何もできないままでした。
t@a01sa01to はサーバー分割をトライするも WARN が出まくって0点になったりスコアが下がってしまったり。
t@sor4chi は chairPostCoordinate の高速化に挑戦するも整合性エラーで落ちまくり...。
苦しい時間でした。
t@Ryoga_exe は頑張って N+1 を潰しまくってくれたもののスコアにはほぼ反映されず...。

メトリクス的にも chairPostCoordinate が大きく影響していることがわかっていながら、全く手を付けられなかったのが辛かったです。

途中で `No space left on device` が出て、「**あーこれ Docker でよく見るやつー**」と思いつつ `df -h` で確認すると pprotein 内の `*.log` と `*.pb.gz`、`mysql-slow.log` がディスクの殆どを占有していました。
後でログを見返せなくなるのは残念ですが全て削除して対処しました。

#### [16:18] ownerGetSales の N+1 解消 (15191)

t@Ryoga_exe が ownerGetSales の N+1 問題を解消しました。

<https://github.com/isucon-maxif/isucon14/pull/32>

#### [16:18] isu テーブルの現在位置所持 (15343)

t@a01sa01to が isu テーブルに現在位置を持たせることで、appGetNearbyChairs が高速化しました。

<https://github.com/isucon-maxif/isucon14/pull/30>

この後で t@Ryoga_exe や t@sor4chi が残りの簡単な N+1 問題を解消しました（スコアは上がりませんでしたが今後に効いてくることを期待して勇気のマージをしました）

#### [17:15] ISUCON_MATCHING_INTERVALのチューニング (16890)

t@a01sa01to がヒューリスティックを頑張ってくれました。
internalGetMatchingの重みや閾値を調整したり、ISUCON_MATCHING_INTERVAL を 2.0 まで上げることで負荷を下げて、スコアを上げてくれました。

<https://github.com/isucon-maxif/isucon14/pull/36>

#### [17:45] ログ閉じ (23656)

ISUCONではそこそこの追試落ちが発生するため、安定をとって残り15分になったら何がなんでも締め作業に入ると言っていました。
時間になったので t@sor4chi が計測に使っていた nginx, mysql のログ出力をやめ、pproteinを剥がして計測をしました。するとなんとびっくり、スコアが **23656** になりました。ログ閉じただけでこんなに伸びたのは初めてなので結構衝撃でした。

例の `InterpolateParams=true` 設定もここでしています。

<https://github.com/isucon-maxif/isucon14/pull/37>

#### [17:50] MySQL の秘伝のタレを導入 (27491)

最後に t@sor4chi が MySQL の秘伝のタレを導入しました。去年用意してたやつで、バイナリログを無効化したり、バッファプールサイズを増やしたり色々やっています。

<https://github.com/isucon-maxif/isucon14/commit/3ebd1a566c078e6b712aca7fda6dfdef760b0ef1>

#### [17:55] 再起動して試験 (24640)

最後に再起動して envcheck してもろもろの最終確認をしてベンチをもう一度回して終わりです。

競技内の最後のスコアがそのまま使われるのを知らなくて、残り時間がもう少しあったのでベンチマークをして27000代まで戻せばよかったと後悔しています。
25 位スコアは出ていたのに...

::::

## 感想

本当に難しい回だったなと思いますしっかり計測してボトルネックをある程度特定できていても、それを解消する実装力がまだまだ足りないと感じました。
去年より順位は下がってしまいましたが、その分母数も増えて、入賞は去年よりも難しくなっていたと思います。その中で 2 年連続入賞できたことは本当に嬉しいです。

どうやら感想戦ができるらしいのでまた Maxif. で集まって反省会をしたいと思ってます。

ISUCON14 運営の皆様、スポンサーの皆様、戦ってくれたチームのみんな、本当にありがとうございました。

## TODO: 入賞賞品が届いたら追記する

---

さて、来年は私が就職するので学生枠として出られなくなります。
学生を続ける t@a01sa01to と t@Ryoga_exe に申し訳ないですが、良かったら今後も一緒に出てくれたら嬉しいナ。
