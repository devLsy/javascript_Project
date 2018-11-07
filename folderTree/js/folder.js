// jQuery plugin
(function($) {
	$.fn.folderAccordionMenu = function() {
		// 선택자에 해당하는 요소 개수만큼 folderAccordionMenu 객체 생성
		this.each(function(index) {
			var $this = $(this);
			var folder = new FolderMenu($(this));	
			// 현재 객체를 data() 이용해서 저장
			$this.data('folderAccorionMenu', folder);		
		});
		return this;
	}	
	/*
	* 초기화 시 선택한 인덱스 아이템 선택
	* @param mainIndex: 메인 인덱스
	* @param subIndex: 서브 인덱스
	* @param animation: 애니메이션 적용 여부(기본값 true)
	*/
	$.fn.selectFolderAccordionMenu = function(mainIndex, subIndex, animation) {
		this.each(function(index) {
			// 위에서 저장한 객체를 가져옴
			var folderMenu = $(this).data('folderAccorionMenu');
			folderMenu.selectMenu(mainIndex, subIndex, animation);	
		});
		return this;
	}
})(jQuery);	

// 클래스 생성
function FolderMenu(selector) {
	this.$accordionMenu = null;	// 폴더 아코디언 전체 영역
	this._$mainMenuItems = null;	// [Heroes>하위내용]의 한 덩어리 영역
	this._$selectSubItem = null;	// 서브메뉴 아이템 선택
	// 함수 실행
	this._init(selector);
	this._initSubMenuPanel();
	this._initEvent(); 
	// 함수 실행 종료
}	
/*
* 요소 초기화
* @param selector: 선택자
*/	
FolderMenu.prototype._init = function(selector) {
	// 폴더 아코디언 전체 영역
	this.$accordionMenu = $(selector);
	// [Heroes>하위내용]의 한 덩어리 영역
	this._$mainMenuItems = this.$accordionMenu.children('li');
};
// 이벤트 초기화
FolderMenu.prototype._initEvent = function() {
	var objThis = this;
	// 제목영역에 클릭 이벤트 리스너 추가
	this._$mainMenuItems.children('.main-title').click(function(e) {
		// 제목영역 아무곳이나 클릭해도 이벤트 먹도록 부모노드값 설정
		var $item = $(this).parent();
		objThis.toggleSubMenuPanel($item);
	});
	// 제목 - 하위내용에 클릭 이벤트 리스너 추가
	this._$mainMenuItems.find('.sub li').click(function(e) {
		var subMenuVal = ($(this).attr('value'));
		// 선택한 객체를 인자값으로 전달	
		objThis._selectSubMenuItem($(this));
		// 하위내용 값 저장
		// var subMenuVal = ($(this).attr('value'));
	});
}	
// 서브 패널 초기화(초기 시작 시 열거나 닫힌 상태 설정)
FolderMenu.prototype._initSubMenuPanel = function() {
	var objThis = this;
	this._$mainMenuItems.each(function(index) {
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
					objThis.openSubMenu($item, false); // 서브메뉴패널 열기 	
					break;
				case 'close':
					$item.attr('data-extension', 'close');
					objThis.closeSubMenu($item, false); // 서브메뉴패널 닫기		
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
	var $item = this._$mainMenuItems.eq(index);
	this.closeSubMenu($item, animation);
}
/*
* 선택한 인덱스 메뉴의 서브 메뉴 패널 열기
* @param index: 선택한 메뉴의 인덱스
* @param animation: 애니메이션 적용 여부(기본값 true)
*/
FolderMenu.prototype.openSubMenuAt = function(index, animation) {
	// 선택한 메뉴의 인덱스 번지
	var $item = this._$mainMenuItems.eq(index);
	this.openSubMenu($item, animation);
}
/*
* 서브메뉴 아이템 선택
* @param $item: 선택한 메뉴 아이템
*/
FolderMenu.prototype._selectSubMenuItem = function($item) {
	// 선택한 서브메뉴 아이템의 인덱스
	if(this._$selectSubItem != null) {
		this._$selectSubItem.removeClass('select');
	} // 선택한 메뉴 아이템 저장
	// $subIndex = $item.index();
	this._$selectSubItem = $item;
	var $subMenuVal = $item.attr('value');		
	// 선택한 메뉴 아이템 색상 변경	
	this._$selectSubItem.addClass('select');
	this.makeImage($subMenuVal);
}		
/*
* 메뉴 선택 기능(초기 실행 시 미리 메뉴가 선택되어 있게 하는 기능)(선택사항)
* @param mainIndex: 메인 메뉴 아이템
* @param subIndex: 서브 메뉴 아이템
* @param animation: 애니메이션 적용 여부(기본값 true)
*/
/*FolderMenu.prototype.selectMenu = function(mainIndex, subIndex, animation) {
	var $item = this._$mainMenuItems.eq(mainIndex); // 메인 메뉴 아이템
	var $subMenuItem = $item.find('.sub li').eq(subIndex); // 서브 메뉴 아이템
	// 서브메뉴 아이템이 있는 경우
	if($subMenuItem) {
		this.openSubMenu($item, animation); // 서브메뉴 패널 열기
		this._selectSubMenuItem($subMenuItem); // 서브 메뉴 아이템 선택
	}
}*/	
/*	
* 선택한 서브메뉴에 해당되는 이미지 동적 생성
* @param $item: 선택한 아이템
* 새로 선택한 내용이 있을 경우 이전에 보였던 이미지 삭제 기능 추가 필요(수정 예정)
*/
FolderMenu.prototype.makeImage = function($item) {
	var subMenuval = $item;
	var imgPath = './images/Heroes/';
	var path = imgPath + subMenuval + '.jpg';
	// 이미지 설정
	var $img = $('<img>').attr('src', path);
	// 이미지 영역 css 적용
	$img.addClass('imgDiv');
	// 이미지영역에 이미지 추가
	$('#imgDiv').append($img);
}	
	


	

	