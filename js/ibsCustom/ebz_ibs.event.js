var lang_timeout    = 1;
var closetimer		= 0;
var searchitme      = 0;
var sel_timeout     = 1;
var sel_closetimer	= 0;
var select_over     = 0;
var select_ul       = 0;
var close_sel_timer = 0;
var langitme      	= 0;
var langitmeTop  	= 0;
var searchitme      = 0;

function languageOpen(){
	languageCancelTimer();
	languageClose();
	langitmeTop = $(this).find('a').addClass('over');
	langitme = $(this).find('ul').eq(0).css('visibility', 'visible');
}

function languageClose(){
	if(langitmeTop) langitmeTop.removeClass('over');
	if(langitme) langitme.css('visibility', 'hidden');
}

function languageTimer(){
	closetimer = window.setTimeout(languageClose, lang_timeout);
}

function languageCancelTimer(){
	if(closetimer){
		window.clearTimeout(closetimer);
		closetimer = null;
	}
}

function searchClick(){
	$(this).removeClass('srh_input');
}


function select_Click(){
	if($(this).siblings('ul').css('display') == 'none'){
		$(this).addClass("over");
		$(this).attr("title", $(this).text() + " 열림");
		$(this).siblings('ul').css('display', 'block');
	}else{
		$(this).removeClass("over");
		$(this).attr("title", $(this).text() + " 닫힘");
		$(this).siblings('ul').css('display', 'none');
	}
}

var All_Mn_LyPop_main = '';
var subPageFlag = false;

function showSiteMap(){

	subPageFlag = true;
	selectBox_BtnList('open');
}

$(document).ready(function(){
	/*
	$('body').delegate("#all_mnu_view",'click', function(e){
		subPageFlag = true;
		selectBox_BtnList('open');
	});
	*/

	$('body').delegate(".linkMnu",'click', function(e){
		var dt = jex.parse($(this).attr("data"));
		goLinkPage(dt);

	});

	$('#language').bind('mouseover', languageOpen);
	$('#language').bind('mouseout' , languageTimer);
	$('#srhInput').bind('click'    , searchClick);

	$('.select01 > li > a').bind('click', select_Click);
	$('.select02 > li > a').bind('click', select_Click);

	/*
	$('.select01').bind('mouseover', select_Open);
	$('.select01').bind('mouseout' , select_OutTimer);

	if(isAndroidAgentChk() == false){
		$('.select01').bind('click', select_Click);
	}

	$('.select02').bind('mouseover', select_Open);
	$('.select02').bind('mouseout' , select_OutTimer);

	if(isAndroidAgentChk() == false){
		$('.select02').bind('click', select_Click);
	}
	 */

	$('#WrapAll').append(All_Mn_LyPop_main);

	//접근성 수정
	var langMn_fun  = 0;
	var selMn01_fun = 0;
	var selMn02_fun = 0;

	$('#language').bind('focusin',function(){
		langMn_fun = $(this).find('a').addClass('over');
		$(this).find('>ul').css('visibility','visible');
	});

	$('#language ul a:last').bind('focusout',function(){
		if(langMn_fun) langMn_fun.removeClass('over');
		$(this).closest('ul').css('visibility','hidden');
	});

	/*
	$('.select01').bind('focusin',function(){
		selMn01_fun = $(this).find('li:first').find('a.out').addClass('over');

		$(this).find('ul').css('display','block');
	});

	$('.select01 ul a:last').bind('focusout',function(){
		if(selMn01_fun) selMn01_fun.removeClass('over');
		$(this).closest('ul').css('display','none');
	});

	$('.select02').bind('focusin',function(){
		selMn02_fun = $(this).find('li:first').find('a.out').addClass('over');
		$(this).find('ul').css('display','block');
	});

	$('.select02 ul a:last').bind('focusout',function(){
		if(selMn02_fun) selMn02_fun.removeClass('over');
		$(this).closest('ul').css('display','none');
	});
	 */
	//접근성 수정

	//빠른서비스
	$('body').delegate(".lnkFst2",'click', function(e){
		var domain = _CodeMgr.getCodeMsg("CODE_URL", "1001");
		var specd = $(this).attr("data-gramspecd2");
		window.open(domain + getFstLnk2(specd), "win_" + specd, "width=763, height=600, toolbar=no, scrollbars=yes, resizable=no");
		e.preventDefault();
	});
});
function newFastLink(specd) {
	var domain = _CodeMgr.getCodeMsg("CODE_URL", "1001");
	//var specd = $(this).attr("data-gramspecd2");
	window.open(domain + getFstLnk2(specd), "win_" + specd, "width=763, height=600, toolbar=no, scrollbars=yes, resizable=no");

}
function getFstLnk2(specd) {
	if (specd == "1") {
		return "fst_ebz_50010_1270.act";
	} else if (specd == "2") {
		return "fst_ebz_60010_1818.act";
	} else if (specd == "3") {
		return "fst_ebz_80010_1680.act";
	} else if (specd == "4") {
		return "fst_ebz_70010_1670.act";
	} else if (specd == "5") {
		return "fst_ebz_90010_5920.act";
	} else if (specd == "6") {
		return "fst_ebz_20010_1010.act";
	} else if (specd == "7") {
		return "fst_ebz_a0010_1681.act";
	} else if (specd == "8") {
		return "fst_ebz_10010_1210.act";
	} else if (specd == "9") {
		return "fst_ebz_10020_1220.act";
	}
}

var flag_main_mn = false;
var flag_all_main = false;
var flag_main_mn_new = false;

