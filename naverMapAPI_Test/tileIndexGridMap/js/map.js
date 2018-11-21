function initMap() { // 지도 생성
  map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    zoom: 10,
    mapTypeControl: true,
    zoomControl: true,
    mapTypeControlOptions: {
        style: naver.maps.MapTypeControlStyle.DROPDOWN
    }
  });
  console.log("지도 생성 성공");

  var tileGridLayer = new naver.maps.Layer('tileGrid', {
      name: 'TileGrid',
      minZoom: -1,
      maxZoom: 14,
      tileSize: new naver.maps.Size(256, 256),
      getTile: function(x, y, z) {
          var div = $('<div class="tilegrid">(' + [z, x, y].join(',')+')</div>');

          return div[0];
      }
  });
  tileGridLayer.setMap(map);  
 }

 
