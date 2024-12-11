//스마트기기에서 TOP메뉴 접기위해서
if(isMobileAgentChk()){
	try{parent.topMenuClear();}catch(e){}
	try{parent.topmenu_close();}catch(e){}
	try{parent.parent.topMenuClear();}catch(e){}
	try{parent.parent.topmenu_close();}catch(e){}
}

var __TAB_FOCUS_OBJ = null;
var openLayerId = "";

function closeLayer(){
	openLayerId = "";
	$(".LayerPopWrap").removeClass('LayerPopWrap').addClass('popWrap');
	$('#layerPopId').hide();
	$(".popWrap").html("");
}

function isLayer(){
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		return false;   // IE     
	}else if(navigator.userAgent.indexOf("Trident/7") > 0) {
		return false;   // IE 
	}else if(navigator.userAgent.indexOf("Firefox") > 0) {
		return false;   // FF
	}else if(navigator.userAgent.indexOf("Opera") > 0) {
		return false;   // Opera
	}else if(navigator.userAgent.indexOf("Netscape") > 0) {
		return false;  	// Netscape
	}else if(navigator.userAgent.indexOf("Safari") > 0) {
		return false;  	// Safari
	}else if(navigator.userAgent.indexOf("Chrome") > 0) {
		return false;  	// Safari
	}else {
		return true;
	}
}

function openLayer(path,dat){
	openLayerId = "layerPopId";
	$("#layerPopId").load(path, function() {
		try {
			$(".popWrap").removeClass('popWrap').addClass('LayerPopWrap');
			$('#layerPopId').css('position', 'fixed');
			$('#layerPopId').show();
			setLayerDat(dat);
			$( "#layerPopId" ).draggable({
				handle: ".pop_head"
		    });
		}catch(e){
		}
		var temp = $("#layerPopId");
	    var iWidth = (($(window).width() - temp.outerWidth()) / 2) + $(window).scrollLeft();
		temp.css('left', iWidth+'px');
	});
}

//레이어 팝업 열기
function openTimeLayer(path,dat){
	JGM.grids = [];

	$("#timeLayerPopId").load(path, function() {
		try {
			$(".timepopWrap").removeClass('timepopWrap').addClass('timeLayerPopWrap');
			$("#timeLayerPopId").show();
			$("#timeLayerPopId").draggable({handle: ".pop_head"});
		}catch(e){
		}finally{
		}
		
		var temp = $("#timeLayerPopId");
		temp.css('position', 'absolute');
		temp.css('top', '30%');
		temp.css('left', (document.body.clientWidth/2)-140 + 'px');

		// 컨텐츠 DIV 탭포커스 가능하게 처리
		temp.attr('tabindex','-1');
		temp.focus();
	});
}

function closeTimeLayer(){
	$(".timeLayerPopWrap").removeClass('timeLayerPopWrap').addClass('timepopWrap');
	$('#timeLayerPopId').hide();
	$(".timepopWrap").html("");
	closeLayerWebboard();
	if( !jex.isNull(__TAB_FOCUS_OBJ) )
	{
		//console.error('__TAB_FOCUS_OBJ', $(__TAB_FOCUS_OBJ).text());
		$(__TAB_FOCUS_OBJ).focus();
		__TAB_FOCUS_OBJ = null;
	}
}

//카드 리스트
var card='';
function cardInfo(name){
	submenu=eval(name+".style");

	if(card!=submenu){
		if(card!=''){
			card.display='none';
		}
		
		submenu.display='block';
		card=submenu;
	}else{
		submenu.display='none';
		card='';
	}
}

//FAQ
jQuery(function($){
	var article = $('.FAQ>.faqBody>.article');
	
	article.addClass('hide');
	article.find('.answer,.assess').hide();
	article.eq(0).removeClass('hide');
	article.eq(0).find('.answer,.assess').show();
	
	$('.FAQ>.faqBody>.article>.question>a').click(function(){
		var myArticle = $(this).parents('.article:first');
		
		if(myArticle.hasClass('hide')){
			article.addClass('hide').removeClass('show');
			article.find('.answer,.assess').slideUp(100);
			myArticle.removeClass('hide').addClass('show');
			myArticle.find('.answer,.assess').slideDown(100);
		} else {
			myArticle.removeClass('show').addClass('hide');
			myArticle.find('.answer,.assess').slideUp(100);
		}
		
		return false;
	});
	
	$('.FAQ>.faqHeader>.showAll').click(function(){
		var hidden = $('.FAQ>.faqBody>.article.hide').length;
		
		if(hidden > 0){
			article.removeClass('hide').addClass('show');
			article.find('.answer,.assess').slideDown(100);
		} else {
			article.removeClass('show').addClass('hide');
			article.find('.answer,.assess').slideUp(100);
		}
	});

	try{
		$('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),area,[tabindex]').live('focus',function(e) {
			//console.error($(this).parents('.LayerPop, .timeLayerPop').length, jex.null2Void($(this).attr('class')).indexOf('LayerPop'));
			if( $(this).parents('.LayerPop, .timeLayerPop').length < 1 && jex.null2Void($(this).attr('class')).indexOf('LayerPop') < 0 )
			{
				//console.error($(this).text(), $(this).attr('id'));
				jex.getRootDom().__TAB_FOCUS_OBJ = this;
			}
		});
	}catch(e){}
});

//키패드
var focusKeypadObj = "";

