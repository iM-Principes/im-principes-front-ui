// *******************************************************************************
// * Copyright (c) 2011 Webcash Corporation and others.
// *
// * All rights reserved. This program and the accompanying materials
// * are made available under the terms of the Eclipse Public License v1.0
// * which accompanies this distribution, and is available at
// * http://www.eclipse.org/legal/epl-v10.html
// *
// * Contributors:
// *     Webcash Corporation - initial API and implementation
// *******************************************************************************/
// * Simple JavaScript Inheritance
// * By John Resig http://ejohn.org/
// * MIT Licensed.
var _jex = function() {
	this.version			= 0.1;
	this.type				= "jex";
	this.locale				= "DF";
	this.ajaxSetup			= {dataType:"text",beforeSend:function(){},complete:function(){},async:true,cache:true,error:function() {}};
	this.ajaxBeforeSend		= [];				// AJAX�섍린�� API
	this.ajaxBeforeData;						// AJAX�섍린�꾩뿉 Input媛� �곗씠�� 泥섎━瑜� �댁���.
	this.ajaxComplete		= [];				// AJAX�� �댄썑 API
	this.ajaxCompleteData	;					// AJAX�� �댄썑�� Output媛� �곗씠�곕� 泥섎━ �댁���.
	this.ajaxExt			= ".jct";
	this.ajaxErrFn			= undefined;
	this.debuggerId			= "jexDebugger";
	this.messageId			= "jexMessage";
	this.debug				= true;
	this.errorHandler		= [];
	this.debugHeader		= [{id:"type",style:"width:30px"},{id:"code",style:"width:50px"},{id:"msg",style:"width:200px"},{id:"detail",style:"width:250px"},{id:"time",style:"50px"}];
	this.debuggerObj;
	this.msgObj	;
	this.msgId				= "jexMessage";
	this.cache				= {};
	this.pageLoader			= [];
	this.msgFn				= function(code) {return code;};
	this.isJSONExp			= /(^{[^}]+})|^\[[^\]]+\]/;
	this.height				= 0;
	this.rootDom			= undefined;
	this.rootDomIncPrnt		= undefined;
	this.jobManager			= undefined;
	this.afterOnload		= [];
	this.beforeOnload		= [];
	this.onload				= false;
};



_jex.instance=new _jex();

_jex.getInstance=function(){
	return _jex.instance;
};

_jex.prototype.createAjaxUtil=function(url,ext){
	return new _jexAjaxUtil(url,(jex.isNull(ext))?this.ajaxExt:ext);
};

_jex.prototype.isNull=function(dat){
	return dat==undefined||typeof(dat)==undefined||dat==null||(typeof(dat)=="string"&&$.trim(dat)=="");
};

_jex.prototype.null2Void=function(dat){
	return _jex.getInstance().isNull(dat)?"":dat;
};

_jex.prototype.null2Str=function(dat,str){
	return _jex.getInstance().isNull(dat)?str:dat; 
};

_jex.prototype.null2Array=function(dat){
	return _jex.getInstance().isNull(dat)?[]:dat;
};

_jex.prototype.isError=function(dat){
	return dat['COMMON_HEAD']['ERROR'];
};

//_jex.prototype.hasSubError=function(dat){
//	return dat['COMMON_HEAD']['SUB_ERROR'].length>0?true:false;
//};

//_jex.prototype.getSubError=function(dat){
//	return dat['COMMON_HEAD']['SUB_ERROR'].length>0?dat['COMMON_HEAD']['SUB_ERROR']:[];
//};

_jex.prototype.setJobManager=function(jm){
	this.jobManager=jm; 
};

_jex.prototype.getJobManager=function(){
	return this.jobManager;
};

_jex.prototype.setAjaxErrFn=function(fn){
	this.ajaxErrFn=fn;
};

_jex.prototype.getAjaxErrFn=function(){
	return this.ajaxErrFn;
};

_jex.prototype.setAjaxExt=function(s){
	this.ajaxExt=s; 
};

_jex.prototype.addErrorHandler=function(type,fn){
	this.errorHandler.push({"type":type,"fn":fn});
};

_jex.prototype.setDebugger=function(obj){
	this.debuggerObj=obj;
};

_jex.prototype.getDebugger=function(){
	return this.debuggerObj;
};

_jex.prototype.getDebuggerId=function(){
	return this.debuggerId;
};

_jex.prototype.getMicroTime=function(){
	return new Date().getTime();
};

_jex.prototype.printDebug=function(msg){
	if(!_jex.getInstance().isNull(this.debuggerObj))
		this.debuggerObj.printDebug	(msg);
};

//_jex.prototype.printInfo=function(msg){
//	if(!_jex.getInstance().isNull(this.msgObj))
//		this.msgObj.printInfo(msg);
//};

//_jex.prototype.printInfoCallBack = function(msg,fn){
//	if(!_jex.getInstance().isNull(this.msgObj))
//		this.msgObj.printInfoCallBack(msg);	
//	this.msgObj.setCloseFn(fn);	
//};

//_jex.prototype.printError=function(errObj){
//	if(!_jex.getInstance().isNull(this.msgObj))
//		this.msgObj.printError(errObj);
//};

//_jex.prototype.printErrorCallBack=function(errObj,fn){
//	if(!_jex.getInstance().isNull(this.msgObj))
//		this.msgObj.printErrorCallBack(errObj);
//	this.msgObj.setCloseFn(fn);
//};

_jex.prototype.printInfo=function(code,replaceMsg){ 
	if(!_jex.getInstance().isNull(this.msgObj)) 	
		this.msgObj.printInfo(code,replaceMsg);
};

_jex.prototype.printInfoCallBack=function(code,replaceMsg,fn){ 
	if(!_jex.getInstance().isNull(this.msgObj)) 	
		this.msgObj.printInfoCallBack(code,replaceMsg);		
	
	this.msgObj.setCloseFn(fn);	
};

