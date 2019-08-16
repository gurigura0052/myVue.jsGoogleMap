<template>
  <div>
    <div v-if="status == 'error'">{{status}}</div>
    <div v-else id="gglMap"></div>
  </div>
</template>

<script>
import GoogleMapsLoader from 'google-maps'

export default {
  name: 'gglMap',
  data() {
    return {
      request: {
        url: './json/map_marker.json', // マーカーデータの場所
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
      status: ''
    }
  },

  created: function() {
    this.gglMap()
  },

  methods: {
    async gglMap() {
      const request = this.request
      let status = this.status

      const response = await axios.get(request.url)
        .catch(() => status = 'error') // 失敗した時の処理
        
      if( status != 'error' ){ // 成功した時の処理
        status = 'success'

        await GoogleMapsLoader.load(function(google) {
          const map = new google.maps.Map(
            document.getElementById(request.mapData.ID),
            {
              zoom: request.mapData.zoom,
              center: request.mapData.center,
              scrollwheel: request.mapData.scrollWheel
            }
          )

          const markerData = response.data.marker // マーカーデータをmarkerDataに入れる

          // マーカー毎の処理
          let LatLng = []
          let marker = []
          let contentString = []
          let infowindow = []

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

          function markerEvent(i) {
            marker[i].addListener('click', function() {
              $(infowindow).each(function(i){
                infowindow[i].close() // マーカーをクリックする度に全部のウィンドウを閉じる
              })
              infowindow[i].open(map, marker[i]) // クリックしたマーカーのウィンドウを開く
            })
          }
        })
      }

      this.status = status
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#gglMap {
  margin: auto;
  height: 300px;
  width: 500px;
}
</style>
