var historyCnt = 0; //hitory back 수행시 default 값(0:현위치 / -1: 뒤로) 

//뱅킹에서 넘어온 경우 이전페이지 바로가기 기능 구현
var BankingDvcd = true;

try{
	var tmpBkNavObj1 = dataCtrl.getObjData("_SES_NAVI_CONTS");

	if(tmpBkNavObj1!=null && tmpBkNavObj1.IBNK_MNU_CD && tmpBkNavObj1.IBNK_UPPER_MNU_CD){
		dataCtrl.delObjData("MENU_LOCATION_BANK");
		dataCtrl.setObjData("MENU_LOCATION_BANK", JSON.stringify(tmpBkNavObj1));
	}

	if(/com_ebz_esb/.test(top.location.href)){
		BankingDvcd = false;
	}

	function aaaaaa(){
		try{
			var tmpBkHrefObj = dataCtrl.getObjData("INQ_SESS_OBJ_BANK");

			if(tmpBkHrefObj!=null && tmpBkHrefObj.TR_TYPE){
				if(/11710_0010|11110_0310|11210_1180|11310_0320|11410_0330|11610_0200|16210_4550/.test(tmpBkHrefObj.LOC_HREF)){
					tmpBkHrefObj.His_Yn  ="N";
				}

				dataCtrl.setObjData('INQ_SESS_OBJ', JSON.stringify(tmpBkHrefObj));
			}

			var tmpObj   ={};
			var movePage = "";
			var tmpBkNavObj2 = dataCtrl.getObjData("MENU_LOCATION_BANK");

			try{
				tmpObj ={ 	'LOCATION_PAGE'		:tmpBkNavObj2.MNU_STRT_PG_NM,
					'IBNK_MNU_CD'		:tmpBkNavObj2.IBNK_MNU_CD,
					'IBNK_UPPER_MNU_CD'	:tmpBkNavObj2.IBNK_UPPER_MNU_CD,
					'MNU_LEVL_NO'		:tmpBkNavObj2.MNU_LEVL_NO,
					'TOPLVL_MNU_ID'		:tmpBkNavObj2.TOPLVL_MNU_ID,
					'STRT_PG_DRCTR_NM'	:tmpBkNavObj2.STRT_PG_DRCTR_NM };
			}catch(e){
				tmpObj ={	'LOCATION_PAGE'		:'',
					'IBNK_MNU_CD'		:'',
					'IBNK_UPPER_MNU_CD'	:'',
					'MNU_LEVL_NO'		:'',
					'TOPLVL_MNU_ID'		:'',
					'STRT_PG_DRCTR_NM'	:'' 	};
			}

			dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));

			try{
				if(tmpBkHrefObj.TOP_HREF){
					movePage = tmpBkHrefObj.TOP_HREF;
				}else{
					aaaaaa_1();
				}
			}catch(e){
				aaaaaa_1();
			}

			if(/index.jsp/.test(movePage)){
				aaaaaa_2();
			}

			var objLk ={'HP_BK':'BK','LOCATION_PAGE': movePage};
			dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));

			location.href = movePage;
		}catch(e){
		}
		function aaaaaa_1(){
			if(sessionInfo.USER_DV_VAL == '2' || sessionInfo.USER_DV_VAL == '3'){
				movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + "com_ebz_17010_j002.act";
			}else{
				movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + "com_ebz_16010_j002.act";
			}
		}
		function aaaaaa_2(){
			if(sessionInfo.USER_DV_VAL == '2' || sessionInfo.USER_DV_VAL == '3'){
                var strSubUrl = _CodeMgr.getCodeMsg('SUB_URL', '1002');// com_ebz_cib_sub_main.act
                if( strSubUrl.indexOf('com_ebz_cib_sub_main') > -1 )
                {
                    strSubUrl = "com_ebz_cib_main.act";
                }
                movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + strSubUrl;
			}else{
				movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + "com_ebz_pib_main.act";
			}
		}
	}
}catch(e){
}

function setGridOutPut( print_use , excel_use , print_grid_id , excel_grid_id ){
	if(print_use){
		if(print_grid_id != "" ){
			$("#_grid_print").find("img").attr("src","/img/comm/button/btn_paper_on.gif");
			$("#_grid_print").attr("style"        , "cursor:pointer");
			$("#_grid_print").attr("jexgridid"    , print_grid_id   );
		}
	}
	if(excel_use){
		if(excel_grid_id != "" ){
			$("#_grid_excel").find("img").attr("src","/img/comm/button/btn_filesave_on.gif");
			$("#_grid_excel").attr("style"        , "cursor:pointer");
			$("#_grid_excel").attr("jexgridid"    , excel_grid_id   );
		}
	}
}

$.fn.caption = function(itemCd , callback){
	var $cation = $(this);
	var cationLeft = $cation.offset().left;
	var cationTop  = $cation.offset().top;

	var captionDiv = "<div id=\"layer_pop_1\" style=\"display:none;border:1px solid #adbfdc; width:70px; height:40px;padding:4px 5px 12px 8px;position:absolute;left:"+(cationLeft+13)+"px;top:"+cationTop+"px; z-index:700; background:#f8f8f8;\">";
	captionDiv += "<ul>";
	captionDiv += "</ul>";
	captionDiv += "</div>";
	$("body").append(captionDiv);

	$cation.click(function(){
		$("#layer_pop_1").slideToggle();
		return false;
	});

	$("body").click(function (){
		if( !$("#layer_pop_1").is(":hidden") ){ $("#layer_pop_1").slideUp(); }
	});
};

$.fn.input_search = function(default_lang , enter_element){
	if(default_lang == "ko"){
		$(this).css("ime-mode","active");
	}

	$(this).keypress(function(e){
		if(e.which==13){
			$(enter_element).click();
		}
	});
};

$.fn.input_init_text = function(text){
	$(this).val(text);
	$(this).focus(function(){
		if( $(this).val() == text){
			$(this).val("");
		}
	});
};

//숫자만 리턴하는 함수..
function fnRtnNumeric(str){
	if(typeof(str) == 'undefined'){
		return '';
	}
	return str.replace(/[^0-9]/g, '');
}

$.fn.yyyymm_combo = function(standardDate , beforeNum , afterNum){
	var date  = standardDate;
	var year  = Number(standardDate.substring(0,4));
	var month = Number(standardDate.substring(4,6));
	var CurrentYYYYMMMList = [];
	var BeforeYYYYMMMList = [];
	var AfterYYYYMMMList = [];

	var BeforeYearList = [];
	for(var i = 1; i < beforeNum+1; i++){
		BeforeYearList.push(year-i);
	}

	for(var z=0; z<BeforeYearList.length; z++){
		for(var i=12; i >= 1; i--){
			BeforeYYYYMMMList.push(BeforeYearList[z]+""+(i<10 ?"0"+i:i));
		}
	}

	for(var i = 1; i <= month; i++){
		CurrentYYYYMMMList.push(year+""+(i<10 ?"0"+i:i));
	}

	for(var i = month+1; i <= 12; i++){
		CurrentYYYYMMMList.push(year+""+(i<10 ?"0"+i:i));
	}

	for(var i=BeforeYYYYMMMList.length-1; i >= 0; i--){
		$(this).append("<option value='"+BeforeYYYYMMMList[i]+"'>"+BeforeYYYYMMMList[i].substring(0,4)+"-"+BeforeYYYYMMMList[i].substring(4,6)+"</option>");
	}

	for(var i=0; i < CurrentYYYYMMMList.length; i++){
		$(this).append("<option value='"+CurrentYYYYMMMList[i]+"'>"+CurrentYYYYMMMList[i].substring(0,4)+"-"+CurrentYYYYMMMList[i].substring(4,6)+"</option>");
	}

	var AfterYearList = [];

	for(var i = 1; i < afterNum+1; i++){
		AfterYearList.push(year+i);
	}

	for(var z=0; z<AfterYearList.length; z++){
		for(var i=1; i <= 12; i++){
			AfterYYYYMMMList.push(AfterYearList[z]+""+(i<10 ?"0"+i:i));
		}
	}

	for(var i=0; i < AfterYYYYMMMList.length; i++){
		$(this).append("<option value='"+AfterYYYYMMMList[i]+"'>"+AfterYYYYMMMList[i].substring(0,4)+"-"+AfterYYYYMMMList[i].substring(4,6)+"</option>");
	}

	$(this).val(standardDate);
};

$.fn.time_combo = function(){
	for(var i=1; i <= 24; i++){
		$(this).append("<option value='"+(i<10 ?"0"+i:i)+"'>"+(i<10 ?"0"+i:i)+"</option>");
	}
};

// #Time 스트링을 자바스크립트 Date 객체로 변환.
function toTimeObject(time){
	var year  = time.substr(0,4);
	var month = time.substr(4,2) - 1; // 1월=0,12월=11
	var day   = time.substr(6,2);

	return new Date(year,month,day);    //,hour,min
}

// 특정날짜의 요일을 구한다.
function getDayOfWeek(strDate, f){
	var now = toTimeObject(strDate);
	var day = now.getDay(); //일요일=0,월요일=1,...,토요일=6 임

	if(f == 'd'){
		return day;
	}
	var week = ['일','월','화','수','목','금','토'];

	return week[day];
}

// 지정된 특정한 날짜가 영업일인지 아닌지를 판단한다.
function isHoliday(yyyymmdd){
	var result = "";
	var jexAjax = jex.createAjaxUtil("com_ebz_54010_r001");

	jexAjax.set("UT_PARAM_1",	"1");
	jexAjax.set("UT_PARAM_2",	yyyymmdd);

	jexAjax.setAsync(false);
	jexAjax.execute(function(dat){
		result = dat.UT_RESULT_1;
	});

	return result;
}

// 특정일을 입력받아 영업일 후의 날짜를 리턴한다.
function getWorkDateFrom(yyyymmdd,period){
	var result = "";

	var jexAjax = jex.createAjaxUtil("com_ebz_54010_r001");
	jexAjax.set("UT_PARAM_1",	"2");
	jexAjax.set("UT_PARAM_2",	yyyymmdd);
	jexAjax.set("UT_PARAM_3",	period);
	jexAjax.setAsync(false);

	jexAjax.execute(function(dat){
		result = dat.UT_RESULT_1;
	});

	return result;
}

// 특정일을 입력받아, period 후의 날짜를 리턴한다.
function getCalDateFrom(YYYYMMDD, period){
	if(jex.null2Void(YYYYMMDD) == '' || YYYYMMDD.length != 8 || jex.null2Void(period) == ''){
		alert('NO DATE TYPE!!!');
		return '';
	}

	var yyyy = parseInt(YYYYMMDD.substring(0,4));
	var mm = parseInt(YYYYMMDD.substring(4,6));
	var dd = parseInt(YYYYMMDD.substring(6));
	var date = new Date(yyyy,mm,dd);

	date.setDate(date.getDate() + parseInt(period));

	return date.getFullYear().toString() + lpad(date.getMonth().toString()) + lpad(date.getDate().toString());
}

// 두날짜 차이(Between(일수)구하는 함수
function getDaysBetween(fromDate,toDate){
	var result = "";
	var jexAjax = jex.createAjaxUtil("com_ebz_54010_r001");

	jexAjax.set("UT_PARAM_1",	"3");
	jexAjax.set("UT_PARAM_2",	fromDate);
	jexAjax.set("UT_PARAM_3",	toDate);
	jexAjax.setAsync(false);

	jexAjax.execute(function(dat){
		result = dat.UT_RESULT_1;
	});

	return result;
}

// 시스템 현재날짜
function getNowDate(){
	var result = "";
	var jexAjax = jex.createAjaxUtil("com_ebz_54010_r001");

	jexAjax.set("UT_PARAM_1",	"4");
	jexAjax.setAsync(false);

	jexAjax.execute(function(dat){
		result = dat.UT_RESULT_1;
	});

	return result;
}

// 현재날짜를 format에 맞게  리턴
function getNowFormatDate(format){
	var result = "";
	var jexAjax = jex.createAjaxUtil("com_ebz_54010_r001");

	jexAjax.set("UT_PARAM_1",	"6");
	jexAjax.set("UT_PARAM_2",	format);
	jexAjax.setAsync(false);

	jexAjax.execute(function(dat){
		result = dat.UT_RESULT_1;
	});

	return result;
}

// 넘겨준 숫자만큼 날짜를 빼거나 더해서 문자열로 넘겨준다
function getAddDate(iDay,flag){
	var result = "";
	var jexAjax = jex.createAjaxUtil("com_ebz_54010_r001");

	jexAjax.set("UT_PARAM_1",	"5");
	jexAjax.set("UT_PARAM_2",	iDay);
	jexAjax.set("UT_PARAM_3",	flag);
	jexAjax.setAsync(false);

	jexAjax.execute(function(dat){
		result = dat.UT_RESULT_1;
	});

	return result;
}

// DateTime 스트링을 자바스크립트 Date 객체로 변환
function toDateObject(strDateTime){
	var year  = strDateTime.substr(0,4);
	var month = strDateTime.substr(4,2) - 1; // 1월=0,12월=11
	var day   = strDateTime.substr(6,2);
	var hour  = strDateTime.substr(8,2);
	var min   = strDateTime.substr(10,2);
	return new Date(year,month,day,hour,min);
}

// 현재일자 조회 yyyymmddmiss
function getToDay(){
	var now  =new Date();
	var year =now.getFullYear();
	var month=now.getMonth();
	var date =now.getDate();
	var hour =now.getHours();
	var min  =now.getMinutes();
	var sec  =now.getSeconds();
	var m    = (month+1>9) ? month+1 : '0'+(month+1);
	var d    = (date>9) ? date : '0'+date;
	var currentDate=year+""+(m)+""+(d)+""+(hour>9?hour:'0'+hour)+(min>9?min:'0'+min)+(sec>9?sec:'0'+sec);

	return currentDate;
}

// 현재일자 조회 yyyymmdd
function getCurrentDate(){
	var now  =new Date();
	var year =now.getFullYear();
	var month=now.getMonth();
	var date =now.getDate();
	var m    = (month+1>9) ? month+1 : '0'+(month+1);
	var d    = (date>9) ? date : '0'+date;

	return year+""+(m)+""+(d)+"";
}

// 현재시간 조회 hhmmss
function getCurTime(){
	var now  = new Date();
	var hour = now.getHours();
	var min  = now.getMinutes();
	var sec  = now.getSeconds();

	var currentTime = '' + (hour>9?hour:'0'+hour) + (min>9?min:'0'+min) + (sec>9?sec:'0'+sec);

	return currentTime;
}

// 마지말 일을 조회 합니다.
function getLastDay(yyyymm){
	var strDay = "";

	if( yyyymm.length == 6 ){
		var year  = Number(yyyymm.substring(0,4));
		var month = Number(yyyymm.substring(4,6));
		var lastDate = new Date(year,month,0);

		strDay = lastDate.getDate();
	}

	return strDay;
}

// 마지말 일자를 조회 합니다.
function getNowMonLastDay(){
	var toDay = getToDay();
	var lastDay = getLastDay(toDay.substring(0,6));
	var year  = toDay.substring(0,4);
	var month = toDay.substring(4,6);

	return year+""+month+""+lastDay;
}

