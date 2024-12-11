var topMenu_H 	= "";

var topMenu 	= "";
var topMenuSub = "";
var topMenuDepth2 	= "";
var topMenuDepth3 	= "";
var leftMenu 	= [];
var timeout     	= 3000;
var closetimer		= 1;
var ddmenuitem 		= 0;
var ddmenuitemTop	= 0;	
var addCls = "";
var tapmenuid = "";

var iCnt = 0; 
var mtabposition = 0;
var stabposition = 0;
var etabposition = 0;

var totMenu = "";

var dgiHtml = "";
$(function() {
	if(menu.length < 1) {
		return;
	}
	if (menu[0].id.substr(0,3) == "dgi")
	{
		addCls = " dgb_intro";
	}else if (menu[0].id.substr(0,3) == "fnm")
	{
		addCls = " f_mall";
	}else if (menu[0].id.substr(0,3) == "fsv")
	{
		addCls = " f_service";
	}else if (menu[0].id.substr(0,3) == "hlp")
	{
		addCls = " c_center";
	}else{
		addCls = "";
	}

	topMenu_H = '<div class="snb_dv'+addCls+'">';
	if( !_IS_RENEWAL_PAGE )
	{
		topMenu_H += "<p class=\"report\"><a href=\"javascript:showSiteMap();\" title=\"�꾩껜硫붾돱\" id=\"all_mnu_view\"><span>�꾩껜硫붾돱</span></a></p>";
	}
	topMenu_H += '<ul class="sub menu_depth1" id="topMenuId">';

	topMenuDepth2 = '';
	topMenuDepth3 = '';
	topMenuSub = "";
	
	$.each(menu, function(i,v) {	
		if(null != v.view && v.view == "true") {
		    topMenu = topMenu + "<li id='"+v.id+"' class='slide_menu' data-onepage='"+v.onepage+"' data-url='"+v.url+"' data-type='"+v.type+"' data-sec='"+v.loginKeepHrSec+"'><a title="+v.name+" href='javascript:void(0);'>"+v.name+"<span class='right_bg'></span></a>";
			tapmenuid = v.id;
	
			var topSub = drawDepth2(v);
			//drawSubTop(v);
			topMenu += topSub; 
			topMenu = topMenu + "</li>";

			iCnt++;

		}
	});
	
	topMenu = topMenu + "</ul></div>";	
	
	var $topMenuObj = $(".dgb_snb");
	
	$topMenuObj.append(topMenu_H + topMenu);
	


	$topMenuObj.before(totMenu);
	



	$('.langs ul').hide();
	$('.langs ul li').css('background','url("")');
	$('.langs').hover(
		function(){
			$('.langs ul').show();
		},
		function(){
			$('.langs ul').hide();
		}
	);
	$('.langs ul li').css('background-image','url("")');

	$('.slide_menu').live("mouseover focus", function(e){
		fcsClick = "init";
		var ind = $('.slide_menu').index(this);
		
		$('.slide_menu').removeClass('on');
		$(this).addClass("on");
		
		var ver = ieVersionCheck();
		$('.subMenu').hide();
		$('.slideMenu_depth_3').hide();
		$(this).find('.subMenu').show();

	});


	$('.dgb_snb').live("mouseleave", function(){
		$('.slide_menu').removeClass('on');
		$('.slideMenu_depth_2 li').removeClass('on');
		$(".slideMenu_depth_3 > li > ul").hide();
		
		var ver = ieVersionCheck();

		$('.subMenu').hide();

	});

	$('.slideMenu_depth_3 li ul').hide();
	$('.slideMenu_depth_3 li ul.on').show();

	$('.slideMenu_depth_2 li').live("mouseover focus", function(e){
		var indd = $('.subMenu li').index(this);
		$('.slideMenu_depth_2 li').removeClass('on');
		$(this).addClass('on');
		/*$('.slideMenu_depth_3').hide();// �뱀젒洹쇱꽦 �섏젙
		$(this).find('.slideMenu_depth_3').show();*/
	});


	/*$('#topMenuId li').bind('click', function (e){
		if(!$(this).hasClass("report")){
			
			mainMenuOpen();
		}
	});	*/
	
	$('#topMenuId > li').bind('click', mainMenuOpen);	
	$('.slideMenu_depth_2 li').bind('click', mainSubMenuOpen);	
	$('.slideMenu_depth_3 > li > ul > li').bind('click', mainSubMenuOpen);

	$('.report').live("mouseover focus", function(e){
		
		$('.slide_menu').removeClass('on');
		$('.slideMenu_depth_2 li').removeClass('on');
		$(".slideMenu_depth_3 > li > ul").hide();
		$('.subMenu').hide();
	});


	$('#sub_main_Cont').live("focus", function(e){

		$('.slide_menu').removeClass('on');
		$('.slideMenu_depth_2 li').removeClass('on');
		$(".slideMenu_depth_3 > li > ul").hide();
		$('.subMenu').hide();
	});

});
function ieVersionCheck(){
	var word;
	var version = "N/A";

	var agent = navigator.userAgent.toLowerCase();
	var name  = navigator.appName;

	if (name == "Microsoft Internet Explorer"){
		word = "msie ";
	}else{
		if (agent.search("trident")>-1) word = "trident/.*rv:"; // ie 11
		else if (agent.search("edge/")>-1) word = "edge/"; // edge
	}
	var reg = new RegExp(word+"([0-9]{1,})(\\.{0,}[0-9]{0,1})");
	if (reg.exec(agent) != null) version = RegExp.$1 + RegExp.$2;
	
	if (version == '10.0' && agent.search("trident")>-1)
	{
		version = '10.w';
	}

	return version;
	
}


function drawDepth2(v){
	
	var html = "";
	topMenuSub = "";
	if(v.sub.length > 0){
		topMenuSub = topMenuSub + '<div class="subMenu"><ul class="slideMenu_depth_2">';
		var i = 0;
		$.each(v.sub , function( sui , suv ){
		    // 20201021 �덉갹�닿린湲곕뒫�� �꾪빐 type �뺣낫 異붽�
		    if (jex.null2Void(suv.type) != "" )
		    {
                topMenuDepth2 = topMenuDepth2 + "<li id='"+suv.id+"' data-type='" + suv.type+ "'  data-url='" + suv.url+ "'><a href='javascript:void(0);'>"+suv.name+"</a>";
		    }
		    else
	        {
		        topMenuDepth2 = topMenuDepth2 + "<li id='"+suv.id+"'><a href='javascript:void(0);'>"+suv.name+"</a>";
	        }

			if (v.type == "winup")
			{
				
			}else{
				if(suv.sub){
					drawDepth3(suv, suv.id);
					topMenuDepth2 += topMenuDepth3;
				}/*else{
					topMenuDepth3 = topMenuDepth3 + "<ul></ul>"
				}*/
			}
			topMenuDepth2 = topMenuDepth2 + "</li>";
			i++;
			etabposition++;
		});
		
		topMenuSub += topMenuDepth2 + "</ul>";

		
		topMenuSub += drawTopEtc(tapmenuid);
		topMenuSub += drawFavorLayer();
		topMenuSub += "</div>";
		topMenuDepth2 = "";
		topMenuDepth3 = "";
	}
	etabposition = 0;

	html = topMenuSub;
	return html;
}

function drawDepth3(v, parent_id){
	topMenuDepth3 = '<div class="slideMenu_depth_3">'; 
	if(v != null && v.sub.length > 0){
		topMenuDepth3 = topMenuDepth3 + '<ul>';
		var i = 0;
		$.each(v.sub , function( sui , suv ){
			if (suv.type == "winup")
			{
				if (suv.id == "fnm_fnc_sub6_3" || suv.id == "hlp_hab_sub6_4" || suv.id == "hlp_hab_sub6_6" || suv.id == "hlp_hab_sub6_7" || suv.id =="fsv_fna_sub7_9"){
					topMenuDepth3 = topMenuDepth3 + "<li id='"+suv.id+"' data-url='"+suv.url+"' data-lg_accs_yn='undefined' data-cft_login_yn='undefined' data-hmp_login_yn='undefined' data-sec='undefined' data-depth='4' >"
					+ "<a href='javascript:f_windowOpenFunc(\""+suv.url+"\");' title=\"�덉갹�쇰줈 �닿린\">"+suv.name+"</a>";
					topMenuDepth3 = topMenuDepth3 + "</li>";
				}else{
					topMenuDepth3 = topMenuDepth3 + "<li id='"+suv.id+"' data-url='"+suv.url+"' data-lg_accs_yn='undefined' data-cft_login_yn='undefined' data-hmp_login_yn='undefined' data-sec='undefined' data-depth='4' >"
					+ "<a href='javascript:windowCalFunc(\""+suv.id+"\");' title=\"�덉갹�쇰줈 �닿린\">"+suv.name+"</a>";
					topMenuDepth3 = topMenuDepth3 + "</li>";
				}
			}else if (suv.type == "main_move")
			{
				topMenuDepth3 = topMenuDepth3 + "<li id='"+suv.id+"' data-type='"+suv.type+"' data-url='"+suv.url+"' data-lg_accs_yn='undefined' data-cft_login_yn='undefined' data-hmp_login_yn='undefined' data-sec='undefined' data-depth='4' >"
				+ "<a href='javascript:goSubMain(\'fpm\')'>"+suv.name+"</a>";
				topMenuDepth3 = topMenuDepth3 + "</li>";
				
			}else{
				topMenuDepth3 = topMenuDepth3 + "<li id='"+suv.id+"' data-url='"+suv.url+"' data-lg_accs_yn='undefined' data-cft_login_yn='undefined' data-hmp_login_yn='undefined' data-sec='undefined' data-depth='4' >"
				+ "<a href='javascript:link4DepthMenuPage(\""+suv.id+"\", \""+parent_id+"\",\"0\", \""+mainPage + ".act\");'>"+suv.name+"</a>";
				topMenuDepth3 = topMenuDepth3 + "</li>";
			}
			i++;
		});
		
		topMenuDepth3 = topMenuDepth3 + "</ul></div>";
	}
}

function depth3Click(obj, parent_id) {
	var id    = $(obj).attr('id');
	var depth = $(obj).attr('data-depth');
	var loginKeepHrSec = $(obj).attr('data-sec')=="undefined" ? 600:$(obj).attr('data-sec');
	var num   = id.substring(id.lastIndexOf('_')+1);

	linkMenuPage(id, parent_id,'0', "/" + mainPage + ".act");
	
	//goDepth3Page($(obj).attr('data-url'), $(obj).attr('data-lg_accs_yn'), $(obj).attr('data-cft_login_yn'), $(obj).attr('data-hmp_login_yn'), id, num, depth, loginKeepHrSec, parent_id);	
}

function drawTopEtc(val){
	var html = "";
	var html_sub = "";
	if (val == 'fnm_fnc' ){
		// html_sub = MenuDatForCard(); // 20231010. IM諭낇겕 �꾨왂遺� �붿껌 - 愿�由ы룷�명듃 �대젮���쇰줈 �명빐 �쒓굅 �붿껌
		html = "<ul class=\"slideMenu_card\" id=\"slideMenu_card\"></ul>";		
	}else if( val == 'fnm_fnl'){
		//20231222 異붿쿇�곹뭹�뺣낫 �몄텧�쒖쇅
		//html_sub = MenuDatForLoan();
		html = "<ul class=\"slideMenu_card\" id=\"slideMenu_loan\"></ul>";
	}else if( val == 'fnm_fnp'){
		//20231222 異붿쿇�곹뭹�뺣낫 �몄텧�쒖쇅
		//html_sub = MenuDatForDeposit();
		html = "<ul class=\"slideMenu_card\" id=\"slideMenu_deposit\"></ul>";
	}else if( val == 'fnm_fnf' || val == 'fnm_rap'){
		var slideId = "slideMenu_fund";
		if(val == 'fnm_rap')
	    {
		    slideId = "slideMenu_rap";
	    }
		//20210722 異붿쿇�곹뭹�뺣낫 �몄텧�쒖쇅 
		//html_sub = MenuDatForFund(slideId);
		html = "<ul class=\"slideMenu_card\" id=\""+slideId+"\"></ul>";
	}else if( val == 'fnm_fne'){
		//20231222 異붿쿇�곹뭹�뺣낫 �몄텧�쒖쇅
		//html_sub = MenuDatForFne();
		html = "<ul class=\"slideMenu_card\" id=\"slideMenu_fne\"></ul>";
	}else if( val == 'fnm_fnr'){
		//20231222 異붿쿇�곹뭹�뺣낫 �몄텧�쒖쇅
		//html_sub = MenuDatForFnr();
		html = "<ul class=\"slideMenu_card\" id=\"slideMenu_fnr\"></ul>";
	}else if( val == 'fnm_fni'){
 		//20230504 蹂댄뿕/怨듭젣 異붿쿇�곹뭹�뺣낫 �몄텧�쒖쇅        	
        //html_sub = MenuDatForFni();
		html = "<ul class=\"slideMenu_card\" id=\"slideMenu_fni\"></ul>";
	}else if( val == 'fnm_fns'){
		//20231222 異붿쿇�곹뭹�뺣낫 �몄텧�쒖쇅
		//html_sub = MenuDatForFns();
		html = "<ul class=\"slideMenu_card\" id=\"slideMenu_fns\"></ul>";
	}else if( val == 'fnm_rps'){    // �댁쭅�곌툑
		html = "<ul class=\"slideMenu_card\" id=\"slideMenu_rps\"></ul>";
	}else{
		
		if (val == 'fsv_fna' || val == 'fsv_fnp' || val == 'fsv_fnr' || val == 'fsv_fnz' || val == 'fsv_fnc' || val == 'fsv_fnb' || val == 'fsv_fnh' || val == 'fsv_fnt' || val == 'fsv_fnu')
		{
			html_sub = MenuDatForFsv(val.substr(4));
			html = "<ul class=\"slideMenu_card\" id=\"slideMenu_"+val.substr(4)+"\"></ul>";
		}else if (val == 'hlp_hsd' || val == 'hlp_hms' || val == 'hlp_hab' || val ==  'hlp_hsg' || val ==  'hlp_hss' || val ==  'hlp_hls' || val ==  'hlp_hhy' || val ==  'hlp_hns')
		{
			html_sub = MenuDatForHlp(val.substr(4));
			html = "<ul class=\"slideMenu_card\" id=\"slideMenu_"+val.substr(4)+"\"></ul>";
		}else if (val == 'dgi_abt' || val == 'dgi_dgb' || val == 'dgi_pub' || val == 'dgi_inf' || val == 'dgi_fium' || val == 'dgi_bus' || val == 'dgi_fac' || val == 'dgi_sto')
		{
			html_sub = MenuDatForDgi(val.substr(4));
			html = "<ul class=\"slideMenu_card\" id=\"slideMenu_"+val.substr(4)+"\"></ul>";
		}else{
			html = "<ul class=\"slideMenu_card\">"
		//+"	<li><img src=\"/img/common/card/slide_menu_card.gif\" alt=\"DGB�쇳븨移대뱶 �대�吏�\"></li>"
		//+"	<li><p class=\"new_title_up\">�쇳븨�좎씤�� �� �μ쓽 移대뱶濡� ��!</p></li>"
		//+"	<li><p class=\"new_title_middle\">DGB�쇳븨移대뱶<p></li>"
		//+"	<li><p class=\"new_title_down\">援�궡�먯꽌 �댁쇅源뚯� �⑤씪�몄뿉��<br/>�ㅽ봽�쇱씤源뚯�~</p></li>"
		//+"	<li><p class=\"new_title_btn\"><a href=\"#\" class=\"btn_type31 point\"><span>�좎껌�섍린</span></a><a href=\"#\" class=\"btn_type31\"><span>�댁슜蹂닿린</span></a></p></li>"
		+"</ul>";
		}
	}
	return html;
}
function getFavorMenu() {
	var jexAjax = jex.createAjaxUtil("com_ebz_favor_menu_t001");

	/* 議고쉶議곌굔 �ㅼ젙 */
	/*jexAjax.set("MILE_SV_PSBLYN" , "Y");*/
	
	jexAjax.addOption("loading", true);
	jexAjax.set("HDR_TRA_FLAG" , "L");
	//�꾩떆ID
	//�꾩떆ID
	var obj = new Object();
	obj = getLoginSessionInfo();
	upspid = obj.USPS_ID;
	if(upspid ==  null || upspid == "") {
		upspid = "DGBUSR001";
	}
	jexAjax.set("USPS_ID" , upspid);
	
	/* �좏깮�� �좎슜移대뱶 �쒗깮�� INREC 諛곗뿴媛앹껜濡� �낅젰 */
	var tempList = new Array();
	$.each( $("#dataBody").find(":checkbox:checked"), function(i, v) {
		var obj = new Object();
		obj.SCRN_PRGRM_NM = v.value;
		tempList[tempList.length] = obj;
	});

	jexAjax.set("REC1" , tempList);
	//var obj = new Object();	
	//obj = getLoginSessionInfo();
	
	jexAjax.execute(function(dat) {
        if(dat != null && dat != "") {
        	favorData = JSON.parse(dat.FAVORITE_MENU);   
            var showHtml = drawTopFavorMenu(); 
            $(".new_dgb_icon_menu_list").each(function(i) {
            	$(".new_dgb_icon_menu_list").eq(i).html(showHtml);
            });
        }
	});
}