function viewKeypad(keyFlagID, keyPadID, keyAreaID){
	if($("#"+keyFlagID).is(":checked")){
		$("#"+keyPadID+" input").each(function(){ $(this).attr("readonly",true); });
		focusKeypadObj = $("#"+keyPadID+" input:eq(0)");
		$("#"+keyAreaID).html(keypadHTML(keyFlagID, keyPadID, keyAreaID));
		$("#"+keyAreaID).find(".keypad_box").focus();
	}else{
		focusKeypadObjID = "";
		$("#"+keyPadID+" input").each(function(){ $(this).attr("readonly",false); });
		$("#"+keyAreaID).html("");
	}
}

function keypadHTML(keyFlagID, keyPadID, keyAreaID){
	var padHTML = '';
	padHTML += '<div class="keypad_box" style="position:absolute; display:block;">';
	padHTML += '	<h3 class="layerTit">마우스 입력기<a href="javascript:keypadClose(\''+keyFlagID+'\', \''+keyPadID+'\', \''+keyAreaID+'\');" class="pop_close" title="닫기">닫기</a></h3>';
	padHTML += '	<div class="keypad">';
	padHTML += '		<a href="javascript:keypadNum(\''+keyPadID+'\',1);" class="key1" title="1">1</a>';
	padHTML += '		<a href="javascript:keypadNum(\''+keyPadID+'\',3);" class="key3" title="3">3</a>';
	padHTML += '		<a href="javascript:keypadNum(\''+keyPadID+'\',0);" class="key0" title="0">0</a>';
	padHTML += '		<a href="javascript:keypadNum(\''+keyPadID+'\',9);" class="key9" title="9">9</a>';
	padHTML += '		<a href="javascript:keypadNum(\''+keyPadID+'\',4);" class="key4" title="4">4</a>';
	padHTML += '		<a href="javascript:keypadNum(\''+keyPadID+'\',7);" class="key7" title="7">7</a>';
	padHTML += '		<a href="javascript:keypadNum(\''+keyPadID+'\',2);" class="key2" title="2">2</a>';
	padHTML += '		<a href="javascript:keypadNum(\''+keyPadID+'\',8);" class="key8" title="8">8</a>';
	padHTML += '		<a href="javascript:keypadNum(\''+keyPadID+'\',5);" class="key5" title="5">5</a>';
	padHTML += '		<a href="javascript:keypadNum(\''+keyPadID+'\',6);" class="key6" title="6">6</a>';
	padHTML += '		<a href="javascript:keypadDelete(\''+keyPadID+'\');" class="key_del" title="한자삭제">한자삭제</a>';
	padHTML += '		<a href="javascript:keypadDeleteAll(\''+keyPadID+'\');" class="all_del" title="전체삭제">전체삭제</a>';
	padHTML += '	</div>';
	padHTML += '	<div class="pop_btn line">';
	padHTML += '		<span class="btn large action"><button type="button" onclick="keypadClose(\''+keyFlagID+'\', \''+keyPadID+'\', \''+keyAreaID+'\');">입력완료</button></span>';
	padHTML += '		<span class="btn large"><button type="button" onclick="keypadDeleteAll(\''+keyPadID+'\');">입력취소</button></span>';
	padHTML += '	</div>';
	padHTML += '</div>';
	return padHTML;
}

function keypadNum(keyPadID, NUM){
	if(focusKeypadObj==""){ 
		focusKeypadObj = $("#"+keyPadID+" input:eq(0)"); 
		}

	var EQcount = 0;
	var EQ = 0;
	
	$("#"+keyPadID+" input").each(function(){
		if($(this).get(0)==focusKeypadObj.get(0)){ EQ = EQcount; }
		EQcount++;
	});

	if(focusKeypadObj.val().length == parseInt(focusKeypadObj.attr("maxlength"),10) && $("#"+keyPadID+" input:eq("+(EQ+1)+")")){
		focusKeypadObj = $("#"+keyPadID+" input:eq("+(EQ+1)+")");
	}
	
	if(focusKeypadObj.val().length < parseInt(focusKeypadObj.attr("maxlength"),10)){
		focusKeypadObj.val(focusKeypadObj.val() + NUM);
	}
}

function keypadDelete(keyPadID){
	if(focusKeypadObj==""){ 
		focusKeypadObj = $("#"+keyPadID+" input:eq(0)"); 
	}

	var EQcount = 0;
	var EQ = 0;
	
	$("#"+keyPadID+" input").each(function(){
		if($(this).val()!=""){ EQ = EQcount; }
		EQcount++;
	});

	focusKeypadObj = $("#"+keyPadID+" input:eq("+EQ+")");

	if(focusKeypadObj.val().length == "" && $("#"+keyPadID+" input:eq("+(EQ-1)+")")){
		focusKeypadObj = $("#"+keyPadID+" input:eq("+(EQ-1)+")");
	}

	if(focusKeypadObj.val().length > 0){
		focusKeypadObj.val(focusKeypadObj.val().substring(0,focusKeypadObj.val().length-1));
	}
}

function keypadDeleteAll(keyPadID){
	$("#"+keyPadID+" input").each(function(){
		$(this).val("");
	});
	focusKeypadObj = $("#"+keyPadID+" input:eq(0)");
}

function keypadClose(keyFlagID, keyPadID, keyAreaID){
	$("#"+keyAreaID).html("");
}

function focusKeypad(keyFlagID, keyPadID, keyAreaID){
	if($("#"+keyFlagID).is(":checked")){
		$("#"+keyPadID+" input").each(function(){ $(this).attr("readonly",true); });
		focusKeypadObj = $("#"+keyPadID+" input:eq(0)");
		$("#"+keyAreaID).html(keypadHTML(keyFlagID, keyPadID, keyAreaID));
		$("#"+keyAreaID).find(".keypad_box").focus();
	}
}

