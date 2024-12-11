if (document.domain != "www.doksamo.co.kr" && document.URL != "https://www.dgb.co.kr/dgb_ebz_main.jsp" && document.URL != "https://www.imbank.co.kr/dgb_ebz_main.jsp") {
	document.write(unescape("%3Cscript type='text/javascript'  src='/printmade/setup/server_files/ebz_Printmade2.js?timestamp=20241004' type='text/javascript'%3E%3C/script%3E"));
}

var _LOGOUT_PAGE 		= "";
var _DFM_LOGOUT_PAGE 	= "";
var _DLO_LOGOUT_PAGE	= "";
var _PREV_LOGIN_PAGE	= "";
var _IS_RENEWAL_PAGE    = false;    // 메인개편화면여부

$(document).ready(function(){
	_LOGOUT_PAGE 		= _CodeMgr.getCodeMsg("CODE_URL", "1002");
	_DFM_LOGOUT_PAGE 	= getUrl("dfm");
	_DLO_LOGOUT_PAGE	= _CodeMgr.getCodeMsg("CODE_URL", "1020");
	_PREV_LOGIN_PAGE	= _CodeMgr.getCodeMsg("CODE_URL", "1002");

});

// * 로그인세션체크..
// * obj.LOGIN_DVCD
// * 0:logout,1:ibs,2:hmp
sessionInfo=undefined;

function getLoginSessionInfo(b){
	if(b&&sessionInfo) return sessionInfo;

	var obj = new Object();
	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");
	jexAjax.setAsync(false);

	jexAjax.execute(function(dat) {
		obj.LOGIN_DVCD 		= "0";	//logout
		obj.USPS_ID 		= dat.USPS_ID;
		obj.RNNO			= dat.RNNO;
		obj.CSNO			= dat.CSNO;
		obj.CUST_SEQ		= dat.CUST_SEQ;
		obj.CFT_LOGIN_YN	= dat.CFT_LOGIN_YN;
		obj.USER_DV_VAL     = dat.USER_DV_VAL;
		obj.PRSNL_IMG_VAL   = dat.PRSNL_IMG_VAL;
		obj.DSS_TT_PSBLYN	= dat.DSS_TT_PSBLYN;	//한수원 1,2,3 sms발송가능
		obj.EFN_DELR_DVCD   = dat.EFN_DELR_DVCD;

		//홈페이지사용자구분
		if( dat.HMPG_USER_YN == "N" ) {
			//banking
			if( null != dat.BZMAN_NM && "" != dat.BZMAN_NM) {
				obj.LOGIN_DVCD = "1";	//ibs
				obj.CUST_NM 	= dat.BZMAN_NM;
			}
		} else if( dat.HMPG_USER_YN == "Y" ) {
			//homepage
			if( null != dat.CUST_NM && "" != dat.CUST_NM) {
				obj.LOGIN_DVCD = "2";	//hmp
				obj.CUST_NM 	= dat.CUST_NM;
			}
		}
		sessionInfo = obj;
	});

	return obj;
}

function hmpTempPwdChk(info){
	if (info){
		if( null != info.TEMP_PSWD_ISU_DTTI && "" != info.TEMP_PSWD_ISU_DTTI ) {
			alert("임시비밀번호 변경 후 이용가능합니다.");
			linkMenuPage('mem_mem_sub4_2','mem_mem_sub4','1', 'com_ebz_mem_main.act');
		}
	} else {
		var jexAjax = jex.createAjaxUtil("com_ebz_user_info");
		jexAjax.setAsync(false);

		jexAjax.execute(function(dat) {
			if( null != dat.TEMP_PSWD_ISU_DTTI && "" != dat.TEMP_PSWD_ISU_DTTI ) {
				alert("임시비밀번호 변경 후 이용가능합니다.");
				linkMenuPage('mem_mem_sub4_2','mem_mem_sub4','1', 'com_ebz_mem_main.act');
			}
		});
	}
}

function getDfmLoginSessionInfo(){
	var obj = new Object();
	var jexAjax = jex.createAjaxUtil("com_ebz_dfm_user_info");
	jexAjax.setAsync(false);

	jexAjax.execute(function(dat) {
		obj.USPS_ID 				= dat.USPS_ID;
		obj.USER_NM 				= dat.USER_NM;
		obj.CSNO					= dat.CSNO;
		obj.CUST_SEQ				= dat.CUST_SEQ;
		obj.MNGR_YN					= dat.MNGR_YN;
		obj.TEMP_PSWD_ISU_DTTI		= dat.TEMP_PSWD_ISU_DTTI;
		obj.CNSL_CENTR_AUTH_DVCD	= dat.CNSL_CENTR_AUTH_DVCD;
		obj.LOGIN_STC				= dat.LOGIN_STC;
		obj.COMU_MBRSP_STC1			= dat.COMU_MBRSP_STC1;
		obj.COMU_MBRSP_STC2			= dat.COMU_MBRSP_STC2;
		obj.COMU_MBRSP_STC3			= dat.COMU_MBRSP_STC3;
		obj.ANCE_ARTC_OTHBC_YN1		= dat.ANCE_ARTC_OTHBC_YN1;//동우회
		obj.ANCE_ARTC_OTHBC_YN2		= dat.ANCE_ARTC_OTHBC_YN2;//한우리
		obj.ANCE_ARTC_OTHBC_YN3		= dat.ANCE_ARTC_OTHBC_YN3;//대은골프동호회
	});

	return obj;
}

function getDfmLoginSessionInfoMem(){

	var obj = new Object();
	var jexAjax = jex.createAjaxUtil("com_ebz_dfm_user_info");

	jexAjax.setAsync(false);

	jexAjax.execute(function(dat) {
		obj.USPS_ID 				= dat.USPS_ID;
		obj.USER_NM 				= dat.USER_NM;
		obj.CSNO					= dat.CSNO;
		obj.CUST_SEQ				= dat.CUST_SEQ;
		obj.MNGR_YN					= dat.MNGR_YN;
		obj.TEMP_PSWD_ISU_DTTI		= dat.TEMP_PSWD_ISU_DTTI;
		obj.CNSL_CENTR_AUTH_DVCD	= dat.CNSL_CENTR_AUTH_DVCD;
		obj.LOGIN_STC				= dat.LOGIN_STC;
		obj.COMU_MBRSP_STC1			= dat.COMU_MBRSP_STC1;
		obj.COMU_MBRSP_STC2			= dat.COMU_MBRSP_STC2;
		obj.COMU_MBRSP_STC3			= dat.COMU_MBRSP_STC3;
		obj.ANCE_ARTC_OTHBC_YN1		= dat.ANCE_ARTC_OTHBC_YN1;//동우회
		obj.ANCE_ARTC_OTHBC_YN2		= dat.ANCE_ARTC_OTHBC_YN2;//한우리
		obj.ANCE_ARTC_OTHBC_YN3		= dat.ANCE_ARTC_OTHBC_YN3;//대은골프동호회
	});

	return obj;
}

function dfmTempPwdChk(){

	var obj = new Object();
	var jexAjax = jex.createAjaxUtil("com_ebz_dfm_user_info");

	jexAjax.setAsync(false);

	jexAjax.execute(function(dat) {
		obj.USPS_ID 				= dat.USPS_ID;
		obj.USER_NM 				= dat.USER_NM;
		obj.CSNO					= dat.CSNO;
		obj.CUST_SEQ				= dat.CUST_SEQ;
		obj.MNGR_YN					= dat.MNGR_YN;
		obj.TEMP_PSWD_ISU_DTTI		= dat.TEMP_PSWD_ISU_DTTI;
		obj.CNSL_CENTR_AUTH_DVCD	= dat.CNSL_CENTR_AUTH_DVCD;
		obj.LOGIN_STC				= dat.LOGIN_STC;
		obj.COMU_MBRSP_STC1			= dat.COMU_MBRSP_STC1;
		obj.COMU_MBRSP_STC2			= dat.COMU_MBRSP_STC2;
		obj.COMU_MBRSP_STC3			= dat.COMU_MBRSP_STC3;
		obj.ANCE_ARTC_OTHBC_YN1		= dat.ANCE_ARTC_OTHBC_YN1;//동우회
		obj.ANCE_ARTC_OTHBC_YN2		= dat.ANCE_ARTC_OTHBC_YN2;//한우리
		obj.ANCE_ARTC_OTHBC_YN3		= dat.ANCE_ARTC_OTHBC_YN3;//대은골프동호회
	});

	if( null != obj.TEMP_PSWD_ISU_DTTI && "" != obj.TEMP_PSWD_ISU_DTTI ) {
		var curMenu = dataCtrl.getObjData("MENU_LOCATION");
		if(curMenu.MENU_LOCATION != 'dfm_mem_sub4_2') {
			tempPswdChk(obj.TEMP_PSWD_ISU_DTTI, "dfm");
		}
	}
}

function getDloLoginSessionInfo(){
	var obj = new Object();

	var jexAjax = jex.createAjaxUtil("com_ebz_dlo_user_info");
	jexAjax.setAsync(false);
	jexAjax.execute(function(dat) {

		obj.USPS_ID 				= dat.USPS_ID;
		obj.USER_NM 				= dat.USER_NM;
		obj.CSNO					= dat.CSNO;
		obj.CUST_SEQ				= dat.CUST_SEQ;
		obj.TEMP_PSWD_ISU_DTTI		= dat.TEMP_PSWD_ISU_DTTI;
		obj.DOKDO_LV_GATH_MBRSP_GDC	= dat.DOKDO_LV_GATH_MBRSP_GDC;
		obj.IP_ADDR					= dat.IP_ADDR;
//		obj.BIRD					= dat.BIRD;

	});

	return obj;
}

function getSessionInfoMain(){
	var obj = new Object();
	obj = getLoginSessionInfo();

	if( obj.LOGIN_DVCD == "0" ) {
		drawHomeMainLogOutStat();			//logout
	} else if( obj.LOGIN_DVCD == "1" ) {
		drawHomeMainLoginStat(obj.CUST_NM, obj.LOGIN_DVCD, obj.USER_DV_VAL, obj.PRSNL_IMG_VAL);			//login
	} else if( obj.LOGIN_DVCD == "2" ) {
		drawHomeMainLoginStat(obj.CUST_NM, obj.LOGIN_DVCD, obj.USER_DV_VAL, obj.PRSNL_IMG_VAL);			//login
	} else {
		drawHomeMainLogOutStat();			//logout
	}
}

function chkSessionInfo(sGb){
	var obj = new Object();

	if( sGb == "1" ){ 			// 홈페이지
		obj = getLoginSessionInfo();
	}else if( sGb == "2" ){ 	// DGB 패밀리
		obj = getDfmLoginSessionInfo();
	}else if( sGb == "3" ){ 	// 독사모
		obj = getDloLoginSessionInfo();
	}

	if( null == obj.USPS_ID || "" == obj.USPS_ID ) {
		alert("로그인 후 이용 가능합니다.");
		return false;
	}else{
		return true;
	}
}

function chkSessionInfo1(type){
	var obj = new Object();

	obj = getLoginSessionInfo();

	if( null == obj.USPS_ID || "" == obj.USPS_ID ) {
		alert("로그인 후 이용 가능합니다.");
		location.href = getUrl("dgb_login");
	} else {
		var jexAjax = jex.createAjaxUtil("com_ebz_chklogin_r001");

		jexAjax.set("USPS_ID",		obj.USPS_ID);

		jexAjax.execute(function(dat) {
			if(jex.isError(dat)){
				jex.printError(dat.COMMON_HEAD.CODE, dat.COMMON_HEAD.MESSAGE);	//오류메시지만 출력
			} else {
				if (type == "1") {			// 사이버독도
					window.open(_CodeMgr.getCodeMsg("CODE_URL", "1104"), "_blank");
				} else if (type == "2") {	// 사이버그린
					window.open(_CodeMgr.getCodeMsg("CODE_URL", "1105"), "_blank");
				} else if (type == "3") {	// 사이버경주
					window.open(_CodeMgr.getCodeMsg("CODE_URL", "1106"), "_blank");
				} else if (type == "4") {	// 사이버한수원
					window.open(_CodeMgr.getCodeMsg("CODE_URL", "1107"), "_blank");
				} else if (type == "5") {	// 사이버혁신도시
					window.open(_CodeMgr.getCodeMsg("CODE_URL", "1108"), "_blank");
				}
			}
		});
	}
}

function drawHomeMainLogOutStat(){

	var makeHtml = "";

	makeHtml += "<ul class=\"login_box\">";
	makeHtml += "	<div id=\"homeTop_login\" class=\"tLayerMenu\" style=\"width:35px; height:20px;\"><a href=\"javascript:goSubMain('dgb_login');\" class=\"login_btnBG\" title=\"로그인\"><strong>로그인</strong></a>";
	makeHtml += "		<ul style=\"visibility:hidden; margin-top:-32px; margin-left:-30px; width:122px;\">";
	makeHtml += "			<div style=\"margin-top:7px; margin-left:28px;\"><a href=\"javascript:goSubMain('dgb_login');\" class=\"login_btnBG\" title=\"로그인\"><strong>로그인</strong></a></div>";
	makeHtml += "			<li><a href=\"javascript:goSubMain('dgb_login');\" title=\"일반(선택) 로그인 \">일반(선택) 로그인</a></li>";
	makeHtml += "			<li><a href=\"javascript:goSubMain('crt_login');\" class=\"point_red\" title=\"인증서 로그인\">인증서 로그인</a></li>";
	makeHtml += "		</ul>";
	makeHtml += "	</div>";
	makeHtml += "	<li style=\"margin-left:75px;\"><a href=\"javascript:goSubMain('crt');\" class=\"cert_txt\" title=\"인증센터\"><strong>인증센터</strong></a></li>";
	makeHtml += "	<li><a href=\"javascript:linkMenuPage('','hlp_hss_sub1','0','com_ebz_hlp_main.act');\" class=\"member_txt\" title=\"금융상품공시실\"><strong>금융상품공시실</strong></a></li>";
	makeHtml += "	<li><a href=\"https://banking.dgb.co.kr/fst_ebz_sub_main.act\" class=\"member_txt\" style=\"color: #cc6633;\" title=\"간편서비스\"><strong>간편서비스</strong></a></li>";
	makeHtml += "</ul>";

	$("#login").append(makeHtml);


	var platform_filter = "win16|win32|win64";

	if(platform_filter.indexOf(navigator.platform.toLowerCase())>0){
		$('#homeTop_login').bind('mouseover', loginVisible);
		$('#homeTop_login').bind('mouseout',  loginHidden);
	}
}

function loginVisible(){
	$(this).find('ul').eq(0).css('visibility', 'visible');
}

function loginHidden(){
	$(this).find('ul').eq(0).css('visibility', 'hidden');
}

function drawHomeMainLoginStat(CUST_NM, LOGIN_DVCD, USER_DV_VAL, imgVal){
	var makeHtml = "";

	makeHtml +=	  '<ul class="login_box">';

	if( "1" == LOGIN_DVCD ) {

		if(imgVal == null || imgVal == '' || imgVal == 0) {
		}else{
			makeHtml += '<li><img src=\"https://banking.dgb.co.kr/img/common/emoticon/ebz_es_imoticon_'+ (imgVal<=9?'0':'') + imgVal+'.png\" alt=\"이모티콘'+imgVal+'\" style=\"width:25px; height:25px;\" title=\"이모티콘'+imgVal+'\"></li>';
		}
	}

	makeHtml +=	"<li class=\"member_box\"><label>"+CUST_NM+"</label> 고객님</li>";

	if( "1" == LOGIN_DVCD ) {
		makeHtml += '<li  style="padding-top:5px; padding-right:2px; padding-left:2px;"><a href="javascript:myPage();" class="mypage" title="MY PAGE 바로가기"><img src="../img/common/btn/ebz_btn_loginMP.gif" alt="MY PAGE"></a></li>';
	}

	makeHtml += '<li style="padding-top:3px; padding-left:13px;"><span class="btn_login_small_box"><a href="javascript:startLogOut();" title="로그아웃" style="display:inline-block;"><strong>로그아웃</strong></a></span></li>';

	if( "2" == LOGIN_DVCD ) {
		makeHtml +=	"<li style=\"padding-top:3px;margin-left:10px;\"><span class=\"btn_login_small_box\"><a href=\"javascript:linkMenuPage('mem_mem_sub4_1','mem_mem_sub4','0', '/com_ebz_mem_main.act')\" title=\"정보변경\" style=\"display:inline-block;\">정보변경</a></span></li>";
	}

	if( "1" == LOGIN_DVCD ) {
		makeHtml += "<li><a href=\"https://banking.dgb.co.kr/fst_ebz_sub_main.act\" class=\"member_txt\" style=\"color: #cc6633;\" title=\"간편서비스\"><strong>간편서비스</strong></a></li>";
	}else{
		makeHtml += "<li class=\"safe_align\" style=\"padding-left:10px;\"><a href=\"javascript:linkMenuPage('hlp_hvs_sub3_1','hlp_hvs_sub3','0', 'com_ebz_hlp_main.act')\" title=\"인터넷뱅킹 안전지킴이\"><img src=\"../img/common/main/ebz_top_btn_safe_2.gif\" alt=\"인터넷뱅킹 안전지킴이\"></a></li>";
	}

	makeHtml +=	  '</ul>';

	$("#login").append(makeHtml);
	sessionCountdown("sessionCount",dbSessionTime,0, 'N');
}



