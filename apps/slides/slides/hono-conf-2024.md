---
theme: eloc
highlighter: shiki
presenter: dev
---

## Third-Party Framework Development with Hono

Hono Conference 2024

<!--
Hono Conference 第1回に登壇させていただくので感謝を述べる
今回が人生で初の登壇
-->

<https://slides.monica-dev.com/hono-conf-2024>

---

<h3>Third-Party Framework Development <span class="text-red">with</span> Hono</h3>

<!--
実はスライドのタイトルを間違ってつけていて
-->

---

<h3>Third-Party Framework Development <span>🔥</span> Hono</h3>

---

<h3>Third-Party Framework Development <span class="text-blue">for</span> Hono</h3>

<!--
"for" Honoでした
-->

---

**Sorry for my Bad English 😅**

---

<div class="flex items-center justify-center gap-32">
  <div class="flex flex-col items-center gap-8">
 <img src="https://github.com/sor4chi.png" alt="icon" class="rounded-full w-48 h-48">
    <strong>Monica</strong>
  </div>

  <div class="flex flex-col gap-4">
    <span>
       Github: <a href="https://github.com/sor4chi">@sor4chi</a>
    </span>
    <span>
       X: <a href="https://twitter.com/sor4chi">@sor4chi</a>
    </span>
    <span class="break-all">
       Hobby:<br/>
      Web Dev, Competitive Programming (Heuristic), NLP
    </span>
  </div>
</div>

<!--
Monicaです。
GithubやXなどではこちらのIDをよく使っているため、もしかしたらそちらの方がお馴染みかもしれません。

大学四年生です。
大学では自然言語処理を勉強していて、趣味はWeb関連の開発と最近ヒューリステック分野の競技プログラミングにハマっています。
-->

---

## My 🔥 History

Started contributing to Hono in July 2023

- `c.stream`/`stream helper` development from September 2023
- `Hono Storage` development from September 2023
- `Hono DO` development from September 2023
- `acceptHelper` development in October 2023
- `Swagger UI` middleware development in November 2023 (with @naporin24690)

<!--
題材を決めるときに、実際に何を話そうかなーと思って振り返ってみました
去年7月にHonoのコントリビュートを始める
`c.stream`や`stream helper`を9月から開発
`acceptHelper`の開発
他いろいろなissueの解決とか、レビューとかドキュメントよく書いてる
-->

---

Today's talk:

- **Tips for creating a third-party framework for Hono**
- **How to liven up the Hono community through third-party development**

<!--
- Hono の 3rd-party フレームワークを作る上で知っておきたい技術
- 3rd-party フレームワーク開発を通してどのようにHonoコミュニティーを盛り上げるか
-->

---

Purpose:

- **Get people interested in developing Hono's third-party frameworks**
- **Increase the number of people participating in the development of peripheral libraries and frameworks**

<!--
- 3rd-party Framework開発に興味を持ってもらうこと
- 周辺フレームワークの開発に参加したり新たに立ち上げたりしてくれる人の数を増やすこと
-->

---

Warning:

This talk is **not an official statement** from Hono (@yusukebe). Please note that.

---

## What to Know When Creating a Third-Party Framework for Hono

<!--
Honoのサードパーティフレームワークを作る時に知っておきたいこと
-->

---

### Middleware

Middleware is the easiest to create as a third party. Even when using Hono in production, custom middleware is often written.

You can process requests and responses before or after they reach the handler, such as modifying, validating, and authenticating them.

<!--
よく知られた一番簡単にHonoを拡張できるアプローチ。
ハンドラ到達前後のリクエストレスポンスに介入したり、バリデーション・認証も行える。
-->

---

These are the official third-party middlewares for Hono:

<div class="flex items-center justify-center gap-32 h-60vh">

<div>

- Request Interception
  - `@hono/*-transpiler`
  - `@hono/*-validator`
- Authentication
  - `@hono/*-auth`
  - `@hono/oauth-providers`

</div>

<div>

- Logging
  - `@hono/sentry`
  - `@hono/prometheus`
- Handler Overwrite
  - `@hono/swagger-ui`
  - `@hono/qwik-city`
  - `@hono/graphql-server`
  - `@hono/trpc`