_jex.prototype.printUserInfo=function(code,infoMsg){ 
	if(!_jex.getInstance().isNull(this.msgObj)) 	
		this.msgObj.printUserInfo(code,infoMsg);
};

_jex.prototype.printUserInfoCallBack=function(code,infoMsg,fn){ 
	if(!_jex.getInstance().isNull(this.msgObj)) 	
		this.msgObj.printUserInfoCallBack(code,infoMsg);
	
	this.msgObj.setCloseFn(fn);	
};

_jex.prototype.printUserError=function(code,replaceMsg){ 
	if(!_jex.getInstance().isNull(this.msgObj))
		this.msgObj.printUserError(code,replaceMsg);
};

_jex.prototype.printUserErrorCallBack=function(code,replaceMsg,fn){ 
	if(!_jex.getInstance().isNull(this.msgObj))
		this.msgObj.printUserErrorCallBack(code,replaceMsg);
	
	this.msgObj.setCloseFn(fn);	
};

_jex.prototype.printError=function(errObj,arbitMtdCode){
	if(!_jex.getInstance().isNull(this.msgObj))
		this.msgObj.printError(errObj,arbitMtdCode);
};

_jex.prototype.printErrorCallBack=function(errObj,arbitMtdCode,fn){
	if(!_jex.getInstance().isNull(this.msgObj))
		this.msgObj.printErrorCallBack(errObj,arbitMtdCode);
	
	this.msgObj.setCloseFn(fn);	
};

_jex.prototype.printConfirm=function(msg,fn){
	if(!_jex.getInstance().isNull(this.msgObj))
		this.msgObj.printConfirm(msg,fn);
};
//紐⑤컮�쇱쎒 異붽�
_jex.prototype.appPopConfirm=function(msg, fn){
	if (!_jex.getInstance().isNull(this.msgObj))
		this.msgObj.appPopConfirm(msg, fn); 
};

_jex.prototype.isRootDom=function(){
	return (parent.window==window);	
};

_jex.prototype.getAll=function(selector){
	return $(selector).getAll();
};

_jex.prototype.setAll=function(selector,dat,formatter){
	return $(selector).setAll(dat,formatter);
};

_jex.prototype.checkException=function(e){
	if(e&&e.onError&&typeof(e.onError)=="function"){
		e.onError();
	}else 
		throw e;
};
//異붽� �ㅼ긽以�(紐⑤컮�쇱쎒)
_jex.prototype.printMsg=function(msg, fn){
	if (!_jex.getInstance().isNull(this.msgObj))
		this.msgObj.printMsg(msg, fn); 
};

_jex.prototype.confirm=function(code,msg)	{
	var fullMsg = _jex.getInstance().getMsg(code);
	var re      = /%[0-9]+%/g;
	var arr     = [];
	var temp;
	
	first_loop:
	
	while((temp=re.exec(fullMsg)) != null){
	    for(var i=0; i<arr.length; i++){
	    	if( arr[i].key == temp[0] ) 
	    		continue first_loop;
    	}
	    
	    var msgidx     = /[0-9]+/g.exec(temp[0])[0];
	    var replaceVal = _jex.getInstance().null2Void(arguments[msgidx]);
	    
	    arr.push({key:temp[0],val:replaceVal});
	}
	
	for(var i=0; i<arr.length; i++){
		var _re = new RegExp(arr[i].key,'g');
		fullMsg = fullMsg.replace(_re,arr[i].val);
	}
	
	return confirm(fullMsg);
};

_jex.prototype.isJSON=function(dat){
	return this.isJSONExp.test(dat);
};

_jex.prototype.set=function(key,data){
	this.cache[key]=data;
};

_jex.prototype.get=function(key){
	return this.cache[key];
};

_jex.prototype.toStr=function(dat){
	if(typeof(JSON.stringify)!="function") 
		throw new JexSysException("json2.js媛� inculde媛� �섏뼱 �덉� �딆뒿�덈떎."); 
	
	return JSON.stringify(dat);
};

_jex.prototype.parse=function(dat){
	if(dat==undefined||$.trim(dat)=="") 
		return undefined; 
	
	if(typeof(JSON.parse)!="function") 
		throw new JexSysException("json2.js媛� inculde媛� �섏뼱 �덉� �딆뒿�덈떎."); 
	
	return JSON.parse(dat);
};

_jex.prototype.getMsg=function(dat){
	return this.msgFn(dat);
};

_jex.prototype.getMsgId=function(dat){
	return this.msgId;
};

_jex.prototype.setMsgFn=function(dat){
	this.msgFn=dat; 		
};

_jex.prototype.lang=function(){
	return this.locale;
};

_jex.prototype.setLang=function(dat){
	this.locale=dat;
};

_jex.prototype.hide=function(attr){
	return $.each($("["+attr+"]"),function(){$(this).hide();});	
};

_jex.prototype.show=function(attr){
	return $.each($("["+attr+"]"),function(){$(this).show	();});
};

_jex.prototype.getOpener=function(){ 
	return (!opener)?parent:opener;
};

_jex.prototype.isDebug=function(){
	return this.debug;
};

_jex.prototype.setMsgObj=function(obj){
	this.msgObj = obj;
};

_jex.prototype.getMsgObj=function(){
	return this.msgObj;
};

_jex.prototype.getMsgId=function(){
	return this.messageId;
};

_jex.prototype.getDocHeight=function(){
    var D = document;
    
    try{
	    this.height = Math.max(Math.max(D.body.scrollHeight,    D.documentElement.scrollHeight), Math.max(D.body.offsetHeight, D.documentElement.offsetHeight), Math.max(D.body.clientHeight, D.documentElement.clientHeight));
    }catch(e){
    	;
    }
    
    return this.height;
};

