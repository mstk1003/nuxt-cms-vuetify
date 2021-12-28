# 導入ツールについて

## 1. 環境ごとに環境変数を切り替える
### @nuxtjs/dotenvとcross-env
[参考](https://zenn.dev/captain_blue/articles/nuxt-switch-env)
### @nuxtjs/dotenv
.env_xxxで、環境変数を管理できるようにするためのツール

### cross-env
環境変数を管理しているenv_xxxファイルを切り替えられるようにするためのツール

## 2. 「marked」でマークダウンからHTMLを生成する
[markedドキュメント](https://marked.js.org/)

## 3. ❌やっぱやめた → 「processmd」でマークダウンからJSONを生成する
processmdでマークダウンからJSONを生成しようと思ったけど、やっぱやめだな。
markedでmarkdown ⇆ htmlの変換ができるから、マークダウンのまま保存するのがいいだろう。
画面にブログとして表示するときも、`markdwon取得 → markedでHTML変換 → 画面表示` としよう。
理由は下記。
- processmdとmarkedで生成されるHTMLが異なる可能性があるから、markedに一本化したいから。
- あと、編集時はmarkdownとして編集する必要があるから、mongoDBにはmarkddownとして保持しておきたいから。
