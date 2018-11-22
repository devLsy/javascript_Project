function initMap() { // 지도 생성
	map = new naver.maps.Map(document.getElementById('map'), {
		center: new naver.maps.LatLng(37.3614483, 127.1114883),
		zoom: 4,
    padding: {top:100},
    zoomControl:true,
    zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL
    }
	});
  console.log("지도 생성 성공");

  var contentEl = $('<div class="iw_inner" style="width:350px;position:absolute;top:0;right:0;z-index:1000;background-color:#fff;border:solid 1px #333;">'
    + '<h3>Map States</h3>'
    + '<p style="font-size:14px;">zoom : <em class="zoom">'+ map.getZoom() +'</em></p>'
    + '<p style="font-size:14px;">center : <em class="center">'+ map.getCenter() +'</em></p>'
    + '<p style="font-size:14px;">bounds : <em class="bounds">'+ map.getBounds() +'</em></p>'
    + '</div>');

  console.log(contentEl);

  contentEl.appendTo(map.getElement()); 

  naver.maps.Event.addListener(map, 'zoom_changed', function(zoom) {
            contentEl.find('.zoom').text(zoom);
            console.log('zoom 변경됨');
  });

  naver.maps.Event.addListener(map, 'bounds_changed', function(bounds) {
            contentEl.find('.center').text(map.getCenter()); // 중심
            console.log('center 변경됨');
            contentEl.find('.bounds').text(bounds); // bounds
            console.log('bounds 변경됨');
  });
}

 
