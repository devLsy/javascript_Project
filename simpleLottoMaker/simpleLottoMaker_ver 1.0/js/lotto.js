//jQuery 플러그인(구현 예정)

// (function($) {
// 	$.fn.lottomake = function() {
// 		this.each(function(index) {

// 		});
// 		return this;
// 	}
// })(jQuery);

		/*
		*@properties
		*$make: 번호생성 버튼 노드
		*$autoMake: 자동 번호생성 버튼 노드
		*$stop: 생성중단 버튼 노드
		*$clear: 영역 초기화 버튼 노드
		*$makedArea: 로또번호 동적으로 생성될 영역
		*$comment: comment
		*lottoNumber: 로또번호 배열
		*result: 로또번호 배열에 담은 결과값
		*timerID: 타이머 변수
		*/

		// Class 및 properties 생성 및 function 호출
		function Lotto() {
			this.$make = null;	
			this.$autoMake = null;	
			this.$stop = null;	
			this.$clear = null;	
			this.$makedArea = null;
			this.$comment = null;
			this.lottoNumber = 0;
			this.result = 0;
			this.timerID = 0;
			this.init();
			this.initEvent();
		}

		// 초기화
		Lotto.prototype.init = function() {
			this.$make = $("#make");
			this.$autoMake = $("#autoMake");
			this.$stop = $("#stop");	
			this.$clear = $("#clear");
			this.$makedArea = $(".makedArea");
			this.$comment = $(".comment");
		}

		// 클릭 이벤트 리스너
		Lotto.prototype.initEvent = function() {
			var objThis = this;
			// 수동 로또 생성
			this.$make.click(function() {
				objThis.makeLotto();
					
			});
			// 자동 로또 생성 
			this.$autoMake.click(function() {
				objThis.timerLotto();
					
			});
			// 타이머 중단
			this.$stop.click(function() {
				objThis.stopTimerLotto();
					
			});
			// 영역 초기화
			this.$clear.click(function() {	
				objThis.clearLottoArea();
					
			});
		}
		// 로또 생성 및 화면에 출력
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
			this.$makedArea.append("<p>lottoNumber = " + "[ " + result + " ]" + "</p>");
			// 로또번호 console 출력
			console.log("result = " + result);
			this.$comment.html("Good Luck to You");
			//this.scrollMove();
		}

		// 스크롤 처리()	구현 예정	
		/*Lotto.prototype.scrollMove = function() {
		
		}*/
		// 타이머(1초) 로또 생성 시작
		Lotto.prototype.timerLotto = function() {
			var objThis = this;

			// 타이머 수정하려면 2번 째 parameter를 수정 (ex: 1000 -> 500)
			this.timerID = setInterval(function() {
				objThis.makeLotto();
			}, 500);
		}
		// 타이머 중단
		Lotto.prototype.stopTimerLotto = function() {
			alert("타이머를 중단합니다.");
			clearInterval(this.timerID);
		}
		// 번호 영역 초기화
		Lotto.prototype.clearLottoArea = function() {
			alert("번호를 초기화 합니다.");
			this.$makedArea.html("");
		}

