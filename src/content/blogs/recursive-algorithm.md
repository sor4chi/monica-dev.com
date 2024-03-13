---
title: 再起関数のメモ化アルゴリズムを実装してみた
description: 再起関数のアルゴリズムについて考えたことを実装してみました
publishedAt: 2021/05/27
updatedAt: 2023/06/23
---

今回は私の大学の離散数学で扱った講義内容について自分が思い付いたことについて触れたいと思います。

## 今回扱う問題

$$
\begin{align}
f(m, n) = \begin{cases}
n+1 & (m = 0) \\
f(m - 1, 1) & (n = 0) \\
f(m - 1, f(m, n-1) & \text{otherwise}
\end{cases} \notag
\end{align}
$$

この関数の値 f(4, 1)を算出するプログラムを作成したいと思います。

## プログラム

まずはこの問題を Python で解いてみます。

```python
gcount = 0

def func(m, n):
    global gcount
    gcount += 1
    if m == 0: return n + 1
    if n == 0: return func(m - 1, 1)
    return func(m - 1, func(m, n - 1))

print(func(4,1))
```

これを実行すると

```txt
RecursionError: maximum recursion depth exceeded in comparison
```

というエラーが出ます。これは python の最大再起処理回数を超えた時に出るエラーが出ます。これを回避するために

```python {1-2}
import sys
sys.setrecursionlimit(2**31 - 1) #int最大値

gcount = 0

def func(m, n):
    global gcount
    gcount += 1
    if m == 0: return n + 1
    if n == 0: return func(m - 1, 1)
    return func(m - 1, func(m, n - 1))

print(func(4,1))
```

を追加します。しかし実行しても計算はいつまで経っても終わりません。

そうです、こんなシンプルな再起関数でも大量の再起処理回数が発生しており、Python の処理速度では賄いきれませんでした。

ではコンパイラ言語の C++で実装し直して計算してみたいと思います。

```cpp
#include <time.h>
#include <iostream>
int gcount = 0;

int func(int m, int n) {
    gcount++;
    if (m == 0) return n + 1;
    if (n == 0) return func(m - 1, 1);
    return func(m - 1, func(m, n - 1));
}

int main() {
    clock_t start, end;
    start = clock();
    printf("解：%d\n", func(4, 1));
    end = clock();
    printf("関数呼び出し回数：%d\n", gcount);
    printf("処理時間：%fs\n", (double)(end - start) / CLOCKS_PER_SEC);
    return 0;
}
```

これを実行すると

```txt
解：65533
関数呼び出し回数：-1431983286
処理時間：15.703829s
```

と出力されました。int オーバーフローするほど計算量があったことに驚きました。ここで `gcount` の `int` を `long` に変換すると

```txt
関数呼び出し回数：2862984010
```

とわかりました。
再起関数をただ闇雲に計算するだけでは計算量がこのように爆発してしまいます。そこでこれを動的計画法的思考で考えてみます。

## 考察

この再起関数では、式中で引数が全く同じ値の関数を呼び出すことが何度もあり繰り返されています。そこで、すでに計算した関数引数と値の対応をあらかじめ保存しておくことによって計算量を減らすというアルゴリズムを考えます。

あらかじめ `store[m][n]` で取れる二次元配列を作っておき、計算結果をそれぞれ記録、もし新たな計算をしたとき、記録内にすでに値が格納されている場合はそちらの値を使うことで無駄な計算を省く処理を実装して

```cpp {7-22}
#include <time.h>
#include <iostream>

int gcount = 0;
vector<vector<int>> store(MAX_N, vector<int>(MAX_N, 0));

int func(int m, int n) {
    gcount++;
    if (store[m][n] != 0) {
        return store[m][n];
    }
    if (m == 0) {
        store[m][n] = n + 1;
        return n + 1;
    }
    if (n == 0) {
        store[m][n] = func(m - 1, 1);
        return store[m][n];
    }
    store[m][n] = func(m - 1, func(m, n - 1));
    return store[m][n];
}

int main() {
    clock_t start, end;
    start = clock();
    printf("解：%d\n", func(4, 1));
    end = clock();
    printf("関数呼び出し回数：%d\n", gcount);
    printf("処理時間：%fs\n", (double)(end - start) / CLOCKS_PER_SEC);
    return 0;
}
```

とすると、出力結果は

```txt
解：65533
関数呼び出し回数：196625
処理時間：0.001878s
```

となり、計算量が約 1/15000 ほどになりました。これによって Python でも問題なく解けると思います。
これを**メモ化再起**というらしいです。（知りませんでした...）

アルゴリズムの重要さを実感できました。

## 追記 (2023-05-08)

現在このブログの移行作業をしているのですが、今見ると当たり前のこと書いてて恥ずかしいですね...

応用情報レベルまでのアルゴリズムを一通り学んだあとなので尚更...w