function drawFavorLayer() {	
	var html = ""
	+"<ul class=\"slideMenu_icon\">"
	+"	<li><p class=\"new_slide_icon_title\"><span>�먯＜�곕뒗 硫붾돱</span><a href=\"javascript:openFavorMenuPop();\" title=\"�덉갹�쇰줈 �닿린\"><img src=\"/img/common/btn/ebz_btn_setting2.gif\" alt=\"�ㅼ젙\"></a></p></li>"
	+"<li>"
	+"<ul class=\"new_dgb_icon_menu_list\" id=\"favorLayer\">";
	html += drawTopFavorMenu();
	html +="</ul>";
	html +="</li>";
	html +="</ul>";
	return html;
}
function drawTopFavorMenu() {
	var html = "";
	if(favorData.length > 0) {
		html += "	<li class=\"slideMenu_icon_line\">";
		for(var i=0; i < favorData.length; i++) {
			var favorLink = findFavorLink(favorData[i]["SCRN_PRGRM_NM"]);
			var favorName = findFavorName(favorData[i]["SCRN_PRGRM_NM"]);
			var favorImg = "";
			var favorNum = "";
			var tempNum = favorData[i]["SCRN_PRGRM_NM"].split("_");			
			favorNum = (tempNum[1]*1);	
			if (favorData.length == i+1)
			{
				if(favorNum==14) {
					html += "		<a href=\"javascript:#none\" title=\"�덉갹�쇰줈 �닿린\" onclick=\""+favorLink+"return false;\"><p class=\"new_slide_icon1\"><img src=\"/img/common/btn/slide_menu_ico_"+favorNum+".png\" alt=\""+favorName+"\"><span>"+favorName+"</span></p></a>";
				} else {
					html += "		<a href=\"javascript:"+favorLink+"\"><p class=\"new_slide_icon1\"><img src=\"/img/common/btn/slide_menu_ico_"+favorNum+".png\" alt=\""+favorName+"\"><span>"+favorName+"</span></p></a>";				
				}

			}else{

				if(favorNum==14) {
					html += "		<a href=\"javascript:#none\" title=\"�덉갹�쇰줈 �닿린\" onclick=\""+favorLink+"return false;\"><p class=\"new_slide_icon1\"><img src=\"/img/common/btn/slide_menu_ico_"+favorNum+".png\" alt=\""+favorName+"\"><span>"+favorName+"</span></p></a>";
				} else {
					html += "		<a href=\"javascript:"+favorLink+"\"><p class=\"new_slide_icon1\"><img src=\"/img/common/btn/slide_menu_ico_"+favorNum+".png\" alt=\""+favorName+"\"><span>"+favorName+"</span></p></a>";				
				}
			}
			if(i==1 || i==3) {
				html += "</li>";
				html += "	<li class=\"slideMenu_icon_line\">";
			}
		}
		html +="	</li>";
		
	} else {
		html += "	<li class=\"slideMenu_icon_line\">"
			+"		<a href=\"javascript:bankingLinkMenuPage('4', 'X010101', 'A010101', 'A020101', 'inq', 'com_ebz_pib_main', 'com_ebz_cib_main')\"><p class=\"new_slide_icon1\"><img src=\"/img/common/btn/slide_menu_ico_1.png\" alt=\"怨꾩쥖議고쉶\"><span>怨꾩쥖議고쉶</span></p></a>"
			+"		<a href=\"javascript:bankingLinkMenuPage('4', 'X020101', 'A010201', 'A020201', 'rem', 'com_ebz_pib_main', 'com_ebz_cib_main');\"><p class=\"new_slide_icon2\"><img src=\"/img/common/btn/slide_menu_ico_3.png\" alt=\"利됱떆�댁껜\"><span>利됱떆�댁껜</span></p></a>"
			+"	</li>"
			+"	<li class=\"slideMenu_icon_line\">"
			//+"		<a href=\"javascript:linkMenuPage('fnm_fnp_sub1_1', 'fnm_fnp_sub1', '0', 'com_ebz_fpm_main.act');\"><p class=\"new_slide_icon1\"><img src=\"/img/common/btn/slide_menu_ico_5.png\" alt=\"�덇툑 �명꽣�� �좉퇋\"><span>�덇툑 �명꽣�� �좉퇋</span></p></a>" //�덉쟻湲� �좉퇋濡� 硫붾돱 蹂�寃�
			+"		<a href=\"javascript:goSubMain('fpm');\"><p class=\"new_slide_icon1\"><img src=\"/img/common/btn/slide_menu_ico_5.png\" alt=\"�덇툑 �명꽣�� �좉퇋\"><span>�덉쟻湲� �좉퇋</span></p></a>"
			+"		<a href=\"javascript:linkMenuPage('fnm_fnl_sub1_3', 'fnm_fnl_sub1', '0', 'com_ebz_fpm_main.act');\"><p class=\"new_slide_icon2\"><img src=\"/img/common/btn/slide_menu_ico_7.png\" alt=\"��異� �명꽣�� �좉퇋\"><span>��異� �명꽣�� �좉퇋</span></p></a>"
			+"	</li>"
			+"	<li class=\"slideMenu_icon_line\">"
			+"		<a href=\"javascript:bankingLinkMenuPage('4', 'X030101', 'A010301', 'A020301', 'gro', 'com_ebz_pib_main', 'com_ebz_cib_main');\"><p class=\"new_slide_icon1\"><img src=\"/img/common/btn/slide_menu_ico_19.png\" alt=\"怨듦낵湲덈궔遺�\"><span>怨듦낵湲덈궔遺�</span></p></a>"
			+"		<a href=\"#none\" title=\"�덉갹�쇰줈 �닿린\" onclick=\"javascript:window.open('https://banking.dgb.co.kr/fst_ebz_20010_1010.act','', 'width=763, height=600, toolbar=no, scrollbars=yes, resizable=no');return false;\"><p class=\"new_slide_icon2\"><img src=\"/img/common/btn/slide_menu_ico_14.png\" alt=\"�덉쟾怨꾩쥖議고쉶\"><span>�덉쟾怨꾩쥖議고쉶</span></p></a>"
			+"	</li>";
			
	}
		
	

	return html;
}
function openFavorMenuPop() {
	
	var obj = new Object();
	obj = getLoginSessionInfo();
	if(obj.USPS_ID == null || obj.USPS_ID == "") {
		alert("濡쒓렇�� �댄썑�� �쒕퉬�ㅺ� 媛��ν빀�덈떎.");
		loginPage();
	} else {
		window.open("com_ebz_favor_menu.act","favorMenuPopup","width=448,height=700,scrollbars=yes");
	}
	
	//open_popup('form1', {sizeW : '826' ,sizeH : '588' ,target:'fnp_ebz_10210_depo', action:'fnp_ebz_10210_depo.act'});	
}

function drawSubTop(v){
	if(v.sub.length > 0){
		topMenu = topMenu + '<ul class="sub" style="display:none;">';
		
		$.each(v.sub , function( sui , suv ){
			topMenu = topMenu + "<li id='"+suv.id+"'><a href='javascript:void(0);'>"+suv.name+"</a>";
			topMenu = topMenu + "</li>";		
		});
		
		topMenu = topMenu + "</ul>";
	}
}

function topmenu_open(){	
	topmenu_canceltimer();
	topmenu_close();
	ddmenuitemTop = $(this).find('a').addClass('over');
	ddmenuitem = $(this).find('ul').eq(0).css('visibility', 'visible');
	languageOpen();
}

function topmenu_close(){	
	if(ddmenuitemTop) ddmenuitemTop.removeClass('over');
	if(ddmenuitem) ddmenuitem.css('visibility', 'hidden');
}

function topmenu_timer(){	
	closetimer = window.setTimeout("topmenu_close()", timeout);
}

function topmenu_canceltimer(){	
	if(closetimer){	
		window.clearTimeout(closetimer);
		closetimer = null;
	}
}

var flag 		= 0;	
var clickFlag 	= true;
var fcsClick   	= '';
var _depth2Tit 	= '';

function mainMenuOpen(){

	if(!$(this).hasClass("report")){
		
		
		_depth2Tit = $('> a', $(this)).text();
		
		if (!$(this).parent().is('#topMenuId')) {
			_depth2Tit = $(this).parent().parent().find(' > a').text();
		}	
		
		try{
		    if(isMobileAgentChk() && fcsClick != ""){
				
	    		if($(this).attr("id").indexOf("sub") == -1 && fcsClick != _depth2Tit){
					
			    	fcsClick = _depth2Tit;
			    	return;
				}
	    	}else{
	    	}
		}catch(e){
		}
		
		/*if ("fsv_fnr"==($(this).attr("id"))){
			location.href = "https://www.dgb.co.kr/com_ebz_fsv_hap_main.jsp";
		}else{*/
			
			if(clickFlag) {
				var url = $(this).attr("data-url");		
				var onepage = $(this).attr("data-onepage");
				

			    // 20210209 �덉갹�ㅽ뵂 異붽�
			    if ($(this).attr("data-type") == "winup")
			    {
			        f_windowOpenFunc(url);
			        return;
			    }
			    
				if (onepage != null && ("undefined" != onepage) && (onepage.length > 1)) {
					// �댁쭅�곌툑(S)
					if (onepage == 'rps') {
						var objLk = {'HP_BK':'BK', 'LOCATION_PAGE':'com_ebz_rps_sub_main'};
						dataCtrl.setObjData("BK_LINK", jex.toStr(objLk));	
						
						location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");						
					}
					// 20210722 ���쒕찓�댁씪寃쎌슦 - �대┃�� 媛��낆젅李⑥븞�댄솕硫� 湲곕낯
					else if ($(this).attr("id")  == 'fnm_fnf') {
					    link4DepthMenuPage("fnm_fnf_sub3_2", "fnm_fnf_sub3","0", "com_ebz_fpm_main.act");
					    
                    } else {
						location.href = "https://www.dgb.co.kr/"+url;
					}
					// �댁쭅�곌툑(E)
				} 
				else
				{
					clickFlag = false;
					var linkValue = $(".top_slide_menu01_content > div > div").eq($(this).index()).find("ul > li").eq(0).attr("id");
					var clid = $(this).attr("id");
					linkValue = $("#"+clid+">div>ul>li").eq(0).attr("id");
					var obj = {'MENU_LOCATION':linkValue,'MENU_DEPTH':'2' };
					dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));
					location.href = mainPage+".act";
				}
				
			}	
		//}
	}
}

function mainSubMenuOpen(){
	clickFlag = false;

	var linkValue = $(this).attr("id");

	if ($(this).attr("data-type") == "main_move"){
		location.href = $(this).attr("data-url");
		return;
	}
	// 20201021 �덉갹�ㅽ뵂 異붽�
	else if ($(this).attr("data-type") == "winup")
    {
        window.open($(this).attr("data-url"));
        return;
    }
	
	if (linkValue == "fnm_fnl_sub3_3" || linkValue == "fnm_fnc_sub6_3" || linkValue == "hlp_hab_sub6_4")
	{
		location.reload();
	}else{
		var obj = {'MENU_LOCATION':linkValue,'MENU_DEPTH':'2' };
		dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));

		location.href = mainPage+".act";
	}
}

