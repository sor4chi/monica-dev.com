---
title: 論文読み - Language Models are Unsupervised Multitask Learners
description: Language Models are Unsupervised Multitask Learners という論文を読みました。
publishedAt: 2024/05/01
---

今回は "Language Models are Unsupervised Multitask Learners"[^1] という論文を読みました。

[^1]: [Alec Radford, Jeffrey Wu, Rewon Child, David Luan, Dario Amodei, Ilya Sutskever, "Language Models are Unsupervised Multitask Learners", 2019](https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf)

## 導入

以前 GPT (GPT-1) によってモデルを大規模なデータセットで事前学習することで後のファイチューニングのみで多様なタスクに対して高い性能を達成できることが示された。
しかし、ファインチューニングが必要という点で **完全に教師なしで学習することはできていなかった**。

本論文では GPT より柔軟に質問応答・機械翻訳・読解・要約などのタスクを完全に教師なしで学習することが可能であることが示され、その精度がパラメータのサイズに対数線形的にスケールすることを実証した。

言語モデルがいかにして多様なタスクに対して効果的であるかを探求し、新たに教師なしで言語処理タスクを学習する方法を提案している。

## アプローチ

**十分な能力を持った言語モデルは、学習データの調達方法によらず、より良い予測をするために自然言語で示されるタスクを推測し、実行することを学習し始めるだろう** という仮定に基づいて本論文は進められている。

もし言語モデルがこれを達成すればモデルは教師なしマルチタスク学習を行うことができるといえる。
言語モデルの性能分析をゼロショット(未学習の分野のタスクに対して)で行うことで、言語モデルが多様なタスクに対して効果的であることを示す。

### データセット

導入で述べたように、これまではドメイン固有のデータセットを用いた教師あり学習が行われていたが、本論文では多様なデータセットで訓練できないかということに焦点を当て、Web スクレイピング ベースのデータセット収集方法を用いた。

単純にスクレイピングするだけでは、ネット上の質の悪いデータも収集に含まれてしまう。
そこで本論文では、 **Reddit という SNS サイトの、3 以上の karma (Twitter でいうところのいいね) を持つ投稿** をある意味の人間が選別した指標として採用し、その投稿に含まれるリンク先のテキストをデータセットとして収集した。

結果 4500 万リンク(これを WebText と呼ぶ)を収集し、それからカットオフや重複排除などを行った 800 万, 40GB 分のデータセットを作成した。
(GPT では 4.5GB のデータセットを用いていた)

### 入力表現

トークナイズには以前の GPT と同様に Byte-Pair Encoding (BPE) を用いている。
しかし、GPT-2 では BPE をこれまでのサブワードベースの BPE ではなく本当に Byte 単位で分割している。