// 팝업 열기
// @param formId : submit될 폼의 아이디. 없으면 빈 팝업만 열림
// @param options :{ sizeW(가로사이즈), sizeH(세로사이즈), action(팝업에서 열릴 웹서비스id, 입력되지 않으면 현재 폼에 적용되어있는 action으로 열림)}
function open_popup(formId, options){
	var	sizeW 	= parseInt(options.sizeW, 10);
	var	sizeH 	= parseInt(options.sizeH, 10);
	var nLeft 	= screen.width/2 - sizeW/2 ;
	var nTop  	= screen.height/2- sizeH/2 ;
	var option	= ",toolbar=no,menubar=no,location=no,scrollbars=yes,status=no";
	var winObj	= window.open('', options.target, "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + option );

	winObj.blur();	//크롭에서 focus()만 호출할경우 작동하지 않아서 blur()를 먼저 호출한후 focus()호출하도록 수정함.
	winObj.focus();	//팝업이 이미 열려있는경우 앞으로 나오도록 한다.

	var frm = document.getElementById(formId);

	if(!!frm){
		frm.method = "post";
		frm.target = options.target;

		if(!!options.action)	frm.action = options.action;

		frm.submit();
	}

	frm.target = "";
}

function open_popup_test(formId, options){
	var	sizeW 	= parseInt(options.sizeW, 10);
	var	sizeH 	= parseInt(options.sizeH, 10);
	var nLeft 	= screen.width/2 - sizeW/2 ;
	var nTop  	= screen.height/2- sizeH/2 ;
	var option	= ",toolbar=no,menubar=no,location=no,scrollbars=yes,status=no";
	var winObj	= window.open('', options.target, "left=" + nLeft + ",top=" +  nTop + ",width=" + sizeW + ",height=" + sizeH  + option );

	winObj.blur();	//크롭에서 focus()만 호출할경우 작동하지 않아서 blur()를 먼저 호출한후 focus()호출하도록 수정함.
	winObj.focus();	//팝업이 이미 열려있는경우 앞으로 나오도록 한다.

	var frm = document.getElementById(formId);

	if(!!frm){
		frm.method = "post";
		frm.target = options.target;

		if(!!options.action)	frm.action = options.action;

		frm.submit();
	}

	frm.target = "";
}

// 콤보를 그려줍니다.
function makeComboWithComCd(input){
	var code_list = [];
	var jexAjax = jex.createAjaxUtil("comm_0000_01");

	jexAjax.set("REC_CODE" , input);
	jexAjax.setAsync(false);

	jexAjax.execute(function(dat){
		$(dat.RESULT_CODE).each(function(ri,rv){
			for(var z = 0; z < input.length; z++){
				var grp_cd        = input[z].GRP_CD;
				var target_select = input[z].TARGET_C;
				var selected      = input[z].SELECTED;
				var callBackFn    = input[z].CALLBACK_FN;

				if(null2void(rv.CD,"") != ""){
					if(grp_cd == rv.CD){
						var result = JSON.parse(rv.DATA);

						$.each(result , function(){
							$.each(this , function(di,dv){
								$("#"+target_select).append('<option value="'+dv.KEY+'" '+(dv.KEY==selected?"selected":"")+'>'+dv.VALUE+'</option>');
							});
						});
					}

					if($.isFunction(callBackFn)){
						callBackFn();
					}
				}else if(target_select == rv.TARGET_C){
					var result = JSON.parse(rv.DATA);

					$.each(result , function(){
						$.each(this , function(di,dv){
							$("#"+target_select).append('<option value="'+dv.KEY+'" '+(dv.KEY==selected?"selected":"")+'>'+dv.VALUE+'</option>');
						});
					});

					if($.isFunction(callBackFn)){
						callBackFn();
					}
				}
			}
		});
	});
}

// 공통코드를 조회합니다.
function getComCd(targetTbl, grp_cd, conditon){
	var result = [];
	var input = [];

	if( targetTbl == "BA_COM_CD" || targetTbl == "BA_CORP_COM_CD" || targetTbl == "BA_BANK_COM_CD" || targetTbl == "BA_BANK_LBL_CD" ){
		input.push({"TARGET_T":targetTbl , "GRP_CD":grp_cd});
	}else if( targetTbl == "BA_CORP" ){
		input.push({"TARGET_T":targetTbl});
	}else if( targetTbl == "BA_BANK" || targetTbl == "FN_ACCT" ){
		input.push({"TARGET_T":targetTbl , "CONDITION":conditon});
	}

	var jexAjax = jex.createAjaxUtil("comm_0000_01");
	jexAjax.set("REC_CODE" , input);
	jexAjax.setAsync(false);

	jexAjax.execute(function(dat){
		$(dat.RESULT_CODE).each(function(ri,rv){
			if(null2void(rv.CD,"") != ""){
				if(grp_cd == rv.CD){
					var tmp = JSON.parse(rv.DATA);

					$.each(tmp , function(){
						result = this;
					});
				}
			}else{
				var tmp = JSON.parse(rv.DATA);

				$.each(tmp , function(){
					result = this;
				});
			}
		});
	});

	return result;
}

// 코드 Manager 를 가지는 전역 변수 선언
var _CodeMgr;

function getCodeManager(){
	_CodeMgr = jex.plugin.get("CODE_MANAGER");
}

// 코드값 replace 처리
function setCodeMsgValue( msg, values ){
	if( typeof values == "string"){
		msg = msg.replace("%0%", values);
	}else if( typeof values == "object" ){
		for( var i=0; i < values.length; i++ ){
			msg = msg.replace("%"+i+"%", values[i]);
		}
	}

	return msg;
}

// undefined,null 값을 공백으로 리턴합니다.
function null2void(_instance , custom_value){
	return (jex.isNull(_instance)&&custom_value)?custom_value:jex.null2Void(_instance);
}

// iframe사이즈를 조정합니다.
function iframeReSize(){
	var parentObj1 = $(window.parent.document);
	var parentObj2 = $(window.parent.parent.document);
	var doc = document.body;

	$(parentObj1).find("#ifr").attr("height" , "600px");
	$(parentObj2).find("#ifr").attr("height" , "600px");

	if(doc.offsetHeight != 0){
		try{
			$(parentObj1).find("#ifr").attr("height" , (getDocHeight())+"px");
			$(parentObj2).find("#ifr").attr("height" , (getDocHeight())+"px");

			if($(parentObj2).find("#ifr").attr("src") != $(parentObj1).find("#ifr").attr("src")){
				if($(".topBox_type01", parentObj1).children().length > 0){
					if($("#pagingHtml").length == 0){
						$(parentObj1).find("#ifr").attr("height", (getDocHeight()+140)+"px");
						$(parentObj2).find("#ifr").attr("height", (getDocHeight()+140)+"px");
					}else{
						if($("#div_search_area").css("display") == "none"){
							$(parentObj1).find("#ifr").attr("height", (getDocHeight()-50)+"px");
							$(parentObj2).find("#ifr").attr("height", (getDocHeight()-50)+"px");
						}
					}
				}else{
					if(	/www.doksamo.co.kr\/dlo_ebz_main.act/.test(top.location.href)){
						$(parentObj1).find("#ifr").attr("height", (getDocHeight()+100)+"px");
						$(parentObj2).find("#ifr").attr("height", (getDocHeight()+100)+"px");
					}else{
						$(parentObj1).find("#ifr").attr("height", (getDocHeight()+50)+"px");
						$(parentObj2).find("#ifr").attr("height", (getDocHeight()+50)+"px");
					}
				}
			}
		}catch(e){
		}
	}
}

function iframeReSize_self(val){
	var parentObj1 = $(window.parent.document);
	var parentObj2 = $(window.parent.parent.document);
	var doc = document.body;
	var dft = 400;

	if (val != "" ){
		dft = Number(val) + dft;
	}

	$(parentObj1).find("#ifr").attr("height" , dft+"px");
	$(parentObj2).find("#ifr").attr("height" , dft+"px");

	if(doc.offsetHeight != 0){
		try{
			$(parentObj1).find("#ifr").attr("height" , (getDocHeight())+"px");
			$(parentObj2).find("#ifr").attr("height" , (getDocHeight())+"px");

			if($(parentObj2).find("#ifr").attr("src") != $(parentObj1).find("#ifr").attr("src")){
				if($(".topBox_type01", parentObj1).children().length > 0){
					if($("#pagingHtml").length == 0){
						$(parentObj1).find("#ifr").attr("height", (getDocHeight()+140)+"px");
						$(parentObj2).find("#ifr").attr("height", (getDocHeight()+140)+"px");
					}else{
						if($("#div_search_area").css("display") == "none"){
							$(parentObj1).find("#ifr").attr("height", (getDocHeight()-50)+"px");
							$(parentObj2).find("#ifr").attr("height", (getDocHeight()-50)+"px");
						}
					}
				}else{
					$(parentObj1).find("#ifr").attr("height", (getDocHeight()+50)+"px");
					$(parentObj2).find("#ifr").attr("height", (getDocHeight()+50)+"px");
				}
			}
		}catch(e){
		}
	}
}

function getDocHeight(){
	var D = document;

	try{
		this.height = Math.max(Math.max(D.body.scrollHeight,D.documentElement.scrollHeight), Math.max(D.body.offsetHeight, D.documentElement.offsetHeight), Math.max(D.body.clientHeight, D.documentElement.clientHeight));
	}catch (e){
	}

	return this.height;
}

// grid의 cell데이타를 hidden태그로 만들어 줍니다.
function makeHidden(frm , cellData){
	$.each($("#"+frm).find("input[type=hidden]") , function(){
		var frmHiddenId =$(this).attr("id");
		if( frmHiddenId.substring(0,10) == "_celldata_" ){
			$(this).remove();
		}
	});

	var celDataTemp;
	celDataTemp ={"CELL":cellData};

	$.each(celDataTemp.CELL , function(i,v){
		$("#"+frm).append('<input type="hidden" id="_celldata_'+i+'" name="_celldata_'+i+'" value="'+v+'"/>');
	});
}

// 사업자 번호 유효성 check
function bizNoChk(membNo){
	membNo = SelectNum(membNo);

	if(membNo.length == 10){
		a   = membNo.charAt(0);
		b   = membNo.charAt(1);
		c   = membNo.charAt(2);
		d   = membNo.charAt(3);
		e   = membNo.charAt(4);
		f   = membNo.charAt(5);
		g   = membNo.charAt(6);
		h   = membNo.charAt(7);
		i   = membNo.charAt(8);
		Osub= membNo.charAt(9);
		suma = a*1 + b*3 + c*7 + d*1 + e*3 + f*7 + g*1 + h*3;
		sumb = (i*5) %10;
		sumc = parseInt((i*5) / 10,10);
		sumd = sumb + sumc;
		sume = suma + sumd;
		sumf = a + b + c + d + e + f + g + h + i;
		k = sume % 10;
		Modvalue = 10 - k;
		LastVal = Modvalue % 10;

		if(sumf == 0){
			return false;
		}
	}else{
		return false;
	}

	if( Osub == LastVal ){
		return true;
	}else{
		return false;
	}
}

// 주민등록 번호 유효성 check
function juMinNoChk(membNo){
	membNo = SelectNum(membNo);

	if(trim(membNo).length == 13){
		A = membNo.charAt(0);
		B   = membNo.charAt(1);
		C   = membNo.charAt(2);
		D   = membNo.charAt(3);
		E   = membNo.charAt(4);
		F   = membNo.charAt(5);
		G   = membNo.charAt(6);
		H   = membNo.charAt(7);
		I   = membNo.charAt(8);
		J   = membNo.charAt(9);
		K   = membNo.charAt(10);
		L   = membNo.charAt(11);
		Osub= membNo.charAt(12);

		SUMM = A*2 + B*3 + C*4 + D*5 + E*6 + F*7 + G*8 + H*9 + I*2 + J*3 + K*4 + L*5;
		N = SUMM % 11;
		Modvalue = 11 - N;
		LastVal =  Modvalue % 10 ;
	}else{
		return false;
	}

	if( Osub == LastVal ){
		return true;
	}else{
		return false;
	}
}

function bizJuminChk(membNo){
	membNo = SelectNum(membNo);

	if(trim(membNo).length == 13){
		A = membNo.charAt(0);
		B   = membNo.charAt(1);
		C   = membNo.charAt(2);
		D   = membNo.charAt(3);
		E   = membNo.charAt(4);
		F   = membNo.charAt(5);
		G   = membNo.charAt(6);
		H   = membNo.charAt(7);
		I   = membNo.charAt(8);
		J   = membNo.charAt(9);
		K   = membNo.charAt(10);
		L   = membNo.charAt(11);
		Osub= membNo.charAt(12);

		SUMM = A*2 + B*3 + C*4 + D*5 + E*6 + F*7 + G*8 + H*9 + I*2 + J*3 + K*4 + L*5;
		N = SUMM % 11;
		Modvalue = 11 - N;
		LastVal =  Modvalue % 10 ;
	}else if(membNo.length == 10){
		a   = membNo.charAt(0);
		b   = membNo.charAt(1);
		c   = membNo.charAt(2);
		d   = membNo.charAt(3);
		e   = membNo.charAt(4);
		f   = membNo.charAt(5);
		g   = membNo.charAt(6);
		h   = membNo.charAt(7);
		i   = membNo.charAt(8);
		Osub= membNo.charAt(9);
		suma = a*1 + b*3 + c*7 + d*1 + e*3 + f*7 + g*1 + h*3;
		sumb = (i*5) %10;
		sumc = parseInt((i*5) / 10,10);
		sumd = sumb + sumc;
		sume = suma + sumd;
		sumf = a + b + c + d + e + f + g + h + i;
		k = sume % 10;
		Modvalue = 10 - k;
		LastVal = Modvalue % 10;
		if(sumf == 0){
			return false;
		}
	}else{
		return false;
	}

	if( Osub == LastVal ){
		return true;
	}else{
		return false;
	}
}

function SelectNum(sValue){
	if(sValue == "") return "";

	sValue = trim(sValue);

	var sResult="";
	var sNum="0123456789";
	var sChar=".,/:-) ";

	for (var i=0;i<sValue.length;i++){
		if(-1 != sNum.indexOf(sValue.charAt(i))){
			sResult = sResult + sValue.charAt(i);
		}
	}

	return sResult;
}

function trim(as_Data){
	var s_Data = as_Data;
	var i=0;

	for (i=0; i< s_Data.length; i++){
		if(s_Data.substring(i,i+1) != " ") break;
	}

	s_Data = s_Data.substring(i);

	for (i=s_Data.length; i> 0; i--){
		if(s_Data.substring(i,i-1) != " ") break;
	}

	s_Data = s_Data.substring(0,i);
	return s_Data;
}

String.prototype.replaceAll = function( str1, str2 ){
	var temp_str = this;

	if(temp_str == null || temp_str == "undefined" || temp_str == ""){
		return "";
	}else{
		temp_str = temp_str.replace(/(^\s*)|(\s*$)/gi, "");
		temp_str = temp_str.replace(eval("/" + str1 + "/gi"), str2);
		return temp_str;
	}
};

function setNowLoding( input ){
	var lodingBarYn = null2void(input["_LODING_BAR_YN_"],"N");

	if(lodingBarYn == "Y"){
		var loding = jex.plugin.get("JEX_LODING");
		loding.start();
	}
}

function removeLoding( input ){
	var loding = jex.plugin.get("JEX_LODING");

	if(loding)loding.stop();

	return input;
}

// 해당그리드의 선택된 행을 1칸 위로 이동한다.
function jgridRowUp(gridName){
	var g = window[gridName];

	if( !g ) return false;

	var cell = g.selMgr.getCell();
	var idx = !cell ? -1 : cell.getRowIdx();

	if( !g.dataMgr.all.length || idx<0 ){
		jex.printInfo("WM0065");
		return;
	}

	if( idx === 0){
		return;
	}

	var tmp = g.dataMgr.all[idx];
	var colIdx = cell.getColIdx();

	g.dataMgr.all.removeAt(idx);
	g.dataMgr.all.addAt(idx-1, tmp);
	g.dataMgr.refresh();
	g.selMgr.selectCell( JGM.create("Cell",{grid:g,row:idx-1,col:colIdx}) );
}

// 해당그리드의 선택된 행을 1칸 아래로 이동한다.
function jgridRowDown(gridName){
	var g = window[gridName];

	if( !g ) return false;

	var cell = g.selMgr.getCell();
	var idx = !cell ? -1 : cell.getRowIdx();

	if( !g.dataMgr.all.length || idx<0 ){
		jex.printInfo("WM0065");
		return;
	}

	if( idx === g.dataMgr.all.length-1){
		return;
	}

	var tmp = g.dataMgr.all[idx];
	var colIdx = cell.getColIdx();

	g.dataMgr.all.removeAt(idx);
	g.dataMgr.all.addAt(idx+1, tmp);
	g.dataMgr.refresh();
	g.selMgr.selectCell( JGM.create("Cell",{grid:window[gridName],row:idx+1,col:colIdx}) );
}

function dump (arr,level){
	var dumped_text = "";
	if(!level) level = 0;
	var level_padding = "";

	for(var j=0; j < level+1; j++)
		level_padding += " ";

	if(typeof(arr) == 'object'){
		for(var item in arr){
			var value = arr[item];

			if(typeof(value) == 'object'){
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += this.dump(value,level+1);
			}else{
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	}else{
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}

	return dumped_text;

}

// String에대한 전체 Length가져오기
function getByteLength(val){
	var msg = '';
	var vLen = 0;
	var len = 0;

	var chkVal = '';
	var maxLen = 0;

	if(!isNull(val))	{
		chkVal = val;

		for (len=0;len<chkVal.length;len++)	{
			if(escape(chkVal.charCodeAt(len)).length > 4){
				vLen++;
				vLen++; //  UTF-8은 3byte를 사용한다.
			}

			vLen++;
		}
	}

	return vLen;
}

// DataBase Server의 시간정보를 가져온다.
function getServerDateTime(){
	result = "";

	var jexAjax = jex.createAjaxUtil("comm_0000_06_dr01");
	jexAjax.setAsync(false);

	jexAjax.execute(function(dat){
		result = dat.SVRDTTM;
	});

	return result;
}

// 바이트 수로 문자열 자르기..(이체거래시 사용)
function getByteString(vn_str,vn_maxlength){
	var vn_sumlength = 0;
	var vn_restr = '';

	for ( var i = 0; i < vn_str.length; i++){
		if(escape(vn_str.charAt(i)).length > 3){
			vn_length = 2;
		}else if(vn_str.charAt(i) == '<' || vn_str.charAt(i) == '>'){
			vn_length = 4;
		}else{
			vn_length = 1;
		}

		if(vn_maxlength < (vn_sumlength + vn_length)){
			break;
		}

		vn_sumlength += vn_length;
		vn_restr += vn_str.charAt(i);
	}

	return (vn_restr);
}

// 데이터값 변경
function replace(targetStr, searchStr, replaceStr){
	if(targetStr == null || searchStr == null || replaceStr == null) return "";
	var tmpStr = "";
	var tlen = targetStr.length;
	var slen = searchStr.length;
	var i=0;
	var j=0;

	while (i < tlen - slen+1){
		j = i + slen;
		if(targetStr.substring(i,j) == searchStr){
			tmpStr += replaceStr;
			i += slen;
		}else{
			tmpStr += targetStr.substring(i, i + 1);
			i++;
		}
	}

	tmpStr +=  targetStr.substring(i);

	return tmpStr;
}

// 빈값 여부를 리턴한다
function isEmpty(pValue){
	if(pValue == undefined || pValue == null || replace(pValue, / /gi,"") == ""){
		return true;
	}

	return false;
}

// 한글이 포함되어 있는지 여부를 리턴한다.
function isHan(pValue){
	var rtnData = false;

	if(isEmpty(pValue)) rtnData = false;

	for(var idx=0;idx < pValue.length;idx++){
		var c = escape(pValue.charAt(idx));

		if(!rtnData && c.indexOf("%u") > -1 ){
			rtnData = true;
			break;
		}
	}

	return rtnData;
}

// 세션정보를 가져온다.
function getSessionValue(){
	var dataVal = null;
	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");

	jexAjax.setAsync(false);
	jexAjax.execute(function(dat){
		dataVal = dat;
	});

	return dataVal;
}

// 세션정보를 가져온다.
function isLoginSession(){
	var flag = false;
	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");

	jexAjax.setAsync(false);

	jexAjax.execute(function(dat){
		var uspsId = dat.USPS_ID;

		if(null != uspsId && uspsId.length > 1){
			flag = true;
		}
	});

	return flag;
}

/**
 *	전문으로 받은 모든 계좌번호를 가져온다.
 *	@param	String 세팅될 Select ID
 */
function getSessionAccountNum(selectID){
	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");
	jexAjax.setAsync(false);
	jexAjax.execute(function(dat){
		if( dat.COMMON_HEAD.ERROR ){
			alert("오류코드 : " + dat.COMMON_HEAD.CODE + " , 오류메시지 : " + dat.COMMON_HEAD.MESSAGE );
		}else{
			var selectAcctNo = $("#"+selectID);
			var options = $("#"+selectID).attr('options');
			$('option', selectAcctNo).remove();
			options[0] = new Option("선택 하세요", "");
			var html = "";
			$.each(dat.REC1, function(i, v){
				html += "<option value='"+v.ACNO+"'>"+formatter.accountNo(v.ACNO)+"</option>";
			});
			$("#"+selectID).append(html);
		}
	});
}

/**
 *	상위,하위 사용자 구분하여 해당한 모든 계좌번호를 가져온다.
 *	@param	String 세팅될 Select ID
 */
function getAccountAll(selectID){
	var jexAjax = jex.createAjaxUtil("com_ebz_52010_m001");
	jexAjax.set("SUBJECT_TYPE",	"9999");
	jexAjax.setAsync(false);
	jexAjax.execute(function(dat){
		if( dat.COMMON_HEAD.ERROR ){
			alert("오류코드 : " + dat.COMMON_HEAD.CODE + " , 오류메시지 : " + dat.COMMON_HEAD.MESSAGE );
		}else{
			var selectAcctNo = $("#"+selectID);
			var options = $("#"+selectID).attr('options');
			$('option', selectAcctNo).remove();
			options[0] = new Option("선택 하세요", "");
			var html = "";
			$.each(dat.REC2, function(i, v){
				if(null != v.ACNO){
					html += "<option value='"+v.ACNO+"'>"+formatter.accountNo(v.ACNO)+"</option>";
				}
			});
			$("#"+selectID).append(html);
		}
	});
}

/**
 *	하위사용자 계좌번호를 가져온다.
 *	@param	String 세팅될 Select ID
 */
function getLowUserAccountNum(selectID){
	var jexAjax = jex.createAjaxUtil("com_ebz_52010_m001");
	jexAjax.set("SUBJECT_TYPE",	"0000");
	jexAjax.setAsync(false);
	jexAjax.execute(function(dat){
		if( dat.COMMON_HEAD.ERROR ){
			alert("오류코드 : " + dat.COMMON_HEAD.CODE + " , 오류메시지 : " + dat.COMMON_HEAD.MESSAGE );
		}else{
			var selectAcctNo = $("#"+selectID);
			var options = $("#"+selectID).attr('options');
			$('option', selectAcctNo).remove();
			options[0] = new Option("선택 하세요", "");
			var html = "";
			$.each(dat.REC2, function(i, v){
				html += "<option value='"+v.ACNO+"'>"+formatter.accountNo(v.ACNO)+"</option>";
			});
			$("#"+selectID).append(html);
		}
	});
}

/**
 *	지정된종류에 맞게 계좌번호를 가져온다.
 *	@param	String 세팅될 Select ID
 *	@param	String 세팅될 subJectType
 */
function getUserAccountNum(selectID,subjectType){
	var jexAjax = jex.createAjaxUtil("com_ebz_52010_m001");
	jexAjax.set("SUBJECT_TYPE",	subjectType);
	jexAjax.setAsync(false);
	jexAjax.execute(function(dat){
		if( dat.COMMON_HEAD.ERROR ){
			alert("오류코드 : " + dat.COMMON_HEAD.CODE + " , 오류메시지 : " + dat.COMMON_HEAD.MESSAGE );
		}else{
			var selectAcctNo = $("#"+selectID);
			var options = $("#"+selectID).attr('options');
			$('option', selectAcctNo).remove();
			options[0] = new Option("선택 하세요", "");
			var html = "";
			$.each(dat.REC2, function(i, v){
				if(null != v.ACNO){
					html += "<option value='"+v.ACNO+"'>"+formatter.accountNo(v.ACNO)+"</option>";
				}
			});
			$("#"+selectID).append(html);
		}
	});
}

/**
 *	사용자가 관리자인가를 리턴한다.
 *	@return	true - 현재 사용자는 관리자이다.
 *			false - 현재 사용자는 일반 사용자이다.
 */
function isAdminUser(){
	var flagValue = false;
	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");
	jexAjax.setAsync(false);
	jexAjax.execute(function(dat){
		if( dat.COMMON_HEAD.ERROR ){
		}else{
			var uspsId = dat.USPS_ID;
			var lwrUspsId = dat.LWR_USPS_ID;
			if(null != uspsId && uspsId.length > 0 && null != lwrUspsId && lwrUspsId.length > 0){
				if(uspsId == lwrUspsId){
					flagValue = true;
				}else{
					flagValue = false;
				}
			}else{
				flagValue = false;
			}
		}
	});
	return flagValue;
}

var otp_secrYn;			//보안매체사용구분코드
var otp_cardSno1;		//보안카드순번1
var otp_cardSno2;		//보안카드순번2
var sanctn_bizDvcd; 	//전자결재업무구분코드
var sanctn_tdt;			//거래일자(자금수반거래일경우 선언)
var sanctn_trnsAmt;		//거래금액(자금수반거래일경우 선언)

/**
 * 결재구분조회(선결제)
 * @param  		bizDvcd(	전자금융결재업무구분코드), tdt(거래일자), trnfAmt(거래금액), moMngrId(모기업 관리자ID)
 * @returns 	rslt  결재구분 ( 1.결재  2.실행  3.실행/결재  )
 */
function getSanctnDvcd(bizDvcd, tdt, trnfAmt, moMngrId){
	var rslt = 0;
	var jexAjax = jex.createAjaxUtil("com_ebz_21010_J010_d001");

	jexAjax.set("EFN_SANCTN_BIZ_DVCD",bizDvcd);
	jexAjax.set("TDT",tdt);
	jexAjax.set("TRNF_AMT",trnfAmt);
	jexAjax.set("MO_ENPCO_MNGR_ID",moMngrId);

	jexAjax.setAsync(false);

	jexAjax.execute(function(dat){
		rslt = dat.SANCTN_DVCD;
	});

	return rslt;
}

/**
 * 보안카드 순번채번
 */
function setOtpCheck(){
	var jexAjax = jex.createAjaxUtil("com_ebz_25010_1261_m001");

	jexAjax.execute(function(dat){
		return dat;
	});
}

/**
 *	지정된종류와 지정된 코드의 계좌번호만 가져온다.
 *	@param	String 세팅될 Select ID
 */
function getUserCodeAccountNum(selectID,subjectType,subjectCode){
	var jexAjax = jex.createAjaxUtil("com_ebz_52010_m001");
	jexAjax.set("SUBJECT_TYPE",	subjectType);
	jexAjax.set("SUBJECT_CODE",	subjectCode);
	jexAjax.setAsync(false);
	jexAjax.execute(function(dat){
		if( dat.COMMON_HEAD.ERROR ){
			alert("오류코드 : " + dat.COMMON_HEAD.CODE + " , 오류메시지 : " + dat.COMMON_HEAD.MESSAGE );
		}else{
			var selectAcctNo = $("#"+selectID);
			var options = $("#"+selectID).attr('options');
			$('option', selectAcctNo).remove();
			options[0] = new Option("선택 하세요", "");
			var html = "";
			$.each(dat.REC2, function(i, v){
				if(null != v.ACNO){
					html += "<option value='"+v.ACNO+"'>"+formatter.accountNo(v.ACNO)+"</option>";
				}
			});
			$("#"+selectID).append(html);
		}
	});
}

function makeAutoComplete( data, selectID, inputID ){
	if( data.length > 15 ){
		if( inputID != undefined && inputID.length > 0 ){
			var autocomplete = jex.plugin.newInstance("AUTO_COMPLETE","#"+inputID);
			autocomplete.setDataFn	 (function(key){
				var rslt = [];
				for (var i=0; i<data.length; i++) if(this.compareFn(data[i].ACNO,key)) rslt.push(data[i].ACNO);
				return rslt;
			});
			autocomplete.onSelect(function(){
				$.each( data, function(i,v){
					if( v.ACNO == $("#"+inputID).val()){
						$("#"+selectID).val(v.ACNO);
					}
				});
			});
			autocomplete.apply();
		}
	}
}

/**
 *	지정된종류와 지정된 코드의 계좌번호만 가져온다.
 *	@param	String 세팅될 SelectID
 *	@param	String 요구에 맞게 계좌출력(0:요구불,1:출금가능계좌,2:저축성,3:외환,4:대출,5:신탁,7:기타,9:타행)
 *	@param	String 코드
 *	@param	String 코드같은값:TRUE,다른값:FALSE
 */
function getChoCodeAccountNum(selectID,subjectType,subjectCode,flag){
	var jexAjax = jex.createAjaxUtil("com_ebz_52010_m001");
	jexAjax.set("SUBJECT_TYPE",	subjectType);
	jexAjax.set("SUBJECT_CODE",	subjectCode);
	jexAjax.set("SUBJECT_FLAG",	flag);
	jexAjax.setAsync(false);
	jexAjax.execute(function(dat){
		var selectAcctNo = $("#"+selectID);
		var options = $("#"+selectID).attr('options');
		$('option', selectAcctNo).remove();
		options[0] = new Option("선택 하세요", "");
		var html = "";
		$.each(dat.REC2, function(i, v){
			if(null != v.ACNO){
				html += "<option value='"+v.ACNO+"'>"+formatter.accountNo(v.ACNO)+"</option>";
			}
		});
		$("#"+selectID).append(html);
	});
}

/**
 * 개인사용자인지, 법인 사용자 인지를 리턴한다.
 * 개인사업자 : true, 법인사업자 : false
 */
function isOrdinaryUser(){
	var flagValue = false;
	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");
	jexAjax.setAsync(false);
	jexAjax.execute(function(dat){
		if( dat.COMMON_HEAD.ERROR ){
		}else{
			var efnDelrDvcd = dat.EFN_DELR_DVCD;
			if(efnDelrDvcd == ""){
				flagValue = false;
			}else{
				var flag = parseInt(efnDelrDvcd);
				if( (flag >= 1 && flag <= 8) || (flag >= 41 && flag <= 44) || (flag >= 62 && flag <= 65) ){
					flagValue = true;	//개인사업자
				}else{
					flagValue = false;	//법인사업자
				}
			}
		}
	});
	return flagValue;
}

/**
 * 계좌번호로 계좌과목코드인지를 판단한다.
 * @param	upm String 과목코드
 * @param	gye String 계좌번호
 * @returns TRUE,FALSE
 */
function isDirectTransfer(upm, gye){
	var i;
	var gwa  = "";
	if(gye.substring(0,1) == "5" || gye.substring(0,1) == "6" || gye.substring(0,1) == "7" || gye.substring(0,1) == "8" || gye.substring(0,3) == "910" || gye.substring(0,3) == "931" || gye.substring(0,3) == "935" || gye.substring(0,3) == "940" || gye.substring(0,3) == "960"){
		gwa = gye.substring(0,3);    // 과목코드 앞에 3자리 선택
	}else{
		gwa = gye.substring(3,5);    // 과목코드 앞에 3자리 다음 중간 2자리 선택
	}

	gwa01_ar = ['01','02','03','04','05','06','07','08','09','10','12','13','501','502','503','504','505','506','508','509'];   //요구불  (전문:1010)
	gwa02_ar = ['17','517'];						// 11과목삭제(기타계좌조회에서 조회허용)  환매채예금						 //예금	   (전문:1080)
	gwa03_ar = ['19','20','21','22','23','24','25','26','27','28','519','520','521','521','523','524','525','526','527','528'];
	gwa04_ar = ['40','41','42','43','44','45','46','47','48','49','641','644','645','646','652','654','656'];
	gwa05_ar = ['31','32','531','532'];
	gwa06_ar = ['33','34','37','533','534','537'];
	gwa07_ar = ['50','51','52','53','54','55','56','57','58','59','60','61','62','63','64','65','66','67','68','69','70','72','73','74','75','550','551','552','553','554','555','556','557','558','559','560','561','562','563','564','565','566','567','568','569','570','572','573','574','575'];
	gwa08_ar = ['95','595'];
	gwa09_ar = ['91','910','92','931','93','935','94','940','96','960'];     // 모금계좌(가상계좌)관련 수정
	gwa10_ar = ['11','15','30','511','515','530']; // 11과목추가(11과목 전계좌조회에서 상세조회허용) //예금	(전문:1080)
	gwa11_ar = ['11','15','17','511','515','517'];
	gwa12_ar = ['44','644'];						// 여신 한도대출
	gwa13_ar = ['75','575'];						// 퇴직연금 신탁
	gwa14_ar = ['60','560'];						// 특정연금 신탁

	// 새로운 배열 선언
	var newGwa = [];
	newGwa = eval("gwa"+upm+"_ar");

	// 넘겨받은 배열값 비교하여 리턴 upm에 해당하는 배열값중 계좌과목(gwa)와 비교하여 같을경우 return
	for (i=0;i< eval("gwa"+upm+"_ar.length");i++){
		if( newGwa[i] == gwa ){
			return true;
			break;
		}
	}

	return false;
}

/**
 * 계좌번호로 계좌과목코드를 리턴한다.
 * @param	acno String 계좌번호
 * @returns 계좌과목코드
 */
function getDirectTransfer(acno){
	var gwa = "";
	if(acno.length < 9){
		return acno;
	}
	if(acno.substring(0,3) == "815"){
		return acno.substring(3,5);
	}

	if(acno.substring(0,1) == "5"
		|| acno.substring(0,1) == "6"
		|| acno.substring(0,1) == "7"
		|| acno.substring(0,1) == "8"
		|| acno.substring(0,3) == "910"
		|| acno.substring(0,3) == "931"
		|| acno.substring(0,3) == "935"
		|| acno.substring(0,3) == "940"
		|| acno.substring(0,3) == "960"){
		gwa = acno.substring(0,3);    // 과목코드 앞에 3자리 선택
	}else{
		gwa = acno.substring(3,5);    // 과목코드 앞에 3자리 다음 중간 2자리 선택
	}
	return gwa;
}

/**
 *	건별이체출금가능금액을 가져온다.
 * @param	acno 계좌번호
 * @returns 건별이체출금가능금액
 */
function getAcctPayCapa(acno){
	var datValue = null;
	var jexAjax = jex.createAjaxUtil("pay_ebz_00001_1010_t001");
	jexAjax.set("EBZ_WEB_WORK_COMM" , acno);
	jexAjax.setAsync(false);
	jexAjax.execute(function(dat){
		datValue = dat;
	});
	return datValue;
}

/**
 *	선택된 요청계좌와 맞지 않으면 URL위치로 이동한다.
 *	@param	String accno :선택된 요청계좌
 *	@param	String url :이동URL
 */
function chkUserAcct(accno, url){
	var flag = false;
	var jexAjax = jex.createAjaxUtil("com_ebz_52010_m001");
	jexAjax.set("SUBJECT_TYPE",	"9999");
	jexAjax.setAsync(false);
	jexAjax.execute(function(dat){
		$.each(dat.REC2, function(i, v){
			if((null != v.ACNO) && (v.ACNO == accno)){
				flag = true;
			}
		});
	});
	if(!flag){
		jex.printError("", "등록되지 않은 계좌입니다.");
		location.href = url;
	}
}

/**
 *	B2B특정 지점 코드에 대한 지점명을 리턴한다.
 *	@param	code 지점코드
 *	@param	지점명
 */
function getB2BBranchName(code){
	var datValue = null;
	var jexAjax = jex.createAjaxUtil("com_ebz_B2BBranchName");
	jexAjax.set("KFTC_GRCD",	code);
	jexAjax.setAsync(false);
	jexAjax.execute(function(dat){
		datValue = dat.BRC_NM;
	});

	return datValue;
}

/**
 *  금융기관 공통코드에 대한 은행/지점명을 리턴한다.
 *  @param  code 지점코드
 *  @param  지점명
 */
function getBrnName(code){
	if(jex.null2Void(code).length < 1){
		return "";
	}
	code = $.trim(code);
	var len = code.length;
	if(len == 7){
	}else if(len == 6){
		code = "0"+code;
	}else if(len == 5){
		code = "0"+code;
	}else if(/^3|4/.test(len)){
		code = "031"+code;
	}else{
		return code;
	}
	var datValue = null;
	var jexAjax = jex.createAjaxUtil("com_ebz_BrnName");
	jexAjax.set("KFTC_GRCD", code.substring(0, 6));
	jexAjax.setAsync(false);
	jexAjax.execute(function(dat){
		datValue = dat.BRCH_NM;
	});
	return datValue;
}

/**
 * #입력값에 숫자만 있는지 체크
 */
function isNumber(input){
	var chars = ".0123456789";
	return containsCharsOnly(input,chars);
}

/**
 * #입력값이 특정 문자(chars)만으로 되어있는지 체크
 * 특정 문자만 허용하려 할 때 사용
 * ex) if(!containsCharsOnly(form.blood,"ABO")){
 *         alert("혈액형 필드에는 A,B,O 문자만 사용할 수 있습니다.");
 *     }
 */
function isContainsCharsOnly(input,chars){
	for (var inx = 0; inx < input.value.length; inx++){
		if(chars.indexOf(input.value.charAt(inx)) == -1)

			return false;
	}
	return true;
}

/**
 * @설명 : Ajax Json 데이터 자동 셋팅(ID값 이용 반복부 제외)
 * @param data - JSON DATA
 * @returns : 없음
 * @예제 : putAllData(data);
 */
function putAllData(data){
	$.each(data , function(k,v){
		var isCmp = false;
		if($("#"+k).attr("type")!=undefined && ($("#"+k).attr("type")=="text" || $("#"+k).attr("type")=="hidden")){
			if($("#"+k).attr("noputfield")==undefined || $("#"+k).attr("noputfield")=="" || $("#"+k).attr("noputfield")=="N"){
				$("#"+k).val(trim(v));
				isCmp = true;
			}
		}else if($("select[name='"+k+"']")!=undefined && $("select[name='"+k+"']").length>0){
			if($("#"+k).attr("noputfield")==undefined || $("#"+k).attr("noputfield")=="" || $("#"+k).attr("noputfield")=="N"){
				$("select[name='"+k+"']").val(trim(v));
				isCmp = true;
			}
		}else if($(":radio[name='"+k+"']")!=undefined && $(":radio[name='"+k+"']").length>0){
			if($("#"+k).attr("noputfield")==undefined || $("#"+k).attr("noputfield")=="" || $("#"+k).attr("noputfield")=="N"){
				$(":radio[name='"+k+"'][value='"+trim(v)+"']").attr("checked","checked");
				isCmp = true;
			}
		}else if($(":checkbox[name='"+k+"']")!=undefined && $(":checkbox[name='"+k+"']").length>0){
			if($("#"+k).attr("noputfield")==undefined || $("#"+k).attr("noputfield")=="" || $("#"+k).attr("noputfield")=="N"){
				$(":checkbox[name='"+k+"'][value='"+trim(v)+"']").attr("checked","checked");
				isCmp = true;
			}
		}
		if(!isCmp){
			var formvalue = v;
			if($("#"+k).attr("noputfield")==undefined || $("#"+k).attr("noputfield")=="" || $("#"+k).attr("noputfield")=="N"){

				if($("#"+k).attr("putgrpcd")!=undefined &&$("#"+k).attr("putgrpcd")!=""){
					formvalue = jex.plugin.get("CATI_CODEMGR").getCodeData($("#"+k).attr("putgrpcd"),formvalue);
				}

				if($("#"+k).attr("putformat")!=undefined &&$("#"+k).attr("putformat")!=""){
					if($("#"+k).attr("putformatmask")!=undefined &&$("#"+k).attr("putformatmask")!=""){
						formvalue = eval("formatter."+$("#"+k).attr("putformat")+"('"+formvalue+"','"+$("#"+k).attr("putformatmask")+"')");
					}else{
						formvalue = eval("formatter."+$("#"+k).attr("putformat")+"('"+formvalue+"')");
					}
				}
				try{
					$("#"+k).html(formvalue);
				}catch(e){}
			}
		}
	});
}

/**
 *	form Object를 가져온다
 */
function getForm(formId){
	for(var i=0;i<document.forms.length;i++){
		if(formId == document.forms[i].id){
			return document.forms[i];
		}
	}
}

//앞뒤 공백제거
function trim(a){
	return(ltrim(rtrim(a)));
}

//앞 공백제거
function ltrim(a){
	var i;
	i = 0;
	while (a.substring(i,i+1) == ' ' || a.substring(i,i+1) == '　')  i = i + 1;
	return a.substring(i);
}


//뒤 공백 제거
function rtrim(a){
	var i = a.length - 1;
	while (i >= 0 && (a.substring(i,i+1) == ' ' || a.substring(i,i+1) == '　')) i = i - 1;
	return a.substring(0,i+1);
}

//영문, 숫자로만 구성되어있는지 체크하는 함수
function isAlphaNumeric(str){
	var re = /[a-zA-z0-9]/;
	for (var i = 0; i < str.length; i++){
		if(!re.test(str.charAt(i))){
			return false;
		}
	}
	return true;
}

//영문 소문자, 숫자로만 구성되어있는지 체크하는 함수
function isSmallAlphaNumeric(str){
	var re = /[a-z0-9]/;
	for (var i = 0; i < str.length; i++){
		if(!re.test(str.charAt(i))){
			return false;
		}
	}
	return true;
}

///숫자로만 구성되어있는지 체크하는 함수 ///
function isNumeric(str){
	var re = /[0-9]/;
	for (var i = 0; i < str.length; i++){
		if(!re.test(str.charAt(i))){
			return false;
		}
	}
	return true;
}

function lpad(num){
	if( num<10 ) return "0"+num;
	else return num;
}

/**
 * 인증서
 */
function moaCert(form){
	moa_login("CertPolicy", form, moaCertCallback);
}

/**
 * 인증서
 */
function moaCertCallback(retcode){
	retcode = jex.null2Str(retcode, '');
	if(retcode == '1'){   // 성공
		var moaSecuredata = $("#moa_securedata").val();
		var jexAjax = jex.createAjaxUtil("com_ebz_certdata");
		jexAjax.set("SIGN_DATA",	moaSecuredata);
		$("#moa_securedata").val("");
		jexAjax.setAsync(false);
		jexAjax.execute(function(dat){
			moaCertResult();
		});
	}else{
		alert("실패");
	}
}


var _SETSIGNVALUE		= "";
var _SETSIGNCHECKVALUE	= "";

/**
 * 전자서명
 */
function moaSign(form){
	var pt = encodeURIComponent(_SETSIGNVALUE);
	moa_sign("SignPolicy", form, moaSignCallback, pt);
}

/**
 * 전자서명
 */
function moaSignCallback(retcode){
	retcode = jex.null2Str(retcode, '');
	if(retcode == '1'){   // 성공
		var moaSecuredata = $("#moa_securedata").val();
		$("#moa_securedata").val("");
		signSubmit(moaSecuredata);
	}
}

function signSubmit(moaSecuredata){
	var jexAjax = jex.createAjaxUtil("com_ebz_signdata");
	jexAjax.set("SIGN_DATA",	moaSecuredata);
	jexAjax.set("CHECK_DATA",	"{"+_SETSIGNCHECKVALUE+"}");
	jexAjax.set("SIGN_SAVE_DATA",	moaSecuredata);
	moaSecuredata = "";
	_SETSIGNCHECKVALUE = "";
	jexAjax.setAsync(false);
	jexAjax.execute(function(dat){
		moaSignResult();
	});
}

function setSignValue(signid, signname, str,realdata ){
	if(str==undefined || trim(str)==""){
		str = $("#"+signid).val();
	}
	if(realdata==undefined || trim(realdata)==""){
		realdata = $("#"+signid).val();
	}

	if(str==undefined){
		str = "";
	}
	if(realdata==undefined){
		realdata = "";
	}
	if(_SETSIGNVALUE.length == 0){
		_SETSIGNVALUE 		+= signname + "=" + str;
		_SETSIGNCHECKVALUE   += "\""+signid +"\":\"" + realdata+"\"";
	}else{
		_SETSIGNVALUE 		+= "&" + signname + "=" + str;
		_SETSIGNCHECKVALUE   += ",\""+signid +"\":\"" + realdata+"\"";
	}
}

var lastPageMemory = 1;
var pageArrary = [];
var nextButton = true;
function hostPaging(pageIndex,ontiInqYn,contiInqKeyVal,submitMethodName, pageViewId){
	var pagingHtml = "";

	if(pageIndex == 1 && lastPageMemory == 1){
		pageArrary = [];
		pageArrary.push("");
	}

	if(pageIndex > lastPageMemory){
		maxPageIndex = pageIndex;
		lastPageMemory = pageIndex;
	}

	for(var i = 0; i < lastPageMemory; i++){
		var pageNum = i +1;
		if(pageNum == pageIndex){
			pagingHtml += "&nbsp;<a href=\"javascript:"+submitMethodName+"(" + pageNum + ")\" class='on'>" + pageNum + "</a>";
		}else{
			pagingHtml += "&nbsp;<a href=\"javascript:"+submitMethodName+"(" + pageNum + ")\" class='off'>" + pageNum + "</a>";
		}
	}
	//다음페이지가 있을때
	if(nextButton && ontiInqYn == "Y"){
		if(pageIndex == lastPageMemory){
			pageArrary.push(contiInqKeyVal);
		}
		var nextPage = 0;
		nextPage = lastPageMemory+1;
		pagingHtml += "&nbsp;<a href=\"javascript:"+submitMethodName+"(" + nextPage + ")\" class='on'>next</a>";
	}else{
		nextButton = false;
	}

	$("#"+pageViewId).html("");
	$("#"+pageViewId).html(pagingHtml);

}

function hostKeyValue(pageIndex){
	if(pageIndex == 1){
		return "";
	}else{
		return pageArrary[pageIndex-1];
	}
}

//페이지 이동시에 개인/기업 인지 구분해서 세션을 삭제한다.(세션이 없으면 로그인 페이지로 이동한다.)
function changePage(userDvVal,movePage){
	var jexAjax = jex.createAjaxUtil("com_ebz_remove_session");
	jexAjax.set("USER_DV_VAL" , userDvVal);
	jexAjax.execute(function(dat){
		if(dat.LOGIN_SESS_CONN_YN == "Y"){
			location.href = movePage;
		}else{
			linkFramSetBankingPage("https://banking.dgb.co.kr/com_ebz_11010_J001.act");
		}
	});
}

//페이지 이동시에 개인/기업 인지 구분해서 세션을 삭제한다.
function pibAndCidChangePage(userDvVal,movePage){
	var pibMmessage = _CodeMgr.getCodeMsg('RSPS_CD', 'VAL1705');
	var cibMmessage = _CodeMgr.getCodeMsg('RSPS_CD', 'VAL1706');
	var message = "";
	var gubun   = false;
	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");
	var dvVal   = "";

	jexAjax.setAsync(false);

	jexAjax.execute(function(dat){
		if(null != dat){
			dvVal = dat.USER_DV_VAL;

			if(dvVal == "1" && (userDvVal == "B3" || userDvVal == "H2")){
				message = pibMmessage;
				gubun   = true;
			}else if(dvVal == "2" && (userDvVal == "B1" || userDvVal == "H1")){
				message = cibMmessage;
				gubun   = true;
			}else if(dvVal == "3" && (userDvVal == "B1" || userDvVal == "H1")){
				message = cibMmessage;
				gubun   = true;
			}
		}
	});

	if(gubun){
		if(confirm((message.replace("..",".\n\n").replace("..",".\n\n")))){
			var jexAjax = jex.createAjaxUtil("com_ebz_remove_session");
			jexAjax.set("USER_DV_VAL" , userDvVal);

			jexAjax.execute(function(dat){
				dvVal = null;
				pibAndCidChangePage_sub();
			});
		}
	}else{
		pibAndCidChangePage_sub();
	}

	function pibAndCidChangePage_sub(){
		var objLk ={'HP_BK':'BK','LOCATION_PAGE': movePage};
		dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));

		if(/_main.act/.test(movePage) && dvVal){
			location.href = movePage;
		}else{
			location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");
		}
	}
}

function linkFramSetBankingPage(movePage){
	var tmpHpMnujob  = 0;
	var LocationPage = "";

	try{
		var tmpHpMnuObj = dataCtrl.getObjData("MENU_LOCATION");

		if(tmpHpMnuObj == null || tmpHpMnuObj.MENU_LOCATION == null || !/_/.test(tmpHpMnuObj.MENU_LOCATION)){
			tmpHpMnujob = 1;
		}

		LocationPage = tmpHpMnuObj.LOCATION_PAGE;
	}catch(e){
		tmpHpMnujob = 1;
	}

	try{
		if(tmpHpMnujob == 1){
			var tmpHpNavObj = dataCtrl.getObjData("_SES_NAVI_CONTS");

			if(tmpHpNavObj != null && LocationPage.indexOf(tmpHpNavObj.LOCATION_PAGE) > -1){
				var tmpHpMnuObj =
				{
					'MENU_LOCATION':tmpHpNavObj.MENU_LOCATION,
					'MENU_DEPTH'   :tmpHpNavObj.MENU_DEPTH   ,
					'ID'           :tmpHpNavObj.ID           ,
					'NUM'          :tmpHpNavObj.NUM          ,
					'LOCATION_PAGE':tmpHpNavObj.LOCATION_PAGE,
					'HP_BK'        :'HP'                     ,
					'BACK_URL'     :tmpHpNavObj.BACK_URL
				};

				dataCtrl.delObjData("MENU_LOCATION");
				dataCtrl.setObjData("MENU_LOCATION", JSON.stringify(tmpHpMnuObj));
			}
		}
	}catch(e){
	}

	var objLk ={'HP_BK':'BK','LOCATION_PAGE': movePage};
	dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));
	location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");
}


