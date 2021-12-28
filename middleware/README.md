# middlewareディレクトリについて
middlewareを使用すると、ページまたはページのグループ（レイアウト）をレンダリングする前に実行できる、カスタム関数を定義できる。
middlewareについては、[公式](https://nuxtjs.org/ja/docs/directory-structure/middleware)によくまとまっている。

## 共有middlewareと匿名middleware
### 共有middlewareは、middlewareディレクトリ配下に関数を定義する。
例えば、middleware/auth.tsなら、authという共有middleware（名前付きmiddlewareとも言う）が作成される。
使用したい場合は、コンポーネント内で下記のように共有middlewareを呼び出すことができる。
```ts:xxx.vue
export default {
  middlewre: auth
}
```

### 匿名middlewareは、ページ固有のmiddlewareを定義できる。
例えば下記のように書く。
```ts:xxx.vue
export default {
  middleware({ store }) {
    store.commit('analytics/increment')
  }
}
```

これはこのページに定義された関数なので、このページ固有のmiddlewareとなる。
つまり、middlewareディレクトリに定義したように他の場所から呼び出せない。

### middlewareの引数はcontext
middlewareは、引数に[context](https://nuxtjs.org/ja/docs/internals-glossary/context/)を受け取る。


### 共有するか匿名にするか
他でも使い回す処理の場合は、共有middlewareを作成する。

`TODO ベストプラクティス検討`  
匿名middlewareを使用する場合は、果たしてmiddlewareで実装するのが良いのか、他のフック関数で処理をするのが良いのか検討が必要。

## middlewareでナビゲーションガードを設定する
ページ遷移をする際に実行される関数を設定できるのがmiddleware。
ページ遷移をする際に実行される関数といえば、思い浮かぶのはナビゲーションガード。
なので、ナビゲーションガードはMeddlewareに設定する。

### 匿名middlewareについて
特定のページに遷移する際にmiddlewareを設定することもできる。
ページコンポーネント内に、middlewareとして関数を設定する。
これを[匿名middleware](https://nuxtjs.org/ja/examples/middlewares/anonymous/)という。

各フック関数と合わせて、どのタイミングで実行するのが最適なのかを理解して使う必要がある。


# 本アプリケーションにおける名前付きmiddleware一覧
## middleware/authentification.ts: 認証middleware
### 要件
- 遷移時に認証によってページへのアクセス制限を設定する。
- 直接URLを指定された場合、および、nuxt-linkによる遷移の両方に対応するため、ユニバーサル（サーバーとクライアントの両方）で機能すること

→ middlewareでアクセス制限はだめだった。
ログイン情報をローカルストレージなどに持たせている時、SSR時（直接URLを叩いた時や画面をリロードした時）は認証情報があるローカルストレージにアクセスできないので必ずログイン画面にリダイレクトされる。  
対応策として下記がある。  
1. `before mount`か`mounted`フックなどクライアントで必ず実行されるフックの中でやる。  
これは画面のカクツキが気になるらしい。
2. Cookieに詰めてサーバーサイドに認証情報を渡す。
3. clientInitというpluginを自作して、SSRでもCSRでも実行する（今のところ、これが支持を得ている？）

2,3の方法は下記を参考にする。  
 - [Nuxt.jsでログインをどうやるか、そしてCookieからlocalStorageへ](https://hisasann.github.io/2019/06/22/how-to-login-with-nuxt-and-cookie-to-localstorage/)
- [Nuxt.jsでlocalStorageを用いる際のTipsとハマったこと](https://qiita.com/sunecosuri/items/3544fb101cabd310acc3)

結局、今回はclientInitというCSR時に実行するpluginでアクセス制限を実現する。
