---
title: 論文読み - Improving Language Understanding by Generative Pre-Training
description: Improving Language Understanding by Generative Pre-Training という論文を読みました。
publishedAt: 2024/04/24
---

今回は "Improving Language Understanding by Generative Pre-Training"[^1] という論文を読みました。

[^1]: [Alec Radford, Karthik Narasimhan, Tim Salimans, Ilya Sutskever, "Improving Language Understanding by Generative Pre-Training", 2018](https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf)

## 導入

自然言語処理の分野において、大規模なデータセットを用いた事前学習が重要であることは広く知られているが、そのためには大量のラベル付きデータが必要となる。
特に Domain-Specific なモデルを構築したい場合、学習に用いるデータセットを大量に入手することは難しい。

そこで、本論文では、大規模なデータセットを用いた事前学習を行い、その後に比較的小規模な特定のタスクについてのデータを追加で学習することでこの問題を解決する手法を提案している。

## 二つのステージ

本手法は、大きく以下の二つのステージから構成されている。

### 1. Unsupervised Pre-Training

まず、大規模なデータセットを用いて、言語モデルを事前学習する。

モデルには **Decoder-Only Transformer** が用いられており、712 次元の状態と 12 層の Transformer Block から構成されている。Position-wize Feed-Forward Networks には 3072 次元の中間層が用いられている。
最適化手法には Adam が用いられており、学習率は Decoupled Wight Decay (ウォームアップしてから減らす) 手法が用いられている。
このモデルは、前までの単語における次の単語の確率の対数の文全体の総和を最大化するように学習される。

$$
L_1(\boldsymbol{X}) = \sum_{i} \log P(x_i | x_{<i}; \boldsymbol{\theta})
$$

- $\boldsymbol{X}$ : 入力の単語列
- $x_i$ : $i$ 番目の単語
- $x_{<i}$ : $i$ 番目より前の単語列
- $\boldsymbol{\theta}$ : モデルのパラメータ

入力には長いテキストが含まれており長距離の情報を学習させやすい BooksCorpus データセットを用いて学習を行う。
トークン化には Byte-Pair Encoding (BPE) が用いられている。

先行研究[^2]によると、text-to-text なモデルにおいては、Transformer モデルの Encoder と Decoder では両方で同じ言語情報を再学習しており冗長であることを指摘している。
本論文でもこの研究で利用されている変換を行うことで Encoder を除外し、Decoder のみを使って学習を行っている。