function goDepth3Page(url, lg_accs_yn, cft_login_yn, hmp_login_yn, id, num2, depth, loginKeepHrSec, parent_id){
	//濡쒓렇�몄뿬遺�		 : lg_accs_yn
	//�몄쬆�쒕줈洹몄씤�щ� 	 : cft_login_yn
	//�덊럹�댁�濡쒓렇�몄뿬遺� : hmp_login_yn

	
	linkMenuPage(id, parent_id,'0', "/" + mainPage + ".act");
 	
}

$(document).ready(function(){
	/*
	$('#topMenuId > li').bind('click', mainMenuOpen);	
	$('.slideMenu_depth2 li').bind('click', mainSubMenuOpen);	
	$('.slideMenu_depth3 > li > ul > li').bind('click', mainSubMenuOpen);	
	
	$("#topMenuId > li >a").bind("mouseover focus",function(){
		fcsClick = "init";

		// �곸쐞 over�대젅�ㅻ� 吏��대떎.
		$("#topMenuId>li").each(function(){
			$(this).find('> a').removeClass('over');
		});
		
		$(this).find('li').addClass('over');
		
		// �꾩껜 �쒕툕 硫붾돱瑜� 媛�由곕떎.
		$("#topMenuId ul").stop().css('display','none');
		
		// �대떦 �쒕툕硫붾돱留� �대젮�⑤떎.
		$(this).next().stop().css('display','block');
		$(this).find('> a').addClass('over');
		$(this).parent().find('> a').addClass('over');
	});	
	
	$("#topMenuId").mouseleave(function(){ //留덉슦�ㅺ� 踰쀬뼱�ъ쓣 ��
		$("#topMenuId>li").each(function(){
			$(this).find('> a').removeClass('over');
		});
		$("#topMenuId ul").stop().css('display','none');
	});	
	*/
});

function topMenuClear(){
	$("#topMenuId>li").each(function(){
		$(this).find('> a').removeClass('over');
	});
	
	$("#topMenuId ul").stop().css('display','none');	
}

function linkOneDepthOpen(linkValue){
	var obj = {'MENU_LOCATION':linkValue,'MENU_DEPTH':'1' };
	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));	
	
	location.href = mainPage+".act";
}

function linkTwoDepthOpen(linkValue){
	var obj = {'MENU_LOCATION':linkValue,'MENU_DEPTH':'2' };
	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));
	
	location.href = mainPage+".act";
}

function linkMenuPage(linkValue,id,num,linkPage){
	dataCtrl.delObjData("MENU_LOCATION");

	var obj = {'MENU_LOCATION' 	: linkValue,
			   'MENU_DEPTH'		: '3',
			   'ID'				: id,
			   'NUM'			: num,
			   'LOCATION_PAGE'	: linkPage,
			   'BT_LINK'	    : 'TRUE',			   
			   'HP_BK'			:'HP'};		
	
	
	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));

	location.href = _CodeMgr.getCodeMsg("CODE_URL", "1002") + linkPage;
}

function linkMenuPageInter(linkValue,id,num,linkPage,linksubpage){
	dataCtrl.delObjData("MENU_LOCATION");

	var obj = {'MENU_LOCATION' 	: linkValue,
			   'MENU_DEPTH'		: '3',
			   'ID'				: id,
			   'NUM'			: num,
			   'LOCATION_PAGE'	: linkPage,
			   'BT_LINK'	    : 'TRUE',			   
			   'HP_BK'			:'HP',			   
			   'SUB_LINK'		:linksubpage
			  };		
	
	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));

	location.href = linkPage;
}

function link4DepthMenuPage(linkValue,id,num,linkPage){
	dataCtrl.delObjData("MENU_LOCATION");
	var obj = {'MENU_LOCATION' 	: linkValue,
			   'MENU_DEPTH'		: '4',
			   'ID'				: id,
			   'NUM'			: num,
			   'LOCATION_PAGE'	: linkPage,
			   'BT_LINK'	    : 'TRUE',			   
			   'HP_BK'			:'HP'};		
	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));
	location.href = linkPage;
}


function mainLinkMenuPage(linkValue, id, num, linkPage, checkId) {
	dataCtrl.delObjData("MENU_LOCATION");
	var obj = {
		'MENU_LOCATION' : linkValue,
		'MENU_DEPTH'    : '3'      ,
		'ID'            : id       ,
		'NUM'           : num      ,
		'LOCATION_PAGE' : linkPage ,
	    'BT_LINK'	    : 'TRUE'   ,
		'HP_BK'         : 'HP'	   ,
		'CHECK_ID'   : checkId

	};
	dataCtrl.setObjData("MENU_LOCATION", JSON.stringify(obj));
	
	location.href = linkPage;
}

function linkEventDetailPage(bbsId, seq) {	
	var jObj = {};
	
	jObj._BBS_CMSYN	     = "";    //寃뚯떆�� CMS �щ�              
	jObj._BBS_CMSURL	 = "";    //寃뚯떆�� CMS URL             
	jObj._BBS_TOPDVCD    = "";    //寃뚯떆�� �곷떒遺�媛�湲곕뒫 ���낆퐫��         
	jObj._BBS_LISTDVCD   = "";    //寃뚯떆�� LIST ���낆퐫��           
	jObj._BBS_BOTDVCD    = "";    //寃뚯떆�� �섎떒遺�媛�湲곕뒫 ���낆퐫��         
	jObj._BBS_INQYN	     = "";    //寃뚯떆�� 寃��됯린�� �щ�		      
	jObj._BBS_MAINTYPECD = "";    //寃뚯떆�� 醫낅쪟援щ텇肄붾뱶              
	jObj._BBS_DTLCD	     = "08";  //寃뚯떆�� �곸꽭援щ텇肄붾뱶   
	jObj._BBS_ID         = bbsId; //寃뚯떆�먯븘�대뵒
	jObj._BBS_SITECD     = "99";  //寃뚯떆�먯궗�댄듃援щ텇
	jObj._BBS_MENUCD     = "A";   //寃뚯떆�먮찓�닿뎄遺�
	jObj._BBS_WRITSEQ    = seq;   //寃뚯떆臾쇰쾲�� 
	jObj._BBS_WRITTYPE   = "";    //寃뚯떆臾� �낅젰����
	jObj._BBS_WNPRS_YN   = "";    //�대깽�� �뱀꺼�� �쒖떆�щ�
	jObj._BBS_WN_PNUM    = "";    //�대깽�� �뱀꺼�� �대��꾪솕踰덊샇 
	jObj._BBS_REPL_YN    = "";    //怨듦컧�볤��� 由ъ뒪�명몴�쒖뿬遺�
	jObj._BBS_PAGE_IDX   = 1;     //�섏씠吏� �몃뜳��
	jObj._BBS_TAB_SCR_YN = "";    //�앺솕硫� �щ�
	jObj._BBS_TAB_MNUDVCD= "";    //�� �곷떒遺�媛�湲곕뒫 怨좎젙媛�
	jObj._BBS_TAB_SITDVCD= "";    //�� �곷떒遺�媛�湲곕뒫 怨좎젙媛�
	jObj._BBS_IMG_SRC    = "";    //�대�吏�寃쎈줈
	jObj._BBS_ADV_CLACD  = "";    //�꾩�留먭뎄遺꾩퐫��
	jObj._BBS_RLVNT_YR     = "";  //�대떦�꾨룄(����寃쎌젣由щ럭)
	jObj._BBS_REVW_STRT_DD = "";  //由щ럭�쒖옉��(����寃쎌젣由щ럭)
	jObj._BBS_REVW_END_DD  = "";  //由щ럭醫낅즺��(����寃쎌젣由щ럭)
	jObj._BBS_REVW_TMRD    = "";  //由щ럭諛쒗뻾�뚯감(����寃쎌젣由щ럭)
	jObj._BBS_NM           = "";  //寃뚯떆�먮챸
	jObj._BBS_FNM_PROD_DV  = "";  //湲덉쑖�곹뭹援щ텇
	jObj._BBS_TAB_FNM_PROD_DV = "";//湲덉쑖�곹뭹援щ텇 (�� �곷떒遺�媛�湲곕뒫 怨좎젙媛�)
	jObj._BBS_FNM_FILE_DV  = "";  //湲덉쑖�곹뭹�뚯씪援щ텇
	jObj._REG_SNO          = "";  //怨듬ℓ臾쇨굔 留ㅺ컖愿�由� �깅줉�쒕쾲
	jObj._BBS_ANSSEQ       = "";  //�듦��쒕쾲
	jObj._BBS_ANS_COMPT_YN = "";  //�듬��꾨즺�щ�
	jObj._BBS_ALL_USE_YN   = "";
	jObj._BBS_SCH_OBJ      = "";
	jObj._BBS_SPPT_SV_DVCD = "";	
	
	dataCtrl.setObjData('BBS_DATA', JSON.stringify(jObj));
	window.open("https://www.dgb.co.kr/bbs_ebz_10020_bord.act", "_blank", "left=100, top=100, width=300, height=300");
}

function bkLinkTwoDepthOpen(ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,toplvlMnuId,strtPgDrctrNm,locationPage,pibMainPage,cibMainPage){
	var ibnkUpperMnuCd = "";
	
	if(toplvlMnuId == "A01"){
		ibnkUpperMnuCd = pibIbnkUpperMnuCd;
	}else if(toplvlMnuId == "A02"){
		ibnkUpperMnuCd = cibIbnkUpperMnuCd;
	}
	
	var obj = {'IBNK_MNU_CD':ibnkMnuCd,'IBNK_UPPER_MNU_CD':ibnkUpperMnuCd,'MNU_LEVL_NO':'2','TOPLVL_MNU_ID':toplvlMnuId,'STRT_PG_DRCTR_NM':strtPgDrctrNm,'PIB_IBNK_UPPER_MNU_CD':pibIbnkUpperMnuCd,'CIB_IBNK_UPPER_MNU_CD':cibIbnkUpperMnuCd,'LOCATION_PAGE':locationPage,'PIB_MAIN_PAGE':pibMainPage,'CIB_MAIN_PAGE':cibMainPage,'HP_BK':'BK' };
	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));	
	
	var objLk = {'HP_BK':'BK','LOCATION_PAGE':locationPage};
	dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));	
	
	location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");   
}

function bkLinkThDepthOpen(ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,toplvlMnuId,strtPgDrctrNm,locationPage,pibMainPage,cibMainPage){
	var ibnkUpperMnuCd = "";
	
	if(toplvlMnuId == "A01"){
		ibnkUpperMnuCd = pibIbnkUpperMnuCd;
	}else if(toplvlMnuId == "A02"){
		ibnkUpperMnuCd = cibIbnkUpperMnuCd;
	}
	
	var obj = {'IBNK_MNU_CD':ibnkMnuCd,'IBNK_UPPER_MNU_CD':ibnkUpperMnuCd,'MNU_LEVL_NO':'3','TOPLVL_MNU_ID':toplvlMnuId,'STRT_PG_DRCTR_NM':strtPgDrctrNm,'PIB_IBNK_UPPER_MNU_CD':pibIbnkUpperMnuCd,'CIB_IBNK_UPPER_MNU_CD':cibIbnkUpperMnuCd,'LOCATION_PAGE':locationPage,'PIB_MAIN_PAGE':pibMainPage,'CIB_MAIN_PAGE':cibMainPage,'HP_BK':'BK' };
	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));	
	
	var objLk = {'HP_BK':'BK','LOCATION_PAGE':locationPage};
	dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));	
	
	location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");   
}

function bkLinkFoDepthOpen(ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,toplvlMnuId,strtPgDrctrNm,locationPage,pibMainPage,cibMainPage){
	var ibnkUpperMnuCd = "";
	
	if(toplvlMnuId == "A01"){
		ibnkUpperMnuCd = pibIbnkUpperMnuCd;
	}else if(toplvlMnuId == "A02"){
		ibnkUpperMnuCd = cibIbnkUpperMnuCd;
	}
	
	var obj = {'IBNK_MNU_CD':ibnkMnuCd,'IBNK_UPPER_MNU_CD':ibnkUpperMnuCd,'MNU_LEVL_NO':'4','TOPLVL_M"NU_ID':toplvlMnuId,'STRT_PG_DRCTR_NM':strtPgDrctrNm,'PIB_IBNK_UPPER_MNU_CD':pibIbnkUpperMnuCd,'CIB_IBNK_UPPER_MNU_CD':cibIbnkUpperMnuCd,'LOCATION_PAGE':locationPage,'PIB_MAIN_PAGE':pibMainPage,'CIB_MAIN_PAGE':cibMainPage,'HP_BK':'BK' };
	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));	
	
	var objLk = {'HP_BK':'BK','LOCATION_PAGE':locationPage};
	dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));
	
	location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");  
}

function bkLinkFiDepthOpen(ibnkMnuCd,pibIbnkUpperMnuCd,cibIbnkUpperMnuCd,toplvlMnuId,strtPgDrctrNm,locationPage,pibMainPage,cibMainPage){
	var ibnkUpperMnuCd = "";
	
	if(toplvlMnuId == "A01"){
		ibnkUpperMnuCd = pibIbnkUpperMnuCd;
	}else if(toplvlMnuId == "A02"){
		ibnkUpperMnuCd = cibIbnkUpperMnuCd;
	}
	
	var obj = {'IBNK_MNU_CD':ibnkMnuCd,'IBNK_UPPER_MNU_CD':ibnkUpperMnuCd,'MNU_LEVL_NO':'5','TOPLVL_MNU_ID':toplvlMnuId,'STRT_PG_DRCTR_NM':strtPgDrctrNm,'PIB_IBNK_UPPER_MNU_CD':pibIbnkUpperMnuCd,'CIB_IBNK_UPPER_MNU_CD':cibIbnkUpperMnuCd,'LOCATION_PAGE':locationPage,'PIB_MAIN_PAGE':pibMainPage,'CIB_MAIN_PAGE':cibMainPage,'HP_BK':'BK' };
	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));	
	
	var objLk = {'HP_BK':'BK','LOCATION_PAGE':locationPage};
	dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));
	
	location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");  
}