//로그인인 안되면 로그인 후에 페이지로 이동 할 경우에 사용
function hpLinkMenuPage(linkValue,id,num,linkPage){
	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");
	jexAjax.execute(function(dat){
		if(null != dat){
			var userDvVal = dat.USER_DV_VAL;
			if(userDvVal == "2" || userDvVal == "3"){
				linkMenuPage(linkValue,id,num,linkPage);
			}else if(userDvVal == "1"){
				linkMenuPage(linkValue,id,num,linkPage);
			}else{
				linkMenuPage(linkValue,id,num,linkPage);
				var objLk ={'HP_BK':'BK','LOCATION_PAGE': "com_ebz_11010_J001.act"};
				dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));
				location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");
			}
		}else{
			linkMenuPage(linkValue,id,num,linkPage);
			var objLk ={'HP_BK':'BK','LOCATION_PAGE': "com_ebz_11010_J001.act"};
			dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));
			location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");
		}
	});
}

function bankingLinkMenuPage(depth,ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,strtPgDrctrNm,pibMainPage,cibMainPage,dv){
    var strSubUrl = _CodeMgr.getCodeMsg('SUB_URL', '1002');// com_ebz_cib_sub_main.act
    if( strSubUrl.indexOf('com_ebz_cib_sub_main') < 0 )
    {
        cibMainPage = strSubUrl;
    }
    var jexAjax = jex.createAjaxUtil("com_ebz_user_info");
	jexAjax.execute(function(dat){
		if(null != dat){
			var userDvVal = dat.USER_DV_VAL;
			var userDv = userDvVal;
			try{
				if(dv==undefined){
					userDv = userDvVal;
				}else{
					userDv = dv;
				}
			}catch(e){}

			if(("4" != userDv) && (userDvVal != userDv)){
				var objLk ={'HP_BK':'BK','LOCATION_PAGE': "com_ebz_11010_J001.act"};
				dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));
				location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");
			}else{
				if(userDvVal == "2" || userDvVal == "3"){
					bkLinkMenuPage(depth,ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,"A02",strtPgDrctrNm,cibMainPage,pibMainPage,cibMainPage);
				}else if(userDvVal == "1"){
					bkLinkMenuPage(depth,ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,"A01",strtPgDrctrNm,pibMainPage,pibMainPage,cibMainPage);
				}else{
					bkLinkMenuPage(depth,ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,"",strtPgDrctrNm,"",pibMainPage,cibMainPage);
					var objLk ={'HP_BK':'BK','LOCATION_PAGE': "com_ebz_11010_J001.act"};
					dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));
					location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");
				}
			}
		}else{
			bkLinkMenuPage(depth,ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,"",strtPgDrctrNm,"",pibMainPage,cibMainPage);
			var objLk ={'HP_BK':'BK','LOCATION_PAGE': "com_ebz_11010_J001.act"};
			dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));
			location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");
		}
	});
}

