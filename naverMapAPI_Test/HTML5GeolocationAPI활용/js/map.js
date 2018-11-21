function initMap() { // 지도 생성
	map = new naver.maps.Map(document.getElementById('map'), {
		center: new naver.maps.LatLng(37.3595704, 127.105399),
		zoom: 8,
		minZoom: 1,
		zoomControl: true,
		zoomControlOptions: {
			position: naver.maps.Position.top_RIGHT
		}
	});
	console.log("지도 생성 성공");
  
 }

 
