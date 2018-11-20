/*
* 속성으로 만든 날짜 계산
*/
var $calc = null;  // 날짜계산 버튼
var $reset = null; // 입력영역 초기화 버튼
var $stDt = null;  // 입력영역

$(document).ready(function() {
	init();
	getNowDate(); // 현재시간을 기준일자로 할 경우(기준일자를 현재시간으로 안 할 경우 주석처리할 것)
	initEvent();
});
// 요소 초기화
function init() { 
  $calc = $(".calc");
  $reset = $(".reset");	
  $stDt = $(".stDt");

}
// 이벤트 초기화
function initEvent() { 
  $calc.click(function() { // 날짜 계산
  	calcDate();
  });

  $reset.click(function() { // 입력 영역 초기화
  	clearInput();
  });
}
// 현재시간을 기준일로 설정
function getNowDate() { 
	var nowDt = new Date();
	// console.log(nowDt);
	$stDt.val(converDateString(nowDt));
}
// 입력값 유효성 check
function inputValidation($inputVal) { 
	if($inputVal == "" || $inputVal == null) {
		alert("날짜를 입력 해주세요.");
		return false;
	}
}
// 날짜 계산한 값을 입력
function calcDate() { 
  var inputDt = $(".stDt").val(); 
  // console.log('사용자 입력값: ' + inputDt); 	

  $("#r1").text(getNowDateFirstDate(inputDt));  // 기준월 첫째날
  $("#r2").text(getNowDateLastDate(inputDt));  // 기준월 말일
  $("#r3").text(prevMonthFirstDate(inputDt));  // 이전달 첫째날
  $("#r4").text(prevMonthLastDate(inputDt));  // 이전달 말일
  $("#r5").text(nextMonthFirstDate(inputDt));  // 다음달 첫째날
  $("#r6").text(nextMonthLastDate(inputDt));  // 다음달 말일
}
// 기준월 첫째날
function getNowDateFirstDate(dt) { 
	var newDt = new Date(dt);
	newDt.setDate(1);
	// console.log('기준월 첫째날: ' + newDt);
	return converDateString(newDt);
}
// 기준월 말일	
function getNowDateLastDate(dt) { 
	var newDt = new Date(dt);
	newDt.setMonth(newDt.getMonth()+1);
	// console.log('getLastDate() - newDt: ' + newDt);
	newDt.setDate(0);
	// console.log('getLastDate() - newDt: ' + newDt);
	return converDateString(newDt);
}
// 이전달 첫째날
function prevMonthFirstDate(dt) { 
	var newDt = new Date(dt);
	newDt.setMonth(newDt.getMonth()-1);
	newDt.setDate(1);
	return converDateString(newDt);
}
// 이전달 말일
function prevMonthLastDate(dt) { 
	var newDt = new Date(dt);
	newDt.setMonth(newDt.getMonth());
	newDt.setDate(0);
	return converDateString(newDt);
}
// 다음달 첫째날
function nextMonthFirstDate(dt) { 
	var newDt = new Date(dt);
	newDt.setMonth(newDt.getMonth()+1);
	newDt.setDate(1);
	return converDateString(newDt);	
}
// 다음달 말일
function nextMonthLastDate(dt) { 
	var newDt = new Date(dt);
	newDt.setMonth(newDt.getMonth()+2);
	console.log('다음달 말일: ' + newDt.toString());
	newDt.setDate(0);
	return converDateString(newDt);	
}
// parameter값으로 전달받은 값에 년, 월 ,일 추가
function converDateString(dt) { 
	return dt.getFullYear() + "-" + addZero(eval(dt.getMonth()+1)) + "-" + addZero(dt.getDate());
	console.log(dt.toString());
}
	
function addZero(i) { // 날짜 - 앞자리에 0추가 (ex: 1월1일 -> 01월01일)
 	var rtn = i + 100;
 	return rtn.toString().substring(1,3);
 	console.log('addZero()의 rtn: ' + rtn);
}

function clearInput() { // 입력 영역 초기화
  $(".stDt").val("");
}		