function bankingLinkMenuPage2(depth,ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,strtPgDrctrNm,strtPgDrctrNm2,pibMainPage,cibMainPage,dv){
	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");
	jexAjax.execute(function(dat){
		if(null != dat){
			var userDvVal = dat.USER_DV_VAL;
			var userDv = userDvVal;
			try{
				if(dv==undefined){
					userDv = userDvVal;
				}else{
					userDv = dv;
				}
			}catch(e){}

			if(("4" != userDv) && (userDvVal != userDv)){
				var objLk ={'HP_BK':'BK','LOCATION_PAGE': "com_ebz_11010_J001.act"};
				dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));
				location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");
			}else{
				if(userDvVal == "2" || userDvVal == "3"){
					bkLinkMenuPage(depth,ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,"A02",strtPgDrctrNm2,cibMainPage,pibMainPage,cibMainPage);
				}else if(userDvVal == "1"){
					bkLinkMenuPage(depth,ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,"A01",strtPgDrctrNm,pibMainPage,pibMainPage,cibMainPage);
				}else{
					if(!confirm("해당상품의 가입은 로그인이 필요합니다.\n\n로그인 페이지로 이동하시겠습니까?")){
						return;
					}

					loginPage();

				}
			}
		}else{

			bkLinkMenuPage(depth,ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,"",strtPgDrctrNm,"",pibMainPage,cibMainPage);
			var objLk ={'HP_BK':'BK','LOCATION_PAGE': "com_ebz_11010_J001.act"};
			dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));
			location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");
		}
	});
}

