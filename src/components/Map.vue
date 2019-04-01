<template>
  <div id="gglMap"></div>
</template>

<script>
import GoogleMapsLoader from "google-maps";

export default {
  name: "gglMap",
  data() {
    return {
      request: {
        url: "./json/map_marker.json", // マーカーデータの場所
        mapData: {
          ID: "gglMap", // mapを表示させる場所
          center: {
            // マップのデフォルト中心座標
            lat: 35.6954806,
            lng: 139.76325010000005
          },
          zoom: 15, // マップの倍率
          scrollWheel: false // ホイールスクロールを無効にする
        }
      },
      status: ""
    };
  },

  created: function() {
    this.gglMap();
  },

  methods: {
    gglMap: function() {
      var _this = this;

      axios
        .get(_this.request.url)
        .then(function(response) {
          _this.status = "success";

          GoogleMapsLoader.load(function(google) {
            var map = new google.maps.Map(
              document.getElementById(_this.request.mapData.ID),
              {
                zoom: _this.request.mapData.zoom,
                center: _this.request.mapData.center,
                scrollwheel: _this.request.mapData.scrollWheel
              }
            );

            var markerData = response.data.marker; // マーカーデータをmarkerDataに入れる

            // マーカー毎の処理
            var LatLng = [];
            var marker = [];
            var contentString = [];
            var infowindow = [];

            for (var i = 0; i < markerData.length; i++) {
              LatLng[i] = new google.maps.LatLng(
                markerData[i]["lat"],
                markerData[i]["lng"]
              ); // 各マーカーの座標を取得

              marker[i] = new google.maps.Marker({
                position: LatLng[i],
                map: map
              });

              // 情報ウィンドウ
              contentString[i] = "<div>" + markerData[i]["text"] + "</div>"; // 情報ウィンドウ内のhtml

              infowindow[i] = new google.maps.InfoWindow({
                content: contentString[i]
              });

              markerEvent(i);
            }

            function markerEvent(i) {
              marker[i].addListener("click", function() {
                $(infowindow).each(function(i){
                  infowindow[i].close(); // マーカーをクリックする度に全部のウィンドウを閉じる
                })
                infowindow[i].open(map, marker[i]); // クリックしたマーカーのウィンドウを開く
              });
            }
          });
        })

        .catch(function() {
          _this.status = "error"; // map_marker.jsのデータを取り出せなかった時の処理
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#gglMap {
  margin: auto;
  height: 300px;
  width: 500px;
}
</style>
