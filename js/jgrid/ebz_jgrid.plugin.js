
//var jGrid;
if(!jGrid) var jGrid={};
 /***************************************************
  * 그리드 Default 옵션
  ***************************************************/

jGrid.getGridOpt = function(){

	return {
		width : '100%',
		style : 'border-top: 1px solid #c5c5c5; border-bottom: 1px solid #d9d9d9; outline: none;',
		borderSide: false,
		ColHeader : {
			style : 'border-bottom: 1px solid #E0E0E0; color: #757575;',
			headerStyle : 'height: 31px; line-height: 2.5; border-right: 1px solid #E0E0E0; color: #636363; font-weight: bold;',
			background: '#F6F6F6 repeat-x center bottom;',
			backgroundHover : 'repeat-x scroll center',
			resizeHandleBackground : '',
			sortRight : 1,
			sortBackground : '/img/jexGrid/ebz_sort1.png',
			sortBackgroundAsc : '/img/jexGrid/ebz_sort-asc1.png',
			sortBackgroundDesc : '/img/jexGrid/ebz_sort-desc1.png',
			'padding-left'  : 5,
			'padding-right' : 5			
		},
		CheckManager:{
		},
		ColDefManager : {
			colDef : {
				resizable : true,
				width : 100
			},
			rowPopUpFormat : "renderer"
		},
		ViewportManager : {
			rowsPerPage : 10,
			rowH : 25,
			autoHeight : true,
			maxRowsPerPage : 10,
			autoColWEnabled : false,
			evenOddRows : true,
			oddRowsBackground : "white",
			style : "background : white",			
			canvasStyle : "background : white",
			rowStyle : "background : #F5F9FF;",
			'padding-left': 5,
			'padding-right': 5,			
			cellStyle : "line-height: 1.9",
			focusBackground : "white",
			focusOutline : "none",
			rowPopUpEnabled : false
		}
		,
		SelectionManager : {
		},
		autoColWEnabled : false
	};
};

jGrid.getDefaultOpt = function(){
	var defOpt = jGrid.getMenuBarOpt();
	return defOpt;
};

jGrid.getAddFooterOpt =function(){
	var footOpt = jGrid.getDefaultOpt();
	footOpt.Footer = { 'sumPadding-right' : 5, 'sumPadding-left' : 5, 'sumRowH': 25 };
	return footOpt;
};

jGrid.getHiddenFooterOpt =function(){
	var footHidOpt = jGrid.getAddFooterOpt();
	footHidOpt.Footer.style = "display : none;";
	return footHidOpt;
};

jGrid.getMenuBarOpt =function(){

	var searchMgrImg = {
		tagBackground:"/img/jexGrid/ebz_tag-background.png"
		,searchIconUrl:"/img/jexGrid/ebz_search-icon.png"
		,tagRemoveIconActiveUrl:"/img/jexGrid/ebz_search-icon.png"
		,tagRemoveIconUrl : "/img/jexGrid/ebz_tag-close.png"
		,tagRemoveIconHoverUrl : "/img/jexGrid/ebz_tag-close-hover.png"
	};

	var menuImg = {
			background: 'url(/img/jexGrid/ebz_menubar-bg.png) repeat-x scroll center',
			columnIconUrl : '/img/jexGrid/ebz_data-creator-icon.png',
			iconBackgroundHover : 'url(/img/jexGrid/ebz_menu-icon-hover.png) repeat-x scroll center',
			iconBackgroundActive : 'url(/img/jexGrid/ebz_menu-icon-active.png) repeat-x scroll center'
	};

	var menuOpt = jGrid.getGridOpt();

	menuOpt.MenuBar = menuImg;
	menuOpt.SearchManager = searchMgrImg;

	return menuOpt;
};


