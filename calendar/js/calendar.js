var $calc1 = null;
var $calc2 = null;
var $calc3 = null;
var $calc4 = null;
var $calc5 = null;
var $reset = null;
var $nowDate = null;
var $stDt = null;
var $il1 = null;
var $il2 = null;
var $il3 = null;
var $il4 = null;

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
}
// 이벤트 초기화
function initEvent() {
    $calc1.click(function() {
        calc1Date()
    });
    $calc2.click(function() {
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
}

function getNowDate() {
    var nowDt = new Date();
    $stDt.val(converDateString(nowDt))
}

function calc1Date() {
    var inputDt = $(".stDt").val();
    $("#r1").text(getNowDateFirstDate(inputDt));
    $("#r2").text(getNowDateLastDate(inputDt));
    $("#r3").text(prevMonthFirstDate(inputDt));
    $("#r4").text(prevMonthLastDate(inputDt));
    $("#r5").text(nextMonthFirstDate(inputDt));
    $("#r6").text(nextMonthLastDate(inputDt))
}

function calc2Date() {
    var inputDt = $(".stDt").val();
    var inputDa = $(".il1").val();
    $("#r7").text(monthsLaterfirstDate(inputDt, parseInt(inputDa)))
}

function calc3Date() {
    var inputDt = $(".stDt").val();
    var inputDa = $(".il2").val();
    $("#r8").text(monthsLaterLastDate(inputDt, parseInt(inputDa) + 1))
}

function calc4Date() {
    var inputDt = $(".stDt").val();
    var inputDa = $(".il3").val();
    $("#r9").text(afewDaysAgo(inputDt, parseInt(inputDa)))
}

function calc5Date() {
    var inputDt = $(".stDt").val();
    var inputDa = $(".il4").val();
    $("#r10").text(afewDaysLater(inputDt, parseInt(inputDa)))
}

function getNowDateFirstDate(dt) {
    var newDt = new Date(dt);
    newDt.setDate(1);
    return converDateString(newDt)
}

function getNowDateLastDate(dt) {
    var newDt = new Date(dt);
    newDt.setMonth(newDt.getMonth() + 1);
    newDt.setDate(0);
    return converDateString(newDt)
}

function prevMonthFirstDate(dt) {
    var newDt = new Date(dt);
    newDt.setMonth(newDt.getMonth() - 1);
    newDt.setDate(1);
    return converDateString(newDt)
}

function prevMonthLastDate(dt) {
    var newDt = new Date(dt);
    newDt.setMonth(newDt.getMonth());
    newDt.setDate(0);
    return converDateString(newDt)
}

function nextMonthFirstDate(dt) {
    var newDt = new Date(dt);
    newDt.setMonth(newDt.getMonth() + 1);
    newDt.setDate(1);
    return converDateString(newDt)
}

function nextMonthLastDate(dt) {
    var newDt = new Date(dt);
    newDt.setMonth(newDt.getMonth() + 2);
    newDt.setDate(0);
    return converDateString(newDt)
}

function monthsLaterfirstDate(dt, i) {
    var newDt = new Date(dt);
    newDt.setMonth(newDt.getMonth() + i);
    newDt.setDate(1);
    return converDateString(newDt)
}

function monthsLaterLastDate(dt, i) {
    var newDt = new Date(dt);
    newDt.setMonth(newDt.getMonth() + i);
    newDt.setDate(0);
    return converDateString(newDt)
}

function afewDaysAgo(dt, i) {
    var newDt = new Date(dt);
    newDt.setDate(newDt.getDate() - i);
    return converDateString(newDt)
}

function afewDaysLater(dt, i) {
    var newDt = new Date(dt);
    newDt.setDate(newDt.getDate() + i);
    return converDateString(newDt)
}

function converDateString(dt) {
    return dt.getFullYear() + "-" + addZero(eval(dt.getMonth() + 1)) + "-" + addZero(dt.getDate())
}
/*
* 날짜 앞자리에 0추가 (ex: 2018-1-1 -> 2018-01-01)
* @param i: 입력받은 데이터 중 월, 일 값
*/
function addZero(i) {
    var rtn = i + 100;
    return rtn.toString().substring(1, 3)
}
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
}