//이체 레이어
var TransferHtml = '';
TransferHtml += '<div id="popTransfer" class="tLayerMenu" style="position:absolute; z-index:100; display:none; width:115px;">';
TransferHtml += '	<ul>';
TransferHtml += '		<li><a href="javascript:btnTransfer1(\'ACCOUNT\');" title="건별이체">건별이체</a></li>';
TransferHtml += '		<li><a href="javascript:btnTransfer2(\'ACCOUNT\');" title="다수계좌이체">다수계좌이체</a></li>';
TransferHtml += '		<li><a href="javascript:btnTransfer3(\'ACCOUNT\');" title="건별예약이체">건별예약이체</a></li>';
TransferHtml += '		<li class="btn_close"><span class="btn small"><button type="button" onclick="closeTransfer();" title="닫기">닫기</button></span></li>';
TransferHtml += '	</ul>';
TransferHtml += '</div>';

function fn_Exchange(){
	$("*[TransferAccount]").bind('click',function(){
		$("#popChecking").remove();
		$("#popChecking,#popTransfer,#popReserve,#popRepay,#popDeposit,#popSearch").hide();
		valAccount = $(this).attr("TransferAccount");
		TransferHtml = TransferHtml.replace(/ACCOUNT/gi, valAccount);
		$(this).parent().parent().append(TransferHtml);
		$("#popTransfer").css({"left" : $(this).position().left - 20});
		$("#popTransfer").css({"top" : $(this).position().top + 23});
		$("#popTransfer").fadeIn(100);
	});
}

function closeExchange(){
	$("#popTransfer").hide();
}

function fn_Transfer(){
	$("*[TransferAccount]").click(function(){
		$("#popChecking,#popTransfer").hide();
		valAccount = $(this).attr("TransferAccount");
		TransferHtml = TransferHtml.replace(/ACCOUNT/gi, valAccount);
		$(this).parent().parent().append(TransferHtml);
		$("#popTransfer").css({"left" : $(this).position().left -60});
		$("#popTransfer").css({"top" : $(this).position().top + 23});
		$("#popTransfer").fadeIn(100);
	});
}

function closeTransfer(){
	$("#popTransfer").hide();
}

//예약 레이어
var ReserveHtml = '';
ReserveHtml += '<div id="popReserve" class="tLayerMenu" style="position:absolute; z-index:100; display:none; width:115px;">';
ReserveHtml += '	<ul>';
ReserveHtml += '		<li><a href="javascript:btnReserve1(\'ACCOUNT\');" title="입금예약">입금예약</a></li>';
ReserveHtml += '		<li><a href="javascript:btnReserve2(\'ACCOUNT\');" title="출금예약">출금예약</a></li>';
ReserveHtml += '		<li class="btn_close"><span class="btn small"><button type="button" onclick="closeReserve();" title="닫기">닫기</button></span></li>';
ReserveHtml += '	</ul>';
ReserveHtml += '</div>';

function fn_Reserve(){
	$("*[ReserveAccount]").click(function(){
		$("#popChecking,#popReserve").hide();
		valAccount = $(this).attr("ReserveAccount");
		ReserveHtml = ReserveHtml.replace(/ACCOUNT/gi, valAccount);
		$(this).parent().parent().append(ReserveHtml);
		$("#popReserve").css({"left" : $(this).position().left - 10});
		$("#popReserve").css({"top" : $(this).position().top + 23});
		$("#popReserve").fadeIn(100);
	});
}

function closeReserve(){
	$("#popReserve").hide();
}

//상환 레이어
var RepayHtml = '';
RepayHtml += '<div id="popRepay" class="tLayerMenu" style="position:absolute; z-index:100; display:none; width:115px;">';
RepayHtml += '	<ul>';
RepayHtml += '		<li><a href="javascript:btnRepay1(\'ACCOUNT\');" title="대출금상환">대출금상환</a></li>';
RepayHtml += '		<li><a href="javascript:btnRepay2(\'ACCOUNT\');" title="대출이자납부">대출이자납부</a></li>';
RepayHtml += '		<li class="btn_close"><span class="btn small"><button type="button" onclick="closeRepay();" title="닫기">닫기</button></span></li>';
RepayHtml += '	</ul>';
RepayHtml += '</div>';

function fn_Reserve2(){
	$("*[ReserveAccount]").click(function(){
		$("#popChecking,#popReserve").hide();
		valAccount = $(this).attr("ReserveAccount");
		ReserveHtml = ReserveHtml.replace(/ACCOUNT/gi, valAccount);
		$(this).parent().append(ReserveHtml);
		$("#popReserve").css({"left" : $(this).position().left + 500});
		$("#popReserve").css({"top" : $(this).position().top + 23});
		$("#popReserve").fadeIn(100);
	});
}

function closeReserve(){
	$("#popReserve").hide();
}

//상환 레이어
var RepayHtml = '';
RepayHtml += '<div id="popRepay" class="tLayerMenu" style="position:absolute; z-index:100; display:none; width:115px;">';
RepayHtml += '	<ul>';
RepayHtml += '		<li><a href="javascript:btnRepay1(\'ACCOUNT\');" title="대출금상환">대출금상환</a></li>';
RepayHtml += '		<li><a href="javascript:btnRepay2(\'ACCOUNT\');" title="대출이자납부">대출이자납부</a></li>';
RepayHtml += '		<li class="btn_close"><span class="btn small"><button type="button" onclick="closeRepay();" title="닫기">닫기</button></span></li>';
RepayHtml += '	</ul>';
RepayHtml += '</div>';

