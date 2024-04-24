---
title: "TWrangler"
createdAt: 2024/4/10
description: "type-safe wrangler definition tool"
---

**Wrangler の定義を型安全に管理するツール**「TWrangler」を作成しました。

Cloudflare Workers などで使用される Wrangler は、デプロイ時の設定を `wrangler.toml` というファイルに記述します。
いちいち設定項目を調べるのが面倒だったので、それを TypeScript のリテラル型で縛り型補完の効く定義ができたらいいなと思い、このツールを作成しました。

## 使い方

### インストール

```bash
npm install -g twrangler # global install
npm install twrangler # local install
```

`package.json` に追加する場合は以下のように記述すると良いでしょう。

```json
{
  "scripts": {
    "build:wrangler": "twrangler build"
  }
}
```

### 設定

`wrangler.config.ts` というファイルを作成し、好きなように設定を記述します。

```ts
// wrangler.config.ts
import { defineConfig } from "twrangler";

import { defineConfig } from "twrangler";

export default defineConfig({
  name: "my-project",
  main: "src/index.ts",
  compatibility_date: "2022-03-21",
  env: {
    production: {
      d1_databases: [
        {
          binding: "DATABASE_URL",
          database_id: "xxxxx",
          database_name: "my-database",
        },
      ],
    },
    development: {
      d1_databases: [
        {
          binding: "DATABASE_URL",
          database_id: "yyyyy",
          database_name: "my-database",
        },
      ],
    },
  },
});
```

### 実行

```bash
twrangler build
```

`wrangler.toml` が生成されます。そのため `wrangler.toml` は `.gitignore` に追加しておくと良いでしょう。
