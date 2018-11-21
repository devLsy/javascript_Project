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
  // 지도 옵션 설정 시작
	map.setOptions("mapTypeControl", true);
  // 지도 인터랙션 옵션
  $("#interaction").on("click", function(e) {
  	e.preventDefault();
  	if(map.getOptions("draggable")) {
  		console.log("지도 인터랙션 옵션 끔");
  		map.setOptions({
  			draggable: false,
  			pinchZoom: false,
  			scrollWheel: false,
  			keyboardDoubleTapZoom: true,
  			disableDoubleTapZoom: true,
  			disableDoubleClickZoom: true,
  			disableTwoFingerTapZoom: true
  		});

  		$(this).removeClass("control-on, add");
  	} else {
  		console.log("지도 인터랙션 옵션 킴");
  		map.setOptions({
  			draggable: true,
  			pinchZoom: true,
  			scrollWheel: true,
  			keyboardDoubleTapZoom: true,
  			disableDoubleTapZoom: false,
  			disableDoubleClickZoom: false,
  			disableTwoFingerTapZoom: false
  		});

  		$(this).addClass("control-on, add");
  	}
  });
  // 관성 드래깅 옵션
  $("#kinetic").on("click", function(e) {
  	e.preventDefault();

  	if(map.getOptions("disableKineticPan")) {
  		console.log("관성 드래깅 옵션 실행");
  		map.setOptions("disableKineticPan", false);
  		$(this).addClass("control-on, add");
  	} else {
  		console.log("관성 드래깅 옵션 끔");
  		map.setOptions("disableKineticPan", true);
  		$(this).removeClass("control-on, add");
  	}
  });
  // 타일 fadeIn 효과
  $("#tile-transition").on("click", function(e) {
  	e.preventDefault();
  	if(map.getOptions("tileTransition")) {
  		map.setOptions("tileTransition", false);
  		console.log("타일 fadeIn 효과 끔");

  		$(this).removeClass("control-on, add");
  	} else {
  		map.setOptions("tileTransition", true); 
		console.log("타일 fadeIn 효과 킴");  			
		$(this).addClass("control-on, add");
  	}
  });

  // 모든 지도 컨트롤
  $("#controls").on("click", function(e) {
  	e.preventDefault();

  	if(map.getOptions("scaleControl")) {
  		console.log("모든 지도 컨트롤을 숨깁니다.");
  		map.setOptions({ // 모든 제도 컨트롤 숨기기
  			scaleControl: false,
            logoControl: false,
            mapDataControl: false,
            zoomControl: false,
            mapTypeControl: false
  		});
  		$(this).removeClass("control-on, add");
  	} else {
  		console.log("모든 지도 컨트롤을 표시합니다.");
  		map.setOptions({ //모든 지도 컨트롤 보이기
            scaleControl: true,
            logoControl: true,
            mapDataControl: true,
            zoomControl: true,
            mapTypeControl: true
        });
        $(this).addClass("control-on, add");
  	 }
  });

  $("#min-max-zoom").on("click", function(e) {
  	e.preventDefault();

  	if(map.getOptions("minZoom") === 10) {
  		console.log("최소/최대 줌 레벨을 1 ~ 14로 설정");
  		map.setOptions({
  			minZoom: 1,
  			maxZoom: 14
  		});
  		$(this).val(this.name + ': 1 ~ 14');
  	  } else {
  	  	console.log("최소/최대 줌 레벨을 10 ~ 12로 설정");
  	  	map.setOptions({
  	  		minZoom: 10,
  	  		maxZoom: 12
  	  	});
  	  	$(this).val(this.name + ': 10 ~ 12');
  	  }
  });
  // 시작시 해당 컨트롤 활성화
  $("#interaction, #tile-transition, #controls").addClass("control-on, add");
 }
 // 지도 옵션 설정 종료

 
