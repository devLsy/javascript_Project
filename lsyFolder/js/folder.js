

$(document).ready(function() {
	initData();
	initFolder();
});
// 그룹 & 사용자 데이터 초기화
function initData() {
  
  marvelArr = new Array();	
  // 그룹 데이터
  var marvelStudios= {id: "marvelStudios", depth: "0", name: "MarvelStudios", type: "group"};
  var heroes = {id: "heroes", depth: "1", name: "Heroes", type: "group"};
  // 사용자 데이터
  var stanLee = {id: "stanLee", depth: "1", name: "StanLee", type: "user"};
  var doctorStrange = {id: "doctorStrange", depth: "1", name: "DoctorStrange", type: "user"};
  var thorOdinson = {id: "thorOdinson", depth: "1", name: "ThorOdinson", type: "user"};
  var ironMan = {id: "ironMan", depth: "1", name: "IronMan", type: "user"};
  var hulk = {id: "hulk", depth: "1", name: "Hulk", type: "user"};
  var captinAmerica = {id: "captinAmerica", depth: "1", name: "CaptinAmerica", type: "user"};

  // console.log(JSON.stringify(captinAmerica));
  marvelArr.push(marvelStudios, stanLee, heroes, doctorStrange, thorOdinson, ironMan, hulk, captinAmerica);

  // for(var i=0; i < marvelArr.length; i++) {
  // 	console.log(marvelArr[i]);
  // } 
}
// 트리 초기화(배열 값 저장, 동적으로 ul, li태그 생성)
function initFolder() {
	var $ul = $("<ul>");
	var $tf = $("#topLevelFolder");

	for(var i = 0; i < marvelArr.length; i++) {
		var newMarvelObj = marvelArr[i];
		var id = newMarvelObj.id;
		$tf.data("id", id);
		var depth = newMarvelObj.depth;
		$tf.data("depth", depth);
		var type = newMarvelObj.type;
		$tf.data("type", type);
		var name = newMarvelObj.name;
		$tf.data("name", name);
		// console.log(newMarvelObj);

		if(depth == '0') {
			var liTg = "<li class=" + type + " id=" + id + " depth=" + depth + ">" + "<div>▶@img@ " + name + "</div></li>";
			var img = null;

			if(type == "group") {
				img = '<img src="./images/closeFolder.jpg" class="closeFolder">';
			}

			liTg = liTg.replace("@img@", img);
			// console.log(liTg);
			$ul.append(liTg);
			// console.log($ul);
		}
	}
	$("#topLevelFolder").append($ul);
}
