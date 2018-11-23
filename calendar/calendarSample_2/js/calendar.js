// 전역 변수 
var today = new Date();
var year = today.getFullYear();  // 년
var month = today.getMonth();    // 월
var day = today.getDay();        // 주

$(document).ready(function() {
  console.log('달력 로딩');
  // changeColor();
});
// 월의 일수 설정
function dayy(year, month) {
    switch(month) {
        case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        return 31;

        case 4: case 6: case 9: case 11:
        return 30;

        case 2:
        // 윤달 계산
        if(((year%400)==0||(year%4)==0&&(year%100)!=0)){
            return 29;
        } else {
            return 28;
        }
    }
}

// 화면에 일수 표시
function present() {

  var start = new Date(year, );

}














