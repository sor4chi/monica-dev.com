---
title: 論文読み - Efficient Estimation of Word Representations in Vector Space
description: Efficient Estimation of Word Representations in Vector Space というWord2Vecのもととなる論文を読んだので、その内容をアウトプットします。
publishedAt: 2024/03/29
---

今回は "Efficient Estimation of Word Representations in Vector Space"[^1]という論文を読んだので、その内容をアウトプットします。

[^1]: [Tomas Mikolov, Kai Chen, Greg Corrado, Jeffrey Dean, "Efficient Estimation of Word Representations in Vector Space", 2013](https://arxiv.org/abs/1301.3781)

## 導入

従来の NLP は、単語を one-hot ベクトル(Atomic Units)で表現していたが、この方法は単語間の類似性を表現することができない。そこで、本論文では、単語を連続値ベクトルで表現する手法を提案している。

この論文では新たに 2 つの単語の連続ベクトルを計算するためのアーキテクチャを提案していて、これらを使うことで従来の手法よりもはるかに高速で精度の高い単語のベクトル表現を得ることができる。

この論文が示す手法は単語間の線形規則性を維持することができるため、代数的な演算が可能であり、例えば $vector("King") - vector("Man") + vector("Woman")$ という演算を行うことで、 $vector("Queen")$ という単語に近いベクトルを得ることができる。
※ $vector("King")$ は "King" という単語のベクトルを表す。

## モデルの比較1 計算複雑度

モデル同士を比較するため、計算複雑度を**学習するのに必要なパラメータのアクセス回数**として定義する。

複雑度は一般的に

$$
O = E \times T \times Q
$$

に比例する。

- $E$ : Epoch 数
- $T$ : 訓練データの単語数
- $Q$ : モデルによって異なる、

NNLM, RRNLM における$Q$は以下の通り。

- $N$ : 単語の数
- $D$ : ベクトルの次元数
- $H$ : 隠れ層の次元数
- $V$ : 語彙数

$$
\begin{align*}
Q_{NNLM} &=  N \times D + N \times D \times H + D \times V \\
Q_{RNNLM} &=  H \times H + D \times V
\end{align*}
$$

出力の$D \times V$部分は、階層ソフトマックスを使うことで、$H \times log_2(V)$に削減することができるため、NNLM では $N \times D \times H$ 部分の計算が支配的であり、RNNLM では $H \times H$ 部分の計算が支配的である。

結局のところ、この複雑性の大半は非線的な隠れ層の計算によるものであり、より多くのデータに対して効率的に学習するためにはより単純なモデルを使うことが重要である。

## 新たなアーキテクチャ

### Continuous Bag-of-Words Model

Continuous Bag-of-Words Model (以降 CBOW) は、入力層と出力層の間に隠れ層を持たず、単語の連続ベクトルを直接計算するモデルである。
標準的な Bag-of-Words モデルとは異なり、CBOW は文脈から連続的な分散表現を学ぶ。
論文では前後 4 単語 (の One-Hot ベクトル) を入力に、全結合 2 層のニューラルネットワークの中央に入る単語の確率がどれだけ高いかを予測するように教師あり学習を行い、先行研究と比較して精度の高いベクトル表現を得ることができている。

計算複雑度は以下の通り。

$$
Q_{CBOW} = N \times D + D \times log_2(V)
$$

今までのモデルと比較して、CBOW は直接的に単語の連続ベクトルを計算するため計算複雑度が低いことがわかる。

モデルのフローは以下の通り

$$
\mathbb{R}^{V} \times 2C \xrightarrow{W_I (D \times V)} \mathbb{R}^{D} \times 2C \xrightarrow{AVG} \mathbb{R}^{D} \xrightarrow{W_O (V \times D)} \mathbb{R}^{V} \xrightarrow{Softmax} \mathbb{R}^{V}
$$

ここで、$C$ は前後の単語の範囲を表す。例えば論文の場合は $C = 4$ である。

この時、id が $n$ の One-Hot ベクトルを $e_n$ とすると、単語分散表現は以下のように計算される。

$$
vector_n = W_I \times e_n
$$

$W_I$ が id (One-Hot ベクトル) を次元圧縮した単語ベクトルに変換する $D \times V$ 行列であるため、これによって単語の分散表現が得られる。

### Continuous Skip-gram Model

Continuous Skip-gram Model (以降 Skip-gram) は、CBOW とは逆に、中央の単語から周囲の単語を予測するモデルである。
入力は中央の単語の One-Hot ベクトル 1 つであり、出力は周囲の単語の確率となる。
Skip-gram は、CBOW と比較して、少ない訓練データで高い精度を達成することができる。

予測範囲を広げることで得られる単語分散表現の精度が向上するが、その分計算複雑度が増加する。

計算複雑度は以下の通り。

$$
Q_{Skip-gram} = C \times (D + D \times log_2(V))
$$

ここで、$C$ は現在の単語から予測対象となる単語までの最大範囲を表す。
範囲 $<1; C>$ の中でランダムに選んだ数 $R$ に対して、元となる教師データの前後 $R$ 単語(計 $2 \times R$)を正解ラベルとして学習を行う。

単語の生成 1 つ $D + D \times log_2(V)$ を $C$ 回行うため、$C$ が大きいほど計算複雑度が増加する。
論文では $C = 10$ で実験を行っている。

モデルのフローは以下の通り

$$
\mathbb{R}^{V} \xrightarrow{W_I (D \times V)} \mathbb{R}^{D} \xrightarrow{W_O (V \times D)} \mathbb{R}^{V} \times 2R \xrightarrow{Softmax} \mathbb{R}^{V} \times 2R
$$

この時、id が $n$ の One-Hot ベクトルを $e_n$ とすると、単語分散表現は以下のように計算される。

$$
vector_n = W_I \times e_n
$$

## 実験

論文では、得られた Vec の精度を比較するために似た二つの単語のペアを作り、その単語の関係性と同じような関係性を持つもう一つの単語のペアを用意する
そして、このペアを使ってどれだけ精度良く単語間の関係性を表現できるかを評価している。

例えば "Berlin : Germany" というペアがあって(これは Country : Capital の関係性を持つペアである)、このペアに対して "Paris : France" というペアが得られれば、このモデルは正しく Country : Capital の関係性を学習できていると言える。

このベンチマークは先述のように代数的な演算によって行われ、例えば $vector("Berlin") - vector("Germany") + vector("France")$ という演算を行い、その結果が $vector("Paris")$ に近いかどうかを評価する。
この評価方法を **Semantic-Syntactic Word Relationship** と呼ぶ。

Google News データセットを使って、語彙を最頻出の 30,000 単語 (それ以外は UNK に置き換え)に絞って実験を行った。

Vec の次元数と学習する単語数を変えて実験を行った結果、基本的に次元が多くなればなるほど、単語数が多くなればなるほど精度が向上することがわかった。

## モデルの比較2 精度

RNNLM, NNLM, CBOW, Skip-gram の 4 つのモデルを比較している。
RNNLM はモデルアーキテクチャ上隠れ層を持つ非線形モデルであるため、出力の線形性がないので精度が低い。

CBOW は既存の NNLM と同程度の Semantic Task での精度を持ち、Syntactic Task では NNLM よりも高い精度をだせることが示された。CBOW の学習に費やした時間は 1 日である。
次に Skip-gram についても同様の実験を行った結果、CBOW よりも高い精度を出すことができた。学習に費やした時間は 3 日である。

学習時に学習率を線型的に減少させることで、良い結果が得られることがわかっており、さらに同じデータで複数 epoch 学習するよりも、データソースを 2 倍にして 1 epoch で学習する方が良い結果が得られることがわかった。

CBOW, Skip-gram は既存モデル同程度以上の精度を持ちながらも、計算複雑度が低いため、高次元の Vec でもとても高速に学習することができる。
論文では NNLM より 10 倍多い次元の Vec を学習させるのに、NNLM の 1/6 ~ 1/7 の時間しかかからなかったにもかかわらず、NNLM より高い精度を出すことができた。

学んだ単語間の関係性において、例えば複数の単語ベクトルの平均を取ることで、学習していない未知の単語に対するベクトルを得ることができたり、ある単語から最も遠い単語を求めることができるなど、多くの自然言語処理における応用タスクへの利用が期待される。

## まとめ

本論文では、新たなアーキテクチャである CBOW, Skip-gram を提案し、これらを使って高速かつ高精度な単語のベクトル表現を得ることができることを示した。
計算複雑度が低いため、高次元の Vec でも高速に学習することができ、これまで以上に多くのデータを使って学習することができる。

---

## 議論

### 「線形性を維持した NN とは？」

隠れ層を持たず、入力から直接単語分散表現（重み行列）を学習するモデルを指す

- 論文では隠れ層を取り除きシンプルな目的語の回帰タスクとしてモデルを構築している
- 入力から直接単語分散表現の重みをチューニングすることで、線形性を維持している
- この方法は論文で従来の方法ではできないと述べられていた行列分解の手法(LSA)でも適切なチューニングをすれば学習できることが後に判明している[^2]

### 「$C$ (学習に使う周囲の単語の範囲) はどのように決めるのが良いのか？」

$C$ は一般に window size と呼ばれる

とある Stack Overflow[^3]によると、window size が増えると

- CBOW は $W_I$ のうち最大 $2C$ 行の行ベクトルの平均化 / Backpropagation 操作をするため、計算複雑度の増加は緩やか
- Skip-gram は $W_O$ に対して $2C$ 回の予測と Backpropagation 操作をするため、計算複雑度の増加は大きい
- 適切な window size はリソースとのトレードオフになる

Google の Word2Vec の論文[^4]によると、

- 精度向上を目的として文脈全体を考慮するために文全体を使って学習したと述べている
- しかし、一方で論文内では $C = 2$ としても実験を行ったと述べられており、その場合類推評価(Semantic-Syntactic Word Relationship)での精度は最も高いスコアが得られたと述べられている
- つまり window size が小さいほど単語そのものの情報をより多くとらえ、逆に大きいほどトピックやドメイン的な知識を補足しやすい

タスクによって評価を変え、ケースバイケースで実験的に決めるのが良さそう

### 「NNLM や RNNLM からどうやって単語分散表現を得ているのか？」

- NNLM
  - この論文[^5]で提案された、隠れ層を持つ FFNN を使って単語分散表現を学習するモデル
  - 単語分散表現は CBOW のように入力の One-Hot ベクトルを低次元な連続ベクトルに変換するための重み行列から得られる
- RNNLM
  - この論文[^6]で提案された、RNN を使って単語分散表現を学習するモデルである
  - RNNLM は次の単語を予測するために引き継がれた隠れ層の重み行列を使って単語分散表現を得る

こうすることで NNLM や RNNLM と CBOW, Skip-gram を比較することができる

### 「Semantic / Syntactic Accuracy のデータセットはどうやって用意したのか？」

論文[^7]のテストセットを使用したと記載されている
この論文は「単語の連続ベクトルを使って単語間の類似性を評価する」という目的で書かれているが、この論文中でデータセットの作り方について言及されている

#### Semantic

- SemEval 2012 Task 2 というデータセットを使って、単語間の意味的な類似性を評価している
- モントリオールで開催された SemEval 2012[^8] という国際ワークショップで行われたタスクの一つで、単語間の意味的な類似性を評価するタスクである
- データはこちらの論文[^9] によると手作業でカテゴライズされたそう

#### Syntactic

- Penn Treebank という英文の形態素解析済みのデータセットから、品詞の基本形と活用系（比較系や最上級系、複数形、過去形など）のペアを系統的に抽出している
- 異なるカテゴリの文章で同じ品詞の基本形と活用系のペアを抽出することで、単語間の構文的な類似性を評価している

[^2]: [Jeffrey Pennington, Richard Socher, Christopher Manning, "GloVe: Global Vectors for Word Representation", 2014](https://aclanthology.org/D14-1162)
[^3]: [nlp - How is the window size affect word2vec and how do we choose window size according to different tasks? - Stack Overflow](https://stackoverflow.com/questions/65422312/how-is-the-window-size-affect-word2vec-and-how-do-we-choose-window-size-accordin)
[^4]: [Tomas Mikolov, Ilya Sutskever, Kai Chen, Greg Corrado, Jeffrey Dean, "Distributed Representations of Words and Phrases and their Compositionality", 2013](https://arxiv.org/abs/1310.4546)
[^5]: [Yoshua Bengio, Réjean Ducharme, Pascal Vincent, Christian Jauvin, "A Neural Probabilistic Language Model", 2003](https://www.jmlr.org/papers/volume3/bengio03a/bengio03a.pdf)
[^6]: [Tomas Mikolov, Martin Karafiát, Lukáš Burget, Jan Černocký, Sanjeev Khudanpur, "Recurrent Neural Network based Language Model", 2010](https://www.fit.vutbr.cz/research/groups/speech/publi/2010/mikolov_interspeech2010_IS100722.pdf)
[^7]: [Tomas Mikolov, Wen-tau Yih, Geoffrey Zweig, "Linguistic Regularities in Continuous Space Word Representations", 2013](https://www.aclweb.org/anthology/N13-1090/)
[^8]: [SemEval 2012](https://ja.wikipedia.org/wiki/SemEval)
[^9]: [SemEval 2012 Task 2](https://aclanthology.org/S12-1047/)