function f_windowOpenFunc(src){
	window.open(src);
}
function windowCalFunc(id){
	
	var subid = id.substr(4,3);
	var sObj = {};
	if (subid == 'fnl')
	{
		sObj.TITLE_VAL = "L";
	}else if (subid == 'fnl')
	{
		sObj.TITLE_VAL = "E";
	}else {
		sObj.TITLE_VAL = "S";
	}
	dataCtrl.setObjData("MENU_DATA", JSON.stringify(sObj));
	window.open('/fnz_ebz_11110_ct01_s.act','testWindow','width=800, height=735, scrollbars=yes');
}
function benefitClassNm(val , no){
	var ret = "";
    // IMBANK 移대뱶 �곹뭹紐� 硫붿씤 媛쒖꽑媛쒕컻 : �쒗깮�댁슜 �좏깮 蹂�寃�
	if (no == '1')
	{
		ret = _CodeMgr.getCodeMsg("CRDCD_PROF_CLACD", val);
	}
	else
	{
		ret = "ico"+val;
	}

	return ret;
}
function MenuDatForCard()
{
	_HMP_PAGE_INDEX = 1;
	// 怨듯넻�낅젰遺� �뗮똿		
	var jexAjax = "";
	jexAjax = jex.createAjaxUtil("fnc_ebz_11010_card_d001");
	var dpoDvCnt    = 0;
	//�곹뭹紐� 議고쉶 援щ텇肄붾뱶
	jexAjax.set("MALL_INQ_DVCD" 	, "99"); // all 
	jexAjax.set("VLD_VAL" 		, getSiteDvcd());
	//湲고� : �뺣젹諛⑹떇 �쒖꽌		
	jexAjax.set("SMRT_LNUP_DV", "fnmMain");
	var objWebWorkComm = new Object();
	objWebWorkComm.INQ_SEQ = String(_HMP_PAGE_INDEX);		//議고쉶�� �섏씠吏�踰덊샇
	objWebWorkComm.INQ_NCSE = 1;					//�쒗럹�댁��� 議고쉶�� 嫄댁닔
	jexAjax.set("EBZ_WEB_WORK_COMM", objWebWorkComm);
	var divId="card_b_";
	var result = "";

	jexAjax.execute(function(dat) { 			
		
		var jsonData = dat.REC1;
		
		for(var i=0; i < dat.REC1.length; i++) {
			
			var row = jsonData[i];
			var addCls = "";

			if (row.PD_NM.length > "13")
			{ addCls = " long_line"; }

			if(row.POP_PD_YN  == "Y" || row.RCMD_PD_YN == "Y" || row.NWGD_YN    == "Y") result += "<li class=\"gnb_icon_area\">";
			if(row.POP_PD_YN  == "Y") result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico1.gif\" alt=\"議고쉶�곸쐞\"></span>";
			if(row.RCMD_PD_YN == "Y") result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico3.gif\" alt=\"�먮ℓ�곸쐞\"></span>";
			if(row.NWGD_YN    == "Y") result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico2.gif\" alt=\"�좎긽��\"></span>";
			
			if(row.POP_PD_YN  == "Y" || row.RCMD_PD_YN == "Y" || row.NWGD_YN    == "Y") result += "</li>";
			
			//result += "<li class=\"gnb_visual_area\"><a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6) + "','" +row.PD_CD.substr(12) +"','D');\" title=\"" + row.PD_NM + "\"><img src=\""+row.IMG_FILE_NM1+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.PD_NM + " �곹뭹 �대�吏�\"/></a></li>";
			result += "<li class=\"gnb_visual_area\"><img src=\""+row.IMG_FILE_NM1+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.PD_NM + " �곹뭹 �대�吏�\"/></li>";
			result += "<li class=\"gnb_title_area\"><p class=\"product_sub_txt\">"+row.PD_NM+"<p></li>"
				   +  "<li class=\"gnb_con_area\"><p class=\"new_title_up\">"+row.CARD_CONCPT_CN+"</p></li>";

			/* // IMBANK 移대뱶 �곹뭹紐� 硫붿씤 媛쒖꽑媛쒕컻 : �쒗깮�댁슜 �좏깮 蹂�寃�
			if(jex.null2Void(row.CARD_PROF_AT_C_CN) != ""){
				result += "<li class=\"gnb_pro_icon_area\"><ul class=\"card_benefit_list\">";
				var codeArr = row.CARD_PROF_AT_C_CN.split(":");

				for(var j = 0; j < codeArr.length; j++){
					//result += "	<li class=\""+benefitClassNm(codeArr[j],'2')+"\">"+benefitClassNm(codeArr[j],'1')+"</li>";
					result += "	<li class=\""+benefitClassNm(codeArr[j],'2')+"\"><span class=\"hidden\">"+benefitClassNm(codeArr[j],'1')+"</span></li>";
					//if (j == 2)
					if (j == 6)
					{
						break;
					}
				}
				result += "</ul></li>";
			}*/
			if(jex.null2Void(row.CRDCD_PROF_EPL_CN) != ""){
				result += "<li class=\"gnb_pro_icon_area\"><ul class=\"card_benefit_list\">";
				var codeArr = row.CRDCD_PROF_EPL_CN.split(":");

				for(var j = 0; j < codeArr.length; j++){
					//result += "	<li class=\""+benefitClassNm(codeArr[j],'2')+"\">"+benefitClassNm(codeArr[j],'1')+"</li>";
					result += "	<li class=\""+benefitClassNm(codeArr[j],'2')+"\"><span class=\"hidden\">"+benefitClassNm(codeArr[j],'1')+"</span></li>";
					//if (j == 2)
					if (j == 6)
					{
						break;
					}
				}
				result += "</ul></li>";
			}

			if(row.SITE_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN == "Y"){
				result +=  "<li class=\"gnb_btn_area\"><p class=\"new_title_btn\"><a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6) + "','"+ row.PD_CD.substr(12) +"','J');\" title=\"" + row.PD_NM + " \" class=\"btn_type31 point\"><span>媛��낇븯湲�</span></a><a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6) + "','"+ row.PD_CD.substr(12) +"','D');\" class=\"btn_type31\"><span>�댁슜蹂닿린</span></a></p></li>"
			}
			
			
		}
		$("#slideMenu_card").append(result);
	});
	return result;
}

function MenuDatForDeposit()
{
	_HMP_PAGE_INDEX = 1;
	// 怨듯넻�낅젰遺� �뗮똿		
	var jexAjax     = "";
	
	jexAjax     = jex.createAjaxUtil("fnp_ebz_21010_depo_d001");
		
	var dpoDvCnt    = 0;
	
	//�곹뭹紐� 議고쉶 援щ텇肄붾뱶
	jexAjax.set("MALL_INQ_DVCD" 	, "99"); // all 
		
	/* 01:湲덉쑖紐� */
	jexAjax.set("VLD_VAL" 			, "01");
	
	//湲고� : �뺣젹諛⑹떇 �쒖꽌		
	jexAjax.set("SMRT_LNUP_DV", "fmpMain");

	var objWebWorkComm = new Object();
	objWebWorkComm.INQ_SEQ = String(_HMP_PAGE_INDEX);		//議고쉶�� �섏씠吏�踰덊샇
	objWebWorkComm.INQ_NCSE = 1;					//�쒗럹�댁��� 議고쉶�� 嫄댁닔
	jexAjax.set("EBZ_WEB_WORK_COMM", objWebWorkComm);
	
	var jObj = {};
	jObj = dataCtrl.getObjData('FNM_DETAIL_DATA');
	
	if(jObj == null){
		jexAjax.addOption("loading", true);
	}
	
	//_TABLE.clearTbl(true);

	var divId="depo_b_";
	var result = "";

	jexAjax.execute(function(dat) { 			
		
		//_DATA_LIST = dat.REC1; //議고쉶�� 媛믪쓣 �꾩뿭蹂��섏뿉 ����
		
		var jsonData = dat.REC1;
		
		for(var i=0; i < jsonData.length; i++) {
			var row = jsonData[i];
			var addCls = "";
			
			if(row.POP_PD_YN  == "Y" || row.RCMD_PD_YN == "Y" || row.NWGD_YN    == "Y"){
				result += "<li class=\"gnb_icon_area\">";
			}
			if(row.POP_PD_YN  == "Y")
				result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico1.gif\" alt=\"議고쉶�곸쐞\"></span>";
			if(row.RCMD_PD_YN == "Y")
				result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico2.gif\" alt=\"�좎긽��\"></span>";
			if(row.NWGD_YN    == "Y")
				result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico3.gif\" alt=\"�먮ℓ�곸쐞\"></span>";
			
			if(row.POP_PD_YN  == "Y" || row.RCMD_PD_YN == "Y" || row.NWGD_YN    == "Y"){
				result += "</li>";
			}
			
			if (row.PD_NM.length > "13")
			{
				addCls = " long_line";
			}
			//result += "<li class=\"gnb_visual_area\"><a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6) + "','" +row.PD_CD.substr(12) +"','D');\" title=\"" + row.PD_NM + "\"><img src=\""+row.IMG_FILE_NM+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.PD_NM + " �곹뭹 �대�吏�\"/></a></li>";
			//result += "<li class=\"gnb_title_area\"><p class=\"product_sub_txt\"><a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" +row.PD_CD.substr(6,6)+ "','"+ row.PD_CD.substr(12)+ "','D');\">" + row.PD_NM + "</a></p></li>";
			result += "<li class=\"gnb_visual_area\"><img src=\""+row.IMG_FILE_NM+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.PD_NM + " �곹뭹 �대�吏�\"/></li>";
			result += "<li class=\"gnb_title_area\"><p class=\"product_sub_txt\">" + row.PD_NM + "</p></li>";



			if (jex.null2Void(row.PD_SMRY_CN) != "")
			{
				/*if (row.PD_SMRY_CN.length > 50)
				{
					row.PD_SMRY_CN = row.PD_SMRY_CN.substr(0,50)+"...";
				}*/
				result += "<li class=\"gnb_con_area\"><p class=\"new_title_up\"><span>"+jex.null2Void(row.PD_SMRY_CN)+"</span></p></li>";
			}
			result += "<li class=\"gnb_rate_area\">";
			
			if(jex.null2Void(row.ITN_MAX_RATE) == "" || jex.null2Void(row.ITN_MAX_RATE) == "-"){
				result += "	<p class=\"rate_txt\">理쒓퀬�댁옄�� �� <strong>-%</strong></p>";;
			}else{
				var maxRate = "";
				if(row.SITE_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN == "Y"){
					maxRate = jex.null2Void(row.ITN_MAX_RATE);
				}
				else if(row.WIC_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN != "Y"){
					maxRate = jex.null2Void(row.WIC_MAX_RATE);
				}
				else if(row.SMRT_BNK_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN != "Y"){
					maxRate = jex.null2Void(row.ITN_MAX_RATE);
				}
				result += "	<p>理쒓퀬�댁옄�� �� <strong>"+ maxRate +"%</strong></p>";
				result += "	<p>(1�꾧린以� �멸툑�⑸���)</p>";
			}				
			result += "</li>";
			result += "<li class=\"gnb_btn_area\"><p class=\"new_title_btn\">";
			if(row.SITE_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN == "Y"){
				result += "<a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6)+ "','"+ row.PD_CD.substr(12) +"','J')\" title=\"" + row.PD_NM + " 媛��낇븯湲�\" class=\"btn_type31 point\"><span>媛��낇븯湲�</span></a>";
			}
			result +="<a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6)+ "','"+ row.PD_CD.substr(12) +"','D');\" class=\"btn_type31\"><span>�댁슜蹂닿린</span></a>";
			result += "</p>";
			result +="</li>";
		}
		
		$("#slideMenu_deposit").append(result);
	});
	return result;
}

