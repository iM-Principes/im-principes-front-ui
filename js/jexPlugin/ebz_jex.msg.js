var _msgLayerId = "";
var _errLayerId = "";
var _ismainFrm  = "";
var _activeId   = "";

(function() {
//Message 정의..
var _JexMessage = JexMsg.extend({
		init:function() {
			this._super();
			this.msgCloseFn 	= null;
			this.dfltFnStr 		= "closeErrorLayer();";
			this.callBackFnStr 	= "closeErrorLayerCallBack();";
			this.langStrObj		= {};
			this.langStrInfo();
			
			try{
				var parentObj1 = $(window.parent.document);
			    var parentObj2 = $(window.parent.parent.document);
		
				if($(parentObj1).find("#ifr").attr("id") == "ifr"){
					_ismainFrm = '0';
				}

				if($(parentObj2).find("#ifr").attr("id") == "ifr"){
					_ismainFrm = '0';
				}
			}catch(e){
			}
			
		},
		langStrInfo : function (){
			var langKrObj = {};
			var langEnObj = {};
			var langZhObj = {};
			
			langKrObj.STR1 = "안내메세지";
			langKrObj.STR2 = "닫기";
			langKrObj.STR3 = "알림코드";
			langKrObj.STR4 = "확인";
			langKrObj.STR5 = "대표전화 : 국내 1566-5050 / 1588-5050 해외 82-53-742-5050";
			langKrObj.STR6 = "고객님 죄송합니다.";
			langKrObj.STR7 = "/img/common/visual/ebz_img_error_footer.gif";
			langKrObj.STR8 = "타기관 OTP이용등록 바로가기";
			langKrObj.STR9 = "취소";
			
			langEnObj.STR1 = "Infomation Message";
			langEnObj.STR2 = "Close";
			langEnObj.STR3 = "Notification";
			langEnObj.STR4 = "OK";
			langEnObj.STR5 = "Contact : Local 1566-5050 / 1588-5050 Overseas 82-53-742-5050";
			langEnObj.STR6 = "Sorry";
			langEnObj.STR7 = "/img/common/visual/ebz_img_error_footer.EN.gif";
			langEnObj.STR8 = "Go to the page of registration OTP";
			langEnObj.STR9 = "Cancel";
			
			langZhObj.STR1 = "说明";
			langZhObj.STR2 = "关闭";
			langZhObj.STR3 = "提醒代码";
			langZhObj.STR4 = "确认";
			langZhObj.STR5 = "企业总机： 国内 1566-5050/1588-5050 国外 82-53-742-5050";
			langEnObj.STR6 = "相应内容不存在.";
			langZhObj.STR7 = "/img/common/visual/ebz_img_error_footer.ZH.gif";
			langZhObj.STR8 = "其他機構 OTP 使用登記 快捷鍵";
			langZhObj.STR9 = "取消";
			
			this.langStrObj.DF =  langKrObj;
			this.langStrObj.EN =  langEnObj;
			this.langStrObj.ZH =  langZhObj;		
		},
		
		getLangStr : function( langDvCd, lnCode ){
			if( jex.isNull(langDvCd) || langDvCd == undefined || langDvCd == "undefined"){
				return this.langStrObj["DF"][lnCode];
			}
			return this.langStrObj[langDvCd][lnCode];
		},
		
		checkReplaceMsg : function( replaceMsg ){
			if( replaceMsg == null || replaceMsg == undefined || replaceMsg == "undefined" || replaceMsg.length < 1 ){
				return false;
			}else {
				return true;				
			}			
		},
		
		hasMsgLayer : function( msgLayerId ){
			
			if( $("#"+msgLayerId).length > 0 ){
				$("#"+msgLayerId).remove();
				$("#msgLayerBg").remove(); 
			}
		},
		
		strRePlaceAll : function(orgStr, bfStr, afStr){

			if( orgStr == null || orgStr == "null" || orgStr == undefined || orgStr == "undefined" || orgStr.length < 1 ){
				return orgStr;
			}else {
				return orgStr.split(bfStr).join(afStr);
			}
		},
		
		strCodeMsgValue : function( msg, values ){

			if( typeof values == "string"){
				msg = msg.replace("%0%", values);
			}else if ( typeof values == "object" ){
				for( var i=0; i < values.length; i++ ){
					msg = msg.replace("%"+i+"%", values[i]);
				}
			}

			return msg;
		},		
		
		//메시지 레이어 PopUp
		printInfo : function(code, replaceMsg){
			var infoMsg = _CodeMgr.getMsg(code)+"";	//응답코드
			if( this.checkReplaceMsg(replaceMsg) ){
				infoMsg = this.strCodeMsgValue(infoMsg, replaceMsg);
			}			
			this.printInfoMsg(code, infoMsg);
			msgLayerFocus("msgInfoLayer");
		},
		//메시지 레이어 PopUp + callBackFunction
		printInfoCallBack : function(code, replaceMsg, fn){
			var infoMsg = _CodeMgr.getMsg(code);	//응답코드
			if( this.checkReplaceMsg(replaceMsg) ){
				infoMsg = this.strCodeMsgValue(infoMsg, replaceMsg);
			}			
			this.setCloseFn(fn);
			this.printInfoMsg(code, infoMsg, "fn");
			msgLayerFocus("msgInfoLayer");
		},
		//메시지 레이어 PopUp		
		printUserInfo : function(code, infoMsg){			
			this.printInfoMsg(code, infoMsg);
			msgLayerFocus("msgInfoLayer");
		},
		//메시지 레이어 PopUp + callBackFunction
		printUserInfoCallBack : function(code, infoMsg, fn){
			this.setCloseFn(fn);
			this.printInfoMsg(code, infoMsg, "fn");
			msgLayerFocus("msgInfoLayer");
		},		
		//오류  레이어 PopUp
		printError : function(errObj, arbitMtdCode){
			var errCode 	= jex.null2Void( errObj['COMMON_HEAD']['CODE']);
			var errMsg		= jex.null2Void( errObj['COMMON_HEAD']['MESSAGE']);
			var errMsgSub	= jex.null2Void( errObj['COMMON_HEAD']['SUB_ERROR']);	
			
             try
             {
                // alert팝업 호출시 wiselog 세팅처리
                var pathNm = jex.null2Str(location.href.substring(location.href.lastIndexOf("/")+1, location.href.lastIndexOf(".")), "UNKNOWN");
                n_click_logging(location.protocol+"//"+location.hostname+"/error_event?_n_error_code="+errCode+"&_n_error_msg="+errMsg, location.protocol+"//"+location.hostname+"/error_page/"+pathNm);
            }
            catch(e)
            {
            }

            this.printErrorMsg(errCode, errMsg, errMsgSub, arbitMtdCode);
			msgLayerFocus("errInfoLayer");
		},
		//오류  레이어 PopUp + callBackFunction		
		printErrorCallBack : function(errObj, arbitMtdCode, fn){			
			var errCode 	= jex.null2Void( errObj['COMMON_HEAD']['CODE']);
			var errMsg		= jex.null2Void( errObj['COMMON_HEAD']['MESSAGE']);
			var errMsgSub	= jex.null2Void( errObj['COMMON_HEAD']['SUB_ERROR']);				
			
			this.printErrorMsg(errCode, errMsg, errMsgSub, arbitMtdCode, "fn");
			msgLayerFocus("errInfoLayer");
		},
		//사용자 정의 오류  레이어 PopUp
		printUserError : function(errCode, replaceMsg){
			var errMsg = _CodeMgr.getMsg(errCode);	//응답코드
			if( this.checkReplaceMsg(replaceMsg) ){
				errMsg = this.strCodeMsgValue(errMsg, replaceMsg);
			}			
			this.printErrorMsg(errCode, errMsg, null, "");
			msgLayerFocus("errInfoLayer");
		},
		//사용자 정의 오류  레이어 PopUp + callBackFunction		
		printUserErrorCallBack : function(errCode, replaceMsg, fn){
			this.setCloseFn(fn);				
			var errMsg = _CodeMgr.getMsg(errCode);	//응답코드
			if( this.checkReplaceMsg(replaceMsg) ){
				errMsg = this.strCodeMsgValue(errMsg, replaceMsg);
			}			
			this.printErrorMsg(errCode, errMsg, null, "", "fn");
			msgLayerFocus("errInfoLayer");
		},
		//오류 페이지 이동
		printErrorPage : function(errObj){
			
			if( jex.isError(dat)){
				
				var _ErrObj = {};
				_ErrObj.ERR_CODE    = jex.null2Void( dat['COMMON_HEAD']['CODE']);
				_ErrObj.ERR_MSG     = jex.null2Void( dat['COMMON_HEAD']['MESSAGE']);
				_ErrObj.ERR_SUB_MSG = jex.null2Void( dat['COMMON_HEAD']['SUB_ERROR']);
				
				dataCtrl.setObjData("ERR_INFO_OBJ", JSON.stringify(_ErrObj));
				
				location.href = "/com_ebz_53010_cm01.act";		
			}			
		},
		//Confirm 레이어 PopUp
		printConfirm : function(msg, fn){
			this.popConfirm(msg, fn);
		},
		printInfoMsg : function(code, infoMsg, fn){
			var funStr = ( fn == "fn" ) ? this.callBackFnStr : this.dfltFnStr;
			_msgLayerId = "msgInfoLayer";
			infoMsg = this.strRePlaceAll(infoMsg, /\n/g, "<br/>");
			var lnCode = jex.lang();
			
			var printInfoHtml = "";
			/*printInfoHtml +=	"<div id='msgInfoLayer' class='popWrap' style='width:700px; border:#034ea2 3px solid;'>";
			printInfoHtml +=	"	<div class='pop_head'>";			
			printInfoHtml +=	"		<h1 class='titleDep1'>"+this.getLangStr(lnCode, "STR1")+"</h1><button type='button' onClick="+funStr+" class='pop_close' title='"+this.getLangStr(lnCode, "STR2")+"'>"+this.getLangStr(lnCode, "STR2")+"</button>";
			printInfoHtml +=	"	</div>";			
			printInfoHtml +=	"	<hr/>";
			printInfoHtml +=	"	<div class='pop_contents'>";			
			printInfoHtml +=	"		<article>";
			printInfoHtml +=	"			<div class='errorType02'>";			
			printInfoHtml +=	"				<dl class='errorTxt02'>";
			printInfoHtml +=	"					<dt>"+jex.null2Void( infoMsg )+"</dt>";			
			printInfoHtml +=	"					<dd class='ht_10'></dd>";
			printInfoHtml +=	"					<dd class='caution_code'>"+this.getLangStr(lnCode, "STR3")+" : "+ code +"</dd>";			
			printInfoHtml +=	"				</dl>";
			printInfoHtml +=	"			</div>";			
			printInfoHtml +=	"			<div class='btnArea'><span class='btn large action'><button type='button' onClick="+funStr+" title='"+this.getLangStr(lnCode, "STR4")+"'>"+this.getLangStr(lnCode, "STR4")+"</button></span></div>";
			printInfoHtml +=	"		</article>";			
			printInfoHtml +=	"	</div>";
			printInfoHtml +=	"	<hr/>";			
			printInfoHtml +=	"	<div class='pop_footer' style='height:28px; background-color:#f6f6f6; padding:0;'>";
			printInfoHtml +=	"		<img src='/img/common/visual/ebz_img_error_footer.gif' alt='"+this.getLangStr(lnCode, "STR5")+"'>";			
			printInfoHtml +=	"	</div>";
			printInfoHtml +=	"</div>";
			printInfoHtml +=	"<div id='msgLayerBg' class='LayerPop_Bg'></div>";*/
			printInfoHtml +=	"<div id='msgInfoLayer' class='full_Layer_Wrap'>";
			printInfoHtml +=	"	<div class='layer_Wrap info_msg'>";
			printInfoHtml +=	"		<div class='inbox'>";
			printInfoHtml +=	"			<div class='ly_head'>";
			printInfoHtml +=	"				<h2 class='sb_title'>"+this.getLangStr(lnCode, "STR1")+"</h2>";
			printInfoHtml +=	"				<button class='popup_close' onclick="+funStr+" title='"+this.getLangStr(lnCode, "STR2")+"'>"+this.getLangStr(lnCode, "STR2")+"</button>";
			printInfoHtml +=	"			</div>";
			printInfoHtml +=	"			<!-- pop_content -->";
			printInfoHtml +=	"			<div  class='pop_content'>";
			printInfoHtml +=	"				<div class='info_msg_in_box'>";
			printInfoHtml +=	"				<h3>고객님 불편을 드려 죄송합니다.</h3>";
			printInfoHtml +=	"					<p class='info_txt'>"+jex.null2Void( infoMsg )+"</p>";
			printInfoHtml +=	"					<p class='noti_code'>"+this.getLangStr(lnCode, "STR3")+" : "+ code +"</p>";
			printInfoHtml +=	"					<div class='btn_area'>";
			printInfoHtml +=	"						<span class='btn_ty01'><a href='javascript:"+funStr+"'>"+this.getLangStr(lnCode, "STR4")+"</a></span>";
			printInfoHtml +=	"					</div>";
			printInfoHtml +=	"				</div>";
			printInfoHtml +=	"			</div>";
			printInfoHtml +=	"			<!--// pop_content -->";
			printInfoHtml +=	"		</div>";
			printInfoHtml +=	"		<div class='contact_list'>";
			printInfoHtml +=	"			<p class='bul_type_g'>대표전화 : <span class='color_1'>국내</span> <strong>1566-5050 / 1588-5050</strong></p>";
			printInfoHtml +=	"			<p class='bul_type_g'>해외 : <strong>82-53-742-5050</strong></p>";
			printInfoHtml +=	"		</div>";
			printInfoHtml +=	"	</div>";
			printInfoHtml +=	"	<div id='msgLayerBg' class='dim'></div>";
			printInfoHtml +=	"</div>";
			
			this.hasMsgLayer(_msgLayerId);
			$(document.body).append(printInfoHtml);
			this.openMsgLayer(_msgLayerId);
			try{ window.setTimeout(function(){ try{nFilterClose();}catch(e){} }, 300); }catch(e){}
		},
		printErrorMsg : function(errCode, errMsg, errMsgSub, arbitMtdCode, fn){
			var arbitMtdMsg = "";
			var click2 = "";
			
			if( jex.null2Void(arbitMtdCode).length > 1 ){
				arbitMtdMsg = _CodeMgr.getCodeMsg("ARBIT_MTD", arbitMtdCode);	//조치메시지
			}
			
			var funStr = ( fn == "fn" ) ? this.callBackFnStr : this.dfltFnStr;
			_msgLayerId = "errInfoLayer";
			var lnCode = jex.lang();

			//Function정의			
			if(_ismainFrm == ""){
				click2 = " onClick='jex.getRootDom()."+funStr+"' ";
			}else{
				click2 = " onClick='$(\"#ifr\")[0].contentWindow."+funStr+"' ";
			}
			
			var errCodeHtml =		"";
			/*errCodeHtml +=			"<div id='errInfoLayer' class='popWrap' style='width:700px; border:#034ea2 3px solid;'>";
			errCodeHtml +=			"	<div class='pop_head'>";
			errCodeHtml +=			"		<h1 class='titleDep1'>"+this.getLangStr(lnCode, "STR1")+"</h1><button type='button' onClick="+funStr+" class='pop_close' title='"+this.getLangStr(lnCode, "STR2")+"'>"+this.getLangStr(lnCode, "STR2")+"</button>";
//			errCodeHtml +=			"		<h1 class='titleDep1'>"+this.getLangStr(lnCode, "STR1")+"</h1><button type='button' "+click2+" class='pop_close' title='"+this.getLangStr(lnCode, "STR2")+"'>"+this.getLangStr(lnCode, "STR2")+"</button>";			
			errCodeHtml +=			"	</div>";
			errCodeHtml +=			"	<hr/>";
			errCodeHtml +=			"	<div class='pop_contents'>";
			errCodeHtml +=			"		<article>";
			errCodeHtml +=			"			<div class='errorType02'>";
			errCodeHtml +=			"				<dl class='errorTxt02'>";
			errCodeHtml +=			"					<dt>"+this.getLangStr(lnCode, "STR6")+"</dt>";
			errCodeHtml +=			"					<dd>" + jex.null2Void( this.strRePlaceAll(errMsg, /\n/g, "<br/>")) + "</dd>";			
			errCodeHtml +=			"					<dd>";
			errCodeHtml +=			"						<ul class='contType01 ht_10'>";
			
			if( errMsgSub != undefined && errMsgSub != null && errMsgSub != "null" && jex.null2Void(errMsgSub).length > 0 ){				
				for( var i = 0; i < errMsgSub.length; i++ ){
					errCodeHtml +=	"							<li class='bult_txt'>" + jex.null2Void(this.strRePlaceAll(errMsgSub[i].MESSAGE, /\n/g, "<br/>")) + "</li>";
				}
			}

			if( arbitMtdMsg != undefined && arbitMtdMsg != null && errMsgSub != "null" && jex.null2Void(arbitMtdMsg).length > 0 ){
				errCodeHtml +=		"							<li class='bult_txt'>" + jex.null2Void( this.strRePlaceAll(arbitMtdMsg, /\n/g, "<br/>")) + "</li>";
			}
			
			errCodeHtml +=			"						</ul>";
			errCodeHtml +=			"					</dd>";			
			errCodeHtml +=			"					<dd class='caution_code'>"+this.getLangStr(lnCode, "STR3")+" : "+ errCode +"</dd>";
			errCodeHtml +=			"				</dl>";
			errCodeHtml +=			"			</div>";
			errCodeHtml +=			"			<div class='btnArea'><span class='btn large action'><button type='button' onClick="+funStr+" title='"+this.getLangStr(lnCode, "STR4")+"'>"+this.getLangStr(lnCode, "STR4")+"</button></span></div>";
//			errCodeHtml +=			"			<div class='btnArea'><span class='btn large action'><button type='button' "+click2+" title='"+this.getLangStr(lnCode, "STR4")+"'>"+this.getLangStr(lnCode, "STR4")+"</button></span></div>";
			errCodeHtml +=			"		</article>";
			errCodeHtml +=			"	</div>";
			errCodeHtml +=			"	<hr/>";
			errCodeHtml +=			"	<div class='pop_footer' style='height:28px; background-color:#f6f6f6; padding:0;'>";
			errCodeHtml +=			"		<img src='/img/common/visual/ebz_img_error_footer.gif' alt='"+this.getLangStr(lnCode, "STR5")+"'>";
			errCodeHtml +=			"	</div>";
			errCodeHtml +=			"</div>";
			errCodeHtml +=			"<div id='msgLayerBg' class='LayerPop_Bg'></div>";*/
			
			errCodeHtml +=			"<div id='errInfoLayer' class='full_Layer_Wrap'>";
			errCodeHtml +=			"	<div class='layer_Wrap info_msg'>";
			errCodeHtml +=			"		<div class='inbox'>";
			errCodeHtml +=			"			<div class='ly_head'>";
			errCodeHtml +=			"				<h2 class='sb_title'>"+this.getLangStr(lnCode, "STR1")+"</h2>";
			errCodeHtml +=			"				<button class='popup_close' onClick='closeErrorLayer();' title='"+this.getLangStr(lnCode, "STR2")+"'>"+this.getLangStr(lnCode, "STR2")+"</button>";
			errCodeHtml +=			"			</div>";
			errCodeHtml +=			"			<div  class='pop_content'>";
			errCodeHtml +=			"				<div class='info_msg_in_box'>";
			errCodeHtml +=			"					<h3>"+this.getLangStr(lnCode, "STR6")+"</h3>";
			errCodeHtml +=			"					<p class='info_txt'>" + jex.null2Void( this.strRePlaceAll(errMsg, /\n/g, "<br/>")) + "</p>";
			                    					if( errMsgSub != undefined && errMsgSub != null && errMsgSub != "null" && jex.null2Void(errMsgSub).length > 0 ){				
			                    						for( var i = 0; i < errMsgSub.length; i++ ){
			errCodeHtml +=			"							<p class='bul_type_g c_type'>" + jex.null2Void( this.strRePlaceAll(arbitMtdMsg, /\n/g, "<br/>")) + "</p>";
			                    						}
			                    					}
			                   						if( arbitMtdMsg != undefined && arbitMtdMsg != null && errMsgSub != "null" && jex.null2Void(arbitMtdMsg).length > 0 ){
			errCodeHtml +=			"						<p class='bul_type_g c_type'>" + jex.null2Void( this.strRePlaceAll(arbitMtdMsg, /\n/g, "<br/>")) + "</p>";
			                    					}
			errCodeHtml +=			"					<p class='noti_code'>"+this.getLangStr(lnCode, "STR3")+" : "+ errCode +"</p>";
			errCodeHtml +=			"					<div class='btn_area'>";
			errCodeHtml +=			"						<span class='btn_ty01'><a href='javascript:onClick="+funStr+"'>"+this.getLangStr(lnCode, "STR4")+"</a></span>";
			errCodeHtml +=			"					</div>";
			errCodeHtml +=			"				</div>";
			errCodeHtml +=			"			</div>";
			errCodeHtml +=			"		</div>";
			errCodeHtml +=			"		<div class='contact_list'>";
			errCodeHtml +=			"			<p class='bul_type_g'>대표전화 : <span class='color_1'>국내</span> <strong>1566-5050 / 1588-5050</strong></p>";
			errCodeHtml +=			"			<p class='bul_type_g'>해외 : <strong>82-53-742-5050</strong></p>";
			errCodeHtml +=			"		</div>";
			errCodeHtml +=			"	</div>";
			errCodeHtml +=			"	<div id='msgLayerBg' class='dim'></div>";
			errCodeHtml +=			"</div>";
			

			this.hasMsgLayer(_msgLayerId);
			$(document.body).append(errCodeHtml);
			this.openMsgLayer(_msgLayerId);
			try{ window.setTimeout(function(){ try{nFilterClose();}catch(e){} }, 300); }catch(e){}
		},
		popConfirm : function(msg, fn){
			_msgLayerId = "confirmLayer";
			var lnCode = jex.lang();

			var confirmHtml = 	"";
			confirmHtml += 		"<div id='confirmLayer' class='Confirm'>";
			confirmHtml += 		"	<div class='loadingWrap'>";
			confirmHtml += 		"		<div class='pop_head'>";
			confirmHtml += 		"			<h1 class='titleDep1' style='text-align:left'>"+this.getLangStr(lnCode, "STR1")+"</h1>";
			confirmHtml += 		"			<button type='button' onclick='closeConfirmLayer(false);' class='pop_close' title='"+this.getLangStr(lnCode, "STR2")+"'>"+this.getLangStr(lnCode, "STR2")+"</button>";
			confirmHtml += 		"		</div>";
			confirmHtml += 		"		<hr/>";
			confirmHtml += 		"		<div class='LayerPopErr'>";
			confirmHtml += 		"			<ul class='popInfoTxt textAlignc' style='padding:10px 0 20px 0;'><li>"+jex.null2Void(msg)+"</li></ul>";
			confirmHtml += 		"		</div>";
			confirmHtml += 		"		<hr/>";
			confirmHtml += 		"		<div class='pop_footer'>";
			confirmHtml += 		"			<div class='btnArea line'>";
			
			if($(".leftMenu", parent.document).children().length == 0) {
				confirmHtml += 	"				<span class='btn large action'><button type='button' onclick='jex.getRootDom()."+fn+" closeConfirmLayer(false);' title='"+this.getLangStr(lnCode, "STR4")+"'>"+this.getLangStr(lnCode, "STR4")+"</button></span>";
			}else{
				confirmHtml += 	"				<span class='btn large action'><button type='button' onclick='$(\"#ifr\")[0].contentWindow."+fn+" closeConfirmLayer(false);' title='"+this.getLangStr(lnCode, "STR4")+"'>"+this.getLangStr(lnCode, "STR4")+"</button></span>";
			}

			confirmHtml += 		"				<span class='btn large'><button type='button' onclick='closeConfirmLayer(false);' title='"+this.getLangStr(lnCode, "STR9")+"'>"+this.getLangStr(lnCode, "STR9")+"</button></span>";
			confirmHtml += 		"			</div>";
			confirmHtml += 		"		</div>";
			confirmHtml += 		"	</div>";
			confirmHtml += 		"	<div class='LayerPop_Bg1'></div>";
			confirmHtml += 		"</div>";
			
			$(jex.getRootDom().document.body).append(confirmHtml);
			this.openConfirmLayer(_msgLayerId);
			try{ window.setTimeout(function(){ try{nFilterClose();}catch(e){} }, 300); }catch(e){}
		},
		openMsgLayer:function(errType){
			try{ iframeReSize(); } catch(e){}

			var temp    = $("#"+errType);
			var iHeight = (($(window).height() - temp.outerHeight()) / 2) + $(window).scrollTop();
	        var iWidth  = (($(window).width()  - temp.outerWidth())  / 2) + $(window).scrollLeft();
	        
	        try{
	        	if(parent.name == "ifr"){
	        		iHeight = iHeight - 250;
	        		
	        		if(iHeight < 0) {
	        			iHeight = 0;
	        		}
	        	}
	        }catch(e){
	        }

	        temp.css('top'     , iHeight+'px');
			temp.css('left'    , iWidth+'px');
			temp.css('z-index' , 40000);
			temp.css('position', 'absolute');
			
			//로딩창 숨기기
			try{ loading_Stop(); }catch(e){}
			try{ parent.loading_Stop(); }catch(e){}
		},
		openConfirmLayer:function(openLayerId){
			var confirmBackHeight = jex.getRootDom().document.body.clientHeight;
			var confirmHeight     = $(".loadingWrap", jex.getRootDom().document.body).height();
			
			$(".loadingWrap",jex.getRootDom().document.body).css("top", (confirmBackHeight/2) - (confirmHeight/2));
			
			//로딩창 숨기기
			try{ loading_Stop(); }catch(e){}
			try{ parent.loading_Stop(); }catch(e){}
		},
		setCloseFn : function(fn){
			this.msgCloseFn = fn;
		},
		getCloseFn : function(){
			return this.msgCloseFn;
		}
	});
	
	jex.setMsgObj(new _JexMessage());
	
})();

