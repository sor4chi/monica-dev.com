---
title: 論文読み - Training language models to follow instructions with human feedback
description: Training language models to follow instructions with human feedback という論文を読みました。
publishedAt: 2024/06/19
noindex: true
---

今回は OpenAI が 2022 年に発表した "Training language models to follow instructions with human feedback"[^1] を読みました。

[^1]: ["Long Ouyang", "Jeff Wu", "Xu Jiang", "Diogo Almeida", "Carroll L. Wainwright", "Pamela Mishkin", "Chong Zhang", "Sandhini Agarwal", "Katarina Slama", "Alex Ray", "John Schulman", "Jacob Hilton", "Fraser Kelton", "Luke Miller", "Maddie Simens", "Amanda Askell", "Peter Welinder", "Paul Christiano", "Jan Leike", "Ryan Lowe", "Training language models to follow instructions with human feedback"", 2022](https://arxiv.org/abs/2203.02155)

## 導入

これまでさまざまな検証や研究投資によって大きな言語モデルを作ってパラメータ数をとにかく増やすことで性能を向上させてきたが、実際にはそのような大きなモデルをただ単に作っただけではユーザーが期待する出力を生成するわけではない。ましてや嘘や有害な出力を生成してしまうこともある。
そこでこの論文では人間からのフィードバックによって事前学習された LLM をファインチューニングすることで、ユーザーが期待する出力の分布へとモデルを調整していく手法を提案している。

論文では人間に沿う(aligned by human な)言語モデルであるという基準を

- **ユーザーがタスクを解決するのを助ける**
- **正直である**
- **無害である**

とし、これを評価としている。

## 方針とモデル

2020 年に OpenAI が発表した GPT-3 の事前学習モデルをベースにしている。すでにネット上から集めたコーパスを使って事前学習されたモデルをベースにしており幅広い知識を持っていることが検証済みであるが、未アラインメントである。

このモデルをアラインメントするために、既存研究の **RLHF** (Reinforcement Learning from Human Feedback)[^2] という人間のフィードバックによる強化学習手法をベースにファインチューニングを行っている。
RLHF では人間の嗜好を強化学習における **報酬信号** として扱う。

[^2]: ["Paul Christiano", "Jan Leike", "Tom B. Brown", "Miljan Martic", "Shane Legg", "Dario Amodei", "Reinforcement Learning from Human Feedback", 2017](https://arxiv.org/abs/1706.07269)

RLHF 自体はもともと Atari ゲームなどの強化学習タスクにおいて人間が意図する振る舞いを学習するための手法であるが、最近になってそれを翻訳等の文章生成タスクなど、NLP タスクに適用する研究が注目を集めていたという背景がある。

また、先行研究ですでに言語モデルの有害性や不正確性などを評価するためのベンチマークがいくつか作成されており、アラインメントの精度を評価するために用いている。

### Step1: ベースラインの作成 (SFT)

OpenAI が持っているプラットフォームに送信されたユーザーのプロンプト(本番環境を除く)をサンプルし、人間がその出力として望ましいものを作成する。そのペアを使って教師あり学習を行い、ベースラインとなる言語モデルを作成する。
個人識別情報(PII)のフィルタリングをして顧客の詳細な情報を学習しないようにした。
OpenAI API に提出されたプロンプトをユーザー単位(UID 単位)でトレーニング・バリデーション・テストデータを分割した。
これに OpenAI が独自に雇ったラベラーが作ったデータセットを追加して、トレーニングタスクとして利用した。

16Epochs で Cosine Learning Rate Schedule を用いて学習を行い、0.2 のドロップアウトを適用した。
1Epoch 後にオーバーフィットしたがその後 Epoch 数を増やすことで性能が向上した（？）

### Step2: Human Reward Model の作成 (RM)

OpenAI が雇ったラベラーが、複数の異なる LLM の出力からどれが望ましいかを選択しラベル付けすることでラベラーの嗜好に基づいて報酬を最大化するような Reward Model を作成する。

この時、ラベラーが評価する基準として、真実性やバイアス、有害な言語を含む可能性のある出力などが考慮されている。
Appendix B にあるように、雇用した全員を利用したわけではなく、**センシティブ性を判断して対応する能力が高い**とされたラベラーのみを選択している。

評価方法として、

- OpenAI 独自にラベリングをしたセンシティブかどうかのフラグ付きデータセットとラベラーの回答の一致度
- OpenAI 独自にランクづけした 1 つのプロンプトに対する複数の出力データセットとラベラーの回答の一致度
- 人口統計情報に基づく、ラベラーの偏り

などがある。

ラベラーは個人差があるため、特に出力に潜在的な有害性がある場合などでは評価が異なる場合があるが、各個人に一任している。しかし、最終目的である真実性と無害性を優先して評価するように指示されている。

#### Reward Model の設計

ラベラーに$K$個の出力をランク付けさせることで、$K^2$個の比較が生成される。
（おそらくランク順序に並べた時の重複なし$K \choose 2$のペアに対する比較のことだと思われる）

これを 1 バッチとして、RM を学習する。

学習には以下の損失関数を用いる。

$$
\text{loss}(\theta) = -\frac{1}{\binom{K}{2}} \mathbb{E}_{(x, y_w, y_l) \sim D} \left[ \log \left( \sigma \left( r_{\theta} (x, y_w) - r_{\theta} (x, y_l) \right) \right) \right]
$$

- $x$: プロンプト
- $y_w$:ラベラーが好ましいと選択した出力（ランクが高い方）
- $y_l$:ラベラーが好ましくないと選択した出力（ランクが低い方）
- $r_{\theta}$: Reward Model
- $\sigma$: シグモイド関数
- $\mathbb{E}_{(x, y_w, y_l) \sim D}$: データセット$D$からサンプリングした$(x, y_w, y_l)$に対する期待値

$r_{\theta} (x, y_w) - r_{\theta} (x, y_l)$の部分は、**人間が選んだ好ましい出力と好ましくない出力の、報酬モデルの出力との差**を表している。
これをシグモイド関数に通し対数をとって平均することで、この**平均を最小化することがモデルの評価と人間の評価を一致させること**になる。

### Step3: Reward Model によるファインチューニング (RL)

作った Reward Model を使って、**PPO** (Proximal Policy Optimization) という強化学習手法を使って言語モデルをファインチューニングする。

あくまでも人間一般な嗜好を学習するのではなく、一定数のラベラーが選択したものを学習することで、学習の単純化と多様さを担保している。

#### Reinforcement Learning

報酬は以下のように設定する

$$
R_{\theta} (x, y) = r_{\theta} (x, y) - \beta \log \left( \frac{\pi_{\phi}^{RL} (y | x)}{\pi_{\phi}^{SFT} (y | x)} \right)
$$

- $r_{\theta} (x, y)$: Reward Model
- $\pi_{\phi}^{RL} (y | x)$: PPO のポリシー
- $\pi_{\phi}^{SFT} (y | x)$: SFT のポリシー

式から見てわかるように、$r_{\theta} (x, y)$ が高いほど報酬が高くなるが、$\pi_{\phi}^{RL} (y | x)$ が $\pi_{\phi}^{SFT} (y | x)$ に比べて高い場合、報酬が下がるようになっている。
第二項は、PPO と SFT の方策の KL ダイバージェンスになっており、分布が大きく離れすぎると報酬が下がるようになっている。これにより報酬の安定化を図っている。

次に、目的関数を以下のように設定する。

$$
\text{objective} (\phi) = E_{(x,y) \sim D_{\pi_{\phi}^{RL}}} \left[r_{\theta} (x, y) - \beta \log \left( \frac{\pi_{\phi}^{RL} (y | x)}{\pi_{\phi}^{SFT} (y | x)} \right) \right]+ \gamma E_{x \sim D_{pretrain}} \left[\log (\pi_{\phi}^{RL} (x)) \right]
$$

- $D_{RL}$: RL のデータセット
- $D_{pretrain}$: 事前学習データセット
- $\gamma$: 事前学習データセットの重み

強化学習なので報酬の期待値が最大になるように方策 $\pi_{\phi}^{RL}$ を学習する。

このとき、事前学習時の分布をなるべく維持するために目的関数に元の事前学習モデルの項を追加することで、アラインメントによる性能低下を抑えることができた。これを PPO-ptx と呼んでいる。

## 結果

### GPT-3 との比較

論文では 175B パラメータを持った GPT-3 モデルに対して、この手法で作った 1.3B の InstructGPT はパラメータ数が 100 倍以上異なるのにも関わらず GPT-3 よりも人間による評価で高いスコアを叩き出した。

論文 Figure 3 では PPO-ptx のモデルが 1.3B 程度の少ないパラメータ数で 175B の GPT-3 に対して 50%以上の勝率を叩き出していて、かなり効果があることがわかる。一方で 175B の PPO-ptx が SFT175B に対して 70 パーセントに満たない勝率であるため、ここは疑問に感じた。

### 質問回答における信頼性

TruthfulQA ベンチマーク[^3] を用いた実験では、InstructGPT は GPT-3 に比べて 2 倍程度有益な回答を生成する頻度が高かった。
特にクローズドドメインのタスク（要約など）においては、入力に存在しない情報を生成する必要がないため、不必要な情報が入らないようにチューニングした方が良い。
これを論文では **幻覚 (Hallucination)** と呼び、InstructGPT は GPT-3 モデルの Hallucination を半分に抑えることに成功している。

[^3]: ["Stephanie Lin", "Jacob Hilton", "Owain Evans", "TruthfulQA: Measuring how models mimic human falsehoods", 2021](https://arxiv.org/abs/2109.07958)

### 有害な出力の削減

RealToxicityPrompts ベンチマーク[^4]を用いた実験では、InstructGPT は GPT-3 に比べて 25% 以上有害な出力を生成する確率が低かった。
しかし、Winogender, CrowSPairs などのベンチマークでは GPT-3 を超える向上は見られなかった。

[^4]: ["Samuel Gehman", "Suchin Gururangan", "Maarten Sap", "Yejin Choi", "Noah A. Smith", "RealToxicityPrompts: Evaluating Neural Toxic Degeneration in Language Models", 2020](https://arxiv.org/abs/2009.11462)

論文 Figure 4 では、基本的にアライメントされたモデルのほうが良い結果を出しているが、特に Hallucination のセクションで PPO-ptx より SFT が低いのが気になる。注釈ではプロンプトの制約に従うことに対してのアラインメントが強く、Hallucination のセクションでは SFT のほうが良い結果を出していると書かれている。

### アラインメントによる性能低下

InstructGPT の学習過程において、人間の嗜好に合わせたチューニングにより一定のタスクでの性能が低下する現象が見られた。(SQuAD や WMT 2015 Fr-En など)
これはアラインメントによる破壊的な事前学習パラメータの変更が原因であると考えられ、論文では**アラインメント税** と表現されている。
Step3 の RL で書かれていたように PPO-ptx を用いることでこのアラインメント税を抑えることができた。

結果 FLAN や T0 といった既存のモデルと比較しても良い結果を出している。

最後に、以前として InstructGPT はミスをするよということが書かれており、うまくプロンプトで偽装をすることで有害な出力を生成することができることや、プロンプトの要求に対して過度に適応することがあるということが書かれている。今後もこのような問題に対して改善を続けていく必要がある。

### アラインメントの汎用性

InstructGPT が Un-Supervised な設定 (e.g. 非英語タスク、プログラムコード) においても有益な結果を出すことができた。
これは、アラインメントの手法が汎用的であることを示している。
論文ではこの結果が今後のアラインメント手法において大切な特性だと述べていて、ヒューマンコストがかかりすぎるアラインメント作業においてより低コストで効果的な手法を探すことに意味があるため、この結果は重要であるとしている。

## アラインメントに関する懸念

本論文では、Upwork や Scale AI などのプラットフォームを通じて雇用されたラベラーから得たデモンストレーションデータ（Step1 で使われたデータ）と好みのデータ（Step2 で使われたデータ）を用いて学習を行っているが、Appendix B (Table 12) によると、今回雇用したラベラーは米国または東南アジアの英語話者に偏っている。こういった**ラベラーの属性に関する偏りが、アラインメントの性能に影響を与える**可能性がある。
今回のアラインメント時の評価ではラベラー間の合意率が 73%程度であった。

さらに、今回ラベラーが最初に出力を選ぶときや判断に困ったときは OpenAI 社内と通ずるチャットによって指示が与えられた。したがって間接的ではあるが、OpenAI 社内の価値観が反映されていると言える。
Appendix B.5 にあるように、ラベラーが判定をする際には OpenAI が特別に作成した Web インターフェースが用いられた。つまりその UI 自体もラベラーのデータに影響を与えている可能性がある。
こういった問題点から、人間の一般的な価値観をうまく反映するにはさらなる研究がだと述べられている。

先述したように、今回のアラインメントでは**潜在的に有害なプロンプト**に対して無害な出力を生成することができておらず、今後の研究でこの問題に対処する必要がある。
論文では今回のアラインメント技術には限界があると述べられており、今後の研究では別のアプローチとして

- モデルのトレーニングデータをフィルタリングする技術を向上させ、有害なデータが学習されないようにする
- 言語モデルに恣意的に有害な出力を生成させるデータ拡張パイプラインを作成し、アラインメントの学習データを増やす

などのアプローチを今後研究していくと述べられている。

## その他の懸念

OpenAI は LLM を一般に色々なタスクに応用し、一般ユーザーが誰でも利用できるようにすることを目指しているが、それを実現するにはより安全である必要がある。このアラインメント技術はあくまでも LLM エコシステムの一部であり、完全に安全であるわけではない。
もし一般ユーザー向けにプラットフォームを開発し展開したとしても、それが高リスクなあ医療や法務などの分野において利用される場合、アラインメント技術だけでは不十分では到底不完全であり危険が伴う。
モデルがオープンにされることで、悪意あるユーザーがモデルを悪用する可能性があるが、逆にクローズにして特定の OpenAI が認識する組織だけで利用するとなると最先端の ML 技術が一部の組織にしか利用されず発展を阻害する可能性がある。
そのため、一つの案として OpenAI が API を提供し、その API を OpenAI が削除、停止、制限する権限を持つことで、悪意あるユーザーによる悪用を防ぎつつ、一般ユーザーにも利用できるようにすることができると選択肢を示している。

## まとめ

RLHF という人間のフィードバックによる強化学習手法を用いて、事前学習された言語モデルをファインチューニングすることで、人間の嗜好に合わせた出力を生成することができることを示した。
新たに考案された Reward Model によるファインチューニング手法を用いることで、GPT-3 に比べて有益な回答を生成する確率が高まり、有害な出力を生成する確率が低減することができた。
また工夫によってアラインメントによる性能低下を抑えることができた。
しかし、正直さや有害さなどの基準は主観によるものであり、論文での評価はあくまで一部であるため、今後評価をより多角的に行う必要がある。

## 追調査

["Submitted on 8 Jun 2024","Creativity Has Left the Chat: The Price of Debiasing Language Models","Behnam Mohammadi"](https://arxiv.org/abs/2406.05587)

この論文ではアラインメントされた言語モデルが創造性を失うという事実について調査、言及している。
Llama-2 という言語モデルと、その RLHF にてアラインメントされたモデルを比較している。

Embedding 出力の比較や出現単語の偏りなどを調査し、実際にアラインメントされたモデルは出力が著しく似通っており、アラインメントされたモデルの創造性が低下していることを示している。

1. タスクをやらせた時の出現単語分布 Word Cloud やヒストグラムを用いて視覚化 (Figure.1~6)
2. レビュー文出力タスクの感情極性分析を行い、ヒストグラムで可視化 (Figure.8)
3. 二つの言語モデルの Embedding を比較し、その出力のクラスタリングの違いを調査、T-SNE を用いて可視化 (Figure.9)
4. 出力のエントロピーを比較し、アラインメントされたモデルのエントロピーが低いことを示す (Figure.11)

結論として、少なくとも Llama-2 においては、RLHF は構文的で意味的な出力を減少させる可能性があることがわかった。
また、エントロピーがアラインメント後に減ったことにより、RLHF はトークンが出力される経路を遮断していることが明らかになり、特定のトークンを生成する能力が低下していることがわかった。
また、「人間の好みに合わせる」ということは好意的な出力をすることに近しく、批判や否定的な意見を生成する能力が低下する可能性があることが感情分析の結果からも示された。

もしモデルを広告などマーケティング文脈など創造性が求められるアプリケーションで利用する場合、このようなアラインメントによる創造性の低下は問題となる可能性があり、アラインメントに使われた手法などにも焦点を当ててモデルを選択する必要があると述べられている。