function drawSubMainLogOutStat(){
	var makeHtml = "";
	makeHtml = "<a href=\"javascript:loginPage();\" class=\"route_login\" title=\"로그인\">로그인</a> <a href=\"javascript:goSubMain('crt');\" title=\"인증센터\">인증센터</a> <a href=\"javascript:goSubMain('mem');\" title=\"회원가입\">회원가입</a>";

	$("#login").append(makeHtml);
}

function drawSubCyberMainLogOutStat(val){
	var makeHtml = "";
	//if (val == "cct" || val == "cdd" || ){
	makeHtml = "<li class=\"log_in\"><span class=\"btn_ty01\"><a href=\"javascript:loginPage();\" title=\"로그인\">로그인</a></span><span class=\"btn_ty03\"><a href=\"javascript:goSubMain('crt');\" title=\"인증센터\">인증센터</a></span></li>";

	/*}else{
		makeHtml = "<a href=\"javascript:loginPage();\" class=\"route_login\" title=\"로그인\">로그인</a> <a href=\"javascript:goSubMain('crt');\" title=\"공인인증센터\">공인인증센터</a>";
	}*/

	$("#login").append(makeHtml);
}

function drawSubMainLogInStatIB(name, imgVal){
	var makeHtml = "";

	if(imgVal == null || imgVal == '' || imgVal == 0) {
	} else {
		makeHtml += '<span class=\"eiconImg\"><img src=\"https://banking.dgb.co.kr/img/common/emoticon/ebz_es_imoticon_'+ (imgVal<=9?'0':'') +imgVal+'.png\" alt=\"이모티콘'+imgVal+'\" title=\"이모티콘'+imgVal+'\" style=\"width:25px; height:25px;\"></span>';
	}

	makeHtml += '<span class="member"><span class="bzman_nm" id="bzman_nm">'+name+'</span> 고객님</span>&nbsp;';
	makeHtml += '<a href="javascript:myPage();" class="mypage" title="MY PAGE 바로가기"><img src="../img/common/btn/ebz_btn_loginMP.gif" alt="MY PAGE"></a>&nbsp;';
	makeHtml += '<span class="btn_login_small_box"><a title="로그아웃" href=\"javascript:startLogOut();">로그아웃</a></span> ';

	if(BankingDvcd){
		makeHtml += '<span style="margin-left:20px;"><a class="point_blue" title="이전 뱅킹서비스 바로가기" href=\"javascript:aaaaaa();">이전뱅킹서비스 바로가기</a></span> ';
	}

	$("#login").append(makeHtml);
	sessionCountdown("sessionCount",dbSessionTime,0, 'N');
}

function drawSubMainLogInStat(name){
	var makeHtml = "";

	makeHtml += '<span class="member"><span class="bzman_nm" i ="bzman_nm">'+name+'</span> 고객님</span>&nbsp;';
	makeHtml += '<span class="btn_login_small_box"><a title="로그아웃" href=\"javascript:startLogOut();">로그아웃</a></span> ';

	$("#login").append(makeHtml);
	sessionCountdown("sessionCount",dbSessionTime,0, 'N');
}

function drawSubCyberLogInStatIB(name, imgVal, sub) {
	var page = getUrl("dgb");

	if( sub == "cdd" ) {page = getUrl("cdd");}
	if( sub == "cgr" ) {page = getUrl("cgr");}
	if( sub == "cgj" ) {page = getUrl("cgj");}
	if( sub == "chs" ) {page = getUrl("chs");}
	if( sub == "cct" ) {page = getUrl("cct");}

	var makeHtml = "";
	makeHtml += "<li class=\"log_in\"><div class=\"custom\">";
	if(imgVal == null || imgVal == '' || imgVal == 0) {
	} else {
		//makeHtml += '<span class=\"eiconImg\"><img src=\"/img/common/emoticon/ebz_es_imoticon_'+ (imgVal<=9?'0':'') +imgVal+'.png\" alt=\"이모티콘'+imgVal+'\" title=\"이모티콘'+imgVal+'\" style=\"width:25px; height:25px;\"></span>';
		makeHtml += '<img src=\"https://banking.dgb.co.kr/img/common/emoticon/ebz_es_imoticon_'+ (imgVal<=9?'0':'') +imgVal+'.png\" alt=\"이모티콘'+imgVal+'\" title=\"이모티콘'+imgVal+'\" style=\"width:25px; height:25px;\">';
	}
	//makeHtml += '<span class="member"><span class="bzman_nm">'+name+'</span> 고객님</span>&nbsp;';
	//makeHtml += "<span class=\"btn_login_small_box\"><a title=\"로그아웃\" href=\"javascript:logOutMove('"+page+"');\">로그아웃</a></span>";

	makeHtml += '<span class="name"><strong>'+name+'</strong> 고객님</span></div>';
	makeHtml += "<div class=\"log_out_btn\"><span class=\"btn_ty01\"><a title=\"로그아웃\" href=\"javascript:logOutMove('"+page+"');\">로그아웃</a></span>";


	if(BankingDvcd){
		makeHtml += '<span class="btn_ty03 go_btn"><a class="" title="이전 뱅킹서비스 바로가기" href=\"javascript:aaaaaa();">이전뱅킹서비스</a></span> ';
	}
	makeHtml += "</div></li>";

	$("#login").append(makeHtml);
	sessionCountdown("sessionCount",dbSessionTime,0, 'N');
}

function drawSubCyberLogInStat(name, imgVal, sub) {
	var page = getUrl("dgb");

	if( sub == "cdd" ) {page = getUrl("cdd");}
	if( sub == "cgr" ) {page = getUrl("cgr");}
	if( sub == "cgj" ) {page = getUrl("cgj");}
	if( sub == "chs" ) {page = getUrl("chs");}
	if( sub == "cct" ) {page = getUrl("cct");}

	var makeHtml = "";
	makeHtml += '<span class="member"><span class="bzman_nm" id="bzman_nm">'+name+'</span> 고객님</span>&nbsp;';
	makeHtml += "<span class=\"btn_login_small_box\"><a title=\"로그아웃\" href=\"javascript:logOutMove('"+page+"');\">로그아웃</a></span>";

	$("#login").append(makeHtml);
	sessionCountdown("sessionCount",dbSessionTime,0, 'N');
}

function getSessionInfoSubMain(sub){
	_PREV_LOGIN_PAGE = getUrl(sub);

	var cyberYn = "N";
	var lccture = 'N';

	if( sub == "cdd" || sub == "cgr" || sub == "cgj" || sub == "chs" || sub == "cct" ) {
		cyberYn = "Y";
	}

	if (sub == 'lcc'){
		lccture = "Y";
	}

	var obj = new Object();
	obj = getLoginSessionInfo();

	if( obj.LOGIN_DVCD == "0" ) {
		if( cyberYn == "Y" ) {
			drawSubCyberMainLogOutStat(sub);	//logout
		} else {
			drawSubMainTopLogOutStat();
		}

	} else if( obj.LOGIN_DVCD == "1" ) {
		if( cyberYn == "Y" ) {
			drawSubCyberLogInStatIB(obj.CUST_NM, obj.PRSNL_IMG_VAL, sub);
		} else {
			drawSubMainTopLogInStat(obj.CUST_NM, obj.PRSNL_IMG_VAL, obj.EFN_DELR_DVCD);
		}
	} else if( obj.LOGIN_DVCD == "2" ) {
		if( cyberYn == "Y" ) {
			drawSubCyberLogInStat(obj.CUST_NM, sub);
		} else {
			drawSubMainLogInStat(obj.CUST_NM);
		}
		drawSubMainTopLogInStat(obj.CUST_NM, obj.PRSNL_IMG_VAL, obj.EFN_DELR_DVCD);
	} else {
		if( cyberYn == "Y" ) {
			drawSubCyberMainLogOutStat(sub);	//logout
		} else {
			drawSubMainLogOutStat();		//logout
		}
		drawSubMainTopLogOutStat();
	}
}

function getSessionInfoLeftMain(sub){

	_PREV_LOGIN_PAGE = getUrl(sub);

	var obj = new Object();
	obj = getLoginSessionInfo();

	if( obj.LOGIN_DVCD == "0" ) {
		if(sub == "cdd_main" || sub == "cgr_main" || sub == "cgj_main" || sub == "chs_main" || sub == "cct_main"
			|| sub == "cdd_fpm" || sub == "cgr_fpm" || sub == "cgj_fpm" || sub == "chs_fpm" || sub == "cct_fpm" || sub == "lcc_main"){

			drawSubMainLeftLogOutStat();
		} else{
			drawSubMainTopLogOutStat();
		}

	} else if( obj.LOGIN_DVCD == "1" ) {

		if(sub == "cdd_main" || sub == "cgr_main" || sub == "cgj_main" || sub == "chs_main" || sub == "cct_main"
			|| sub == "cdd_fpm" || sub == "cgr_fpm" || sub == "cgj_fpm" || sub == "chs_fpm" || sub == "cct_fpm" || sub == "lcc_main"){
			drawCyberSubMainLeftLogInStatIB(obj.CUST_NM, obj.PRSNL_IMG_VAL, obj.EFN_DELR_DVCD);	//ibs login
		}else{
			//drawSubMainLeftLogInStatIB(obj.CUST_NM, obj.PRSNL_IMG_VAL, obj.EFN_DELR_DVCD);	//ibs login
			drawSubMainTopLogInStat(obj.CUST_NM, obj.PRSNL_IMG_VAL, obj.EFN_DELR_DVCD);
		}

	} else if( obj.LOGIN_DVCD == "2" ) {
		//drawSubMainLeftLogInStat(obj.CUST_NM);
		drawSubMainTopLogInStat(obj.CUST_NM, obj.PRSNL_IMG_VAL, obj.EFN_DELR_DVCD);
	} else {
		//drawSubMainLeftLogOutStat();
		drawSubMainTopLogOutStat();
		if (sub == "lcc_main"){
			drawSubMainLeftLogOutStat();
		}
	}
}



function drawSubMainTopLogOutStat(){
	var logHtml = "<a href=\"javascript:loginPage();\" title=\"로그인\">로그인</a>";
	$("#log_area").append(logHtml);
	$("#log_area").attr("class", "log_in");
}

function drawSubMainLeftLogOutStat(){

	var makeHtml = "";
	makeHtml = '<div class="loginBtn"><a href=\"javascript:loginPage();" title="로그인">로그인</a></div>';

	$("#login").append(makeHtml);
}

function drawSubMainTopLogInStat(name, imgVal, delrDv){

	var makeHtml = "";
	if( _IS_RENEWAL_PAGE )
	{
		makeHtml = "<div class=\"lon_in_area\">"
			+			"<div class=\"custom\">"
			+				"<span class=\"name\"><strong class=\"bzman_nm\" id='bzman_nm'>"+name+"</strong> 님</span> <span class=\"time\" id=\"topSessionCount\"></span>"
			+			"</div>"
			+			"<div class=\"top_menu_btn\">"
			+				"<ul>"
			+					"<li class=\"btn_1\"><a href=\"javascript:topTimeRenew();\">연장</a></li>"
			+				"</ul>"
			+			"</div>"
			+		"</div>";
		$("#log_area").append(makeHtml);
	}
	else
	{
		makeHtml = "<div class=\"lon_in_area\">"
			+			"<div class=\"custom\">";
		if(!(imgVal == null || imgVal == '' || imgVal == 0)) {
			makeHtml +=			'<img src=\"https://banking.dgb.co.kr/img/common/emoticon/ebz_es_imoticon_'+ (imgVal<=9?'0':'') +imgVal+'.png\" alt=\"이모티콘'+imgVal+'\" title=\"이모티콘'+imgVal+'\" style=\"width:25px; height:25px;\">';
		}
		makeHtml += 		"<span class=\"name\"><strong class=\"bzman_nm\" id='bzman_nm'>"+name+"</strong> 님</span> <span class=\"time\" id=\"topSessionCount\"></span>"
			+			"</div>"
			+			"<div class=\"top_menu_btn\">"
			+				"<ul>"
			+					"<li class=\"btn_1\"><a href=\"javascript:topTimeRenew();\">연장</a></li>"
			+					"<li class=\"btn_2\"><a href=\"javascript:setIcon('"+delrDv+"')\">개인화설정</a></li>"
			+				"</ul>"
			+			"</div>"
			+		"</div>";
		/*
        makeHtml += '<img src=\"../img/common/emoticon/ebz_es_imoticon_'+ (imgVal<=9?'0':'') +imgVal+'.png\" alt=\"이모티콘'+imgVal+'\" title=\"이모티콘'+imgVal+'\" style=\"width:25px; height:25px;\"> '+name+'&nbsp;고객님</span>';
        makeHtml += ' 남은시간 <strong id="topSessionCount"></strong> <button type="button" onclick="topTimeRenew()" id="btTimeRenew" title="로그인 시간 연장">연장</button>';
        makeHtml += " <a href=\"javascript:linkMenuPage('mem_mem_sub4_1','mem_mem_sub4','0', '/com_ebz_mem_main.act')\" title=\"정보변경\" style=\"display:inline-block;\">정보변경</a>";
        makeHtml += ' <button type="button" onclick="startLogOut()" title="로그아웃">로그아웃</button>';
        */
		$("#user_log_area").before(makeHtml);
	}

	var logHtml = "<a href=\"javascript:startLogOut();\" title=\"로그아웃\">로그아웃</a>";
	$("#log_area").append(logHtml);
	$("#log_area").attr("class", "log_out");
	sessionCountdown("topSessionCount",dbSessionTime,0, 'N');
}

function drawSubMainLeftLogInStat(name){
	var makeHtml = "";
	makeHtml += '<div class="infoBox">';
	makeHtml += 	'<div class="time"><span>남은시간</span><img src="../../../img/common/bg/ebz_delay_time_img.png" alt="남은시간"><strong id="sessionCount"></strong></div>';
	makeHtml += 	'<div class="time_btn_bg"><span class="btn small_log"><button type="button" onclick="TimeRenew()" id="btTimeRenew" title="로그인 시간 연장">연장</button></span></div>';
	makeHtml += 	'<div class="info">';
	makeHtml +=         '<span style="line-height:16px; display:inline-block; position:relative; top:3px; width:75px; color:#525252; letter-spacing:-1px; float:left;"><span class="bzman_nm" id="bzman_nm">'+name+'</span>&nbsp;고객님</span>';
	makeHtml +=         "<span class=\"btn_login_small_box\"><a href=\"javascript:linkMenuPage('mem_mem_sub4_1','mem_mem_sub4','0', '/com_ebz_mem_main.act')\" title=\"정보변경\" style=\"display:inline-block;\">정보변경</a></span>";
	makeHtml +=     '</div>';
	makeHtml +=     '<div class="infoBtn_area">';
	makeHtml +=         '<span class="btn medium01"><button type="button" onclick="startLogOut()" title="로그아웃">로그아웃</button></span>';
	makeHtml +=     '</div>';
	makeHtml +=     '<div class="bottom"></div>';
	makeHtml += '</div>';

	$("#login").append(makeHtml);
	sessionCountdown("sessionCount",dbSessionTime,0, 'N');
}