[GPT-2のBPEに関する実装](https://huggingface.co/learn/nlp-course/chapter6/5?fw=pt)

そのため、Unicode 単位で確率を割り当てることができるようになり、未知語に対しても適切な処理ができるようになった。
したがってあらゆるデータセットで LM を学習/評価することが可能になった。

### モデル

基本的には GPT と同じような構造を用いている。
GPT から変わった点として、以下のような変化がある。

- Layer Normalization
  - Transformer Block の各 Layer Normalization の位置が残差接続の後から Self-Attention と残差をとる間に変更された
  - また、一番最後(Transformer Block を経由し終えた後)にも Layer Normalization を追加し、その後 Linear x Softmax を行うように変更された
- Transformer Block の数
  - GPT では 12 層だったが、GPT-2 では 48 層に増やされた
  - ついでに単語ベクトルの次元数である $d_{model}$ も 768 から 1600 に増やされた
- Residual layer の重みを調整(蓄積を考慮して $1/\sqrt{N}$ で重みを初期化, N は残差接続の数)
- コンテキストサイズを増加
  - GPT では 512 トークンだったが、GPT-2 では 1024 トークンに増やされた
- バッチサイズを増加
  - GPT では 64 だったが、GPT-2 では 512 に増やされた

## 実験

### パラメータ数と性能

Figure 1 に示されているように、GPT (GPT-1)時代の 117M パラメータのモデルから GPT-2 による 1.5B パラメータのモデルまで巨大パラメータ言語モデルにおいて、パラメータの数が増えるにつれて性能が対数線形的に向上していることが示されている。
まだ曲線が飽和の傾向を見せていないことから、さらにパラメータを増やすことで性能が向上する可能性があることが示唆されている。

### ゼロショットタスクの性能

前述の特別な BPE を用いたことで、これまでのモデルそれぞれとの比較をしたいときにモデルの Tokenizer の違いを考慮しなくてもそのままで比較できるようになった。

論文の表 3 より、Zero-shot での性能評価で　10 個のベンチマークを試したところ、1BW 以外の 9 個のベンチマークで GPT-2 が SoTA を達成した。

- PPL: Perplexity
  - 言語モデルの性能を評価する指標
  - $ppl = \exp(-\frac{1}{N}\sum_{i=1}^{N} \log p(x_i))$
  - Lower is better
- ACC: Accuracy
  - 分類問題の性能を評価する指標
  - 単純に正解率
  - Higher is better
- BPB: Bits per Byte
  - BPE の性能を評価する指標
  - Byte をエンコードするのに必要な平均ビット数
  - Lower is better
- BPC: Bits per Character
  - BPE の性能を評価する指標
  - 文字をエンコードするのに必要な平均ビット数
  - Lower is better

以上のように、BPE の性能評価も含まれていることに注意。
ちなみに 1BW で性能があまり出ていない理由として文単位でデータがシャッフルされているなど破壊的な前処理があるため、分布から大きく外れた状態でテストされているためだと論文では述べられている。

## まとめ

GPT-2 は結果として、教師なしで学習した言語モデルが勝手に多様なタスクに対して適応できることを示すことができた。
また、パラメータの数が増えるにつれて性能が向上することが示された。しかし GPT-2 の 1.5B パラメータでさえも Web Text(今回作成されたデータセット)に対してはまだアンダーフィットしていることが Figure 4 で示されており、さらにパラメータを増やすことで性能が向上する可能性があることが示唆されている。

## 議論

### BPB と BPC の計算方法

BPB (Bits per Byte) は **1Byte をエンコードするのに必要な平均ビット数** であり、BPC (Bits per Character) は **1文字をエンコードするのに必要な平均ビット数** である。

- 圧縮前の文字列のバイト長: $\text{unCompressedBytes}$
- 圧縮前の文字列の文字数: $\text{unCompressedChars}$
- 圧縮後のバイト長を $\text{compressedBytes}$

とすると、$\text{compressedBits} = \text{compressedBytes} \times 8$ となるため

BPB と BPC は以下のように計算される。

$$
\text{BPB} = \frac{\text{compressedBits}}{\text{unCompressedBytes}}
$$

$$
\text{BPC} = \frac{\text{compressedBits}}{\text{unCompressedChars}}
$$

この時 Character は ASCII Extended における 1 文字を指す。

<https://vaclavkosar.com/ml/bits-per-byte-and-bits-per-character>

### enwik8 text8 について

論文中に登場する enwik8 と text8 はどのようなデータセットなのか調査したい。

#### enwik8

> The enwik8 dataset is the first 100,000,000 (100M) bytes of the English Wikipedia XML dump on Mar. 3, 2006 and is typically used to measure a model's ability to compress data.

つまり、enwik8 は 2006 年 3 月 3 日の英語版 Wikipedia の XML ダンプの最初の 100,000,000 バイトを指し、データ圧縮の能力を測定するために使用されるデータセットである。
そのままの XML タグや Wiki 記法などが含まれている。

<https://huggingface.co/datasets/enwik8>

#### text8

> The test data for the Large Text Compression Benchmark is the first 10^9 bytes of the English Wikipedia dump on Mar. 3, 2006.

text8 は 2006 年 3 月 3 日の英語版 Wikipedia のダンプの最初の 10^9 バイトを指す。
XML などの構造をクリーニング等の処理により取り除き、純粋なテキストデータとして処理されたデータセットである。

<https://mattmahoney.net/dc/textdata.html>

<!-- - WebText(データセット)をどう使って学習したかの工夫を探す（あるかわからないので調べて欲しい） -->

### WebTextをどうやって学習させたか

初代 GPT と同じアーキテクチャで学習させたとあるため、おそらくは GPT と同じように予測以前のコンテキスト（トークン列）を与えて次のトークンを予測するように学習させたのではないかと考える。
(読んだ限り具体的な学習方法の工夫に関する記述はなかったように思う)

### Appendix

論文末びの Appendix には、GPT-2 のモデルで生成された文章の例が掲載されている。

#### WebTextの継続文章生成

学習に使われていない未知の WebText 文章の冒頭を与えると、その文章の続きを生成することができることが示されている。
左側の文章は最小のモデル（おそらく 117M パラメータ）で生成されたもので、右側の文章は最大のモデル（1.5B パラメータ）で生成されたものである。
英語に関してネイティブではないのでどれくらいナチュラルな文章が生成されているのか評価するのは難しかった...

### 人間が書いた文章の継続文章生成

人間が書いた文章の冒頭を与えると、その文章の続きを生成することができることが示されている。
これは学習したテキストの分布外の文章に対しても適切に生成できることを示している。
（ユニコーンの話では途中から文脈が破綻してはいるが、それでもなんとなく話が続いている）

### 文章要約生成

完全に意味を履き違えた要約を生成していそう。あまり精度が高いとは言えない感じがした。
（要約の生成例が掲載されているが、読んでいる限りでは要約の生成方法に関する記述はなかった）

### 文章翻訳生成

固有名詞の欠落や文章のそもそもの意味違いが散見されあまり精度が良いとは言えない感じがした。
（翻訳の生成例が掲載されているが、読んでいる限りでは翻訳の生成方法に関する記述はなかった）

### QA生成

このテストは CoQA (A Conversational Question Answering Challenge) データセット[^3]を用いて行われた。

[^3]: [CoQA: A Conversational Question Answering Challenge](https://arxiv.org/abs/1808.07042)

複数の質問のうち、ある質問が過去の質問のコンテキストに依存する場合が多く難しいタスクである。

冒頭に文章があり、その文章の QA を複数列挙した後、Q を与えて A を生成することができることが示されている。(Few-shot)

**Given context:**

```txt
[Topic Context]

Q: ~
A: ~

... x 5 ...

Q: ~
A:
```

実験では最後「そして彼らは山を登りましたか？」という質問に対して、人間は「はい」や「わかりません」といった答えを期待するが、モデルは「エベレスト」という答えを生成している。
また、別の実験では「彼女はどこに住んでいますか？」という質問に対して、人間は文章中に出てくる「スウェーデン」という答えを期待するが、モデルは「ストックホルム」と、文章中には出てこない情報を生成している。

このように、モデルは文章中の情報を適切に理解しているとは言い難い結果となっている。