function bkLinkMenuPage(depth,ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,toplvlMnuId,strtPgDrctrNm,mainPage,pibMainPage,cibMainPage){
    var strSubUrl = _CodeMgr.getCodeMsg('SUB_URL', '1002');// com_ebz_cib_sub_main.act
    if( strSubUrl.indexOf('com_ebz_cib_sub_main') < 0 )
    {
        cibMainPage = strSubUrl;
    }
    if("2" == depth){
		bkLinkTwoDepthOpen(ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,toplvlMnuId,strtPgDrctrNm,mainPage,pibMainPage,cibMainPage);
	}else if("3" == depth){
		bkLinkThDepthOpen(ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,toplvlMnuId,strtPgDrctrNm,mainPage,pibMainPage,cibMainPage);
	}else if("4" == depth){
		bkLinkFoDepthOpen(ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,toplvlMnuId,strtPgDrctrNm,mainPage,pibMainPage,cibMainPage);
	}else if("5" == depth){
		bkLinkFiDepthOpen(ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,toplvlMnuId,strtPgDrctrNm,mainPage,pibMainPage,cibMainPage);
	}
}

//개인, 기업 메뉴ID가 틀린경우 메뉴링크 처리
function cyberLinkMenuPage(gubun){
	var tmpObj ={};
	var objLk ={'HP_BK':'BK','LOCATION_PAGE': "com_ebz_11010_J001.act"};

	dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));
	dataCtrl.delObjData("MENU_LOCATION");

	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");
	jexAjax.execute(function(dat){
		if( jex.null2Void(dat.USER_DV_VAL) == "" ){
			if( gubun == "DOKDO" ){
				tmpObj ={'LOCATION_PAGE':'com_ebz_cdd_pib_main.act', 'IBNK_MNU_CD':'X080204','IBNK_UPPER_MNU_CD':'A010502','MNU_LEVL_NO':'4','TOPLVL_MNU_ID':'A01','STRT_PG_DRCTR_NM':'dep', "CYBER_GBN":"DOKDO" };
			}else{
				tmpObj ={'LOCATION_PAGE':'com_ebz_cgj_pib_main.act', 'IBNK_MNU_CD':'X080204','IBNK_UPPER_MNU_CD':'A010502','MNU_LEVL_NO':'4','TOPLVL_MNU_ID':'A01','STRT_PG_DRCTR_NM':'dep', "CYBER_GBN":"CGJ" };
			}

			dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
			location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");
		}else if(null != dat){
			var userDvVal = dat.USER_DV_VAL;

			if(userDvVal == "2" || userDvVal == "3"){
				if( gubun == "DOKDO" ){
					tmpObj ={'LOCATION_PAGE':'com_ebz_cdd_cib_main.act', 'IBNK_MNU_CD':'X080204','IBNK_UPPER_MNU_CD':'A020804','MNU_LEVL_NO':'4','TOPLVL_MNU_ID':'A02','STRT_PG_DRCTR_NM':'dep', "CYBER_GBN":"DOKDO" };
					dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
					location.href = _CodeMgr.getCodeMsg("CODE_URL","1001") + 'com_ebz_cdd_cib_main.act';
				}else{
					tmpObj ={'LOCATION_PAGE':'com_ebz_cgj_cib_main.act', 'IBNK_MNU_CD':'X080204','IBNK_UPPER_MNU_CD':'A020804','MNU_LEVL_NO':'4','TOPLVL_MNU_ID':'A02','STRT_PG_DRCTR_NM':'dep', "CYBER_GBN":"CGJ" };
					dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
					location.href = _CodeMgr.getCodeMsg("CODE_URL","1001") + 'com_ebz_cgj_cib_main.act';
				}
			}else if(userDvVal == "1"){
				if( gubun == "DOKDO" ){
					tmpObj ={'LOCATION_PAGE':'com_ebz_cdd_pib_main.act', 'IBNK_MNU_CD':'X080204','IBNK_UPPER_MNU_CD':'A010502','MNU_LEVL_NO':'4','TOPLVL_MNU_ID':'A01','STRT_PG_DRCTR_NM':'dep', "CYBER_GBN":"DOKDO" };
					dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
					location.href = _CodeMgr.getCodeMsg("CODE_URL","1001") + 'com_ebz_cdd_pib_main.act';
				}else{
					tmpObj ={'LOCATION_PAGE':'com_ebz_cgj_pib_main.act', 'IBNK_MNU_CD':'X080204','IBNK_UPPER_MNU_CD':'A010502','MNU_LEVL_NO':'4','TOPLVL_MNU_ID':'A01','STRT_PG_DRCTR_NM':'dep', "CYBER_GBN":"CGJ" };
					dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
					location.href = _CodeMgr.getCodeMsg("CODE_URL","1001") + 'com_ebz_cgj_pib_main.act';
				}
			}else{
				if( gubun == "DOKDO" ){
					tmpObj ={'LOCATION_PAGE':'com_ebz_cdd_pib_main.act', 'IBNK_MNU_CD':'X080204','IBNK_UPPER_MNU_CD':'A010502','MNU_LEVL_NO':'4','TOPLVL_MNU_ID':'A01','STRT_PG_DRCTR_NM':'dep', "CYBER_GBN":"DOKDO" };
					dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
					location.href = _CodeMgr.getCodeMsg("CODE_URL","1001") + 'com_ebz_cdd_pib_main.act';
				}else{
					tmpObj ={'LOCATION_PAGE':'com_ebz_cgj_pib_main.act', 'IBNK_MNU_CD':'X080204','IBNK_UPPER_MNU_CD':'A010502','MNU_LEVL_NO':'4','TOPLVL_MNU_ID':'A01','STRT_PG_DRCTR_NM':'dep', "CYBER_GBN":"CGJ" };
					dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
					location.href = _CodeMgr.getCodeMsg("CODE_URL","1001") + 'com_ebz_cgj_pib_main.act';
				}
			}
		}
	});
}
function autoBackbkLinkMenuPage(depth,ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,toplvlMnuId,strtPgDrctrNm,mainPage,pibMainPage,cibMainPage){
	dataCtrl.delObjData("MENU_LOCATION");
	var ibnkUpperMnuCd = "";
	var locationPage = _CodeMgr.getCodeMsg("CODE_URL","1043");
	if(toplvlMnuId == "A01"){
		ibnkUpperMnuCd = pibIbnkUpperMnuCd;
		if( jex.lang() == "EN"){
			locationPage = "com_ebz_eng_main";
		}else if(jex.lang() == "ZH" ){
			locationPage = "com_ebz_chn_main";
		}else{
			locationPage = pibMainPage;
		}
	}else if(toplvlMnuId == "A02"){
		ibnkUpperMnuCd = cibIbnkUpperMnuCd;
		if( jex.lang() == "EN"){
			locationPage = "com_ebz_eng_main";
		}else if(jex.lang() == "ZH" ){
			locationPage = "com_ebz_chn_main";
		}else{
			locationPage = cibMainPage;
		}
	}
	var obj ={'IBNK_MNU_CD':ibnkMnuCd,'IBNK_UPPER_MNU_CD':ibnkUpperMnuCd,'MNU_LEVL_NO':depth,'TOPLVL_MNU_ID':toplvlMnuId,'STRT_PG_DRCTR_NM':strtPgDrctrNm, 'LOCATION_PAGE':locationPage };
	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));
	if(null == locationPage || locationPage.length < 1){
		location.href = getUrl("cdd_pib");
	}
	location.href = locationPage+".act";
}

//개인, 기업 메뉴ID가 틀린경우 로그인 처리
function autoBackbkLinkMenuPage3(pibDepth,cibDepth,p_ibnkMnuCd, c_ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,toplvlMnuId,strtPgDrctrNm,mainPage,pibMainPage,cibMainPage){
	dataCtrl.delObjData("MENU_LOCATION");
	var ibnkUpperMnuCd = "";
	var locationPage = "";

	if(toplvlMnuId == "A01"){
		ibnkUpperMnuCd = pibIbnkUpperMnuCd;
		if( jex.lang() == "EN"){
			locationPage = "com_ebz_eng_main";
		}else if(jex.lang() == "ZH" ){
			locationPage = "com_ebz_chn_main";
		}else{
			locationPage = pibMainPage;
		}
	}else if(toplvlMnuId == "A02"){
		ibnkUpperMnuCd = cibIbnkUpperMnuCd;
		if( jex.lang() == "EN"){
			locationPage = "com_ebz_eng_main";
		}else if(jex.lang() == "ZH" ){
			locationPage = "com_ebz_chn_main";
		}else{
			locationPage = cibMainPage;
		}
	}

	var obj ={'IBNK_MNU_CD':'','P_IBNK_UPPER_MNU_CD':pibIbnkUpperMnuCd,'C_IBNK_UPPER_MNU_CD':cibIbnkUpperMnuCd, 'TOPLVL_MNU_ID':toplvlMnuId, 'MNU_LEVL_NO':'','STRT_PG_DRCTR_NM':strtPgDrctrNm, 'P_IBNK_MNU_CD': p_ibnkMnuCd, 'C_IBNK_MNU_CD': c_ibnkMnuCd, 'P_IBNK_MNU_CD': p_ibnkMnuCd, 'C_IBNK_MNU_CD': c_ibnkMnuCd, 'P_DEPTH': pibDepth, 'C_DEPTH': cibDepth, 'P_LOCATION':pibMainPage, 'C_LOCATION': cibMainPage };
	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));
}

//로그인 체크 필요없는 페이지링크
function bkNotLoginLinkPage(depth,ibnkMnuCd,ibnkUpperMnuCd,toplvlMnuId,strtPgDrctrNm,mainPage){
	var obj ={'IBNK_MNU_CD':ibnkMnuCd,'IBNK_UPPER_MNU_CD':ibnkUpperMnuCd,'MNU_LEVL_NO':depth,'TOPLVL_MNU_ID':toplvlMnuId,'STRT_PG_DRCTR_NM':strtPgDrctrNm,'PIB_IBNK_UPPER_MNU_CD':"",'CIB_IBNK_UPPER_MNU_CD':"",'LOCATION_PAGE':mainPage,'PIB_MAIN_PAGE':"",'CIB_MAIN_PAGE':"" };
	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));
	var objLk ={'HP_BK':'BK','LOCATION_PAGE': mainPage};
	dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));
	location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");
}

//개인뱅킹 페이지로 링크(기업로그인 사용자이면 세션이 끊어지고 개인뱅킹 페이지로 이동한다)
function bkPibLinkPage(depth,ibnkMnuCd,ibnkUpperMnuCd,toplvlMnuId,strtPgDrctrNm,mainPage){
	var jexAjax = jex.createAjaxUtil("com_ebz_remove_session");
	jexAjax.set("USER_DV_VAL" , "B1"); //개인뱅킹으로 이동 구분값 "B1"
	jexAjax.execute(function(dat){
		var obj ={'IBNK_MNU_CD':ibnkMnuCd,'IBNK_UPPER_MNU_CD':ibnkUpperMnuCd,'MNU_LEVL_NO':depth,'TOPLVL_MNU_ID':toplvlMnuId,'STRT_PG_DRCTR_NM':strtPgDrctrNm,'PIB_IBNK_UPPER_MNU_CD':"",'CIB_IBNK_UPPER_MNU_CD':"",'LOCATION_PAGE':mainPage,'PIB_MAIN_PAGE':"",'CIB_MAIN_PAGE':"" };
		dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));
		var objLk ={'HP_BK':'BK','LOCATION_PAGE': mainPage};
		dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));
		location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");

	});
}

function setNaviDateTime(){
	var week = new Array(7);
	week[0] = "일";
	week[1] = "월";
	week[2] = "화";
	week[3] = "수";
	week[4] = "목";
	week[5] = "금";
	week[6] = "토";

	var now = new Date();
	var y   = now.getFullYear();
	var mon = now.getMonth()+1;
	var td  = now.getDate();
	var day = now.getDay();
	day = week[day];

	var tmpDay = y + "년 " + mon + "월 " + td + "일 " + day + "요일 ";

	var digital = new Date();
	var hours = digital.getHours();
	var minutes = digital.getMinutes();
	var seconds = digital.getSeconds();
	var amOrPm = "AM";
	if(hours > 11) amOrPm = "PM";
	if(hours > 12) hours = hours -12;
	if(hours == 0)hours = 12;
	if(minutes <= 9) minutes = "0" + minutes;
	if(seconds <= 9) seconds = "0" + seconds;
	dispTime = hours + ":" + minutes + ":"+seconds+" " + amOrPm;

	return tmpDay + dispTime;
}

function setEngNaviDateTime(){
	var monArry = new Array(12);
	monArry[0] = "January";
	monArry[1] = "February";
	monArry[2] = "March";
	monArry[3] = "April";
	monArry[4] = "May";
	monArry[5] = "June";
	monArry[6] = "July";
	monArry[7] = "August";
	monArry[8] = "September";
	monArry[9] = "October";
	monArry[10] = "November";
	monArry[11] = "December";

	var week = new Array(7);
	week[0] = "Sunday";
	week[1] = "Monday";
	week[2] = "Tuesday";
	week[3] = "Wednesday";
	week[4] = "Thursday";
	week[5] = "Friday";
	week[6] = "Saturday";

	var now = new Date();
	var y = now.getFullYear();
	var mon = now.getMonth()+1;
	var td = now.getDate();
	var day = now.getDay();
	day = week[day];

	var tmpDay;
	if( td == "1" ){
		tmpDay = td+"st";
	}else if( td == "2" ){
		tmpDay = td+"nd";
	}else if( td == "3" ){
		tmpDay = td+"rd";
	}else if( td == "31" ){
		tmpDay = td+"st";
	}else{
		tmpDay = td+"th";
	}

	tmpDay =  monArry[mon-1] + " " + tmpDay + ", " + y + " " + day;

	var digital = new Date();
	var hours = digital.getHours();
	var minutes = digital.getMinutes();
	var seconds = digital.getSeconds();
	var amOrPm = "AM";
	if(hours > 11) amOrPm = "PM";
	if(hours > 12) hours = hours -12;
	if(hours == 0)hours = 12;
	if(minutes <= 9) minutes = "0" + minutes;
	if(seconds <= 9) seconds = "0" + seconds;
	dispTime = hours + ":" + minutes + ":"+seconds+" " + amOrPm;

	return tmpDay + dispTime;
}