_jex.prototype.getWindowHeight=function(){
	var winH = 460;
	
	if(document.body && document.body.offsetWidth) 
		winH = document.body.offsetHeight; 
	
	if(document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.offsetWidth ) 
		winH = document.documentElement.offsetHeight;
	
	if(window.innerWidth && window.innerHeight) 
		winH = window.innerHeight;
	
	return winH;
};

_jex.prototype.getRootDom=function(p,bp){
	if(!_jex.getInstance().isNull(this.rootDom)) 
		return this.rootDom;
	
	if(_jex.getInstance().isNull(p)){
		p = parent;
		bp= window;
	}
	
	if(!p.jex){
		this.rootDom = bp;
	}else{
		if(p===bp)	
			this.rootDom = bp;
		else
			this.rootDom = this.getRootDom(p.parent,p);
	}	
	
	return this.rootDom;
};

_jex.prototype.getRootDomIncPrnt=function(p,bp){
	if(!_jex.getInstance().isNull(this.rootDomIncPrnt)) 
		return this.rootDomIncPrnt;
	
	if(_jex.getInstance().isNull(p)){
		p = (_jex.getInstance().isNull(opener))?parent:opener;
		bp= window;
	}
	
	if(p===bp)	
		this.rootDomIncPrnt = bp;
	else		
		this.rootDomIncPrnt = this.getRootDomIncPrnt((_jex.getInstance().isNull(p.opener))?p.parent:p.opener,p);
	
	if(!bp.jex) 
		this.rootDomIncPrnt = bp;
	
	return this.rootDomIncPrnt;
};

_jex.prototype.addAfterOnload=function(fn){
	if(!this.onload){
		this.afterOnload.push(fn);		
	}else{
		fn();
	}
};

_jex.prototype.addBeforeOnload=function(fn){
	if(!this.onload) {
		this.beforeOnload.push(fn);		
	}else{
		fn();
	}
};

_jex.prototype.getAfterOnload=function(fn){ 
	return this.afterOnload;	
};

_jex.prototype.getBeforeOnload=function(fn){ 
	return this.beforeOnload;	
};

_jex.prototype.isOnload=function(b){ 
	if(b!=undefined){
		this.onload = b;
	}

	return b;
};

_jex.prototype.cloneJSON=function(o,filter){
	var rslt = {};
	
	for(var item in o){
		if(filter==undefined || filter(item)) 
			rslt[item] = o[item];
	}
	
	return rslt;
};

_jex.prototype.cloneArray=function(o,filter){
	var rslt = [];
	
	for(var item in o){
		if(filter==undefined || filter(item)) 
			rslt[item] = o[item];
	}
	
	return rslt;
};

//珥덉꽦 泥섎━瑜� �꾪븳 API
//@param str
//@returns
_jex.prototype.splitKorean=function(str){
	 var korean_srt	= parseInt(escape("媛�").replace(/\%u/g, ''),16) ;	//'媛�'�� 肄붾뱶	-- �꾩뿭蹂��섎줈 媛�吏�怨� �덈룄濡� �섏옄.(留ㅻ쾲 �곗궛�섏� �딅룄濡�)
	 var korean_end	= parseInt(escape("��").replace(/\%u/g, ''),16) ;	//'��'�� 肄붾뱶
	
	 //珥덉꽦/以묒꽦/醫낆꽦�� �섏삱�� �덈뒗 湲��먮뱾.
	 var initial 	= ['��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��'];												
	 var neuter 	= ['��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��'];									
	 var finall 	= ['','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��','��'];

	 if(str.length>2) str=str.charAt(0);
	 
	 var escapeStr = escape(str);
	 
	 if(escapeStr.length<4) {
		 _jex.getInstance().printError("JEXS0001", "�쒓��� �꾨땶 臾몄옄 �낅젰");	
		 return false;
	 }
	 
	 var strCode = parseInt(escapeStr.replace(/\%u/g,''),16);
	 
	 if(strCode < korean_srt || strCode > korean_end) {
		 _jex.getInstance().printError("JEXS0001", "�쒓��� �꾨땶 臾몄옄 �낅젰");	
		 return false;
	 }
	 
	 var srcCode2 = strCode-korean_str;
	 var arr_1st_v = Math.floor(uninum2/588);
	 uninum2 = uninum2%588;
	 
	 var arr_2nd_v = (Math.floor(uninum2/28));
	 uninum2 = (uninum2%28);
	 
	 var arr_3th_v = uninum2;
	 var return_arr=new Array(arr_1st[arr_1st_v],arr_2nd[arr_2nd_v],arr_3th[arr_3th_v]);
	 
	 return return_arr;
};

//PageLoader�� Append�섍린�꾪빐�쒕뒗 JexPlugin�뺥깭濡� 援ы쁽�섏뼱 �덉뼱�� �쒕떎.
//@param attr
_jex.prototype.addPageLoader=function(attr){
	this.pageLoader.push(attr);
};

//Plugin泥섎━
_jex_plugin=function(){
	this.plugIn={};
};
_jex_plugin.prototype.add=function(key,obj){
	this.plugIn[key]=obj;
};
_jex_plugin.prototype.get=function(key){
	return this.plugIn[key];
};
_jex_plugin.prototype.newInstance=function(key,opt){
	return new this.plugIn[key](opt);	
};
_jex.prototype.plugin=new _jex_plugin();

//�닿굔 �꾩떆濡� 留뚮뱾�댁꽌 �ъ슜�섍퀬 李⑦썑�� jexTbl濡� �ш뎄�꾪븯嫄곕굹, SimpleJexTbl�� 留뚮뱾�댁꽌 �ъ슜�섏옄.
//@param dat
//@param $t
_jex.prototype.makeTbl=function(dat,$t){
	$t.find("table").remove();
	
	var $tbl = $("<table></table>");
	
	$.each(dat, function(i,v){
		var $tr = $("<tr></tr>");
	
		$.each(v, function(i,v){
			$td = $("<td></td>");
			$td.html(v);
    		$td.appendTo($tr);
		});
		
		$tr.appendTo($tbl);
	});
	
	$tbl.appendTo($t);
	alert($t.html());
};

