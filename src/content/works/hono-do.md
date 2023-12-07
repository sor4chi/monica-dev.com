---
title: "Hono DO"
createdAt: 2023/9/27
description: "A wrapper of Cloudflare Workers's Durable Object for Hono."
---

[Hono DO](https://github.com/sor4chi/hono-do) は、[Hono](https://hono.dev) を使用した [Cloudflare Workers](https://workers.cloudflare.com/) の [Durable Object](https://developers.cloudflare.com/workers/learning/using-durable-objects) ラッパーライブラリです。

## 背景

[Itty Router](https://github.com/kwhitley/itty-router) という、Hono と同じ Web Standard を謳っている Web フレームワークの作者 [Kevin R. Whitley](https://github.com/kwhitley) が、Itty RouterをDurable Objectで使う [Itty Durable](https://github.com/kwhitley/itty-durable) というOSSを開発しており、Hono コミュニティでも Hono を Durable Objectで使いたいという要望がありました。

<https://github.com/honojs/examples/issues/86>

<https://github.com/honojs/hono/issues/1173>

そのため「この需要を叶えたい！」と思い、このライブラリを作ることにしました。
私は開発当初その存在を知らなかったためとても異なるインターフェースにはなってしまいましたが、 Durable Object のポータブルさと Hono の洗練されたインターフェースを両立させたとても開発者体験の良いライブラリが提供できたと思っています。

## 従来の Durable Object

従来の書き方では、ポータブルさが素晴らしい一方でマルチエンドポイントに対して `pathname` での `switch` を書く必要があったりレスポンスオブジェクトをそのまま扱わなければならなかったりします。

```ts
export class Counter {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    let url = new URL(request.url);

    let value = (await this.state.storage.get("value")) || 0;

    switch (url.pathname) {
      case "/increment":
        ++value;
        break;
      case "/decrement":
        --value;
        break;
      case "/":
        break;
      default:
        return new Response("Not found", { status: 404 });
    }

    await this.state.storage.put("value", value);

    return new Response(value);
  }
}
```

## Hono DO ならこう書ける

Hono DO では `prototype` を使って動的にオブジェクトを生成し、それぞれのエンドポイントをコールバックで受け取れる `Hono` オブジェクトでハンドルすることができます。

```ts
export const Counter = generateHonoObject("/counter", async (app, { storage }) => {
  let value = (await storage.get<number>("value")) ?? 0;

  app.post("/increment", (c) => {
    storage.put("value", value++);
    return c.text(value.toString());
  });

  app.post("/decrement", (c) => {
    storage.put("value", value--);
    return c.text(value.toString());
  });

  app.get("/", (c) => {
    return c.text(value.toString());
  });
});
```

## 発展的な使い方

### State Helper

Hono DO では `State Helper` という機能を提供しています。これは、Durable Object で Atomic な状態を管理するのに使う KV ストレージ API をより型安全に扱うための機能です。
サブパッケージとして提供しているので必要に応じて呼び出すことが可能です。

```ts
import { generateHonoObject } from "hono-do";
import { defineStorage } from "hono-do/storage";

export const Counter = generateHonoObject("/counter", async (app, { storage }) => {
    const [getValue, setValue, delValue] = await defineStorage(storage, "value", 0);

    app.post("/increment", async (c) => {
      setValue((value) => value++);
      return c.text((await getValue()).toString());
    });

    app.post("/decrement", async (c) => {
      setValue((value) => value--);
      return c.text((await getValue()).toString());
    });

    app.get("/", async (c) => {
      return c.text((await getValue()).toString());
    });
  },
);
```

もっとコードを見たい方はぜひ [examples](https://github.com/sor4chi/hono-do/tree/main/examples) をご覧ください。
Issue や Pull Request は大歓迎です。使ってみた報告もお待ちしています。