$(function() {	
	if( jex.getMsgObj() == null ) jex.setMsgObj(jex.getRootDom().jex.getMsgObj());
});

function closeConfirmLayer(flag){
	$("#confirmLayer", jex.getRootDom().document.body).remove();
	
	try{ iframeReSize(); } catch(e){
	}
	
	return flag;
}

function closeErrorLayer(){
	$("#msgLayerBg").remove();
	$("#"+_msgLayerId).remove();
	_msgLayerId = "";

    try{
        // 메시지창 호출한 id로 초첨이동. 웹접근성
        $('#'+_activeId).focus();
    }catch(e){}
}

function closeErrorLayerCallBack(){
	$("#msgLayerBg").remove();
	$("#"+_msgLayerId).remove();
	_msgLayerId = "";
	
	if( jex.getMsgObj().getCloseFn() != null ){ jex.getMsgObj().getCloseFn()();};
}

function msgCloseErrorLayer(){
	try{
		$("#msgLayerBg"  , jex.getRootDom().document.body).remove();
		$("#errInfoLayer", jex.getRootDom().document.body).remove();
	}catch(e){
	}
	
	_msgLayerId = "";
}

function msgCloseErrorLayerCallBack(){
	try{
		$("#msgLayerBg"  , jex.getRootDom().document.body).remove();
		$("#errInfoLayer", jex.getRootDom().document.body).remove();
		$("#msgInfoLayer", jex.getRootDom().document.body).remove();
	}catch(e){
	}
	
	_msgLayerId = "";
	
	if( jex.getMsgObj().getCloseFn() != null ){ jex.getMsgObj().getCloseFn()();}
}

function goLoginPage(){
	location.href="/com_ebz_11010_J001.act";
}

function msgLayerFocus(divId){
    try
    {
        var popObj       = $('#' + divId, jex.getRootDom().document);
        var focusAbleArr = popObj.find('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),area,[tabindex]');
        var focusFirst   = $(focusAbleArr[0]);
        var focusLast    = $(focusAbleArr[focusAbleArr.length-1]);
        
        // layer focus
        popObj.attr('tabindex', '-1').focus();
        
        // focus loop
        focusFirst.bind('keydown',function(e) {
            // shift + Tab
            if( e.shiftKey && e.keyCode == 9 )
            {
                focusLast.focus();
                e.preventDefault();
            }
        });
        focusLast.bind('keydown',function(e) {
            // Tab
            if( !e.shiftKey && e.keyCode == 9 )
            {
                focusFirst.focus();
                e.preventDefault();
            }
        });
    }
    catch( e )
    {
    }
}