var $calc1 = null;   // 화면 윗부분 날짜계산 버튼 
var $nowDate = null; // 화면 윗부분 현재시간 버튼

var $calc2 = null;   // 화면 아랫부분 ~달 후 첫째날 계산버튼
var $calc3 = null;   // 화면 아랫부분 ~달 후 말일 계산버튼
var $calc4 = null;   // 화면 아랫부분 ~일 전 일자 계산버튼
var $calc5 = null;   // 화면 아랫부분 ~일 후 일자 계산버튼

var $reset = null; // 초기화 버튼
var $stDt = null; // 기준일자 입력 영역

var $il1 = null;  // 기준월의 ~달 후 첫째날 입력 영역 
var $il2 = null;  // 기준월의 ~달 후 말일 입력 영역 
var $il3 = null;  // 기준월의 ~일 전 일자 입력 영역
var $il4 = null;  // 기준월의 ~일 후 일자 입력 영역

$(document).ready(function() {
    init(); 
    initEvent() 
});
// 요소 초기화
function init() {
    $calc1 = $(".calc1");
    $calc2 = $(".calc2");
    $calc3 = $(".calc3");
    $calc4 = $(".calc4");
    $calc5 = $(".calc5");
    $calc6 = $(".calc6");
    $reset = $(".reset");
    $stDt = $(".stDt");
    $nowDate = $(".nowDate");
    $il1 = $(".il1");
    $il2 = $(".il2");
    $il3 = $(".il3");
    $il4 = $(".il4");
    $il5 = $(".il5")
};
// 이벤트 초기화(클릭 이벤트)
function initEvent() {
    $calc1.click(function() { // 화면 윗부분 연산
        calc1Date()
    });
    $calc2.click(function() { // 화면 아랫부분 연산
        calc2Date()
    });
    $calc3.click(function() {
        calc3Date()
    });
    $calc4.click(function() {
        calc4Date()
    });
    $calc5.click(function() {
        calc5Date()
    });
    $nowDate.click(function() {
        getNowDate()
    });
    $reset.click(function() {
        clearInput();
        $(".stDt").focus()
    })
};
// 현재시간 가져오기
function getNowDate() {
    var nowDt = new Date();
    $stDt.val(converDateString(nowDt))
};
// 화면 윗부분 날짜 연산
function calc1Date() {
    var inputDt = $(".stDt").val(); // 기준일 입력 값
    $("#r1").text(getNowDateFirstDate(inputDt)); // 기준일 기준 첫째날
    $("#r2").text(getNowDateLastDate(inputDt));  // 기준일 기준 말일
    $("#r3").text(prevMonthFirstDate(inputDt));  // 기준일 기준 이전달의 첫째날
    $("#r4").text(prevMonthLastDate(inputDt));   // 기준일 기준 이전달의 말일
    $("#r5").text(nextMonthFirstDate(inputDt));  // 기준일 기준 다음달의 첫째날
    $("#r6").text(nextMonthLastDate(inputDt))    // 기준일 기준 다음달의 말일
};
// 화면 아랫부분 날짜 연산(~달 후의 첫째날)
function calc2Date() {
    var inputDt = $(".stDt").val();
    var inputDa = $(".il1").val();
    $("#r7").text(monthsLaterfirstDate(inputDt, parseInt(inputDa)))
};
// 화면 아랫부분 날짜 연산(~달 후의 말일)
function calc3Date() {
    var inputDt = $(".stDt").val();
    var inputDa = $(".il2").val();
    $("#r8").text(monthsLaterLastDate(inputDt, parseInt(inputDa) + 1))
};
// 화면 아랫부분 날짜 연산(~일 전 일자)
function calc4Date() {
    var inputDt = $(".stDt").val();
    var inputDa = $(".il3").val();
    $("#r9").text(afewDaysAgo(inputDt, parseInt(inputDa)))
};
// 화면 아랫부분 날짜 연산(~일 후 일자)
function calc5Date() {
    var inputDt = $(".stDt").val();
    var inputDa = $(".il4").val();
    $("#r10").text(afewDaysLater(inputDt, parseInt(inputDa)))
};
// 기준일 기준 첫째날
function getNowDateFirstDate(dt) {
    var newDt = new Date(dt);
    newDt.setDate(1);
    return converDateString(newDt)
};
// 기준일 기준 말일
function getNowDateLastDate(dt) {
    var newDt = new Date(dt);
    newDt.setMonth(newDt.getMonth() + 1);
    newDt.setDate(0);
    return converDateString(newDt)
};
// 기준일 기준 이전달의 첫째날
function prevMonthFirstDate(dt) {
    var newDt = new Date(dt);
    newDt.setMonth(newDt.getMonth() - 1);
    newDt.setDate(1);
    return converDateString(newDt)
};
// 기준일 기준 이전달의 말일
function prevMonthLastDate(dt) {
    var newDt = new Date(dt);
    newDt.setMonth(newDt.getMonth());
    newDt.setDate(0);
    return converDateString(newDt)
};
// 기준일 기준 다음달의 첫째날
function nextMonthFirstDate(dt) {
    var newDt = new Date(dt);
    newDt.setMonth(newDt.getMonth() + 1);
    newDt.setDate(1);
    return converDateString(newDt)
};
// 기준일 기준 다음달의 말일
function nextMonthLastDate(dt) {
    var newDt = new Date(dt);
    newDt.setMonth(newDt.getMonth() + 2);
    newDt.setDate(0);
    return converDateString(newDt)
};
// 기준일 기준 n달 후 첫째날
function monthsLaterfirstDate(dt, i) {
    var newDt = new Date(dt);
    newDt.setMonth(newDt.getMonth() + i);
    newDt.setDate(1);
    return converDateString(newDt)
};
// 기준일 기준 n달 후 말일
function monthsLaterLastDate(dt, i) {
    var newDt = new Date(dt);
    newDt.setMonth(newDt.getMonth() + i);
    newDt.setDate(0);
    return converDateString(newDt)
};
// 기준일 기준 n달 전 일자
function afewDaysAgo(dt, i) {
    var newDt = new Date(dt);
    newDt.setDate(newDt.getDate() - i);
    return converDateString(newDt)
};
// 기준일 기준 n달 후 일자
function afewDaysLater(dt, i) {
    var newDt = new Date(dt);
    newDt.setDate(newDt.getDate() + i);
    return converDateString(newDt)
};
// 입력받은 날짜 파싱(년, 월, 일)
function converDateString(dt) {
    return dt.getFullYear() + "-" + addZero(eval(dt.getMonth() + 1)) + "-" + addZero(dt.getDate())
};
/*
* 날짜 앞자리에 0추가 (ex: 2018-1-1 -> 2018-01-01)
* @param i: 입력받은 데이터 중 월, 일 값
*/
function addZero(i) {
    var rtn = i + 100;
    return rtn.toString().substring(1, 3)
};
// all I/O Area initialization
function clearInput() {
    $(".stDt").val("");
    $("#r1").html("");
    $("#r2").html("");
    $("#r3").html("");
    $("#r4").html("");
    $("#r5").html("");
    $("#r6").html("");
    $(".il1").val("");
    $(".il2").val("");
    $(".il3").val("");
    $(".il4").val("");
    $("#r7").html("");
    $("#r8").html("");
    $("#r9").html("");
    $("#r10").html("");
    $("#r11").html("")
};