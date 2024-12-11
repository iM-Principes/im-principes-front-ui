var loadingTime = 0;

//20초 후까지 사라지지 않는 경우 자동 사라짐
//window.setInterval('loadingTime = loadingTime+20;', 20000);

$(function() {
	var _JexLoding = JexPlugin.extend({
		init : function() {
		},
		start : function() {
			window.clearTimeout('loading_Stop()');
			
			try{
				if( $(".Loading").length > 0 ){
					$(".Loading").remove();
				}
			}catch(e){
			}

			try{
				$(".Loading").html("");
			}catch(e){
			}

			//로딩창 html 생성
			this.queue = [];
			this.className = "Loading";

			var loding_msg = "<strong>처리 중 입니다.<\/strong><br/><span class='point_blue'>잠시만 기다려 주십시오.</span>";

			if(jex.lang() != "DF") {
				this.codeMgr = jex.isNull( _CodeMgr ) ? jex.plugin.get("CODE_MANAGER") : _CodeMgr;
				loding_msg = this.codeMgr.getCodeMsg("FRAMEWORK", "FW001");
			}

			var $mainDiv = $("<div id='jexLoading_main' style='display:none; height:230px; z-index:30000;'>"); 
			var $backDiv = $("<div></div>");

			var $imgDiv = $("<div id='jexLoading_img' style='height:170px;'>"+
					        "<ul>"+
					        "<li style='text-align:center; margin-top:-20px;'><img src='/img/common/icon/ebz_ico_loading.gif?20240605' alt='금융에 감동을 더하다,변함없는 마음 변화하는 아이엠뱅크'/></li>"+
					        "<li style='text-align:center; margin-top:-20px;'>"+ loding_msg +"</li>" +
					        "</ul>" +
					        "</div>");

			$mainDiv.addClass("Loading");
			$backDiv.addClass("LayerPop_Bg1");
			$imgDiv.addClass("loadingWrap");
			$mainDiv.append($backDiv);
			$mainDiv.append($imgDiv); 

			$(document.body).append($mainDiv);

			//로딩창 display
			if(this.queue.length == 0){
				var wrap;
				var loadingBackWidth;
				
				if( !!top.document.getElementById("header") ){
					wrap = top.document.getElementById("header");
					loadingBackWidth = $(wrap).css("min-width");
				}else{
					loadingBackWidth = $(top).width();
				}

				var loadingBackHeight = document.body.clientHeight;

				$("#jexLoading_main", top.document).css("min-width", loadingBackWidth);
				$("#jexLoading_main", top.document).css("min-height", jex.getDocHeight());

				var loadingHeight = $("#jexLoading_img").height();

				try{
					if(window.top.document.getElementById('contentsIBframe') != undefined && isMobileAgentChk()){
						$("#jexLoading_img").css("top", "180px");
					}else{
						$("#jexLoading_img").css("top", (loadingBackHeight/2) - (loadingHeight/2));
					}
				}catch(e){
					$("#jexLoading_img").css("top", (loadingBackHeight/2) - (loadingHeight/2));
				}

				$("."+this.className, top.document).fadeIn(0);

				// 10초 후에도 사라지지 않으면 자동 fadeout
				window.setTimeout('loading_Stop();', 10000);
			}

			this.queue.push( this.queue.length );
		},
		stop : function() {
			loadingTime = 0;

			this.queue.pop();

			if(this.queue.length == 0){
				$("."+this.className, top.document).fadeOut(0);
			}
		}
	});

	jex.plugin.add("JEX_LODING", new _JexLoding());
});

function loading_Stop(){
	try{
		//if(loadingTime > 19){
			jex.plugin.get("JEX_LODING").stop();
		//}
	}catch(e){
	}
}
