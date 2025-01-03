---
title: "論文読み - BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"
description: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding という論文を読みました。"
publishedAt: 2024/05/22
noindex: true
---

今回は Google が 2018 年に発表した BERT に関する論文 "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding"[^1] を読みました。

[^1]: [Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova, "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", 2018](https://arxiv.org/abs/1810.04805)

## 導入

BERT は **Bidirectional Encoder Representations from Transformers** の頭文字をとって名付けられた言語モデルである。
深い双方向の Transformer を用いて事前学習を行うことで左右の文脈を同時に考慮した豊かな表現を持った事前学習モデルを実現している。
その結果、BERT レイヤーの後ろに 1 つ追加レイヤーを置くだけで簡単に特定タスクに適応させることができる。

## モデル

### アーキテクチャ

| モデル名   | レイヤー数 | 隠れ層の次元数 | ヘッド数 | パラメータ数 |
| ---------- | ---------- | -------------- | -------- | ------------ |
| BERT-base  | 12         | 768            | 12       | 110M         |
| BERT-large | 24         | 1024           | 16       | 340M         |

Transformer モデルの Encoder 部分のみを用いた Encoder-Only Transformer というモデルを用いている。

入出力はタスクによって異なる

文頭には識別問題を解くために `[CLS]` トークンを挿入する。
感情分析などのタスクのデータの場合はそのまま一文を入力するが、質問応答などのタスクのデータの場合は質問文と回答文を区別するために `[SEP]` トークンを挿入する。
さらに質問と回答が異なることがわかるようにそれぞれの分に加算埋め込みを行ってから結合して入力する。

```txt
[CLS] [Sentence1 with embeddings] [SEP] [Sentence2 with embeddings]
```

### 学習方法

OpenAI が開発した GPT などでは左から右へ（将来の単語のみを参照して）文脈を考慮するように設計されていることから、過去のコンテキストに向けての注意しかできない。
しかし、実際の自然言語処理タスクでは例えば質問応答のようなタスクで各単語においてその前後どちらの単語も重要であることがある。

#### 事前学習

学習には BookCorpus (800M words) と Wikipedia (2,500M words) のデータセットを用いている。Wikipedia に関してはテキストパッセージを学習に使いたいため、リストや表などの構造化されたデータは除外している。
BERT は文章を Bi-directional に学習するために、二つの Pre-training タスクを行っている。

##### 1. Masked Language Model (MLM)

文章の一部の単語をマスクして、その単語を予測するタスク。
モデルに対して一度に全ての文章を入力し、文章全体を出力するように学習する過程で、入力の 15% 程度の単語を `[MASK]` トークンに置換し、マスクした時刻 $t$ における単語の確率分布を予測するように学習する。この時ロスは Cross-Entropy Loss で計算される。

ただし、BERT はファインチューニングで使われることを想定している以上、事前学習で使った `[MASK]` がファインチューニング時には使われず環境差が生じてしまうことが指摘されており、これを緩和するために 80% の確率で `[MASK]` トークンに置換する代わりに、10% の確率でランダムな単語に置換するという手法が提案されている。(Appendix C.2)

##### 2. Next Sentence Prediction (NSP)

与えられた 2 文が連続した文であるかどうかを予測するタスク。
MLM が文章 to 単語の予測を学習するのに対して、NSP は文章 to 文章の予測を学習することでより深い表現を学習することができる。
入力の先頭に埋め込まれた `[CLS]` トークン部分の出力が 2 つの文章が連続しているかどうかを表現するように学習する。

> [!WARNING]
> この時点（事前学習段階）では `[CLS]` トークンの出力はNSPタスクのために特化したベクトル出力になっており、文全体を表現する Document Embedding なベクトルではない。
> 事前学習では `[CLS]` が全文を考慮した出力になるように調整するために重みが調整され、実際に文章識別などの文脈を考慮したタスクに適用する際にファインチューニングによって文章表現が学習される。

#### ファインチューニング

事前学習でも用いた `[CLS]` や `[SEP]` を活用することで色々な下流タスクへの適応が容易になっている。(Appendix A.5, Figure 4)

**Sentence Pair Classification** の場合、`[CLS]` トークンを先頭に、2 文を `[SEP]` で区切って入力し、`[CLS]` 部分の出力が分類ラベルになるように学習することで実現できる。

**Single Sentence Classification** の場合、`[CLS]` トークンを先頭に、文を入力し、`[CLS]` 部分の出力が分類ラベルになるように学習することで実現できる。(`[SEP]` は不要)

**Question Answering** の場合、質問文と参照文章を `[SEP]` で区切って入力し、出力の 2 文目の位置にあたる範囲が生成された回答文章になるように学習することで実現できる。(`[CLS]` はつけるけど学習目的としては使われない)

**Single Sentence Tagging** の場合、文章をそのまま入力し、各単語のタグを予測するように学習することで実現できる。(`[SEP]` は不要、`[CLS]` はつけるけど学習目的としては使われない)

## 他のモデルとの比較

この BERT モデルは時系列的には GPT 発表 ~ GPT-2 発表の間に位置しており、大規模言語モデルを事前学習によって作り、その後にファインチューニングを行うという手法が広まった頃で、BERT は GPT に対抗するモデルとしての位置づけである。
そのため、GPT との比較をメインに行われている。

> [!NOTE]
> 時系列的には
> `Transformer (2017.6) -> ELMo (2018.2) -> GPT (2018.6) -> BERT (2018.10)`
> という流れになっている[^2]。

[^2]: [【深層学習】BERT - 実務家必修。実務で超応用されまくっている自然言語処理モデル【ディープラーニングの世界vol.32】](https://youtu.be/IaTCGRL41_k?si=-7yyCm67Or7D7EPk)

### GLUE Benchmark

GPT でも用いられた GLUE Benchmark においての評価が行われている。
BERT は GLUE の計 8 タスクのうち全てで最高スコアを出している。注目すべき点は、GPT とパラメータ数をなるべく合わせて作った比較用の BERT-base モデルが以前まで SoTA だった GPT モデルから平均 4.5%の向上を達成している点である。さらにそれよりも大きなモデルである BERT-large は 7.0% の向上が示された。

### SQuAD v1.1, v2.0

SQuAD は質問応答タスクのデータセットである。
BERT-base は SoTA に匹敵する性能を示しており、BERT-large は SoTA を 5% 程度上回る性能を示している。
これまでのアンサンブルモデルや人間による回答の精度を単一モデルで上回った圧倒的な性能が見て取れる。

v2.0 では質問文に対して回答が存在しない場合の選択肢が追加され複雑さが増したタスクである。
こちらは人間による回答の精度には及ばないものの、既存の SoTA よりは 5%ほど高い性能を示している。

> [!NOTE]
> SQuADベンチマークにおける評価指標の **EM** は Exact Match で、完全一致率を表す。
> また、**F1** は予測と正解の部分一致が考慮された評価指標である。

### SWAG

SWAG は Commonsense Reasoning タスクのデータセットである。
BERT-base, BERT-large ともに SoTA を達成しており、8.3%と大幅な向上を達成している。
人間の回答精度を上回るか同等程度の高い性能を発揮していて、高度な文章理解を得られていることがわかる。

## モデル自体の評価

### 事前学習の効果

BERT が MLM や NSP のような事前学習タスクの影響をどのように受けているかを調査するため

1. NSP なし、MLM だけによる学習
2. NSP なし、MLM なし、従来の次単語予測による学習
3. - BiLSTM による学習

の 3 つのモデルを比較した。

- NSP がない場合、MNLI, QNLI, SQuAD などのタスクで性能が低下することがわかった。
  - 単語単位での学習だけでは文脈を汲むタスクにおいては十分な性能が出ないことがわかる。
- 従来の次単語予測による学習では、BERT が持つ Bi-directional な表現力を獲得できていおらず、MRPC, SQuAD などのタスクで性能が低下することがわかった。
  - 2 文を比較するなど前後の関係を重視するタスクにおいて、一方向だけでの学習及び推論では十分な性能が出ないことがわかる。
- BiLSTM による両方向のコンテキストを汲む仕組みが加わることによって、低下した SQuAD の性能を回復させることができた。
  - やはり Bi-directional な表現力が BERT のパフォーマンスに大きく寄与していることがわかる。

### モデルサイズによる影響

やはり先行研究でわかっている通り Bigger is Better であるが、極端にモデルサイズをスケールすることが実際に下流タスクに十分に影響を与えることが初めて示せたと論文では主張している。
十分に事前学習されたモデルであれば、小さな下流タスク == 小さなデータセットでもファインチューニングによる性能はモデルサイズよって向上させることができるのだ。

### 特徴量ベースのBERT利用

これまで示してきた BERT の性能は全て Fine-tuning によるものであるが実際にはタスクが全て Transformer アーキテクチャで表現できるわけではない。
BERT の出力は別のモデルの特徴量として(Embedding Layer として)使うことができ、実際に別のアーキテクチャに BERT から得られる特徴量を入力として使うことでもオリジナルの BERT の性能と遜色ない性能を達成できることから、BERT の特徴量は汎用的であることが言及されている。

## まとめ

BERT は Bi-directional な Transformer モデルを用いた事前学習によって、多くの自然言語処理タスクにおいて SoTA を達成した。
これまでまだ難しいとされていた質問応答や感情分析などの文章を深く理解して処理するタスクにおいても高い性能が示され、自然言語処理においてさまざまなタスクに小リソースで適用できる汎用的で強力なモデルを作ることができた。