</div>

</div>

You can find more on [hono/middleware](https://github.com/hono/middleware).

---

These are the community third-party middlewares (framework) for Hono:

- Remix Hono
- Ultra
- Ree.js
- hwy
- Hono Rate Limiter
- Hono Sessions
- Hono Storage
- y-durableobjects
- Hono DO

---

Let's take a quick look at the implementation of middleware

<!--
いくつか簡単に実装を見てみましょう
-->

---

#### `@hono/oauth-providers`

`@hono/oauth-providers` is a middleware for using OAuth providers in Hono. It is a Zero Dependencies middleware that implements the flow of OAuth providers such as **Google**, **Facebook**, **Github**, **LinkedIn**, **X**, and **Discord**.

<!--
- Zero Dependencies
-->

---

The usage is like this, just import each provided middleware and put it in front of the handler or `app.use`. So Convenient!

```ts
import { Hono } from 'hono'
import { googleAuth } from '@hono/oauth-providers/google'

const app = new Hono()

app.use(
  '/google',
  googleAuth({ settings }), // set your secrets
)

app.get('/google', (c) => {
  const user = c.var['user-google']
  return c.json({ user })
})

export default app
```

<!--
使い方はこんな感じで、各提供されてるミドルウェアをimportしてハンドラの前もしくは`app.use`に刺すだけです。
-->

---

`googleAuth` middleware sets the user information in context variables. So you can use it like this.

```ts {12}
import { Hono } from 'hono'
import { googleAuth } from '@hono/oauth-providers/google'

const app = new Hono()

app.use(
  '/google',
  googleAuth({ settings }), // set your secrets
)

app.get('/google', (c) => {
  const user = c.var['user-google']
  return c.json({ user })
})

export default app
```

---

Let's look at how this context variable works.
This time, let's create a middleware that sets the logger.

---

````md magic-move
```ts

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello World!')
})

```

```ts

type Env = {
  Variables: {
    logger: (str: string) => string
  }
}

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello World!')
})

```

```ts

type Env = {
  Variables: {
    logger: (str: string) => string
  }
}

const app = new Hono()

const loggerMiddleware = createMiddleware<Env>(async (c, next) => {
  c.set('logger', (str) => console.log(str))
  await next()
})

app.get('/', (c) => {
  return c.text('Hello World!')
})

```

```ts

type Env = {
  Variables: {
    logger: (str: string) => string
  }
}

const app = new Hono()

const loggerMiddleware = createMiddleware<Env>(async (c, next) => {
  c.set('logger', (str) => console.log(str))
  await next()
})

app.get('/', loggerMiddleware, (c) => {
  c.var.logger('Request received')
  return c.text('Hello World!')
})

```
````

---

Arbitrary values can be passed externally to the handler.

In other words, this context variable can be used to achieve a kind of handler Dependency Injection (DI).

<!--
ハンドラにはContext Variablesを通して任意の値を渡すことができる。
言い換えると、ハンドラに対してDIのようなことができるということである。
-->

---

```ts
type Env = {
  Variables: {
    userRepository: IUserRepository
  }
}

const app = new Hono()

const repositoryInjector = createMiddleware<Env>(async (c, next) => {
  c.set('userRepository', new UserRepository())
  await next()
})

app.use(repositoryInjector)

app.get('/users', (c) => {
  const users = c.var.userRepository.getAll()
  return c.json(users)
})
```

---

This middleware part can then be easily mocked and tested by simply replacing it during testing.

<!--
あとはこのミドルウェアをmockに差し替えるだけで簡単にテストができてpureなハンドラが誕生します。
-->

---

`@hono/oauth-providers` implements all OAuth Flows in the `src/providers/**` directory.
Each provider has a middleware that implements an OAuth Flow specialized for that provider, but each provider has an ambient declaration of `ContextVariableMap` in the entry (`src/providers/**/index.ts`).

<!--
OAuth Providersはそれぞれプロバイダ別にフォルダが分けられていて、プロバイダごとに特化したOAuthFlowの実装がなされています。
今回注目するのはそれぞれのパッケージのエントリーポイントにある`ContextVariableMap`のアンビエント宣言です。
-->

---

<div class="flex items-center justify-center gap-12 h-60vh">

<div>

`@hono/oauth-providers/google`

```ts
declare module 'hono' {
  interface ContextVariableMap extends OAuthVariables {
    'user-google': Partial<GoogleUser> | undefined
  }
}
```

</div>

<div>

`@hono/oauth-providers/github`

```ts
declare module 'hono' {
  interface ContextVariableMap extends OAuthVariables {
    'user-github': Partial<GithubUser> | undefined
  }
}
```

</div>

</div>

---

This `ContextVariableMap` is for third parties to provide extendable fields for `Context` within Hono.

Third parties can type the properties used by clients in handlers, such as `c.get()`, `c.set()`, and `c.var`.

<!--
`ContextVariablesMap`はサードパーティフレームワークなどの`hono`外のモジュールがフィールドを拡張するために用意されているインターフェースで、外部から`c.get()`, `c.set()`, `c.var`に型をつけられる。
-->

---

For example, let's say you read a middleware called `timestamp` from an external module that sets the timestamp of the request to `c.var.time`.

```ts
type Env = {
  Variables: {
    time: number
  }
}

const timestamp = createMiddleware<Env>(async (c, next) => {
  c.set('time', Date.now())
  await next()
})
```

<!--
試しにリクエストが来た瞬間の時刻を`time`というContext Variableにセットするだけのミドルウェアを考えてみましょう。
-->

---

<!-- この場合、こういうハンドラの直前にミドルウェアを置く場合は型が伝播されるので問題なく`c.var.time`に`number`型の値がセットされます。 -->

In this case, if you place the middleware just before this handler, the type will be propagated, and the `number` type value will be set to `c.var.time` without any problems.

```ts {5}
import timestamp from 'timestamp-middleware'

const app = new Hono()

app.get('/', timestamp, (c) => c.text(c.var.time)) // TYPE SAFE
```

<!--
このようにミドルウェアをメソッド直前においた場合、次のハンドラに前のミドルウェアの型情報を伝播させることができるので`c.var.time`に型が着きます。
-->

---

<!-- 一方で、このようなハンドラの前ではなくapp全体にミドルウェアを置く場合は、型が伝播されないため、`c.var.time`に対する型付けがされずエラーが発生します。 -->

On the other hand, if you place the middleware on the entire app rather than before this handler, the type will not be propagated, and an error will occur because the typing for `c.var.time` is not done.

```ts {5}
import timestamp from 'timestamp-middleware'

const app = new Hono()

app.use(timestamp)

app.get('/', (c) => c.text(c.var.time)) // TYPE ERROR (c.var.time is not defined)
```

<!--
一方でよくあるミドルウェアの書き方のように`app.use`を使ってアプリケーションの複数のルートにミドルウェアをかける場合、`app.use`で`app`本体に型をemitすることはできないので、`c.var.time`に型がつかずエラーが発生する。
-->

---

One way to solve this problem is to provide `Env` from the library side to give the middleware type to `app` in the first place. However, this forces the user to set the type, which is inflexible.

```ts {2}
import timestamp from 'timestamp-middleware'
import type { TimestampEnv } from 'timestamp-middleware'

const app = new Hono<TimestampEnv>()

app.use(timestamp)

app.get('/', (c) => c.text(c.var.time)) // TYPE SAFE
```

<!--
方法の一つとしてこのようにライブラリ側から`Env`を提供することで`app`にそもそものミドルウェア型をつける方法はあるが、これではユーザーに設定を強制することになるため、柔軟性がない。
-->

---

In such cases, by extending the `ContextVariableMap`, third parties can propagate the type, and if the entry point of `timestamp-middleware` has an ambient declaration, it will be extended when imported.

```ts
declare module 'hono' {
  interface ContextVariableMap {
    time: number
  }
}
```

<!--
このようなケースで有効なのがこのContextVariableMapを使ったアンビエント宣言。
これをライブラリのエントリーポイントに定義しておくことでライブラリがimportされる(つまりミドルウェアが使用される）場合にだけ、ユーザーが意識しなくとも勝手に型がつくライブラリを作れる。
-->

---

However, there is a risk that the type will be applied unintentionally if the library side implicitly extends the `ContextVariableMap`.

If you are concerned about this, you can also create a `.d.ts` file manually on the user side to extend the type.

<!--
ただ、ライブラリ側が暗黙的に`ContextVariableMap`を拡張することは、ユーザーが意図しない場合に型がついてしまう可能性がある。

もしそれを懸念する場合は、ユーザー側で手動で`.d.ts`ファイルを作成して型を拡張するように促すことも可能だ。
-->

---

### Extends Hono Class

The approach to expanding the Hono class is not well known but very useful and is introduced here.

<!--
Honoクラスを拡張するアプローチを紹介します。
あまり知られてないかもしれませんがサードパーティを開発する上ではとても便利なので紹介させていただきます。
-->

---

#### `@hono/zod-openapi`

The most familiar example is `@hono/zod-openapi` in `hono/middleware`.

It is a very convenient library that combines `zod` and `openapi` to write OpenAPI type-safely and applies validation internally using `zValidator`.

<!--
それを実際にやっている例として`@hono/zod-openapi`があげられる。

このライブラリはzodスキーマでopenapiルートを定義し登録するとzValidatorを用いてHonoが内部でにバリデーション構築やルート登録を行なってくれるなんとも便利なフレームワーク。
-->

---

Define the schema using the `z` object re-exported from `@hono/zod-openapi`.

`z` is strictly speaking the `z` from [zod-to-openapi](https://github.com/asteasolutions/zod-to-openapi), which extends `zod`.

<!--
厳密には`zod-to-openapi`という`zod`で`openapi`を定義し`json`を吐けるライブラリのラッパーです。
-->

---

First, define the schema of the Request, Response, etc...

```ts
import { z } from '@hono/zod-openapi'

const ParamsSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: { name: 'id', in: 'path' },
      example: '100',
    }),
})

const UserSchema = z
  .object({
    id: z.string().openapi({ example: '100' }),
    name: z.string().openapi({ example: 'Monica' }),
  })
  .openapi('User')
```

---

Then, you can create a route using the schema.

```ts
import { createRoute } from '@hono/zod-openapi'

const route = createRoute({
  method: 'get',
  path: '/users/{id}',
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
      description: 'Retrieve the user',
    },
  },
})
```

---

Finally, create an OpenAPI document using the `openapi` method.

```ts
import { OpenAPIHono } from '@hono/zod-openapi'

const app = new OpenAPIHono()

app.openapi(route, (c) => {
  const { id } = c.req.valid('param')
  return c.json({ id, name: 'Monica' })
})

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API',
  },
})
```

---

**Wait, what is `OpenAPIHono`?**

Did `app.openapi` and `app.doc` exist?

---

`OpenAPIHono` is a class that extends `Hono` and adds the `openapi` and `doc` methods.

<!--
`OpenAPIHono`は`Hono`クラスを基底とした拡張クラスで、オリジナルの`Hono`クラスに`openapi`や`doc`などの拡張メソッドが生えている。
-->

---

`OpenAPIHono` is a class that extends `Hono`.

```ts {1-5}
export class OpenAPIHono<
  E extends Env = Env,
  S extends Schema = {},
  BasePath extends string = '/'
> extends Hono<E, S, BasePath> {
  openAPIRegistry: OpenAPIRegistry
  defaultHook?: OpenAPIHonoOptions<E>['defaultHook']
```

---

There is a property called `openAPIRegistry` in `OpenAPIHono` that stores the registered route information.

```ts {6}
export class OpenAPIHono<
  E extends Env = Env,
  S extends Schema = {},
  BasePath extends string = '/'
> extends Hono<E, S, BasePath> {
  openAPIRegistry: OpenAPIRegistry
  defaultHook?: OpenAPIHonoOptions<E>['defaultHook']
```

<!--
`openAPIRegistry`という登録されるroute情報を格納していくプロパティが`OpenAPIHono`には存在する
-->

---

In `app.openapi`:

```ts
app.openapi(route, (c) => {
  const { id } = c.req.valid('param')
  return c.json({ id, name: 'Monica' })
})
```

- Register the route in `openAPIRegistry` (`OpenAPIHono`'s property).
- Create a validation middleware using `zValidator` from the route definition schema, etc.
- Register a handler and the created middleware together.

<!--
`app.openapi`では

- 渡されたrouteを`openAPIRegistory`に登録
- routeからzodスキーマを抽出し`zValidator`を使ったunique右バリデーションミドルウェアを作成
- 第二引数のハンドラにミドルウェアをかけた形でappに登録

ということをしている
-->

---

In `app.doc`:

```ts
app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API',
  },
})
```

- Generate an OpenAPI document (JSON) from the registered routes.
- Register a handler that returns the generated OpenAPI document as JSON API.

<!--
`openAPIRegistory`に登録された情報と第二引数に渡されたOpenAPIのメタ情報を元にドキュメント(JSON)を生成

そのJSONを返すAPIをappに登録
-->

---

Conclusion of `@hono/zod-openapi`'s case:

If you have a motivation to **intervene in such route registration**, the approach of extending the class is effective.

<!--
`@hono/zod-openapi`のケースより、クラス拡張のアプローチは「ミドルウェアを動的に作成したり、ハンドラに動的に登録したり」など、ルートの登録に対して、何らかの処理で介入したい場合にとても効果的ということがわかります。
-->

---

#### Ultra

<div class="flex items-center justify-center gap-32">
<div>
<p>Ultra is a React Streaming SSR framework focused on Deno, which fully manages the application written by the user, such as Full ESM frontend and API Routes.</p>
<p><strong>Using Hono as a middleware framework</strong></p>
<p>Until v1.0.x or earlier, it used oak, a middleware framework for Deno, but from v2.0.0, it seems to be using Hono.</p>
</div>
<svg class="logo" fill="none" height="320" viewBox="0 0 440 440" width="320" xmlns="http://www.w3.org/2000/svg">
<g fill="currentColor">
<path d="m225 95-82 135.135 82-99.662v214.527l72-114.865z"></path>
<path d="m144 230 81 114-15-167z"></path>
</g>
</svg>
</div>

<!--
次に`
-->

---

In `lib/ultra.ts` of Ultra, the `UltraServer` class, which extends the `Hono` class, is defined.

As you can see, the `UltraServer` class extends the `Hono` class, just like `OpenAPIHono`.

```ts {1-6}
export class UltraServer<
  E extends Env = Env,
  // deno-lint-ignore ban-types
  S = {},
  BasePath extends string = "/",
> extends Hono<E, S, BasePath> {
  public importMap: ImportMap | undefined;
  public assetManifest: Map<string, string> | undefined;
```

---

There are fields such as `importMap` and `assetManifest` for environment settings.

```ts {7-8}
export class UltraServer<
  E extends Env = Env,
  // deno-lint-ignore ban-types
  S = {},
  BasePath extends string = "/",
> extends Hono<E, S, BasePath> {
  public importMap: ImportMap | undefined;
  public assetManifest: Map<string, string> | undefined;
```

<!--
環境設定に関するフィールドが用意されています。
-->

---

<!-- そしてこのフィールドの情報をもとに、サーバー側で異なるレンダリングをする関数`server.render`を使ったHTMLレンダリングを行っています。 -->

Based on this field information, it performs HTML rendering using the `server.render` function, which performs different rendering on the server side.

```tsx {2}
server.get('*', async (context) => {
  const result = await server.render(<App />)

  return context.body(result, 200, {
    'content-type': 'text/html',
  })
})
```

<!--
そしてこのフィールドの情報をもとに、サーバー側で異なるレンダリングをする関数`server.render`を使ったHTMLレンダリングを行っています。
-->

---

There are several other settings items, and it seems that it is designed to be flexible in setting according to the framework and deployment environment.

```ts
const server = new UltraServer<E, S, BasePath>(root, {
  mode,
  entrypoint: browserEntrypoint,
  importMapPath: options.importMapPath
    ? resolveImportMapPath(mode, root, options.importMapPath)
    : undefined,
  assetManifestPath: String(assetManifestPath),
  enableEsModuleShims,
  esModuleShimsPath,
})
```

<!--
環境によって設定が変わるさまざまなオプションが用意されていて、`preact`への対応だったり、`trpc`と使うユースケース、`fly.io`にデプロイするケースなどさまざまな環境に耐えうる設計がされています。
-->

---

Conclusion of Ultra's case:

By colocating server settings and other settings as fields of the `Hono` class, it is possible to **increase the portability of server implementations**.

This technique is also useful when developing third-party frameworks.

<!--
Ultraのユースケースより、拡張したHonoクラスの中にサーバーの設定をコロケーションすることで、サーバーのポータビリティを向上させることができることがわかりました。

この技術はサードパーティフレームワークを作る上でとても有用ではないかなと思っております。
-->

---

It is good to read the Hono's source code, but let's read the implementation of peripheral libraries such as `hono/middleware` to get hints on how to use Hono more conveniently.

There are many useful tips for using it better.

<!--
Honoのコードを読むのもいいですが、Honoをよりうまく利用するためのヒントがたくさんあると思うので`hono/middleware`然り、そのほかサードパーティフレームワークの実装もぜひ調べてみてください。
-->

---

## Introduce my third-party frameworks

---

![My Third-Party Frameworks for Hono](/my-hono-third-party-repositories.png)

---

### Hono DO

A wrapper of Cloudflare Workers's Durable Object for Hono.

```ts
export const Counter = generateHonoObject('/counter', async (app, state) => {
  const { storage } = state
  let value = (await storage.get<number>('value')) ?? 0

  app.post('/increment', (c) => {
    storage.put('value', value++)
    return c.text(value.toString())
  })

  app.get('/', (c) => c.text(value.toString()))
})
```

---

I personally liked this framework very much, but it died because Cloudflare released Workers RPC 😭😭😭.

But **Workers RPC is VERRRRRY CONVENIENT**.

---

### Hono Storage

A storage helper for Hono. Supports disk, memory, S3, etc.

It is similar to the Express's Multer.

---

In the case of Node.js, it is implemented as follows:

```ts {6-12}
import { serve } from '@hono/node-server'
import { HonoDiskStorage } from '@hono-storage/node-disk'
import { Hono } from 'hono'

const app = new Hono()

const storage = new HonoDiskStorage({
  dest: './uploads',
  filename: (_, file) => `${file.originalname}-${Date.now()}.${file.extension}`,
})

app.post('/', storage.single('file'), (c) => c.text('OK'))

serve(app)
```

---

There were originally a lot of Issues and Discussions standing on Hono asking for support for an upload middleware like Multer (about 20 issues).

Officially, the Issue was replied not to support it, but there seemed to be a demand for it, so I decided I had to do it myself and made it.

<!--
すでに20件以上のDicussionやIssueで「HonoにMulterみたいなアップロードミドルウェアはないのか？サポートしてくれ！」という要望が。
公式では（おそらくメンテナンスコストの問題から）サポートしないと言っていたため、自分がやることにした。
-->

---

If someone is motivated to expand the Hono community, it might be a good idea to create an alternative framework with a view to migrating from other frameworks.

<!--
もしHono Communityを盛り上げることに興味があるなら、自分の例のように他のフレームワークから移行する選択をしてくれる人を増やすために他のフレームワークのエコシステムの移植を作るのはいいアイディアかもしれない。
-->

---

Use Hono Storage and give feedback if interested 🙏

---

## What I'd like to make next

**The migration middleware from `Express` to `Hono`**

---

There is a wrapper library called `@fastify/express` that mounts routes and handlers defined as Express apps as subroutes of Fastify apps, which we have heard is very useful for the **gradual transition from Express -> Fastify**.

---

I want to make a similar library for `Hono` that allows you to **mount Express apps as subroutes of Hono apps**.

The ability to make a phased transition should be a major boost to the choice of Hono.

<!--
それに似たようなものをHonoで実現したい。

そうすれば段階的移行が視野に入り、Honoを選んでくれるきっかけが増えるかもしれない。
-->

---

Using `@hono/node-server`'s `getRequestListener`...?

---

If anyone has an interest or insight fot this, let's talk.

<!--
もし興味があればぜひ声かけてください、たくさん議論したいです！
-->

---

## Let's develop a Third-Party Framework for Hono

Thank you for listening to the talk 🥳