function fn_Repay(){
	$("*[RepayAccount]").click(function(){
		$("#popChecking,#popRepay").hide();
		valAccount = $(this).attr("RepayAccount");
		RepayHtml = RepayHtml.replace(/ACCOUNT/gi, valAccount);
		$(this).parent().parent().append(RepayHtml);
		$("#popRepay").css({"left" : $(this).position().left - 30});
		$("#popRepay").css({"top" : $(this).position().top + 23});
		$("#popRepay").fadeIn(100);
	});
}

function closeRepay(){
	$("#popRepay").hide();
}

//입금 레이어
var DepositHtml = '';
DepositHtml += '<div id="popDeposit" class="tLayerMenu" style="position:absolute; z-index:100; display:none; width:115px;">';
DepositHtml += '	<ul>';
DepositHtml += '		<li><a href="javascript:btnDeposit1(\'ACCOUNT\');" title="입금이체">입금이체</a></li>';
DepositHtml += '		<li class="btn_close"><span class="btn small"><button type="button" onclick="closeDeposit();" title="닫기">닫기</button></span></li>';
DepositHtml += '	</ul>';
DepositHtml += '</div>';

function fn_Deposit(){
	$("*[DepositAccount]").click(function(){
		$("#popSearch,#popDeposit").hide();
		valAccount = $(this).attr("DepositAccount");
		DepositHtml = DepositHtml.replace(/ACCOUNT/gi, valAccount);
		$(this).parent().append(DepositHtml);
		$("#popDeposit").css({"left" : $(this).position().left - 60});
		$("#popDeposit").css({"top" : $(this).position().top + 23});
		$("#popDeposit").fadeIn(100);
	});
}

function closeDeposit(){
	$("#popDeposit").hide();
}

//조회 레이어
var SearchHtml = '';
SearchHtml += '<div id="popSearch" class="tLayerMenu" style="position:absolute; z-index:100; display:none; width:155px;">';
SearchHtml += '	<ul>';
SearchHtml += '		<li><a href="javascript:btnSearch1(\'ACCOUNT\');" title="거래내역조회">거래내역조회</a></li>';
SearchHtml += '		<li><a href="javascript:btnSearch2(\'ACCOUNT\');" title="계좌상세조회">계좌상세조회</a></li>';
SearchHtml += '		<li class="btn_close"><span class="btn small"><button type="button" onclick="closeSearch();" title="닫기">닫기</button></span></li>';
SearchHtml += '	</ul>';
SearchHtml += '</div>';

function fn_Search(){
	$("*[SearchAccount]").click(function(){
		$("#popSearch,#popDeposit").hide();
		valAccount = $(this).attr("SearchAccount");
		SearchHtml = SearchHtml.replace(/ACCOUNT/gi, valAccount);
		$(this).parent().append(SearchHtml);
		$("#popSearch").css({"left" : $(this).position().left - 10});
		$("#popSearch").css({"top" : $(this).position().top + 15});
		$("#popSearch").fadeIn(100);
	});
}

function closeSearch(){
	$("#popSearch").hide();
}

//기부 계좌번호 조회 레이어
var DonateHtml = '';
DonateHtml += '<div id="popDonate" class="tLayerMenu" style="position:absolute; z-index:100; display:none; width:155px;">';
DonateHtml += '	<ul>';
DonateHtml += '		<li><a href="javascript:btnDonate1(\'ACCOUNT\');" title="거래내역조회">거래내역조회</a></li>';
DonateHtml += '		<li><a href="javascript:btnDonate2(\'ACCOUNT\');" title="계좌상세조회">계좌상세조회</a></li>';
DonateHtml += '		<li class="btn_close"><span class="btn small"><button type="button" onclick="closeDonate();" title="닫기">닫기</button></span></li>';
DonateHtml += '	</ul>';
DonateHtml += '</div>';

function fn_Donate(){
	$("*[DonateAccount]").click(function(){
		$("#popDonate,#popTransfer,#popReserve,#popRepay,#popDeposit,#popSearch").hide();
		valAccount = $(this).attr("DonateAccount");
		DonateHtml = DonateHtml.replace(/ACCOUNT/gi, valAccount);
		$(this).parent().append(DonateHtml);
		$("#popDonate").css({"left" : $(this).position().left - 10});
		$("#popDonate").css({"top" : $(this).position().top + 15});
		$("#popDonate").fadeIn(100);
	});
}

function closeDonate(){
	$("#popDonate").hide();
}

//계좌번호 조회 레이어
function fn_Checking(){
	var CheckingHtml = '';
	CheckingHtml += '<div id="popChecking" class="tLayerMenu" style="position:absolute; z-index:100; display:none; width:155px;">';
	CheckingHtml += '	<ul>';
	CheckingHtml += '		<li><a href="javascript:transSearch(\'ACCOUNT\',0);" title="최근거래내역(당일)">최근거래내역(당일)</a></li>';
	CheckingHtml += '		<li><a href="javascript:transSearch(\'ACCOUNT\',1);" title="최근거래내역(3개월)">최근거래내역(3개월)</a></li>';
	CheckingHtml += '		<li><a href="javascript:transSearch(\'ACCOUNT\',2);" title="최근거래내역(6개월)">최근거래내역(6개월)</a></li>';
	CheckingHtml += '		<li><a href="javascript:btnDetailSearch(\'ACCOUNT\');" title="계좌상세조회">계좌상세조회</a></li>';
	CheckingHtml += '		<li class="btn_close"><span class="btn small"><button type="button" onclick="closeChecking();" title="닫기">닫기</button></span></li>';
	CheckingHtml += '	</ul>';
	CheckingHtml += '</div>';
	$("*[CheckAccount]").bind('click',function(){
		$("#popChecking").remove();
		$("#popChecking,#popTransfer,#popReserve,#popRepay,#popDeposit,#popSearch").hide();
		valAccount = $(this).attr("CheckAccount");
		CheckingHtml = CheckingHtml.replace(/ACCOUNT/gi, valAccount);
		$("#resultView").append(CheckingHtml);
		$("#popChecking").css({"left" : $(this).position().left + 10});
		$("#popChecking").css({"top" : $(this).position().top + 15});
		$("#popChecking").fadeIn(100);
		CheckingHtml='';
	});
}