function MenuDatForFund(slideId){
	var tempList = new Array();
	_HMP_PAGE_INDEX = 1;
	var objWebWorkComm = new Object();
	objWebWorkComm.INQ_SEQ = String(_HMP_PAGE_INDEX);		//議고쉶�� �섏씠吏�踰덊샇
	var jexAjax = jex.createAjaxUtil("fnf_ebz_31010_fund_d001"); //由ъ뒪�� �붾㈃�� 紐⑤몢 媛숈� ACTION �ъ슜 (議고쉶 議곌굔留� 議곌툑�� �ㅻ쫫)

	jexAjax.set("RTMT_YN" , "N");      		//�댁쭅�곌툑�щ� (Y:�댁쭅�곌툑    N:�쇰컲����   "":�대떦�놁쓬)
	jexAjax.set("VLD_VAL" , getSiteDvcd()); //寃뚯떆�ъ씠�멸뎄遺꾩퐫�� (01:湲덉쑖�곹뭹紐�  06:�낅룄吏���  07:洹몃┛吏���  08:寃쎌＜吏���  09:�쒖닔��  14:�곸떊�꾩떆)
	jexAjax.set("OVRS_FUND_YN"		  , ""); 						 	//�댁쇅���쒖뿬遺�
	jexAjax.set("FUND_SELL_CHNL_DVCD" , ""); 						 	//���쒗뙋留ㅼ콈�먭뎄遺�
	jexAjax.set("BCT_OPR_FC_REC"	  , tempList);   	//���쒖쑀��(�섏씡利앷텒�댁슜�뺥깭肄붾뱶) �좏깮媛� 媛��몄삤湲�
	jexAjax.set("OVRS_STCK_NVST_EU_FUND_YN", ""); 						//�댁쇅二쇱떇�ъ옄�꾩슜����
	jexAjax.set("NVST_DESN_AST_TPCD","");
	jexAjax.set("SMRT_LNUP_DV"			, _HMP_SORT_TYPE);                  //�뺣젹諛⑹떇
	jexAjax.set("FUND_OPCMP_CD"			, "0");               //�댁슜�� �좏깮媛� 媛��몄삤湲�
	jexAjax.set("FUND_SELL_PSBLYN"		, "");        	//�먮ℓ�꾨즺�щ� 媛��몄삤湲�
	jexAjax.set("FUND_NM"				, "");             //���쒕챸 �낅젰媛� 媛��몄삤湲�
	jexAjax.set("SMRT_LNUP_DV"			, "fmnMain");                  //�뺣젹諛⑹떇
	jexAjax.set("FUND_NVST_RISK_GDC_REC", tempList);  			//�꾪뿕�깃툒 泥댄겕�댁뿭 媛��몄삤湲�
	jexAjax.set("PLN_DVCD_REC"			, []);
	jexAjax.set("EBZ_WEB_WORK_COMM", objWebWorkComm);

	var divId="fund_b_";
	var result = "";

	jexAjax.execute(function(dat) { 			
			
		var jsonData = dat.REC1;
		
		for(var i=0; i < jsonData.length; i++) {
			
			var row = jsonData[i];
			var addCls = "";			
			
			if (row.POP_PD_YN  == "Y" || row.NWGD_YN    == "Y" || row.RCMD_PD_YN == "Y"){
				result += "<li class=\"gnb_icon_area\">";
			}
			if (row.POP_PD_YN  == "Y"){
				result +="	<span><img src=\"/img/common/bg/ebz_bg_product_ico1.gif\" alt=\"議고쉶�곸쐞\"></span>";
			}
			if (row.NWGD_YN    == "Y"){
				result +="	<span><img src=\"/img/common/bg/ebz_bg_product_ico2.gif\" alt=\"�좎긽��\"></span>";
			}
			if (row.RCMD_PD_YN == "Y"){
				result +="	<span><img src=\"/img/common/bg/ebz_bg_product_ico3.gif\" alt=\"�먮ℓ�곸쐞\"></span>";
			}
			if (row.POP_PD_YN  == "Y" || row.NWGD_YN    == "Y" || row.RCMD_PD_YN == "Y"){
				result +="</li>";
			}			
			
			if (jex.null2Void(row.IMG_FILE_NM) == "")
			{
				//result +="<li class=\"gnb_visual_area\"><a href=\"javascript:goProductDetailByPdCd('"+row.TRUST_FUND_CD.substr(0,6)+"','" + row.TRUST_FUND_CD.substr(6,6) + "','" +row.TRUST_FUND_CD.substr(12) +"','D');\" title=\"" + row.FUND_NM + "\"><img src=\"/img/common/card/ebz_fund_test.jpg\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.FUND_NM + " �곹뭹 �대�吏�\"/></a></li>";
				result +="<li class=\"gnb_visual_area\"><img src=\"/img/common/card/ebz_fund_test.jpg\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.FUND_NM + " �곹뭹 �대�吏�\"/></li>";
			}else{
				//result +="<li class=\"gnb_visual_area\"><a href=\"javascript:goProductDetailByPdCd('"+row.TRUST_FUND_CD.substr(0,6)+"','" + row.TRUST_FUND_CD.substr(6,6) + "','" +row.TRUST_FUND_CD.substr(12) +"','D');\" title=\"" + row.FUND_NM + "\"><img src=\""+row.IMG_FILE_NM+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.FUND_NM + " �곹뭹 �대�吏�\"/></a></li>";
				result +="<li class=\"gnb_visual_area\"><img src=\""+row.IMG_FILE_NM+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.FUND_NM + " �곹뭹 �대�吏�\"/></li>";
			}
			//result +="<li class=\"gnb_title_area\"><p class=\"product_sub_txt\"><a href=\"javascript:goProductDetailByPdCd('"+row.TRUST_FUND_CD.substr(0,6)+"','" + row.TRUST_FUND_CD.substr(6,6) + "','"+ row.TRUST_FUND_CD.substr(12) +"','D');\">"+row.FUND_NM+"</a></p>";
			result +="<li class=\"gnb_title_area\"><p class=\"product_sub_txt\">"+row.FUND_NM+"</p>";
			result +="<li class=\"gnb_con_area\"><p class=\"new_title_up\"><span>"+getFundTypeNm(row.BCT_OPR_FC)+"</span></p>";
			result +="<li class=\"gnb_rate_area\">";
			result +="	<p class=\"rate_txt\"><strong>"+row.MNS3_EN_R+"%</strong> (3媛쒖썡)</p>";
			result +="</li>";
			result +="<li class=\"gnb_btn_area\"><p class=\"new_title_btn\">";
			result +="<a href=\"javascript:goProductDetailByPdCd('"+row.TRUST_FUND_CD.substr(0,6)+"','" + row.TRUST_FUND_CD.substr(6,6) + "','"+ row.TRUST_FUND_CD.substr(12) +"','D');\" class=\"btn_type31 point\"><span>媛��낇븯湲�</span></a>";
			//result +="<a href=\"javascript:goProductDetailByPdCd('"+row.TRUST_FUND_CD.substr(0,6)+"','" + row.TRUST_FUND_CD.substr(6,6) + "','"+ row.TRUST_FUND_CD.substr(12) +"','D');\" class=\"btn_type31\"><span>�댁슜蹂닿린</span></a>";
			result +="</p></li>";   

			$("#"+slideId).append(result);
			
			result = "";

			break;

		}
	});
}

function getFundTypeNm(code) {
	var codeValue 	= getCodeValueCom("BCT_OPR_FC", code);
	
	if (codeValue == "") codeValue = code;
	return codeValue;
}
function MenuDatForLoan()
{	
	_HMP_PAGE_INDEX = 1;
	// 怨듯넻�낅젰遺� �뗮똿		
	var jexAjax = "";
	
	var jexAjax = jex.createAjaxUtil("fnl_ebz_41010_loan_d001");
		
	var dpoDvCnt    = 0;
	
	jexAjax.set("PD_NM"             , $("#txtPrnm").val()); //��異쒕챸
	jexAjax.set("PRSNL_ENPCO_DVCD"	, "01");                //媛쒖씤湲곗뾽援щ텇肄붾뱶(01:媛쒖씤,02:湲곗뾽,99:湲고�,~:�대떦�놁쓬)
	jexAjax.set("VLD_VAL"			, getSiteDvcd());       //寃뚯떆�ъ씠�멸뎄遺꾩퐫��(01:湲덉쑖�곹뭹紐�,06:�낅룄吏���,07:洹몃┛吏���,08:寃쎌＜吏���,09:�쒖닔��,14:�곸떊�꾩떆)
	jexAjax.set("SMRT_LNUP_DV"      , "fmnMain");
	jexAjax.set("HMPG_LO_PD_KNDC"   , "FMNM");
		
	//湲고� : �뺣젹諛⑹떇 �쒖꽌		
	

	var objWebWorkComm = new Object();
	objWebWorkComm.INQ_SEQ = String(_HMP_PAGE_INDEX);		//議고쉶�� �섏씠吏�踰덊샇
	objWebWorkComm.INQ_NCSE = 1;					//�쒗럹�댁��� 議고쉶�� 嫄댁닔
	jexAjax.set("EBZ_WEB_WORK_COMM", objWebWorkComm);
	
	var divId="loan_b_";
	var result = "";

	jexAjax.execute(function(dat) { 			
		
		var jsonData = dat.REC1;
		
		
		for(var i=0; i < jsonData.length; i++) {
			
			var row = jsonData[i];
			var addCls = "";

			if (row.POP_PD_YN  == "Y" || row.NWGD_YN    == "Y" || row.RCMD_PD_YN == "Y"){
				result += "<li class=\"gnb_icon_area\">";
			}
			if (row.POP_PD_YN  == "Y"){
				result +="	<span><img src=\"/img/common/bg/ebz_bg_product_ico1.gif\" alt=\"議고쉶�곸쐞\"></span>";
			}
			if (row.NWGD_YN    == "Y"){
				result +="	<span><img src=\"/img/common/bg/ebz_bg_product_ico2.gif\" alt=\"�좎긽��\"></span>";
			}
			if (row.RCMD_PD_YN == "Y"){
				result +="	<span><img src=\"/img/common/bg/ebz_bg_product_ico3.gif\" alt=\"�먮ℓ�곸쐞\"></span>";
			}
			if (row.POP_PD_YN  == "Y" || row.NWGD_YN    == "Y" || row.RCMD_PD_YN == "Y"){
				result +="</li>";
			}
			
			if (row.PD_NM.length > "13")
			{
				addCls = " long_line";
			}

			if (jex.null2Void(row.IMG_FILE_NM) != "") 
			{
				//result +="<li class=\"gnb_visual_area\"><a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6) + "','" +row.PD_CD.substr(12) +"','D');\" title=\"" + row.PD_NM + "\"><img src=\""+row.IMG_FILE_NM+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.PD_NM + " �곹뭹 �대�吏�\"/></a></li>";
				result +="<li class=\"gnb_visual_area\"><img src=\""+row.IMG_FILE_NM+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.PD_NM + " �곹뭹 �대�吏�\"/></li>";
			}else{
				//result +="<li class=\"gnb_visual_area\"><a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6) + "','" +row.PD_CD.substr(12) +"','D');\" title=\"" + row.PD_NM + "\"><img src=\"/img/common/card/ebz_loan_test.jpg\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.PD_NM + " �곹뭹 �대�吏�\"/></a></li>";
				result +="<li class=\"gnb_visual_area\"><img src=\"/img/common/card/ebz_loan_test.jpg\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.PD_NM + " �곹뭹 �대�吏�\"/></li>";
			}
			
			result += "<li class=\"gnb_title_area\"><p class=\"product_sub_txt\"><span>"+row.PD_NM+"</span></p></li>";

			result += "<li class=\"gnb_con_area\"><p class=\"new_title_up\">";
			//result += "<a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6) + "','" +row.PD_CD.substr(12) +"','D');\">"+jex.null2Void(row.PD_SMRY_CN)+"</a></p></li>";
			result += ""+jex.null2Void(row.PD_SMRY_CN)+"</p></li>";
			/*if (row.PD_SMRY_CN.length > 50)
			{
				row.PD_SMRY_CN = row.PD_SMRY_CN.substr(0,50)+"...";
			}*/
			result +="<li class=\"gnb_btn_area\"><p class=\"new_title_btn\">";
			result +="<a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6) + "','" +row.PD_CD.substr(12) +"','J');\" class=\"btn_type31 point\"><span>�좎껌�섍린</span></a>";
			result +="<a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6) + "','" +row.PD_CD.substr(12) +"','D');\" class=\"btn_type31\"><span>�댁슜蹂닿린</span></a></p></li> ";
			
			$("#slideMenu_loan").append(result);
			result = "";

			break;

		}
	});
}

function MenuDatForFne(){
	var result = "";
	
	var jexAjax = jex.createAjaxUtil("fne_ebz_54030_foex_d001");

	jexAjax.set("PD_CD", "11534001000001000");
	/* �ъ씠�� 援щ텇�낅젰:01(湲덉쑖紐�) */
	jexAjax.set("VLD_VAL","01");

	jexAjax.execute(function(dat) { 			
			
			
		var addCls = "";			
		
		if (dat.POP_PD_YN  == "Y" || dat.NWGD_YN    == "Y" || dat.RCMD_PD_YN == "Y"){
			result += "<li class=\"gnb_icon_area\">";
		}
		if (dat.POP_PD_YN  == "Y"){
			result +="	<span><img src=\"/img/common/bg/ebz_bg_product_ico1.gif\" alt=\"議고쉶�곸쐞\"></span>";
		}
		if (dat.NWGD_YN    == "Y"){
			result +="	<span><img src=\"/img/common/bg/ebz_bg_product_ico2.gif\" alt=\"�좎긽��\"></span>";
		}
		if (dat.RCMD_PD_YN == "Y"){
			result +="	<span><img src=\"/img/common/bg/ebz_bg_product_ico3.gif\" alt=\"�먮ℓ�곸쐞\"></span>";
		}
		if (dat.POP_PD_YN  == "Y" || dat.NWGD_YN    == "Y" || dat.RCMD_PD_YN == "Y"){
			result +="</li>";
		}			
		
		if (jex.null2Void(dat.IMG_FILE_NM) == "")
		{
			//result +="<li class=\"gnb_visual_area\"><a href=\"javascript:goProductDetailByPdCd('"+dat.PD_CD.substr(0,6)+"','" + dat.PD_CD.substr(6,6) + "','" +dat.PD_CD.substr(12) +"','D');\" title=\"" + dat.PD_NM + "\"><img src=\"/img/common/card/ebz_foreign_test.jpg\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + dat.PD_NM + " �곹뭹 �대�吏�\"/></a></li>";
			result +="<li class=\"gnb_visual_area\"><img src=\"/img/common/card/ebz_foreign_test.jpg\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + dat.PD_NM + " �곹뭹 �대�吏�\"/></li>";
		}else{
			//result +="<li class=\"gnb_visual_area\"><a href=\"javascript:goProductDetailByPdCd('"+dat.PD_CD.substr(0,6)+"','" + dat.PD_CD.substr(6,6) + "','" +dat.PD_CD.substr(12) +"','D');\" title=\"" + dat.PD_NM + "\"><img src=\""+dat.IMG_FILE_NM+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + dat.PD_NM + " �곹뭹 �대�吏�\"/></a></li>";
			result +="<li class=\"gnb_visual_area\"><img src=\""+dat.IMG_FILE_NM+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + dat.PD_NM + " �곹뭹 �대�吏�\"/></li>";
		}
		//result +="<li class=\"gnb_title_area\"><p class=\"product_sub_txt\"><a href=\"javascript:goProductDetailByPdCd('"+dat.PD_CD.substr(0,6)+"','" + dat.PD_CD.substr(6,6) + "','"+ dat.PD_CD.substr(12) +"','D');\">"+dat.PD_NM+"</a></p>";
		result +="<li class=\"gnb_title_area\"><p class=\"product_sub_txt\">"+dat.PD_NM+"</p>";
		result +="<li class=\"gnb_con_area\"><p class=\"new_title_up\"><span>"+dat.PD_SMRY_CN+"</span></p></li>";

		
		result += "<li class=\"gnb_con_area\">";
		result +="	<p class=\"new_title_up\">"+dat.NTRST_R_EPL_CN+"</p>";
		result +="</li>";
		result +="<li class=\"gnb_btn_area\"><p class=\"new_title_btn\">";
		result +="<a href=\"javascript:goProductDetailByPdCd('"+dat.PD_CD.substr(0,6)+"','" + dat.PD_CD.substr(6,6) + "','"+ dat.PD_CD.substr(12) +"','J');\" class=\"btn_type31 point\"><span>媛��낇븯湲�</span></a>";
		result +="<a href=\"javascript:goProductDetailByPdCd('"+dat.PD_CD.substr(0,6)+"','" + dat.PD_CD.substr(6,6) + "','"+ dat.PD_CD.substr(12) +"','D');\" class=\"btn_type31\"><span>�댁슜蹂닿린</span></a>";
		result +="</p></li>";   

		$("#slideMenu_fne").append(result);
		result = "";

	});
}