//�꾨찓�몄쓽 GET TYPE蹂��섎� return
_jex.prototype.getQString=function(){
	var	url = document.URL;
	var	qst = url.split("?")[1];
	qst = qst.split("#")[0];
	
	if(qst!=undefined){
		var rslt = {};
		var qar  = qst.split("&");
		
		for(var i=0; i<qar.length; i++){
			var rs = qar[i].split("=");
			rslt[decodeURIComponent(rs[0])] = decodeURIComponent(rs[1]);
		}
		
		return rslt;
	}
	
	return "";
};

//�꾨찓�몄쓽 GET TYPE蹂��섎� return
_jex.prototype.getHString=function(){
	var url = document.URL;
	var hst = url.split("#")[1];
	
	if(hst!=undefined){
		var rslt = {};
		var har = hst.split("&");
		
		for(var i=0; i<har.length; i++){
			var rs = har[i].split("=");
			rslt[decodeURIComponent(rs[0])] = decodeURIComponent(rs[1]);
		}
		
		return rslt;
	}
	
	return "";
};

//�꾨찓�몄쓽 GET TYPE蹂��섎� return
_jex.prototype.setHString=function(json){
	var hash = "";
	
	for(key in json){
		if (hash != "") 
			hash += "&";
		
		hash += encodeURIComponent(key);
		hash += "=";
		hash += encodeURIComponent(json[key]);
	}
	
	location.hash = hash;
};

//�꾩옱 URL return
_jex.prototype.getUrl=function(){
	return document.URL;
};

//AJAX愿��� �ㅼ젙-Method Start
_jex.prototype.addAjaxBefore=function(fn){
	this.ajaxBeforeSend.push(fn);
	_jex.getInstance().setAjaxBefore();
};

//AJAX愿��� �ㅼ젙-Method Start
_jex.prototype.setAjaxBeforeData=function(fn){
	this.ajaxBeforeData = fn;
};

//AJAX愿��� �ㅼ젙-Method Start
_jex.prototype.getAjaxBeforeData=function(){
	return this.ajaxBeforeData;
};

//AJAX�ㅽ뻾�꾩뿉 泥섎━�좉쾬.
_jex.prototype.setAjaxBefore=function(){
	var _this = this;
	
	fn = function(xhr,setting) {
		$.each(_this.ajaxBeforeSend,function(i,v){
			v(xhr,setting);
		});
	};
	
	this.ajaxSetup['beforeSend'] = fn;
	jQuery.ajaxSetup(this.ajaxSetup);
};

//AJAX�ㅽ뻾�꾩뿉 泥섎━�좉쾬.
_jex.prototype.addAjaxComplete=function(fn){
	this.ajaxComplete.push(fn);
	_jex.getInstance().setAjaxComplete();
};

//AJAX�ㅽ뻾�꾩뿉 泥섎━�좉쾬.
_jex.prototype.setAjaxCompleteData=function(fn){
	this.ajaxCompleteData = fn;
};

//AJAX�ㅽ뻾�꾩뿉 泥섎━�좉쾬.
_jex.prototype.getAjaxCompleteData=function(){
	return this.ajaxCompleteData;
};

//AJAX醫낅즺�� 泥섎━
_jex.prototype.setAjaxComplete=function(){
	var _this = this;
	
	fn = function(xhr,textStatus){
		$.each(_this.ajaxComplete,function(i,v){
			v(xhr,textStatus);
		});
	};
	
	this.ajaxSetup['complete'] = fn;
	jQuery.ajaxSetup(this.ajaxSetup);
};

//�쒓컙愿��� Fn 
_jex.prototype.time = function() {
	return{
		getMicroTime:function(get_as_float){
			var now = new Date().getTime()/1000;
			var s   = parseInt(now,10);
			
			return get_as_float?now:Math.round(((now-s)*1000)/1000)+' '+s;
		}
	};
};

//DATE UTIL :: JEX_STUDIO�댄썑�먮뒗 �덈줈 援ы쁽�덉젙 -- �섏쐞 �명솚�깆쓣 �꾪빐 ��젣�� �섏�留먯옄.(�묐룞�섍쾶 �뺣━留� �섎뒗�뺣룄...)
//@returns {___anonymous9415_9510}
_jex.prototype.date=function(){
	var mongthLen = [31,28,31,30,31,30,31,31,30,31,30,31];
	var	baseDt = {year:0000,mon:1,week:5};

	function getToday(){
		var _date	= new Date();
		var d		= _date.getDate();
		var day		= (d < 10) ? '0' + d : d;
		var m		= _date.getMonth() + 1;
		var month	= (m < 10) ? '0' + m : m;
		var yy		= _date.getYear();
		var year	= (yy < 1000) ? yy + 1900 : yy;
		
		var hh0		= _date.getHours();
		var hh		= (hh0<10)?'0'+hh0:hh0;
		var mi0		= _date.getMinutes();
		var mi		= (mi0<10)?'0'+mi0:mi0;
		var ss0		= _date.getSeconds();
		var ss		= (ss0<10)?'0'+ss0:ss0;
		
		var ms0		= _date.getMilliseconds();
		var ms		= (ms0<10)?'000'+ms0:(ms0<100)?'00'+ms0:(ms0<100)?'0'+ms0:ms0;
		
		return year+""+month+""+day+""+hh+""+mi+""+ss+""+ms;
	};

	function getDate(a,b){
		var date;
		var pattern;
		
		if(a==undefined){
			date	= getToday();
			pattern	= 'yyyymmdd';
		}else if(b==undefined){
			date	= getToday();
			pattern	= a;
		}else{
			date	= a;
			pattern	= b;
		}
		
		var yyyy, mm, dd, hh, mi, ss, ms;
		
		if (date.length < 8) {return "�섎せ�� �낅젰";}
		
		yyyy	= date.substr(0,4);
		mm		= date.substr(4,2);
		dd		= date.substr(6,2);
		
		if(date.length >= 14){
			try{
				hh = date.substr(8,2);
				mi = date.substr(10,2);
				ss = date.substr(12,2);
				ms = date.substr(14,3);
			}catch(e){
				hh = (_jex.getInstance().isNull(hh))?"":hh;
				mi = (_jex.getInstance().isNull(mi))?"":mi;
				ss = (_jex.getInstance().isNull(ss))?"":ss;
				ms = (_jex.getInstance().isNull(ms))?"":ms;
			}
		}else{
			hh=mi=ss=ms="";
		}
		
		return pattern.replace(/yyyy/,yyyy).replace(/mm/, mm).replace(/dd/, dd).replace(/hh/, hh).replace(/mi/, mi).replace(/ss/, ss).replace(/ms/,ms);
	};
	function getDayBetween(fromDate,toDate){ 
		return "�꾩쭅 誘멸뎄��"; 
	};
	function getEndDate(yyyy,mm){ 
		return "�꾩쭅 誘멸뎄��"; 
	};
	return {
		getDate			: getDate,
		getDayBetween	: getDayBetween,
		getDayBetween	: getDayBetween
	};
};
//AJAX愿��� �ㅼ젙-Method End