function strPrintBottom(){
	var str = [];
	str[0] = "본 처리결과는 변동 가능성이 있어 거래증빙으로 사용할 수 없습니다.";
	str[1] = "항상 저희 아이엠뱅크를 이용해주셔서 감사합니다.";
	str[2] = "1566-5050/1588-5050";
	return str;
}

function getNaviDepthName(str){
	if(str.length > 0){
		return " > "+str;
	}else{
		return "";
	}
}

var checker = jex.plugin.get("FORM_CHECKER");
checker.addCheckList("NOTNULL",function(dat){
	return !jex.isNull(dat);
});

checker.addCheckList("UPPERCASE",function(dat){
	return /^[A-Z][A-Z_0-9]*$/.test(dat);
});

checker.addCheckList("LOWERCASE",function(dat){
	return /^[a-z][a-z_0-9]*$/.test(dat);
});

checker.addCheckList("NUMBER",function(dat){
	return /^\d*$/.test(dat);
});

checker.addCheckList("ENGNUM",function(dat){
	return /[^a-zA-z0-9]/.test(dat);
});

checker.addCheckList("BIZNO",function(dat){
	return Func_PsnNoChk(dat);
});

checker.addMsg("NOTNULL",	"%MSG%은(는) 필수 항목 입니다.");
checker.addMsg("NUMBER",	"%MSG%에는 숫자만 입력이 가능합니다.");
checker.addMsg("UPPERCASE",	"%MSG%에는 영문자 대문자만 입력이 가능합니다.");
checker.addMsg("LOWERCASE",	"%MSG%에는 영문자 소문자만 입력이 가능합니다.");
checker.addMsg("ENGNUM",	"%MSG%에는 영문자와 숫자만 입력이 가능합니다.");
checker.addMsg("BIZNO",	    "%MSG%에는 주민번호 형식이 맞지 않습니다.");

jex.setAjaxBeforeData(	function(dat,opt){
	if( opt['loading']){
		try{
			jex.getRootDom().jex.plugin.get("JEX_LODING").start();
		}
		catch (e) {
		}
	}
});
jex.setAjaxCompleteData(	function(dat,opt){
	if( opt['loading']){
		try{
			jex.getRootDom().jex.plugin.get("JEX_LODING").stop();
		}
		catch (e) {
		}
	}
});

$(document).ready(function(){
	getCodeManager();

	try{
		var routeHtml  = "";
		var naviDateTm = '';
		var helpTxt    = "";
		var mnuNaviTit = $(".topArea .titleDep1").text();
		var historylen = $(".route").html().indexOf("<INPUT");
		var dgbbankcn  = "";
		var doksamo    = "";

		try{
			var topT = $(".gnb>h2>a"  , parent.document).attr("title")==undefined ? $(".gnb>h1>a"  , parent.document).attr("title"):$(".gnb>h2>a"  , parent.document).attr("title") ;
			var lnbT = $(".lnbTitle"  , parent.document).text();
			var tit0 = $(".on>a:eq(0)", parent.document).text();
			var tit1 = $(".on>a:eq(1)", parent.document).text();
			var tit2 = $(".on>a:eq(2)", parent.document).text();

			if(topT != "" && lnbT != ""){
				routeHtml += " <span title="+topT+">"+topT+"</span>";
				routeHtml += " <span title="+lnbT+">"+lnbT+"</span>";

				if(tit2 != ""){
					routeHtml += " <span title="+tit0+">"+tit0+"</span>";
					routeHtml += " <span title="+tit1+">"+tit1+"</span>";
					routeHtml += " <strong title="+tit2+">"+tit2+"</strong>";
					mnuNaviTit = tit2;
				}else{
					if(tit1 != ""){
						routeHtml += " <span title="+tit0+">"+tit0+"</span>";
						routeHtml += " <strong title="+tit1+">"+tit1+"</strong>";
						mnuNaviTit = tit1;
					}else{
						routeHtml += " <strong title="+tit0+">"+tit0+"</strong>";
						mnuNaviTit = tit0;
					}
				}
			}
		}catch(e){
		}

		if(historylen < 0){
			historylen = $(".route").html().indexOf("<input");
		}

		try{
			if((document.URL).indexOf("dgbbank.cn") > -1){
				dgbbankcn = "Y";
			}
			if((document.URL).indexOf("doksamo.co") > -1){
				doksamo = "Y";
			}
		}catch(e){
		}

		if(routeHtml == ""){
			if(historylen > 0){
				$(".route").html($(".route").html().substring(0, historylen));
			}
		}else{
			if((document.URL).indexOf("svc_ebz_14010_mail") < 1){
				$(".route").html(routeHtml);
			}
			//$(".route").html(routeHtml);
		}

		if(dgbbankcn != "Y"){
			if(($(".route").html()).indexOf("中國語")  	> -1 || ($(".route").html()).indexOf("iM Bank")    > -1 ||
				($(".route").html()).indexOf("English") 	> -1 || ($(".route").html()).indexOf("iM Bank") 	> -1){
				naviDateTm = '<span class="font_11 txt_normal loc_time_area">' + setEngNaviDateTime() + '</span>';
			}else{
				naviDateTm = '<span class="font_11 txt_normal loc_time_area">' + setNaviDateTime() + '</span>';
			}
		}

		//화면인쇄(윈도우 플랫폼인 경우)
		if(/win16|win32|win64/.test(navigator.platform.toLowerCase()) && getCookieVar("isOpen")==false && $(".route").html().indexOf("ebz_btn_print") < 0 && dgbbankcn != "Y" && doksamo != "Y"){
			helpTxt = "<a href=\"#\" onclick=\"PTMPrintWebPage({});\" class=\"ar_none printNone\"><img style=\"vertical-align:bottom;\" src=\"/img/common/btn/ebz_btn_print.gif\" alt=\"화면인쇄\" title=\"화면인쇄\"/> </a>";
		}

		//탭타이틀 적용
		$(".route").append(helpTxt);

		if($(".topArea .titleDep1").length==0){
			$(".route").append("<br>"+naviDateTm);
		}else{
			$(".topArea .titleDep1").text(mnuNaviTit);
			$(".topArea .titleDep1").append(naviDateTm);
		}

		if(null != mnuNaviTit && "" != mnuNaviTit){
			top.document.title = mnuNaviTit;
		}
	}catch(e){
		// 퇴직연금 접근성 처리
		if ($('.navi-area').length > 0) {
			var naviObj = dataCtrl.getObjData("_SES_NAVI_CONTS");
			if (!jex.isNull(naviObj)) {
				parent.document.title = '아이엠뱅크 ' + naviObj.PAGE_NAVI_MNU_PATH + ' > ' + naviObj.PAGE_NAVI_TIT_NM;
			}
		}
	}

	//웹접근성을 위한 summary 자동생성
	try{
		fnSetSummary();
		top.document.title = serverInfo.replace(/(DGB\_|\]\[HP)/g, '') + top.document.title.replace(serverInfo.replace(/(DGB\_|\]\[HP)/g, ''), "");
		if( serverInfo.indexOf("[D") > -1 )
		{
			$("body").addClass("devl");
		}
	}catch(e){
	}

});

var jObj ={};
jObj = dataCtrl.getObjData('LOAD_DATA_ON');
dataCtrl.delObjData('LOAD_DATA_ON');
//게시판 상세
if(jObj != null){
	if(jObj.BBS_DETAIL_YN = "Y"){
		window.history.forward(-1);
	}else{
		window.history.forward(0);
	}
}else{
	window.history.forward(0);
}
//BackSpace키 방지
$(document).keydown(function(e){
	if(e.target.nodeName != "INPUT" && e.target.nodeName != "TEXTAREA"){
		if(e.keyCode === 8){
			return false;
		}
	}
});

//웹접근성을 위한 summary 자동생성
function fnSetSummary(fl){
	var strTh = 'th';
	if(fl == 'L'){//Layer popup일 경우
		strTh = 'th';
	}
	$('table').each(function(i){
		var strSummary = '';
		$(strTh, this).each(function (z){
			if($(this).text().length > 1){
				strSummary+= ','+$(this).text();
			}
		});

		if(strSummary != ''){
			strSummary = '이 표는 ' + strSummary.substring(1) + '에 대한 정보를 확인할 수 있습니다.';
			//$(this).attr('summary', strSummary);
			$('caption', this).text(strSummary);
		}
	});
}
//웹접근성 label자동 적용 함수.
function createThLabel(){
	$('tbody td').each(function (){
		var $tgt = $(':input:not(:button,:image)', this);
		if($tgt.length > 0){
			var label = '<label for="'
				+ $tgt.filter(':eq(0)').attr('id')
				+ '"/>' ;
			$(this).prevAll('th:first')
				.contents()
				.each(function (){
					if(this.nodeType == '1'){        // tag
						if(!jex.isNull($(this).attr('data-jxln'))){
							$(this).wrapInner(label);
						}
					}else if(this.nodeType == '3'){ // text
						if($.trim($(this).text()).length > 0){
							$(this).wrap(label);
						}
					}
				});
		}//end if
	});
}

//보안프로그램 설치여부를 확인한다.
function checkSetupProgram(){
	//Windows PC 가 아니면
	if(!/win16|win32|win64/.test(navigator.platform.toLowerCase()) || getCookieVar("isOpen")){
		return true;
	}

	checkInstallASTX2();	//20151124 nonActiveX(AOS)
}

function checkInstallASTX2(fnSuccess, fnFailure){
	$ASTX2.init(
		function onSuccess(){
			if(fnSuccess){ fnSuccess(); }	//설치확인
		},
		function onFailure(){
			if(fnFailure){
				fnFailure();
			}
			else{
				parent.location.href = "https://banking.dgb.co.kr/com_ebz_setup.act"; //미설치시, 설치페이지 이동
			}
		}
	);
}

//AOS구동 function
function fn_AOS_srart(){

}

