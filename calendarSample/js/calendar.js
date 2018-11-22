$(document).ready(function() {
  var da = '<span id="ye">' + toYear + '</span>년<span id="mo">' + (toMon+1)+'</span>월';
  $("#titm").append(da);
  getTodate();

  $("#MouthNote table tr th").each(function() { // 일~토 영역에 색상 적용
        var numin = $(this).index()+1;
        // console.log(numin);
        $(this).addClass('num' + numin);

        if($(this).attr('class') == 'num7') { // 토요일에 파란색 적용
              $(this).css('color', 'blue');
        } else if($(this).attr('class') == 'num1') { // 일요일에 적색 적용
              $(this).css('color', 'red');
        };
    });
});

var toDate = new Date();
var toYear = toDate.getFullYear(); //년
// console.log('년: ' + toYear);
var toMon = toDate.getMonth();    // 월
// console.log('월: ' + toMon);
var toDa = toDate.getDay();       // 주
// console.log('주: ' + toDa);

var MontArr = ['31','28','31','30','31','30','31','31','30','31','30','31']; //각 월의 말일
var tY = null; // 년을 저장하기 위한 변수
var TM = null; // 월을 저장하기 위한 변수

/*
* @param m: 현재 월
*
*/
function getTodate(m) { 
  // console.log('getTodate() 실행');
  $("#MouthNote table tbody").html("");

  var str = ""; // 동적으로 일수 생성하기 위한 변수
  // 넘어온 인자값으로 매달 말일, 현재 페이지 년도/월 지정
  // console.log('m: ' + m);
  if(m == null) {
    tY = toYear; // Date객체에서 가져온 년
    tM = toMon;  // 월
    m = MontArr[toMon];
    // console.log('마지막 일: ' + MontArr[toMon]);

  } else { // 넘어온 m이 있으면
    var py = $("#ye").text(); // 동적으로 생성된 년
    var pt = $("#mo").text(); // 동적으로 생성된 월

    if(pt == '1') {
      pt = '0';
    } else {
      pt = Number(pt)-1;
      // console.log('pt: ' + pt);
    }
    tY = py;
    tM = pt;
    m = MontArr[(m)];
  }

  // 윤년 계산(년도가 4로 나누어 떨어지면서 100으로 나누어 떨어지지 않는 년도, 
  // 400으로 나누어 떨어지는 년도)
  if((tY%4 == 0 && tY%100 !=0)|| tY%400==0) {
          MontArr[1] = 29;
} else {
          MontArr[1] = 28;
}

// 매달 첫 일자 구하기
var tDate = new Date(tY, tM, 1); // parameter로 넘긴 값: 년, 월, 1
// console.log(tDate);
var tDay = tDate.getDay();
// console.log('주: ' + tDay);
var i = 1;
var day = 1;
var sum = 0;
// 동적으로 일자 생성
str += "<tr>";
// 일자 생성
  for(i; i <= m; i++) { // 1부터 30과 같을때까지 i를 반복하고 8, 15, 22, 29일 때 <tr></tr> 저장
        if(i == 8 || i == 15 || i == 22 || i ==29) { 
              str += "</tr>";
              str += "<tr>";
        }
        // console.log('i: ' + i, 'm: ' + m);          
        // console.log('str: ' + str);
        if(i < tDay+1) {  // 4주이면
              str += "<td></td>";
        } else {          // 5주이면
              str += "<td><a>" + day + "</a></td>";
              day++;
        }
  }

  for(day; day <= m; day++) { // day도 30과 같을때까지 반복
    ++i;
    if(i == 22 || i == 29 || i == 37) {
              str += "</tr>";
              str += "<tr>";
      }
      str += "<td><a>"+day+"</a></td>";
    }
    str += "</tr>";
    $('#MouthNote table tbody').append(str);
}

    // 이전 날짜 표시
    $(document).on("click", '#leftday', function() {
          console.log('이전달 달력을 표시합니다.');
          var yleft = $("#ye").text(); // 현재 년
          // console.log(yleft);
          var nleft = $("#mo").text(); // 현재 월
          // console.log(nleft);
          $("#mo").text(Number(nleft)-1); // 현재 월 -1
          // console.log(Number(nleft)-1);  

          if(Number(nleft) == '1') {
                  $("#mo").text('12');
                  $("#ye").text(Number(yleft)-1);
          }

          if(nleft == '1') {
                  nleft = '11';
          } else {
                  nleft = Number(nleft)-2;
          }
          getTodate(nleft);
    });

    // 다음 날짜 표시
    $(document).on("click", '#rightday', function() {
          console.log('다음달 달력을 표시합니다.');
          var nright = $("#mo").text();  // 현재 년
          // console.log('nright: ' + nright);
          var yright = $("#ye").text();  // 현재 월

          $("#mo").text(Number(nright)+1);

          if(Number(nright) == '12') {
                  $("#mo").text('1');
                  $("#ye").text(Number(yright)+1);
          }

          if(nright == '12') {
                nright = '0';
          }
          getTodate(nright);
    });

$(document).on("click", 'td a', function() {
      $("td a").removeClass('active');
      $(this).addClass('active');
});