function MenuDatForFnr(){
	var tempList = new Array();
	_HMP_PAGE_INDEX = 1;
	
	var jexAjax = jex.createAjaxUtil("fnf_ebz_31010_fund_d001");

	jexAjax.set("FUND_OPCMP_CD"			, "0");
	jexAjax.set("RTMT_YN"		, "Y");

	var plnDvcdList = [];
	var tempList    = [];

	var obj = new Object();
	var obj1 = new Object();
	var obj2 = new Object();
	var obj3 = new Object();
		
	obj.BCT_OPR_FC = "101";
	tempList[tempList.length] = obj;
	obj1.BCT_OPR_FC = "103";
	tempList[tempList.length] = obj1;
	obj2.BCT_OPR_FC = "104";
	tempList[tempList.length] = obj2;
	obj3.BCT_OPR_FC = "102";
	tempList[tempList.length] = obj;


	var pobj = new Object();
	var pobj1 = new Object();
	var pobj2 = new Object();
	var pobj3 = new Object();
	var pobj4 = new Object();
	var pobj5 = new Object();	
	pobj.PLN_DVCD = "1";
	plnDvcdList[plnDvcdList.length] = pobj;
	pobj1.PLN_DVCD = "2";
	plnDvcdList[plnDvcdList.length] = pobj1;
	pobj2.PLN_DVCD = "3";
	plnDvcdList[plnDvcdList.length] = pobj2;
	pobj3.PLN_DVCD = "4";
	plnDvcdList[plnDvcdList.length] = pobj3;
	pobj4.PLN_DVCD = "9";
	plnDvcdList[plnDvcdList.length] = pobj4;
	pobj5.PLN_DVCD = "N";
	plnDvcdList[plnDvcdList.length] = pobj5;	

	jexAjax.set("BCT_OPR_FC_REC", tempList);
	jexAjax.set("PLN_DVCD_REC", plnDvcdList);
	jexAjax.set("SMRT_LNUP_DV", "fmnMain");              //�뺣젹諛⑹떇	

	//���쒖“�� �뱀꽌鍮꾩뒪 �ъ슜�쇰줈 �명븳 異붽���ぉ
	jexAjax.set("VLD_VAL"                   , getSiteDvcd()); //寃뚯떆�ъ씠�멸뎄遺꾩퐫�� (01:湲덉쑖�곹뭹紐�  06:�낅룄吏���  07:洹몃┛吏���  08:寃쎌＜吏���  09:�쒖닔��  14:�곸떊�꾩떆)
	jexAjax.set("OVRS_FUND_YN"				, ""); 			  //�댁쇅���쒖뿬遺�
	jexAjax.set("FUND_SELL_CHNL_DVCD"		, ""); 			  //���쒗뙋留ㅼ콈�먭뎄遺�
	jexAjax.set("FUND_NVST_RISK_GDC_REC"	, []);  		  //�꾪뿕�깃툒 泥댄겕�댁뿭 媛��몄삤湲�
	jexAjax.set("FUND_SELL_PSBLYN"			, "");    		  //�먮ℓ�꾨즺�щ� 媛��몄삤湲�
	jexAjax.set("OVRS_STCK_NVST_EU_FUND_YN"	, "");            //�댁쇅二쇱떇�ъ옄�꾩슜���쒖뿬遺�
		
	//湲고� : �뺣젹諛⑹떇 �쒖꽌		
	var objWebWorkComm = new Object();
	objWebWorkComm.INQ_SEQ = String(_HMP_PAGE_INDEX);		//議고쉶�� �섏씠吏�踰덊샇
	objWebWorkComm.INQ_NCSE = 1;					//�쒗럹�댁��� 議고쉶�� 嫄댁닔
	jexAjax.set("EBZ_WEB_WORK_COMM", objWebWorkComm);

	var divId="fund_b_";
	var result = "";

	jexAjax.execute(function(dat) { 			
			
		var jsonData = dat.REC1;
		
		for(var i=0; i < jsonData.length; i++) {
			
			var row = jsonData[i];

			var addCls = "";			
			
			if (row.POP_PD_YN  == "Y" || row.NWGD_YN    == "Y" || row.RCMD_PD_YN == "Y"){
				result += "<li class=\"gnb_icon_area\">";
			}
			if (row.POP_PD_YN  == "Y"){
				result +="	<span><img src=\"/img/common/bg/ebz_bg_product_ico1.gif\" alt=\"議고쉶�곸쐞\"></span>";
			}
			if (row.NWGD_YN    == "Y"){
				result +="	<span><img src=\"/img/common/bg/ebz_bg_product_ico2.gif\" alt=\"�좎긽��\"></span>";
			}
			if (row.RCMD_PD_YN == "Y"){
				result +="	<span><img src=\"/img/common/bg/ebz_bg_product_ico3.gif\" alt=\"�먮ℓ�곸쐞\"></span>";
			}
			if (row.POP_PD_YN  == "Y" || row.NWGD_YN    == "Y" || row.RCMD_PD_YN == "Y"){
				result +="</li>";
			}			
			
			if (jex.null2Void(row.IMG_FILE_NM) == "")
			{
				//result +="<li class=\"gnb_visual_area\"><a href=\"javascript:goProductDetailByPdCd('"+row.TRUST_FUND_CD.substr(0,6)+"','" + row.TRUST_FUND_CD.substr(6,6) + "','" +row.TRUST_FUND_CD.substr(12) +"','D');\" title=\"" + row.FUND_NM + "\"><img src=\"/img/common/card/ebz_retirement_test.jpg\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.FUND_NM + " �곹뭹 �대�吏�\"/></a></li>";
				result +="<li class=\"gnb_visual_area\"><img src=\"/img/common/card/ebz_retirement_test.jpg\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.FUND_NM + " �곹뭹 �대�吏�\"/></li>";
			}else{
				//result +="<li class=\"gnb_visual_area\"><a href=\"javascript:goProductDetailByPdCd('"+row.TRUST_FUND_CD.substr(0,6)+"','" + row.TRUST_FUND_CD.substr(6,6) + "','" +row.TRUST_FUND_CD.substr(12) +"','D');\" title=\"" + row.FUND_NM + "\"><img src=\""+row.IMG_FILE_NM+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.FUND_NM + " �곹뭹 �대�吏�\"/></a></li>";
				result +="<li class=\"gnb_visual_area\"><img src=\""+row.IMG_FILE_NM+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.FUND_NM + " �곹뭹 �대�吏�\"/></li>";
			}
			//result +="<li class=\"gnb_title_area\"><p class=\"product_sub_txt\"><a href=\"javascript:goProductDetailByPdCd('"+row.TRUST_FUND_CD.substr(0,6)+"','" + row.TRUST_FUND_CD.substr(6,6) + "','"+ row.TRUST_FUND_CD.substr(12) +"','D');\">"+row.FUND_NM+"</a></p>";
			result +="<li class=\"gnb_title_area\"><p class=\"product_sub_txt\">"+row.FUND_NM+"</p>";
			result +="<li class=\"gnb_con_area\"><p class=\"new_title_up\"><span>"+getFundTypeNm(row.BCT_OPR_FC)+"</span></p>";
			result +="<li class=\"gnb_rate_area\">";
			result +="	<p class=\"rate_txt\"><strong>"+row.MNS3_EN_R+"%</strong> (3媛쒖썡)</p>";
			result +="</li>";
			result +="<li class=\"gnb_btn_area\"><p class=\"new_title_btn\">";
			result +="<a href=\"javascript:goProductDetailByPdCd('"+row.TRUST_FUND_CD.substr(0,6)+"','" + row.TRUST_FUND_CD.substr(6,6) + "','"+ row.TRUST_FUND_CD.substr(12) +"','J');\" class=\"btn_type31 point\"><span>媛��낇븯湲�</span></a>";
			result +="<a href=\"javascript:goProductDetailByPdCd('"+row.TRUST_FUND_CD.substr(0,6)+"','" + row.TRUST_FUND_CD.substr(6,6) + "','"+ row.TRUST_FUND_CD.substr(12) +"','D');\" class=\"btn_type31\"><span>�댁슜蹂닿린</span></a>";
			result +="</p></li>";   

			$("#slideMenu_fnr").append(result);
			result = "";

			break;

		}
	});
}

function MenuDatForFni(){
	var jexAjax = jex.createAjaxUtil("fnl_ebz_41030_loan_d001");
	
	jexAjax.set("PD_CD"    , "20280101001074001");
	jexAjax.set("VLD_VAL"  , "01");        //寃뚯떆�ъ씠�멸뎄遺꾩퐫�� (01:湲덉쑖�곹뭹紐�  06:�낅룄吏���  07:洹몃┛吏���  08:寃쎌＜吏���  09:�쒖닔��  14:�곸떊�꾩떆)
	
	jexAjax.addOption("loading", true);
	jexAjax.execute(function(dat) {
		
			var loanNm 		= dat.PD_NM; 						//��異쒕챸
			var loanGaeyo 	= dat.PD_SMRY_CN;  					//��異쒖긽�덇컻��
			var delbNo      = dat.DELB_NO;                      //�ъ쓽踰덊샇
			var loanObj 	= dat.LO_TRGET_CUST_CN;  			//��異쒕���
	        var loanLimit 	= dat.LO_LMT_CN;  					//��異쒗븳��
	        var loanRate 	= dat.LO_INRST_CN;  				//��異쒓툑由�

			var icon1    	= dat.POP_PD_YN;  				//��異쒓툑由�
			var icon2    	= dat.RCMD_PD_YN;  				//��異쒓툑由�
			var icon3    	= dat.NWGD_YN;  				//��異쒓툑由�

	        var pdImgPath 	= "/img/common/card/ebz_loan_test.jpg"; 			//�곹뭹�대�吏� 寃쎈줈
	        if (jex.null2Void(dat.IMG_FILE_NM) != "") {
	        	pdImgPath	= dat.IMG_FILE_NM;
	        }
			
	        /*var trData = "<h2 class=\"produtTit1\">" + loanNm + "</h2>"
	        	       + "<div class=\"msg_txt hb_10\">" + loanGaeyo + "</div>";
	        */
			var result = "";
			
			if (icon1 == "Y" || icon2 == "Y" || icon3 == "Y")
			{
				result += "<li class=\"gnb_icon_area\">";
			}
			if (icon1 == "Y"){
				result += "<span><img src=\"/img/common/bg/ebz_bg_product_ico1.gif\" alt=\"議고쉶�곸쐞\"></span> ";
			}
			if (icon3 == "Y"){
				result += "<span><img src=\"/img/common/bg/ebz_bg_product_ico2.gif\" alt=\"�좎긽��\"></span> ";
			}
			if (icon2 == "Y"){
				result += "<span><img src=\"/img/common/bg/ebz_bg_product_ico3.gif\" alt=\"�먮ℓ�곸쐞\"></span>";
			}			
			if (icon1 == "Y" || icon2 == "Y" || icon3 == "Y")
			{
				result += "</li>";
			}
			//result +="<li class=\"gnb_visual_area\"><a href=\"javascript:goProductDetailByPdCd('202801','010010','74001','D');\" title=\"" +loanNm + "\"><img src=\""+pdImgPath+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + loanNm + " �곹뭹 �대�吏�\"/></a></li>";
			result +="<li class=\"gnb_visual_area\"><img src=\""+pdImgPath+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + loanNm + " �곹뭹 �대�吏�\"/></li>";
			

			result += "<li class=\"gnb_title_area\"><p class=\"product_sub_txt\"><span>"+loanNm+"</span></p></li>";

			result += "<li class=\"gnb_con_area\"><p class=\"new_title_up\">";
			//result += "<a href=\"javascript:goProductDetailByPdCd('202801','010010','74001','D');\">"+jex.null2Void(loanGaeyo)+"</a></p></li>";
			result += ""+jex.null2Void(loanGaeyo)+"</p></li>";
			/*if (loanGaeyo.length > 50)
			{
				loanGaeyo = loanGaeyo.substr(0,50)+"...";
			}*/
			result +="<li class=\"gnb_btn_area\"><p class=\"new_title_btn\">";
			result +="<a href=\"javascript:goProductDetailByPdCd('202801','010010','74001','J');\" class=\"btn_type31 point\"><span>媛��낇븯湲�</span></a>";
			result +="<a href=\"javascript:goProductDetailByPdCd('202801','010010','74001','D');\" class=\"btn_type31\"><span>�댁슜蹂닿린</span></a></p></li> ";
			
			$("#slideMenu_fni").append(result);
			result = "";		
	});
}