//湲곕낯 �몃뱾�� �깅줉 -- Debugger�곕룞
_jex.getInstance().addErrorHandler("default", function() {alert("Error!");});

//�몃��먯꽌 JEX瑜� �좎뼵�섏� �딅룄濡� 誘몃━ �뺤쓽
var jex = _jex.getInstance();

//String �뺤옣
String.prototype.startsWith	= function(str)  {return (this.match("^"+str)==str);};
String.prototype.endsWith	= function(str)  {return (this.match(str+"$")==str);};
String.prototype.isJSON		= function(str)  {return _jex.getInstance().isJSON(str);};

//Array �뺤옣 -- XecureWeb怨쇱쓽 異⑸룎�덉긽
//Array.prototype.remove = function(from, to) {
//  var rest = this.slice((to || from) + 1 || this.length);
//  this.length = from < 0 ? this.length + from : from;
//  return this.push.apply(this, rest);
//};
//�먮윭諛쒖깮�� 泥섎━ 濡쒖쭅
//window.onerror = function(msg,file_loc,line_num) {
//	jex.printError("","!!!!! " + msg);
//	jex.printError("","Message : " + msg + " file loc : " + file_loc + " line_num : " + line_num);
//	jex.printError("",JSON.stringify(this.stack));
//	jex.printError("",JSON.stringify(this.full_stack));
//	return false;
//};

//jquery plug-in�뺥깭濡� setAll/getAll 援ы쁽 Start
//李⑦썑 JEX PLUG-IN�뺥깭濡� �� 援ы쁽 �좉쾬��. -- �섏쐞 �명솚�깆쓣 �꾪빐 ��젣�� �섏�留먭퀬....�뺣━留� �섏옄.
(function($){
	$.fn.setTagValue = function(dat){
		var tag = $(this).get(0).tagName;
		var type= $(this).attr("type");
		
		switch (tag.toLowerCase()){
        	case "textarea":
        	case "input":
        		if(type=="radio" &&!_jex.getInstance().isNull(dat)){
        			if( $(this).val() == dat ) 
        				$(this).attr("checked", true);        			
    			}else if( type=="checkbox" &&!_jex.getInstance().isNull(dat)){
    			}else    
    				$(this).val(dat);
        		break;
        	case "select":
        		$(this).val(dat);
        		break;
        	case "img" :
        		if(!_jex.getInstance().isNull(dat)) 
        			$(this).attr("src", dat);
        		else if(_jex.getInstance().isNull($(this).attr("src"))) 
        			$(this).remove();
        		
        		break;
        	default :
        		$(this).html(dat);
           		break;
    	};
	};
	
	$.fn.getTagValue=function(){
		var tag = $(this).get(0).tagName;
		var type= $(this).attr("type");
		var rslt= "";
		
		switch (tag.toLowerCase()){
        	case "input":
        		if(type=="radio"){
        			if( $(this).attr("checked")) 
        				rslt = $(this).val();
    			}else if( type=="checkbox" ){        			        			        		
    			}else    
    				rslt = $(this).val();

        		break;
        	case "select" :
        	case "textarea" :
        		rslt = $(this).val();
        		break;
        	case "img" :
        		rslt = $(this).attr("src");
        		break;
        	default :
        		rslt = $(this).html();
           		break;
    	};
    	
    	return rslt;
	};
	
	$.fn.setAll = function(dat, _formatter) {
    	_formatter = (_jex.getInstance().isNull(_formatter))?{}:_formatter;
		
    	$.each($(this).find("[id]"),function() {
			var o = $(this).attr("id");
			
			if (_jex.getInstance().isNull(o)) 
				return true;
			
			var d = dat[o];
			var f = _formatter[o];
			
			if (!_jex.getInstance().isNull(f) && typeof(f)=="function") 
				d=f(d,dat);
		
			if (d!=undefined)
				$(this).setTagValue(d);
		});
		
		return this;
	};
    
	$.fn.getAll = function(_formatter) {
    	var rslt={};
    	_formatter = (_jex.getInstance().isNull(_formatter))?{}:_formatter;
    	
    	$.each($(this).find("[id]"),function() {
			var o = $(this).attr("id");
			
			if (_jex.getInstance().isNull(o)) 
				return true;
			
			var f = _formatter[o];
			var d = $(this).getTagValue();
			
			d=(typeof(f)=="function")?f(d):d;
		
			if (_jex.getInstance().isNull(d)) 
				return true;
			
			rslt[o] = d;
		});
		
    	return rslt;
	};
	
	$.fn.JexSimpleTblHandler = function(cmd, opt) {
		$r = $(this);
		// �� Row瑜� 異붽��쒕떎.
		function addRow(dat){
			var $tr = $("<tr></tr>");
			$.each(dat, function(i,v) { $td = $("<td>"+v+"</td>"); $td.appendTo($tr); });
			$r.find("tbody");
		}
		function make(opt){ 
			$r.JexSimpleTblHandler('makeTblHeader',opt); 
		}
		// �щ윭Row瑜� 異붽��쒕떎.
		function addRows(dat){ 
			$.each(dat, function(i,v){ $r.JexSimpleTblHandler('addRow', v); }); 
		}
		// Row瑜� �뺤쓽�쒕떎.
		function rowDef(opt){ 
			$r.data("rowDef", opt); 
		}
		// �쏳ow瑜� 吏��대떎.
		function delRow(idx){ 
			$r.find("tbody").find("tr:eq("+idx+")").remove(); 
		}
		// TableHeader瑜� �앹꽦�쒕떎.
		function makeTblHeader(dat) {
			var $tr = $("<tr></tr>");
			$.each(dat, function(i,v) { $td = $("<td>"+v+"</td>"); $td.appendTo($tr); });
			$r.find("thead");
		}
		//Plug�� 紐낅졊�뺤쓽
		switch(cmd) {
			case make		: return make(opt);	
			case addRows	: return addRows(opt);
			case addRow		: return addRow(opt);
			case rowDef		: return rowDef(opt);
			case delRow		: return delRow(opt);
		}
	};
 })(jQuery);