//계좌번호 조회 레이어
function fn_Checking2(){
	var CheckingHtml = '';
	CheckingHtml += '<div id="popChecking" class="tLayerMenu" style="position:absolute; z-index:100; display:none; width:155px;">';
	CheckingHtml += '	<ul>';
	CheckingHtml += '		<li><a href="javascript:transSearch(\'ACCOUNT\',0);" title="최근거래내역(당일)">최근거래내역(당일)</a></li>';
	CheckingHtml += '		<li><a href="javascript:transSearch(\'ACCOUNT\',1);" title="최근거래내역(3개월)">최근거래내역(3개월)</a></li>';
	CheckingHtml += '		<li><a href="javascript:transSearch(\'ACCOUNT\',2);" title="최근거래내역(6개월)">최근거래내역(6개월)</a></li>';
	CheckingHtml += '		<li><a href="javascript:btnDetailSearch(\'ACCOUNT\');" title="계좌상세조회">계좌상세조회</a></li>';
	CheckingHtml += '		<li class="btn_close"><span class="btn small"><button type="button" onclick="closeChecking();" title="닫기">닫기</button></span></li>';
	CheckingHtml += '	</ul>';
	CheckingHtml += '</div>';
	$("*[CheckAccount]").bind('click',function(){
		$("#popChecking").remove();
		$("#popChecking,#popTransfer,#popReserve,#popRepay,#popDeposit,#popSearch").hide();
		valAccount = $(this).attr("CheckAccount");
		CheckingHtml = CheckingHtml.replace(/ACCOUNT/gi, valAccount);
		$("#resultView").append(CheckingHtml);
		$("#popChecking").css({"left" : $(this).position().left - 10});
		$("#popChecking").css({"top" : $(this).position().top + 283});
		$("#popChecking").fadeIn(100);
		CheckingHtml='';
	});
}

//계좌번호 조회 레이어
function fn_Checking3(){
	var CheckingHtml = '';
	CheckingHtml += '<div id="popChecking" class="tLayerMenu" style="position:absolute; z-index:100; display:none; width:155px;">';
	CheckingHtml += '	<ul>';
	CheckingHtml += '		<li><a href="javascript:transSearch(\'ACCOUNT\',0);" title="최근거래내역(당일)">최근거래내역(당일)</a></li>';
	CheckingHtml += '		<li><a href="javascript:transSearch(\'ACCOUNT\',1);" title="최근거래내역(3개월)">최근거래내역(3개월)</a></li>';
	CheckingHtml += '		<li><a href="javascript:transSearch(\'ACCOUNT\',2);" title="최근거래내역(6개월)">최근거래내역(6개월)</a></li>';
	CheckingHtml += '		<li><a href="javascript:btnDetailSearch(\'ACCOUNT\');" title="계좌상세조회">계좌상세조회</a></li>';
	CheckingHtml += '		<li class="btn_close"><span class="btn small"><button type="button" onclick="closeChecking();" title="닫기">닫기</button></span></li>';
	CheckingHtml += '	</ul>';
	CheckingHtml += '</div>';
	$("*[CheckAccount]").bind('click',function(){
		$("#popChecking").remove();
		$("#popChecking,#popTransfer,#popReserve,#popRepay,#popDeposit,#popSearch").hide();
		valAccount = $(this).attr("CheckAccount");
		CheckingHtml = CheckingHtml.replace(/ACCOUNT/gi, valAccount);
		$("#resultView").append(CheckingHtml);
		$("#popChecking").css({"left" : $(this).position().left - 10});
		$("#popChecking").css({"top" : $(this).position().top + 200});
		$("#popChecking").fadeIn(100);
		CheckingHtml='';
	});
}

function closeChecking(){
	$("#popChecking").hide();
}

//우편번호 팝업레이어 호출
function openZipCodeAddr(){
	parent.openLayer("com_ebz_01_postzip.act");
}

