---
title: "Hono Storage"
createdAt: 2023/10/13
description: "A storage helper for Hono. Support disk, memory, S3, etc."
---

[Hono Storage](https://github.com/sor4chi/hono-storage) は [Hono](https://hono.dev) で `multipart/form-data` を楽に扱うためのライブラリです。

## 背景

Node.js の Web フレームワーク [Express](https://expressjs.com/) には、 `multipart/form-data` を扱うために [multer](https://github.com/expressjs/multer) というライブラリがあり、とても有名で多くの人に使われています。

Hono は Web 界隈で度々 Express の後継として取り上げられています。
そんな影響もあってHono コミュニティではよく 「multer があるか」、「`multipart/form-data` を扱うライブラリはあるか」という Issue や Discussion を見かけます。

そこで、Hono で `multipart/form-data` を扱うためのライブラリ 「Hono Storage」を開発しました。

## コンセプト

Hono Storage は、@hono-storage というスコープで公開されています。

Hono の Universal な設計に則り、コアパッケージを Web Standard のみで実装し、各種ストレージをプラグインとして提供するようにしています。

### Core Storage

[@hono-storage/core](https://www.npmjs.com/package/@hono-storage/core) は、Hono Storage のコアパッケージです。`multipart/form-data` を扱うためのインターフェースを提供します。

multer の資産をなるべく流用したいため、multer が持つ `storage.single`, `storage.array`, `storage.fields` というインターフェースを実装しています。

> [!WARNING]
> multer とは異なり、Hono Storage は `storage.array` ではなく `storage.multiple` という命名を採用しています。

```ts
import { Hono } from "hono";

const app = new Hono();

const storage = // coreストレージかプラグインストレージ
  app.post("/upload/single", storage.single("image"), (c) => c.text("OK"));
app.post("/upload/multiple", storage.multiple("pictures"), (c) => c.text("OK"));
app.post(
  "/upload/field",
  storage.fields({
    image: { maxCount: 1 },
    pictures: { maxCount: 2 },
  }),
  (c) => c.text("OK"),
);

// appのサーブ
```

FormDataのファイルフィールドの名前を指定して、ファイルをいろいろな形式でハンドルすることができます。

Core Storage は、以下のようなインターフェースを提供します。

```ts
import { HonoStorage } from "@hono-storage/core";

const storage = new HonoStorage({
  storage: (c, files) => {
    // ファイルを保存する処理
  },
});
```

### Disk Storage

[@hono-storage/node-disk](https://www.npmjs.com/package/@hono-storage/node-disk) は、Node.jsを仲介してディスクに保存するストレージです。

```ts
import { HonoDiskStorage } from "@hono-storage/node-disk";

const storage = new HonoDiskStorage({
  dest: "./uploads",
  filename: (c, file) =>
    `${file.originalname}-${new Date().getTime()}.${file.extension}`,
});
```

### Memory Storage

[@hono-storage/memory](https://www.npmjs.com/package/@hono-storage/memory) は、メモリ上に保存するストレージです。

```ts
import { HonoMemoryStorage } from "@hono-storage/memory";

const storage = new HonoMemoryStorage({
  key: (c, file) => `${file.originalname}-${new Date().getTime()}`,
});
```

`storage.buffer` で `Map<key, file>` が取得できます。ここに全てのファイルが格納されます。
テストなどで使うと便利です。本番環境での利用はおすすめしません。

### S3 Storage

[@hono-storage/s3](https://www.npmjs.com/package/@hono-storage/s3) は、AWS S3 に保存するストレージです。

```ts
import { S3Client } from "@aws-sdk/client-s3";
import { HonoS3Storage } from "@hono-storage/s3";

const client = new S3Client({
  region: "[your-bucket-region]",
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  },
});

const storage = new HonoS3Storage({
  key: (_, file) =>
    `${file.originalname}-${new Date().getTime()}.${file.extension}`,
  bucket: "[your-bucket-name]",
  client,
});
```

実は Cloudflare の R2 は S3 互換なAPIを提供しているため、R2 でも動作します。

```ts
import { S3Client } from "@aws-sdk/client-s3";
import { HonoS3Storage } from "@hono-storage/s3";

const client = new S3Client({
  region: "auto",
  endpoint: `https://${ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  },
});

const storage = new HonoS3Storage({
  key: (_, file) =>
    `${file.originalname}-${new Date().getTime()}.${file.extension}`,
  bucket: "[your-bucket-name]",
  client,
});
```

## 今後の展望

- [ ] Deno Disk対応 (現在はnpm specifierを経由すれば動作します)
- [ ] Bun Disk対応 (現在はnpm specifierを経由すれば動作します)

他にも、Hono Storage に対応してほしいストレージがあれば、ぜひ [Issue](https://github.com/sor4chi/hono-storage/issues) に投稿してください。