function setCyBank(gubun, userDvVal){
	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");
	jexAjax.execute(function(dat){
		if( gubun == 'CDD'){
			if( userDvVal == 'H1' ){
				if( jex.null2Void(dat.USER_DV_VAL) == "" ){
					dataCtrl.delObjData("MENU_LOCATION");
					var tmpObj ={"TOPLVL_MNU_ID":"A01","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A010101","LOCATION_PAGE":"com_ebz_cdd_pib_main.act","STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"DOKDO"};
					dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
					location.href = _CodeMgr.getCodeMsg("CODE_URL","1043");
				}else{
					if( dat.USER_DV_VAL == "2" || dat.USER_DV_VAL == "3" ){
						var jexAjax2 = jex.createAjaxUtil("com_ebz_logout");
						jexAjax2.execute(function(dat){
							dataCtrl.delObjData("MENU_LOCATION");
							var tmpObj ={"TOPLVL_MNU_ID":"A01","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A010101","LOCATION_PAGE":"com_ebz_cdd_pib_main.act","STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"DOKDO"};
							dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
							location.href = _CodeMgr.getCodeMsg("CODE_URL","1043");
						});
					}else{
						location.href = _CodeMgr.getCodeMsg("CODE_URL","1037");
					}
				}
			}else{
				if( jex.null2Void(dat.USER_DV_VAL) == "" ){
					dataCtrl.delObjData("MENU_LOCATION");
					var tmpObj ={"TOPLVL_MNU_ID":"A02","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A020101","LOCATION_PAGE":"com_ebz_cdd_cib_main.act","STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"DOKDO"};
					dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
					location.href = _CodeMgr.getCodeMsg("CODE_URL","1043");
				}else{
					if( dat.USER_DV_VAL == "2" || dat.USER_DV_VAL == "3" ){
						location.href = _CodeMgr.getCodeMsg("CODE_URL","1038");
					}else{
						var jexAjax2 = jex.createAjaxUtil("com_ebz_logout");
						jexAjax2.execute(function(dat){
							dataCtrl.delObjData("MENU_LOCATION");
							var tmpObj ={"TOPLVL_MNU_ID":"A02","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A020101","LOCATION_PAGE":"com_ebz_cdd_cib_main.act","STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"DOKDO"};
							dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
							location.href = _CodeMgr.getCodeMsg("CODE_URL","1043");
						});
					}
				}

			}
		}else if( gubun == 'CGJ'){
			if( userDvVal == 'H1' ){
				if( jex.null2Void(dat.USER_DV_VAL) == "" ){
					dataCtrl.delObjData("MENU_LOCATION");
					var tmpObj ={"TOPLVL_MNU_ID":"A01","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A010101","LOCATION_PAGE":"com_ebz_cgj_pib_main.act","STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"CGJ"};
					dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
					location.href = _CodeMgr.getCodeMsg("CODE_URL","1043");
				}else{
					if( dat.USER_DV_VAL == "2" || dat.USER_DV_VAL == "3" ){
						var jexAjax2 = jex.createAjaxUtil("com_ebz_logout");
						jexAjax2.execute(function(dat){
							dataCtrl.delObjData("MENU_LOCATION");
							var tmpObj ={"TOPLVL_MNU_ID":"A01","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A010101","LOCATION_PAGE":"com_ebz_cgj_pib_main.act","STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"CGJ"};
							dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
							location.href = _CodeMgr.getCodeMsg("CODE_URL","1043");
						});
					}else{
						location.href = _CodeMgr.getCodeMsg("CODE_URL","1062");
					}
				}
			}else{
				if( jex.null2Void(dat.USER_DV_VAL) == "" ){
					dataCtrl.delObjData("MENU_LOCATION");
					var tmpObj ={"TOPLVL_MNU_ID":"A02","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A020101","LOCATION_PAGE":"com_ebz_cgj_cib_main.act","STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"CGJ"};
					dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
					location.href = _CodeMgr.getCodeMsg("CODE_URL","1043");
				}else{
					if( dat.USER_DV_VAL == "2" || dat.USER_DV_VAL == "3" ){
						location.href = _CodeMgr.getCodeMsg("CODE_URL","1063");
					}else{
						var jexAjax2 = jex.createAjaxUtil("com_ebz_logout");
						jexAjax2.execute(function(dat){
							dataCtrl.delObjData("MENU_LOCATION");
							var tmpObj ={"TOPLVL_MNU_ID":"A02","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A020101","LOCATION_PAGE":"com_ebz_cgj_cib_main.act","STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"CGJ"};
							dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
							location.href = _CodeMgr.getCodeMsg("CODE_URL","1043");
						});
					}
				}
			}
		}
	});
}

//모바일 Agent 구분
function isMobileAgentChk(){
	var UserAgent = navigator.userAgent;
	if( UserAgent.match(/iPhone|iPod|iPad|Android|WindowsCE|BlackBerry|Symbian|WindowsPhone|webOS|Opera Mini|OperaMobi|POLARIS|IEMobile|IgteIecom|nokia|SonyEricsso/i) != null){
		return true;
	}else{
		return false;
	}
}

//Android Agent 구분
function isAndroidAgentChk(){
	var UserAgent = navigator.userAgent;
	if( UserAgent.match(/Android/) != null){
		return true;
	}else{
		return false;
	}
}

// 퇴직연금 link
function goRpsMnuPage(ibnkMnuCd, strtPgNm) {
	var obj = {
		'IBNK_MNU_CD'		: ibnkMnuCd,
		'IBNK_UPPER_MNU_CD'	: '',
		'MNU_LEVL_NO'		: '4',
		'TOPLVL_MNU_ID'		: 'R01',
		'STRT_PG_DRCTR_NM'	: strtPgNm,
		'HP_BK'				: '',
		'LOCATION_PAGE'		: ''
	};

	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");
	jexAjax.execute(function(dat) {
		var bankUrl = _CodeMgr.getCodeMsg("CODE_URL", "1001");

		if (jex.isNull(dat.CSNO) && /rps\.[pc]ib/.test(strtPgNm)) {
			dataCtrl.setObjData("MENU_LOCATION", jex.toStr(obj));
			top.location.href = bankUrl + "com_ebz_11010_J001.act";
		} else {
			var userDvVal = dat.USER_DV_VAL;
			var flag	  = false;

			if (strtPgNm == 'rps.pib' && /[23]/.test(userDvVal)) {
				flag 	  = true;
				msg  	  = _CodeMgr.getCodeMsg('RSPS_CD', 'VAL1706');
			}
			if (strtPgNm == 'rps.cib' && /[1]/.test(userDvVal)) {
				flag 	  = true;
				msg 	  = _CodeMgr.getCodeMsg('RSPS_CD', 'VAL1705');
			}

			if (flag) {
				if (confirm((msg.replace("..", ".\n\n").replace("..", ".\n\n")))) {
					var jexAjax = jex.createAjaxUtil("com_ebz_logout");
					jexAjax.execute(function(dat){
						dataCtrl.setObjData("MENU_LOCATION", jex.toStr(obj));
						top.location.href = bankUrl + "com_ebz_11010_J001.act";
					});
				}
				return;
			}
			dataCtrl.setObjData("MENU_LOCATION", jex.toStr(obj));
			top.location.href = bankUrl + "com_ebz_rps_main.act";
		}
	});
}

/**
 * 금융인증서 SDK 로드
 * EFN_CFT_USE_URL_CD - 01:개인 02:기업 03:통합
 */
var FinCertSdk;
var __IS_PARENT;
var ptValue       = "";
var signDataValue = "";
function cft_loadFinCertSdk(SITE_ID, PAY_API_KEY, IS_PARENT, EFN_CFT_USE_URL_CD)
{
    var args = arguments;
    var chkSignYn = null;
    var multiYn   = null;

    // 홈페이지에서 로그인시
    if( args.length == 4 )
    {
        SITE_ID            = args[0];
        PAY_API_KEY        = args[1];
        IS_PARENT          = args[2];
        EFN_CFT_USE_URL_CD = args[3];
    }
    // 일반 전자서명시(홈페이지 금융상품몰에서 거래진행시 서명처리)
    else if( args.length > 5 )
    {
        SITE_ID            = args[0];
        PAY_API_KEY        = args[1];
        chkSignYn          = args[2];
        multiYn            = args[3];
        IS_PARENT          = args[4];
        EFN_CFT_USE_URL_CD = args[5];
    }
    if( jex.isNull(EFN_CFT_USE_URL_CD) )
    {
        EFN_CFT_USE_URL_CD = '01';
    }

    __IS_PARENT = false;
    if( !jex.isNull(__IS_PARENT) )
    {
        __IS_PARENT = IS_PARENT;
    }

    // 금융인증서 자바스크립트 로드
    var _EFN_CFT_USE_URL = _CodeMgr.getCodeMsg('EFN_CFT_USE_URL', EFN_CFT_USE_URL_CD);
    var scriptElem = document.createElement("script");
    scriptElem.src = _EFN_CFT_USE_URL + "?dt=" + getNowDate();
    scriptElem.id = "fincertSdk";
    document.querySelector("body").appendChild(scriptElem);

    // 금융인증서 자바스크립트 로딩 실패시
    scriptElem.onerror = function ()
    {
        alert("금융인증서 로딩에 실패하였습니다.\n잠시후 다시 시도하여 주십시오.");
        return;
    };

    // 금융인증서 자바스크립트 로딩 성공시
    scriptElem.onload = function ()
    {
        if( EFN_CFT_USE_URL_CD === '02' )
        {
            FinCertSdk = FinCertCorp;// 사업자 SDK
        }
        else if( EFN_CFT_USE_URL_CD === '03' )
        {
            FinCertSdk = FinCertInt;// 공통 SDK
        }
        else
        {
            FinCertSdk = FinCert;// 개인 SDK
        }
        // 전자서명처리를 해야하는 경우 해당함수(cft_loadFinCertSdk)를 뱅킹에서 호출하도록 처리되어있음
        var SIGN_YN = null;
        if( chkSignYn )
        {
            SIGN_YN = "Y";
        }

        cft_sign_init(SITE_ID, PAY_API_KEY, SIGN_YN, multiYn, IS_PARENT);
    };
}

// 전자서명초기화
function cft_sign_init(SITE_ID, PAY_API_KEY, SIGN_YN, multiYn, IS_PARENT)
{
    var orgCode      = SITE_ID;
    var apiKey       = PAY_API_KEY;
    var clientOrigin = "";
    var clientType   = "";
    var uniqVal      = "";
    var lang         = "kor";

    var __param = {};
    if (orgCode.length > 0)
    {
        __param.orgCode = orgCode;
    }

    if (apiKey.length > 0)
    {
        __param.apiKey = apiKey;
    }

    if (clientOrigin.length > 0)
    {
        __param.clientOrigin = clientOrigin;
    }

    if (clientType.length > 0)
    {
        __param.clientType = clientType;
    }

    if (uniqVal.length > 0)
    {
        __param.uniqVal = uniqVal;
    }

    if (lang.length > 0)
    {
        __param.lang = lang;
    }

    if (JSON.stringify(__param) === "{}")
    {
        FinCertSdk.Sdk.init();
    }
    else
    {
        __param.success = function()
        {
            if( __IS_PARENT )
            {
                // 전자서명 처리
                if(SIGN_YN)
                {
                    setTimeout(function() {
                        $('#ifr')[0].contentWindow.cft_sign((multiYn == "Y"||multiYn == "B"?false:true), SIGN_YN, multiYn);
                    }, 200);
                }
                // 로그인 처리
                else
                {
                    $('#layerLogin')[0].contentWindow.cft_callback();// 자식 메소드를 접근한다.
                }
            }
            else
            {
                cft_callback();
            }
        };

        __param.fail = cft_errorCert;

        FinCertSdk.Sdk.init(__param);
    }
}
// 전자서명추가
function cft_sign(enableTextView, _textElement)
{
    var args           = arguments;
    var isLogin        = false;
    var signYn         = false;
    var multiYn        = 'N';
    var lastAccessCert = '';

    // 홈페이지에서 로그인시
    if( args.length == 2 )
    {
        enableTextView = args[0];
        _textElement   = args[1];
        if( !jex.isNull(_textElement.login) )
        {
            signYn = true;
            isLogin= true;
        }
    }
    // 일반 전자서명시(홈페이지 금융상품몰에서 거래진행시 서명처리)
    else if( args.length == 4 )
    {
        enableTextView = args[0];
        signYn         = args[1];
        multiYn        = args[2];
        lastAccessCert = args[3];
    }

    var plainTexts = new Array();
    var makeSignObj= function(signValue) {
        var objSign= {};
        var strPt  = signValue.split(/\n/g);
        for(var i = 0,len=strPt.length; i < len; i++) {
            var strJ = strPt[i].split(":");
            if( !jex.isNull(strJ[0]) )
            {
                objSign[strJ[0]] = strJ[1];
            }
        }
        return objSign;
    }
    var frameObj = null;// 홈페이지 도메인 내 전자서명 처리를 위한 분기
    if( /banking.dgb.co.kr/.test(jex.getRootDom().location.href) )
    {
        frameObj = $('#ifr')[0];
    }
    else
    {
        frameObj   = jex.getRootDom().$('#ifr')[0];
        FinCertSdk = jex.getRootDom().FinCertSdk;
    }

    // 멀티서명 일 경우
    if( /^(Y|B)$/.test(multiYn) )
    {
        signDataValue = frameObj.contentWindow.signDataValue;
        ptValue       = frameObj.contentWindow.ptValue;

        var strDecode = ptValue;
        frameObj.contentWindow.ptValue = "";

        var arrPlaninText = strDecode.substring(1).split("|");
        for(var int = 0; int < arrPlaninText.length; int++)
        {
            plainTexts.push(makeSignObj(arrPlaninText[int]));
        }

        // B2B멀티서명 구분코드추가-B2B는 결제원전송데이터도 같이 서명을 받아야 하기때문에 추가
        if( multiYn == "B" )
        {
            plainTexts.push(signDataValue.substring(1));
        }
        enableTextView = false;
    }
    else
    {
        // 메인페이지의 iframe용 로그인인 경우
        if( isLogin )
        {
            _SETSIGNVALUE = _textElement.login;
        }
        else
        {
            _SETSIGNVALUE = frameObj.contentWindow._SETSIGNVALUE;
        }

        if( /\n/g.test(_SETSIGNVALUE) )
        {
            plainTexts.push(makeSignObj(_SETSIGNVALUE));
        }
        else
        {
            if( jex.isNull(_SETSIGNVALUE) )
            {
                plainTexts.push({'현재날짜':formatter.datetime(getNowFormatDate("YYYYMMDDHH24MISS"),"yyyy-mm-dd hh24:mi:ss")});
            }
            else
            {
                plainTexts.push(_SETSIGNVALUE);
            }
        }
    }

    var _param = {
        signFormat : {
            type : 'CMS'                // 서명 데이터 포맷 (signFormat.type) ("":미지정, "CMS":"CMS (RFC 2630)", "PKCS1":"PKCS1"
            ,CMSInfo : {
                ssn : 'dummy'           // 실명번호
                ,time : ''              // YYYYMMDDHHmmSS : UTC Time
                ,withoutContent : false // 서명데이터(CMS Data)생성시 원문이 포함되지 않는지 여부(true|false)
            }
        }
        ,content : {
            plainText : {
                plainTexts : plainTexts
                ,encoding : 'UTF-8'
            }
        }
        ,algorithm : ''                     // "":미지정, RSASSA-PKCS1-v1_5_SHA256:RSASSA-PKCS1-v1_5 + SHA256, RSASSA-PSS_SHA256_MGF_SHA256:RSASSA-PSS + SHA256 + MGF_SHA256
        ,view : {
            oid                    : {}     // 인증서 선택창 표시 OID - 개인 : {"1.2.410.200005.1.1.1.10": true} - 사업자 : ["1.2.410.200005.1.1.8.11", "1.2.410.200005.1.1.8.12", "1.2.410.200005.1.1.8.13"]
            ,enableTextView        : false  // 서명 내용 표시 여부 -"":미지정, "false":표시안함, "true":표시함
            ,enableTextViewAddInfo : {}     /* 서명 내용 표시 여부 관련 추가 정보 필드
                                                    - nameValueSeperator (String) : 쿼리 스트링 형식의 전자서명 원문인 경우 name과 value를 구분하기 위한 separator 예) =
                                                    - pairSeperator (String) : 쿼리 스트링 형식의 전자서명 원문인 경우 name과 value의 쌍들 사이를 구분하기 위한 separator 구분 한 후 urlDecode하여 화면에 표시함 예) &
                                                    - nameExclusionRegExp (Object-RegExp) : 해당 항목을 표시하지 않는 regular expression
                                                                                            예)  __로 시작하는 항목을 표시하지 않을때 : /^__/
                                                                                                 __로 시작하고 __로 끝나는 항목을 표시하지 않을 때 : /^__.*__$/
                                                    - nameValueSeperator와 pairSeperator는 상이해야 하며, 둘다 셋팅되거나 둘다 셋팅되지 않아야 함
                                                 */
            ,certSeqNum            : ''     // 전자서명 수행할 인증서의 일련번호 (UI : view.certSeqNum /withoutUI : certSeqNum)
            ,lastAccessCert        : true   // 마지막에 사용한 인증서만 표시 여부("":미지정, "false":표시안함, "true":표시함)
        }
        ,info : {
            signType : '99'                 // 사용자 전자서명 거래 종류("":미지정,"01":로그인,"02":송금,"03":금융상품가입 (대출, 보험, 펀드 등),"04":전자계약...)
        }
        ,success : {}
        ,fail : {}
    };

    // 메인페이지의 iframe용 로그인인 경우
    if( isLogin )
    {
        _param.info.signType = '01';
    }
    // B2B멀티서명
    if( multiYn == "B" )
    {
        _param.signFormat.CMSInfo.ssn = '';             // 서명은 VID가 들어가면 안됨
        _param.signFormat.CMSInfo.generalSyntax = false;// true : ContentInfo 형식으로 감싼 SignedData, false : SignedData
        _param.content.plainText.encoding = 'EUC-KR';
    }
    if( !jex.isNull(enableTextView) )
    {
        _param.view.enableTextView = enableTextView;
    }
    if( !jex.isNull(lastAccessCert) )
    {
        _param.view.lastAccessCert = lastAccessCert;
    }

    if( signYn )
    {
        _param.success = function(result)
        {
            // 메인페이지의 iframe용 로그인인 경우
            if( isLogin )
            {
                $('#layerLogin')[0].contentWindow.cft_sign_callback(result);// 자식 메소드를 접근한다.
                return;
            }

            var _pObj        = {};
            var signDataTobe = '';

            result.signedVals.forEach(function(element) {
                // B2B는 BASE64로 전송을 위해 변환처리 함.
                if(multiYn == "B")
                {
                    var objB2BAppend = {base64Url : element
                        ,success   : function(result) {
                            signDataTobe += "|" + result.base64;
                        }
                        ,fail      : cft_errorCert
                    };

                    FinCertSdk.Sdk.convertBase64UrlToBase64(objB2BAppend);
                }
                else
                {
                    signDataTobe += "|" + element;
                }
            });
            _pObj.signData = signDataTobe.substring(1);

            // 2021-02-24 - 금융인증서B2B작업(B2B멀티서명 구분코드추가-B2B는 VID검증을 하지 않으므로 검증처리로 진행)
            if( multiYn == "B" )
            {
                _pObj.vidRandom = "";
                _pObj.status    = "1";

                frameObj.contentWindow.delfinoB2bMultiSignCallback(_pObj);
            }
            else
            {
                var jexAjax = jex.createAjaxUtil("JEX_EBZ_SEND_FNCERT");// HP was 추가 필요함.

                // 멀티서명 일 경우
                if( multiYn == "Y" )
                {
                    jexAjax.set("PRT_SIGN_DATA"    ,_pObj.signData.split("|")[0]);
                }
                else
                {
                    jexAjax.set("PRT_SIGN_DATA"    ,_pObj.signData);
                }
                jexAjax.set("TRNS_DVCD"         , "VID");
                jexAjax.addOption("loading", true);

                jexAjax.execute(function(dat) {
                    _pObj.vidRandom = dat.VID_RANDKEY;
                    _pObj.status    = "1";

                    // 멀티서명 일 경우
                    if( multiYn == "Y" )
                    {
                        frameObj.contentWindow.delfinoMultiSignCallback(_pObj);
                    }
                    else
                    {
                        frameObj.contentWindow.delfinoSignCallback(_pObj);
                    }
                });
            }
        };
    }
    else
    {
        _param.success = function (result)
        {
            frameObj.contentWindow.cft_sign_callback(result);
        };
    }

    _param.fail = cft_errorCert;

    if( _param == undefined || _param == null )
    {
        FinCertSdk.Sdk.sign();
    }
    else
    {
        FinCertSdk.Sdk.sign(_param);
    }
}

// 금융인증서 에러처리
function cft_errorCert(error)
{
    if(error.code != "800000")
    {
        alert(error.message + "[" + error.code + "]");
    }
}

//인터넷 뱅킹 채팅상담 - 뱅킹창 제어
//postMessage 리스너 이벤트 등록
top.window.addEventListener('message', function(e)
{
	if (e.data)
	{
		var jsonData = JSON.parse(e.data);

		if (jsonData.command == 'changePage')
		{
			if(top.CHB)
			{
				top.CHB.changePageByChatWindow(jsonData.serviceId);
			}
			else
			{
				CHB.changePageByChatWindow(jsonData.serviceId);
			}
		}
		else if (jsonData.command == 'renewSessionTimer')
		{
			if(top.CHB)
			{
				top.CHB.renewSessionTimerByChatWindow();
			}
			else
			{
				CHB.renewSessionTimerByChatWindow();
			}
		}
		else if (jsonData.command == 'logout')
		{
			if(top.CHB)
			{
				top.CHB.logoutByChatWindow();
			}
			else
			{
				CHB.logoutByChatWindow();
			}
		}
		else if(jsonData.command == 'openChatWindow')
		{
			if(top.CHB)
			{
				top.CHB.openChatWindowPopup(jsonData.openParam);
			}
			else
			{
				CHB.openChatWindowPopup(jsonData.openParam);
			}
		}
	}
});

var CHB =
{
	openChatWindowPopup : function(param)
	{
	    _LOGIN_SESSION = getLoginSessionInfo();
		var url = "";
		var chatWindowServiceUrl = 'hlp_ebz_chb_20130.act';

		if(_LOGIN_SESSION.LOGIN_DVCD == 1){
			// onlyTalk으로 채팅 바로 인입할 경우 파라미터 세팅
			var onlyTalkParam = "";

			if(param && Object.keys(param).length > 0)
			{
				for(var key in param)
				{
					if(!onlyTalkParam)
					{
						onlyTalkParam += '?'
					}
					else
					{
						onlyTalkParam += '&'
					}

					if(key === 'category')
					{
						onlyTalkParam += 'onlyTalk=Y&nodeId=' + param[key];
					}
					else if(key === 'pdNm')
					{
						onlyTalkParam += (key + "=" + encodeURIComponent(param[key]));
					}
					else
					{
						onlyTalkParam += (key + "=" + param[key]);
					}
				}
			}

			chatWindowServiceUrl += onlyTalkParam;

			url = _CodeMgr.getCodeMsg('CODE_URL', '1001') + chatWindowServiceUrl;
			top.window.open(url, "chatWindow", "width=670,height=770,location=no,toolbar=no,resizable=no");
		} else {
			if(confirm("로그인후 사용하실 수 있습니다. 로그인 페이지로 이동 하시겠습니까?")){
				goSubMain('dgb_login');
			}
		}
	},

	changePageByChatWindow : function(serviceId) {
		if (!serviceId)
		{
			// serviceId 가 들어오지 않으면 로그인 페이지로 이동
			loginPage();
		}
		else
		{
			var url = serviceId;
			var data = "";

			// ibnkUpperMnuCd 가 ROOT 면 대분류로 이동 (현재는 그리팅 메세지의 상품추천 케로셀에 걸려있음)
			// 3번째 값은 mnuStrtPgNm 에 해당 url이 존재

			var arrLink = url.split(',');

	    	var ibnkUpperMnuCd = arrLink[0];
	    	var ibnkMnuCd = arrLink[1];
	    	var mnuStrtPgNm = arrLink[2];

//		    	gubun 값에 매핑되는 대메뉴
//		    	A01 : 개인뱅킹
//		    	B02 : 기업뱅킹
//		    	A06 : 공인인증센터
//		    	H01 : 금융상품몰
//		    	H02 : 금융서비스
//		    	H03 : 고객센터
//		    	H04 : DGB 소개
//		    	H50 : 사이버지점
//		    	R01 : 퇴직연금

	    	// gubun 값 얻기
	    	var gubun = ibnkUpperMnuCd.substr(0, 3);

	    	if(ibnkUpperMnuCd == 'ROOT')
			{
	    		// 홈페이지 영역으로 갈 때
	    		if(!(ibnkMnuCd === 'A01' || ibnkMnuCd === 'B01' || ibnkMnuCd === 'R01' || ibnkMnuCd === 'A06'))
	    		{
	    			setCookieVar("isHp", "Y");
	    		}

	    		try
	    		{
	    			top.location.href = mnuStrtPgNm;
	    		}
	    		catch(e)
	    		{
	    			location.href = mnuStrtPgNm;
	    		}
	    		return;
			}

	    	// 하나만 들어온 경우에는 full url 이 들어왔다고 가정
	    	if(arrLink.length == 1)
			{
	    		window.open(arrLink[0], "chatbot_win_popup", "width=763, height=600, toolbar=no, scrollbars=yes, resizable=no");
	    		return;
			}

	    	if(arrLink.length != 3)
			{
	    		console.log("invalid param to change page.");
	    		return;
			}

	    	if(mnuStrtPgNm.indexOf('https://') < 0 && mnuStrtPgNm.indexOf('#SCRT#') < 0)
			{
	        	var bMnuData = getBankingMnuDt(gubun);

	        	if( bMnuData.REC1 != null )
	    		{
	        		// 현재 들어온 값에 해당하는 메뉴 데이터를 바탕으로 json 객체나 함수 생성
	        		$.each(bMnuData.REC1 , function( i , v )
					{
		        		if(gubun == 'A01' && v.STRT_PG_DRCTR_NM != 'rps')
		    			{
		        			if( v.MNU_LEVL_NO == "2"
		        				|| (v.MNU_LEVL_NO != "1" && v.MNU_LEVL_NO == "3"))
		        			{
		        				// IBNK_UPPER_MNU_CD 값과 IBNK_MNU_CD 값이 챗봇의 응답 값과 같을 때
		    					if(ibnkUpperMnuCd == v.IBNK_UPPER_MNU_CD
		    							&& ibnkMnuCd == v.IBNK_MNU_CD)
								{
		    						data = jex.toStr(v);
		    						return false;
								}
		        			}
		    			}
		        		else if(gubun == 'B01' && v.STRT_PG_DRCTR_NM != 'rps')
		    			{
		        			if( v.MNU_LEVL_NO == "2"
		        				|| (v.MNU_LEVL_NO != "1" && v.MNU_LEVL_NO != "5" && !isEmpty(v.MNU_STRT_PG_NM)))
		    				{
		        				// IBNK_UPPER_MNU_CD 값과 IBNK_MNU_CD 값이 챗봇의 응답 값과 같을 때
		    					if(ibnkUpperMnuCd == v.IBNK_UPPER_MNU_CD
		    							&& ibnkMnuCd == v.IBNK_MNU_CD)
								{
		    						data = jex.toStr(v);
		    						return false;
								}
		    				}
		    			}
		        		else if(gubun == 'R01')
		    			{
		        			if(v.MNU_LEVL_NO == "2"
		        				||  v.MNU_LEVL_NO != "1")
		    				{
		        				// IBNK_UPPER_MNU_CD 값과 IBNK_MNU_CD 값이 챗봇의 응답 값과 같을 때
		    					if(ibnkUpperMnuCd == v.IBNK_UPPER_MNU_CD
		    							&& ibnkMnuCd == v.IBNK_MNU_CD)
								{
		    						data = jex.toStr(v);
		    						return false;
								}
		    				}
		    			}
		        		else if(gubun == 'H01')
	        			{
		        			if( v.MNU_LEVL_NO == "1"
		        				||  v.MNU_LEVL_NO == "2")
	        				{
		        				if(ibnkUpperMnuCd == v.IBNK_UPPER_MNU_CD
		    							&& ibnkMnuCd == v.IBNK_MNU_CD
		    							&& mnuStrtPgNm == v.MNU_STRT_PG_NM)
								{
		        					var MNU_STRT_PG_NM = v.MNU_STRT_PG_NM.split(":");
		                			var hpmpUrl = gubun == 'H50' ? _CodeMgr.getCodeMsg("CODE_URL", "1002") : 'https://www.dgb.co.kr/';

			        				data = "linkMenuPage('" +MNU_STRT_PG_NM[0]+ "','" +MNU_STRT_PG_NM[1]+ "','0','" + hpmpUrl + MNU_STRT_PG_NM[2]+"');";
		    						return false;
								}
	        				}
	        			}
		        		else if(gubun == 'H02')
	        			{
		        			if(v.MNU_LEVL_NO == "1"
		        				||  v.MNU_LEVL_NO == "2")
	        				{
		        				if(ibnkUpperMnuCd == v.IBNK_UPPER_MNU_CD
		    							&& ibnkMnuCd == v.IBNK_MNU_CD
		    							&& mnuStrtPgNm == v.MNU_STRT_PG_NM)
								{
		        					var MNU_STRT_PG_NM = v.MNU_STRT_PG_NM.split(":");
		                			var hpmpUrl = gubun == 'H50' ? _CodeMgr.getCodeMsg("CODE_URL", "1002") : 'https://www.dgb.co.kr/';

			        				data = "linkMenuPage('" +MNU_STRT_PG_NM[0]+ "','" +MNU_STRT_PG_NM[1]+ "','0','" + hpmpUrl + MNU_STRT_PG_NM[2]+"');";
		    						return false;
								}
	        				}
	        			}
		        		else if(gubun == 'H03')
	        			{
		        			if(v.MNU_LEVL_NO == "1"
		        				|| v.MNU_LEVL_NO == "2")
	        				{
		        				if(ibnkUpperMnuCd == v.IBNK_UPPER_MNU_CD
		    							&& ibnkMnuCd == v.IBNK_MNU_CD
		    							&& mnuStrtPgNm == v.MNU_STRT_PG_NM)
								{
		        					var MNU_STRT_PG_NM = v.MNU_STRT_PG_NM.split(":");
		                			var hpmpUrl = gubun == 'H50' ? _CodeMgr.getCodeMsg("CODE_URL", "1002") : 'https://www.dgb.co.kr/';

			        				data = "linkMenuPage('" +MNU_STRT_PG_NM[0]+ "','" +MNU_STRT_PG_NM[1]+ "','0','" + hpmpUrl + MNU_STRT_PG_NM[2]+"');";
		    						return false;
								}
	        				}
	        			}
		        		else if(gubun == 'H04')
	        			{
		        			if(v.MNU_LEVL_NO == "1"
		        				|| v.MNU_LEVL_NO == "2")
	        				{
		        				if(ibnkUpperMnuCd == v.IBNK_UPPER_MNU_CD
		    							&& ibnkMnuCd == v.IBNK_MNU_CD
		    							&& mnuStrtPgNm == v.MNU_STRT_PG_NM)
								{
		        					var MNU_STRT_PG_NM = v.MNU_STRT_PG_NM.split(":");
		                			var hpmpUrl = gubun == 'H50' ? _CodeMgr.getCodeMsg("CODE_URL", "1002") : 'https://www.dgb.co.kr/';

			        				data = "linkMenuPage('" +MNU_STRT_PG_NM[0]+ "','" +MNU_STRT_PG_NM[1]+ "','0','" + hpmpUrl + MNU_STRT_PG_NM[2]+"');";
		    						return false;
								}
	        				}
	        			}
		        		else if(gubun == 'H50')
	        			{
		        			if(v.MNU_LEVL_NO == "1"
		        				|| v.MNU_LEVL_NO == "2")
	        				{
		        				if(ibnkUpperMnuCd == v.IBNK_UPPER_MNU_CD
		    							&& ibnkMnuCd == v.IBNK_MNU_CD
		    							&& mnuStrtPgNm == v.MNU_STRT_PG_NM)
								{
		        					var MNU_STRT_PG_NM = v.MNU_STRT_PG_NM.split(":");
		                			var hpmpUrl = gubun == 'H50' ? _CodeMgr.getCodeMsg("CODE_URL", "1002") : 'https://www.dgb.co.kr/';

			        				data = "linkMenuPage('" +MNU_STRT_PG_NM[0]+ "','" +MNU_STRT_PG_NM[1]+ "','0','" + hpmpUrl + MNU_STRT_PG_NM[2]+"');";
		    						return false;
								}
	        				}
	        			}
		        		else if(gubun == 'A06')
	        			{
		        			if(v.MNU_LEVL_NO == "1"
		        				||  v.MNU_LEVL_NO == "3")
	        				{
		        				// IBNK_UPPER_MNU_CD 값과 IBNK_MNU_CD 값이 챗봇의 응답 값과 같을 때
	        					if(ibnkUpperMnuCd == v.IBNK_UPPER_MNU_CD
	        							&& ibnkMnuCd == v.IBNK_MNU_CD)
	    						{
	        						data = "crtMnuLink('" +v.IBNK_MNU_CD+ "','" +v.IBNK_UPPER_MNU_CD+ "');";
	        						return false;
	    						}
	        				}
	        			}
					});
	    		}
			}


			try
			{
				data = data.replace(/'/gi, "\"");
				data = jex.parse(data);
				goLinkPage(data);
			}
			catch(e)
			{
				try
				{
					(new Function("return " + data)());
				}
				catch(e)
				{
				}
			}
		}
	},

	renewSessionTimerByChatWindow : function() 
	{
		var jexAjax = jex.createAjaxUtil("com_ebz_session_renew");

		jexAjax.set("UT_PARAM_1", dbSessionTime);
		jexAjax.setAsync(false);

		var objectId = 'sessionCount';
		if ($("#topSessionCount").length > 0) 
		{
			objectId = 'topSessionCount';
		}

		jexAjax.execute(function(dat) 
		{
			clearInterval(interval);
			sessionCountdown(objectId, dbSessionTime, 0);
			closeTimeLayer();
		});
	},

	logoutByChatWindow : function() 
	{
		var jexAjax = jex.createAjaxUtil("com_ebz_logout");
		jexAjax.execute(function(dat) {
			location.href=_CodeMgr.getCodeMsg("CODE_URL","1002")+"dgb_ebz_main.jsp";
		});
	}
}

function chkEddExctYn(param)
{
    var jexAjax = jex.createAjaxUtil("etc_ebz_b0101_8600_t001");
    jexAjax.addOption("loading", true);
    jexAjax.setAsync(false);
    jexAjax.setErrTrx(false);

    if( !jex.isNull(param) && typeof param === 'object' )
    {
        var objWebWorkComm      = new Object();
        objWebWorkComm.FILLER  = jex.null2Str(param.UNDERAGE_EDD_YN, 'Y');        //조회될 페이지번호
        jexAjax.set("EBZ_WEB_WORK_COMM" , objWebWorkComm);
    }
    jexAjax.set("INQ_DVCD" , "7");
    var rtn = true; // true - EDD 대상, false - EDD 대상아님

    jexAjax.execute(function(dat) {
        if( dat.COMMON_HEAD.ERROR )
        {
            if( dat.COMMON_HEAD.CODE == 'AGE_ERR' )
            {
                rtn = false;
            }
            else
            {
                jex.printError(dat)
            }
        }
        else
        {
            if( dat.EDD_EXCT_YN == "Y" )
            {
                try{
	                // SMS 체크
	                var jexAjaxSms = jex.createAjaxUtil("com_ebz_sms_session");
	                jexAjaxSms.setAsync(false);
	                jexAjaxSms.execute(function(dat){ });

                    // UMS 고도화 대응. act 변경 : com_ebz_55010_m002 -> com_ebz_55010_m001
                    var jexAjax2 = jex.createAjaxUtil("com_ebz_55010_m001");
                    jexAjax2.set("SMS_FW_BIZ_IDTF_SEQ", "BEFA00200020");
                    jexAjax2.setErrTrx(false);
                    jexAjax2.set('TITLE', '고객 확인제도 수행');// 타이틀
                    jexAjax2.set('SMS_MSG_CN', '안녕하십니까, 아이엠뱅크입니다.\n' +
                        '고객확인제도를 수행하기 위해 신분증 촬영을 통한 본인 확인이 필요합니다.\n' +
                        '아래의 링크를 클릭하시어 고객 확인제도를 수행하여 주시기 바랍니다.\n' +
                        '[조회∙관리-고객확인제도 등록]\n' +
                        _CodeMgr.getCodeMsg("CODE_URL", "1001")+'JEX_EBZ_SBS_APP_LINK.act?SVC_ID=JEX_EBZ_SBS_EDD_CONT');// SMS메시지내용
                    jexAjax2.execute(function(lmsDat){});
                }catch(e){}

                //EDD 수행이 필요 할 경우 팝업 노출 후 진행 불가상태로 변경
                window.top.jex.printUserInfoCallBack("고객확인제도 등록이 필요합니다.", _CodeMgr.getCodeMsg("RSPS_CD", "VAL2018"), function(){
                    try{
                        $('.btnArea').remove();
                    } catch(e){
                        return true;
                    }
                });
                rtn = true;
            }
            else
            {
                rtn = false;
            }
        }
    });
    return rtn;
}

/* 파일 최종 저장 날짜 구하기
 * ex) ibsGetFileDate.lateDate(url);
var ibsGetFileDate = {
    dateFormat : function(date){
        var dateObj = date;
        var dateYear = dateObj.getFullYear();
        var dateMonth = dateObj.getMonth()+1;
        var dateDay = dateObj.getDate();
        var dateHour =dateObj.getHours();
        var dateMinute = dateObj.getMinutes();
        if(dateMonth.toString().length == 1){dateMonth = "0"+ dateMonth.toString();}
        if(dateDay.toString().length == 1){dateDay = "0"+ dateDay.toString();}
        if(dateHour.toString().length == 1){dateHour = "0"+ dateHour.toString();}
        if(dateMinute.toString().length == 1){dateMinute = "0"+ dateMinute.toString();}
        return dateYear+dateMonth +"/"+ dateDay +" "+ dateHour +":"+ dateMinute;
    },
    DayDiff : function(date){
        var dateToday = new Date();
        return Math.ceil((dateToday.getTime() - date.getTime()) / (1000 * 3600 * 24));
    },
    lateDate : function(url){
        var wch = "Last-Modified";
        try {
            var req = new XMLHttpRequest();
            req.open("HEAD", url, false);
            req.send(null);
            if(req.status == 200){
                var dateModify = new Date(req.getResponseHeader(wch));
                var dateFormat = getFileDate.dateFormat(dateModify);
                var dateDiff = getFileDate.DayDiff(dateModify);

                if ( dateDiff >= 0 &&  dateDiff <= 1 ){
                    // dateFormat = '<span style="color:red;">*</span> <span style="color:#000000;">'+ dateFormat +'</span>';
                } else if  ( dateDiff >=2 &&  dateDiff <= 4 ){
                    // dateFormat = '&nbsp;&nbsp; <span style="color:#666666;">'+ dateFormat +'</span>';
                } else if  ( getFileDate.DayDiff(dateModify) >= 5 ){
                    // dateFormat = '&nbsp;&nbsp; <span style="color:#999999;">'+ dateFormat +'</span>';
                }

                return dateFormat.replace(/[^0-9]/gi,"");
            } else {
                return "";
            }
        } catch(err){
            return "";
        }
    }
}
 */
