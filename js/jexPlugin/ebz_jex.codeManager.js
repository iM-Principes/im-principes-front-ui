{
	/**
	 * 다음 PLUG-IN은 서버에 등록되어 있는 RSPS-CD를 받아 놓고 Cache하는 PLUG-IN이다.
	 * 다음 PLUG-IN을 사용하기 위해서는 ${DOC_ROOT}/WEB-INF/jex/plugins/pt/codePlugIn.jar 를 추가해주어야 한다.
	 */
	var _JexCodeManager = JexPlugin.extend({
		init:function() {
			this.codeList		= {};
			this.langCodeGroup	= {};
			this.groupCodeList	= {};
			this.cache			= true;	
		}
	/**
	 * 캐쉬된 groupCodeList 에서 해당 하는 CODE 값을 찾아서 반환
	 */
	,getCodeCache : function( group, key){
		var codeMsg = "";
		if( !jex.isNull( this.langCodeGroup[jex.lang()][group])){						
			$.each( this.langCodeGroup[jex.lang()][group], function(i,v){
				if( v != undefined &&  v.KEY == key ){									// 있을경우 break
					codeMsg = v.CODE;
					if( codeMsg.length < 1 ){ codeMsg = key; }
					return false;
				}
			});										
		}
		return codeMsg;				// 값이 없으면 select , 있으면 return
	}
	,setCodeCache: function( group ){
		if( jex.isNull(this.langCodeGroup[jex.lang()])){
			var groupObj = {};
			groupObj[group] = this.getCodeList(group);
			this.langCodeGroup[jex.lang()] = groupObj;			
		}else {
			if( jex.isNull(this.langCodeGroup[jex.lang()][group])){
				var langObj = this.langCodeGroup[jex.lang()];
				langObj[group] = this.getCodeList(group);
				this.langCodeGroup[jex.lang()] = langObj;
			}
		}
	}
	,setCodeListCache : function( group, list){
		
		if( jex.isNull(this.langCodeGroup[jex.lang()])){
			var groupObj = {};
			groupObj[group] = list;
			this.langCodeGroup[jex.lang()] = groupObj;			
		}else {
			if( jex.isNull(this.langCodeGroup[jex.lang()][group])){
				var langObj = this.langCodeGroup[jex.lang()];
				langObj[group] = list;
				this.langCodeGroup[jex.lang()] = langObj;
			}
		}				
	}
	,checkDummyCode : function( key){
		if( "" == key || "~" == key || "-" == key ){
			return true;
		}else {
			return false;
		}
	}
	,setAllMsg			:function() {					// 만약 cash가 true인 경우 전체 코드를 cash한다. :: 업무에 맞게 처음에 전체 로드를 원하면 이걸 쓰면 된다.
		if (!this.cache) return;
		var jexAjax = jex.createAjaxUtil("codePlugin");	// AJAX전송모듈 생성
		var rslt;
		var r = this;
		
		jexAjax.setCache(true);
		jexAjax.addHeader("cache-control","private");
		jexAjax.addHeader("pragma","");
		jexAjax.setType("GET");

		jexAjax.set("DV_CD",	"3"			);
		jexAjax.set("GROUP",	"RSPS_CD"	);
		jexAjax.execute(function(dat) {			
			for (var i=0; i<dat['RESULT'].length; i++) {
				var v = dat['RESULT'][i];
				r.codeList[dat['RESULT'][i]['KEY']] = dat['RESULT'][i]['CODE'];
				jex.printDebug(jex.toStr(v));
			}
		});

	},getMsg			:function(key) {				// 각 코드를 불러놓고 cache할지 말지 결정한다. 만약 cache되어 있음 말구.
		if (jex.isNull(key)) return "";
		if ( this.checkDummyCode(key)) return "";
//		if ( this.cache && !jex.isNull( this.langCodeGroup[jex.lang()])){	//해당 그룹의 cache 정보가 있을경우  cache 정보에서 탐색							
//			var codeMsg = this.getCodeCache("RSPS_CD", key);
//			if( codeMsg.length > 0 ) return codeMsg;
//		}
		var jexAjax = jex.createAjaxUtil("codePlugin");	// AJAX전송모듈 생성
		var rslt;
		jexAjax.setCache(true);
		jexAjax.addHeader("cache-control","private");
		jexAjax.addHeader("pragma","");
		jexAjax.setType("GET");

		jexAjax.setAsync(false);
		jexAjax.set("DV_CD",	"1"			);
		jexAjax.set("GROUP",	"RSPS_CD"	);
		jexAjax.set("KEY",		key			);
		jexAjax.execute(function(dat) { rslt = dat;});
		if (jex.isNull(rslt) || jex.isNull(rslt['RESULT'])) return "";
		//if (this.cache) this.setCodeCache( "RSPS_CD" );
		return rslt['RESULT'];

	},getCodeMsg			:function(group, key) {
		if ( jex.isNull(key)) return "";
		if ( this.checkDummyCode(key)) return "";
		if ( this.cache && !jex.isNull( this.langCodeGroup[jex.lang()])){	//해당 그룹의 cache 정보가 있을경우  cache 정보에서 탐색							
			var codeMsg = this.getCodeCache(group, key);								
			if( codeMsg.length > 0 ) return codeMsg;
		}
		var jexAjax = jex.createAjaxUtil("codePlugin");	// AJAX전송모듈 생성
		var rslt;
		
		jexAjax.setCache(true);
		jexAjax.addHeader("cache-control","private");
		jexAjax.addHeader("pragma","");
		jexAjax.setType("GET");

		jexAjax.setAsync(false);
		jexAjax.set("DV_CD",	"1"	);
		jexAjax.set("GROUP",	group	);
		jexAjax.set("KEY",		key		);
		jexAjax.execute(function(dat) { rslt = dat; });
		
		if (jex.isNull(rslt) || jex.isNull(rslt['RESULT'])) return "";
		if (this.cache) this.setCodeCache( group );
		return rslt['RESULT'];

	},getCodeList			:function(group) {				// 각 코드를 불러놓고 cache할지 말지 결정한다. 만약 cache되어 있음 말구.
		
		if (jex.isNull(group)) return "";
		if (this.cache && !jex.isNull(this.langCodeGroup[jex.lang()])){
			if( !jex.isNull(this.langCodeGroup[jex.lang()][group])){
				return this.langCodeGroup[jex.lang()][group];
			}
		}
		var jexAjax = jex.createAjaxUtil("codePlugin");	// AJAX전송모듈 생성
		var rslt;
		jexAjax.setCache(true);
		jexAjax.addHeader("cache-control","private");
		jexAjax.addHeader("pragma","");
		jexAjax.setType("GET");

		jexAjax.setAsync(false);
		jexAjax.set("DV_CD",	"3"	);
		jexAjax.set("GROUP",	group	);
		jexAjax.execute(function(dat) { rslt = dat; });
		if (jex.isNull(rslt) || jex.isNull(rslt['RESULT'])) return "";
		if (this.cache) this.setCodeListCache( group , rslt['RESULT'] );				
		return rslt['RESULT'];

	}
	});
	jex.plugin.add("CODE_MANAGER",new _JexCodeManager());
}	
$(function() {
	jex.setMsgFn(function(key) {
		if( !jex.getRootDom().jex.plugin.get("CODE_MANAGER") ) return jex.plugin.get("CODE_MANAGER").getMsg(key); 
		return jex.plugin.get("CODE_MANAGER").getMsg(key);
	});
});