function selectBox_BtnList(str_open){
	if( flag_main_mn == false ){
		if( subPageFlag ){
			$('#WrapAll #Header .gnb').append(setMenuGropContents());
		}else{
			$('#WrapAll #Header #header_div .gnb').append(setMenuGropContents());
		}

		flag_main_mn = true;
	}
	else if( flag_main_mn_new == false )
	{
		$('#WrapAll #Header .inner').append(setMenuGropContents());
		flag_main_mn_new = true;
	}

	var layer = $(".window_area > .all_mn_select_box");

	if( str_open == "close" ){
		layer.fadeOut("slow");
		flag_all_main = false;

	}else if( str_open == "open" ){
		layer.fadeIn("slow");

		$("#onlyFocus").focus();

		flag_all_main = true;

		if($(".gnb .titleTop > a").attr("title") == "금융상품몰"){
			$('.all_mn_bk_1').find('a').eq(3).focus();
			fun_sc(3);
		}else if($(".gnb .titleTop > a").attr("title") == "금융서비스"){
			$('.all_mn_bk_1').find('a').eq(4).focus();
			fun_sc(4);
		}else if($(".gnb .titleTop > a").attr("title") == "고객센터"){
			$('.all_mn_bk_1').find('a').eq(5).focus();
			fun_sc(5);
		}else if($(".gnb .titleTop > a").attr("title") == "은행소개"){
			$('.all_mn_bk_1').find('a').eq(6).focus();
			fun_sc(6);
		}else{
			$('.all_mn_bk_1').find('a').eq(0).focus();
		}

		// 사이버지점, 메인 숨김처리
//        $(".window_area .all_mn_select_box .pop_contents .cate_list .all_mn_eighth").hide();    // 사이버지점
//        $(".window_area .all_mn_select_box .pop_contents .cate_list .all_mn_tenth" ).hide();    // 메인
	}

	subPageFlag = false;
}

/**
 * 2023 홈페이지 메인 리뉴얼 - 전체메뉴
 * @param str_open
 */
function selectBox_BtnList_new(str_open){
	if( flag_main_mn_new == false )
	{
		$('#WrapAll #Header .inner').append(setMenuGropContents());
		flag_main_mn_new = true;
	}

	var layer = $(".window_area > .all_mn_select_box");

	if( str_open == "close" ){
		layer.fadeOut("slow");
		flag_main_mn_new = false;

	}else if( str_open == "open" ){
		layer.fadeIn("slow");

		$("#onlyFocus").focus();

		flag_main_mn_new = true;

		if($(".gnb .titleTop > a").attr("title") == "금융상품몰"){
			$('.all_mn_bk_1').find('a').eq(3).focus();
			fun_sc(3);
		}else if($(".gnb .titleTop > a").attr("title") == "금융서비스"){
			$('.all_mn_bk_1').find('a').eq(4).focus();
			fun_sc(4);
		}else if($(".gnb .titleTop > a").attr("title") == "고객센터"){
			$('.all_mn_bk_1').find('a').eq(5).focus();
			fun_sc(5);
		}else if($(".gnb .titleTop > a").attr("title") == "은행소개"){
			$('.all_mn_bk_1').find('a').eq(6).focus();
			fun_sc(6);
		}else{
			$('.all_mn_bk_1').find('a').eq(0).focus();
		}

//        // 사이버지점, 메인 숨김처리
//        $(".window_area .all_mn_select_box .pop_contents .cate_list .all_mn_eighth").hide();    // 사이버지점
//        $(".window_area .all_mn_select_box .pop_contents .cate_list .all_mn_tenth" ).hide();    // 메인

		// https://www.dgb.co.kr/cms/css/common/ebz_main.css 에서 display:none 처리하고 있기에 open일때 show 처리
		$(".dgbmain23 .window_area").show();
	}

	subPageFlag = false;
}

function getBankingMnuDt(gubun){
	var mnuData = new Object();
	var jexAjax = jex.createAjaxUtil("com_ebz_totalmenu_d001");

	jexAjax.set("TOP_LVL_ID", gubun);
	jexAjax.set("IBNK_MNU_CD", gubun);
	jexAjax.setAsync(false);

	jexAjax.execute(function(dat) {
		mnuData = dat;
	});

	return mnuData;
}

function allmenuLength(p) {
	setTimeout(function (){
		var arr = new Array();
		var liLeng1 = $('#wev_' + p + '').children('ul').children('li').length;
		var liLength1 = Math.ceil(liLeng1/4);
		for(var i=0; i < liLength1; i++){
			for(var j=0; j < 4; j++){
				arr[j] = $('#wev_' + p + '').children('ul').children('li').eq(((4*i)+j)).outerHeight();
			}
			var maxtm1 = Math.max.apply(null, arr);
			for(k=0; k<4; k++){
				$('#wev_' + p + '').children('ul').children('li').eq(((4*i)+k)).css('height', maxtm1 + 'px');
			}
		}
	}, 10);
}

var allmenu_length
	="<script>"
	+"setTimeout(function (){"
	+"var arr = new Array();"
	+"var liLeng1 = $('#wev_1').children('ul').children('li').length;"
	+"var liLength1 = Math.ceil(liLeng1/4);"
	+"for(var i=0; i < liLength1; i++){"
	+"	for(var j=0; j < 4; j++){"
	+"		arr[j] = $('#wev_1').children('ul').children('li').eq(((4*i)+j)).outerHeight();"
	+"	}"
	+"	var maxtm1 = Math.max.apply(null, arr);"
	+"	for(k=0; k<4; k++){"
	+"		$('#wev_1').children('ul').children('li').eq(((4*i)+k)).css('height', maxtm1 + 'px');"
	+"	}"
	+"}"
	+"}, 10);"
	+"</script>";

