
var  gridFilePath = "/ibs/com/jgrid/file/";

//document.write('<script type="text/javascript"  src="/js/lib/ebz_json2.js"></script>');
$(document).ready(function(){

//	<a style='cursor:pointer' jexgridButton='upload' jexgridId='ihbTest002.grid'></a>
    $.each($("[jexgridButton=newMake]"), function(i,v){
        $(this).click(function(e){
            window._fileTargetJgrid = eval($(this).attr("jexgridId"));
            fnNewMakeGrid();
        });
    });

    $.each($("[jexgridButton=get]"), function(i,v){
        $(this).click(function(e){
            window._fileTargetJgrid= eval($(this).attr("jexgridId"));
            var o = fnGridDataChk();

            if(o.all.length > 0) {
                if(confirm('가져오기를 하시면 현재 화면에 입력하신 내용이 지워집니다.\n고객님의 PC에 파일을 저장하시겠습니까?\n☞ "취소"를 선택하시면 PC에 파일을 저장하지 않고 삭제합니다.')) {
                    fnGridDataSave();
                    return false;
                }
            }
			parent.openLayer('/p_b2b_ebz_01_k606.act', {'GRAM_SPECD':$(this).attr('gramSpecd'),'fnReturn':$(this).attr("jexReturn")});
//            b2b_open_popup_k606($(this).attr("gramSpecd"));
        });
    });

    $.each($("[jexgridButton=addRow]"), function(i,v){
        $(this).click(function(e){
            window._fileTargetJgrid = eval($(this).attr("jexgridId"));
            fnAddRow();
        });
    });

    $.each($("[jexgridButton=removeRow]"), function(i,v){
        $(this).click(function(e){
            window._fileTargetJgrid = eval($(this).attr("jexgridId"));
            fnRemoveRow();
        });
    });

	$.each($("[jexgridButton=upload]"), function(i,v){
		$(this).click(function(e){
			window._fileTargetJgrid= eval($(this).attr("jexgridId"));
		    window._fileValidation = $(this).attr("jexValidation");
		    var o = fnGridDataChk();

		    if(o.all.length > 0) {
		        if(confirm('파일 열기를 하시면 현재 화면에 입력하신 내용이 지워집니다.\n고객님의 PC에 파일을 저장하시겠습니까?\n☞ "취소"를 선택하시면 PC에 파일을 저장하지 않고 삭제합니다.')) {
		            fnGridDataSave();
		            return false;
		        }
		    }

		    var winObj = window.open(gridFilePath+"com_ebz_file_finder.jsp", "jgridFileUplod", "width=" + 350 + ",height=" + 320);
		    winObj.blur();
		    winObj.focus();
		});
	});

	$.each($("[jexgridButton=download]"), function(i,v){
		$(this).click(function(e){
			window._fileNameJgrid = $(this).attr("jexgridFileNm");
            window._fileTargetJgrid = eval($(this).attr("jexgridId"));
            fnGridDataChk();//빈 data삭제
		    fnGridDataSave();
		});
	});

    // 엑셀다운로드
    $.each($("[jexgridButton=excel]"), function(i,v){
        $(this).click(function(e){
            window._saveTargetJgrid = eval($(this).attr("jexgridId"));
            var winObj = window.open(gridFilePath + "com_ebz_file_download.jsp",
                    "jgridExcelDownload",
                    " width="   + 907 +
                    ",height=" + 590 +
                    ",scrollbars=yes,status=1");
            winObj.blur();
            winObj.focus();
        });
    });

    // 그리드 프린트
	$.each($("[jexgridButton=print]"), function(i,v){
		$(this).click(function(e){
			window._saveTargetJgrid = eval($(this).attr("jexgridId"));
			var winObj = window.open(gridFilePath + "com_ebz_file_print.jsp",
			        "jgridFilePrint",
			        " width="   + 907 +
			        ",height=" + 590 +
	                ",scrollbars=yes");
			winObj.blur();
			winObj.focus();
		});
	});

	// 화면 프린트
	$('#divprintBtn').click(function (){
	    var winObj = window.open(gridFilePath + "com_ebz_file_preview.jsp",
                "printPopup",
                " width="  + 662 +
                ",height=" + 600 +
                ",scrollbars=yes");
        winObj.blur();
        winObj.focus();
	});
});

//행추가
function fnAddRow() {
    for(var j=0; j < 10; j++) {
        //배열에 집어 넣기 위해서는 새로운 배열을 사용해야한다.
        _fileTargetJgrid.dataMgr.add({});
    }//end for
}

//행삭제
function fnRemoveRow() {
    if(!confirm('선택하신 행을 삭제 하시겠습니까?')) return false;

    var chkList = _fileTargetJgrid.checkMgr.getCheckList();
    _fileTargetJgrid.dataMgr.removeList(chkList);
}

