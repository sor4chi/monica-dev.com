---
title: 論文読み - Efficient Estimation of Word Representations in Vector Space
description: Efficient Estimation of Word Representations in Vector Space というWord2Vecのもととなる論文を読んだので、その内容をアウトプットします。
publishedAt: 2024/03/29
---

今回は "Efficient Estimation of Word Representations in Vector Space"[^1]という論文を読んだので、その内容をアウトプットします。

[^1]: Tomas Mikolov, Kai Chen, Greg Corrado, Jeffrey Dean, "Efficient Estimation of Word Representations in Vector Space", 2013, https://arxiv.org/abs/1301.3781

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
論文では前後 4 単語 (の One-Hot ベクトル) を入力に、全結合2層のニューラルネットワークの中央に入る単語の確率がどれだけ高いかを予測するように教師あり学習を行い、先行研究と比較して精度の高いベクトル表現を得ることができている。

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

この時、idが $n$ の One-Hot ベクトルを $e_n$ とすると、単語分散表現は以下のように計算される。

$$
vector_n = W_I \times e_n
$$

$W_I$ が id (One-Hotベクトル) を次元圧縮した単語ベクトルに変換する $D \times V$ 行列であるため、これによって単語の分散表現が得られる。

### Continuous Skip-gram Model

Continuous Skip-gram Model (以降 Skip-gram) は、CBOW とは逆に、中央の単語から周囲の単語を予測するモデルである。
入力は中央の単語の One-Hot ベクトル1つであり、出力は周囲の単語の確率となる。
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

この時、idが $n$ の One-Hot ベクトルを $e_n$ とすると、単語分散表現は以下のように計算される。

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