function openWindow(anchor, options) {
	var args = '';
 
	if (typeof(options) == 'undefined') { 
		var options = new Object(); 
	}
	
	if (typeof(options.name) == 'undefined') { 
		options.name = 'win' + Math.round(Math.random()*100000); 
	}
 
	if (typeof(options.height) != 'undefined' && typeof(options.fullscreen) == 'undefined') {
		args += "height=" + options.height + ",";
	}
 
	if (typeof(options.width) != 'undefined' && typeof(options.fullscreen) == 'undefined') {
		args += "width=" + options.width + ",";
	}
 
	if (typeof(options.fullscreen) != 'undefined') {
		args += "width=" + screen.availWidth + ",";
		args += "height=" + screen.availHeight + ",";
	}
 
	if (typeof(options.center) == 'undefined') {
		options.x = 0;
		options.y = 0;
		args += "screenx=" + options.x + ",";
		args += "screeny=" + options.y + ",";
		args += "left=" + options.x + ",";
		args += "top=" + options.y + ",";
	}
 
	if (typeof(options.center) != 'undefined' && typeof(options.fullscreen) == 'undefined') {
		options.y=Math.floor((screen.availHeight-(options.height || screen.height))/2)-(screen.height-screen.availHeight);
		options.x=Math.floor((screen.availWidth-(options.width || screen.width))/2)-(screen.width-screen.availWidth);
		args += "screenx=" + options.x + ",";
		args += "screeny=" + options.y + ",";
		args += "left=" + options.x + ",";
		args += "top=" + options.y + ",";
	}
 
	if (typeof(options.scrollbars) != 'undefined') { args += "scrollbars=1,"; }
	if (typeof(options.menubar) != 'undefined') { args += "menubar=1,"; }
	if (typeof(options.locationbar) != 'undefined') { args += "location=1,"; }
	if (typeof(options.resizable) != 'undefined') { args += "resizable=1,"; }
 
	window.open(anchor, options.name, args);
	
	return false;
}

//금융상품몰 서브 메인 이벤트 탭		
jQuery(function($){
	var tab_list = $('div.tab01.list');
	var tab_list_i = tab_list.find('>ul>li');
	
	tab_list.removeClass('jx');
	tab_list_i.find('>ul').hide();
	tab_list.find('>ul>li[class=active]').find('>ul').show();
	tab_list.css('height', tab_list.find('>ul>li.active>ul').height()+40);
	
	function listTabMenuToggle(event){
		var t = $(this);
		tab_list_i.find('>ul').hide();
		t.next('ul').show();
		tab_list_i.removeClass('active');
		t.parent('li').addClass('active');
		tab_list.css('height', t.next('ul').height()+40);
		return false;
	}
	
	tab_list_i.find('>a[href=#]').click(listTabMenuToggle).focus(listTabMenuToggle);
});


//**************************************************************************************************************************************************
//* 모바일웹 입력 관련(가상키패드 또는 문자입력기)
//**************************************************************************************************************************************************
$(document).ready(function(){
	try{ 
		if(isMobileAgentChk()){
			closeLayerWebboard();
			$("textarea").css("overflow-y","hidden");
		}
	}catch(e){
	}

	try{ 
		$('#timeLayerPopId',parent.document).hide();
		$('.timepopWrap'   ,parent.document).html('');
	}catch(e){
	}
});

var webboard_input;
var webboard_type;
var webboard_minlength;
var webboard_maxlength;
var webboard_focus = '';

if(isMobileAgentChk() && /dgb.co.kr/.test((document.URL).toLowerCase())){
	$('textarea').live('mouseover', function(e){
		try{
			$(this).css("height",$(this).attr("scrollHeight"));
			iframeReSize();
			$(this).focus();
	  	}catch(e){
	  	}
	});

	$('button,a').live('click', function(){
		webboard_focus = $(this).attr('id');
	});
	
	var eventType1 = 'focus click';
	var eventType2 = 'click';
	
	if(/iPod|iPad|iPhone/.test(navigator.userAgent)){
		eventType1 = 'mouseover focus';
		eventType2 = 'mouseover';
	}
	
	$('.jgrid-notEditable').live(eventType1, function(e){
		closeLayerWebboard();
	});
	
	$('input').live(eventType1, function(e){
		try{
			if($(this).attr('id')=='srhInput'){
				$(this).removeClass('srh_input');
			}
		}catch(e){
		}

		try{
			if($(this).attr('filter')==undefined && /text|password/.test($(this).attr('type')) && $(this).attr('id')!='boardInput' && $(this).attr('id')!='boardhiddn'){
				closeLayerWebboard();

				webboard_input = $(this);
				webboard_input.blur();

				if(e.type==eventType2){
					//키보드타입
					if(webboard_input.attr('data-input')==undefined){
						webboard_type = '';
					}else{
						try{
							if(/num|comma|date|ssn|corp|biz|acc|card/.test(webboard_input.attr('data-input').toLowerCase())){
								webboard_type='N';
							}else{
								webboard_type='X';
							}

							var typeA= 'X';
							
							if(/onlyeng|engnum|koreng|ime|mail|upper2lower/.test(webboard_input.attr('data-input').toLowerCase())){
								typeA= 'a';
							}
						
							if(/ime-mode/.test(webboard_input.attr('style').toLowerCase()) && /disabled|inactive/.test(webboard_input.attr('style').toLowerCase())){
								typeA= 'a';
							}

							if(/engnumrep|lower2upper/.test(webboard_input.attr('data-input').toLowerCase())){
								typeA='A';
							}
							
							if(/toUpperCase/.test(webboard_input.attr('onkeyup')) || /toUpperCase/.test(webboard_input.attr('onkeydown'))){
								typeA='A';
							}
							
							webboard_type+=typeA;
							
							if(/special|mail/.test(webboard_input.attr('data-input').toLowerCase())){
								webboard_type+='S';
							}else{
								webboard_type+='X';
							}
							
							if(/space/.test(webboard_input.attr('data-input').toLowerCase())){
								webboard_type+='S';
							}else{
								webboard_type+='X';
							}
							
							if(/kor/.test(webboard_input.attr('data-input').toLowerCase())){
								webboard_type = '';
							}else if(/onlynum|comma|date|ssn|corp|biz|acc|card/.test(webboard_input.attr('data-input').toLowerCase())){
								webboard_type='N';
							}
							
							if(webboard_type=='XXXX'){
								webboard_type='';
							}
						}catch(e){
							webboard_type = '';
						}
					}

					//비밀번호필드 여부
					var webboard_pswd = '';
					
					if(webboard_input.attr('type')=='password'){
						webboard_pswd = 'Y';
					}
					
					//최대길이
					if(webboard_input.attr('maxlength')==undefined){
						webboard_maxlength = 999;
					}else{
						webboard_maxlength = webboard_input.attr('maxlength');
					}
		
					//최소길이
					if(webboard_input.attr('minlength')==undefined){
						webboard_minlength = 0;
					}else{
						webboard_minlength = webboard_input.attr('minlength');
					}
				
					//호출URL(파라메타포함)
					var webboard_para = '/hmp/com/com_webboard.jsp?PSWD='+webboard_pswd+'&LANG=DF';
					
					//키보드 화면위치
					var top_gap = 28;
				    var top_pos = webboard_input.offset().top  + top_gap;
					var lef_pos = (parseInt(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)-570)/2;
					
					if(lef_pos < 0){
						lef_pos = 100;
					}
		
					//키보드호출(레이어없으면 생성)
					if($('#layerBoardId').length==0){
						var inputTargetElement = document.createElement('div');
						inputTargetElement.setAttribute('tagName', 'div');
						inputTargetElement.setAttribute('id'  	 , 'layerBoardId');
						inputTargetElement.setAttribute('class'	 , 'LayerPop');
					
						document.body.appendChild(inputTargetElement);
	
						$('#layerBoardId').css('height' , 'auto');
						$('#layerBoardId').css('z-index', 20001);
					}

					openLayerWebboard(webboard_para, {'top':top_pos, 'left':lef_pos, 'ID':webboard_input.attr('id')});
				}
			}else if($(this).attr('filter')!=undefined && /text|password/.test($(this).attr('type')) && /on|off/.test($(this).attr('enc'))){
				closeLayerWebboard();
			}
	  	}catch(e){
	  	}
	});
}