[^2]: [Peter J. Liu, Mohammad Saleh, Etienne Pot, Ben Goodrich, Ryan Sepassi, Lukasz Kaiser, Noam Shazeer, "GENERATING WIKIPEDIA BY SUMMARIZING LONG SEQUENCES", 2018](https://arxiv.org/pdf/1801.10198.pdf)

$$
(m^1, ..., m^n) \rightarrow (y^1, ..., y^\eta) \\
(w^1, ..., w^{n+\eta+1}) = (m^1, ..., m^n, \text{<sep>}, y^1, ..., y^\eta)
$$

- $m$ : 入力の単語列
- $n$ : 入力の単語数
- $y$ : 出力の単語列
- $\eta$ : 出力の単語数
- $w$ : 入力と出力を結合した単語列
- $\text{<sep>}$ : 特殊トークン, 文章の区切りを表す

この変換を行うことで、Decoder は入力の単語列 or 入力の単語列 + 途中までの出力の単語列を入力として、次の単語を予測するように学習を行う。

### 2. Supervised Fine-Tuning

次に、特定のタスクにおいて、この事前学習済みのモデルを用いて、比較的小規模なデータセットを用いて学習を行う。

Unsupervised Pre-Training で作った目的関数に加えて新たな目的関数を追加する。

$$
L_2(\boldsymbol{C}) = \sum_{(x, y)} \log P(y | x^1, ..., x^n)
$$

- $\boldsymbol{C}$ : 特定のタスクにおけるデータセット
- $x$ : 入力の単語列
- $y$ : 出力の単語列
- $n$ : 入力の単語数

これらの目的関数を組み合わせて、以下のような目的関数を最適化する。

$$
L_3(\boldsymbol{C}) = L_2(\boldsymbol{C}) + \lambda L_1(\boldsymbol{X})
$$

を最適化することで、ファインチューニングと言語モデル自体の学習を同時に行う。

論文ではタスクによって最適なチューニングの方法が異なるため、どのようにデータを用意するかは論文を参照。

## 結果

教師あり学習のタスクを 4 つ実験し、その結果を報告している。

### Natural Language Inference

Natural Language Inference (NLI) とは文章中に含まれる意味の関係を推論するタスクである。
1 組の文の間の関係が、合意的か、矛盾しているか、中立かを判定する。評価指標は単純に正解率 (Accuracy) を用いる。
6 つのテストデータセットのうち 5 つで最高の精度（中でも 4 つは大幅な改善）を達成した。
論文ではこの結果を「言語学的な曖昧さを処理する能力が向上した」としている。
それ以外の 1 つのデータセット(RTE) では、既存研究の Multi-task BiLSTM の方が精度が高かった。
-> 論文ではこのことについて調査していないとのこと。

論文[^1]の Table 2

### Question answering and commonsense reasoning

Question answering (質問応答) は、与えられた質問に対して適切な回答を選択するタスクである。
Commonsense reasoning (常識的推論) は、複数の文章からなるストーリーに対して、結末を除く文章を与えられたときに、そのストーリーの結末を選択するタスクである。

これらのタスクでは、いずれのテストデータセットに対してもアンサンブルされた既存の最高精度モデルより高い精度を達成した。

論文[^1]の Table 3

### Semantic Similarity

Semantic Similarity (意味的類似度) は、2 つの文章がどれだけ意味的に類似しているかを予測するタスクである。
言い換え、否定の理解、曖昧な構文の理解などの能力を測定する。
2 / 3 のデータセットにおいて最高の精度を達成した。一方で MRPC データセットでは、既存の最高精度モデル(TF-KLD)よりも低い精度であった。
-> 論文ではこのことについて言及していない。

論文[^1]の Table 4

### Classification

The Corpus of Linguistic Acceptability (CoLA) と The Stanford Sentiment Treebank (SST-2) という 2 つの評価タスクを実験した。

CoLA は文の文法的正しさ (=文章野自然さ) を判定するタスクで、与えられた文章について自然か・不自然かを 2 値分類する。(BERT これで 2018 年に SoTA を達成)
SST-2 は文章の感情を判定するタスクで、文章の感情を positive か negative かを 2 値分類する。

本モデルは、CoLA において既存の最高精度モデルよりも 10pt 高い大幅な改善を達成した。
SST-2 においては Sparse byte mLSTM というモデルには及ばなかったが、既存のモデルと遜色ない精度を達成した。
-> こちらも論文では言及していない。

論文[^1]の Table 4

そして、これらを総合した GLUE Benchmark において、既存の最高精度モデルよりも高い精度を達成した。
小さいデータセットでも大きいデータセットでも、同じモデルでいい精度を出せていることから、多様なデータセットに対して汎用的な能力を持っていることが示された。

## モデルの分析

論文[^1]の Figure 2 の左側は転移学習に利用する層の数と精度のグラフになっており、転移学習に利用する層が多いほど精度が向上することがわかっており、最大 1 レイヤーで 9%の精度向上が見られるなど、事前学習モデルの層がそれぞれ情報を異なる形で保持しており、利用すればするほど情報量が増えて精度が向上することが示された。

対して右側は事前学習モデルのパラメータの更新数と精度のグラフになっており、学習の進度によって精度が向上していることがわかる。
これは Zero-shot での評価なので、未学習のデータに対する情報の紐付け、いわゆる汎化性能がちゃんと学習によって向上していることが示されている。
また、既存の LSTM モデルと比較しても、本モデルは精度が一度下がったりせず安定的に学習が進んでいることがわかる。

モデルの構成要素について、そもそも事前学習をせずに最初から教師あり学習のみで Transformer モデルを学習させた場合、事前学習をした後に転移学習をする本モデルと比較して、精度が平均で 15% 以上低いことがわかっており、事前学習の重要性が示されている。

学習時に使用した目的関数である

$$
L_3(\boldsymbol{C}) = L_2(\boldsymbol{C}) + \lambda L_1(\boldsymbol{X})
$$

のうち後ろの項 $\lambda L_1(\boldsymbol{X})$ は、事前学習したパラメータを転移学習時に併せて変更するための因子だった。
分析結果では、転移学習（事後学習）に用いるデータセットが大きい場合は基本 $L_1(\boldsymbol{X})$ 項があった方が精度が向上することが示されたが、一方でデータセットが小さい場合は $L_1(\boldsymbol{X})$ 項があると精度が低下することがわかっており、データセットの大きさによって最適な $\lambda$ を選択することが重要であることされている。

論文[^1]の Table 5。CoLA や SST-2 は比較的小さいデータセットで、QQP や NLI は比較的大きいデータセットである。

## まとめ

本論文では、大規模なデータセットを用いた事前学習を行い、その後に比較的小規模な特定のタスクについてのデータを追加で学習することで、多様な自然言語処理タスクにおいて高い精度を達成する手法を提案した。

論文では、この手法を用いて多様な自然言語処理タスクにおいて高い精度を達成し、また、事前学習の重要性や、転移学習時の目的関数の設定についての定量的な分析を行っており、汎用性や効果的な学習方法について示唆している。

