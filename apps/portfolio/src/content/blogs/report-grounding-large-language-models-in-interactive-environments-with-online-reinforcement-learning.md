---
title: 論文読み - Grounding Large Language Models in Interactive Environments with Online Reinforcement Learning
description: Grounding Large Language Models in Interactive Environments with Online Reinforcement Learning という論文を読みました。
publishedAt: 2024/07/24
---

言語モデルを強化学習の方策モデルとして利用するという分野に興味を持ったので "Grounding Large Language Models in Interactive Environments with Online Reinforcement Learning"[^1] を読みました。

[^1]: [Thomas Carta, Clément Romac, Thomas Wolf, Sylvain Lamprier, Olivier Sigaud, Pierre-Yves Oudeyer, "Grounding Large Language Models in Interactive Environments with Online Reinforcement Learning", 2023](https://arxiv.org/abs/2302.02662v2)

## 導入

近年の大規模言語モデルは世界の物理現象を捉える能力を発揮して、いわゆる **常識的な推論** ができるようになってきている。
この能力を活用して近年LLMにより意思決定問題を解決する研究が盛んに行われている。

しかし、LLMは知識を適切に具体と結びつけることが適切にできていない、つまり **グラウンディング** [^2]に欠点がある。
結果、尤もらしい表現の全く事実と異なる内容の文章を生成することがある **ハルシネーション** が発生する。

[^2]: AIが知識や情報源をもとに生成内容を裏付けること

1. そもそも次単語予測が基本の学習プロセスであるため、**問題解決をする動機付けがない**
2. 因果関係を捉えるための **環境への介入ができない**
3. 環境との相互作用の結果をフィードバックとして **追加で学習することができない**

ことが原因だと論文で考察されている。

## 問題設定

そこで強化学習の特徴である「エージェントが環境と相互作用する」という特性を利用し以下の問を設定する。

- LLMをポリシーとして利用できるか
- 環境との相互作用の結果それを新たに知識として学習できるか

検証項目は以下の通り

1. サンプル効率
   1. 与えられたプロンプトのナビゲーションにいかに早く適応して学習できるか
   2. 事前学習された知識はサンプル効率を向上させるのか
2. 新たなオブジェクトへの一般化
   1. 実際に訓練された後、その内容とは異なる別の新たなオブジェクトに対しての汎化能力を持つか
3. 新たなタスクへの一般化
   1. 実際に訓練された後、その内容とは異なる別の新たなタスクに対しての汎化能力を持つか
4. オンライン学習の影響
   1. 専門家データ(Expert Trajectory)によるオフライン模倣学習と比較して、オンラインRLがグラウンディングに経験的な影響を与えるか

## GRAM: Grounding LLM with Online RL

本論文では、GRounding LAnguage Models (GRAM) という方法を提案している。

GRAM法では、LLMをポリシーとして利用し、オンラインRLを用いて対話的環境でグラウンディングを行い、収集した観察と報酬から言語で定式化された目標の達成に向けて自己を改善させる。

![GRAMの概略図](</assets/blogs/report-grounding-large-language-models-in-interactive-environments-with-online-reinforcement-learning/figure1.png>)

### 問題提起

パラメータは以下の通り

::::flex

:::left

- 言語ボキャブラリー $\mathcal{V}$
- 行動 $a \in \mathcal{A} \subset \mathcal{V}^N$
（トークン系列としての行動）
- 観測 $o \in \mathcal{V}^N$
- 報酬 $r \in \mathbb{R}$
- 報酬を条件付けるタスクや目標の記述
$g \in \mathcal{G} \subset \mathcal{V}^N$

:::

:::right

- 状態空間 $\mathcal{S}$
- 行動空間 $\mathcal{A} \subset \mathcal{V}^N$
- 目標空間 $\mathcal{G} \subset \mathcal{V}^N$
- 遷移関数 $\mathcal{T} : \mathcal{S} \times \mathcal{A} \rightarrow \mathcal{S}$
- 報酬関数 $\mathcal{R} : \mathcal{S} \times \mathcal{A} \times \mathcal{G} \rightarrow \mathbb{R}$
- 観測関数 $\mathcal{O} : \mathcal{S} \rightarrow \mathcal{V}^N$
- 割引因子 $\gamma$

:::

::::

これらをもとに、目標拡張部分観測マルコフ決定過程（POMDP）$ \mathcal{M} = (\mathcal{S}, \mathcal{A}, \mathcal{G}, \mathcal{T}, \mathcal{R}, \mathcal{O}, \gamma) $ として環境をフレーム化する。

> [!NOTE]
> マルコフ決定過程（MDP）は、決定の最適化問題を解くための数学的フレームワークであり、状態$s$において行動$a$を取ることで報酬$r$を得るという遷移関数$\mathcal{T}$と報酬関数$\mathcal{R}$が定義されている。
> MDPは全ての状態が観測できることが前提となっているが、部分観測マルコフ決定過程（POMDP）は状態が完全には観測できない場合を仮定したものである。

![Baby AIの環境一覧](</assets/blogs/report-grounding-large-language-models-in-interactive-environments-with-online-reinforcement-learning/baby-ais-environments-overview.png>)

本研究では、言語学習のために設計された [BabyAI](https://minigrid.farama.org/environments/babyai/index.html) を BabyAI-Text というテキストのみに拡張したフレームワークを提案している。

6つのテキストコマンド (左に曲がる、右に曲がる、前進、拾う、落とす、トグル) を使用して、エージェントがオブジェクトと相互作用する際に部分的観測を示す BabyAI-Text のテキスト記述 $ o \in \mathcal{V}^N $ を用いて、グラウンディング方法を評価している。

### LLMをポリシーとしてインタラクティブな環境に適応する

プロンプトエンジニアリングやファインチューニングによってより性能を改善する可能性はあるが、今回はあえてAppendix.Cのシンプルなプロンプトを採用している。

プロンプトを与えられると、LLMは行動可能なアクションの確率分布$\mathbb{P}(\mathcal{A})$を出力する必要がある。
エンコーダの最終層に出力が$|\mathcal{A}|$となるようなMLPを追加することもできるが、今回はより直接計算するために各アクションに対応するフレーズの出力確率を利用する。

$$
\mathbb{P_\text{LLM}}(\mathcal{a_i|p}) = \prod_{j=0}^{|a_i|} \mathbb{P_\text{LLM}}(w_j|p, w_{< j})
$$

- $a_i$ : アクション$i$ ($a_i \in \mathcal{A}$)
- $p$ : プロンプト
- $w_j$ : アクション$i$に対応するフレーズの$j$番目の単語

例えば "go forward" というアクションに対してなら

$$
\mathbb{P_\text{LLM}}(\text{"go forward"}|p) = \mathbb{P_\text{LLM}}(\text{"go"}|p) \times \mathbb{P_\text{LLM}}(\text{"forward"}|p, \text{"go"})
$$

となる。
計算量が命令文の系列長回倍であることが欠点だが、追加学習やアーキテクチャの変更を必要としないため **任意の行動空間に適用可能**であり堅牢である。

最終的にはこれをsoftmaxをとることで確率分布を得る。

$$
\mathbb{P}(\mathcal{a_i|p}) = \frac{e^{\mathbb{P_\text{LLM}}(\mathcal{a_i|p})}}{\sum_{a_j \in \mathcal{A}} e^{\mathbb{P_\text{LLM}}(\mathcal{a_j|p})}}
$$

### PPOによるファインチューニング

以上の仕組みにより、LLMをポリシーとしてインタラクティブな環境に適応することができ、経験を収集することができたため、次にグラウンディングを行う。

任意の目標$g \in \mathcal{G}$ に対して、期待される割引報酬の総和を最大化するポリシー $\pi: \mathcal{O} \times \mathcal{G} \rightarrow \mathcal{A}$ を学習することを目指す。

このために、Proximal Policy Optimization (PPO)[^3]を用いてファインチューニングを行い、行動ポリシー$\hat{\pi}$と価値関数$\hat{V}: \mathcal{O} \times \mathcal{G} \rightarrow \mathbb{R}$を学習し真の価値$V(s, g)$に近似させる。

近似のためこちらのネットワークにはデコーダオブロックの最終層の上にスカラー出力となるMLPを追加して$\hat{V}(o|g) = \hat{V}(p)$を出力する。

[^3]: [John Schulman, Filip Wolski, Prafulla Dhariwal, Alec Radford, Oleg Klimov, "Proximal Policy Optimization Algorithms", 2017](https://arxiv.org/abs/1707.06347)

### _Lamorel_ を使った分散LLMポリシー

非常に大きなLLMを用いて行動空間上の確率を計算するのは明らかに計算量が多い。そのため、LLMワーカーをPythonのライブラリである **Lamorel** を用いて分散させ、アクションのサブセットをスコアリングすることで分散推論を可能にしている。

~~ とりあえずここまで ~~
