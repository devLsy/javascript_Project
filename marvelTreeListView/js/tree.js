// 나중에 시간 내서 class & plugin으로 변경할 예정
// 전역 변수 ////////////////
var org = null;
var topCode = "marvel";
//////////////////////////// 
$(document).ready(function(){
	initTreeData(); // 트리데이터 초기화
	initTree();		// 트리 초기화(동적으로 ul, li 태그 생성)
	treeActionListener(); // 클릭 이벤트 리스너
});
// 트리 데이터 초기화	
function initTreeData() {	
	org = new Array();
	// group
	var marvel = {id: "marvel", high: "0", name: "Marvel", type: "group"};
	var sml = {id: "stanleyMartinLieber", high: "marvel", name: "StanleyMartinLieber", type: "user"}; // 마블 작가(One-Above-All)
	var heroes = {id: "marvel1", high: "marvel", name: "Heroes", type: "group"}; // 영웅들
	// var vilein = {id: "marvel2", high: "marvel", name: "Vilein", type: "group"}; // 악당들
	// users(Heroes)
	var doctorStrange = {id: "doctorStrange", high: "marvel1", name: "DoctorStrange", type: "user"};
	var thorOdinson = {id: "thorOdinson", high: "marvel1", name: "ThorOdinson", type: "user"};
	var ironMan = {id: "ironMan", high: "marvel1", name: "IronMan", type: "user"};
	var hulk = {id: "hulk", high: "marvel1", name: "Hulk", type: "user"};
	var captinAmerica = {id: "captinAmerica", high: "marvel1", name: "CaptinAmerica", type: "user"};
	// users(Vilein)
	var dormammu = {id: "dormammu", high: "marvel2", name: "Dormammu", type: "user"};
	var hella = {id: "hella", high: "marvel2", name: "Hella", type: "user"};
	var thnos = {id: "thnos", high: "marvel2", name: "Thnos", type: "user"};
	var loki = {id: "loki", high: "marvel2", name: "Loki", type: "user"};
	// group, user data store
	org.push(marvel, sml, heroes, doctorStrange, thorOdinson, ironMan, hulk, captinAmerica, dormammu, hella, thnos, loki);
	// org.push(marvel, sml, heroes, vilein, doctorStrange, thorOdinson, ironMan, hulk, captinAmerica, dormammu, hella, thnos, loki);
	// console.log("[initTreeData] " + JSON.stringify(org)); // json 데이터 String값으로 출력
}
// 트리 초기화(최상위 폴더 동적으로 생성)
function initTree() {
	var ul = $("<ul>");
	
	for (var i = 0; i < org.length; i++) {
		var grp = org[i];    // 배열의 값 저장
		var id = grp.id;     // id store
		var high = grp.high; // high store
		var name = grp.name; // name store
		var type = grp.type; // type store
		// console.log("[initTree] org:" + "id: " + id + "/" + "high: " + high + "/" + "name:" + name + "/" + "type:" + type);
		if (high == "0") { // 최상위 depth인 경우
			var tag = "<li class='@className@' key='@id@' high='@high@' depth='0' isOpen='false'><div>@img@@title@</div></li>"
			var img = ""; var className = type; var style = "";

			if (type == "group") { // 그룹인 경우 ↑이미지 표시
				img = "<img src='./images/icon_top_tree_up.png' width='15' height='15'/>";
			} 
			tag = tag.replace("@className@", className) // li 태그의 value들 변환
					.replace("@id@", id)
					.replace("@high@", high)
					.replace("@img@", img)
					.replace("@title@", name);
					var classNM = 
			ul.append(tag); // li 태그의 내용들을 ul태그뒤에 추가
		}
	} 
	$("#tree").append(ul); // 최종적으로 #tree에 li를 포함한 ul태그 생성
}
// 트리 클릭 이벤트 리스너
function treeActionListener() {
	// group class에 클릭 이벤트 리스너 추가
	$(".group").click(function(e){
		var target = e.target; // 이벤트 발생시킨 요소 가져오기 위한 변수
		var key = $(target).attr("key"); // bring in a key
		var title = $(target).children("div").text(); // bring in a name
		var dp = $(target).attr("depth"); // bring in a depth

		dp = (dp * 1) + 1; // 1부터 시작하게 설정
		var className = $(target).attr("class");
		var isOpen = $(target).attr("isOpen");
		var log = "";

		log += "[title] " + title + "\n";
		log += "[id] " + key + "\n";
		log += "[dp] " + dp + "\n";
		log += "[isOpen] " + isOpen + "\n";
		log += "[className] " + className + "\n";
		// console.log(log);
		if(className == 'user') { // 사용자 인 경우에만 이미지 표시
			var imgPath = './images/Heroes/'; // 이미지 경로
			var imgSrc = imgPath + key + '.jpg'; // full imgSrc
			console.log('imgSrc: ' + imgSrc);	

		switch(key) {
			case 'stanleyMartinLieber': console.log('마블작가');
				  showUserImage(imgSrc); // 클릭한 사용자에 해당되는 이미지 표시
				  break;	
			case 'doctorStrange': console.log('닥스');
				  showUserImage(imgSrc);	
				  break;	
			case 'thorOdinson': console.log('토르');
			      showUserImage(imgSrc);
				  break;
			case 'ironMan': console.log('아이언맨');
			      showUserImage(imgSrc);
				  break;	
			case 'hulk': console.log('헐크');
			      showUserImage(imgSrc);
				  break;
			case 'captinAmerica': console.log('캡틴아메리카');
			      showUserImage(imgSrc);
				  break;
		    default:
		    	  console.log('이미지가 없습니다.');
		}
	}
		var ul = $("<ul>");
		if (isOpen == "true") { // 폴더를 열었다가 닫는 경우
			$(target).attr("isOpen", "false"); // switch값을 false로 변경
			$(target).children("ul").empty();  // ul의 값을 비움
			var imgSrc = './images/icon_tree_plus.png'; // +이미지 
			
			if (key == topCode) { // 최상위 폴더인 경우
				imgSrc = './images/icon_top_tree_up.png'; // ↑이미지 표시
			}
			
			$(target).children("div").children("img").attr("src", imgSrc); // +이미지로 변경
		} else { // 하위폴더를 닫을 경우
			$(target).attr("isOpen", "true"); // switch값을 true로 변경
			
			var imgSrc = './images/icon_tree_minus.png'; // -이미지
			
			if (key == topCode) { // 최상위 폴더인 경우
				imgSrc = './images/icon_top_tree_down.png';
			}
			
			$(target).children("div").children("img").attr("src", imgSrc); // +이미지로 변경
			
			var grpPl = 30 + (dp * 20); // group paddingLeft      
			var usrPl = grpPl - 20; // user paddingLeft

			for (var i = 0; i < org.length; i++) {
				var grp = org[i];    // 배열의 값 저장
				var id = grp.id;     // id store
				var high = grp.high; // high store
				var name = grp.name; // name store
				var type = grp.type; // type store

				if (key == high) {
					// console.log("[treeActionListener] org: " + "id: " + id + "/" + "high: " + high + "/" + "name: " + name + "/" + "type: " + type);
					var tag = "<li class='@className@' key='@id@' high='@high@' depth='@dp@' isOpen='false'><div style='@style@'>@img@@title@</div></li>"
					var img = "";
					var className = type;
					var imgSrc = "./images/icon_tree_plus.png";
					var style = "padding-left:" + usrPl + "px";
					
					if (type == "group") {
						img = "<img src='@imgSrc@' width='15' height='15'/>";
						className = "group";
						style = "padding-left:" + grpPl + "px;" + "cursor: pointer;";
					} 

					tag = tag.replace("@className@", className)
							.replace("@id@", id)
							.replace("@high@", high)
							.replace("@img@", img)
							.replace("@title@", name)
							.replace("@dp@", dp)
							.replace("@style@", style)
							.replace("@imgSrc@", imgSrc);
					ul.append(tag);
				}
			}
			$(target).append(ul);
		}
	});
}	
/*
*
* 클릭한 사용자에 해당하는 이미지 표시(Maximum call stack size exceeded 해결 필요)
* @param imgSrc: full imgSrc	
*/
function showUserImage(imgSrc) {
	if(imgSrc != null) {
		var $img = $('<img>').attr('src', imgSrc); // parameter의 값으로 전달받은 이미지경로를 저장
		var $xBtnImg = $("<img src='./images/xBtn.jpg' />") // x버튼 이미지 설정
    	
    	$img.addClass('imgDiv'); //사용자 이미지 css 적용
    	$xBtnImg.addClass('add'); // x이미지 css 적용
		
		$('.imgDiv').append($img); // 이미지영역에 이미지 추가		
		$('.xBtnImgDiv').append($xBtnImg); // 이미지영역에 x이미지 추가
		
		closeUserImage($xBtnImg); // x버튼 클릭 관련 함수 

	} else {
		$img.remove();		
		$xBtnImg.remove();
	}	
}
/*	
* x버튼 클릭 시 이미지 닫기
* @param img: 클릭한 이미지
*/
function closeUserImage($xBtnImg) {
	var $xBtn = $xBtnImg;
	$xBtn.click(function(e) {
		console.log('x버튼 클릭함!!');
		$('.xBtnImgDiv').remove();
		$('.imgDiv').remove();
	});
}