function openLayerWebboard(path,dat){
	try{
		layerPreSize();
	}catch(e){
	}

	$('#layerBoardId').load(path, function() {
		top_pos = dat.top;
		lef_pos = dat.left;
		
		if((preIfrHeight1-top_pos)<290 && top_pos>300){
			layerOpenAfterResize();
		}else{
			reSeizDvcd1 = '';
			reSeizDvcd2 = '';
		}

		try {
			$('.popWrap',$('#layerBoardId')).removeClass('popWrap').addClass('LayerPopWrap');
			$('#layerBoardId').css('position', 'absolute');
			$('#layerBoardId').css('top'     , top_pos+'px');
			//$('#layerBoardId').css('left'    , lef_pos+'px');

			setLayerDat(dat);
		}catch(e){
		}

		$('#layerBoardId').show();
	});
}

var preIfrHeight1 = 0;
var preIfrHeight2 = 0;
var webboardHeight= 200;      
var reSeizDvcd1   = '';      
var reSeizDvcd2   = '';      

function layerOpenAfterResize(){
	try{
		if(preIfrHeight1 > 500){
			var parentObj1 = $(window.parent.document);
		    var parentObj2 = $(window.parent.parent.document);
	
			if($(parentObj1).find("#ifr").attr("id") == "ifr"){
				$(parentObj1).find("#ifr").attr("height", (preIfrHeight1-0+webboardHeight)+"px");
				reSeizDvcd1 = '1';
			}

			if($(parentObj2).find("#ifr").attr("id") == "ifr"){
				$(parentObj2).find("#ifr").attr("height", (preIfrHeight2-0+webboardHeight)+"px");
				reSeizDvcd2 = '1';
			}
		}
	}catch(e){
	}
}

function layerCloseAfterResize(){
	try{
		if(reSeizDvcd1 == '1'){
			var parentObj1 = $(window.parent.document);
	
			if($(parentObj1).find('#ifr').attr('id') == 'ifr'){
				$(parentObj1).find('#ifr').attr('height', preIfrHeight1+'px');
			}
		}

		if(reSeizDvcd2 == '1'){
		    var parentObj2 = $(window.parent.parent.document);
	
			if($(parentObj2).find('#ifr').attr('id') == 'ifr'){
				$(parentObj2).find('#ifr').attr('height', preIfrHeight2+'px');
			}
		}
	}catch(e){
	}
}

function layerPreSize(){
	var parentObj1 = $(window.parent.document);
    var parentObj2 = $(window.parent.parent.document);

	if($(parentObj1).find('#ifr').attr('id') == 'ifr'){
		preIfrHeight1 = $(parentObj1).find("#ifr").attr('height').replace('px','');
	}

	if($(parentObj2).find('#ifr').attr('id') == 'ifr'){
		preIfrHeight2 = $(parentObj2).find('#ifr').attr("height").replace('px','');
	}
}

function closeLayerWebboard(){
	try {
		if($('#layerBoardId').length>0){
			$('#layerBoardId').remove();
		}
	}catch(e){
	}

	try {
		if($('#layerBoardId',parent.document).length>0){
			$('#layerBoardId',parent.document).remove();
		}
	}catch(e){
	}

	try {
		if($('#layerBoardId',$("#ifr").contents()).length>0){
			$('#layerBoardId',$("#ifr").contents()).remove();
		}
		if($('#layerBoardId',$("#ifr1").contents()).length>0){
			$('#layerBoardId',$("#ifr1").contents()).remove();
		}
	}catch(e){
	}
}

