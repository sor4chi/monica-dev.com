---
title: 論文読み - On the Prospects of Incorporating Large Language Models (LLMs) in Automated Planning and Scheduling (APS)
description: On the Prospects of Incorporating Large Language Models (LLMs) in Automated Planning and Scheduling (APS) という論文を読みました。
publishedAt: 2024/09/04
---

本論文 "On the Prospects of Incorporating Large Language Models (LLMs) in Automated
Planning and Scheduling (APS)"[^1] は LLM における自動計画・スケジューリングへの応用についてのサーベイ論文である。

[^1]: [Vishal Pallagani, Kaushik Roy, Bharath Muppasani, Francesco Fabiano, Andrea Loreggia, Keerthiram Murugesan, Biplav Srivastava, Francesca Rossi, Lior Horesh, Amit Sheth, "On the Prospects of Incorporating Large Language Models (LLMs) in Automated Planning and Scheduling (APS)", 2024](https://arxiv.org/abs/2401.02500)

## 導入

126 論文を言語翻訳、計画生成、モデル構築、マルチエージェント計画、対話的計画、ヒューリスティック最適化、ツール統合、ヒューリスティック最適化、ツール統合、ブレインインスパイアード計画の 8 つのカテゴリに分類し、それぞれのカテゴリにおける LLM の応用例を紹介している。

従来の古典的で厳密なアルゴリズムベースの計画手法（これを本論文ではシンボリックプランナーと呼ぶ）は、正確である一方で想定しない状況に対応できないという問題がある。
一方で LLM は生成的な側面があり、Zero Shot 特性を持つため、未知の状況に対しても柔軟に対応できる可能性がある。

この LLM とシンボリックプランナーの相補的な応用を考え、より知的で高度な計画・スケジューリングシステムを構築する手法を模索することが本論文の目的である。

## 背景

従来の自動プランニングとスケジューリング(APS)は行動集合から遷移関数を用いて初期状態をゴール状態へ逐次的に変化させる問題として、PDDL(Planning Domain Definition Language)などを用いた記号的アプローチによるフォーマリズムを行い、探索アルゴリズムやヒューリスティック手法を適用することで解決してきた。

> [!NOTE]
> **PDDL(Planning Domain Definition Language)**
> *PDDL* はプランニング問題を記述するための言語であり、ドメインと問題の2つの部分から構成される。ドメインは問題の一般的な特性を記述し、問題は具体的な初期状態とゴール状態を記述する。
>
> :::details[例: ロボットが物体を運ぶ問題]
>
> ```lisp
> (define (domain robot)
>   (:requirements :strips :typing)
>   (:types object location)
>   (:predicates (at ?o - object ?l - location)
>                (robot-at ?l - location))
>   (:action move
>     :parameters (?from ?to - location)
>     :precondition (robot-at ?from)
>     :effect (and (not (robot-at ?from)) (robot-at ?to)))
>   (:action pick
>     :parameters (?o - object ?l - location)
>     :precondition (at ?o ?l)
>     :effect (and (not (at ?o ?l)) (holding ?o)))
>   (:action drop
>     :parameters (?o - object ?l - location)
>     :precondition (holding ?o)
>     :effect (and (not (holding ?o)) (at ?o ?l)))
> ```
>
> ```lisp
> (define (problem robot-problem)
>   (:domain robot)
>   (:objects obj1 obj2 - object
>             loc1 loc2 - location)
>   (:init (at obj1 loc1) (at obj2 loc2) (robot-at loc1))
>   (:goal (and (at obj1 loc2) (at obj2 loc1))))
> ```
>
> :::
>
> PDDLは主に一階述語論理に基づいており、プランニング問題を形式化するための標準的なドメイン固有言語として使用される。これにより、問題を状態空間の探索として定義し、プランニング専用のアルゴリズム（例: STRIPSやFFプランナーなど）で解くことができる。なお、PDDLのドメイン定義には `:requirements` キーワードを使って、使用する機能（例えば、`:strips` や `:typing` など）を明示的に宣言することができる。

LLM の登場により機械学習モデルは自然言語の表現力を獲得し内部パラメータに蓄積された膨大な知識を活用することでより人間的な理解と推論をすることが可能になり複雑で動的な環境に適応できる可能性が出てきた。

### Translation

単に LLM の言語翻訳という意味ではなく、自然言語の指示を構造化されたプランニング言語に変換することを意味する。
人間の言語表現という便利なツールと機械が理解可能なフォーマットのギャップを埋める技術で直感的で効率的なインターフェースを実現するのに必要不可欠である。

- [LLM+P: Empowering Large Language Models with Optimal Planning Proficiency](https://arxiv.org/abs/2304.11477)
  - 計画問題の自然言語記述を GPT-4 を使って PDDL 化
  - 古典的なプランナーで解決策を見つける
- [Getting from Generative AI to Trustworthy AI: What LLMs might learn from Cyc](https://arxiv.org/abs/2308.04445)
  - LLM の PDDL 翻訳が対象物に対する理解が LLM の限られた理解の中で行われる
  - そのギャップを埋めるグラウンディングをする必要がある

### Plan Generation

LLM を使って計画生成を直接することに焦点を当てた研究。
In-Context Learning によって因果言語モデルを構築し、計画生成を行う。

- [RoboVQA: Multimodal Long-Horizon Reasoning for Robotics](https://arxiv.org/abs/2311.00899)
  - Google Meet を用いてロボットが環境を理解し、計画を立て、人間が実行するというロングホライゾンなタスクを解くデータセットとモデル
  - VLM や Video VLM を使って��にすべき行動をロボットが指示する

### Model Construction

LLM を使って正確なプランニングをするのに不可欠な世界モデルやドメインモデルを構築・改良する研究。

- [Do Embodied Agents Dream of Pixelated Sheep: Embodied Decision Making using Language Guided World Modelling](https://arxiv.org/abs/2301.12050)
  - RL は通常環境の知識なしにランダムな行動を取って tabula rasa(白紙)から学習する
  - LLM のもつ豊富な事前知識を活用することで学習のサンプル効率を 1 桁レベルで向上させる
  - マインクラフト環境において、LLM がタスクをいくつかのサブゴールのシーケンスとして分解し、それぞれを達成するために仮説をたて、検証する一連の流れを RL エージェントが学習する

### Multi-Agent Planning

LLM を使って複数のエージェント間の相互作用を含むシナリオにおいて複雑で効果的な戦略を生成する研究。

- [LLM-Deliberation: Evaluating LLMs with Interactive Multi-Agent Negotiation Game](https://openreview.net/forum?id=cfL8zApofK)
  - 複雑な交渉が必要なマルチエージェント意思決定環境において LLM の有効性を実証する研究と、新たなベンチマークの提案
- [Emergent Cooperation and Strategy Adaptation in Multi-Agent Systems: An Extended Coevolutionary Theory with LLMs.](https://www.mdpi.com/2079-9292/12/12/2722)
  - LLM によるマルチエージェントプランニングにおけるギャップは人間的な側面である「コミュニケーション」や「信念の維持」であり、これを動的に整合させるアルゴリズムが必要

[論文読み - LLM-Deliberation: Evaluating LLMs with Interactive Multi-Agent Negotiation Game](/blog/report-llm-deliberation)

### Interactive Planning

ユーザーからのフィードバックや、反復計画でリアルタイム適応性が必要な動的なシナリオにおいて LLM を活用する研究。
LLM

- [Grounding Large Language Models in Interactive Environments with Online Reinforcement Learning](https://arxiv.org/abs/2302.02662v2)
  - (既読)
  - GLAM と呼ばれる新たに提案した手法で LLM をリアルタイムのインタラクティブな環境でオンライン強化学習する
- [Open-vocabulary queryable scene representations for real world planning](https://arxiv.org/abs/2209.09874)
  - LLM が外部ソースに対して関連情報を積極的に要求させる手法を提案
  - 主にロボットタスクにおいて、周囲の情景に対する Grounding 不足が LLM を実世界に適用する際の課題である
    - 計画を生成する前に LLM が自発的に周囲の環境から利用できそうなものを見つけ問い合わせることで、計画をより現実的なものにする
    - 本論文では **NLMap** という視覚言語モデル（VLM）を用いて、「自然言語で問い合わせ可能なシーン表現」を作り、その後別のプランナー用の LLM **SayCan** を使って計画を生成する
  - SayCan は最近の別の研究で提案された、「ロボットが自然言語の指示に従って計画を立て、実行することを可能にする」ためのモデル
  - <https://nlmap-saycan.github.io/>

### Heuristic Optimization

LLM にヒューリスティックなガイダンスをさせ、シンボリックプランナーを支援する研究。

- [SayCanPay: Heuristic Planning with Large Language Models using Learnable Domain Knowledge](https://arxiv.org/abs/2308.12682)
  - LLM とヒューリスティックプランニングを組み合わせた新しい手法 **SayCanPay** を提案
    - 行動の実現可能性（Can）と長期的な報酬やペイオフ（Pay）を評価する学習可能なドメイン知識に導かれた行動（Say）を生成する LLM
    - 最適な行動シーケンスを選択するヒューリスティック探索
    - これらを組み合わせたプランニング

### Tool Integration

LLM はさまざまな計画ツールを統合するためのインターフェースとして機能し、複雑なシナリオでの機能性を高めることができるという研究。

- [Gentopia: A collaborative platform for tool-augmented llms](https://arxiv.org/abs/2308.04030)
  - 拡張言語モデル(ALM)は大規模な言語モデルにツールを使用する能力を与える。
  - 論文ではコンポーザブルなエージェントを自由に作成、共有、統合できるようにして LLM がさまざまなものにアクセスできるようにする **Gentopia** という新たなプラットフォームを提案している。
- [Chameleon: Plug-andplay compositional reasoning with large language models](https://arxiv.org/abs/2304.09842)
  - Python 関数、ヒューリスティックモジュール、Web 検索エンジンなどの外部ツールへの問い合わせにより、LLM に色々な外部ツールを使った統合的な推論ができるようにする **Chameleon** という新たなプラットフォームを提案している。

どちらもプラットフォームなだけ、フレームワークのようなもの

現在は存在しないツールをハルシネーションしたり、単一のツールを使いすぎたりして効果的なツールの選択、組み合わせができていないので、これらの工夫が今後必要で鍵となる。