function setMenuGropContents(){
	var All_Mn_LyPop_main = '';
	All_Mn_LyPop_main += '<div class="window_area">';
	All_Mn_LyPop_main += '<div class="all_mn_select_box" style="display:none;">';
	All_Mn_LyPop_main += '<div class="popWrap" style="width:918px; border:#007dc4 1px solid;">';
	All_Mn_LyPop_main += '<div class="pop_head">';
	All_Mn_LyPop_main += '<h1 class="titleDep1">전체메뉴</h1>';
	All_Mn_LyPop_main += '</div>';
	All_Mn_LyPop_main += '<div class="pop_contents" style="padding:0;">';
	All_Mn_LyPop_main += '<div style="width:auto; height:620px;">';
//	All_Mn_LyPop_main += '<div style="width:auto; height:560px;">';
	All_Mn_LyPop_main += '<div class="cate_list"> ';

	//개인뱅킹
	All_Mn_LyPop_main += '<div class="all_mn_first">';
	All_Mn_LyPop_main += '<h3 class="all_mn_bk_1"><a href="javascript:fun_sc(0);" title="개인뱅킹">개인뱅킹</a></h3>';
	All_Mn_LyPop_main += '</div> ';
	All_Mn_LyPop_main += '<div class="all_mn_two_con scrollBoxPop_600" style="display:block;" id="wev">';
	All_Mn_LyPop_main += '<ul>';

	var bMnuData = getBankingMnuDt("A01");
	var trChkCnt = 0;

	if( bMnuData.REC1 != null ) {
		var len = bMnuData.REC1.length;
		$.each(bMnuData.REC1 , function( i , v ){
			if (v.STRT_PG_DRCTR_NM != 'rps') {
				if( v.MNU_LEVL_NO == "2" ){
					if( i == 0 ){
						All_Mn_LyPop_main += '<li>';
					}else{
						All_Mn_LyPop_main += '</dl>';
						All_Mn_LyPop_main += '</li>';

						if( ((trChkCnt%4)%4) == 0 ){
							All_Mn_LyPop_main += '<li class="clearBoth">';
						}else{
							All_Mn_LyPop_main += '<li>';
						}
					}

					All_Mn_LyPop_main += '<dl class="max_txt">';
					All_Mn_LyPop_main += '<dt><a href="#" class="linkMnu" data=\'' + jex.toStr(v) + '\' title="' + v.SCRN_PRGRM_NM + '">' + v.SCRN_PRGRM_NM + '</a></dt>';
					trChkCnt++;
				}else if( v.MNU_LEVL_NO != "1" ){
					All_Mn_LyPop_main += '<dd><a href="#" class="linkMnu" data=\'' + jex.toStr(v) + '\' title="' + v.SCRN_PRGRM_NM + '">' + v.SCRN_PRGRM_NM + '</a></dd>';
				}

				if( i == (len-1) ){
					All_Mn_LyPop_main += '</dl>';
					All_Mn_LyPop_main += '</li>';
				}
			}
		});
	}

	All_Mn_LyPop_main += '</ul>';
	All_Mn_LyPop_main += '</div>';

	//기업뱅킹
	All_Mn_LyPop_main += '<div class="all_mn_second">';
	All_Mn_LyPop_main += '<h3 class="all_mn_bk_1"><a href="javascript:fun_sc(1);" title="기업뱅킹">기업뱅킹</a></h3>';
	All_Mn_LyPop_main += '</div>';
	All_Mn_LyPop_main += '<div class="all_mn_two_con scrollBoxPop_600" style="display:none" id="wev">';
	All_Mn_LyPop_main += '<ul>';

	bMnuData = getBankingMnuDt("B01"); //메뉴코드 를 TO-BE 기업뱅킹 코드로 변경함 A02 : AS-IS 기업뱅킹 메뉴 코드 => B01 : TO-BE 기업뱅킹 메뉴 코드
	trChkCnt = 0;

	if( bMnuData.REC1 != null ) {
		var len = bMnuData.REC1.length;

		$.each(bMnuData.REC1 , function( i , v ){
			if (v.STRT_PG_DRCTR_NM != 'rps') {//퇴직연금이 아니면
				if( v.MNU_LEVL_NO == "2" ){
					if( i == 0 ){
						All_Mn_LyPop_main += '<li>';
					}else{
						All_Mn_LyPop_main += '</dl>';
						All_Mn_LyPop_main += '</li>';

						if( ((trChkCnt%4)%4) == 0 ){
							All_Mn_LyPop_main += '<li class="clearBoth">';
						}else{
							All_Mn_LyPop_main += '<li>';
						}
					}

					All_Mn_LyPop_main += '<dl class="max_txt">';
					All_Mn_LyPop_main += '<dt><a href="#" class="linkMnu" data=\'' + jex.toStr(v) + '\' title="' + v.SCRN_PRGRM_NM + '">' + v.SCRN_PRGRM_NM + '</a></dt>';
					trChkCnt++;
				} else if( v.MNU_LEVL_NO != "1" && v.MNU_LEVL_NO != "5" && !isEmpty(v.MNU_STRT_PG_NM)){ //5레벨 제외, 링크 없는 메뉴 제외
					All_Mn_LyPop_main += '<dd><a href="#" class="linkMnu" data=\'' + jex.toStr(v) + '\' title="' + v.SCRN_PRGRM_NM + '">' + v.SCRN_PRGRM_NM + '</a></dd>';
				}

				if( i == (len-1) ){
					All_Mn_LyPop_main += '</dl>';
					All_Mn_LyPop_main += '</li>';
				}
			}
		});
	}

	All_Mn_LyPop_main += '</ul>';
	All_Mn_LyPop_main += '</div>';

	//공인인증센터
	All_Mn_LyPop_main += '<div class="all_mn_third">';
	All_Mn_LyPop_main += '<h3 class="all_mn_bk_1"><a href="javascript:fun_sc(2);" title="인증센터">인증센터</a></h3>';
	All_Mn_LyPop_main += '</div>';
	All_Mn_LyPop_main += '<div class="all_mn_two_con scrollBoxPop_600" style="display:none" id="wev">';
	All_Mn_LyPop_main += '<ul>';

	bMnuData = getBankingMnuDt("A06");
	trChkCnt = 0;

	if( bMnuData.REC1 != null ) {
		var len = bMnuData.REC1.length;
		$.each(bMnuData.REC1 , function( i , v ){
			if( v.MNU_LEVL_NO == "1" ){
				if( i == 0 ){
					All_Mn_LyPop_main += '<li>';
				}else{
					All_Mn_LyPop_main += '</dl>';
					All_Mn_LyPop_main += '</li>';

					if( ((trChkCnt%4)%4) == 0 ){
						All_Mn_LyPop_main += '<li class="clearBoth">';
					}else{
						All_Mn_LyPop_main += '<li>';
					}
				}

				All_Mn_LyPop_main += '<dl class="max_txt">';
				All_Mn_LyPop_main += "<dt><a href=\"#\" onClick=\"crtMnuLink('" +v.IBNK_MNU_CD+ "','" +v.IBNK_UPPER_MNU_CD+ "');\" title=\"" + v.SCRN_PRGRM_NM + "\">" + v.SCRN_PRGRM_NM + "</a></dt>";

				trChkCnt++;
			}else if( v.MNU_LEVL_NO == "3" ){
				All_Mn_LyPop_main += "<dd><a href=\"#\" onClick=\"crtMnuLink('" +v.IBNK_MNU_CD+ "','" +v.IBNK_UPPER_MNU_CD+ "');\" title=\"" + v.SCRN_PRGRM_NM + "\">" + v.SCRN_PRGRM_NM + "</a></dd>";
			}

			if( i == (len-1) ){
				All_Mn_LyPop_main += '</dl>';
				All_Mn_LyPop_main += '</li>';
			}
		});
	}

	All_Mn_LyPop_main += '</ul>';
	All_Mn_LyPop_main += '</div>';

	//금융상품몰
	All_Mn_LyPop_main += '<div class="all_mn_fourth">';
	All_Mn_LyPop_main += '<h3 class="all_mn_bk_1"><a href="javascript:fun_sc(3);" title="금융상품몰">금융상품몰</a></h3>';
	All_Mn_LyPop_main += '</div>';
	All_Mn_LyPop_main += '<div class="all_mn_two_con scrollBoxPop_600" style="display:none" id="wev">';
	All_Mn_LyPop_main += '<ul>';

	bMnuData = getBankingMnuDt("H01");
	trChkCnt = 0;

	if( bMnuData.REC1 != null ) {
		var len = bMnuData.REC1.length;
		$.each(bMnuData.REC1 , function( i , v ){
			if( v.MNU_LEVL_NO == "1" ){
				if( i == 0 ){
					All_Mn_LyPop_main += '<li>';
				}else{
					All_Mn_LyPop_main += '</dl>';
					All_Mn_LyPop_main += '</li>';

					if( ((trChkCnt%4)%4) == 0 ){
						All_Mn_LyPop_main += '<li class="clearBoth">';
					}else{
						All_Mn_LyPop_main += '<li>';
					}
				}

				All_Mn_LyPop_main += '<dl class="max_txt">';

				var MNU_STRT_PG_NM = v.MNU_STRT_PG_NM.split(":");
				All_Mn_LyPop_main += "<dt><a href=\"#\" onClick=\"linkMenuPage('" +MNU_STRT_PG_NM[0]+ "','" +MNU_STRT_PG_NM[1]+ "','0','"+MNU_STRT_PG_NM[2]+"');\" title=\"" + v.SCRN_PRGRM_NM + "\">" + v.SCRN_PRGRM_NM + "</a></dt>";

				trChkCnt++;
			}else if( v.MNU_LEVL_NO == "2" ){
				var MNU_STRT_PG_NM = v.MNU_STRT_PG_NM.split(":");
				All_Mn_LyPop_main += "<dd><a href=\"#\" onClick=\"linkMenuPage('" +MNU_STRT_PG_NM[0]+ "','" +MNU_STRT_PG_NM[1]+ "','0','"+MNU_STRT_PG_NM[2]+"');\" title=\"" + v.SCRN_PRGRM_NM + "\">" + v.SCRN_PRGRM_NM + "</a></dd>";
			}

			if( i == (len-1) ){
				All_Mn_LyPop_main += '</dl>';
				All_Mn_LyPop_main += '</li>';
			}
		});
	}

	All_Mn_LyPop_main += '</ul>';
	All_Mn_LyPop_main += '</div>';

	//금융서비스
	All_Mn_LyPop_main += '<div class="all_mn_fifth">';
	All_Mn_LyPop_main += '<h3 class="all_mn_bk_1"><a href="javascript:fun_sc(4);" title="금융서비스">금융서비스</a></h3>';
	All_Mn_LyPop_main += '</div>';
	All_Mn_LyPop_main += '<div class="all_mn_two_con scrollBoxPop_600" style="display:none" id="wev">';
	All_Mn_LyPop_main += '<ul>';

	bMnuData = getBankingMnuDt("H02");
	trChkCnt = 0;

	if( bMnuData.REC1 != null ) {
		var len = bMnuData.REC1.length;
		$.each(bMnuData.REC1 , function( i , v ){
			if( v.MNU_LEVL_NO == "1" ){
				if( i == 0 ){
					All_Mn_LyPop_main += '<li>';
				}else{
					All_Mn_LyPop_main += '</dl>';
					All_Mn_LyPop_main += '</li>';

					if( ((trChkCnt%4)%4) == 0 ){
						All_Mn_LyPop_main += '<li class="clearBoth">';
					}else{
						All_Mn_LyPop_main += '<li>';
					}
				}

				All_Mn_LyPop_main += '<dl class="max_txt">';

				var MNU_STRT_PG_NM = v.MNU_STRT_PG_NM.split(":");
				All_Mn_LyPop_main += "<dt><a href=\"#\" onClick=\"linkMenuPage('" +MNU_STRT_PG_NM[0]+ "','" +MNU_STRT_PG_NM[1]+ "','0','"+MNU_STRT_PG_NM[2]+"');\" title=\"" + v.SCRN_PRGRM_NM + "\">" + v.SCRN_PRGRM_NM + "</a></dt>";

				trChkCnt++;
			}else if( v.MNU_LEVL_NO == "2" ){
				var MNU_STRT_PG_NM = v.MNU_STRT_PG_NM.split(":");
				All_Mn_LyPop_main += "<dd><a href=\"#\" onClick=\"linkMenuPage('" +MNU_STRT_PG_NM[0]+ "','" +MNU_STRT_PG_NM[1]+ "','0','"+MNU_STRT_PG_NM[2]+"');\" title=\"" + v.SCRN_PRGRM_NM + "\">" + v.SCRN_PRGRM_NM + "</a></dd>";
			}

			if( i == (len-1) ){
				All_Mn_LyPop_main += '</dl>';
				All_Mn_LyPop_main += '</li>';
			}
		});
	}

	All_Mn_LyPop_main += '</ul>';
	All_Mn_LyPop_main += '</div>';

	//고객센터
	All_Mn_LyPop_main += '<div class="all_mn_sixth">';
	All_Mn_LyPop_main += '<h3 class="all_mn_bk_1"><a href="javascript:fun_sc(5);" title="고객센터">고객센터</a></h3>';
	All_Mn_LyPop_main += '</div>';
	All_Mn_LyPop_main += '<div class="all_mn_two_con scrollBoxPop_600" style="display:none" id="wev">';
	All_Mn_LyPop_main += '<ul>';

	bMnuData = getBankingMnuDt("H03");
	trChkCnt = 0;

	if( bMnuData.REC1 != null ) {
		var len = bMnuData.REC1.length;
		$.each(bMnuData.REC1 , function( i , v ){
			if( v.MNU_LEVL_NO == "1" ){
				if( i == 0 ){
					All_Mn_LyPop_main += '<li>';
				}else{
					All_Mn_LyPop_main += '</dl>';
					All_Mn_LyPop_main += '</li>';

					if( ((trChkCnt%4)%4) == 0 ){
						All_Mn_LyPop_main += '<li class="clearBoth">';
					}else{
						All_Mn_LyPop_main += '<li>';
					}
				}

				All_Mn_LyPop_main += '<dl class="max_txt">';

				var MNU_STRT_PG_NM = v.MNU_STRT_PG_NM.split(":");
				All_Mn_LyPop_main += "<dt><a href=\"#\" onClick=\"linkMenuPage('" +MNU_STRT_PG_NM[0]+ "','" +MNU_STRT_PG_NM[1]+ "','0','"+MNU_STRT_PG_NM[2]+"');\" title=\"" + v.SCRN_PRGRM_NM + "\">" + v.SCRN_PRGRM_NM + "</a></dt>";

				trChkCnt++;
			}else if( v.MNU_LEVL_NO == "2" ){
				var MNU_STRT_PG_NM = v.MNU_STRT_PG_NM.split(":");
				All_Mn_LyPop_main += "<dd><a href=\"#\" onClick=\"linkMenuPage('" +MNU_STRT_PG_NM[0]+ "','" +MNU_STRT_PG_NM[1]+ "','0','"+MNU_STRT_PG_NM[2]+"');\" title=\"" + v.SCRN_PRGRM_NM + "\">" + v.SCRN_PRGRM_NM + "</a></dd>";
			}

			if( i == (len-1) ){
				All_Mn_LyPop_main += '</dl>';
				All_Mn_LyPop_main += '</li>';
			}
		});
	}

	All_Mn_LyPop_main += '</ul>';
	All_Mn_LyPop_main += '</div>';

	//DGB소개
	All_Mn_LyPop_main += '<div class="all_mn_seventh">';
	All_Mn_LyPop_main += '<h3 class="all_mn_bk_1"><a href="javascript:fun_sc(6);" title="은행소개">은행소개</a></h3>';
	All_Mn_LyPop_main += '</div>';
	All_Mn_LyPop_main += '<div class="all_mn_two_con scrollBoxPop_600" style="display:none" id="wev">';
	All_Mn_LyPop_main += '<ul>';

	bMnuData = getBankingMnuDt("H04");
	trChkCnt = 0;

	if( bMnuData.REC1 != null ) {
		var len = bMnuData.REC1.length;
		$.each(bMnuData.REC1 , function( i , v ){
			if( v.MNU_LEVL_NO == "1" ){
				if( i == 0 ){
					All_Mn_LyPop_main += '<li>';
				}else{
					All_Mn_LyPop_main += '</dl>';
					All_Mn_LyPop_main += '</li>';

					if( ((trChkCnt%4)%4) == 0 ){
						All_Mn_LyPop_main += '<li class="clearBoth">';
					}else{
						All_Mn_LyPop_main += '<li>';
					}
				}

				All_Mn_LyPop_main += '<dl class="max_txt">';

				var MNU_STRT_PG_NM = v.MNU_STRT_PG_NM.split(":");

				// 전체메뉴에서 새창 기능 적용
				var allMenuLinkUrl = "";
				if( MNU_STRT_PG_NM[0] == "LINK" )
				{
					allMenuLinkUrl = _CodeMgr.getCodeMsg(MNU_STRT_PG_NM[1], MNU_STRT_PG_NM[2]);
				}
				if( allMenuLinkUrl == "" )
				{
					All_Mn_LyPop_main += "<dt><a href=\"#\" onClick=\"linkMenuPage('" +MNU_STRT_PG_NM[0]+ "','" +MNU_STRT_PG_NM[1]+ "','0','"+MNU_STRT_PG_NM[2]+"');\" title=\"" + v.SCRN_PRGRM_NM + "\">" + v.SCRN_PRGRM_NM + "</a></dt>";
				}
				else
				{
					All_Mn_LyPop_main+= "<dt><a href=\"#\" onClick=\"f_windowOpenFunc('" +allMenuLinkUrl+"');\" title=\"" + v.SCRN_PRGRM_NM + "\">" + v.SCRN_PRGRM_NM + "</a></dt>";
				}

				trChkCnt++;
			}else if( v.MNU_LEVL_NO == "2" ){
				var MNU_STRT_PG_NM = v.MNU_STRT_PG_NM.split(":");

				// 전체메뉴에서 새창 기능 적용
				var allMenuLinkUrl = "";
				if( MNU_STRT_PG_NM[0] == "LINK" )
				{
					allMenuLinkUrl = _CodeMgr.getCodeMsg(MNU_STRT_PG_NM[1], MNU_STRT_PG_NM[2]);
				}
				if( allMenuLinkUrl == "" )
				{
					All_Mn_LyPop_main += "<dd><a href=\"#\" onClick=\"linkMenuPage('" +MNU_STRT_PG_NM[0]+ "','" +MNU_STRT_PG_NM[1]+ "','0','"+MNU_STRT_PG_NM[2]+"');\" title=\"" + v.SCRN_PRGRM_NM + "\">" + v.SCRN_PRGRM_NM + "</a></dd>";
				}
				else
				{
					All_Mn_LyPop_main+= "<dd><a href=\"#\" onClick=\"f_windowOpenFunc('" +allMenuLinkUrl+"');\" title=\"" + v.SCRN_PRGRM_NM + "\">" + v.SCRN_PRGRM_NM + "</a></dd>";
				}
			}

			if( i == (len-1) ){
				All_Mn_LyPop_main += '</dl>';
				All_Mn_LyPop_main += '</li>';
			}
		});
	}

	All_Mn_LyPop_main += '</ul>';
	All_Mn_LyPop_main += '</div>';
	/*	// 2023-05-18. 사이버지점, 메인 탭 제거
        //사이버지점
        All_Mn_LyPop_main += '<div class="all_mn_eighth">';
        All_Mn_LyPop_main += '<h3 class="all_mn_bk_1"><a href="javascript:fun_sc(7);" title="사이버지점">사이버지점</a></h3>';
        All_Mn_LyPop_main += '</div>';
        All_Mn_LyPop_main += '<div class="all_mn_two_con scrollBoxPop_600" style="display:none" id="wev">';
        All_Mn_LyPop_main += '<ul>';

        bMnuData = getBankingMnuDt("H50");
        trChkCnt = 0;

        if( bMnuData.REC1 != null ) {
            var len = bMnuData.REC1.length;
            $.each(bMnuData.REC1 , function( i , v ){
                if( v.MNU_LEVL_NO == "1" ){
                    if( i == 0 ){
                        All_Mn_LyPop_main += '<li>';
                    }else{
                        All_Mn_LyPop_main += '</dl>';
                        All_Mn_LyPop_main += '</li>';

                        if( ((trChkCnt%4)%4) == 0 ){
                            All_Mn_LyPop_main += '<li class="clearBoth">';
                        }else{
                            All_Mn_LyPop_main += '<li>';
                        }
                    }

                    All_Mn_LyPop_main += '<dl class="max_txt">';

                    var MNU_STRT_PG_NM = v.MNU_STRT_PG_NM.split(":");
                    var hpmpUrl        = _CodeMgr.getCodeMsg("CODE_URL", "1002");

                    if( v.STRT_PG_DRCTR_NM == "cdd") hpmpUrl = _CodeMgr.getCodeMsg("CODE_URL", "1085");
                    if( v.STRT_PG_DRCTR_NM == "cgr") hpmpUrl = _CodeMgr.getCodeMsg("CODE_URL", "1086");

                    All_Mn_LyPop_main += "<dt><a href=\"#\" onClick=\"linkMenuPageMain('" +MNU_STRT_PG_NM[0]+ "','" +MNU_STRT_PG_NM[1]+ "','0','" +MNU_STRT_PG_NM[2]+"','"+v.STRT_PG_DRCTR_NM+"');\" title=\"" + v.SCRN_PRGRM_NM + "\">" + v.SCRN_PRGRM_NM + "</a></dt>";

                    trChkCnt++;
                }else if( v.MNU_LEVL_NO == "2" ){
                    var MNU_STRT_PG_NM = v.MNU_STRT_PG_NM.split(":");
                    var hpmpUrl        = _CodeMgr.getCodeMsg("CODE_URL", "1002");

                    if( v.STRT_PG_DRCTR_NM == "cdd") hpmpUrl = _CodeMgr.getCodeMsg("CODE_URL", "1085");
                    if( v.STRT_PG_DRCTR_NM == "cgr") hpmpUrl = _CodeMgr.getCodeMsg("CODE_URL", "1086");

                    All_Mn_LyPop_main += "<dd><a href=\"#\" onClick=\"linkMenuPageMain('" +MNU_STRT_PG_NM[0]+ "','" +MNU_STRT_PG_NM[1]+ "','0','" +MNU_STRT_PG_NM[2]+"','"+v.STRT_PG_DRCTR_NM+"');\" title=\"" + v.SCRN_PRGRM_NM + "\">" + v.SCRN_PRGRM_NM + "</a></dd>";
                }

                if( i == (len-1) ){
                    All_Mn_LyPop_main += '</dl>';
                    All_Mn_LyPop_main += '</li>';
                }
            });
        }
        All_Mn_LyPop_main += '</ul>';
        All_Mn_LyPop_main += '</div>';
     */

	// 퇴직연금(S)
//	All_Mn_LyPop_main += '<div class="all_mn_ninth">';
	All_Mn_LyPop_main += '<div class="all_mn_eighth">';
//	All_Mn_LyPop_main += '<h3 class="all_mn_bk_1"><a href="javascript:fun_sc(8);" title="퇴직연금">퇴직연금</a></h3>';
	All_Mn_LyPop_main += '<h3 class="all_mn_bk_1"><a href="javascript:fun_sc(7);" title="퇴직연금">퇴직연금</a></h3>';
	All_Mn_LyPop_main += '</div>';
	All_Mn_LyPop_main += '<div class="all_mn_two_con scrollBoxPop_600" style="display:none" id="wev">';
	All_Mn_LyPop_main += '<ul>';

	bMnuData = getBankingMnuDt("R01");
	trChkCnt = 0;

	if( bMnuData.REC1 != null ) {
		var len = bMnuData.REC1.length;

		$.each(bMnuData.REC1 , function( i , v ){
			if( v.MNU_LEVL_NO == "2" ){
				if( i == 0 ){
					All_Mn_LyPop_main += '<li>';
				}else{
					All_Mn_LyPop_main += '</dl>';
					All_Mn_LyPop_main += '</li>';

					if( ((trChkCnt%4)%4) == 0 ){
						All_Mn_LyPop_main += '<li class="clearBoth">';
					}else{
						All_Mn_LyPop_main += '<li>';
					}
				}

				All_Mn_LyPop_main += '<dl class="max_txt">';
				All_Mn_LyPop_main += '<dt><a href="#" class="linkMnu" data=\'' + jex.toStr(v) + '\' title="' + v.SCRN_PRGRM_NM + '">' + v.SCRN_PRGRM_NM + '</a></dt>';
				trChkCnt++;
			} else if( v.MNU_LEVL_NO != "1"){
				All_Mn_LyPop_main += '<dd><a href="#" class="linkMnu" data=\'' + jex.toStr(v) + '\' title="' + v.SCRN_PRGRM_NM + '">' + v.SCRN_PRGRM_NM + '</a></dd>';
			}

			if( i == (len-1) ){
				All_Mn_LyPop_main += '</dl>';
				All_Mn_LyPop_main += '</li>';
			}
		});
	}
	// 퇴직연금(E)

	All_Mn_LyPop_main += '</ul>';
	All_Mn_LyPop_main += '</div>';
	/*  // 2023-05-18. 사이버지점, 메인 탭 제거
        //홈페이지 메인
        All_Mn_LyPop_main += "<div class=\"all_mn_tenth\">";
        All_Mn_LyPop_main += "<h3 class=\"all_mn_bk_1\"><a href=\"javascript:fun_sc(9);\" title=\"메인\">메인</a></h3>";
        All_Mn_LyPop_main += "</div>";
        All_Mn_LyPop_main += "<div class=\"all_mn_two_con\" style=\"display:none;\" id=\"wev\">";

        var jexAjax= jex.createAjaxUtil("JEX_EBZ_HELP_DATA");
        jexAjax.setAsync(false);
        jexAjax.set("MNU_STRT_PG_NM", "com_ebz_11010_J001");
        jexAjax.set("LANG_DVCD"     , "KR");

        jexAjax.execute(function(dat) {
            $.each( dat.REC, function(i,v){
                if(v.MODE_ID == "GD2001"){
                    All_Mn_LyPop_main += v.CONTS_CN
                }
            });
        });

         All_Mn_LyPop_main += "</div>";
     */
	All_Mn_LyPop_main += "</div>";
	All_Mn_LyPop_main += "</div>";
	All_Mn_LyPop_main += "<span><button type=\"button\" onclick=\"javascript:selectBox_BtnList('close');\" class=\"pop_close\" title=\"닫기\">닫기</button></span>";
	All_Mn_LyPop_main += "</div>";
	All_Mn_LyPop_main += "</div>";
	All_Mn_LyPop_main += "</div>";
	All_Mn_LyPop_main += "</div>";
	return All_Mn_LyPop_main;
}