//jquery plug-in�뺥깭濡� setAll/getAll 援ы쁽 End

//AJAX泥섎━瑜� �꾪븳 Util Class
var _jexAjaxUtil = function(svc,ext) {
	this.svcId 		= (svc != undefined)?svc:"";
	this.ext		= ext;
	this.async 		= true;
	this.errorTrx	= true;
	this.error		= false;
	this.errFn		= function(xhr, textStatus, errorThrown) {	};
	this.cache		= false;
	this.type		= "POST";
	this.fn			= function() {};
	this.input		= {};
	this.option		= { "loading" : false };
	this.header		= { "cache-control": "no-cache","pragma": "no-cache" };
};

_jexAjaxUtil.prototype.setType	= function(s) { 
	this.type = s; 
};

_jexAjaxUtil.prototype.setSvc = function(s) { 
	this.svcId	= s; 
};

_jexAjaxUtil.prototype.setExt = function(s) { 
	this.ext = s; 
};

_jexAjaxUtil.prototype.setAsync	= function(b) { 
	this.async	= b; 
};

_jexAjaxUtil.prototype.setErr = function(b) { 
	this.error 	= b; 
};

_jexAjaxUtil.prototype.setErrFn	= function(f) { 
	this.errFn 	= f; 
};

_jexAjaxUtil.prototype.setErrTrx = function(b) { 
	this.errorTrx = b; 
};

_jexAjaxUtil.prototype.setFn = function(f) { 
	this.fn = f; 
};

_jexAjaxUtil.prototype.setCache	= function(b) { 
	this.cache 	= b; 
};
_jexAjaxUtil.prototype.setMheader = function(b) {
	this.mHeader  = b; 
};
_jexAjaxUtil.prototype.addHeader= function(key,val) {
	this.header[key] = val; 
};

_jexAjaxUtil.prototype.get = function(key) {
	if (key==undefined)return this.input;
	else return this.input[key];
};

_jexAjaxUtil.prototype.addOption = function(key,value) {
	this.option[key] = value;
};

_jexAjaxUtil.prototype.set = function(key,value) {
	var rthis = this;
	
	if (_jex.getInstance().isNull(key))	
		return;
	
	if (_jex.getInstance().isNull(value)){
		if(typeof(key)!="string"){ 
			$.each(key,function(i,v) { rthis.input[i]=v;  }); 
		}
	}
	
	this.input[key] = value;
};

_jexAjaxUtil.prototype.execute		= function(fn) {
	var str_time = _jex.getInstance().getMicroTime();
	
	if (typeof(fn)=="function")
		this.fn = fn;
	
	var tranData={"_JSON_":encodeURIComponent(JSON.stringify(this.input))};
	
	if (typeof(_jex.getInstance().getAjaxBeforeData())=="function") {
		var imsi = _jex.getInstance().getAjaxBeforeData()(this.input,this.option);
		tranData = (_jex.getInstance().isNull(imsi))?tranData:imsi;
	}
	
	var _this = this;
	var rslt;
	
	if (!_jex.getInstance().isNull(_jex.getInstance().getDebugger())) 
		_jex.getInstance().getDebugger().addMsg({"TYPE":"AJAX","CODE":"INPUT","MSG":"AJAX泥섎━�쒖옉 ["+this.svcId+"]"});
	
	jQuery.ajax({	
		type	: _this.type,
		url		: "/"+_this.svcId+this.ext,
		data	: tranData,
		cache	: _this.cache,
		async	: _this.async,
		error	: _this.errFn,
		headers : _this.header,
		success	: function(msg) {
			try {
				var input=msg;
				
				if (typeof(_jex.getInstance().getAjaxCompleteData())=="function") {
					var imsi = _jex.getInstance().getAjaxCompleteData()(msg,_this.option);
					msg=(_jex.getInstance().isNull(imsi))?msg:imsi;
				}
	
				if (typeof (msg) == "string")	
					input = JSON.parse(msg);
				else
					input = msg;
				
				var p_time = _jex.getInstance().getMicroTime()-str_time;
				
				if (!_jex.getInstance().isNull(_jex.getInstance().getDebugger()))
					_jex.getInstance().getDebugger().addMsg({"TYPE":"AJAX","CODE":"OUTPUT","MSG":"AJAX泥섎━�꾨즺 ["+_this.svcId+"]","PTM":p_time+"ms"});
				
				if (!_this.errorTrx||!_jex.getInstance().isError(input)) {
					_this.fn(input); 
				} else {
					if (!_jex.getInstance().isNull(_jex.getInstance().getAjaxErrFn())) 
						_jex.getInstance().getAjaxErrFn()(input);
					else 
						_jex.getInstance().printError(input);
				}
				
				if (!_this.async) 
					rslt = input;
			} catch (e) {
				_jex.getInstance().checkException(e);
			};
		}
	});
	
	return rslt;
};

