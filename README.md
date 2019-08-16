# myVue.jsGoogleMap
https://gurigura0052.github.io/myVue.jsGoogleMap

## 概要

## プラグインインストール
### axios
```
$ npm install --save axios
```
https://www.npmjs.com/package/axios

### google-maps
```
$ npm install --save google-maps
```
https://www.npmjs.com/package/google-maps

### jQuey
```
$ npm install --save jquery
```

## Mapコンポーネント
src/components//Map.vue
```html
<div v-else id="gglMap"></div>
```

```javascript
request: {
  url: '/json/map_marker.json', // マーカーデータの場所
  mapData: {
    ID: 'gglMap', // mapを表示させる場所
    center: {
      // マップのデフォルト中心座標
      lat: 35.6954806,
      lng: 139.76325010000005
    },
    zoom: 15, // マップの倍率
    scrollWheel: false // ホイールスクロールを無効にする
  }
},
```
グーグルマップで必要な設定をrequest内に入れておきます。
マーカーデータのjsonはpublic以下に置きます。
ホイールスクロールはデフォルトで有効になっているので、無効にするために設定します。

```javascript
const response = await axios.get(request.url)
  .catch(() => status = 'error') // 失敗した時の処理
```
axiosでjsonデータを取ってきます。

```javascript
await GoogleMapsLoader.load(function(google) {
  const map = new google.maps.Map(
    document.getElementById(request.mapData.ID),
    {
      zoom: request.mapData.zoom,
      center: request.mapData.center,
      scrollwheel: request.mapData.scrollWheel
    }
  )
```
プラグイン「google-maps」を使い、マップの初期設定をします。

```javascript
for (let i in markerData) {
  LatLng[i] = new google.maps.LatLng(
    markerData[i]['lat'],
    markerData[i]['lng']
  ) // 各マーカーの座標を取得

  marker[i] = new google.maps.Marker({
    position: LatLng[i],
    map: map
  })

  // 情報ウィンドウ
  contentString[i] = `<div>${markerData[i]['text']}</div>` // 情報ウィンドウ内のhtml

  infowindow[i] = new google.maps.InfoWindow({
    content: contentString[i]
  })

  markerEvent(i)
}
```
マーカー毎の設定をします。

```javascript
function markerEvent(i) {
  marker[i].addListener('click', function() {
    $(infowindow).each(function(i){
      infowindow[i].close() // マーカーをクリックする度に全部のウィンドウを閉じる
    })
    infowindow[i].open(map, marker[i]) // クリックしたマーカーのウィンドウを開く
  })
}
```
マーカークリック時の挙動を設定します。

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


