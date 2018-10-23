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
		*$clear: 영역 초기화 버튼 노드
		*$makedArea: 로또번호 동적으로 생성될 영역
		*$comment: comment
		*lottoNumber: 로또번호 배열
		*result: 로또번호 배열에 담은 결과값
		*/

		// Class 및 properties 생성 및 function 호출
		function Lotto() {
			this.$make = null;	
			this.$clear = null;	
			this.$makedArea = null;
			this.$comment = null;
			this.lottoNumber = 0;
			this.result = 0;
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
			// 로또 출력
			this.$make.click(function() {
				//objThis.makeLotto();
				objThis.displayLotto();
					
			});
			
			// 영역 초기화
			this.$clear.click(function() {	
				objThis.clearLottoArea();
					
			});
		}

		// 사용자가 입력한 개수 받아와서 루프 돌려서 출력
		Lotto.prototype.displayLotto = function() {
			var $input = $("#input").val();
			$input = parseInt($input) + 1;

			for(var i=1; i<$input; i++) {
				this.$makedArea.append("<p>" + i +"번 째 로또 번호는 " + "[ " + this.makeLotto()+ " ]" + "입니다." + "</p>");
			}
			this.$comment.html("Good Luck to You");
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
			return result;

			// 로또번호 console 출력
			console.log("result = " + result);
			this.$comment.html("Good Luck to You");
			//this.scrollMove();
		}

		// 스크롤 처리()	구현 예정	
		/*Lotto.prototype.scrollMove = function() {
		
		}*/
		
		// 번호 영역 초기화
		Lotto.prototype.clearLottoArea = function() {
			alert("번호를 초기화 합니다.");
			this.$makedArea.html("");
			$("#input").val("");
		}