function MenuDatForFns(){
	_HMP_PAGE_INDEX = 1;
	// 怨듯넻�낅젰遺� �뗮똿		
	var jexAjax     = "";
	
	jexAjax     = jex.createAjaxUtil("fnp_ebz_21010_depo_d001");
		
	var dpoDvCnt    = 0;
	
	//�곹뭹紐� 議고쉶 援щ텇肄붾뱶
	jexAjax.set("MALL_INQ_DVCD" 	, "99"); // all 
		
	/* 01:湲덉쑖紐� */
	jexAjax.set("VLD_VAL" 			, "01");
	
	//湲고� : �뺣젹諛⑹떇 �쒖꽌		
	jexAjax.set("SMRT_LNUP_DV", "Menu��10527012001060000");

	var objWebWorkComm = new Object();
	objWebWorkComm.INQ_SEQ = String(_HMP_PAGE_INDEX);		//議고쉶�� �섏씠吏�踰덊샇
	objWebWorkComm.INQ_NCSE = 1;					//�쒗럹�댁��� 議고쉶�� 嫄댁닔
	jexAjax.set("EBZ_WEB_WORK_COMM", objWebWorkComm);
	
	var jObj = {};
	jObj = dataCtrl.getObjData('FNM_DETAIL_DATA');
	
	if(jObj == null){
		jexAjax.addOption("loading", true);
	}
	
	//_TABLE.clearTbl(true);

	var divId="depo_b_";
	var result = "";

	jexAjax.execute(function(dat) { 			
		
		//_DATA_LIST = dat.REC1; //議고쉶�� 媛믪쓣 �꾩뿭蹂��섏뿉 ����
		
		var jsonData = dat.REC1;
		
		for(var i=0; i < jsonData.length; i++) {
			var row = jsonData[i];
			var addCls = "";
			
			if(row.POP_PD_YN  == "Y" || row.RCMD_PD_YN == "Y" || row.NWGD_YN    == "Y"){
				result += "<li class=\"gnb_icon_area\">";
			}
			if(row.POP_PD_YN  == "Y")
				result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico1.gif\" alt=\"議고쉶�곸쐞\"></span>";
			if(row.RCMD_PD_YN == "Y")
				result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico2.gif\" alt=\"�좎긽��\"></span>";
			if(row.NWGD_YN    == "Y")
				result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico3.gif\" alt=\"�먮ℓ�곸쐞\"></span>";
			
			if(row.POP_PD_YN  == "Y" || row.RCMD_PD_YN == "Y" || row.NWGD_YN    == "Y"){
				result += "</li>";
			}
			
			if (row.PD_NM.length > "13")
			{
				addCls = " long_line";
			}
			//result += "<li class=\"gnb_visual_area\"><p class=\"product_sub_txt\"><a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6) + "','" +row.PD_CD.substr(12) +"','D');\" title=\"" + row.PD_NM + "\"><img src=\""+row.IMG_FILE_NM+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.PD_NM + " �곹뭹 �대�吏�\"/></a></p></li>";
			//result += "<li class=\"gnb_title_area\"><p class=\"product_sub_txt\"><a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" +row.PD_CD.substr(6,6)+ "','"+ row.PD_CD.substr(12)+ "','D');\">" + row.PD_NM + "</a></p></li>";
			result += "<li class=\"gnb_visual_area\"><p class=\"product_sub_txt\"><img src=\""+row.IMG_FILE_NM+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.PD_NM + " �곹뭹 �대�吏�\"/></p></li>";
			result += "<li class=\"gnb_title_area\"><p class=\"product_sub_txt\">" + row.PD_NM + "</p></li>";

			if (jex.null2Void(row.PD_SMRY_CN) != "")
			{
				/*if (row.PD_SMRY_CN.length > 50)
				{
					row.PD_SMRY_CN = row.PD_SMRY_CN.substr(0,50)+"...";
				}*/
				result += "<li class=\"gnb_con_area\"><p class=\"new_title_up\"><span>"+jex.null2Void(row.PD_SMRY_CN)+"</span></p></li>";
			}
			result += "<li class=\"gnb_rate_area\">";
			
			if(jex.null2Void(row.ITN_MAX_RATE) == "" || jex.null2Void(row.ITN_MAX_RATE) == "-"){
				result += "	<p class=\"rate_txt\">理쒓퀬�댁옄�� �� <strong>-%</strong></p>";;
			}else{
				var maxRate = "";
				if(row.SITE_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN == "Y"){
					maxRate = jex.null2Void(row.ITN_MAX_RATE);
				}
				else if(row.WIC_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN != "Y"){
					maxRate = jex.null2Void(row.WIC_MAX_RATE);
				}
				else if(row.SMRT_BNK_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN != "Y"){
					maxRate = jex.null2Void(row.ITN_MAX_RATE);
				}
				result += "	<p class=\"rate_txt\">理쒓퀬�댁옄�� �� <strong>"+ maxRate +"%</strong></p>";
				result += "	<p>(1�꾧린以� �멸툑�⑸���)</p>";
			}				
			result += "</li>";
			result += "<li class=\"gnb_btn_area\"><p class=\"new_title_btn\">";
			if(row.SITE_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN == "Y"){
				result += "<a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6)+ "','"+ row.PD_CD.substr(12) +"','J')\" title=\"" + row.PD_NM + " 媛��낇븯湲�\" class=\"btn_type31 point\"><span>媛��낇븯湲�</span></a>";
			}
			result +="<a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6)+ "','"+ row.PD_CD.substr(12) +"','D');\" class=\"btn_type31\"><span>�댁슜蹂닿린</span></a>";
			result += "</p>";
			result +="</li>";
		}
		
		$("#slideMenu_fns").append(result);
	});
	return result;
}

function MenuDatForFsv(mnnm){
	_HMP_PAGE_INDEX = 1;
	// 怨듯넻�낅젰遺� �뗮똿		
	var jexAjax     = "";
	
	jexAjax     = jex.createAjaxUtil("fnp_ebz_21010_depo_d001");
		
	var dpoDvCnt    = 0;
	
	//�곹뭹紐� 議고쉶 援щ텇肄붾뱶
	jexAjax.set("MALL_INQ_DVCD" 	, "99"); // all 
		
	/* 01:湲덉쑖紐� */
	jexAjax.set("VLD_VAL" 			, "01");
	
	//湲고� : �뺣젹諛⑹떇 �쒖꽌		
//	jexAjax.set("SMRT_LNUP_DV", "Menu��10521001000712001");
	jexAjax.set("SMRT_LNUP_DV", "Menu��10511008001166001");	 

	var objWebWorkComm = new Object();
	objWebWorkComm.INQ_SEQ = String(_HMP_PAGE_INDEX);	//議고쉶�� �섏씠吏�踰덊샇
	objWebWorkComm.INQ_NCSE = 1;						//�쒗럹�댁��� 議고쉶�� 嫄댁닔
	jexAjax.set("EBZ_WEB_WORK_COMM", objWebWorkComm);
	
	var jObj = {};
	jObj = dataCtrl.getObjData('FNM_DETAIL_DATA');
	
	if(jObj == null){
		jexAjax.addOption("loading", true);
	}
	
	//_TABLE.clearTbl(true);

	var divId="depo_b_";
	var result = "";

	jexAjax.execute(function(dat) { 			
		
		//_DATA_LIST = dat.REC1; //議고쉶�� 媛믪쓣 �꾩뿭蹂��섏뿉 ����
		
		var jsonData = dat.REC1;
		
		for(var i=0; i < jsonData.length; i++) {
			var row = jsonData[i];
			var addCls = "";
			
			if(row.POP_PD_YN  == "Y" || row.RCMD_PD_YN == "Y" || row.NWGD_YN    == "Y"){
				result += "<li class=\"gnb_icon_area\">";
			}
			if(row.POP_PD_YN  == "Y")
				result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico1.gif\" alt=\"議고쉶�곸쐞\"></span>";
			if(row.RCMD_PD_YN == "Y")
				result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico2.gif\" alt=\"�좎긽��\"></span>";
			if(row.NWGD_YN    == "Y")
				result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico3.gif\" alt=\"�먮ℓ�곸쐞\"></span>";
			
			if(row.POP_PD_YN  == "Y" || row.RCMD_PD_YN == "Y" || row.NWGD_YN    == "Y"){
				result += "</li>";
			}
			
			if (row.PD_NM.length > "13")
			{
				addCls = " long_line";
			}
			//result += "<li class=\"gnb_visual_area\"><p class=\"product_sub_txt\"><a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6) + "','" +row.PD_CD.substr(12) +"','D');\" title=\"" + row.PD_NM + "\"><img src=\""+row.IMG_FILE_NM+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.PD_NM + " �곹뭹 �대�吏�\"/></a></p></li>";
			//result += "<li class=\"gnb_title_area\"><p class=\"product_sub_txt\"><a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" +row.PD_CD.substr(6,6)+ "','"+ row.PD_CD.substr(12)+ "','D');\">" + row.PD_NM + "</a></p></li>";
			result += "<li class=\"gnb_visual_area\"><p class=\"product_sub_txt\"><img src=\""+row.IMG_FILE_NM+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.PD_NM + " �곹뭹 �대�吏�\"/></p></li>";
			result += "<li class=\"gnb_title_area\"><p class=\"product_sub_txt\">" + row.PD_NM + "</p></li>";


			if (jex.null2Void(row.PD_SMRY_CN) != "")
			{
				/*if (row.PD_SMRY_CN.length > 50)
				{
					row.PD_SMRY_CN = row.PD_SMRY_CN.substr(0,50)+"...";
				}*/
				result += "<li class=\"gnb_con_area\"><p class=\"new_title_up\"><span>"+jex.null2Void(row.PD_SMRY_CN)+"</span></p></li>";
			}
			result += "<li class=\"gnb_rate_area\">";
			
			if(jex.null2Void(row.ITN_MAX_RATE) == "" || jex.null2Void(row.ITN_MAX_RATE) == "-"){
				result += "	<p class=\"rate_txt\">理쒓퀬�댁옄�� �� <strong>-%</strong></p>";;
			}else{
				var maxRate = "";
				if(row.SITE_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN == "Y"){
					maxRate = jex.null2Void(row.ITN_MAX_RATE);
				}
				else if(row.WIC_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN != "Y"){
					maxRate = jex.null2Void(row.WIC_MAX_RATE);
				}
				else if(row.SMRT_BNK_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN != "Y"){
					maxRate = jex.null2Void(row.ITN_MAX_RATE);
				}
				result += "	<p class=\"rate_txt\">理쒓퀬�댁옄�� �� <strong>"+ maxRate +"%</strong></p>";
				result += "	<p>(1�꾧린以� �멸툑�⑸���)</p>";
			}				
			result += "</li>";
			result += "<li class=\"gnb_btn_area\"><p class=\"new_title_btn\">";
			if(row.SITE_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN == "Y"){
				result += "<a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6)+ "','"+ row.PD_CD.substr(12) +"','J')\" title=\"" + row.PD_NM + " 媛��낇븯湲�\" class=\"btn_type31 point\"><span>媛��낇븯湲�</span></a>";
			}
			result +="<a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6)+ "','"+ row.PD_CD.substr(12) +"','D');\" class=\"btn_type31\"><span>�댁슜蹂닿린</span></a>";
			result += "</p>";
			result +="</li>";
		}
		
		$("#slideMenu_"+mnnm).html(result);
	});
	return result;
}

