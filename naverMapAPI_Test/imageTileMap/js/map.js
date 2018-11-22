function initMap() { // 지도 생성
  map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(37.3595704, 127.10539),
    zoom: 10,
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: naver.maps.MapTypeControlStyle.DROPDOWN
    }
  });
  console.log("지도 생성 성공");

  var openStreetMapType  = new naver.maps.ImageMapType({
    name: 'OSM',
    minZoom: 0,
    maxZoom: 19,
    tileSize: new naver.maps.Size(256, 256),
    projection: naver.maps.EPSG3857,
    repeatX: true,
    tileSet: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
    provider: [{
        title: " /OpenStreetMap",
        link: "http://www.openstreetmap.org/copyright"      
    }]
  });
  console.log('osm map 생성 성공');
  // 맵타입 설정
  map.mapTypes.set('osm', openStreetMapType);
  map.setMapTypeId('osm');
 }

 
