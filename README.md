# vue_gglmap

##vue-cli インストール
```
# vue-cli をインストール
$ npm install --global vue-cli
# "webpack" ボイラープレートを使用した新しいプロジェクトを作成する
$ vue init webpack my-project
# 依存関係をインストールしてgo!
$ cd my-project
$ npm install
$ npm run dev
```

##プラグインインストール

###axios
```
$ npm install axios
```

###google-maps
```
$ npm install google-maps
```

## Build Setup

**npm run build** で生成したhtmlの外部ファイルのリンクが上手く行かないときは **config/index.js** の **assetsPublicPath** を見直す

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