//새로만들기전 기존입력 데이터 처리확인
function fnNewMakeGrid() {
    var o = fnGridDataChk();
    if(o.all.length > 0) {
        if(confirm('새로 만들기를 하시면 현재 화면에 입력하신 내용이 지워집니다.\n계속 하시겠습니?')) {
            o.removeList(o.all);
            fnAddRow();
        }
    }
}

//새로만들거나 저장하기전 grid row data 체크
var fnGridDataChk = function() {
    var currentData = _fileTargetJgrid.dataMgr;
    var arrDelList = new Array();

    for(var i=0,len=currentData.all.length; i < len; i++) {
        var ob = currentData.all[i];
        if(fnIsEmptyRow(ob)) {
            arrDelList.push(ob);
        }//end if
    }//end for
    currentData.removeList(arrDelList);

    return currentData;
};

//object data존재여부 체크
var fnIsEmptyRow = function(ob) {
    var deCols = fnDefaultCols();

    for(var key in ob) {
        if(typeof(deCols[key]) != 'undefined' && nullToSpace(ob[key]) != '') {
            return false;
        }
    }//end for
    return true;
};

//default grid header 정보를 가져온다.
var fnDefaultCols = function() {
    var defaultCols = new Object();
    var _targetColDef = _fileTargetJgrid.colDefMgr.get();

    for(var i=0,len=_targetColDef.length; i < len; i++) {
        var key = _targetColDef[i].key;
        if(key != 'checkbox' && key != 'row_seq') {
            defaultCols[key] = _targetColDef[i].name;
        }
    }//end for

    return defaultCols;
};

function fnGridDataSave() {
    var _datalist = _fileTargetJgrid.dataMgr.datalist;

    var _filenm = $("#"+_fileNameJgrid).val();

    if(_datalist.length==0) {
        alert("저장 할 항목이 없습니다. 저장항목을 확인해주세요.");
        return false;
    }

    //원본 그리드컬럼정보 읽기
    var orgColDef = _fileTargetJgrid.colDefMgr.getAll();

    var _colDefList = [];
    for(var i=0 ; i<orgColDef.length ; i++) {
        if( orgColDef[i].key == "checkbox" || orgColDef[i].key == "row_seq" ) {
            continue;
        }
        _colDefList.push({
             gridunqid : String(i)
            ,name : orgColDef[i].name
            ,key : orgColDef[i].key
            ,width: orgColDef[i].width
        });
    }//end for

    var _saveDatalist= new Array();
    for(var i=0,len=_datalist.length; i < len; i++) {
        var _saveDatarow = new Object();

        for(var j=0; j<_colDefList.length; j++) {
            var _cellValue = _datalist[i][ _colDefList[j].key ];
            _saveDatarow["A"+j] = _cellValue==undefined?"":""+_cellValue;
        }
        _saveDatalist.push(_saveDatarow);
    }//end for

    var result = {
        colDef:_colDefList,
        data:_saveDatalist,
        filenm:_filenm
    };

    var url = gridFilePath+"com_ebz_file_downloadProc.jsp";
    var frmNm  = '_downloadForm';
    var iframNm= '_downloadIfrm';
    $('#'+frmNm).remove();//폼을 삭제한다.
    $('#'+iframNm).remove();//iframe을 삭제한다.

    var str = [
               '<form id="'+frmNm+'" name="'+frmNm+'" method="post" enctype="multipart/form-data" action="'+url+'" target="'+iframNm+'">'
              ,'    <textarea id="json" name="json" style="display:none;"></textarea>'
              ,'</form>'
              ,'<iframe name="'+iframNm+'" id="'+iframNm+'" style="width:0px;height:0px;display:hidden;"></iframe>'
               ].join('');
    $('body').append(str);
    $("#json").val( encodeURI(JSON.stringify(result)) );
    $('#'+frmNm).submit();
}

//향후 공통함수로 대체
function setGridEditOptions(opt) {
    opt.EditManager = {
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
       //,urlEditIcon:this.grid.__options_Z_imageUrl + "editable-small.png"
       //에디팅 아이콘 이미지의 폭 픽셀 값 (df:12)
       ,editIconWidth: 12
       //에디팅 아이콘 이미지의 padding 픽셀 값 (df:3)
       ,editIconPadding: 3
    };
}

//향후 공통함수로 대체
function setGriFooterdOptions(opt) {
    opt.Footer = {};
}

function _setUserData_(dataList) {
	dataList = JSON.parse(dataList);

	if(!(dataList instanceof Array)) {
		var tempDatalist = [];
		var dataLength = dataList.length;

		for(var i=0 ; i<dataLength ; i++ ) {
			tempDatalist.push(dataList[i]);
		}
		dataList = tempDatalist;
	}

	try {
		_setJexFileDatalist_(dataList);
	} catch(e) {
		jex.printError('', '데이터 적용중 오류가 발생했습니다.\n'+e.toString());
	}
}

function _setJexFileDatalist_(dataList) {
    window._fileTargetJgrid.dataMgr.set(dataList);
}
