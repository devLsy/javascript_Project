/*
* 속성 달력
*/

$(document).ready(function() {
  var dt = new Date();
});

function calcDate() { // 날짜 계산
  var inputVal = $("#stDt").val(); 
  console.log('사용자 입력값: ' + inputVal); 

  $("#r1").text(getDt1(inputVal));  // 기준월 첫째날
  $("#r2").text(getDt2(inputVal));  // 기준월 말일
  $("#r3").text(getDt3(inputVal));  // 이전달 첫째날
  $("#r4").text(getDt4(inputVal));  // 이전달 말일
  $("#r5").text(getDt5(inputVal));  // 다음달 첫째날
  $("#r6").text(getDt6(inputVal));  // 다음달 말일
}

function getDt1(dt) { // 기준월 첫째날
	var newDt = new Date(dt);
	newDt.setDate(1);
	return converDateString(newDt);
}

function getDt2(dt) { // 기준월 말일
	var newDt = new Date();
	newDt.setMonth(newDt.getMonth()+1);
	newDt.setDate(0);
	return converDateString(newDt);
}

function getDt3(dt) { // 이전달 첫째날
	
}

function getDt4(dt) { // 이전달 말일
	
}

function getDt5(dt) { // 다음달 첫째날
	
}

function getDt6(dt) { // 다음달 말일
	
}

function converDateString(dt) {
	return dt.getFullYear() + "-" + addZero(eval(dt.getMonth()+1)) + "-" + addZero(dt.getDate());				

}

function addZero(i) { // 앞자리에 0추가
  var rtn = i + 100;
  // console.log('rtn: ' + rtn);
  return rtn.toString().substring(1,3);
}