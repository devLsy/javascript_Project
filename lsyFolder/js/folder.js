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
		var depth = newMarvelObj.depth;
		var type = newMarvelObj.type;
		var name = newMarvelObj.name;
		// console.log(newMarvelObj);

		if(depth == '0') {
			var liTg = "<li";
			liTg += " class=" + type;
			liTg += " id=" + id;
			console.log(liTg);
			var img = "";

			if(type == "group") {
				img = '<img src="./images/closeFolder.jpg" class="closeFolder">';
			}

			// liTg = $liTg.replace("@img@", img);
			// console.log(liTg);
			$ul.append(liTg);
			// console.log($ul);
		}
	}
	$tf.append($ul);
}
// group에 ClickEventListener 추가
function folderEventListener() {
	var $group = $('li.group');
		$group.click(function(e) {
		var log = "[==========log==========]" + "\n";
		var trg = e.target;

		var id = $(trg).attr("id");
		var dp = $(trg).attr("depth");
		var type = $(trg).attr("class");
		var name = $(trg).attr("value");
		var openStatus = $(trg).attr("openStatus");

		log += "[id]: " + id + "\n";
		log += "[dp]: " + dp + "\n";
		log += "[type]: " + type + "\n";
		log += "[name]: " + name + "\n";
		log += "[openStatus]: " + openStatus + "\n";
		log += "[==========end of log==========]";
		// console.log(name);
		console.log(log);
	});
}