function drawSubMainLeftLogInStatIB(name, imgVal, delrDv){
	var makeHtml = "";
	makeHtml += '<div class="infoBox">';
	makeHtml += 	'<div class="time"><span>남은시간</span><img src="../../../img/common/bg/ebz_delay_time_img.png" alt="남은시간"><strong id="sessionCount"></strong></div>';
	makeHtml += 	'<div class="time_btn_bg"><span class="btn small_log"><button type="button" onclick="TimeRenew()" id="btTimeRenew" title="로그인 시간 연장">연장</button></span></div>';
	makeHtml += 	'<div class="info">';

	if(imgVal == null || imgVal == '' || imgVal == 0) {
		makeHtml += "";
	}else{
		makeHtml += '<span class=\"eiconImg\"><img src=\"https://banking.dgb.co.kr/img/common/emoticon/ebz_es_imoticon_'+ (imgVal<=9?'0':'') +imgVal+'.png\" style=\"width:25px; height:25px;\" alt=\"이모티콘'+imgVal+'\" title=\"이모티콘'+imgVal+'\"></span>';
	}

	makeHtml +=         '<span class="member"><span class="bzman_nm" id="bzman_nm">'+name+'</span> 고객님';
	makeHtml += 		'<a href="javascript:myPage();" class="mypage" title="MY PAGE 바로가기"><img src="../img/common/btn/ebz_btn_loginMP.gif" alt="MY PAGE"></a></span>';
	makeHtml +=     '</div>';
	makeHtml +=     '<div class="infoBtn_area">';
	makeHtml +=         '<span class="btn medium01"><button type="button" style="background:#ffd800;" onclick="startLogOut()" title="로그아웃">로그아웃</button></span>&nbsp;';
	makeHtml +=         '<span class="btn medium01"><button type="button" onclick="setIcon('+delrDv+')" title="개인화설정">개인화설정</button></span>';
	makeHtml +=     '</div>';
	makeHtml +=     '<div class="bottom"></div>';
	makeHtml += '</div>';

	if(BankingDvcd){
		makeHtml += '<div class="infoBox" style="margin-top:-10px;">';
		makeHtml += 	'<div class="time">';
		makeHtml +=         '<a href="javascript:aaaaaa();" title="이전 뱅킹서비스 바로가기"><span>이전 뱅킹서비스 바로가기</span></a>';
		makeHtml +=     '</div>';
		makeHtml +=     '<div class="bottom" style="margin-top:-4px;"></div>';
		makeHtml += '</div>';
	}

	$("#login").append(makeHtml);
	sessionCountdown("sessionCount",dbSessionTime,0, 'N');
}


function drawCyberSubMainLeftLogInStatIB(name, imgVal, delrDv){

	var makeHtml = "";
	makeHtml += '<div class="infoBox">';
	makeHtml += 	'<div class="time"><span>남은시간</span><img src="../../../img/common/bg/ebz_delay_time_img3.png" alt="남은시간"><strong id="sessionCount"></strong></div>';
	makeHtml += 	'<div class="time_btn_bg"><button type="button" onclick="TimeRenew()" id="btTimeRenew" title="로그인 시간 연장">연장</button></div>';
	makeHtml += 	'<div class="info">';

	if(imgVal == null || imgVal == '' || imgVal == 0) {
		makeHtml += "";
	}else{
		makeHtml += '<span class=\"eiconImg\"><img src=\"https://banking.dgb.co.kr/img/common/emoticon/ebz_es_imoticon_'+ (imgVal<=9?'0':'') +imgVal+'.png\" style=\"width:25px; height:25px;\" alt=\"이모티콘'+imgVal+'\" title=\"이모티콘'+imgVal+'\"></span>';
	}

	makeHtml +=         '<span class="member"><label id="bzman_nm">'+name+'</label> 고객님<a title="MY PAGE 바로가기" class="mypage" href="javascript:myPage()"><img alt="MY PAGE" src="/img/common/btn/ebz_btn_loginMP_new.gif"></a></span>';
	makeHtml +=     '</div>';
	makeHtml +=     '<div class="infoBtn_area">';
	makeHtml +=         '<span class="btn medium02"><button type="button" onclick="startLogOut()" title="로그아웃">로그아웃</button></span>';
	makeHtml +=         '<span class="btn medium01"><button type="button" onclick="setIcon('+delrDv+')" title="개인화설정">개인화설정</button></span>';
	makeHtml +=     '</div>';
	makeHtml += '</div>';

	if(BankingDvcd){
		makeHtml += '<div class="infoBox">';
		makeHtml += 	'<div class="time">';
		makeHtml +=         '<a href="javascript:aaaaaa();" title="이전 뱅킹서비스 바로가기"><span>이전 뱅킹서비스 바로가기</span></a>';
		makeHtml +=     '</div>';
		makeHtml +=     '<div class="bottom" style="margin-top:-4px;"></div>';
		makeHtml += '</div>';
	}

	$("#login").append(makeHtml);
	sessionCountdown("sessionCount",dbSessionTime,0, 'N');
}

var interval;
var minutes = 0;
var seconds = 0;
var sessionFlag = 0;
var renewalTime = 270;
var dbSessionTime = 600;

try{
	if(loginKeepHrSec != undefined){
		dbSessionTime = loginKeepHrSec;
	}
}catch(e){
	dbSessionTime = 600;
}

function sessionCountdown(element,time,flag) {
	if(getBzmanNm() == ""){
		return;
	}

	dbSessionTime = time;
	sessionFlag = flag;

	clearInterval(interval);

	if(time >= 60) {
		minutes = parseInt(time/60);
		seconds = parseInt(time%60);
	}else{
		minutes = 0;
		seconds = time;
	}

	interval = setInterval(function() {
		if(renewalTime < 1) {
			renewalTime = 270;
			loginCheck();
		}else{
			renewalTime--;
		}

		if(seconds == 0) {
			if(minutes == 0) {

				try{
					$('#'+element).text('00:00');
					clearInterval(interval);
				}catch(e){
					startLogOut();
				}
			} else {
				minutes--;
				seconds = 60;
			}
		}

		if(minutes > 0 && minutes < 9) {
			if(seconds == 60) {
				minuteText = "0"+(minutes+1);
			}else {
				minuteText = "0"+minutes;
			}
		}else
		if(minutes == 0) {
			if(seconds == 60) {
				minuteText = "0"+(minutes+1);
			}else {
				minuteText = "00";
			}
		} else{
			if(seconds == 60) {
				minuteText = minutes+1;
			}else {
				minuteText = minutes;
			}
		}

		if(seconds > 0 && seconds < 10) {
			secondsText = "0"+seconds;
		}else{
			if(seconds == 60) {
				secondsText = "00";
			}else{
				secondsText = seconds;
			}
		}

		if((parseInt(time/60) - minutes) < 2 && seconds == 60) {
			loginCheck();
		}

		if(minutes == 0 && sessionFlag == 0) {
			openTimeLayer("com_ebz_session_renewal.act","");
			sessionFlag = 1;
		}


		$('#'+element).text(minuteText + ':' + secondsText);

		seconds--;
	}, 1000);
}

function TimeRenew(){
	var jexAjax = jex.createAjaxUtil("com_ebz_session_renew");
	jexAjax.set("UT_PARAM_1","");
	jexAjax.setAsync(false);
	var sessionTime = dbSessionTime;

	jexAjax.execute(function(dat) {
		sessionCountdown("sessionCount",sessionTime,0);
	});
}

function topTimeRenew(){
	var jexAjax = jex.createAjaxUtil("com_ebz_session_renew");
	jexAjax.set("UT_PARAM_1","");
	jexAjax.setAsync(false);
	var sessionTime = dbSessionTime;

	jexAjax.execute(function(dat) {
		sessionCountdown("topSessionCount",sessionTime,0);
	});
}

function setIcon(delrDv) {
	var obj;
	var movePage;
	var directDocuUrl = top.document.URL.toLowerCase(); //개인화배너 바로가기

	if( delrDv == "02" ) {
		obj = {'IBNK_MNU_CD':"X13020401",'IBNK_UPPER_MNU_CD':"A011107",'MNU_LEVL_NO':'4','TOPLVL_MNU_ID':"A01",'STRT_PG_DRCTR_NM':"psr" };
		if(directDocuUrl.indexOf("com_ebz_cdd") > -1){
			movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + "com_ebz_cdd_pib_main.act";
		}else if(directDocuUrl.indexOf("com_ebz_cgr") > -1){
			movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + "com_ebz_cgr_pib_main.act";
		}else if(directDocuUrl.indexOf("com_ebz_cgj") > -1){
			movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + "com_ebz_cgj_pib_main.act";
		}else if(directDocuUrl.indexOf("com_ebz_chs") > -1){
			movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + "com_ebz_chs_pib_main.act";
		}else if(directDocuUrl.indexOf("com_ebz_cct") > -1){
			movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + "com_ebz_cct_pib_main.act";
		}else{
			movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + "com_ebz_pib_main.act";
		}

	} else {
		obj = {'IBNK_MNU_CD':"X13020401",'IBNK_UPPER_MNU_CD':"A02120204",'MNU_LEVL_NO':'5','TOPLVL_MNU_ID':"A02",'STRT_PG_DRCTR_NM':"usr" };
		//movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + "com_ebz_cib_main.act";
		var strSubUrl = _CodeMgr.getCodeMsg('SUB_URL', '1002');// com_ebz_cib_sub_main.act
		if( strSubUrl.indexOf('com_ebz_cib_sub_main') < 0 )
		{
			obj = {'IBNK_MNU_CD':"Y13020401",'IBNK_UPPER_MNU_CD':"B01120204",'MNU_LEVL_NO':'5','TOPLVL_MNU_ID':"B01",'STRT_PG_DRCTR_NM':"usr" };
		}
		if(directDocuUrl.indexOf("com_ebz_cdd") > -1){
			movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + _CodeMgr.getCodeMsg("SUB_URL", "1049");//"com_ebz_cdd_cib_main.act";
		}else if(directDocuUrl.indexOf("com_ebz_cgr") > -1){
			movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + _CodeMgr.getCodeMsg("SUB_URL", "1051");//"com_ebz_cgr_cib_main.act";
		}else if(directDocuUrl.indexOf("com_ebz_cgj") > -1){
			movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + _CodeMgr.getCodeMsg("SUB_URL", "1053");//"com_ebz_cgj_cib_main.act";
		}else if(directDocuUrl.indexOf("com_ebz_chs") > -1){
			movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + _CodeMgr.getCodeMsg("SUB_URL", "1055");//"com_ebz_chs_cib_main.act";
		}else if(directDocuUrl.indexOf("com_ebz_cct") > -1){
			movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + _CodeMgr.getCodeMsg("SUB_URL", "1057");//"com_ebz_cct_cib_main.act";
		}else{
			if( strSubUrl.indexOf('com_ebz_cib_sub_main') > -1 )
			{
				strSubUrl = "com_ebz_cib_main.act";
			}
			movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + strSubUrl;
		}

	}

	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));

	var objLk = {'HP_BK':'BK','LOCATION_PAGE': movePage};
	dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));
	location.href = movePage;
}

function startLogOut(){
	var topDocuUrl = top.document.URL.toLowerCase();;

	dataCtrl.delObjData("MENU_LOCATION");
	dataCtrl.delObjData('CHS_LOGIN_DATA');

	var jexAjax = jex.createAjaxUtil("com_ebz_logout");

	jexAjax.execute(function(dat) {
		if(topDocuUrl.indexOf("com_ebz_cdd") > -1){
			location.href = "https://dokdo.dgb.co.kr/com_ebz_cdd_sub_main.jsp";
		}else if(topDocuUrl.indexOf("com_ebz_cgr") > -1){
			location.href = "https://green.dgb.co.kr/com_ebz_cgr_sub_main.jsp";
		}else if(topDocuUrl.indexOf("com_ebz_cgj") > -1){
			location.href = "https://www.dgb.co.kr/com_ebz_cgj_sub_main.jsp";
		}else if(topDocuUrl.indexOf("com_ebz_chs") > -1){
			location.href = "https://www.dgb.co.kr/com_ebz_chs_sub_main.jsp";
		}else if(topDocuUrl.indexOf("com_ebz_cct") > -1){
			location.href = "https://www.dgb.co.kr/com_ebz_cct_sub_main.jsp";
		}else{
			location.href = _CodeMgr.getCodeMsg("CODE_URL","1002");
		}
	});
}

function logOutMove(page){
	dataCtrl.delObjData('CHS_LOGIN_DATA');
	var jexAjax = jex.createAjaxUtil("com_ebz_logout");

	jexAjax.execute(function(dat) {
		location.href = page;
	});
}

function startDfmLogOut(){
	if( confirm("로그아웃 하시겠습니까?") ){
		dataCtrl.delObjData('CHS_LOGIN_DATA');
		var jexAjax = jex.createAjaxUtil("com_ebz_dfm_logout");

		jexAjax.execute(function(dat) {
			location.href = _DFM_LOGOUT_PAGE;
		});
	}
}

function startDloLogOut(){
	if( confirm("로그아웃 하시겠습니까?") ){
		dataCtrl.delObjData('CHS_LOGIN_DATA');
		var jexAjax = jex.createAjaxUtil("com_ebz_dlo_logout");

		jexAjax.execute(function(dat) {
			location.href = _DLO_LOGOUT_PAGE;
		});
	}
}

function loginPage(){
	var tmpObj = {};
	tmpObj = {'LOCATION_PAGE':_PREV_LOGIN_PAGE, 'IBNK_MNU_CD':'','IBNK_UPPER_MNU_CD':'','MNU_LEVL_NO':'','TOPLVL_MNU_ID':'','STRT_PG_DRCTR_NM':'','CYBER_GBN':'' };
	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
	linkFramSetBankingPage(getUrl("dgb_login"));
}

function myPage(){
	var tmpObj = {};
	var movePage = "";

	tmpObj = {'LOCATION_PAGE':_PREV_LOGIN_PAGE, 'IBNK_MNU_CD':'','IBNK_UPPER_MNU_CD':'','MNU_LEVL_NO':'','TOPLVL_MNU_ID':'','STRT_PG_DRCTR_NM':'' };
	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));

	if(sessionInfo.USER_DV_VAL == '2' || sessionInfo.USER_DV_VAL == '3') {
		movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + "com_ebz_17010_j002.act";
	}else{
		movePage = _CodeMgr.getCodeMsg("CODE_URL", "1001") + "com_ebz_16010_j002.act";
	}

	var objLk = {'HP_BK':'BK','LOCATION_PAGE': movePage};
	dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));

	location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");  //https://banking.dgb.co.kr/index.jsp
}

function setMyPage(page){
	var myPage = page+".act";
	var obj = {'MYPAGE_LOCATION':myPage };
	dataCtrl.setObjData("MYPAGE_LOCATION",JSON.stringify(obj));
}

function calculateBytes(val){
	var tCnt = 0;
	var tmpStr = new String(val);
	var temp = tmpStr.length;
	var onechar;

	for(var i=0; i<temp; i++){
		onechar = tmpStr.charAt(i);
		if(escape(onechar).length > 4) {
			tCnt += 2;
		} else {
			tCnt += 1;
		}
	}

	return tCnt;
}

function selectKRLanguage(){
	dataCtrl.getObjData("MENU_LOCATION");
	var jexAjax = jex.createAjaxUtil("com_ebz_logout");

	jexAjax.execute(function(dat) {
		location.href = _CodeMgr.getCodeMsg("CODE_URL","1002");
	});
}

function selectENLanguage(){
	dataCtrl.getObjData("MENU_LOCATION");
	var jexAjax = jex.createAjaxUtil("com_ebz_logout");

	jexAjax.execute(function(dat) {
		var objLk = {'HP_BK':'BK','LOCATION_PAGE': _CodeMgr.getCodeMsg("CODE_URL","1001") + "com_ebz_eng_sub_main.act"};
		dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));
		location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");  //https://banking.dgb.co.kr/index.jsp
	});
}

function selectCNLanguage(){
	dataCtrl.getObjData("MENU_LOCATION");
	var jexAjax = jex.createAjaxUtil("com_ebz_logout");

	jexAjax.execute(function(dat) {
		var objLk = {'HP_BK':'BK','LOCATION_PAGE': _CodeMgr.getCodeMsg("CODE_URL","1001") + "com_ebz_chn_sub_main.act"};
		dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));
		location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");  //https://banking.dgb.co.kr/index.jsp
	});
}

//ID Valid Check
function chkHPIdValid(chkId){
	if( $.trim(chkId.val()) == "" ){
		alert("아이디를 입력하세요.");
		return false;
	}

	if( !(chkId.val().length >= 4 && chkId.val().length <= 10) ){
		alert("아이디는 영문과 숫자를 혼합하여 4~10자로 입력하세요.");
		return false;
	}

	var idRE = /[a-zA-Z0-9]/;
	var strID = chkId.val();

	for (var ch1 = 0; ch1 < strID.length; ch1++) {
		if( !(idRE.test(strID.charAt(ch1))) ) {
			alert("아이디는 영문과 숫자를 혼합하여 4~10자로 입력하세요.");
			return false;
		}
	}

	// 영문 숫자 혼합사용
	var engok = 0;
	var enRE = /[a-zA-Z]/;
	var strEn = chkId.val();
	for (var i1 = 0; i1 < strEn.length; i1++) {
		if (enRE.test(strEn.charAt(i1))) {
			engok++;
		}
	}

	var numok = 0;
	var nmRE = /[0-9]/;
	var strNo = chkId.val();

	for (var i2 = 0; i2 < strNo.length; i2++) {
		if (nmRE.test(strNo.charAt(i2))) {
			numok++;
		}
	}

	if( !(engok > 0 && numok > 0) ){
		alert("아이디는 영문과 숫자를 혼합하여 4~10자로 입력하세요.");
		return false;
	}

	return true;
}

