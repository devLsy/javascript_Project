// simpleLottoMaker prototype방식

// jQuery plugin
(function($) {
	$.fn.lottoMake = function() {
		this.each(function(index) {
			// 인스턴스 생성
			var lotto = new Lotto();
			console.log("$.fn.lottoMake plugin 호출 완료!");
		});
		return this;
	}
})(jQuery);
// jQuery plugin 구문 종료

		/*
		*@properties
		*$make: 번호생성 버튼 노드
		*$reset: 입력, 출력 영역 초기화 버튼 노드
		*$makedArea: 로또번호 동적으로 생성될 영역 노드
		*$input: 번호 입력 받는 영역 노드
		*$comment: comment 노드
		*currentIndex: 이미지 인덱스
		*lottoNumber: 로또번호 배열
		*result: 로또번호 배열에 담은 결과값		
		*$banners: 이미지 배너 노드
		*$bannerLength: 이미지 갯수
		*time: 실시간 시계 표시할 노드
		*/

		// Class 및 properties 생성 및 function 호출
		function Lotto() {
			this.$make = null;	
			this.$reset = null;	
			this.$makedArea = null;
			this.$input = null;
			this.$comment = null;
			this.currentIndex = 0;
			this.lottoNumber = 0;
			this.timerID = -1;
			this.$time = null;
			this.result = 0;
			this.$banners = null;
			this.$bannerLength = null;

			this.init(); 			// 요소 초기화
			this.initBannerPos();	// 배너 위치 초기화
			this.startAutoPlay();	// 타이머 시작
			this.showTime();		// 실시간 시계 출력
			this.initEvent();		// 이벤트 초기화
		}	

		// 요소 초기화
		Lotto.prototype.init = function() {
			this.$make = $("#make");	// 로또 생성 버튼 노드
			this.$reset = $("#reset");	// 리셋 버튼 노드
			this.$input = $("#input");	// 입력 값 영역
			this.$makedArea = $(".makedArea");	// 동적으로 로또번호 생성되는 영역
			this.$comment = $(".comment");		// comment 영역
			this.$banners = $("#banner1 img");	// 이미지를 감싸고 있는 div id 노드
			this.$bannerLength = this.$banners.length;	// 이미지 갯수
			this.$time = $(".time");	// 실시간 시계 표시할 노드
		}

		// 배너 위치 초기화
		Lotto.prototype.initBannerPos = function() {
			// 배너 위치 화면에서 안보이게 오른쪽으로 숨기기
			this.$banners.css({left:400});
			// 0번 째 배너 활성화
			this.$banners.eq(this.currentIndex).css({left:0});
		}

		// 타이머 롤링 시작
		Lotto.prototype.startAutoPlay = function() {
			var objThis = this;
			// 타이머 2번 실행 방지
			if(this.timerID == -1) {
				this.timerID = setInterval(function() {
					objThis.nextBanner();
				}, 2000);			
			}
		}	

		// 실시간 시계 표시
		Lotto.prototype.showTime = function() {
			var objThis = this;
	    	
	    	var objDate = new Date();
	    	var calendar = objDate.getFullYear() + "-" + addZero(objDate.getMonth()+1) + "-" + addZero(objDate.getDate());	// 년월일
	    	var amPm = '<span style = "color:#0100FF;">' + "AM" + '</span>';		// 초기값 AM
            var hours = addZero(objDate.getHours());								// 시
            var minutes = addZero(objDate.getMinutes());							// 분
            var seconds = addZero(objDate.getSeconds());							// 초

            if(hours >= 12) {	// 시간이 12보다 클 때 PM으로 설정, 12를 빼줌
            	amPm = '<span style = "color:#5CD1E5;">' + "PM" + '</span>';
            	hours = addZero(hours - 12);
            }

            // 옵션 기능(초가 50이상일 때 색상 변환)
            if(seconds >= 50) {
            	seconds = '<span style = "color:#de1951;">' + seconds + '</span>'
            }

            var fullTime = calendar + "&nbsp;"+ hours + ":" + minutes + ":" + seconds + "&nbsp;" + amPm;	// 년월일 포함 시간
            console.log("fullTime: " + fullTime);
            // 실시간 시계영역에 전체시간 표시
            this.$time.html("currentTime: " + fullTime);

            	// 숫자 값을 00 문자로 변환
                function addZero(value) {	
                    //10보다 작은 경우에만 00 문자로 변환
                    if (value < 10) {
                        value = "0" + value;
                    }
                    return value;
                }	
                // 0.5초마다 시간 출력
                setTimeout(function() {objThis.showTime();}, 1000);
		}
		// 타이머 중지	
		Lotto.prototype.stopAutoPlay = function() {
			clearInterval(this.timerID);
			// 재시작 하기 위해 타이머ID 초기화
			this.timerID = -1;
		}	

		// 이벤트 초기화
		Lotto.prototype.initEvent = function() {
			var objThis = this;
			// validation check
			objThis.validateClick();
			// 로또 출력
			this.$make.click(function() {
				objThis.displayLotto();
				objThis.$comment.html("Good Luck to You(images source: google)");
			});

			// mouseenter시 타이머 롤링 중지
			this.$banners.mouseenter(function() {
				console.log("mouseenter → stopAutoPlay()");
				objThis.stopAutoPlay();
			});

			// mouseleave시 타이머 재시작
			this.$banners.mouseleave(function() {	
				console.log("mouseleave → startAutoPlay()");
				objThis.startAutoPlay();	
			});
				
			// 로또 번호 영역 초기화
			this.$reset.click(function() {	
				objThis.resetLottoArea();
			});	
		}

		// 사용자가 입력한 개수 받아와서 루프 돌려서 출력	
		Lotto.prototype.displayLotto = function() {
			var $input = $("#input").val();

			$input = parseInt($input) + 1;
			// 숫자만 입력 validation
			for(var i=1; i<$input; i++) {
				this.$makedArea.append("<p>" + i +"번 째 로또 번호는 " + "[ " + this.makeLotto()+ " ]" + "입니다." + "</p>");
			}	
		}

		// 빈값 입력 체크	
		Lotto.prototype.validateClick = function() {
			this.$make.click(function() {
				var inputValue = $("#input").val();

				if(inputValue == "" || inputValue == null) {
					alert("Number is a required input value.");
					return false;
				}
			});
			// 한글, 영문 입력 제한 체크
			this.validateKeyup();	
		}		

		// 숫자만 입력 validation
		Lotto.prototype.validateKeyup = function() {
			this.$input.on("keyup", function() {
				var inputValue = $(this).val();
				// 한글, 영문, 특수문자 패턴
				var regText = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣a-zA-Z|~!@#$%^&*()_+|<>?:{}/.,'\']/;
				// 입력값에 regText값이 포함되었는지 체크
				if(regText.test(inputValue)) {
					// 숫자만 입력 해주세요.
					alert("Please enter only the number.");
					$(this).val("");

				} else {	
					return;	
				}
			});
		}	

		// 로또 생성
		Lotto.prototype.makeLotto = function() {
			this.lottoNumber = new Array(6);
			for(var i=0; i<=5; i++) {
				this.lottoNumber[i] = Math.floor(Math.random()*45) +1;
				// 중복번호 제거
				for(var j=0; j<i; j++) {
					if(this.lottoNumber[i] == this.lottoNumber[j]) {
						i--;
						break;
					}
				}
			}
			// 오름차순 정렬
			result = this.lottoNumber.sort(function(a, b) {
					return a - b;
			});
			// 로또번호 console 출력
			console.log("lottoNumber = " + result);
			return result;
			this.$comment.html("Good Luck to You");
		}

		// 번호 영역, 출력 영역 초기화
		Lotto.prototype.resetLottoArea = function() {
			alert("Initialize the number.");
			this.$comment.html("Please draw the lottoNumber of this week.");
			this.$makedArea.html("");
			$("#input").val("");
		}

		// 타이머 중지
		Lotto.prototype.stopImage = function() {
			clearInterval(this.timerID);
		}

		// 다음 배너 활성화
		Lotto.prototype.nextBanner = function() {	

			// 현재 인덱스 값 	
			var currentIndex = this.currentIndex;
			this.currentIndex++;
			// 마지막 배너까지 롤링 한 경우 인덱스를 0번지로 초기화
			if(this.currentIndex >= this.$bannerLength) {
				this.currentIndex = 0;				
			}

			// 현재 배너 
			var $currentBanner = this.$banners.eq(currentIndex);
			// 다음 배너
			var $nextBanner = this.$banners.eq(this.currentIndex);
			// 다음 배너 위치 초기화
			$nextBanner.css({left:200, opacity:0});
			// 현재 배너 숨김
			$currentBanner.stop().animate({left:-200, opacity:0}, 500, "easeInCubic");
			// 다음 배너 활성화
			$nextBanner.stop().animate({left:0, opacity:1}, 500, "easeInCubic");
		}



		