jGrid.getDefaultEditOpt = function(){
	var editOpt = jGrid.getGridOpt();
	editOpt.style=".jgrid-editable{border:double}";
	editOpt.EditManager = {
			//Edit 가능한 Cell의 배경 적용 여부(df:false)
			editableBgEnabled:true
			//Edit 가능한 Cell에 적용될 배경(df:"#FFF)
			,editableBg:"#FFF"
			///Edit 불가능한 Cell에 적용될 배경 (df:"#F6F6F6")
			,notEditableBg: "#F6F6F6"
			//delete 키를 이용한 셀 내용 삭제 가능 여부(df:false)
			,deleteEnabled: false
			//에디팅 가능한 셀에 에디팅 아이콘을 보여줄지 여부 (df:true)
			,editIconEnabled:true
			//에디팅 가능한 셀에 보여줄 아이콘 이미지 url (df:this.grid.__options_Z_imageUrl + "editable-small.png")
			,urlEditIcon: "/img/jexGrid/ebz_editable-small.png"
			//에디팅 아이콘 이미지의 폭 픽셀 값 (df:12)
			,editIconWidth: 12
			//에디팅 아이콘 이미지의 padding 픽셀 값 (df:3)
			,editIconPadding: 3
			,classCellEditable:"jgrid-editable"
	};
//	editOpt.EditManager.classCellEditable="jgrid-editable";

	return editOpt;
};


jGrid.getDefaultPopOpt = function(){
	var popupOpt = jGrid.getGridOpt();
	popupOpt.ViewportManager.rowsPerPage=11;
	return popupOpt;
};

/**
 * Grid event.register 정의
 * radioCheck : radio button check
 * leaveCommit : 입력정보를 스크립트에 저장한다.
 */
jGrid.event = {
	radioCheck : function(_grid) {
		_grid.event.register(
	        {e:"clickCanvas", f:function(e, cell){
	        	_grid.checkMgr.check(cell.getDatarow());
	        }}
	    );
	},
	leaveCommit : function(_grid) {
		_grid.event.register(
		    {e:"mouseleave", f:function(e){// mouseleave 이벤트에 주어진 함수를 register 합니다.
		    	_grid.editMgr.commit();//입력정보를 스크립트에 저장한다.
		    }}
		);
	}
};

//jGrid.renderer={};
if(!jGrid.renderer) jGrid.renderer={};

/**
 * Grid 순번 Renderer 정의
 */
jGrid.renderer.sequence = function(value, rowIdx){
	return ++rowIdx;
};

/**
* Grid 시간 포멧 Renderer 정의
*/
jGrid.renderer.time = function(value){
	return formatter.time(value);
};


/**
* Grid 날짜시간 포멧 Renderer 정의
*/
jGrid.renderer.datetime = function(value){
	return formatter.datetime(value, "yyyy-mm-dd hh24:mi:ss");
};

/**
* Grid 날짜 포멧 Renderer 정의
*/
jGrid.renderer.date = function(value){
	return formatter.date(value);
};

/**
* Grid 계좌 포멧 Renderer 정의
*
* 계좌번호 자리수는 은행마다 다르므로 추가적으로 각각에 은행에 대한 자릿수를 자동으로 매칭해주는 함수를 만들어야 합니다.
*/
jGrid.renderer.accountNo = function(value){
	return formatter.accountNo(value);
};

/**
* Grid 금액 포멧 Renderer 정의
*/
jGrid.renderer.number = function(value){
	return formatter.number(value);
};

/**
* Grid 숫자 포멧 Renderer 정의
*/
jGrid.renderer.rmZero = function(value){
	return formatter.rmZero(value);
};


/**
* Grid 사업자번호 포멧 Renderer 정의
*/
jGrid.renderer.corpnum = function(value){
	return formatter.corpNum(value);
};

/**
* Grid 주민등록번호 포멧 Renderer 정의
*/
jGrid.renderer.ssn = function(value){
	return formatter.ssn(value);
};

/**
* Grid 우편번호 포멧 Renderer 정의
*/
jGrid.renderer.post =  function(value){
	return formatter.post(value);
};

/**
* Grid 사업자 or 주민 or 법인번호 포멧 Renderer 정의
*/
jGrid.renderer.ssnBizNo =  function(value){
	return formatter.ssnBizNo(value);
};

/**
* Grid 카드번호 포멧 Renderer 정의
*/
jGrid.renderer.card =  function(value){
	return formatter.card(value);
};

