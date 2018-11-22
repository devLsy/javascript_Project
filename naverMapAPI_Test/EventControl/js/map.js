function initMap() { // 지도 생성
	map = new naver.maps.Map(document.getElementById('map'), {
		center: new naver.maps.LatLng(37.3614483, 127.1114883),
		zoom: 4,
	});
  console.log("지도 생성 성공");

  var markerList = [];
  var menuLayer = $('<div style="position:absolute;z-index:10000;background-color:#fff;border:solid 1px #333;padding:10px;display:none;"></div>');
  map.getPanes().floatPane.appendChild(menuLayer[0]);
  // console.log(menuLayer[0]);

  naver.maps.Event.addListener(map, 'click', function(e) {
      var marker = new naver.maps.Marker({
            position: e.coord, // 이벤트 발생한 위치
            map: map
        });

      markerList.push(marker);
      console.log('마커생성');
  });

  naver.maps.Event.addListener(map, 'keydown', function(e) {
      var keyboardEvent = e.keyboardEvent,
          keyCode = keyboardEvent.keyCode || keyboardEvent.which;

      var ESC = 27;
      // 키코드가 ESC이면 markerList 배열의 값을 null로 설정
      if(keyCode === ESC) {
          console.log('keyCode: ' + keyCode);
          keyboardEvent.preventDefault();

          for(var i=0, ii=markerList.length; i<ii; i++) {
                markerList[i].setMap(null);
          }

          markerList = []; // 새 배열 생성

          menuLayer.hide();
      }
  });

  naver.maps.Event.addListener(map, 'mousedown', function(e) {
        console.log('mousedown');
        menuLayer.hide();
  });

  naver.maps.Event.addListener(map, 'rightclick', function(e) {
        // console.log('우 클릭');
        var coordHtml  = 
              'Coord: ' + '(우 클릭 지점 위/경도 좌표)' + '<br />' + 
              'Point: ' + e.point + '<br />' + 
              'Offset: ' + e.offset;

        menuLayer.show().css({
            left: e.offset.x,
            top: e.offset.y
        }).html(coordHtml);
        console.log('Coord: ' + e.coord.toString());
  });
}

 