function crtMnuLink(IBNK_MNU_CD,IBNK_UPPER_MNU_CD){
	selectBox_BtnList("close");

	dataCtrl.delObjData("MENU_LOCATION");

	var obj = {'IBNK_MNU_CD':IBNK_MNU_CD,'IBNK_UPPER_MNU_CD':IBNK_UPPER_MNU_CD,'MNU_LEVL_NO':'3','TOPLVL_MNU_ID':"A06",'STRT_PG_DRCTR_NM':"crt"};
	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));

	// 인증서 이동 시  금융/공동 구분 처리
	var bankUrl  = _CodeMgr.getCodeMsg("CODE_URL", "1001");
	// location.href = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1041");
	top.location.href = bankUrl  + "com_ebz_crt_sub_main.act";
}

//전체매뉴 온,오프
function fun_sc(seq){
	$('.cate_list').find('#wev').css('display','none');
	$('.cate_list').find('#wev').eq(seq).css('display','block');
}

function goLinkPage(dt){
	var obj = {'IBNK_MNU_CD':dt.IBNK_MNU_CD,'IBNK_UPPER_MNU_CD':dt.IBNK_UPPER_MNU_CD,'MNU_LEVL_NO':dt.MNU_LEVL_NO,'TOPLVL_MNU_ID':dt.TOP_LVL_ID,'STRT_PG_DRCTR_NM':dt.STRT_PG_DRCTR_NM };

	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");
	jexAjax.execute(function(dat) {
		if( dat.USPS_ID == null ){
			selectBox_BtnList("close");

			dataCtrl.delObjData("MENU_LOCATION");
			dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));

			var objLk = {'HP_BK':'BK','LOCATION_PAGE': getUrl("dgb_login")};
			dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));

			// 퇴직연금(S)
			if (/rps\.h0[1-4]/.test(dt.STRT_PG_DRCTR_NM)) {
				location.href = _CodeMgr.getCodeMsg("CODE_URL", "1001") + 'com_ebz_rps_main.act';
				return;
			}
			// 퇴직연금(E)

			//조회서비스 로그인 생략
			var nonsign_url = _CodeMgr.getCodeMsg('NONSIGN_CODE', dt.IBNK_MNU_CD);
			if(jex.null2Void(nonsign_url)!= ""){
				var movePage = "";

				if( dt.TOP_LVL_ID == "A01" ){
					movePage = "com_ebz_pib_main.act";
				} else if( dt.TOP_LVL_ID == "A02" ){
					movePage = "com_ebz_cib_main.act";
				} else if( dt.TOP_LVL_ID == "B01" ){ //기업뱅킹 메뉴 이면 TO-BE 메인 페이지로 이동
					movePage = "com_ebz_cibv1_main.act";
				}

				location.href =_CodeMgr.getCodeMsg("CODE_URL", "1001")+ movePage;
				return;
			}

			location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");  //https://banking.dgb.co.kr/index.jsp
		}else{
			selectBox_BtnList("close");

			dataCtrl.delObjData("MENU_LOCATION");
			dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));

			var movePage = "";

			if( dt.TOP_LVL_ID == "A01" ){
				movePage = "com_ebz_pib_main.act";
			} else if( dt.TOP_LVL_ID == "A02" ){
				movePage = "com_ebz_cib_main.act";
			} else if( dt.TOP_LVL_ID == "B01" ){//기업뱅킹 메뉴 이면 TO-BE 메인 페이지로 이동
				movePage = "com_ebz_cibv1_main.act";
			} else if(dt.TOP_LVL_ID == "R01"){                // 퇴직연금(S)
				var strtPgNm  = dt.STRT_PG_DRCTR_NM;
				var sessDvVal = dat.USER_DV_VAL;
				var userDvVal = '';
				var flag 	  = false;
				var	msg  	  = '';

				if (strtPgNm == 'rps.pib' && /[23]/.test(sessDvVal)) {
					userDvVal = '1';
					flag 	  = true;
					msg  	  = _CodeMgr.getCodeMsg('RSPS_CD', 'VAL1706');
				}
				if (strtPgNm == 'rps.cib' && /[1]/.test(sessDvVal)) {
					userDvVal = '2';
					flag 	  = true;
					msg 	  = _CodeMgr.getCodeMsg('RSPS_CD', 'VAL1705');
				}
				if (flag) {
					if (confirm((msg.replace("..", ".\n\n").replace("..", ".\n\n")))) {
						startLogOut();
//						var jexAjax = jex.createAjaxUtil("com_ebz_logout");
//						jexAjax.execute(function(dat){
//							location.href = "https://banking.dgb.co.kr/com_ebz_rps_sub_main.act";
//						});
					}
					return;
				}
				movePage = "com_ebz_rps_main.act";
			}
			// 퇴직연금(E)

			var objLk = {'HP_BK':'BK','LOCATION_PAGE': movePage};
			dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));

			if (  dt.TOP_LVL_ID == "B01" ){//기업뱅킹 메뉴 이면 TO-BE 메인 페이지로 이동
				location.href =_CodeMgr.getCodeMsg("CODE_URL", "1001") + movePage;
			} else {
				location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");  //https://banking.dgb.co.kr/index.jsp
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