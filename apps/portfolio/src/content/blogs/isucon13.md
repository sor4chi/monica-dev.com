---
title: ISUCON13に参加してきました
description: 2023/11/25に開催された ISUCON13 に参加してきました。対策や参加した感想をまとめました。
publishedAt: 2023/11/30
---

今回、 t@a01sa01to と t@Ryoga_exe と私 t@sor4chi の 3 人で **Maxif.** というチーム名で参加してきました。
去年の予選 (ISUCON12q) 開催時に Twitter で知り、今年は絶対に参加したいと思っていたので、参加できてとても嬉しかったです。
結果は **58960** 点くらい、総チーム数 694 中 **25** 位で学生 **5** 位でした！
初参加にしては健闘できたと思います。

## 練習

今回は弊学のプログラミングサークル [Maximum](https://maximum.vc) から 8 人と助っ人の筑波大学の 1 人から 3 チーム (Maxif.、maximum-baby、maximum.mum)を結成し、それぞれのチームで練習をしていました。

練習では全員が同じスペックで環境を構築して対策できるように、さくらのクラウドさんで [Terafform Provider SakuraCloud](https://github.com/sacloud/terraform-provider-sakuracloud) と [Cloud Init ISUCON](https://github.com/matsuu/cloud-init-isucon) を使って IaC で環境を構築しました。

また、本戦同様に得点推移を確認できるように簡易的なリーダーボードも内製しました。

https://leaderboard.maximum.vc

![Leaderboard](/assets/blogs/isucon13/leaderboard.webp)

## 本戦

実際のコードはこちらにあります。

https://github.com/sor4chi/isucon13

焦りすぎて点数の正確な記録が一部ないため、以下はおおよその記録だと思ってください。

### チーム分担

| 名前        | 担当の流れ                                                    |
| ----------- | ------------------------------------------------------------- |
| t@sor4chi   | セットアップ → App のチューニング → Nginx/MySQLのチューニング |
| t@a01sa01to | 仕様書読む → DNS関連 → サーバー分割 → App のチューニング      |
| t@Ryoga_exe | 仕様書読む → App のチューニング                               |

### 作業ログ

::::timeline

#### [10:18] 初期点 (3950)

初期点は **3950** でした。

Nginx / MySQL 構成であること、Go 言語で立っていること、`sysmtectl | grep isu`、neofetch などお決まりの環境チェックをして、例年の構成と同じだと判断しました。

用意していた Makefile を置いたり、 alp や pt-query-digest 、 [discorder](/work/discorder) などのツールを落としてきました。

#### [10:22] 各種ログセットアップ (3119)

今回はそのままいつものように nginx のアクセスログと mysql のスロークエリログと pprof を取得しました。

各種ログセットアップは **3119** でした。

#### [10:35] DNSのTTLを設定 (3255)

t@a01sa01to が DNS キャッシュの TTL が 0 になっていることに気づき、TTL を 3600 に設定しました。

[DNSレコードのTTLを3600に](https://github.com/sor4chi/isucon13/commit/b4bab59ec70627c53f1bc208996f6cc24450a830)

#### [10:45] `livestream_tags` へINDEX貼る (2958)

ベンチマークを走らせてみると、やはりスロークエリが多いようでした。

pt を見ると上位に `Rows examine (avg) 10.88k` に対して `Rows sent (avg) 3.69` というトンデモクエリがあったので、これに対してインデックスを貼りました。

```sql
SELECT * FROM livestream_tags WHERE livestream_id = 7494\G
```

> [!NOTE]
> ※ 実は貼ったつもりでしたが、貼り方を間違えていて点数が上がらず地獄でした。
> 同じサークルから別チームで出ていて、練習会で一回も負けたことない maximum-baby と maximum.mum が初っ端から6000点とか出してて「俺ら今回負けるんじゃね！？」なんて話してた記憶があります
>
> 以降、DB負荷が下がらないまま 3~5000 点付近5時間ほどうろうろすることになります

[livestream_tagsへINDEX貼る](https://github.com/sor4chi/isucon13/commit/b8a780b2ea701f44bca318d17144407528d72673)

#### [11:15] `fillLivestreamResponse` の tags に関するN+1を解消 (3141)

t@sor4chi が `fillLivestreamResponse` 内の tags に関する N+1 を解消しました。ほとんど誤差な気がします。

[fillLivestreamResponseのtagsに関するN+1を解消](https://github.com/sor4chi/isucon13/commit/fb404854bc846e5c4d5b1af9b9c9939d593fbe5f)

#### [11:30] themes をキャッシュ (3650)

t@sor4chi が themes テーブルへのクエリが `SELECT` と `INSERT` しかないことに気づき、 `SELECT` した結果をキャッシュするようにしました。

[themesをcacheするように](https://github.com/sor4chi/isucon13/commit/0e65b2d4856dc3018fde6badb12e27991fdd95cb)

#### [12:35] user icon の hash をキャッシュ (3543)

ユーザーのアイコンのハッシュをキャッシュすることで、DB の負荷を下げました。
この時同時に `If-None-Match` を使って、キャッシュが有効な場合は `304 Not Modified` を返すようにしたつもりだったのですが、実際はリクエストの `If-None-Match` ヘッダはダブルクォーテーションで囲まれていたため、その Hash 文字列と素の Hash が一致しないためキャッシュが効いていませんでした。
(これは最後まで気づきませんでした)

それから、キャッシュヒットせずにハッシュを生成したあと、`ETag` ヘッダに入れないといけないことを知らず、フロントエンドエンジニアとしてとても恥ずかしいことをしました。
(これも気づかなかったのでほとんど意味なかったのかなと思ってます)

[userIconCache](https://github.com/sor4chi/isucon13/commit/ddc9c600ab24b5037c3bd96d1309300d804c4af5)

#### [13:27] サーバー分割 (4504)

t@a01sa01to がサーバー分割を行いました。
ついでにベンチ開始後の DNS 追加設定にも TTL を設定するようにここで変更してくれたようです。

| サーバー名 | 役割                 |
| ---------- | -------------------- |
| S1         | DNS + MySQL (DNS DB) |
| S2         | Nginx + App (Web)    |
| S3         | MySQL (App DB)       |

のようにすることで、水責めの負荷が App や App DB に影響しないようにしました。この分割の判断はかなり早かったと思います。
さらに、DNS DB にも Lookup 負荷がかかることに気づき、INDEX を貼っていくれたそうです。

t@a01sa01to が表現してくれたフローがこちら。わかりやすい。

```txt
ベンチ -[global]-> DNS (s1) -[local]-> DB (s1)
ベンチ -[global]-> nginx (s2) -[local]-> App (s2) -[private]-> DB (s3)
```

DNS 何もわからんなのでとても助かりました。

[サーバー分割](https://github.com/sor4chi/isucon13/pull/12)

#### [13:39] `moderateHandler` のN+1解消 (4763)

t@sor4chi が `moderateHandler` の N+1 を解消しました。

[moderateHandlerのN+1解消](https://github.com/sor4chi/isucon13/commit/2eb1e3d2b3da5ccc57f4fe1aa2ba0a9dcd9c5514)

#### [14:27] `getUserStatisticsHandler` のN+1解消 (6409)

t@Ryoga_exe が `getUserStatisticsHandler` の N+1 を解消しました。

[getUserStatisticsHandlerのN+1解消](https://github.com/sor4chi/isucon13/commit/0b389466652a66a7ee22f8555b89b5de1a4138c4)

#### [15:00] INDEXを正しく貼る (22687)

開始から 5 時間経って、t@a01sa01to がやっぱり INDEX が効いてないんじゃないかと言い出して、実際に MySQL にログインして `EXPLAIN` してみると、 `livestream_tags` に `livestream_id` に対する INDEX が貼られていないことに気づきました。

じゃあもうわからんから `10_schema.sql` に書くのやめようということで `Index Already Exists` にならないようにアプリ側でキャッチしながら `CREATE INDEX` するようにしました。

ついでに `pt-query-digest` 上位だった SELECT の `Rows examine / sent` 比が高いクエリ全てに INDEX を貼りました。

| テーブル名          | カラム名                   |
| ------------------- | -------------------------- |
| `livestream_tags`   | `livestream_id`            |
| `livestreams`       | `user_id`                  |
| `reservation_slots` | `start_at`, `end_at`       |
| `ng_words`          | `user_id`, `livestream_id` |
| `icons`             | `user_id`                  |

[GoでIndex貼る](https://github.com/sor4chi/isucon13/commit/735cd399b6148af6065ea88ee9abd72bc9e0e7fd)

[Indexふやす](https://github.com/sor4chi/isucon13/commit/d738e95bcdc0bb003bda63b9d13e2d500d437c5c)

[Indexふやし](https://github.com/sor4chi/isucon13/commit/4f807132ce945f5040aef3e16f6be6ce147c236d)

ここで点数が **22687** と一気に 4 倍近くまで上がりました。

t@sor4chi「本当にごめん、あとで土下座させていただきます」

#### [16:19] `getReactionsHandler` の N+1 解消 (28638)

t@Ryoga_exe が `getReactionsHandler` の N+1 を解消しました。

[getReactionsHandlerのN+1解消](https://github.com/sor4chi/isucon13/commit/d231b0ba9dae26dc906117a8ce0ed59aa7a07212)

#### [17:00] (リーダーボード凍結)

最後の 1 時間はリーダーボードが凍結します。凍結直前の時点で 23 位だったので、「30 位圏内には入れそうだねー」という話をしていました。

![1時間前のYoutube配信画面](/assets/blogs/isucon13/1-hour-left.webp)

#### [17:15] user icon の hash の余分な計算を削減 (38578)

キャッシュヒットした後でもに DB に image を取りにいくような実装になっていることに気づき、t@a01sa01to がキャッシュヒットした後は DB にいかないようにしました。

[userIconの余分なDBアクセスを削減](https://github.com/sor4chi/isucon13/commit/292a16e521cf29ed839534466d4c3b1ebf76eebe)

#### [17:24] `fillLivestreamResponse` の N+1 解消 (45116)

t@sor4chi が `fillLivestreamResponse` の N+1 を解消しました。

[ownerのN+1解消](https://github.com/sor4chi/isucon13/commit/ebff290be52b5273ebb5ae192d5e6f81a3b496b5)

[livestreamのN+1解消](https://github.com/sor4chi/isucon13/commit/52d70320992e3e2309ff0a2b813c37ccc10c0c1d)

[livestreamTagModels解消](https://github.com/sor4chi/isucon13/commit/7e32ae3c93e546bf0fa460f3e5f374948a39fd82)

#### [17:37] `fillUserResponse` の N+1 解消 (52872)

t@sor4chi が `fillUserResponse` の N+1 を解消しました。

[themeのN+1解消](https://github.com/sor4chi/isucon13/commit/aa5d8704bd970f1d12729cd18881325dc5b055ec)

[userIconのN+1解消](https://github.com/sor4chi/isucon13/commit/5cff267d99599363247c0b569b3f68d7ff29bca0)

#### [17:51] 整合性エラー (0)

最後の 9 分で整合性エラーが出てしまいました。その時ちょうど `systemctl disable` 作業をしていたので、一度 `systemctl enable` して戻したのですが治らず...。
全員で急いで確認したところ、`isupipe-go.service` がおそらく前のベンチマークの負荷で途中で異常終了していたことが原因でした。
仕方ないですが、最終チェックでエラーにならないことを祈りつつ `systemctl enable` してベンチマークを再開しました。

#### [17:58] ログ閉じ (58960)

最後の 2 分で Logger Middleware を消したり、Access Log と Slow Query Log、pprof を閉じて最後のベンチマークを走らせました。

以上、とりあえず影響がありそうだったやつをピックアップして時系列で紹介してみました。他にも色々やってるのでこれが全てではないです！

::::

## できなかったけどやりたかったこと

- DB の Max Connection 数を増やす (最後の 5 分くらいで 10 に制限されていることに気づいた)
- `interpolateParams=true` にする (気付いてましたがやるのを忘れてました)

他にもあった気がしますが、大会で相当焦っていたので忘れてしまいました。

## 感想

INDEX が効いてない間、点数が上がらなくても極端に下がらなければ積極的にマージするような方針で動いてました。
「どこかにボトルネックがあり、そこが解消すると点数が一気に上がるはず」と信じていたので、実際 INDEX を貼って点数が 4 倍になった時はこれまでの努力が報われた気持ちになりました。

ただ、ちゃんと INDEX 貼れているかの確認を怠っていたのは反省点です。ちゃんと Slow Log を監視していれば `examine / sent` 比が依然として高いクエリがあることに気づいていたと思います。これに気づけていれば 10 万点いけてたかもしれないので本当に悔しいです。

来年は計測力を強化してもっと根拠を持った改善をしていきたいです。

最終的なスコア遷移はこのようになりました。

![Score](/assets/blogs/isucon13/score-transition.webp)

目標の 30 位圏内に入れて、とても嬉しかったです。
Go 未経験の 3 人で初参加ということで色々苦労した点はありましたが、ISUCON 上位入賞という目標に全力で取り組めて、とてもいい経験になりました！