(function(){
	  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
	  // The base Class implementation (does nothing)
	  this.Class = function(){};
	  
	  // Create a new Class that inherits from this class
	  Class.extend = function(prop) {
	    var _super = this.prototype;
	    
	    // Instantiate a base class (but only create the instance,
	    // don't run the init constructor)
	    initializing = true;
	    var prototype = new this();
	    initializing = false;
	    
	    // Copy the properties over onto the new prototype
	    for (var name in prop) {
	      // Check if we're overwriting an existing function
	      prototype[name] = typeof prop[name] == "function" && 
	        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
	        (function(name, fn){
	          return function() {
	            var tmp = this._super;
	            
	            // Add a new ._super() method that is the same method
	            // but on the super-class
	            this._super = _super[name];
	            
	            // The method only need to be bound temporarily, so we
	            // remove it when we're done executing
	            var ret = fn.apply(this, arguments);        
	            this._super = tmp;
	            
	            return ret;
	          };
	        })(name, prop[name]) :
	        prop[name];
	    }
	    
	    // The dummy class constructor
	    function Class() {
	      // All construction is actually done in the init method
	      if ( !initializing && this.init ) this.init.apply(this, arguments);
	    }
	    
	    // Populate our constructed prototype object
	    Class.prototype = prototype;
	    
	    // Enforce the constructor to be what we expect
	    Class.constructor = Class;

	    // And make this class extendable
	    Class.extend = arguments.callee;
	    
	    return Class;
	  };
	})();

//Job�� 愿�由ы븯�� Manager�뺤쓽
_JexJobManager = Class.extend({
	init : function() {
		this.jobList = [];
		this.bIsRun  = false;      // �꾩옱 �뚭퀬 �덈뒗吏�
		this.trans   = false;     	// �몃젋�앹뀡 泥섎━以묒씤吏�.
		this.dTime   = 100;       	// 0.05珥덈떦 �쒕쾲�� �ㅽ뻾�섎룄濡�.
	}, 
	add : function(job) {
		this.jobList.push(job);
		if (!this.isRun()) this.runJob();
	}, 
	start : function() {
		this.trans = true;
	}, 
	stop : function() {
		this.trans = false;
		if (!this.isRun()) this.runJob();
	}, 
	runJob : function() {
		if (this.isRun()) return;
		var _this = this;
		this.isRun(true);
		//iPhone ����. iPhone�� 寃쎌슦 App怨� �듭떊�� �꾪븯�� location.href=xxx �뺥깭瑜� �ъ슜�쒕떎.
		//�댁� �숈떆�� Ajax�깆쓽 �듭떊�� 遺덇��ν빐吏�湲� �뚮Ц�� App怨� �듭떊�섎뒗 �쒖젏�먮뒗 JobManager瑜� �쒖슜�섏뿬 �닿껐�쒕떎.
		if (document.readyState != 'loaded' && document.readyState != 'complete') {
			setTimeout(function() {
				_this.isRun(false);
				_this.runJob();
			}, this.dTime);
		} else {
			setTimeout(function() {
				if (!_this.trans && _this.jobList.length > 0) {
					var job = _this.jobList.shift();
					job.apply(_this);
					_this.runJob();
				}
				_this.isRun(false);
			}, this.dTime);
		}
	}, 
	isRun : function(b) {
		if (typeof(b)!=undefined)	
			return	this.bIsRun;
		else
			this.bIsRun = b;
	}
});

_jex.getInstance().setJobManager(new _JexJobManager());

//JEXPLUG-IN �명꽣�섏씠��. (�ш린�쒕뒗 李⑦썑 臾댁뼵媛� 湲곕낯 泥섎━媛� 異붽��� �� �덈떎.)
var JexPlugin = Class.extend({
	init:function() {
	}
});

//Custom肄붾뵫 �곸뿭
var JexCustom = Class.extend({
	init:function() {
		this.addFnList = {};
	},
	addFunction:function(key, fn) {
		this.addFnList[key] = fn;
	},
	getFnList:function() {
		return this.addFnList;
	}
});

//JEX DBUGGER �명꽣�섏씠��. (�ш린�쒕뒗 李⑦썑 臾댁뼵媛� 湲곕낯 泥섎━媛� 異붽��� �� �덈떎.)
var JexDebugger = Class.extend({
	init:function() {
	},
	printDebug:function(msg){
	},
	printInfo:function(code,msg){
	},
	printError:function(code,msg){
	}
});

//JEX MSG �명꽣�섏씠��. (�ш린�쒕뒗 李⑦썑 臾댁뼵媛� 湲곕낯 泥섎━媛� 異붽��� �� �덈떎.)
var JexMsg = Class.extend({
	init:function() {
	},
	printInfo:function(code,msg){
	},
	printError:function(code,msg){
	},
	alert:function(code,msg){
	},
	confirm:function(code,msg,callback){
	}
});

//Page�먯꽌 �ㅽ뻾�댁빞�� Job�� 以꾩꽭�곌린 �꾪빐 �ъ슜�쒕떎.
var pageJobs   =  _jex.getInstance().getJobManager();
var event_top  = "0";
var event_left = "0";

//AJAX泥섎━瑜� �꾪븳 Util Class END

