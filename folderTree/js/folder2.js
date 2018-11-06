// 클래스 생성
function FolderMenu(selector) {
	this.$accordionMenu = null;	// 폴더 아코디언 전체 영역
	this.$mainMenuItems = null;	// [Heroes>하위내용]의 한 덩어리 영역
	this.$selectSubItem = null;	// 서브메뉴 아이템 선택
	// 함수 실행
	this.init(selector);
	this.initSubMenuPanel();
	this.initEvent(); 
	// 함수 실행 종료
}	
/*
* 요소 초기화
* @param selector: 선택자
*/
FolderMenu.prototype.init = function(selector) {
	// 폴더 아코디언 전체 영역
	this.$accordionMenu = $(selector);
	// [Heroes>하위내용]의 한 덩어리 영역
	this.$mainMenuItems = this.$accordionMenu.children('li');
};
// 이벤트 초기화
FolderMenu.prototype.initEvent = function() {
	var objThis = this;
	// 제목영역에 클릭 이벤트 리스너 추가
	this.$mainMenuItems.children('.main-title').click(function(e) {
		// 제목영역 아무곳이나 클릭해도 이벤트 먹도록 부모노드값 설정
		var $item = $(this).parent();
		// console.log($item);
		objThis.toggleSubMenuPanel($item);
	});
	// 제목 - 하위내용에 클릭 이벤트 리스너 추가
	this.$mainMenuItems.find('.sub li').click(function(e) {
		// 선택한 객체를 인자값으로 전달	
		objThis.selectSubMenuItem($(this));
	});
}
// 서브 패널 초기화(초기 시작 시 닫힌 상태로 만들기)
FolderMenu.prototype.initSubMenuPanel = function() {
	var objThis = this;
	// 
	this.$mainMenuItems.each(function(index) {
		// 선택한 1depth 영역(제목 밑에 내용부분..)
		var $item = $(this);
		var $subMenu = $item.find('.sub');
		// 폴더의 하위폴더 열림 or 닫힘 여부
		var dataExt = $item.attr('data-extension');
		// 폴더의 하위 내용이 없는 경우 'empty'로 data-extension을 설정
		if($subMenu.length === 0) {
			$item.attr('data-extension', 'empty');
			objThis.setFolderState($item, 'empty');
		} else {
			// 폴더의 하위 내용이 있는 경우
			switch(dataExt) {
				case 'open':
					objThis.setFolderState($item, 'open');
					console.log('하위내용이 있습니다.');
					objThis.openSubMenu($item, false);	
					break;
				case 'close':
					$item.attr('data-extension', 'close');
					objThis.setFolderState($item, 'close');
					console.log('하위내용이 없습니다.');
					objThis.closeSubMenu($item, false);		
					break;
				default:
					return;
			}
		}
	});	
}
/* 
* 폴더의 상태 변경
* @param $item: 해당 선택 폴더
* @param state: 하위 내용이 있는지 없는 지 여부
*/
FolderMenu.prototype.setFolderState = function($item, state) {
	// <div class="main-title"><span class="folder close"> 이부분
	var $folder = $item.find('.main-title .folder');
	// console.log($folder);
	// 기존 클래스 모두 제거
	$folder.removeClass();
	// 클래스 추가(하위 내용이 있을 경우 아이콘을 +로 변경, 하위 내용도 표시)
	$folder.addClass('folder ' + state);
}	
/*
* 서브메뉴 패널 열기
* @param @item: 선택 아이템
* @param animation: 애니메이션 적용 여부(기본값 true)
*/
FolderMenu.prototype.openSubMenu = function($item, animation) {
	// 선택한 아이템이 있는 경우
	if($item != null) {
		$item.attr('data-extension', 'open');

		var $subMenu = $item.find('.sub');
		// console.log($subMenu);
		// 애니메이션 적용 안한 경우
		if(animation === 'false') {
			$subMenu.css({marginTop:0});
		} else { // 애니메이션 적용 한 경우
			$subMenu.stop().animate({marginTop:0}, 300, 'easeInCubic');
		} // 폴더상태 열기로 변경
		this.setFolderState($item, 'open');
	}	
}
/*
* 서브메뉴 패널 닫기
* @param @item: 선택 아이템
* @param animation: 애니메이션 적용 여부(기본값 true)
*/
FolderMenu.prototype.closeSubMenu = function($item, animation) {
	// 선택한 아이템이 있는 경우
	if($item != null) {	
		$item.attr('data-extension', 'close');

		var $subMenu = $item.find('.sub');
		// padding 영역포함해서 -높이값 저장
		var SubMenuPanelHeight = -$subMenu.outerHeight(true);
		// 애니메이션 적용 안한 경우
		if(animation === false) {
			$subMenu.css({marginTop:SubMenuPanelHeight});
		} else { // 애니메이션 적용한 경우
			$subMenu.stop().animate({marginTop:SubMenuPanelHeight}, 300, 'easeInCubic');
		} // 폴더상태 닫기로 변경
		this.setFolderState($item, 'close');
	}	
}
/* 
* 하위 폴더 열고 닫기
* @param $item: 선택한 아이템
*/
FolderMenu.prototype.toggleSubMenuPanel = function($item) {
	var ext = $item.attr('data-extension');
	// 하위가 없는 경우 취소
	if(ext === 'empty') {
		return;
	}

	switch(ext) {
		case 'open':
			console.log('하위 내용이 있는 경우에만 실행됩니다.');
			this.closeSubMenu($item);
			break;
		case 'close':
			this.openSubMenu($item);
			break;
		default:
			return;
	}
}
/*
* 선택한 인덱스 메뉴의 서브 메뉴 패널 닫기
* @param index: 선택한 메뉴의 인덱스
* @param animation: 애니메이션 적용 여부(기본값 true)
*/
FolderMenu.prototype.closeSubMenuAt = function(index, animation) {
	// 선택한 메뉴의 인덱스 번지
	var $item = this.$mainMenuItems.eq(index);
	this.closeSubMenu($item, animation);
}
/*
* 선택한 인덱스 메뉴의 서브 메뉴 패널 열기
* @param index: 선택한 메뉴의 인덱스
* @param animation: 애니메이션 적용 여부(기본값 true)
*/
FolderMenu.prototype.openSubMenuAt = function(index, animation) {
	// 선택한 메뉴의 인덱스 번지
	var $item = this.$mainMenuItems.eq(index);
	this.openSubMenu($item, animation);
}
/*
* 서브메뉴 아이템 선택
* @param $item: 선택한 메뉴 아이템
*/
FolderMenu.prototype.selectSubMenuItem = function($item) {

	if(this.$selectSubItem != null) {
		this.$selectSubItem.removeClass('select');
	} // 선택한 메뉴 아이템 저장
	this.$selectSubItem = $item;
	// 선택한 메뉴 아이템 색상 변경
	this.$selectSubItem.addClass('select');
}
	


	

