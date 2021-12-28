# コーディング ルール
フロントエンドのコーディング時のルールをまとめたものです。なお、TypeScript/Vueの組合せ特有の記載内容だけでなく、一般的なその他プログラミング言語にも当てはまるルールも記載しています。

## 前提
TypeScriptはJavaScriptのスーパーセットです。JavaScriptで書ける内容は、互換性がありTypeScriptでも書くことができます。そのため、JavaScriptの構文をおさえておくことが前提となります。

JavaScriptの書き方に関しては、下記を参照してください。<br>
[イマドキのJavaScriptの書き方2018](https://qiita.com/shibukawa/items/19ab5c381bbb2e09d0d9)

## Vue.jsスタイルガイド
Vueの公式ガイドラインに従います。`必須`レベルには整えてください。<br>
https://jp.vuejs.org/v2/style-guide/index.html

## 変数宣言はconstを使用する
変数宣言は`const`と`let`が利用できるが、可能な限り`const`を使って定義する。

```typescript
// 値が書き換えられない
const val: string = "hello world"

// 値が書き換え可能。意図しない代入が発生する可能性あり
let val: string = "hello world"
```

参考：https://future-architect.github.io/typescript-guide/variable.html#id2


## 変更が発生しないプロパティはreadonlyとする
```typescript
class Example {
  private xxxRepository = initRepository();  // 書き換わる可能性あり
  private readonly yyyConfig = initConfig(); // 書き換わらないので安心
}
```

## 早期リターンにする
### 悪い例
```typescript
function doSomething(x: number | null) {
  if (x !== null) {
    /**

    ここに何か処理

    */
    return ret;
  } else {
    return -1;
  }
}
```

### 良い例
```typescript
function doSomething(x: number | null) {
  if (x === null) {
    // はやめにreturnすることで、ソースを深く読まなくてよくなる。
    // インデントも減るので見やすくなる。
    // TypeScriptの推論とも相性が良い。
    return;
  }

  /**

  ここに何か処理

  */
  return ret;
}
```

## メソッドの公開範囲はなるべく狭くする
なるべく`private`をつけること。TypeScriptは修飾しない場合はデフォルトで`public`扱いになるため、注意すること。

```typescript
public doAaa() {
  // ソースを読んでいるときに、publicだとどこかから参照されていると思われてしまう
}

private doBbb() {
  // privateであれば、このクラスからしか参照されていないと判断できる
}

```

## async/awaitに注意する
JavaScriptのPromiseを理解しておくこと。

### 悪い例
```typescript
let res; // letで定義せざるを得ない...
try {
  res = axios.get(/*...*/);
} catch (err) {
  console.warn(err);
}

// catchの外でawaitしているので、上で定義したcatchは無効
const val_from_api = await res;
```

### 良い例
```typescript
// すべてconstとなる
// try-catchを書かなくても、awaitでcatchを書けるので、より短くなる
const res = axios.get(/*...*/);
const val_from_api = await res.catch(() => return default_value);
```

## getter/setter
TypeScriptでは`get`,`set`修飾子でgetter/setterを定義できる。なるべくgetter/setter経由で値の取得/書き換えを行う。

* getter/setterは不要であれば定義しない（getterのみ必要なケースが多いかも）
* 命名は適した内容とする。`getXxx`という名称とする必要はない。また動詞でなくても良い

```typescript
// 例1
export default class Example extends Vue {
  private hoge: number;

  // getXxxとメソッド名を
  get getHoge() {
    return this.hoge
  }
  set updateHoge(val: number) {
    this.hoge = val;
  }

  // OK
  const ret = this.getHoge;
  this.updateHoge = 123;

  // NG
  count ret = this.hoge;
  this.hoge = 123;
}
```

```typescript
export default class Example extends Vue {
  /**
    例2
    getter/setterを名詞としている
  */
  private filter: string;
  get filterText() {
    return this.filter;
  }
  set filterText(filter: string) {
    this.filter = filter;
  }

  /**
    例3
    booleanなのでisXxxと定義
  */
  private assign: boolean;
  get isAssign() {
    return this.assign;
  }
}
```


**注意**<br>
Vueはprivateプロパティに`_hoge`とプレフィックスに`_`をつけると、Vue側でwarningが発生する。プレフィックスに`_`はつけないこと。
```typescript
export default class Example extends Vue {
  // なんとなく下記のように定義したくなるが...、これはNG
  private _foo: number;
  get foo {
    return this._foo;
  }
  set foo (input: number) {
    this._foo = input;
  }
}
```

## 最低限の型定義は行う
TypeScriptでは`any`型を定義できる。複雑なオブジェクトなどは`any`などを許可するが、プリミティブな型などは正しく型定義を行うようにすること。

```typescript
/**
  [必須]
  boolean, number, stringは型定義を行う。
  nullableの場合も同様。
*/
const hasElement: boolean;
const money: number;
const message: string;

// nullable
const money: number | null;
function doSomething(input: x | null) {
  // ...
}

/**
  [必須]
  配列であることを定義する
*/
const flags: boolean[];
const names: string[]; // stringの配列
const params: any[];   // 難しい場合はanyでも良い。最低限、配列であることを明示

/**
  [推奨]
  オブジェクト型（連想配列）の型定義。
  ほとんどの場合、プリミティブな型定義のため、定義した方がよい。
*/
const config: {[key: string]: boolean};
const config: {[key: string]: any} // keyは文字列であることが多い
```

## メソッドの考え方

### 命名ルール
メソッド名は動詞を使うこと。<br>
特にバックエンドからデータを取得するメソッドは、`fetchSomething`として、`getter`と明示的に区別することを推奨。

[Qiita - うまくメソッド名を付けるための参考情報](https://qiita.com/KeithYokoma/items/2193cf79ba76563e3db6)

### 分割の考え方
UTを考慮したメソッドの分割をすること。メソッド間でなるべく依存関係が少なくなるように記載すること。

以下、Vueコンポーネントのマウント時にデータを取得するロジックを参考に例を記載する。

#### 悪い例

```typescript
export default class Example extends Vue {
  private articles = []; // set default

  mounted() {
    fetchArticles();
  }

  private async fetchArticles() { // :うぇーん:fetchで取得するだけの意味なのに、いろいろやっている
    // バックエンドからデータ取得
    const articles = await axios.get(URL).catch(this.handleError);

    // filter処理
    this.doLogicAaa(articles); // :うぇーん:さらに別のメソッドを呼んで、関数呼び出しが深くなっている
  }

  private doLogicAaa(articles) {
    /**
      なにかビジネスロジック
    */
    this.doLogicBbb(aaaArticles); // :うぇーん:さらに別のメソッドを呼んで、関数呼び出しが深くなっている
  }

  private doLogicBbb(articles) {
    /**
      なにかビジネスロジック
    */
    this.articles = bbbArticles; // :うぇーん:最終アウトプットがメソッドを追わないとわからない
  }
}
```


#### 良い例

```typescript
export default class Example extends Vue {
  private articles = []; // set default

  mounted() {
    this.initializeArticles();
  }

  // setterを定義
  set updateArticles(articles: any[]) {
    this.articles = articles;
  }

  // articlesの処理で起点となるメソッドを定義
  private async initializeArticles() {  // :+1:各処理の関係が明確。読みやすい
    // データ取得（外部と依存関係あり）
    const articles = await this.fetchArticles();

    // ロジックAAAを適用（依存関係なし）
    const aaaArticles = this.doLogicAaa(articles);

    // ロジックBBBを適用（依存関係なし）
    const bbbArticles = this.doLogicBbb(aaaArticles);

    // プロパティにセット（プロパティと依存関係あり）
    this.updateArticles = bbbArticles;
  }

  // バックエンドからデータ取得のみを行う
  // :+1:UTするときにこのメソッドをMockにしてしまえば、バックエンドとの疎通は不要
  private async fetchArticles() {
    return axios.get(URL).catch(this.handleError); // :+1:アウトプットが明確
  }

  // :+1:引数を処理して結果だけ返す --> Input,Outputを気にするだけなので、UTが書きやすい
  private doLogicAaa(articles) {
    /**
      なにかビジネスロジック
    */
    return aaaArticles; // :+1:アウトプットが明確
  }

  // :+1:引数を処理して結果だけ返す --> Input,Outputを気にするだけなので、UTが書きやすい
  private doLogicBbb(articles) {
    /**
      なにかビジネスロジック
    */
    return bbbArticles; // :+1:アウトプットが明確
  }
}
```

## CSSコーディングルール

- Vueコンポーネント内でCSSを定義する CSS in JS を前提とする
- 既存Vuetifyクラスを上書きできる場合は、新たにクラスを切らずに既存を利用する
- 新たにクラスを追加する場合は、既存Vuetifyクラスにならい、ケパブケースにする