function MenuDatForHlp(mnnm){
	_HMP_PAGE_INDEX = 1;

	// 怨듯넻�낅젰遺� �뗮똿		
	var jexAjax     = "";
	
	jexAjax     = jex.createAjaxUtil("fnp_ebz_21010_depo_d001");
		
	var dpoDvCnt    = 0;
	
	//�곹뭹紐� 議고쉶 援щ텇肄붾뱶
	jexAjax.set("MALL_INQ_DVCD" 	, "99"); // all 
		
	// 寃뚯떆�ъ씠�� 01:湲덉쑖紐�
	jexAjax.set("VLD_VAL" 			, "01");
	
	//湲고� : �뺣젹諛⑹떇 �쒖꽌		
//	jexAjax.set("SMRT_LNUP_DV", "Menu��10521001000712001");
	jexAjax.set("SMRT_LNUP_DV", "Menu��10511008001166001");

	var objWebWorkComm = new Object();
	objWebWorkComm.INQ_SEQ = String(_HMP_PAGE_INDEX);	//議고쉶�� �섏씠吏�踰덊샇
	objWebWorkComm.INQ_NCSE = 1;						//�쒗럹�댁��� 議고쉶�� 嫄댁닔
	jexAjax.set("EBZ_WEB_WORK_COMM", objWebWorkComm);
	
	var jObj = {};
	jObj = dataCtrl.getObjData('FNM_DETAIL_DATA');
	
	if(jObj == null){
		jexAjax.addOption("loading", true);
	}
	
	var divId="depo_b_";
	var result = "";

	jexAjax.execute(function(dat) {
		var jsonData = dat.REC1;
		
		for(var i=0; i < jsonData.length; i++) {
			var row = jsonData[i];
			var addCls = "";
			
			if(row.POP_PD_YN  == "Y" || row.RCMD_PD_YN == "Y" || row.NWGD_YN    == "Y"){
				result += "<li class=\"gnb_icon_area\">";
			}
			if(row.POP_PD_YN  == "Y")
				result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico1.gif\" alt=\"議고쉶�곸쐞\"></span>";
			if(row.RCMD_PD_YN == "Y")
				result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico2.gif\" alt=\"�좎긽��\"></span>";
			if(row.NWGD_YN    == "Y")
				result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico3.gif\" alt=\"�먮ℓ�곸쐞\"></span>";
			
			if(row.POP_PD_YN  == "Y" || row.RCMD_PD_YN == "Y" || row.NWGD_YN    == "Y"){
				result += "</li>";
			}
			
			if (row.PD_NM.length > "13")
			{
				addCls = " long_line";
			}
			result += "<li class=\"gnb_visual_area\"><p class=\"product_sub_txt\"><img src=\""+row.IMG_FILE_NM+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.PD_NM + " �곹뭹 �대�吏�\"/></p></li>";
			result += "<li class=\"gnb_title_area\"><p class=\"product_sub_txt\">" + row.PD_NM + "</p></li>";


			if (jex.null2Void(row.PD_SMRY_CN) != "")
			{
				result += "<li class=\"gnb_con_area\"><p class=\"new_title_up\"><span>"+jex.null2Void(row.PD_SMRY_CN)+"</span></p></li>";
			}
			result += "<li class=\"gnb_rate_area\">";
			
			if(jex.null2Void(row.ITN_MAX_RATE) == "" || jex.null2Void(row.ITN_MAX_RATE) == "-"){
				result += "	<p class=\"rate_txt\">理쒓퀬�댁옄�� �� <strong>-%</strong></p>";;
			}else{
				var maxRate = "";
				if(row.SITE_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN == "Y"){
					maxRate = jex.null2Void(row.ITN_MAX_RATE);
				}
				else if(row.WIC_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN != "Y"){
					maxRate = jex.null2Void(row.WIC_MAX_RATE);
				}
				else if(row.SMRT_BNK_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN != "Y"){
					maxRate = jex.null2Void(row.ITN_MAX_RATE);
				}
				result += "	<p class=\"rate_txt\">理쒓퀬�댁옄�� �� <strong>"+ maxRate +"%</strong></p>";
				result += "	<p>(1�꾧린以� �멸툑�⑸���)</p>";
			}				
			result += "</li>";
			result += "<li class=\"gnb_btn_area\"><p class=\"new_title_btn\">";
			if(row.SITE_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN == "Y"){
				result += "<a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6)+ "','"+ row.PD_CD.substr(12) +"','J')\" title=\"" + row.PD_NM + " 媛��낇븯湲�\" class=\"btn_type31 point\"><span>媛��낇븯湲�</span></a>";
			}
			result +="<a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6)+ "','"+ row.PD_CD.substr(12) +"','D');\" class=\"btn_type31\"><span>�댁슜蹂닿린</span></a>";
			result += "</p>";
			result +="</li>";
		}
		
		$("#slideMenu_"+mnnm).html(result);
	});
	
	return result;
/*	硫붽��ㅻ퉬寃뚯씠�� 異붿쿇 �곹뭹 : 移대뱶
	var jexAjax = jex.createAjaxUtil("fnc_ebz_11030_card_d001");
	jexAjax.set("PD_CD", '40100101700865000');
	// 寃뚯떆�ъ씠�� 01:湲덉쑖紐�
	jexAjax.set("VLD_VAL" 			, '01' 		);

	var result = "";

	jexAjax.execute(function(dat) {
		
		if (dat.PD_NM.length > "13")
		{ addCls = " long_line"; }

		if(dat.POP_PD_YN  == "Y" || dat.RCMD_PD_YN == "Y" || dat.NWGD_YN    == "Y") result += "<li class=\"gnb_icon_area\">";
		if(dat.POP_PD_YN  == "Y") result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico1.gif\" alt=\"議고쉶�곸쐞\"></span>";
		if(dat.RCMD_PD_YN == "Y") result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico3.gif\" alt=\"�먮ℓ�곸쐞\"></span>";
		if(dat.NWGD_YN    == "Y") result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico2.gif\" alt=\"�좎긽��\"></span>";
		
		if(dat.POP_PD_YN  == "Y" || dat.RCMD_PD_YN == "Y" || dat.NWGD_YN    == "Y") result += "</li>";
		
		//result += "<li class=\"gnb_visual_area\"><a href=\"javascript:goProductDetailByPdCd('"+dat.PD_CD.substr(0,6)+"','" + dat.PD_CD.substr(6,6) + "','" +dat.PD_CD.substr(12) +"','D');\" title=\"" + dat.PD_NM + "\"><img src=\""+dat.IMG_FILE_NM1+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" onerror=\"this.style.visibility='hidden'\" alt=\"" + dat.PD_NM + " �곹뭹 �대�吏�\"/></a></li>";
		result += "<li class=\"gnb_visual_area\"><img src=\""+dat.IMG_FILE_NM1+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" onerror=\"this.style.visibility='hidden'\" alt=\"" + dat.PD_NM + " �곹뭹 �대�吏�\"/></li>";
		
		result += "<li class=\"gnb_title_area\"><p class=\"product_sub_txt\">"+dat.PD_NM+"<p></li>"
			   +  "<li class=\"gnb_con_area\"><p class=\"new_title_up\">"+dat.CARD_CONCPT_CN+"</p></li>";
		
		if(jex.null2Void(dat.CARD_PROF_AT_C_CN) != ""){
			result += "<li class=\"gnb_pro_icon_area\"><ul class=\"card_benefit_list\">";
			var codeArr = dat.CARD_PROF_AT_C_CN.split(":");

			for(var j = 0; j < codeArr.length; j++){
				//result += "	<li class=\""+benefitClassNm(codeArr[j],'2')+"\">"+benefitClassNm(codeArr[j],'1')+"</li>";
				result += "	<li class=\""+benefitClassNm(codeArr[j],'2')+"\"><span class=\"hidden\">"+benefitClassNm(codeArr[j],'1')+"</span></li>";
				//if (j == 2)
				if (j == 6)
				{
					break;
				}
			}
			result += "</ul></li>";
		}

		if(dat.SITE_JN_PSBLYN == "Y" && dat.ITN_JN_PSBLYN == "Y"){
			result +=  "<li class=\"gnb_btn_area\"><p class=\"new_title_btn\"><a href=\"javascript:goProductDetailByPdCd('"+dat.PD_CD.substr(0,6)+"','" + dat.PD_CD.substr(6,6) + "','"+ dat.PD_CD.substr(12) +"','J');\" title=\"" + dat.PD_NM + " \" class=\"btn_type31 point\"><span>媛��낇븯湲�</span></a><a href=\"javascript:goProductDetailByPdCd('"+dat.PD_CD.substr(0,6)+"','" + dat.PD_CD.substr(6,6) + "','"+ dat.PD_CD.substr(12) +"','D');\" class=\"btn_type31\"><span>�댁슜蹂닿린</span></a></p></li>"
		}

	$("#slideMenu_"+mnnm).html(result);
	});
	return result;
*/
}
function MenuDatForDgi(mnnm){
	_HMP_PAGE_INDEX = 1;
	// 怨듯넻�낅젰遺� �뗮똿		
	var jexAjax     = "";
	
	jexAjax     = jex.createAjaxUtil("fnp_ebz_21010_depo_d001");
		
	var dpoDvCnt    = 0;
	
	//�곹뭹紐� 議고쉶 援щ텇肄붾뱶
	jexAjax.set("MALL_INQ_DVCD" 	, "99"); // all 
		
	/* 01:湲덉쑖紐� */
	jexAjax.set("VLD_VAL" 			, "01");
	
	//湲고� : �뺣젹諛⑹떇 �쒖꽌		
//	jexAjax.set("SMRT_LNUP_DV", "Menu��10527012001060000");
	jexAjax.set("SMRT_LNUP_DV", "Menu��10511008001166001");

	var objWebWorkComm = new Object();
	objWebWorkComm.INQ_SEQ = String(_HMP_PAGE_INDEX);		//議고쉶�� �섏씠吏�踰덊샇
	objWebWorkComm.INQ_NCSE = 1;					//�쒗럹�댁��� 議고쉶�� 嫄댁닔
	jexAjax.set("EBZ_WEB_WORK_COMM", objWebWorkComm);
	
	var jObj = {};
	jObj = dataCtrl.getObjData('FNM_DETAIL_DATA');
	
	if(jObj == null){
		jexAjax.addOption("loading", true);
	}
	
	//_TABLE.clearTbl(true);

	var divId="depo_b_";
	var result = "";

	jexAjax.execute(function(dat) { 			
		
		//_DATA_LIST = dat.REC1; //議고쉶�� 媛믪쓣 �꾩뿭蹂��섏뿉 ����
		
		var jsonData = dat.REC1;
		
		for(var i=0; i < jsonData.length; i++) {
			var row = jsonData[i];
			var addCls = "";
			
			if(row.POP_PD_YN  == "Y" || row.RCMD_PD_YN == "Y" || row.NWGD_YN    == "Y"){
				result += "<li class=\"gnb_icon_area\">";
			}
			if(row.POP_PD_YN  == "Y")
				result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico1.gif\" alt=\"議고쉶�곸쐞\"></span>";
			if(row.RCMD_PD_YN == "Y")
				result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico2.gif\" alt=\"�좎긽��\"></span>";
			if(row.NWGD_YN    == "Y")
				result += "	<span><img src=\"/img/common/bg/ebz_bg_product_ico3.gif\" alt=\"�먮ℓ�곸쐞\"></span>";
			
			if(row.POP_PD_YN  == "Y" || row.RCMD_PD_YN == "Y" || row.NWGD_YN    == "Y"){
				result += "</li>";
			}
			
			if (row.PD_NM.length > "13")
			{
				addCls = " long_line";
			}
			//result += "<li class=\"gnb_visual_area\"><p class=\"product_sub_txt\"><a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6) + "','" +row.PD_CD.substr(12) +"','D');\" title=\"" + row.PD_NM + "\"><img src=\""+row.IMG_FILE_NM+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.PD_NM + " �곹뭹 �대�吏�\"/></a></p></li>";
			//result += "<li class=\"gnb_title_area\"><p class=\"product_sub_txt\"><a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" +row.PD_CD.substr(6,6)+ "','"+ row.PD_CD.substr(12)+ "','D');\">" + row.PD_NM + "</a></p></li>";
			result += "<li class=\"gnb_visual_area\"><p class=\"product_sub_txt\"><img src=\""+row.IMG_FILE_NM+"\" width=\"224\" height=\"142\" onerror=\"this.style.visibility='hidden'\" alt=\"" + row.PD_NM + " �곹뭹 �대�吏�\"/></p></li>";
			result += "<li class=\"gnb_title_area\"><p class=\"product_sub_txt\">" + row.PD_NM + "</p></li>";

			if (jex.null2Void(row.PD_SMRY_CN) != "")
			{
				/*if (row.PD_SMRY_CN.length > 50)
				{
					row.PD_SMRY_CN = row.PD_SMRY_CN.substr(0,50)+"...";
				}*/
				result += "<li class=\"gnb_con_area\"><p class=\"new_title_up\"><span>"+jex.null2Void(row.PD_SMRY_CN)+"</span></p></li>";
			}
			result += "<li class=\"gnb_rate_area\">";
			
			if(jex.null2Void(row.ITN_MAX_RATE) == "" || jex.null2Void(row.ITN_MAX_RATE) == "-"){
				result += "	<p class=\"rate_txt\">理쒓퀬�댁옄�� �� <strong>-%</strong></p>";;
			}else{
				var maxRate = "";
				if(row.SITE_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN == "Y"){
					maxRate = jex.null2Void(row.ITN_MAX_RATE);
				}
				else if(row.WIC_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN != "Y"){
					maxRate = jex.null2Void(row.WIC_MAX_RATE);
				}
				else if(row.SMRT_BNK_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN != "Y"){
					maxRate = jex.null2Void(row.ITN_MAX_RATE);
				}
				result += "	<p class=\"rate_txt\">理쒓퀬�댁옄�� �� <strong>"+ maxRate +"%</strong></p>";
				result += "	<p>(1�꾧린以� �멸툑�⑸���)</p>";
			}				
			result += "</li>";
			result += "<li class=\"gnb_btn_area\"><p class=\"new_title_btn\">";
			if(row.SITE_JN_PSBLYN == "Y" && row.ITN_JN_PSBLYN == "Y"){
				result += "<a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6)+ "','"+ row.PD_CD.substr(12) +"','J')\" title=\"" + row.PD_NM + " 媛��낇븯湲�\" class=\"btn_type31 point\"><span>媛��낇븯湲�</span></a>";
			}
			result +="<a href=\"javascript:goProductDetailByPdCd('"+row.PD_CD.substr(0,6)+"','" + row.PD_CD.substr(6,6)+ "','"+ row.PD_CD.substr(12) +"','D');\" class=\"btn_type31\"><span>�댁슜蹂닿린</span></a>";
			result += "</p>";
			result +="</li>";
		}
		
		$("#slideMenu_"+mnnm).html(result);
	});
	return result;
}


function linkMenuPageMain(linkValue,id,num,linkPage ,siteCd){
	dataCtrl.delObjData("MENU_LOCATION");

	var obj = {'MENU_LOCATION' 	: linkValue,
			   'MENU_DEPTH'		: '3',
			   'ID'				: id,
			   'NUM'			: num,
			   'LOCATION_PAGE'	: linkPage,
			   'BT_LINK'	    : 'TRUE',			   
			   'HP_BK'			:'HP'};		
	
	
	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));
	
	if (siteCd == 'cdd'){
		linkPage = _CodeMgr.getCodeMsg("CODE_URL", "1085") + linkPage;
	}else if (siteCd == 'cgr'){
		linkPage = _CodeMgr.getCodeMsg("CODE_URL", "1086") + linkPage;
	}else if (siteCd == 'cgj'){
		linkPage = _CodeMgr.getCodeMsg("CODE_URL", "1085") + linkPage;
	}else if (siteCd == 'dcn'){
		linkPage = _CodeMgr.getCodeMsg("CODE_URL", "1017") + linkPage;
	}else if (siteCd == 'msu'){
		linkPage = _CodeMgr.getCodeMsg("CODE_URL", "1018") + linkPage;
	}else if (siteCd == 'dlo'){
		linkPage = _CodeMgr.getCodeMsg("CODE_URL", "1020") + linkPage;
	}else if (siteCd == 'dfg'){
		linkPage = _CodeMgr.getCodeMsg("CODE_URL", "1011") + linkPage;
	}else{
		linkPage = _CodeMgr.getCodeMsg("CODE_URL", "1002") + linkPage;
	}
	
	location.href = linkPage;
}

function linkMenuPagePopup(linkValue,id,num,linkPage ,siteCd){
	dataCtrl.delObjData("MENU_LOCATION");

	var obj = {'MENU_LOCATION' 	: linkValue,
			   'MENU_DEPTH'		: '3',
			   'ID'				: id,
			   'NUM'			: num,
			   'LOCATION_PAGE'	: linkPage,
			   'BT_LINK'	    : 'TRUE',			   
			   'HP_BK'			:'HP'};		
	
	
	dataCtrl.setObjData("MENU_LOCATION",JSON.stringify(obj));
	
	if (siteCd == 'cdd'){
		linkPage = _CodeMgr.getCodeMsg("CODE_URL", "1085") + linkPage;
	}else if (siteCd == 'cgr'){
		linkPage = _CodeMgr.getCodeMsg("CODE_URL", "1086") + linkPage;
	}else if (siteCd == 'cgj'){
		linkPage = _CodeMgr.getCodeMsg("CODE_URL", "1085") + linkPage;
	}else if (siteCd == 'dcn'){
		linkPage = _CodeMgr.getCodeMsg("CODE_URL", "1017") + linkPage;
	}else if (siteCd == 'msu'){
		linkPage = _CodeMgr.getCodeMsg("CODE_URL", "1018") + linkPage;
	}else if (siteCd == 'dlo'){
		linkPage = _CodeMgr.getCodeMsg("CODE_URL", "1020") + linkPage;
	}else if (siteCd == 'dfg'){
		linkPage = _CodeMgr.getCodeMsg("CODE_URL", "1011") + linkPage;
	}else{
		linkPage = _CodeMgr.getCodeMsg("CODE_URL", "1002") + linkPage;
	}
	
	window.open(linkPage);
}