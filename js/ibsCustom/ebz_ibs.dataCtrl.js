
/**
 * <pre>
 * DGBIB PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : ebz_hmp.dataCtrl.js
 * @File path    	 : DGBHP_PT_STATIC/web/js/hmpCustom
 * @Description    : 오브젝트 처리를 위한 스크립트파일
 * </pre>
 **/

var dataCtrl = new (Class.extend({
	init : function() {		
	},
	/**
	 * JSON 데이터를 셋팅한다.
	 * @param key	: 키값
	 * @param obj	: JSON Object 혹은 String 형태의 JSON 데이터
	 */	
	setObjData : function(key, obj){
		if( !this.isStringType(obj)){
			alert("dataType 혹은 data 가 올바르지 않습니다.");
			return;
		}else {	
			var jexAjax= jex.createAjaxUtil("JEX_EBZ_DATA_SET");
			jexAjax.setAsync(false);
			jexAjax.set("FIELD_KEY", key);
			jexAjax.set("DATA_OBJECT", obj);
			jexAjax.execute(function(dat) {});
		}		
	},
	/**
	 * JSON 데이터를 가져온다.
	 * @param key	: 키값
	 * @returns JSONObject
	 */	
	getObjData : function(key, filter){
		var result = null;
		var jexAjax= jex.createAjaxUtil("JEX_EBZ_DATA_GET");
		jexAjax.setAsync(false);
		jexAjax.set("FIELD_KEY", key);
		if( filter != undefined && filter.length > 0 ) jexAjax.set("FILTER_KEY", filter);		
		
		jexAjax.execute(function(dat) {
			result = jex.parse(dat.DATA_OBJECT);
		});		
		return result;		
	},
	/**
	 * JSON 데이터를 삭제한다.
	 * @param key	: 키값
	 */	
	delObjData : function(key){
		var jexAjax= jex.createAjaxUtil("JEX_EBZ_DATA_DEL");
		jexAjax.setAsync(false);
		jexAjax.set("FIELD_KEY", key);
		jexAjax.execute(function(dat) {});				
	},
	/**
	 * obj 가 String 타입일 경우 true 를 리턴한다.
	 * @param obj
	 * @returns {Boolean}
	 */	
	isStringType : function(obj){
		if( typeof obj == "string"){
			return true; 
		}else {
			return false;
		}				
	}
}))();	