//ID Valid Check
function chkHPPassValid(chkPw){
	if( $.trim(chkPw.val()) == "" ){
		alert("패스워드를 입력하세요.");
		return false;
	}

	if( !(chkPw.val().length >= 6 && chkPw.val().length <= 8) ){
		alert("패스워드는 영문과 숫자를 혼합하여 6~8자로 입력하세요.");
		return false;
	}

	var idRE = /[a-zA-Z0-9]/;
	var strPW = chkPw.val();

	for (var ch1 = 0; ch1 < strPW.length; ch1++) {
		if( !(idRE.test(strPW.charAt(ch1))) ) {
			alert("패스워드는 영문과 숫자를 혼합하여 6~8자로 입력하세요.");
			return false;
		}
	}

	// 영문 숫자 혼합사용
	var engok = 0;
	var enRE = /[a-zA-Z]/;
	var strEn = chkPw.val();
	for (var i1 = 0; i1 < strEn.length; i1++) {
		if (enRE.test(strEn.charAt(i1))) {
			engok++;
		}
	}

	var numok = 0;
	var nmRE = /[0-9]/;
	var strNo = chkPw.val();
	for (var i2 = 0; i2 < strNo.length; i2++) {
		if (nmRE.test(strNo.charAt(i2))) {
			numok++;
		}
	}

	if( !(engok > 0 && numok > 0) ){
		alert("패스워드는 영문과 숫자를 혼합하여 6~8자로 입력하세요.");
		return false;
	}

	return true;
}

// 영업점 안내(검색)용 세션 설정
function  fnChZeroGo(menu,seq_no){
	dataCtrl.delObjData("CHZ_SSESSION_DATA");
	var jObj = {};
	jObj.gubun   = "content";		// 구분
	jObj.menu  	 = menu;			// 지점
	jObj.seq_no  = seq_no;			// 지점
	dataCtrl.setObjData('CHZ_SSESSION_DATA', JSON.stringify(jObj));

	linkMenuPage('','dgi_sto_sub1','0','/com_ebz_dgi_main.act');
}