//Jex�뺤쓽
//李⑦썑 泥섎━�� �댁뿭 : printStackTrace() 濡� 硫붿떆吏� 異쒕젰
//blur, focus, focusin, focusout, load, resize, scroll, unload, click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseout, mouseenter, mouseleave, change, select, submit, keydown, keypress, keyup, error
var Jex = Class.extend({
	init:function() {
		var _r = this;
		
		try {
			if (this.beforeOnload)this.beforeOnload();
		} catch (e) {
			_jex.getInstance().checkException(e);
		}
		
		$(function() {
			  _r._executeOnload();
		});
	},
	beforeOnload:function() {
	},
	_executeOnload:function() {
		var _r = this;
		try {
			this.onload0();
			this.onload1();
			this.onload2();
			var beforeonload = _jex.getInstance().getBeforeOnload();
			for (var i=0;i<beforeonload.length;i++) {
				beforeonload[i]();
			}
			pageJobs.add(function() {
				if (_r.event) _r.event();
				if (_r.onload)_r.onload();
				_jex.getInstance().isOnload(true);
			});
			var afteronload = _jex.getInstance().getAfterOnload();
			for (var i=0;i<afteronload.length;i++) {
				var fn = afteronload[i];
				pageJobs.add(function() {
					fn();
				});
			}
		} catch(e) {
			_jex.getInstance().checkException(e);
		};
	}, 
	addEvent :function(selector, eventid, fn) {
		$(selector).bind(eventid, function() { 
			event_top  = $(this).offset().top;
		    event_left = $(this).offset().left;

		    try {
				fn.apply(this,arguments);
			} catch (e) {
				_jex.getInstance().checkException(e);
			}; 
	   });
	}, 
	onload0 :function() {	}, 
	onload1 :function() {	}, 
	onload2 :function() {	}, 
	onload 	:function() {	}, 
	event 	:function() {	}
});

//Exception �뺤쓽 
var Exception = Class.extend({
	init:function(code, msg) {
		this.prototype = Error;
		this.name = "JexException";
		this.code = code;
		this.msg = msg;
		try {
			throw new Error("");
		} catch (e) {
		}
	},
	getCode :function() {
		return this.code;
	},
	getMessage :function() {
		return this.msg;
	},
	printStackTrace:function() {
		alert("stack track");
	},
	getMessage:function() {
		return this.msg;
	},
	onError: function() {
		alert(this.msg);
	}
});

var JexWebException = Exception.extend({
	init:function(code, msg) {
		this._super(code, msg);
	},
	printStackTrace:function() {
		this._super();
	},
	getMessage:function() {
		this._super();
	}
});

var JexSysException = Exception.extend({
	init:function(code, msg) {
		this._super(code, msg);
	},
	printStackTrace:function() {
		this._super();
	},
	getMessage:function() {
		this._super();
	}
});

function loginSessionOut(dvcd){
	try{
 		var jexAjax = jex.createAjaxUtil("com_ebz_logout");
	 	jexAjax.setAsync(false);

		jexAjax.execute(function(dat) {
	 		//寃쎄퀬李� �꾩썙二쇨린(IE, �ы뙆由�)
	 		//try{
		 	//	if(dvcd == 1){	//IE,�ы뙆由� 釉뚮씪�곗� 		
		 	//		var agent = window.navigator.userAgent.toLowerCase();
		 	//		
		 	//		if((agent.indexOf("trident") > -1 || agent.indexOf("msie") > -1 || agent.indexOf("safari") > -1) && agent.indexOf("swing") == -1 ){
		 	//			alert("釉뚮씪�곗��� �대컮 �ъ슜 �먮뒗 二쇱냼 �낅젰�쇰줈 \n\n�뱁럹�댁�媛� 蹂�寃쎈릺�� 濡쒓렇�꾩썐 �섏뿀�듬땲��.");
		 	//		}
		 	//	}else{			//�꾩껜 釉뚮씪�곗�
	 		//		alert("�꾩옱 濡쒓렇�� �� �곹깭�ъ꽌 \n\n 濡쒓렇�꾩썐 �� �ㅼ떆 �묒냽�⑸땲��.");
		 	//	}
	 		//}catch(e){
	 		//}
				
 			location.reload();
		});
	}catch(e){
	}
}

//�덊럹�댁� �대룞�щ� 諛� 硫붾돱�뺣낫 ��젣
var isHref = "N";

try{
	$("body").live('mouseover', function(){
		isHref = "Y";
	});
	
	$("body").live('mouseout', function(){
		isHref = "N";
	});
}catch(ex){
}

//�덊럹�댁�瑜� �좊궇 寃쎌슦 濡쒓렇�꾩썐 泥섎━
window.onunload = function(e){
	try{
		//�앹뾽李쎌씪 寃쎌슦 return
		if(window.opener != null){
			try{
				if($(".pop_head").children().length > 0 && $(".pop_contents").children().length > 0) {
					return;
				}
			}catch(e){
			}
		} 

		//�밸퀎�� �꾨젅�꾩씪 寃쎌슦 return
		if(window.name == "ifr" || window.name == "ifr1" || window.name == "company" || window.name == "ifrLogin" || window.name == "about" || window.name == "contentsIBframe" || window.name == "tempIBframe"){
			return;
		}
		
		//document �덉쓣 �대┃�덉쓣 寃쎌슦 return
		if(isHref == "Y") {
			return;
		}

		//洹몃━�쒗봽濡쒓렇�⑥씠�� html�섏씠吏�瑜� �몄텧�� 寃쎌슦 return
		//�뚯뒪��  
		if((location.href).indexOf("/gridplugin/") > -1 || (location.href).indexOf(".html") > -1 || (location.href).indexOf("smhmp")){
			return;
		}

		//濡쒓렇�� �섏뼱 �덉� �딆� 寃쎌슦 return
		var obj = new Object();
		obj = getLoginSessionInfo();
		
		if( obj.LOGIN_DVCD == "1" || obj.LOGIN_DVCD == "2" ) {
		}else{
			return;
		}

		//�명꽣�룸콉�� 濡쒓렇�몃릺�덉쑝硫�
		loginSessionOut(1);
	}catch(ex){
	}
};