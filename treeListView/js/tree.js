var org = null;
var topCode = "marvel";
function initTreeData() {
	org = new Array();
	// group
	var marvel = {id: "marvel", high: "0", name: "Marvel", type: "group"};
	var sml = {id: "sml", high: "marvel", name: "StanleyMartinLieber", type: "user"}; // 마블 작가(One-Above-All)
	var heroes = {id: "marvel1", high: "marvel", name: "Heroes", type: "group"}; // 영웅들
	var vilein = {id: "marvel2", high: "marvel", name: "Vilein", type: "group"}; // 악당들
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
	// group data store
	org.push(marvel);
	org.push(sml);
	org.push(heroes);
	org.push(vilein);	
	// group data store
	org.push(doctorStrange);
	org.push(thorOdinson);	
	org.push(ironMan);
	org.push(hulk);
	org.push(captinAmerica);
	// vilein data store
	org.push(dormammu);
	org.push(hella);
	org.push(thnos);
	org.push(loki);
	//console.log("[initTreeData] " + JSON.stringify(org));
}
$(function(){
	initTreeData();
	initTree();
	
	treeActionListener();
});
function initTree() {
	var ul = $("<ul>");
	
	for (var i = 0; i < org.length; i++) {
		var grp = org[i];
		var id = grp.id;
		var high = grp.high;
		var name = grp.name;
		var type = grp.type;
		
		//console.log("[initTree] org:" + id + "/" + high + "/" + name + "/" + type);
		
		if (high == "0") {
			var tag = "<li class='@className@' key='@id@' high='@high@' depth='0' isOpen='false'><div>@img@@title@</div></li>"
			var img = "";
			var className = type;
			var style = "";
			
			if (type == "group") {
				img = "<img src='./images/icon_top_tree_up.png' width='15' height='15'/>";
			} 
			
			tag = tag.replace("@className@", className)
					.replace("@id@", id)
					.replace("@high@", high)
					.replace("@img@", img)
					.replace("@title@", name);
			
			ul.append(tag);
		}
		
	}
	
	$("#tree").append(ul);
}
function treeActionListener() {
	$(".group").click(function(e){
		var target = e.target;
		var key = $(target).attr("key");
		var title = $(target).children("div").text();
		var dp = $(target).attr("depth");
		dp = (dp * 1) + 1;
		
		var isOpen = $(target).attr("isOpen");
		
		var log = "";
		log += "[title] " + title + "\n";
		log += "[id] " + key + "\n";
		log += "[dp] " + dp + "\n";
		log += "[isOpen] " + isOpen + "\n";
		console.log(log);
		
		var ul = $("<ul>");
		
		if (isOpen == "true") {
			$(target).attr("isOpen", "false");
			$(target).children("ul").empty();

			var imgSrc = './images/icon_tree_plus.png';
			
			if (key == topCode) {
				imgSrc = './images/icon_top_tree_up.png';
			}
			
			$(target).children("div").children("img").attr("src", imgSrc);
		} else {
			$(target).attr("isOpen", "true");
			
			var imgSrc = './images/icon_tree_minus.png';
			
			if (key == topCode) {
				imgSrc = './images/icon_top_tree_down.png';
			}
			
			$(target).children("div").children("img").attr("src", imgSrc);
			
			var grpPl = 30 + (dp * 20);
			var usrPl = grpPl - 20;
			
			for (var i = 0; i < org.length; i++) {
				var grp = org[i];
				var id = grp.id;
				var high = grp.high;
				var name = grp.name;
				var type = grp.type;
				
				if (key == high) {
					//console.log("[treeActionListener] org: " + id + "/" + high + "/" + name + "/" + type);
					
					var tag = "<li class='@className@' key='@id@' high='@high@' depth='@dp@' isOpen='false'><div style='@style@'>@img@@title@</div></li>"
					var img = "";
					var className = type;
					var imgSrc = "./images/icon_tree_plus.png";
					var style = "padding-left: " + usrPl + "px";
					
					if (type == "group") {
						img = "<img src='@imgSrc@' width='15' height='15'/>";
						className = "group";
						style = "padding-left: " + grpPl + "px";
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