// * location link
// * @param sub
function goSubMain(sub){
	var bankUrl  = _CodeMgr.getCodeMsg("CODE_URL", "1001");		//	https://banking.dgb.co.kr/
	var hpmpUrl  = _CodeMgr.getCodeMsg("CODE_URL", "1002");		//	https://www.dgb.co.kr/
	var dokdoUrl = _CodeMgr.getCodeMsg("CODE_URL", "1085");		//	https://dokdo.dgb.co.kr/
	var greenUrl = _CodeMgr.getCodeMsg("CODE_URL", "1086");		//	https://green.dgb.co.kr/
	var dcnUrl	 = _CodeMgr.getCodeMsg("CODE_URL", "1017");		//	http://www.dgbbank.cn/
	var msuUrl	 = _CodeMgr.getCodeMsg("CODE_URL", "1018");		//	http://museum.dgb.co.kr/
	var dloUrl	 = _CodeMgr.getCodeMsg("CODE_URL", "1020");		//	http://www.doksamo.co.kr/
	var dfgUrl	 = _CodeMgr.getCodeMsg("CODE_URL", "1011");
	//alert(sub);
	//홈페이지메인
	if( sub == "dgb"      )	top.location.href = hpmpUrl;											//https://www.dgb.co.kr/
	//개인뱅킹
	if( sub == "pib"      ) pibAndCidChangePage('H1', bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1001"));
	//기업뱅킹
	if( sub == "cib"      ) pibAndCidChangePage('H2', bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1002"));
	//영문홈메인
	if( sub == "dgb_en"   )	top.location.href = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1044");	//https://www.dgb.co.kr/com_ebz_eng_sub_main.act
	//중문홈메인
	if( sub == "dgb_cn"   )	top.location.href = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1045");	//https://www.dgb.co.kr/com_ebz_chn_sub_main.act

	//로그인
	if( sub == "dgb_login" || sub == "crt_login"){
		var expire = new Date();
		$.cookie("cert_login", null);
		expire.setDate(expire.getDate() + 1);

		if( sub == "crt_login"){
			cookies = "cert_login" + '=' + escape("Y") + ';path=/';
		}else{
			cookies = "cert_login" + '=' + escape("N") + ';path=/';
		}

		cookies += ';expires=' + expire.toGMTString() + ';domain='+location.hostname.substring(location.hostname.indexOf(".")+1);

		document.cookie = cookies;

		dataCtrl.delObjData("MENU_LOCATION");
		linkFramSetBankingPage(bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1046"));
	}

	//사이버지점(메인)

	if( sub == "cdd"      )	top.location.href = dokdoUrl;											//http://dokdo.dgb.co.kr/
	if( sub == "cgr"      )	top.location.href = greenUrl;											//https://green.dgb.co.kr/
	if( sub == "cgj"      )	top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1007");	//https://www.dgb.co.kr/com_ebz_cgj_sub_main.jsp
	if( sub == "chs"      )	top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1010");	//https://www.dgb.co.kr/com_ebz_chs_sub_main.jsp
	if( sub == "cct"      )	top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1013");	//https://www.dgb.co.kr/com_ebz_cct_sub_main.jsp
	//사이버지점(개인뱅킹)
	if( sub == "cdd_pib"  )	setDokdoBank('H1');
	if( sub == "cgr_pib"  )	setGreenBank('H1');
	if( sub == "cgj_pib"  )	setCgjBank('H1');
	if( sub == "chs_pib"  )	setHswBank('H1');
	if( sub == "cct_pib"  ) setCctBank('H1');
	//사이버지점(기업뱅킹)
	if( sub == "cdd_cib"  )	setDokdoBank('H2');
	if( sub == "cgr_cib"  )	setGreenBank('H2');
	if( sub == "cgj_cib"  )	setCgjBank('H2');
	if( sub == "chs_cib"  )	setHswBank('H2');
	if( sub == "cct_cib"  ) setCctBank('H2');
	//사이버지점(지점안내)
	if( sub == "cdd_main" )	{
		top.location.href = dokdoUrl;	//http://dokdo.dgb.co.kr/
		//alert( dokdoUrl + _CodeMgr.getCodeMsg("SUB_URL", "1003"));
	}

	if( sub == "cgr_main" )	{
		top.location.href = greenUrl;	//https://green.dgb.co.kr/
	}
	if( sub == "cgj_main" ){
		top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1007");	//https://www.dgb.co.kr/com_ebz_cgj_sub_main.jsp
	}
	if( sub == "chs_main")	{
		top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1010");	//https://www.dgb.co.kr/com_ebz_chs_sub_main.jsp
	}
	if( sub == "cct_main")	{
		top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1013");	//https://www.dgb.co.kr/com_ebz_cct_sub_main.jsp
	}
	//사이버지점(금융상품몰)
	if( sub == "cdd_fpm"  ){
		var tmpHpMnuObj = {"MENU_LOCATION":"fnm_fnc_sub13","MENU_DEPTH":2,"ID":"fnm_fnc_sub","NUM":0,"LOCATION_PAGE":"com_ebz_cdd_fpm_main.act","HP_BK":"HP"};
		dataCtrl.setObjData("MENU_LOCATION", JSON.stringify(tmpHpMnuObj));
		top.location.href = dokdoUrl + _CodeMgr.getCodeMsg("SUB_URL", "1004");	//http://dokdo.dgb.co.kr/com_ebz_cdd_fpm_main.act
	}
	if( sub == "cgr_fpm" ) {
		//var tmpHpMnuObj = {"MENU_LOCATION":"fnm_fnc_sub1_1","MENU_DEPTH":3,"ID":"fnm_fnc_sub1","NUM":0,"LOCATION_PAGE":"com_ebz_cgr_fpm_main.act","HP_BK":"HP"};
		var tmpHpMnuObj = {"MENU_LOCATION":"fnm_fnc_sub13","MENU_DEPTH":2,"ID":"fnm_fnc_sub","NUM":0,"LOCATION_PAGE":"com_ebz_cdd_fpm_main.act","HP_BK":"HP"};
		dataCtrl.setObjData("MENU_LOCATION", JSON.stringify(tmpHpMnuObj));
		top.location.href = greenUrl + _CodeMgr.getCodeMsg("SUB_URL", "1006");	//https://green.dgb.co.kr/com_ebz_cgr_fpm_main.act
	}
	if( sub == "cgj_fpm" ) {
		var tmpHpMnuObj = {"MENU_LOCATION":"fnm_fnc_sub13","MENU_DEPTH":2,"ID":"fnm_fnc_sub","NUM":0,"LOCATION_PAGE":"com_ebz_cgj_fpm_main.act","HP_BK":"HP"};
		//var tmpHpMnuObj = {"MENU_LOCATION":"fnm_fnc_sub12","MENU_DEPTH":2,"ID":"fnm_fnc_sub","NUM":0,"LOCATION_PAGE":"com_ebz_cdd_fpm_main.act","HP_BK":"HP"};
		dataCtrl.setObjData("MENU_LOCATION", JSON.stringify(tmpHpMnuObj));
		top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1009");	//https://www.dgb.co.kr/com_ebz_cgj_fpm_main.act
	}
	if( sub == "chs_fpm"){
		//var tmpHpMnuObj = {"MENU_LOCATION":"fnm_fnc_sub1_1","MENU_DEPTH":3,"ID":"fnm_fnc_sub1","NUM":0,"LOCATION_PAGE":"com_ebz_chs_fpm_main.act","HP_BK":"HP"};
		var tmpHpMnuObj = {"MENU_LOCATION":"fnm_fnc_sub13","MENU_DEPTH":2,"ID":"fnm_fnc_sub","NUM":0,"LOCATION_PAGE":"com_ebz_cdd_fpm_main.act","HP_BK":"HP"};
		dataCtrl.setObjData("MENU_LOCATION", JSON.stringify(tmpHpMnuObj));
		top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1012");	//https://www.dgb.co.kr/com_ebz_chs_fpm_main.act
	}
	if( sub == "cct_fpm"){
		//var tmpHpMnuObj = {"MENU_LOCATION":"fnm_fnc_sub1_1","MENU_DEPTH":3,"ID":"fnm_fnc_sub1","NUM":0,"LOCATION_PAGE":"com_ebz_cct_fpm_main.act","HP_BK":"HP"};
		var tmpHpMnuObj = {"MENU_LOCATION":"fnm_fnc_sub13","MENU_DEPTH":2,"ID":"fnm_fnc_sub","NUM":0,"LOCATION_PAGE":"com_ebz_cdd_fpm_main.act","HP_BK":"HP"};
		dataCtrl.setObjData("MENU_LOCATION", JSON.stringify(tmpHpMnuObj));
		top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1015");	//https://www.dgb.co.kr/com_ebz_cct_fpm_main.act
	}
	//금융상품몰
	if( sub == "fpm"     ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1016");	//https://www.dgb.co.kr/com_ebz_fpm_sub_main.jsp
	if( sub == "fpm_main") top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1017");	//https://www.dgb.co.kr/com_ebz_fpm_main.act
	if( sub == "fnc"     ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1018");	//https://www.dgb.co.kr/com_ebz_fnc_sub_main.jsp
	if( sub == "fnp"     ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1019");	//https://www.dgb.co.kr/com_ebz_fnp_sub_main.jsp
	if( sub == "fnf"     ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1020");	//https://www.dgb.co.kr/com_ebz_fnf_sub_main.jsp
	if( sub == "fnl"     ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1021");	//https://www.dgb.co.kr/com_ebz_fnl_sub_main.jsp
	if( sub == "fne"     ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1022");	//https://www.dgb.co.kr/com_ebz_fne_sub_main.jsp
	if( sub == "fnr"     ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1023");	//https://www.dgb.co.kr/com_ebz_fnr_sub_main.jsp
	//금융서비스
	if( sub == "fsv"     ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1024");	//https://www.dgb.co.kr/com_ebz_fsv_sub_main.jsp
	if( sub == "fsv_main") top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1025");	//https://www.dgb.co.kr/com_ebz_fsv_main.act
	//신고/신청몰
	if( sub == "ssm"     ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1026");	//https://www.dgb.co.kr/com_ebz_ssm_main.jsp
	if( sub == "stm"     ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1027");	//https://www.dgb.co.kr/com_ebz_stm_main.jsp
	//지역애
	if( sub == "slo"     ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1028");	//https://www.dgb.co.kr/com_ebz_slo_main.jsp
	//고객센터
	if( sub == "hlp"     ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1029");	//https://www.dgb.co.kr/com_ebz_hlp_sub_main.jsp
	if( sub == "hlp_main") top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1030");	//https://www.dgb.co.kr/com_ebz_hlp_main.act
	//은행소개
	if( sub == "dgi"     ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1031");	//https://www.dgb.co.kr/com_ebz_dgi_sub_main.jsp
	if( sub == "dgi_main") top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1032");	//https://www.dgb.co.kr/com_ebz_dgi_main.act
	//상해지점
	if( sub == "dcn"     ) top.location.href = dcnUrl;												//http://www.dgbbank.cn/
	if( sub == "dcn_kor" ) top.location.href = dcnUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1047");	//http://www.dgbbank.cn/com_ebz_dcn_main_kor.act
	//금융박물관
	if( sub == "msu"     ) top.location.href = msuUrl;												//http://museum.dgb.co.kr/
	//배스트오브베스크
	if( sub == "bob"     ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1033");	//https://www.dgb.co.kr/com_ebz_bob_sub_main.jsp
	if( sub == "bob_main") top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1034");	//https://www.dgb.co.kr/com_ebz_bob_main.act
	//배스트오브베스크
	if( sub == "lcc"     ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1035");	//https://www.dgb.co.kr/com_ebz_lcc_sub_main.jsp
	if( sub == "lcc_main") top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1036");	//https://www.dgb.co.kr/com_ebz_lcc_main.act
	//DGB패밀리
	if( sub == "dfm"      ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1037");	//https://www.dgb.co.kr/com_ebz_dfm_sub_main.jsp
	if( sub == "dfm_main" ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1038");	//https://www.dgb.co.kr/com_ebz_dfm_main.act
	if( sub == "dfm_login")	top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1043");	//https://www.dgb.co.kr/dfm_ebz_11010_J001.act
	if( sub == "dfm_mem"  ) top.location.href = hpmpUrl  + "com_ebz_dfm_mem_main.act";				//https://www.dgb.co.kr/com_ebz_dfm_mem_main.act
	//EZ뱅킹
	if( sub == "esb"      ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1039");	//https://www.dgb.co.kr/com_ebz_esb_sub_main.jsp
	if( sub == "esb_main" ) top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1040");	//https://www.dgb.co.kr/com_ebz_esb_main.act
	//공인인증센터
	if( sub == "crt"      ) {
		dataCtrl.delObjData("MENU_LOCATION");
		//linkFramSetBankingPage(bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1041"));
		top.location.href = bankUrl + _CodeMgr.getCodeMsg("SUB_URL", "1041");
	}
	//회원센터
	if( sub == "mem"      ){
		var tmpHpMnuObj = {"MENU_LOCATION":"mem_mem_sub1","MENU_DEPTH":3,"ID":"mem_mem_sub1","NUM":0,"LOCATION_PAGE":"com_ebz_mem_main.act","HP_BK":"HP"};
		dataCtrl.setObjData("MENU_LOCATION", JSON.stringify(tmpHpMnuObj));
		top.location.href = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1042");						//https://www.dgb.co.kr/com_ebz_mem_main.act
	}
	if( sub == "dlo"     ) top.location.href = dloUrl;
	if( sub == "dfg"     ) top.location.href = dfgUrl;
}

function getUrl(sub){
	var bankUrl  = _CodeMgr.getCodeMsg("CODE_URL", "1001");		//	https://banking.dgb.co.kr/
	var hpmpUrl  = _CodeMgr.getCodeMsg("CODE_URL", "1002");		//	https://www.dgb.co.kr/
	var dokdoUrl = _CodeMgr.getCodeMsg("CODE_URL", "1085");		//	https://dokdo.dgb.co.kr/
	var greenUrl = _CodeMgr.getCodeMsg("CODE_URL", "1086");		//	https://green.dgb.co.kr/
	var dcnUrl	 = _CodeMgr.getCodeMsg("CODE_URL", "1017");		//	http://www.dgbbank.cn/
	var msuUrl	 = _CodeMgr.getCodeMsg("CODE_URL", "1018");		//	http://museum.dgb.co.kr
	var dloUrl	 = _CodeMgr.getCodeMsg("CODE_URL", "1020");
	var dfgUrl	 = _CodeMgr.getCodeMsg("CODE_URL", "1011");
	var url		 = hpmpUrl;

	if( sub == "pib")		url = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1001");	//	https://banking.dgb.co.kr/com_ebz_pib_sub_main.act
	if( sub == "cib")		url = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1002");	//	https://banking.dgb.co.kr/com_ebz_cib_sub_main.act
	if( sub == "dgb_login")	url = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1046");	//	https://banking.dgb.co.kr/com_ebz_11010_J001.act
	if( sub == "dgb")		url = hpmpUrl;												//	https://www.dgb.co.kr/
	if( sub == "dgb_en" )	url = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1044");	//	https://www.dgb.co.kr/com_ebz_eng_sub_main.act
	if( sub == "dgb_cn" )	url = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1045");	//	https://www.dgb.co.kr/com_ebz_chn_sub_main.act
	if( sub == "cdd")		url = dokdoUrl;												//	http://dokdo.dgb.co.kr/
	if( sub == "cdd_main" )	url = dokdoUrl;												//	http://dokdo.dgb.co.kr/
	if( sub == "cdd_fpm" )	url = dokdoUrl + _CodeMgr.getCodeMsg("SUB_URL", "1004");	//	http://dokdo.dgb.co.kr/com_ebz_cdd_fpm_main.act
	if( sub == "cdd_pib" )	url = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1048");	//	https://banking.dgb.co.kr/com_ebz_cdd_pib_main.act
	if( sub == "cdd_cib" )	url = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1049");	//	https://banking.dgb.co.kr/com_ebz_cdd_cib_main.act
	if( sub == "cgr") 		url = greenUrl;												//	http://green.dgb.co.kr/
	if( sub == "cgr_main" )	url = greenUrl;												//	http://green.dgb.co.kr/
	if( sub == "cgr_fpm" )	url = greenUrl + _CodeMgr.getCodeMsg("SUB_URL", "1006");	//	http://green.dgb.co.kr/com_ebz_cgr_fpm_main.act
	if( sub == "cgr_pib" )	url = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1050");	//	https://banking.dgb.co.kr/com_ebz_cgr_pib_main.act
	if( sub == "cgr_cib" )	url = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1051");	//	https://banking.dgb.co.kr/com_ebz_cgr_cib_main.act
	if( sub == "cgj") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1007");	//	https://www.dgb.co.kr/com_ebz_cgj_sub_main.jsp
	if( sub == "cgj_main" )	url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1007");	//	https://www.dgb.co.kr/com_ebz_cgj_sub_main.jsp
	if( sub == "cgj_fpm" )	url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1009");	//	https://www.dgb.co.kr/com_ebz_cgj_fpm_main.act
	if( sub == "cgj_pib" )	url = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1052");	//	https://banking.dgb.co.kr/com_ebz_cgj_pib_main.act
	if( sub == "cgj_cib" )	url = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1053");	//	https://banking.dgb.co.kr/com_ebz_cgj_cib_main.act
	if( sub == "chs") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1010");	//	https://www.dgb.co.kr/com_ebz_chs_sub_main.jsp
	if( sub == "chs_main")	url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1010");	//	https://www.dgb.co.kr/com_ebz_chs_sub_main.jsp
	if( sub == "chs_fpm")	url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1012");	//	https://www.dgb.co.kr/com_ebz_chs_fpm_main.act
	if( sub == "chs_pib" )	url = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1054");	//	https://banking.dgb.co.kr/com_ebz_chs_pib_main.act
	if( sub == "chs_cib" )	url = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1055");	//	https://banking.dgb.co.kr/com_ebz_chs_cib_main.act
	if( sub == "cct") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1013");	//	https://www.dgb.co.kr/com_ebz_cct_sub_main.jsp
	if( sub == "cct_main")	url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1013");	//	https://www.dgb.co.kr/com_ebz_cct_sub_main.jsp
	if( sub == "cct_fpm")	url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1015");	//	https://www.dgb.co.kr/com_ebz_cct_fpm_main.act
	if( sub == "cct_pib" )	url = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1056");	//	https://banking.dgb.co.kr/com_ebz_cct_pib_main.act
	if( sub == "cct_cib" )	url = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1057");	//	https://banking.dgb.co.kr/com_ebz_cct_cib_main.act
	if( sub == "fpm")		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1016");	//	https://www.dgb.co.kr/com_ebz_fpm_sub_main.jsp
	if( sub == "fpm_main")	url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1017");	//	https://www.dgb.co.kr/com_ebz_fpm_main.act
	if( sub == "fnc") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1018");	//	https://www.dgb.co.kr/com_ebz_fnc_sub_main.jsp
	if( sub == "fnp") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1019");	//	https://www.dgb.co.kr/com_ebz_fnp_sub_main.jsp
	if( sub == "fnf") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1020");	//	https://www.dgb.co.kr/com_ebz_fnf_sub_main.jsp
	if( sub == "fnl") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1021");	//	https://www.dgb.co.kr/com_ebz_fnl_sub_main.jsp
	if( sub == "fne") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1022");	//	https://www.dgb.co.kr/com_ebz_fne_sub_main.jsp
	if( sub == "fnr") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1023");	//	https://www.dgb.co.kr/com_ebz_fnr_sub_main.jsp
	if( sub == "fsv") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1024");	//	https://www.dgb.co.kr/com_ebz_fsv_sub_main.jsp
	if( sub == "fsv_main") 	url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1025");	//	https://www.dgb.co.kr/com_ebz_fsv_main.act
	if( sub == "ssm") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1026");	//	https://www.dgb.co.kr/com_ebz_ssm_main.jsp
	if( sub == "stm") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1027");	//	https://www.dgb.co.kr/com_ebz_stm_main.jsp
	if( sub == "slo") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1028");	//	https://www.dgb.co.kr/com_ebz_slo_main.jsp
	if( sub == "hlp") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1029");	//	https://www.dgb.co.kr/com_ebz_hlp_sub_main.jsp
	if( sub == "hlp_main") 	url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1030");	//	https://www.dgb.co.kr/com_ebz_hlp_main.act
	if( sub == "dgi") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1031");	//	https://www.dgb.co.kr/com_ebz_dgi_sub_main.jsp
	if( sub == "dgi_main") 	url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1032");	//	https://www.dgb.co.kr/com_ebz_dgi_main.act
	if( sub == "dcn") 		url = dcnUrl;												//	http://www.dgbbank.cn/
	if( sub == "dcn_kor") 	url = dcnUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1047");		//	http://www.dgbbank.cn/com_ebz_dcn_main_kor.act
	if( sub == "msu") 		url = msuUrl;												//	http://museum.dgb.co.kr
	if( sub == "bob") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1033");	//	https://www.dgb.co.kr/com_ebz_bob_sub_main.jsp
	if( sub == "bob_main") 	url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1034");	//	https://www.dgb.co.kr/com_ebz_bob_main.act
	if( sub == "lcc") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1035");	//	https://www.dgb.co.kr/com_ebz_lcc_sub_main.jsp
	if( sub == "lcc_main") 	url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1036");	//	https://www.dgb.co.kr/com_ebz_lcc_main.act
	if( sub == "dfm") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1037");	//	https://www.dgb.co.kr/com_ebz_dfm_sub_main.jsp
	if( sub == "dfm_main") 	url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1038");	//	https://www.dgb.co.kr/com_ebz_dfm_main.act
	if( sub == "dfm_mem")	url = hpmpUrl  + "com_ebz_dfm_mem_main.act";		//	https://www.dgb.co.kr/com_ebz_dfm_mem_main.act
	if( sub == "esb") 		url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1039");	//	https://www.dgb.co.kr/com_ebz_esb_sub_main.jsp
	if( sub == "esb_main")	url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1040");	//	https://www.dgb.co.kr/com_ebz_esb_main.act
	if( sub == "crt") {
		dataCtrl.delObjData("MENU_LOCATION");
		url = bankUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1041");	//	https://banking.dgb.co.kr/com_ebz_crt_sub_main.act
	}
	if(sub=="mem")			url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1042");	//	https://www.dgb.co.kr/com_ebz_mem_main.act
	if(sub=="dfm_login")	url = hpmpUrl  + _CodeMgr.getCodeMsg("SUB_URL", "1043");	//	https://www.dgb.co.kr/dfm_ebz_11010_J001.act
	if(sub=="dlo")			url = dloUrl;
	if(sub=="dfg")			url = dfgUrl;
	return url;
}

function setDokdoBank(userDvVal){
	var pibMmessage = _CodeMgr.getCodeMsg('RSPS_CD', 'VAL1705');
	var cibMmessage = _CodeMgr.getCodeMsg('RSPS_CD', 'VAL1706');
	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");

	jexAjax.setAsync(false);

	jexAjax.execute(function(dat) {
		if( userDvVal == 'H1' ){
			if( jex.null2Void(dat.USER_DV_VAL) == "" ){
				dataCtrl.delObjData("MENU_LOCATION");
				var tmpObj = {"TOPLVL_MNU_ID":"A01","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A010101","LOCATION_PAGE":"com_ebz_cdd_pib_main.act","STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"DOKDO"};
				dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
				linkFramSetBankingPage(getUrl("dgb_login"));

			}else{
				if( dat.USER_DV_VAL == "2" || dat.USER_DV_VAL == "3" ){
					if(confirm((cibMmessage.replace("..",".\n\n").replace("..",".\n\n")))){
						var jexAjax2 = jex.createAjaxUtil("com_ebz_logout");
						jexAjax2.execute(function(dat) {
							linkFramSetBankingPage(getUrl("dgb_login"));
						});
					}
				}else{
					linkFramSetBankingPage(getUrl("cdd_pib"));
				}
			}
		}else{
			if( jex.null2Void(dat.USER_DV_VAL) == "" ){
				dataCtrl.delObjData("MENU_LOCATION");
				var strSubUrl = _CodeMgr.getCodeMsg('SUB_URL', '1002');// com_ebz_cib_sub_main.act
				if( strSubUrl.indexOf('com_ebz_cib_sub_main') > -1 )
				{
					strSubUrl = "com_ebz_cdd_cib_main.act";
				}
				var tmpObj = {"TOPLVL_MNU_ID":"A02","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A020101","LOCATION_PAGE":strSubUrl,"STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"DOKDO"};
				dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
				linkFramSetBankingPage(getUrl("dgb_login"));
			}else{
				if( dat.USER_DV_VAL == "2" || dat.USER_DV_VAL == "3" ){
					linkFramSetBankingPage(getUrl("cdd_cib"));
				}else{
					if(confirm((pibMmessage.replace("..",".\n\n").replace("..",".\n\n")))){
						var jexAjax2 = jex.createAjaxUtil("com_ebz_logout");

						jexAjax2.execute(function(dat) {
							linkFramSetBankingPage(getUrl("dgb_login"));
						});
					}
				}
			}
		}
	});
}

function setGreenBank(userDvVal){
	var pibMmessage = _CodeMgr.getCodeMsg('RSPS_CD', 'VAL1705');
	var cibMmessage = _CodeMgr.getCodeMsg('RSPS_CD', 'VAL1706');
	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");

	jexAjax.setAsync(false);

	jexAjax.execute(function(dat) {
		if( userDvVal == 'H1' ){
			if( jex.null2Void(dat.USER_DV_VAL) == "" ){
				dataCtrl.delObjData("MENU_LOCATION");
				var tmpObj = {"TOPLVL_MNU_ID":"A01","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A010101","LOCATION_PAGE":"com_ebz_cgr_pib_main.act","STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"GREEN"};
				dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
				linkFramSetBankingPage(getUrl("dgb_login"));
			}else{
				if( dat.USER_DV_VAL == "2" || dat.USER_DV_VAL == "3" ){
					if(confirm((cibMmessage.replace("..",".\n\n").replace("..",".\n\n")))){
						var jexAjax2 = jex.createAjaxUtil("com_ebz_logout");
						jexAjax2.execute(function(dat) {
							linkFramSetBankingPage(getUrl("dgb_login"));
						});
					}
				}else{
					linkFramSetBankingPage(getUrl("cgr_pib"));
				}
			}
		}else{
			if( jex.null2Void(dat.USER_DV_VAL) == "" ){
				dataCtrl.delObjData("MENU_LOCATION");
				var strSubUrl = _CodeMgr.getCodeMsg('SUB_URL', '1002');// com_ebz_cib_sub_main.act
				if( strSubUrl.indexOf('com_ebz_cib_sub_main') > -1 )
				{
					strSubUrl = "com_ebz_cgr_cib_main.act";
				}
				var tmpObj = {"TOPLVL_MNU_ID":"A02","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A020101","LOCATION_PAGE":strSubUrl,"STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"GREEN"};
				dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
				location.href = getUrl("dgb_login");
			}else{
				if( dat.USER_DV_VAL == "2" || dat.USER_DV_VAL == "3" ){
					linkFramSetBankingPage(getUrl("cgr_cib"));
				}else{
					if(confirm((pibMmessage.replace("..",".\n\n").replace("..",".\n\n")))){
						var jexAjax2 = jex.createAjaxUtil("com_ebz_logout");
						jexAjax2.execute(function(dat) {
							linkFramSetBankingPage(getUrl("dgb_login"));
						});
					}
				}
			}
		}
	});
}

function setCgjBank(userDvVal){
	var pibMmessage = _CodeMgr.getCodeMsg('RSPS_CD', 'VAL1705');
	var cibMmessage = _CodeMgr.getCodeMsg('RSPS_CD', 'VAL1706');
	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");

	jexAjax.setAsync(false);

	jexAjax.execute(function(dat) {
		if( userDvVal == 'H1' ){
			if( jex.null2Void(dat.USER_DV_VAL) == "" ){
				dataCtrl.delObjData("MENU_LOCATION");
				var tmpObj = {"TOPLVL_MNU_ID":"A01","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A010101","LOCATION_PAGE":"com_ebz_cgj_pib_main.act","STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"CGJ"};
				dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
				linkFramSetBankingPage(getUrl("dgb_login"));
			}else{
				if( dat.USER_DV_VAL == "2" || dat.USER_DV_VAL == "3" ){
					if(confirm((cibMmessage.replace("..",".\n\n").replace("..",".\n\n")))){
						var jexAjax2 = jex.createAjaxUtil("com_ebz_logout");
						jexAjax2.execute(function(dat) {
							linkFramSetBankingPage(getUrl("dgb_login"));
						});
					}
				}else{
					linkFramSetBankingPage(getUrl("cgj_pib"));
				}
			}
		}else{
			if( jex.null2Void(dat.USER_DV_VAL) == "" ){
				dataCtrl.delObjData("MENU_LOCATION");
				var strSubUrl = _CodeMgr.getCodeMsg('SUB_URL', '1002');// com_ebz_cib_sub_main.act
				if( strSubUrl.indexOf('com_ebz_cib_sub_main') > -1 )
				{
					strSubUrl = "com_ebz_cgj_cib_main.act";
				}
				var tmpObj = {"TOPLVL_MNU_ID":"A02","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A020101","LOCATION_PAGE":strSubUrl,"STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"CGJ"};
				dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
				linkFramSetBankingPage(getUrl("dgb_login"));
			}else{
				if( dat.USER_DV_VAL == "2" || dat.USER_DV_VAL == "3" ){
					linkFramSetBankingPage(getUrl("cgj_cib"));
				}else{
					if(confirm((pibMmessage.replace("..",".\n\n").replace("..",".\n\n")))){
						var jexAjax2 = jex.createAjaxUtil("com_ebz_logout");
						jexAjax2.execute(function(dat) {
							linkFramSetBankingPage(getUrl("dgb_login"));
						});
					}
				}
			}
		}
	});
}

function setHswBank(userDvVal){
	var pibMmessage = _CodeMgr.getCodeMsg('RSPS_CD', 'VAL1705');
	var cibMmessage = _CodeMgr.getCodeMsg('RSPS_CD', 'VAL1706');
	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");

	jexAjax.setAsync(false);

	jexAjax.execute(function(dat) {
		if( userDvVal == 'H1' ){
			if( jex.null2Void(dat.USER_DV_VAL) == "" ){
				dataCtrl.delObjData("MENU_LOCATION");
				var tmpObj = {"TOPLVL_MNU_ID":"A01","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A010101","LOCATION_PAGE":"com_ebz_chs_pib_main.act","STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"HSW"};
				dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
				linkFramSetBankingPage(getUrl("dgb_login"));
			}else{
				if( dat.USER_DV_VAL == "2" || dat.USER_DV_VAL == "3" ){
					if(confirm((cibMmessage.replace("..",".\n\n").replace("..",".\n\n")))){
						var jexAjax2 = jex.createAjaxUtil("com_ebz_logout");
						jexAjax2.execute(function(dat) {
							linkFramSetBankingPage(getUrl("dgb_login"));
						});
					}
				}else{
					linkFramSetBankingPage(getUrl("chs_pib"));
				}
			}
		}else{
			if( jex.null2Void(dat.USER_DV_VAL) == "" ){
				dataCtrl.delObjData("MENU_LOCATION");
				var strSubUrl = _CodeMgr.getCodeMsg('SUB_URL', '1002');// com_ebz_cib_sub_main.act
				if( strSubUrl.indexOf('com_ebz_cib_sub_main') > -1 )
				{
					strSubUrl = "com_ebz_chs_cib_main.act";
				}
				var tmpObj = {"TOPLVL_MNU_ID":"A02","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A020101","LOCATION_PAGE":strSubUrl,"STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"HSW"};
				dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
				linkFramSetBankingPage(getUrl("dgb_login"));
			}else{
				if( dat.USER_DV_VAL == "2" || dat.USER_DV_VAL == "3" ){
					linkFramSetBankingPage(getUrl("chs_cib"));
				}else{
					if(confirm((pibMmessage.replace("..",".\n\n").replace("..",".\n\n")))){
						var jexAjax2 = jex.createAjaxUtil("com_ebz_logout");
						jexAjax2.execute(function(dat) {
							linkFramSetBankingPage(getUrl("dgb_login"));
						});
					}
				}
			}
		}
	});
}

function setCctBank(userDvVal){
	var pibMmessage = _CodeMgr.getCodeMsg('RSPS_CD', 'VAL1705');
	var cibMmessage = _CodeMgr.getCodeMsg('RSPS_CD', 'VAL1706');
	var jexAjax = jex.createAjaxUtil("com_ebz_user_info");

	jexAjax.setAsync(false);

	jexAjax.execute(function(dat) {
		if( userDvVal == 'H1' ){
			if( jex.null2Void(dat.USER_DV_VAL) == "" ){
				dataCtrl.delObjData("MENU_LOCATION");
				var tmpObj = {"TOPLVL_MNU_ID":"A01","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A010101","LOCATION_PAGE":"com_ebz_cct_pib_main.act","STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"CCT"};
				dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
				linkFramSetBankingPage(getUrl("dgb_login"));
			}else{
				if( dat.USER_DV_VAL == "2" || dat.USER_DV_VAL == "3" ){
					if(confirm((cibMmessage.replace("..",".\n\n").replace("..",".\n\n")))){
						var jexAjax2 = jex.createAjaxUtil("com_ebz_logout");
						jexAjax2.execute(function(dat) {
							linkFramSetBankingPage(getUrl("dgb_login"));
						});
					}
				}else{
					linkFramSetBankingPage(getUrl("cct_pib"));
				}
			}
		}else{
			if( jex.null2Void(dat.USER_DV_VAL) == "" ){
				dataCtrl.delObjData("MENU_LOCATION");
				var strSubUrl = _CodeMgr.getCodeMsg('SUB_URL', '1002');// com_ebz_cib_sub_main.act
				if( strSubUrl.indexOf('com_ebz_cib_sub_main') > -1 )
				{
					strSubUrl = "com_ebz_cct_cib_main.act";
				}
				var tmpObj = {"TOPLVL_MNU_ID":"A02","MNU_LEVL_NO":"4","IBNK_UPPER_MNU_CD":"A020101","LOCATION_PAGE":strSubUrl,"STRT_PG_DRCTR_NM":"inq","IBNK_MNU_CD":"X010101", "CYBER_GBN":"CCT"};
				dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(tmpObj));
				linkFramSetBankingPage(getUrl("dgb_login"));
			}else{
				if( dat.USER_DV_VAL == "2" || dat.USER_DV_VAL == "3" ){
					linkFramSetBankingPage(getUrl("cct_cib"));
				}else{
					if(confirm((pibMmessage.replace("..",".\n\n").replace("..",".\n\n")))){
						var jexAjax2 = jex.createAjaxUtil("com_ebz_logout");
						jexAjax2.execute(function(dat) {
							linkFramSetBankingPage(getUrl("dgb_login"));
						});
					}
				}
			}
		}
	});
}

function setDgbFinGroup(num) {
	var openUrl = _CodeMgr.getCodeMsg("CODE_URL",num);
	window.open(openUrl);
}

function setConnectSite(num) {
	var openUrl = _CodeMgr.getCodeMsg("CODE_URL",num);
	window.open(openUrl);
}

function tempPswdChk(tempDate, sub) {

	alert("임시비밀번호 변경후 정상적인 이용이 가능합니다.");
	if(sub=="dfm")linkMenuPage('dfm_mem_sub4_2','dfm_mem_sub4','0', '/com_ebz_dfm_mem_main.act');
	else linkMenuPage('mem_mem_sub4_2','mem_mem_sub4','1', '/com_ebz_mem_main.act.act');
}

function padZero(s) {
	if( s.substr(0,1) == "0" ) {
		return s.substr(1,1);
	} else {
		return s;
	}
}

function goBbsPage(bbsId, site, menu, seq, atcFileDvcd){
	var MENU_LOCATION 	= "";
	var ID 				= "";
	var NUM 			= "";
	var LOCATION_PAGE 	= "";
	var MENU_DEPTH		= "3";
	var jObj = {};

	if( bbsId == "EVE001" && site == "01" && menu == "A" ) {	//카드이벤트
		MENU_LOCATION 	= "fnm_fnc_sub6";
		ID 				= "fnm_fnc_sub6_1";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_fpm_main.act";
	}else if( bbsId == "NOM009" && site == "01" && menu == "P" ) {	//퇴직연금공지사항
		MENU_LOCATION 	= "fnm_fnr_sub7";
		ID 				= "fnm_fnr_sub7_2";
		NUM 			= "1";
		LOCATION_PAGE 	= "/com_ebz_fpm_main.act";
	}else if( bbsId == "NOM122" && site == "01" && menu == "H" ) {	//수시공시
		MENU_LOCATION 	= "fnm_fnf_sub4";
		ID 				= "";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_fpm_main.act";
	}else if( bbsId == "NOM010" && site == "02" && menu == "A" ) {	//PB칼럼
		MENU_LOCATION 	= "fsv_fnp_sub1";
		ID 				= "fsv_fnp_sub1_5";
		NUM 			= "4";
		LOCATION_PAGE 	= "/com_ebz_fsv_main.act";
	}else if( bbsId == "NOM011" && site == "02" && menu == "A" ) {	//재테크칼럼
		MENU_LOCATION 	= "fsv_fnz_sub1";
		ID 				= "fsv_fnz_sub1_1";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_fsv_main.act";
	}else if( bbsId == "PRO001" && site == "02" && menu == "A" ) {	//공매물건
		MENU_LOCATION 	= "fsv_fnz_sub1";
		ID 				= "fsv_fnz_sub1_3_6";
		NUM 			= "1";
		LOCATION_PAGE 	= "/com_ebz_fsv_main.act";
	}else if( bbsId == "EVE001" && site == "03" && menu == "A" ) {	//이벤트
		MENU_LOCATION 	= "hlp_hvt_sub1";
		ID 				= "";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
	}else if( bbsId == "FAQ002" && site == "03" && menu == "B" ) {	//FAQ[개인인터넷뱅킹]
		MENU_LOCATION 	= "hlp_hsd_sub1";
		ID 				= "hlp_hsd_sub1_1";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
		MENU_DEPTH		= "1";
	}else if( bbsId == "FAQ002" && site == "03" && menu == "C" ) {	//FAQ[기업인터넷뱅킹]
		MENU_LOCATION 	= "hlp_hsd_sub1";
		ID 				= "hlp_hsd_sub1_1";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
		MENU_DEPTH		= "1";
	}else if( bbsId == "FAQ002" && site == "03" && menu == "C" ) {	//FAQ[모바일]
		MENU_LOCATION 	= "hlp_hsd_sub1";
		ID 				= "hlp_hsd_sub1_1";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
		MENU_DEPTH		= "1";
	}else if( bbsId == "FAQ008" && site == "03" && menu == "V" ) {	//FAQ[공인인증서]
		MENU_LOCATION 	= "hlp_hsd_sub1";
		ID 				= "hlp_hsd_sub1_1";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
		MENU_DEPTH		= "1";
	}else if( bbsId == "FAQ001" && site == "03" && menu == "D" ) {	//FAQ[외환]
		MENU_LOCATION 	= "hlp_hsd_sub1";
		ID 				= "hlp_hsd_sub1_2";
		NUM 			= "1";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
		MENU_DEPTH		= "1";
	}else if( bbsId == "FAQ001" && site == "03" && menu == "E" ) {	//FAQ[카드]
		MENU_LOCATION 	= "hlp_hsd_sub1";
		ID 				= "hlp_hsd_sub1_2";
		NUM 			= "1";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
		MENU_DEPTH		= "1";
	}else if( bbsId == "FAQ001" && site == "03" && menu == "F" ) {	//FAQ[예금]
		MENU_LOCATION 	= "hlp_hsd_sub1";
		ID 				= "hlp_hsd_sub1_2";
		NUM 			= "1";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
		MENU_DEPTH		= "1";
	}else if( bbsId == "FAQ001" && site == "03" && menu == "I" ) {	//FAQ[방카슈랑스]
		MENU_LOCATION 	= "hlp_hsd_sub1";
		ID 				= "hlp_hsd_sub1_2";
		NUM 			= "1";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
		MENU_DEPTH		= "1";
	}else if( bbsId == "FAQ001" && site == "03" && menu == "G" ) {	//FAQ[대출]
		MENU_LOCATION 	= "hlp_hsd_sub1";
		ID 				= "hlp_hsd_sub1_2";
		NUM 			= "1";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
		MENU_DEPTH		= "1";
	}else if( bbsId == "FAQ001" && site == "03" && menu == "P" ) {	//FAQ[신탁/퇴직연금]
		MENU_LOCATION 	= "hlp_hsd_sub1";
		ID 				= "hlp_hsd_sub1_2";
		NUM 			= "1";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
		MENU_DEPTH		= "1";
	}else if( bbsId == "FAQ001" && site == "03" && menu == "H" ) {	//FAQ[펀드]
		MENU_LOCATION 	= "hlp_hsd_sub1";
		ID 				= "hlp_hsd_sub1_2";
		NUM 			= "1";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
		MENU_DEPTH		= "1";
	}else if( bbsId == "FNM001" && site == "03" && menu == "A" ) {	//금융상품공시실
		if( atcFileDvcd == "1" )	//약관
			MENU_LOCATION	= "hlp_hls_sub2";
		if( atcFileDvcd == "2" )	//상품설명서
			MENU_LOCATION	= "hlp_hls_sub3";
		if( atcFileDvcd == "5" )	//자산운용보고서
			MENU_LOCATION	= "hlp_hls_sub4";
		else
			alert("자료실 첨부파일 구분이 존재하지 않습니다.");
		ID 				= "";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_dgi_main.act";
	}else if( bbsId == "NEW001" && site == "03" && menu == "Q" ) {	//새소식[전자금융]
		MENU_LOCATION 	= "hlp_hns_sub1";
		ID 				= "";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
	}else if( bbsId == "NEW001" && site == "03" && menu == "J" ) {	//새소식[은행소개]
		MENU_LOCATION 	= "hlp_hns_sub1";
		ID 				= "";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
	}else if( bbsId == "NEW001" && site == "03" && menu == "C" ) {	//새소식[기업]
		MENU_LOCATION 	= "hlp_hns_sub1";
		ID 				= "";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
	}else if( bbsId == "NEW001" && site == "03" && menu == "B" ) {	//새소식[개인]
		MENU_LOCATION 	= "hlp_hns_sub1";
		ID 				= "";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
	}else if( bbsId == "NEW001" && site == "03" && menu == "A" ) {	//새소식[전체]
		MENU_LOCATION 	= "hlp_hns_sub1";
		ID 				= "";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
	}else if( bbsId == "NOM021" && site == "03" && menu == "A" ) {	//지역정보
		MENU_LOCATION 	= "hlp_hre_sub1";
		ID 				= "";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";
	}else if( bbsId == "RFN037" && site == "03" && menu == "A" ) {	//서식자료실
		MENU_LOCATION 	= "hlp_hls_sub1";
		ID 				= "";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_hlp_main.act";

		jObj._BBS_TAB_SCR_YN      = "Y";
		jObj._BBS_TAB_FNM_PROD_DV = "00";
		jObj._BBS_FNM_FILE_DV     = "4";
	}else if( bbsId == "CRG001" && site == "04" && menu == "A" ) {	//보도자료
		MENU_LOCATION 	= "dgi_new_sub1";
		ID 				= "";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_dgi_main.act";
	}else if( bbsId == "LIB001" && site == "04" && menu == "L" ) {	//연속간행물 소장목록
		MENU_LOCATION 	= "dgi_fac_sub2";
		ID 				= "dgi_fac_sub2_2";
		NUM 			= "1";
		LOCATION_PAGE 	= "/com_ebz_dgi_main.act";
	}else if( bbsId == "LIB002" && site == "04" && menu == "L" ) {	//단행본
		MENU_LOCATION 	= "dgi_fac_sub2";
		ID 				= "dgi_fac_sub2_3";
		NUM 			= "2";
		LOCATION_PAGE 	= "/com_ebz_dgi_main.act";
	}else if( bbsId == "LIB003" && site == "04" && menu == "L" ) {	//연구보고서
		MENU_LOCATION 	= "dgi_fac_sub2";
		ID 				= "dgi_fac_sub2_4";
		NUM 			= "3";
		LOCATION_PAGE 	= "/com_ebz_dgi_main.act";
	}else if( bbsId == "LIB004" && site == "04" && menu == "L" ) {	//논문
		MENU_LOCATION 	= "dgi_fac_sub2";
		ID 				= "dgi_fac_sub2_5";
		NUM 			= "4";
		LOCATION_PAGE 	= "/com_ebz_dgi_main.act";
	}else if( bbsId == "LIB005" && site == "04" && menu == "L" ) {	//기사
		MENU_LOCATION 	= "dgi_fac_sub2";
		ID 				= "dgi_fac_sub2_6";
		NUM 			= "5";
		LOCATION_PAGE 	= "/com_ebz_dgi_main.act";
	}else if( bbsId == "NOM022" && site == "04" && menu == "A" ) {	//CEO활동
		MENU_LOCATION 	= "dgi_avt_sub_3";
		ID 				= "dgi_avt_sub_3_3";
		NUM 			= "2";
		LOCATION_PAGE 	= "/com_ebz_dgi_main.act";
	}else if( bbsId == "NOM040" && site == "04" && menu == "A" ) {	//아름다운동행
		MENU_LOCATION 	= "dgi_new_sub2";
		ID 				= "";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_dgi_main.act";
	}else if( bbsId == "NOM131" && site == "04" && menu == "A" ) {	//향토와문화
		MENU_LOCATION 	= "dgi_new_sub3";
		ID 				= "";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_dgi_main.act";
	}else if( bbsId == "NOT013" && site == "04" && menu == "K" ) {	//공고
		MENU_LOCATION 	= "dgi_dgb_sub3";
		ID 				= "";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_dgi_main.act";
	}else if( bbsId == "RFN002" && site == "04" && menu == "K" ) {	//지속가능경영보고서
		MENU_LOCATION 	= "dgi_dgb_sub2";
		ID 				= "dgi_dgb_sub2_4";
		NUM 			= "1";
		LOCATION_PAGE 	= "/com_ebz_dgi_main.act";
	}else if( bbsId == "RFN003" && site == "04" && menu == "K" ) {	//Presentation
		MENU_LOCATION 	= "dgi_dgb_sub2";
		ID 				= "dgi_dgb_sub2_1";
		NUM 			= "0";
		LOCATION_PAGE 	= "/com_ebz_dgi_main.act";
	}else if( bbsId == "RFN009" && site == "04" && menu == "K" ) {	//경영공시
		MENU_LOCATION 	= "dgi_dgb_sub3";
		ID 				= "dgi_dgb_sub3_4";
		NUM 			= "3";
		LOCATION_PAGE 	= "/com_ebz_dgi_main.act";
	}else if( bbsId == "RFN010" && site == "04" && menu == "K" ) {	//주주총회공고및경영수시공시
		MENU_LOCATION 	= "dgi_dgb_sub3";
		ID 				= "dgi_dgb_sub3_5";
		NUM 			= "4";
		LOCATION_PAGE 	= "/com_ebz_dgi_main.act";
	}else if( bbsId == "RFN011" && site == "04" && menu == "K" ) {	//사외이사공시
		MENU_LOCATION 	= "dgi_dgb_sub3";
		ID 				= "dgi_dgb_sub3_6";
		NUM 			= "5";
		LOCATION_PAGE 	= "/com_ebz_dgi_main.act";
	}else if( bbsId == "VDO001" && site == "04" && menu == "A" ) {	//CEO동영상
		MENU_LOCATION 	= "dgi_abt_sub3";
		ID 				= "dgi_abt_sub3_4";
		NUM 			= "3";
		LOCATION_PAGE 	= "/com_ebz_dgi_main.act";
	}else {
		alert("상세조회가 불가능한 게시판입니다.");
		return;
	}

	if( bbsId == "FAQ001" || bbsId == "FAQ002") {
		site = "99";
	}
	jObj._BBS_ID         = bbsId;    //게시판아이디
	jObj._BBS_SITECD     = site ;    //게시판사이트구분
	jObj._BBS_MENUCD     = menu ;    //게시판메뉴구분
	jObj._BBS_WRITSEQ    = seq  ;    //게시물번호
	dataCtrl.setObjData('BBS_DATA_LINK', JSON.stringify(jObj));

	linkMenuPageFAQ(ID, MENU_LOCATION, NUM, LOCATION_PAGE, MENU_DEPTH);
}

function linkMenuPageFAQ(linkValue, id, num, linkPage, depth) {
	var obj = {
		'MENU_LOCATION' : linkValue,
		'MENU_DEPTH' : '3',
		'ID' : id,
		'NUM' : num,
		'LOCATION_PAGE' : linkPage,
		'HP_BK' : 'HP'
	};

	dataCtrl.setObjData("MENU_LOCATION", JSON.stringify(obj));
	parent.location.href = linkPage;
}

function linkMenuPageBBS(linkValue, id, num, linkPage, depth) {
	var jObj = {};
	jObj._BBS_MENU_VAL   = linkValue;
	jObj._BBS_MENU_ID    = id;
	jObj._BBS_MENU_NUM   = num;

	dataCtrl.setObjData("BBS_DATA_LINK1", JSON.stringify(jObj));
	parent.location.href = linkPage;
}

function drawHeader(sub){
	_IS_RENEWAL_PAGE = false;
	if( sub == "fpm" || sub == "fsv" || sub == "dgi" || sub == "hlp" || sub == "ser" )
	{
		_IS_RENEWAL_PAGE = true;
	}
	var titleTop = "";
	var title = "";
	var snb		 = "<div class=\"dgb_snb\"></div>";

	if( sub == "hlp" ) {
		titleTop = "<h2 class=\"titleTop\"><a href=\"javascript:goSubMain('hlp');\" title=\"고객센터\"><img src=\"../../../img/common/txt/ebz_topCS.gif\" alt=\"고객감동센터\"/></a></h2>";
		title = "고객센터";
	} else if( sub == "dgi" ) {
		titleTop = "<h2 class=\"titleTop\"><a href=\"javascript:goSubMain('dgi');\" title=\"은행소개\"><img src=\"../../../img/common/txt/ebz_topDGB.gif?v=20240605\" alt=\"은행소개\"/></a></h2>";
		title = "은행소개";
	} else if( sub == "ser" ) {
		titleTop = "<h2 class=\"titleTop\"><a href=\"/com_ebz_ser_main.act\" title=\"통합검색\"><img src=\"../../../img/common/txt/ebz_top_logoSearch.gif\" alt=\"통합검색\" style=\"margin-top:2px;\"/></a></h2>";
		title = "통합검색";
	} else if( sub == "fpm" ) {
		titleTop = "<h2 class=\"titleTop\"><a href=\"javascript:goSubMain('fpm');\" title=\"금융상품몰\"><img src=\"../../../img/common/txt/ebz_topMall.gif\" alt=\"금융상품몰\"/></a></h2>";
		title = "금융상품몰";
	} else if( sub == "fsv" ) {
		titleTop = "<h2 class=\"titleTop\"><a href=\"javascript:goSubMain('fsv');\" title=\"금융서비스\"><img src=\"/img/common/txt/ebz_topService.gif\" alt=\"금융서비스\"/></a></h2>";
		title = "금융서비스";
	} else if( sub == "ssm" ) {
		titleTop = "<h2 class=\"titleTop\"><a href=\"javascript:goSubMain('ssm');\" title=\"신고신청몰\"><img src=\"../img/common/txt/ebz_topHelp.gif\" alt=\"신고신청몰\"/></a></h2>";
		title = "신고신청몰";
		//snb		 = "";
	} else if( sub == "slo" ) {
		titleTop = "<h1 class=\"logo_region\"><a href=\"javascript:goSubMain('slo');\" title=\"지역愛\"><img src=\"../img/common/sub/ebz_top_region_logo.gif\" alt=\"지역愛\"></a></h1>";
		title = "지역愛";
	} else if( sub == "mem" ) {
		titleTop = "<h2 class=\"titleTop\"><a href=\"javascript:goSubMain('mem');\" title=\"회원정보센터\"><img src=\"../../../img/common/txt/ebz_top_mbm.gif\" alt=\"회원정보센터\"/></a></h2>";
		title = "회원정보센터";
		//snb		 = "";
	}else if( sub == "dok" ) {
		titleTop = "<h1 class=\"logoTop\"><a href=\"/dlo_ebz_main.act\" title=\"아이엠뱅크 독도사랑모임\"><img src=\"/cms/site/dlo/img/main/dok_top_logo.gif\" alt=\"아이엠뱅크 독도사랑모임\"/></a></h1>";
		title = "회원정보센터";
		//snb		 = "";
	}

	var top_header = "";
	if( _IS_RENEWAL_PAGE )
	{
		var top_header_menu_site = "";
		if( sub != "fpm" ) {
			top_header_menu_site += "		<li class=\"mall\"><a href=\"javascript:goSubMain('fpm');\" title=\"금융상품몰\">금융상품몰</a></li>";
		}
		if( sub != "fsv" ) {
			top_header_menu_site += "		<li class=\"service\"><a href=\"javascript:goSubMain('fsv');\" title=\"금융서비스\">금융서비스</a></li>";
		}

		top_header =
			"<div class=\"gnb chatbotType\">"
			+"	<h1 class=\"logo\"><a href=\"javascript:goSubMain('dgb');\" title=\"아이엠뱅크\">아이엠뱅크</a></h1>"
			+"	<h2 class=\"titleTop\"><a href=\"javascript:goSubMain('"+sub+"');\" title='"+title+"'>"+title+"</a></h2>"
			+"	<div class=\"gnb_top_area\">"
			+"		<div class=\"top_menu_list\">"
			+"			<ul id='user_log_area'>"
			+"				<li class='intro'><a href=\"/com_ebz_dgi_sub_main.jsp\" title=\"은행소개\">은행소개</a></li>"
			+"				<li><a href=\"/com_ebz_hlp_sub_main.jsp\" title=\"고객센터\">고객센터</a></li>"
			+"				<li class=\"log_in\" id=\"log_area\"></li>"
			+"			</ul>"
			+"		</div>"
			+"	</div>"
			+"	<ul class=\"menu\">"
			+"		<li class=\"private\"><a href=\"javascript:goSubMain('pib');\" title=\"개인뱅킹\">개인뱅킹</a></li>"
			+"		<li class=\"company\"><a href=\"javascript:goSubMain('cib');\" title=\"기업뱅킹\">기업뱅킹</a></li>"
			+		top_header_menu_site
			+"		<li class=\"certificate\"><a href=\"javascript:goSubMain('crt');\" title=\"인증센터\">인증센터</a></li>"
			+"		<li class=\"chatbot\"><a href=\"javascript:CHB.openChatWindowPopup();\" title=\"챗봇\"><img src=\"/img/common/btn/ebz_btn_chatbot.png\" alt=\"챗봇 새창으로열기\"></a></li>"
			+"	</ul>"
			+"	<div class=\"search\">"
			+"		<form onsubmit=\"return false;\">"
			+"			<fieldset>"
			+"				<label for=\"srhInput\" >검색어를 입력하세요.</label>"
			+"				<input type=\"text\" id=\"srhInput\" name=\"srhInput\" class=\"srh_input\" href=\"javascript:javascript:$(this).removeClass('srh_input');\" onkeydown=\"onKeyPressCom();\" placeholder=\"검색어를 입력하세요\">"
			+"				<button type=\"button\" id=\"topSrchBtn\" name=\"topSrchBtn\" title=\"검색\" class=\"srhBtn\" onclick=\"fnSearchResultGo()\">검색</button>"
			+"			</fieldset>"
			+"		</form>"
			+"	</div>"
			+"	<ul class=\"etcBtn\">"
			+"		<li id=\"language\" class=\"lang\">"
			+"			<a href=\"javascript:void(0);\" title=\"하위메뉴있음\" class=\"out\">언어선택</a>"
			+"			<ul style=\"visibility: hidden; \">"
			+"				<li class=\"kor\"><a href=\"javascript:selectKRLanguage();\" id=\"lang_dvcd_kr\" title=\"한국어\">한국어</a></li>"
			+"				<li class=\"eng\"><a href=\"javascript:selectENLanguage();\" id=\"lang_dvcd_en\" title=\"ENGLISH\">ENGLISH</a></li>"
			+"				<li class=\"cn\"><a href=\"javascript:selectCNLanguage();\" id=\"lang_dvcd_cn\" title=\"中文\">中文</a></li>"
			+"			</ul>"
			+"		</li>"
			+"		<li class=\"report\"><a href=\"javascript:showSiteMap();\" title=\"전체메뉴\" id=\"all_mnu_view\">전체메뉴</a></li>"
			+"	</ul>"
			+"</div>"
			+"<p class='hidden'>다음의 메뉴 리스트의 마지막 항목을 클릭 하시면 아이엠뱅크 홈페이지의 모든 메뉴에 접근 할 수 있습니다.</p>"; // 신규 추가 내용
	}
	else
	{
		top_header =
			"<div class=\"gnb chatbotType\">"
			+"	<h1 class=\"logo\"><a href=\"javascript:goSubMain('dgb');\" title=\"아이엠뱅크\">아이엠뱅크</a></h1>"
			+"	<h2 class=\"titleTop\"><a href=\"javascript:goSubMain('"+sub+"');\" title='"+title+"'>"+title+"</a></h2>"
			+"	<div class=\"gnb_top_area\">"
			+"	<div class=\"top_menu_list\">"
			+"		<ul id='user_log_area'>"
			+"			<li class=\"log_in\" id=\"log_area\"></li>"
			+"			<li class=\"access\"><a href=\"https://banking.dgb.co.kr/fst_ebz_sub_main.act\" title=\"접근성설정\">접근성설정</a></li>"
			+"			<li class='intro'><a href=\"/com_ebz_dgi_sub_main.jsp\" title=\"은행소개\">은행소개</a></li>"
			+"			<li><a href=\"/com_ebz_hlp_sub_main.jsp\" title=\"고객센터\">고객센터</a></li>"
			+"			<li class=\"langs\">"
			+"				<a href=\"#none\" title=\"하위메뉴있음\">LANGUAGE</a>"
			+"				<ul>"
			+"					<li class=\"kor\"><a id=\"lang_dvcd_kr\" title=\"한국어\" class=\"\" href=\"javascript:selectKRLanguage();\">한국어</a></li>"
			+"					<li class=\"eng\"><a id=\"lang_dvcd_en\" title=\"ENGLISH\" class=\"\" href=\"javascript:selectENLanguage();\">ENGLISH</a></li>"
			+"					<li class=\"cn\"><a id=\"lang_dvcd_cn\" title=\"中文\" class=\"\" href=\"javascript:selectCNLanguage();\">中文</a></li>"
			+"				</ul>"
			+"			</li>"
			+"		</ul>"
			+"	</div>"
			+"	</div>"
			+"	<ul class=\"menu\">"
			+"		<li class=\"private\"><a href=\"javascript:goSubMain('pib');\" title=\"개인뱅킹\">개인뱅킹</a></li>"
			+"		<li class=\"company\"><a href=\"javascript:goSubMain('cib');\" title=\"기업뱅킹\">기업뱅킹</a></li>"
			+"		<li class=\"mall\"><a href=\"javascript:goSubMain('fpm');\" title=\"금융상품몰\">금융상품몰</a></li>"
			+"		<li class=\"service\"><a href=\"javascript:goSubMain('fsv');\" title=\"금융서비스\">금융서비스</a></li>"
			+"		<li class=\"certificate\"><a href=\"javascript:goSubMain('crt');\" title=\"인증센터\">인증센터</a></li>"
			+"		<li class=\"chatbot\"><a href=\"javascript:CHB.openChatWindowPopup();\" title=\"챗봇\"><img src=\"/img/common/btn/ebz_btn_chatbot.png\" alt=\"챗봇 새창으로열기\"></a></li>"
			+"	</ul>"
			+"	<div class=\"search\">"
			+"		<form onsubmit=\"return false;\">"
			+"			<fieldset>"
			+"				<label for=\"srhInput\" >검색어를 입력하세요.</label>"
			+"				<input type=\"text\" id=\"srhInput\" name=\"srhInput\" class=\"srh_input\" href=\"javascript:javascript:$(this).removeClass('srh_input');\" onkeydown=\"onKeyPressCom();\">"
			+"				<button type=\"button\" id=\"topSrchBtn\" name=\"topSrchBtn\" title=\"검색\" class=\"srhBtn\" onclick=\"fnSearchResultGo()\">검색</button>"
			+"			</fieldset>"
			+"		</form>"
			+"	</div>"
			+"</div>"
			+"<p class='hidden'>다음의 메뉴 리스트의 마지막 항목을 클릭 하시면 아이엠뱅크 홈페이지의 모든 메뉴에 접근 할 수 있습니다.</p>"; // 신규 추가 내용
	}


	if( sub != "ssm" ) {
		top_header += snb;
	}

	/*
	var top_header =
		 "	<div class=\"menuAll\">"
		+"    <div class=\"box\" style=\"display:none;\"></div>"
		+"    <div class=\"btnAll_area\">"
		+"        <ul class=\"btnAll\">"
		+"            <li><a href=\"javascript:goSubMain('ssm');\" title=\"신고/신청몰\" class=\"Allbtn01\">신고/신청몰</a></li>"
		+"            <li><a href=\"javascript:goSubMain('slo');\" title=\"지역愛\" class=\"Allbtn02\">지역愛</a></li>"
		+"            <li><a href=\"javascript:linkMenuPage('hlp_hvs_sub3_1','hlp_hvs_sub3','0', 'com_ebz_hlp_main.act')\" title=\"인터넷뱅킹 안전지킴이\" class=\"Allbtn03\">인터넷뱅킹 안전지킴이</a></li>"
		+"            <li><a href=\"javascript:loginPage();\" title=\"로그인\" style='width:15px;float:left;height:10px;'> </a></li>"
		+"        </ul>"
		+"    </div>"
		+"</div>"
		+"<div class=\"gnb\">"
		+"    <h1 class=\"logo\"><a href=\"javascript:goSubMain('dgb');\" title=\"DGB 대구은행\">대구은행</a></h1>"
		+titleTop
		+"    <ul class=\"menu\">"
		+"        <li class=\"private\"><a href=\"javascript:goSubMain('pib');\" title=\"개인뱅킹\">개인뱅킹</a></li>"
		+"        <li class=\"div\"></li>"
		+"        <li class=\"company\"><a href=\"javascript:goSubMain('cib');\" title=\"기업뱅킹\">기업뱅킹</a></li>"
		+"        <li class=\"div\"></li>"
		+"        <li class=\"mall\"><a href=\"javascript:goSubMain('fpm');\" title=\"금융상품몰\">금융상품몰</a></li>"
		+"        <li class=\"div\"></li>"
		+"        <li class=\"service\"><a href=\"javascript:goSubMain('fsv');\" title=\"금융서비스\">금융서비스</a></li>"
		+"    </ul>"
		+"    <div class=\"search\">"
		+"        <form onsubmit=\"return false;\">"
		+"            <fieldset>"
		+"                <label for=\"srhInput\" style=\"display:none;\">검색어를 입력하세요.</label>"
		+"                <input type=\"text\" value=\"\" id=\"srhInput\" name=\"srhInput\"  class=\"srh_input\" href=\"javascript:javascript:$(this).removeClass('srh_input');\" onkeydown=\"onKeyPressCom();\" />"
		+"                <button type=\"button\" id=\"topSrchBtn\"  name=\"topSrchBtn\" title=\"검색\" class=\"srhBtn\" onclick=\"fnSearchResultGo()\">검색</button>"
		+"            </fieldset>"
		+"        </form>"
		+"    </div>"
		+"    <ul class=\"etcBtn\">"
		+"        <li id=\"language\" class=\"lang\">"
		+"            <a href=\"javascript:;\" title=\"언어선택\" class=\"out\">언어선택</a>"
		+"            <ul style=\"visibility: hidden; \">"
		+"                <li class=\"kor\"><a id=\"lang_dvcd_kr\" title=\"한국어\" class=\"\" href=\"javascript:selectKRLanguage();\">한국어</a></li>"
		+"                <li class=\"eng\"><a id=\"lang_dvcd_en\" title=\"ENGLISH\" class=\"\" href=\"javascript:selectENLanguage();\">ENGLISH</a></li>"
		+"                <li class=\"cn\"><a id=\"lang_dvcd_cn\" title=\"中文\" class=\"\" href=\"javascript:selectCNLanguage();\">中文</a></li>"
		+"            </ul>"
		+"        </li>"
		+"        <li class=\"report\"><a href=\"javascript:void(0);\"  title=\"전체메뉴\" id='all_mnu_view' >전체메뉴</a></li>"
		+"    </ul>"
		+"</div>"
		+snb;
	*/
	$("#header_div").append(top_header);
}


function drawHeader_msu(sub){
	_IS_RENEWAL_PAGE = false;
	var titleTop = "";
	var title = "";
	var snb		 = "<div class=\"dgb_snb\"></div>";

	var top_header =
		"<div id=\"gnb\" class=\"new_gnb\">"
		+"	<h1><a href=\"http://museum.dgb.co.kr\"><img src=\"/cms/site/msu/images/main/m_main_logo_mark.gif\" alt=\"아이엠뱅크 금융박물관 MUSEUM OF iM Bank\"></a></h1>"
		+" <h2><a href=\"https://dgb.co.kr\" title=\"아이엠뱅크\"><img src=\"/cms/site/msu/images/main/m_main_logo_home.png\" alt=\"아이엠뱅크\"></a></h2>"
		+"	</div>"
		+"<p class='hidden'>다음의 메뉴 리스트의 마지막 항목을 클릭 하시면 아이엠뱅크 홈페이지의 모든 메뉴에 접근 할 수 있습니다.</p>"; // 신규 추가 내용

	top_header += snb;

	$("#header_div").append(top_header);
}

function drawHeader_dok(sub){
	_IS_RENEWAL_PAGE = false;
	var titleTop = "";
	var title = "";

	var snb		 = "<div class=\"dgb_snb\"></div>";

	titleTop = "<h2 class=\"titleTop\"><a href=\"javascript:goSubMain('dok');\" title=\"회원정보센터\"><img src=\"/cms/site/dlo/img/main/dok_top_logo.gif\" alt=\"회원정보센터\"/></a></h2>";
	title = "회원정보센터";

	var top_header = dlo_header_layer(snb);

}

function drawHeader_etc(sub){
	_IS_RENEWAL_PAGE = false;

	var titleTop = "";
	var title = "";
	var top_header = "";
	var titleImg = "";
	var snb		 = "<div class=\"dgb_snb_type2\"></div>";
	//var snb		 = "<div class=\"dgb_snb\"></div>";

	var sumMainMenu = "<ul class=\"menu\">";


	if (sub == 'cgr'){
		titleTop = "";
		title    = "사이버그린지점";
		titleImg = "/img/common/txt/ebz_top_green.gif";
		top_header += "<div class=\"gnb\">";
		top_header += "<h1 class=\"logo\"><a href=\"javascript:goSubMain('cgr');\" title=\""+title+"\">"+title+" 로고</a></h1>";
		top_header += "<h2 class=\"titleTop\"><a href=\"javascript:goSubMain('cgr');\" title=\""+title+"\"><img src=\""+titleImg+"\" alt=\""+title+"\"></a></h2>";

		sumMainMenu += "<li class=\"green\"><a href=\"javascript:goSubMain('cgr_main');\"  title=\""+title+"\">"+title+"</a></li>";
		sumMainMenu += "<li class=\"private\"><a href=\"javascript:goSubMain('cgr_pib');\" title=\"개인뱅킹\">개인뱅킹</a></li>    ";
		sumMainMenu += "<li class=\"company\"><a href=\"javascript:goSubMain('cgr_cib');\" title=\"기업뱅킹\">기업뱅킹</a></li>    ";
		sumMainMenu += "<li class=\"mall\"><a href=\"javascript:goSubMain('cgr_fpm');\"    title=\"금융상품몰\">금융상품몰</a></li>  ";
		sumMainMenu += "<li class=\"dgb_home\"><a href=\"javascript:goSubMain('dgb');\"    title=\"아이엠뱅크 홈페이지\"><img src=\"/img/common/mark/ebz_dgb_logo_mark.png\" alt=\"아이엠뱅크\"></a></li>";
		sumMainMenu += "</ul>";

	}else if (sub == 'cdd'){
		titleTop = "";
		title    = "사이버독도지점";
		titleImg = "/img/common/txt/ebz_top_dokdo2.gif";

		top_header += "<div class=\"gnb\">";
		top_header += "<h1 class=\"logo\"><a href=\"javascript:goSubMain('cdd');\" title=\""+title+"\">"+title+" 로고</a></h1>";
		top_header += "<h2 class=\"titleTop\"><a href=\"javascript:goSubMain('cdd');\" title=\""+title+"\"><img src=\""+titleImg+"\" alt=\""+title+"\"></a></h2>";

		sumMainMenu += "<li class=\"dokdo\">  <a href=\"javascript:goSubMain('cdd_main');\"     title=\""+title+"\">"+title+"</a></li>";
		sumMainMenu += "<li class=\"private\"><a href=\"javascript:goSubMain('cdd_pib');\" title=\"개인뱅킹\">개인뱅킹</a></li>    ";
		sumMainMenu += "<li class=\"mall\">   <a href=\"javascript:goSubMain('cdd_cib');\" title=\"기업뱅킹\">기업뱅킹</a></li>    ";
		sumMainMenu += "<li class=\"mall\">   <a href=\"javascript:goSubMain('cdd_fpm');\" title=\"금융상품몰\">금융상품몰</a></li>  ";
		sumMainMenu += "<li class=\"dgb_home\"><a href=\"javascript:goSubMain('dgb');\"    title=\"아이엠뱅크 홈페이지\"><img src=\"/img/common/mark/ebz_dgb_logo_mark.png\" alt=\"아이엠뱅크\"></a></li>";
		sumMainMenu += "</ul>";
	}else if (sub == 'cgj'){
		titleTop = "";
		title    = "사이버경주지점";
		titleImg = "/img/common/txt/ebz_top_gyeongju2.gif";

		top_header += "<div class=\"gnb\">";
		top_header += "<h1 class=\"logo\"><a href=\"javascript:goSubMain('cgj');\" title=\""+title+"\">"+title+" 로고</a></h1>";
		top_header += "<h2 class=\"titleTop\"><a href=\"javascript:goSubMain('cgj');\" title=\""+title+"\"><img src=\""+titleImg+"\" alt=\""+title+"\"></a></h2>";

		sumMainMenu += "<li class=\"dokdo\">  <a href=\"javascript:goSubMain('cgj_main');\"     title=\""+title+"\">"+title+"</a></li>";
		sumMainMenu += "<li class=\"private\"><a href=\"javascript:goSubMain('cgj_pib');\" title=\"개인뱅킹\">개인뱅킹</a></li>    ";
		sumMainMenu += "<li class=\"mall\">   <a href=\"javascript:goSubMain('cgj_cib');\" title=\"기업뱅킹\">기업뱅킹</a></li>    ";
		sumMainMenu += "<li class=\"mall\">   <a href=\"javascript:goSubMain('cgj_fpm');\" title=\"금융상품몰\">금융상품몰</a></li>  ";
		sumMainMenu += "<li class=\"dgb_home\"><a href=\"javascript:goSubMain('dgb');\"    title=\"아이엠뱅크 홈페이지\"><img src=\"/img/common/mark/ebz_dgb_logo_mark.png\" alt=\"아이엠뱅크\"></a></li>";
		sumMainMenu += "</ul>";
	}else if (sub == 'chs'){
		titleTop = "";
		title    = "사이버한수원지점";
		titleImg = "/img/common/txt/ebz_top_khn2.gif";

		top_header += "<div class=\"gnb\">";
		top_header += "<h1 class=\"logo\"><a href=\"javascript:goSubMain('chs');\" title=\""+title+"\">"+title+" 로고</a></h1>";
		top_header += "<h2 class=\"titleTop\"><a href=\"javascript:goSubMain('chs');\" title=\""+title+"\"><img src=\""+titleImg+"\" alt=\""+title+"\"></a></h2>";

		sumMainMenu += "<li class=\"dokdo\">  <a href=\"javascript:goSubMain('chs_main');\"     title=\""+title+"\">"+title+"</a></li>";
		sumMainMenu += "<li class=\"private\"><a href=\"javascript:goSubMain('chs_pib');\" title=\"개인뱅킹\">개인뱅킹</a></li>    ";
		sumMainMenu += "<li class=\"mall\">   <a href=\"javascript:goSubMain('chs_cib');\" title=\"기업뱅킹\">기업뱅킹</a></li>    ";
		sumMainMenu += "<li class=\"mall\">   <a href=\"javascript:goSubMain('chs_fpm');\" title=\"금융상품몰\">금융상품몰</a></li>  ";
		sumMainMenu += "<li class=\"dgb_home\"><a href=\"javascript:goSubMain('dgb');\"    title=\"아이엠뱅크 홈페이지\"><img src=\"/img/common/mark/ebz_dgb_logo_mark.png\" alt=\"아이엠뱅크\"></a></li>";
		sumMainMenu += "</ul>";
	}else if (sub == 'cct'){
		titleTop = "";
		title    = "사이버혁신도시지점";
		titleImg = "/img/common/txt/ebz_top_reno2.gif";

		top_header += "<div class=\"gnb\">";
		top_header += "<h1 class=\"logo\"><a href=\"javascript:goSubMain('cct');\" title=\""+title+"\">"+title+" 로고</a></h1>";
		top_header += "<h2 class=\"titleTop\"><a href=\"javascript:goSubMain('cct');\" title=\""+title+"\"><img src=\""+titleImg+"\" alt=\""+title+"\"></a></h2>";

		sumMainMenu += "<li class=\"dokdo\">  <a href=\"javascript:goSubMain('cct_main');\"     title=\""+title+"\">"+title+"</a></li>";
		sumMainMenu += "<li class=\"private\"><a href=\"javascript:goSubMain('cct_pib');\" title=\"개인뱅킹\">개인뱅킹</a></li>    ";
		sumMainMenu += "<li class=\"mall\">   <a href=\"javascript:goSubMain('cct_cib');\" title=\"기업뱅킹\">기업뱅킹</a></li>    ";
		sumMainMenu += "<li class=\"mall\">   <a href=\"javascript:goSubMain('cct_fpm');\" title=\"금융상품몰\">금융상품몰</a></li>  ";
		sumMainMenu += "<li class=\"dgb_home\"><a href=\"javascript:goSubMain('dgb');\"    title=\"아이엠뱅크 홈페이지\"><img src=\"/img/common/mark/ebz_dgb_logo_mark.png\" alt=\"아이엠뱅크\"></a></li>";
		sumMainMenu += "</ul>";
	}

	top_header += sumMainMenu;
	top_header += "</div>";

	top_header += snb;

	$("#header_div").append(top_header);

}

function drawHeader_lcc(val){
	_IS_RENEWAL_PAGE = false;
	var top_header = "";
	var titleImg = "";
	var snb		 = "<div class=\"dgb_snb lcc\">";
	top_header += "<div class=\"gnb\">";
	top_header += "<h1 class=\"logo\"><a href=\"javascript:goSubMain('dgb');\" title=\"아이엠뱅크\">아이엠뱅크</a></h1>";
	top_header += "<h2 class=\"titleTop\"><a href=\"javascript:goSubMain('lcc');\" title=\"지역사회공헌\"><img src=\"/img/common/txt/ebz_top_cul.gif\" alt=\"지역사회공헌\"></a></h2>";
	top_header += "<h2 class=\"top_home\"><a href=\"javascript:goSubMain('dgb');\" title=\"아이엠뱅크\"><img src=\"/img/common/txt/m_main_logo_home.png\" alt=\"아이엠뱅크\"></a></h2>";
	top_header += "</div>";

	top_header += snb;

	$("#header_div").append(top_header);

}

function dlo_header_layer(val){
	_IS_RENEWAL_PAGE = false;
	/*
		var headHTML = '';
		headHTML += '<div class="topWrap_dok">';
		headHTML += '	<div class="gnb">';
		headHTML += '		<h1 class="logoTop"><a href="/com_ebz_dlo_main.act" title="대구은행 독도사랑모임"><img src="/cms/site/dlo/img/main/dok_top_logo.gif" alt="대구은행 독도사랑모임"/></a></h1>';
		headHTML += '        <ul class="menu">';
		headHTML += '        	<li class="login"><a href="/p_mem_ebz_10110_1001.act" title="로그인">로그인</a></li>';
		headHTML += '            <li class="member_sign"><a href="/mem_ebz_11010_dlo.act" title="회원가입">회원가입</a></li>';
		headHTML += '        </ul>';
		headHTML += '        <a href="javascript:void(0);" title="전체메뉴보기" class="etcMenu" onClick="javascript:selectBox_BtList();">전체메뉴보기</a>';
		headHTML += '     </div>';
		headHTML += '</div>';
		$('#Header').html(headHTML);
		*/
	$.ajax({
		"url" : "/hmp/dlo/dlo/p_dlo_ebz_top_login_view.jsp",
		type : "post",
		dataType : "html",
		async: false,
		success: function(result) {
			$('#Header').html(result);
			$('#Header').append(val);
		}
	});
}

function  fnSearchResultGo(){

	dataCtrl.delObjData("SER_SSESSION_DATA");
	var jObj = {};
	jObj.qwd  = $("#srhInput").val();		// 검색어

	dataCtrl.setObjData('SER_SSESSION_DATA', JSON.stringify(jObj));

	var SCRIPT_REGEX=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
	var HTML_TAG =/[<][^>]*[>]/gi;
	var RRN_PATTERN=/^\d{2}[0-1]\d[0-3]\d-?[1-6]\d{6}$/;
	var NUM_PATTERN=/[0-9]/g;
	var NUM_RESULTS=jObj.qwd.match(NUM_PATTERN);

	if(SCRIPT_REGEX.test(jObj.qwd) == true){
		alert("잘못된 형식의 검색어입니다. 다시 입력해주세요.");
		return false;
	}

	if(HTML_TAG.test(jObj.qwd) == true){
		alert("잘못된 형식의 검색어입니다. 다시 입력해주세요.");
		return false;
	}

	if(RRN_PATTERN.test(jObj.qwd) == true){
		alert("잘못된 형식의 검색어입니다. 다시 입력해주세요.");
		return false;
	}

	if(NUM_RESULTS != null && NUM_RESULTS.length >= 10){
		alert("10자리 이상 숫자는 검색 하실 수 없습니다.");
		return false;
	}

	location.href = 'com_ebz_ser_main.act';
}

function onKeyPressCom() {
	var ieKey = window.event.keyCode;
	if (ieKey == 13) {
		$("#topSrchBtn").focus();
		fnSearchResultGo();
	}
}

function updateIFrame( height ){
	$("#ifr_cms").attr('height',height);
	iframeReSize();
}

function loginCheck(){
	try{
		var bzman_nm = getBzmanNm();

		if(bzman_nm != ""){
			var jexAjax = jex.createAjaxUtil("com_ebz_user_info");

			jexAjax.execute(function(dat) {
				if($.trim(bzman_nm) != $.trim(jex.null2Void(dat.BZMAN_NM)) && $.trim(bzman_nm) != $.trim(jex.null2Void(dat.CUST_NM))) {
					var jexAjax1 = jex.createAjaxUtil("com_ebz_logout");

					jexAjax.execute(function(dat1){
						startLogOut();
					});
				}
			});
		}
	}catch(e){
	}
}

function getBzmanNm(){
	var bzman_nm = "";

	try{
		try{ bzman_nm = $("#bzman_nm").text(); }catch(e){}

		if(bzman_nm == ""){
			try{ bzman_nm = $(".member_box > label").text(); }catch(e){}
		}

		return bzman_nm;
	}catch(e){
		return bzman_nm;
	}
}


function srchMnuLink()
{
	var jexAjax = jex.createAjaxUtil("com_ebz_hmpg_mnusrch_t001");

	jexAjax.set("MNU_NM"       , "윤리");

	jexAjax.addOption("loading", true);

	jexAjax.execute(function(dat){
		if(jex.isError(dat)){
			jex.printError(dat.COMMON_HEAD.CODE, dat.COMMON_HEAD.MESSAGE);	//오류메시지만 출력
		} else {
			if (dat.REC1 != null ) {
				alert(JSON.stringify(dat.REC1));
			}
		}
	});
}

function getDataSUSU() {
	var jexAjax     = jex.createAjaxUtil("hmp_ebz_10010_0090_t001");

	jexAjax.addOption("loading", true);

	/* Async false */
	jexAjax.setAsync(false);

	jexAjax.execute(function(dat) {

		if (dat.REC1.length == 0 && dat.REC2.length == 0) {
			alert("No Data");
		}else {
			if( dat.REC1.length > 0) {
				alert("REC1"+"\n"+JSON.stringify(dat.REC1));
			}
			if( dat.REC2.length > 0) {
				alert("REC2"+"\n"+JSON.stringify(dat.REC2));
			}
		}
	});
}

function getDataJASAN() {
	var jexAjax     = jex.createAjaxUtil("hmp_ebz_10010_0990_t001");

//	jexAjax.set("CSNO"		, "165281427");	// 고객번호
//	jexAjax.set("CUST_SEQ"	, "1001");		// 고객일련번호
	jexAjax.set("DLNG_DVCD" , "99");		// 구분코드 99 전항목 01 요구불 02 저축성 03 신탁 04 펀드 05 외화

	jexAjax.addOption("loading", true);

	/* Async false */
	jexAjax.setAsync(false);

	jexAjax.execute(function(dat) {

		if (dat.REC1.length == 0) {
			alert("No Data");
		}else {
			alert("REC1"+"\n"+JSON.stringify(dat.REC1));
		}
	});
}