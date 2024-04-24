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

