function initMap() { // 지도 생성
	var map = new naver.maps.Map(document.getElementById('map'), {
		center: new naver.maps.LatLng(37.3595704, 127.105399),
		zoom: 5,
	});
	console.log("지도 생성 성공");

	var jeju = new naver.maps.LatLng(33.3590628, 126.534361),
	    busan = new naver.maps.LatLng(35.1797865, 129.0750194), 
	    dokdo = new naver.maps.LatLngBounds(
	    			new naver.maps.LatLng(37.2380651, 131.8562652),
	    			new naver.maps.LatLng(37.2444436, 131.8786475)),							
	    seoul = new naver.maps.LatLngBounds(
	    			new naver.maps.LatLng(37.42829747263545, 126.76620435615891),
                	new naver.maps.LatLng(37.7010174173061, 127.18379493229875));
	
	$("#to-jeju").on("click", function(e) {
		e.preventDefault();
		console.log('제주도를 지도의 중심좌표로 설정합니다.');
		map.setCenter(jeju);
		$("#to-jeju").addClass("add");
	});

	$("#to-1").on("click", function(e) {
		e.preventDefault();
		console.log('줌레벨을 1로 설정합니다.');
		map.setZoom(1, true);
		$("#to-1").addClass("add");
	});

	$("#to-dokdo").on("click", function(e) {
		e.preventDefault();
		console.log('독도로 이동합니다.');
		map.fitBounds(dokdo);
		$("#to-dokdo").addClass("add");
	});

	$("#to-busan").on("click", function(e) {
		e.preventDefault();
		console.log('부산을 중심점으로 지도를 이동합니다.');
		map.panTo(busan);
		$("#to-busan").addClass("add");
	});

	$("#to-seoul").on("click", function(e) {
		e.preventDefault();
		console.log('서울 좌표 경계를 포함하는 위치로 부드럽게 이동합니다.');
		map.panToBounds(seoul);
		$("#to-seoul").addClass("add");
	});

	$("#panBy").on("click", function(e) {
		e.preventDefault();
		console.log('10, 10px씩 지도를 이동합니다.');
		map.panBy(new naver.maps.Point(10, 10));
		$("#panBy").addClass("add");
	});
 }