function layerTopPosition(focusId){
	closeLayerWebboard();
	
	try{
		preIfrHeight = getDocHeight();
	}catch(e){
	}
	
	var top_gap = -70;
	
	try{
		if(parseInt(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)>750){
			top_gap = 100;
		}
		
		if((window.name).indexOf('ifr')==-1 && (window.name).indexOf('about')==-1 && (window.name).indexOf('company')==-1){
			top_gap = 28;
		}
		
		if(activeid==''){
			activeid = focusId;
		}

		if(activeid=='' && isMobileAgentChk()){
			try{
				if($(window.document).find('#ifr').length>0){
					activeid = ifr.webboard_focus;
				}else if($(window.document).find('#ifr1').length>0){
					activeid = ifr1.webboard_focus;
				}else if($(window.document).find('#company').length>0){
					activeid = company.webboard_focus;
				}else if($(window.document).find('#about').length>0){
					activeid = about.webboard_focus;
				}
				if(activeid == ''||activeid == undefined){
					activeid = webboard_focus;
				}
			}catch(e){
			}
		}

		try{
			top_gap = $('#'+activeid).offset().top + top_gap;
		}catch(e){
			top_gap = $('#'+activeid, $('#'+activeid1)[0].contentWindow.document).offset().top + 150;
		}
		
		if(activeid.indexOf('DetailSearchGS') > -1){
			top_gap = top_gap-37;
		}
	}catch(e){
		top_gap = $(jex.getRootDom()).scrollTop();

		if( top_gap > 140 ) {
			top_gap = top_gap-70;
		}
	}
	
	try{
		if(!isMobileAgentChk() && top_gap>700 && $(window.document).find('.jgrid-viewport').length>0){
			if(activeid.indexOf('accMemo') > -1){
				top_gap = 400;
			}else{
				top_gap = 100;
			}
		}
	}catch(e){
		top_gap = 100;
	}
	
	return top_gap;
}

//레이어 팝업에 focus 주기
function layerFocus(){
    if($(".LayerPopWrap").length>0) {
        $(".LayerPopWrap").focus();
    }
}

//이전페이지의 focus id 찾기
var activeid  = "";
var activeid1 = "";
function isfocusActive(){
	activeid  = "";
	activeid1 = "";
	
	try{
		activeid = document.activeElement.id;
	}catch(e){
		activeid = "";
	}

	try{
		if(activeid == "ifr" || activeid == "ifr1"  || activeid == "company" || activeid == "about"){
			activeid1 = activeid;
			activeid  = $('#'+activeid1)[0].contentWindow.document.activeElement.id;
		}
	}catch(e){
	}
}
function openIFrameLayer(layerId,path,dat,focusId){
    isfocusActive();

    var bodyObj = document.body;

    //레이어 2개 띄어지면 position문제로 처음 레이어 제거
    if($('.LayerPop').length > 0) {
        $('.LayerPop').remove();
    }
    
    var divObj = "<div id='"+layerId+"' class='LayerPop'></div>";

    if( $("#"+layerId).length == 0 ){
        $(bodyObj).append(divObj);
    }

    if( !jex.isNull(dat)){
        if( !jex.isNull(dat.OPEN)){
            dataCtrl.setObjData("PAY_SESS_OBJ", JSON.stringify(dat));
        }
    }

    $("#"+layerId).load( path ,function() {
        var iHeight = layerTopPosition(focusId);
        
        $(".popWrap").removeClass('popWrap').addClass('LayerPopWrap');
        $("#"+layerId).css('position', 'absolute');
        $("#"+layerId).css('height'  , 'auto');
        $('#'+layerId).css('top'     , iHeight+'px');

        try {
            fnSetSummary('L');
            try{ setLayerDat(dat, iHeight, focusId); }catch(e){}
            
            $(".LayerPopWrap").css({"top":"0px", "margin-top":"100px"});
        }catch(e){
        }
    });

    setTimeout('layerFocus();',1000);
}

function closeIFrameLayer(layerId, focusId){
    closeLayerWebboard();
    
    $("#"+layerId).remove();

    try{
        if(activeid != null && activeid != "" && activeid != undefined && activeid != "undefined"){
            if(activeid1 == "ifr" || activeid1 == "ifr1"  || activeid1 == "company" || activeid1 == "about"){
                $("#"+activeid, $('#'+activeid1)[0].contentWindow.document).focus();
            }else{
                $("#"+activeid).focus();
            }
        }else{
            if( !jex.isNull(focusId) && !isMobileAgentChk()){
                $("#"+focusId).focus();
            }
        }
    }catch(e){
    }
    
    layerCloseAfterResize();
}
function openLayer2(id,path,dat){
    var bodyObj = document.body;
    var divObj = "<div id='"+id+"' class='LayerPop'></div>";

    if( $(top.document).find("#"+id).length == 0 ){
        $(bodyObj).append(divObj);
    }
    $("#"+id).load(path, function() {
        try {
            $(".popWrap").removeClass('popWrap').addClass('LayerPopWrap');
            $('#'+id).css('position', 'fixed');
            $('#'+id).css('height'  , 'auto');
            setLayerDat(dat);
        }catch(e){
        }

        var temp = $("#"+id);
        //temp.css("left", Math.max(0, ((top.$(window).width()  - $(top.document).find("#"+id + " .LayerPopWrap").outerWidth())  / 2)) + "px");
        temp.css("top",  Math.max(0, ((top.$(window).height() - $(top.document).find("#"+id + " .LayerPopWrap").outerHeight()) / 2)) + "px");
    });
}