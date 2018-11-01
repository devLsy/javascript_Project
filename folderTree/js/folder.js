// 클래스 생성
function FolderMenu(selector) {
	/* properties
	* $accordionMenu: 폴더트리 전체 영역
	* $mainMenuItems: 최상위 폴더 
	* $selectSubItem: 선택 하위 메뉴 아이템
	*
	*/
	this.$accordionMenu = null;
	this.$mainMenuItems = null;
	this.$selectSubItem = null;
	this.init(selector);
	this.initSubMenu();
	this.initEvent();
}

// 요소 초기화
FolderMenu.prototype.init = function(selector) {
	this.$accordionMenu = $(selector);
	this.$mainMenuItems = this.$accordionMenu.children('li');
};

// 이벤트 초기화
FolderMenu.prototype.initEvent = function() {	
	var objThis = this;
	// 최상위 폴더에 클릭 이벤트 리스너 추가
	this.$mainMenuItems.children('.main-title').click(function(e) {
		var $item = $(this).parent();
		objThis.toggleSubMenu($item);
	});

	this.$mainMenuItems.find('.sub li').click(function(e) {
		objThis.selectSubMenuItem($(this));	
	});
}


// 서브 메뉴 초기화(초기시작 시 닫힌 상태로..)
/*여러가지 방법 중 html element의 data 이용해서 데이터를 저장한 값을 가지고 컨트롤 하는 방법으로 구현
* $item: 서브메뉴 제목 영역
* $itemStatus: 서브메뉴 폴더의 상태값
* $subMenu: 서브메뉴 리스트의 최상위 노드
*/
FolderMenu.prototype.initSubMenu = function() {
	var objThis = this;	
	this.$mainMenuItems.each(function(index) {
		var $item = $(this);
		// data-extension의 값을 가져옴
		var $itemstatus = $item.attr('data-extension');
		var $subMenu = $item.find('.sub');

		switch($itemstatus) {
			// data-extension의 값이 'open'이면 버튼 이미지 +로 표시
			case 'open':
				objThis.setFolderState($item, 'open');
				break;
			// data-extension의 값이 'close'이면 버튼 이미지 -로 표시
			case 'close':
				objThis.setFolderState($item, 'close');
				break;	
			default:
			// 하위 폴더 상태가 없는 경우 숨김 처리
				objThis.setFolderState($item, 'close');
		}
	});
}

// 폴더 상태 설정	
/*
* @param $item: 하위폴더메뉴  
* @parm state: 하위 폴더 open할지 close할지 상태값
*/
FolderMenu.prototype.setFolderState = function($item, state) {	
	var $folder = $item.find('.main-title .folder');
	// 기존 클래스 모두 제거
	$folder.removeClass();
	// 클래스 추가(버튼 이미지 + or -로 변경)
	$folder.addClass('folder ' + state);
}

// 하위 폴더 열기
/*
* @param $item: 하위폴더 메뉴
* @param animation: 에니메이션 적용 여부(기본값 true)
*/
FolderMenu.prototype.openSubMenu = function($item, animation) {
	// 하위 폴더 메뉴가 있는 경우 하위폴더 열기
	if($item != null) {
		$item.attr('data-extension', 'open');

		var $subMenu = $item.find('.sub');
		// 에니메이션 적용 안할 경우
		if(animation == false) {
			$subMenu.css({marginTop:0});
		} else { // 에니메이션 적용할 경우	
			$subMenu.stop().animate({marginTop:0}, 300, "easeInCubic");
		}
		this.setFolderState($item, 'open');


	}	
}

// 하위 폴더 닫기
/*
* @param $item: 하위폴더 메뉴
* @param animation: 에니메이션 적용 여부(기본값 true)
*/
FolderMenu.prototype.closeSubMenu = function($item, animation) {
	// 하위 폴더 메뉴가 있는 경우 하위폴더 닫기
	if($item != null) {
		$item.attr('data-extension', 'close');

		var $subMenu = $item.find('.sub');

		var subMenuHeight = -$subMenu.outerHeight(true);
		// 에니메이션 적용 안할 경우
		if(animation == false) {
			$subMenu.stop().animate({marginTop:subMenuHeight}, 300, "easeInCubic");
		}
		this.setFolderState($item, 'close');
		
	}	
}

// 하위폴더 열고 닫기(toggle)
/*
* @param $item: 하위폴더 메뉴
*	
*/

FolderMenu.prototype.toggleSubMenu = function($item) {
	var extension = $item.attr('data-extension');

	// data-extension == '열림'인 경우
	if(extension == 'open') {
		this.closeSubMenu($item);
	} else { // data-extension == '닫힘'인 경우
		this.openSubMenu($item);	
	}
}

// index 메뉴의 하위 폴더 열기
/*
* @param index: 하위 폴더의 인덱스
* @param animation: 에니메이션 적용 여부(기본값 true)
*/
FolderMenu.prototype.openSubMenuAt = function(index, animation) {
	var $item = this.$mainMenuItems.eq(index);
	this.openSubMenu($item, animation);
}

// index 메뉴의 하위 폴더 닫기
/*
* @param index: 하위 폴더의 인덱스
* @param animation: 에니메이션 적용 여부(기본값 true)
*/
FolderMenu.prototype.closeSubMenuAt = function(index, animation) {
	var $item = this.$mainMenuItems.eq(index);
	this.closeSubMenu($item, animation);
}

/*	
* 하위 메뉴 아이템 선택
*
*
*/
FolderMenu.prototype.selectSubMenuItem = function($item) {

	// 하위 메뉴 선택 했을 경우
	if(this.$selectSubItem != null) {
		this.$selectSubItem.removeClass('select');
	} 
	// 매개변수로 전달 받은 하위 메뉴 아이템에 select 효과 추가
	this.$selectSubItem = $item;
	this.$selectSubItem.addClass('select');
	console.log(this.$selectSubItem);
}
