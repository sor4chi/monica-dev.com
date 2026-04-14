---
title: "Discorder"
createdAt: 2023/9/3
description: "CLIからdiscordのwebhookを叩けるツール"
---

Discorder は、SSH 環境などで手軽にデバッグをしたいというニーズに応えるために作ったツールです。

プロファイルした結果を Discord に送ることで、リアルタイムに確認・メンバーとの共有ができますので、ISUCON などで使うと便利です。

Rust で書かれており、CLI から Discord の Webhook をさまざまな形式で叩くことができます。

## 使い方

### テキストを送る

```bash
$ discorder -w https://discordapp.com/api/webhooks/xxx/yyy -t "Hello, World!"
```

### ファイルを送る

```bash
$ discorder -w https://discordapp.com/api/webhooks/xxx/yyy -f ./hello.txt
```

### 標準入力から送る

```bash
$ discorder -w https://discordapp.com/api/webhooks/xxx/yyy -t "Hello, World!" -f ./hello.txt
```

### パイプから送る

```bash
$ echo "Hello, World!" | discorder -w https://discordapp.com/api/webhooks/xxx/yyy
$ cat ./hello.txt | discorder -w https://discordapp.com/api/webhooks/xxx/yyy
```