/**
* Grid 카드번호 포멧 Renderer 정의 - 가온데 8자리 '*' 처리
*/
jGrid.renderer.cardMask =  function(value){
	return formatter.cardMask(value);
};

/**
* Grid 전화번호 포멧 Renderer 정의
*/
jGrid.renderer.telNo =  function(value){
	return formatter.telNo(value);
};

/**
* Grid 휴대전화번호 포멧 Renderer 정의
*/
jGrid.renderer.phoneNomber =  function(value){
	return formatter.phoneNomber(value);
};


/**
* Grid 호스트전화번호 포멧 Renderer 정의
*/
jGrid.renderer.hostPhone =  function(value){
	return formatter.hostPhone(value);
};

/**
* Grid 외화금액 Renderer 정의
*/

jGrid.renderer.fexnumber = function(value){
	return formatter.fexnumber(value);
};


/**
* Grid 외화금액 Renderer 정의
*/

jGrid.renderer.fexorgnumber = function(value){
	return formatter.fexnumber(value,true);
};

/**
* Grid 실수 Renderer 정의
*/

jGrid.renderer.float = function(digitNumber){
	return function (value){

		if(value == null || value == undefined){
			return 0;
		}

		var val = parseFloat(value);

		if(digitNumber == null || digitNumber == undefined || digitNumber == "" || typeof digitNumber != "number"){
			return val;
		}else{
			return val.toFixed(digitNumber);
 		}
	};
};

/**
* Grid 실수 포맷 Renderer 정의
*/
jGrid.renderer.double2Num = function(fmt) {
	return function(value) {
		return formatter.double2Number(value, fmt);
	};
};

/**
* 은행명 가져온다.
*/
jGrid.renderer.bankNm = function(code) {
	if(typeof(code) != 'string') {
		code = 'BNKCD';
	}
	return function(val) {
		if(typeof(val) == 'string' && val.length >= 3) {
			return _CodeMgr.getCodeMsg(code, val.substring(0,3));
		}
		return val;
	};
};

/**
* 공통코드(소그룹)를 가져온다.
* seolrem 20130204 사용하지 않는거 같아 수정함.
* AS-IS
jGrid.renderer.codeMsgUse = function(group,key){
	var codeManager = jex.plugin.get("CODE_MANAGER");
	var codeValue = codeManager.getCodeMsg(group, key);
	return codeValue;
};
*/
jGrid.renderer.codeMsgUse = function(group) {
	return function(value, rowIdx, colIdx, datarow, colDef) {
		if(typeof(group) != 'string') {
			group = colDef.key;
		}
		return _CodeMgr.getCodeMsg(group, value);
	};
};

/*
 * jgrid 플러그인 seach이벤트 공통처리
 */
/*
function pageSearch($target, grid, viewCnt, $info, jexAjax, fn ){

	var pageNo = $target.data("PAGE_NO");

	//조회될 페이지가 0이거나, 값이 존재하지 않으면 아무작업도 하지 않음.
	if(pageNo===0 || !pageNo){
		if(!!fn){
			fn(false);
		}
		return false;
	}

	jexAjax.set("PAGE_NO", String( pageNo ));//조회될 페이지번호
    jexAjax.set("VIEW_CNT", String( viewCnt ));//한페이지에 조회될 건수

    var existsNext = false;

    jexAjax.execute(function(dat) {

    	if( dat.REC.length > viewCnt ){
    		dat.REC = dat.REC.slice(0, viewCnt );
    		$target.data("PAGE_NO", pageNo+1);
			existsNext = true;
    	} else {
    		$target.data("PAGE_NO", 0);
    	}

    	if(pageNo==1){
			grid.dataMgr.set(dat.REC);
		} else {
			grid.dataMgr.addList(dat.REC);
		}

    	if(!!$info)
		{
			if(existsNext)
				$info.text("다음페이지가 존재합니다. | 현재건수"+ grid.dataMgr.all.length);
			else
				$info.text("다음페이지가 존재하지 않습니다. | 현재건수"+ grid.dataMgr.all.length);
		}

		if(!!fn) fn(existsNext);
    });

}
*/