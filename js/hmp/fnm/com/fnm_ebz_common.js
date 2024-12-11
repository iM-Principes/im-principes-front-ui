
/**
 * <pre>
 * DGBIB PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name      : fnm_ebz_common.js
 * @File path    	 : DGBIB_PT_STATIC/web/js/fnm/fnm
 * @author       	 : 김원진 
 * @Description    : 금융상품몰 공통함수
 * @History      	 : 20121108140350, 김원진
 * </pre>
 **/


var arrCompareProd 		= new Array(); 	//비교상품내용
var _ARR_RECENT_PROD 	= []; 			//최근본상품내용

/*Session Info*/
var _USPS_ID		; //이용자ID
var _LWR_USPS_ID	; //하위이용자ID

/*탭이동을 위한 변수*/
var _PRE_TAB_ID = "tab_01"; //이전탭 ID 저장

/* 세션에 세팅될 페이지이동시 전달변수 */
var _HMP_VIEWID	         ; //뷰 ID	            
var _HMP_PRCD	         ; //상품코드
var _HMP_PRNM	         ; //상품명
var _HMP_COMP_PRCD_1	 ; //비교상품코드1	    
var _HMP_COMP_PRCD_2	 ; //비교상품코드2	    
var _HMP_COMP_PRCD_3	 ; //비교상품코드3	    
var _HMP_COMP_PRCD_4	 ; //비교상품코드4	    
var _HMP_COMP_PRNM_1	 ; //비교상품명1	      
var _HMP_COMP_PRNM_2	 ; //비교상품명2	      
var _HMP_COMP_PRNM_3	 ; //비교상품명3	      
var _HMP_COMP_PRNM_4	 ; //비교상품명4	      
var _HMP_PD_DVCD	     ; //보험상품구분코드	
var _HMP_GRD	         ; //펀드위험등급	    
var _HMP_TYPE	         ; //펀드타입	        
var _HMP_IS_INPR_PAGE_YN ; //관심상품페이지여부
var _HMP_IS_TODAY_YN	 ; //오늘본상품여부
var _HMP_PAGE_INDEX      ; //리스트 페이지 인덱스
var _HMP_SORT_TYPE       ; //리스트 정렬기준값
var _HMP_SCH_OBJ = {}    ; //각 리스트 조회구분값 Object
var _HMP_ELF             ; //ELF여부
var _HMP_URL_PARAM       ; //URL_NEW_CHNL_INPUT_DVCD  값( 네이버검색진입시 전달되는값)

var _DEPO_DEF_IMG_URL = "../../img/common/card/ebz_depo_test.jpg";
var _FOEX_DEF_IMG_URL = "../../img/common/card/ebz_foreign_test.jpg";
var _FUND_DEF_IMG_URL = "../../img/common/card/ebz_fund_test.jpg";
var _LOAN_DEF_IMG_URL = "../../img/common/card/ebz_loan_test.jpg";
var _INSR_DEF_IMG_URL = "../../img/common/card/ebz_insur_test.jpg";

var pdfMergeRealNm = "";
var pdfMergePdNm = "";

var _LOGIN_SESSION;

$(document).ready(function(){
	
	var obj = jex.plugin.get("SELECT_BOX");
	obj.applyForm("#inputBody");
	
    //로그인세션값 조회
	_LOGIN_SESSION = getLoginSessionInfo(true);
	
	if (jex.null2Void(_LOGIN_SESSION.USPS_ID) == "") { 
		_USPS_ID     = "LOGOUT"; //이용자ID
		_LWR_USPS_ID = "LOGOUT"; //하위이용자ID
	} else { 
		_USPS_ID     = _LOGIN_SESSION.USPS_ID; 
		_LWR_USPS_ID = _LOGIN_SESSION.USPS_ID; 
	}
	
	
	//웹접근성 Summary  자동생성
	fnSetSummary();
});

/*
 * common 에서 보유중인 전역변수를 세션에 set
 * PAGE간 이동 발생직전에 호출 된다.
 * */
function setPageParameterCom()
{
	//데이터 클리어
	dataCtrl.delObjData('FNM_DATA');	
	var jObj = {};

	jObj._HMP_VIEWID          = _HMP_VIEWID;
	jObj._HMP_PRCD            = _HMP_PRCD;
	jObj._HMP_COMP_PRCD_1     = _HMP_COMP_PRCD_1;
	jObj._HMP_COMP_PRCD_2     = _HMP_COMP_PRCD_2;
	jObj._HMP_COMP_PRCD_3     = _HMP_COMP_PRCD_3;
	jObj._HMP_COMP_PRCD_4     = _HMP_COMP_PRCD_4;
	jObj._HMP_COMP_PRNM_1     = _HMP_COMP_PRNM_1;
	jObj._HMP_COMP_PRNM_2     = _HMP_COMP_PRNM_2;
	jObj._HMP_COMP_PRNM_3     = _HMP_COMP_PRNM_3;
	jObj._HMP_COMP_PRNM_4     = _HMP_COMP_PRNM_4;
	jObj._HMP_PD_DVCD         = _HMP_PD_DVCD;
	jObj._HMP_GRD             = _HMP_GRD;
	jObj._HMP_TYPE            = _HMP_TYPE;
	jObj._HMP_IS_INPR_PAGE_YN = _HMP_IS_INPR_PAGE_YN;
	jObj._HMP_IS_TODAY_YN     = _HMP_IS_TODAY_YN;
	jObj._HMP_PAGE_INDEX      = _HMP_PAGE_INDEX;
	jObj._HMP_SORT_TYPE       = _HMP_SORT_TYPE;
	jObj._HMP_SCH_OBJ         = _HMP_SCH_OBJ;
	jObj._HMP_ELF         	  = _HMP_ELF;
	jObj._HMP_URL_PARAM       = _HMP_URL_PARAM;

		
	dataCtrl.setObjData('FNM_DATA', JSON.stringify(jObj));
}


/*
 * 세션 에서 보유중인 변수를 common 전역변수에 set
 * PAGE간 이동 발생직후에 호출 된다.
 * */
function getPageParameterCom()
{
	_HMP_VIEWID	         = ""; //뷰 ID	         
	_HMP_PRCD	         = ""; //상품코드	         
	_HMP_COMP_PRCD_1	 = ""; //비교상품코드1	     
	_HMP_COMP_PRCD_2	 = ""; //비교상품코드2	     
	_HMP_COMP_PRCD_3	 = ""; //비교상품코드3	     
	_HMP_COMP_PRCD_4	 = ""; //비교상품코드4	     
	_HMP_COMP_PRNM_1	 = ""; //비교상품명1	         
	_HMP_COMP_PRNM_2	 = ""; //비교상품명2	         
	_HMP_COMP_PRNM_3	 = ""; //비교상품명3	         
	_HMP_COMP_PRNM_4	 = ""; //비교상품명4	         
	_HMP_PD_DVCD	     = ""; //보험상품구분코드	     
	_HMP_GRD	         = ""; //펀드위험등급	         
	_HMP_TYPE	         = ""; //펀드타입	         
	_HMP_IS_INPR_PAGE_YN = ""; //관심상품페이지여부    
	_HMP_IS_TODAY_YN	 = ""; //오늘본상품여부	  
	_HMP_PAGE_INDEX      = ""; //리스트 페이지 인덱스
	_HMP_SORT_TYPE       = ""; //리스트 정렬기준값
	_HMP_SCH_OBJ         = {}; //각 리스트 조회구분값 Object
	_HMP_ELF             = ""; //ELF펀드여부
	_HMP_URL_PARAM       = "";  //URL_NEW_CHNL_INPUT_DVCD  값( 네이버검색진입시 전달되는값)
	var jObj = {};
	jObj = dataCtrl.getObjData('FNM_DATA');
	
	if(jObj != null)
	{
		if(jex.null2Void(jObj._HMP_VIEWID         ) != "") { _HMP_VIEWID          = jObj._HMP_VIEWID;          }                     
		if(jex.null2Void(jObj._HMP_PRCD	          ) != "") { _HMP_PRCD            = jObj._HMP_PRCD;            }                     
		if(jex.null2Void(jObj._HMP_COMP_PRCD_1    )	!= "") { _HMP_COMP_PRCD_1     = jObj._HMP_COMP_PRCD_1;     }                
		if(jex.null2Void(jObj._HMP_COMP_PRCD_2    )	!= "") { _HMP_COMP_PRCD_2     = jObj._HMP_COMP_PRCD_2;     }                
		if(jex.null2Void(jObj._HMP_COMP_PRCD_3    )	!= "") { _HMP_COMP_PRCD_3     = jObj._HMP_COMP_PRCD_3;     }                
		if(jex.null2Void(jObj._HMP_COMP_PRCD_4    )	!= "") { _HMP_COMP_PRCD_4     = jObj._HMP_COMP_PRCD_4;     }                
		if(jex.null2Void(jObj._HMP_COMP_PRNM_1    )	!= "") { _HMP_COMP_PRNM_1     = jObj._HMP_COMP_PRNM_1;     }                
		if(jex.null2Void(jObj._HMP_COMP_PRNM_2	  ) != "") { _HMP_COMP_PRNM_2     = jObj._HMP_COMP_PRNM_2;     }                
		if(jex.null2Void(jObj._HMP_COMP_PRNM_3	  ) != "") { _HMP_COMP_PRNM_3     = jObj._HMP_COMP_PRNM_3;     }                
		if(jex.null2Void(jObj._HMP_COMP_PRNM_4	  ) != "") { _HMP_COMP_PRNM_4     = jObj._HMP_COMP_PRNM_4;     }                
		if(jex.null2Void(jObj._HMP_PD_DVCD	      ) != "") { _HMP_PD_DVCD         = jObj._HMP_PD_DVCD;         }                
		if(jex.null2Void(jObj._HMP_GRD	          ) != "") { _HMP_GRD             = jObj._HMP_GRD;             }                
		if(jex.null2Void(jObj._HMP_TYPE	          ) != "") { _HMP_TYPE            = jObj._HMP_TYPE;            }                
		if(jex.null2Void(jObj._HMP_IS_INPR_PAGE_YN) != "") { _HMP_IS_INPR_PAGE_YN = jObj._HMP_IS_INPR_PAGE_YN; }
		if(jex.null2Void(jObj._HMP_IS_TODAY_YN	  ) != "") { _HMP_IS_TODAY_YN     = jObj._HMP_IS_TODAY_YN;     }
		if(jex.null2Void(jObj._HMP_PAGE_INDEX     ) != "") { _HMP_PAGE_INDEX      = jObj._HMP_PAGE_INDEX;      }
		if(jex.null2Void(jObj._HMP_SORT_TYPE      ) != "") { _HMP_SORT_TYPE       = jObj._HMP_SORT_TYPE;       }
		
		if (jObj._HMP_SCH_OBJ != {} && jObj._HMP_SCH_OBJ != null) {
			_HMP_SCH_OBJ     = jObj._HMP_SCH_OBJ;
		}
		if(jex.null2Void(jObj._HMP_ELF      ) != "") { _HMP_ELF       = jObj._HMP_ELF;       }
		if(jex.null2Void(jObj._HMP_URL_PARAM) != "") { _HMP_URL_PARAM = jObj._HMP_URL_PARAM;  }
		
		jObj._HMP_COMP_PRCD_1 = "";
		jObj._HMP_COMP_PRCD_2 = "";
		jObj._HMP_COMP_PRCD_3 = "";
		jObj._HMP_COMP_PRCD_4 = "";
		jObj._HMP_COMP_PRNM_1 = "";
		jObj._HMP_COMP_PRNM_2 = "";
		jObj._HMP_COMP_PRNM_3 = "";
		jObj._HMP_COMP_PRNM_4 = "";
		
		if (_HMP_VIEWID.substr(0,3) != _VIEW_ID.substr(0,3)) {
			//상품 카테고리가 달라지면 리스트 페이지 인덱스를 1로 변경
			_HMP_PAGE_INDEX = 1;
		} else {
			//상품상세페이지가 아닌 경우에 _HMP_VIEWID와 _VIEW_ID가 다르면 리스트 페이지 인덱스를 1로 변경
			if (_VIEW_ID != "fnc_ebz_11030_card" //카드
			   && _VIEW_ID != "fnf_ebz_31030_fund" //펀드
			   && _VIEW_ID != "fnl_ebz_41030_loan" //대출
			   && _VIEW_ID != "fnp_ebz_21030_depo" //예금
			   && _VIEW_ID != "fnr_ebz_65030_retr" //퇴직연금
			   && _VIEW_ID != "fni_ebz_71030_insu" //보험
			   && _VIEW_ID != "fne_ebz_54030_foex" //외환
				) {
				if (_HMP_VIEWID != _VIEW_ID) {
					_HMP_PAGE_INDEX = 1;
					jObj._HMP_PAGE_INDEX = 1;	
				}
				
			} 
		}
		
		dataCtrl.delObjData('FNM_DATA');
		
		dataCtrl.setObjData('FNM_DATA', JSON.stringify(jObj));

//		alert("_HMP_PAGE_INDEX = " + _HMP_PAGE_INDEX + "\n" + "_HMP_VIEWID = " + _HMP_VIEWID + "\n" + "_VIEW_ID = " + _VIEW_ID);
	}
}

//new (Jex.extend({
//	onload:function() {
//		_this = this;		
//		/* 공통코드 호출 */
//		var obj = jex.plugin.get("SELECT_BOX");
//	    obj.applyForm("#inputBody");
//		
//	    /* 세션호출 (2012.12.05 서버 이동후 보류중)*/
//	    _USPS_ID 	 = "LOGOUT";
//	    _LWR_USPS_ID = "LOGOUT";
////		_this.getSessionInfo();
//	} , getSessionInfo : function (){
//		var jexAjax = jex.createAjaxUtil("com_ebz_user_info");
//		jexAjax.execute(function(dat) {
//			
//			if(dat.USPS_ID     == null ||  dat.USPS_ID     == undefined) 	_USPS_ID 	 = "LOGOUT";
//			else 							_USPS_ID 	= dat.USPS_ID;
//			
//			if(dat.LWR_USPS_ID == null ||  dat.LWR_USPS_ID == undefined)    _LWR_USPS_ID = "LOGOUT";
//			else 						  _LWR_USPS_ID 	= dat.LWR_USPS_ID;
//		});
//	}
//}))();




/*
 * '비교함' top & botttom 출력 
 * @Description : '비교함' top & botttom 출력
 * ex ) drawCompareItemsCom("div_compare_top","div_compare_bot");
 * @Parameter
 * 1 . div_compare_top 			: 상단 비교함 DIV ID
 * 2 . div_compare_bot 			: 하단 비교함 DIV ID 
 */
function drawCompareItemsCom(div_compare_top, div_compare_bot)
{	
		if (_HMP_COMP_PRCD_1 != "null" && _HMP_COMP_PRCD_1 != "undefined" && _HMP_COMP_PRCD_1 != "")
			arrCompareProd.push(new Array(_HMP_COMP_PRCD_1, _HMP_COMP_PRNM_1));
		if (_HMP_COMP_PRCD_2 != "null" && _HMP_COMP_PRCD_2 != "undefined" && _HMP_COMP_PRCD_2 != "")
			arrCompareProd.push(new Array(_HMP_COMP_PRCD_2, _HMP_COMP_PRNM_2));
		if (_HMP_COMP_PRCD_3 != "null" && _HMP_COMP_PRCD_3 != "undefined" && _HMP_COMP_PRCD_3 != "")
			arrCompareProd.push(new Array(_HMP_COMP_PRCD_3, _HMP_COMP_PRNM_3));
		if (_HMP_COMP_PRCD_4 != "null" && _HMP_COMP_PRCD_4 != "undefined" && _HMP_COMP_PRCD_4 != "")
			arrCompareProd.push(new Array(_HMP_COMP_PRCD_4, _HMP_COMP_PRNM_4));
	
	var label_text = "상품을 4개까지 선택하여 비교할 수 있습니다."; //getCodeValueCom("CODE_SVC", "1003");
	
	//보험상품 화면에서는 비교하기 버튼이 비활성화
	var btn_disabled = "";

	if (_HMP_VIEWID.substring(0, 3) == "fni") {
		btn_disabled = "disabled=\"disabled\" ";
	}
	
	if (arrCompareProd.length > 0) {
		//비교함에 상품 있음		
		var strCompareHtmlTop = "<ul class=\"compare\">"
			+ "<li style=\"display:none;\" id=\"li_compare_label_top\"><span class=\"pro_none\">" + label_text + "</span></li>"
			+ "<li style=\"display:block;\" id=\"li_compare_top\">";
		for (var i=0; i < arrCompareProd.length; i++) {
			strCompareHtmlTop += "<div class=\"pro_name\"><span class=\"ellipsis\">" + arrCompareProd[i][1] + "</span>"
						+ "<input type=\"image\" src=\"../../../img/common/btn/ebz_btn_del_compare.png\" onclick=\"delCampareItemCom('" + arrCompareProd[i][0] + "', '" + arrCompareProd[i][1] + "')\" alt=\"삭제\" title=\"삭제\"/>"
						+ "</div>";
		}
		strCompareHtmlTop += "</li>"
			+ "<li class=\"right\">"
			+ "<span class=\"btn medium cpre\"><button id=\"btn_compare_top\" onClick=\"javascript:openComparePopup();\" type=\"button\" " + btn_disabled + "title=\"비교하기 (새창으로 열림)\">상품비교</button><em class=\"hidden\">새창으로 이동</em></span><!-- 스마트 기기는 레이어 팝업 -->"
			+ "</li>"
			+ "</ul>";
		
		var strCompareHtmlBot = "<ul class=\"compare\">"
			+ "<li style=\"display:none;\" id=\"li_compare_label_bot\"><span class=\"pro_none\">" + label_text + "</span></li>"
			+ "<li style=\"display:block;\" id=\"li_compare_bot\">";
		for (var i=0; i < arrCompareProd.length; i++) {
			strCompareHtmlBot += "<div class=\"pro_name\"><span class=\"ellipsis\">" + arrCompareProd[i][1] + "</span>"
						+ "<input type=\"image\" src=\"../../../img/common/btn/ebz_btn_del_compare.png\" onclick=\"delCampareItemCom('" + arrCompareProd[i][0] + "', '" + arrCompareProd[i][1] + "')\" alt=\"삭제\" title=\"삭제\"/>"
						+ "</div>";
		}
		strCompareHtmlBot += "</li>"
			+ "<li class=\"right\">"
			+ "<span class=\"btn medium cpre\"><button id=\"btn_compare_bot\" onClick=\"javascript:openComparePopup();\" type=\"button\" " + btn_disabled + "title=\"비교하기 (새창으로 열림)\">상품비교</button><em class=\"hidden\">새창으로 이동</em></span><!-- 스마트 기기는 레이어 팝업 -->"
			+ "</li>"
			+ "</ul>";
		$("#"+div_compare_top).append(strCompareHtmlTop);
		$("#"+div_compare_bot).append(strCompareHtmlBot);
		
	} else {
		var strCompareHtmlTop =  "<ul class=\"compare\">"
			+"<li style=\"display:block;\" id=\"li_compare_label_top\"><span class=\"pro_none\">" + label_text + "</span></li>"
			+"<li style=\"display:none;\" id=\"li_compare_top\">"
			+"</li>"
			+"<li class=\"right\">"
			+"<span class=\"btn medium cpre\"><button id=\"btn_compare_top\" onClick=\"javascript:openComparePopup();\" type=\"button\" " + btn_disabled + "title=\"비교하기 (새창으로 열림)\">상품비교</button><em class=\"hidden\">새창으로 이동</em></span><!-- 스마트 기기는 레이어 팝업 -->"
			+"</li>"
			+"</ul>";

		var strCompareHtmlBot =  "<ul class=\"compare\">"
			+"<li style=\"display:block;\" id=\"li_compare_label_bot\"><span class=\"pro_none\">" + label_text + "</span></li>"
			+"<li style=\"display:none;\" id=\"li_compare_bot\">"
			+"</li>"
			+"<li class=\"right\">"
			+"<span class=\"btn medium cpre\"><button id=\"btn_compare_bot\" onClick=\"javascript:openComparePopup();\" type=\"button\" " + btn_disabled + "title=\"비교하기 (새창으로 열림)\">상품비교</button><em class=\"hidden\">새창으로 이동</em></span><!-- 스마트 기기는 레이어 팝업 -->"
			+"</li>"
			+"</ul>";
		
		$("#"+div_compare_top).append(strCompareHtmlTop);
		$("#"+div_compare_bot).append(strCompareHtmlBot);			
	}
	
}


/*
 * 관심상품 갯수 출력
 * @Description  : 관심상품 출력
 * ex)drawIntrestProCom("div_interest");
 * @Parameter
 * 1 . div_interest : 관심상품DIV ID
 */
function drawIntrestProCom(div_interest)
{
	/* 항목초기화 */
	$("#"+div_interest	).empty();

	var cntInterest = 0;
	
	var strInterestHtml = "";
	
	//var strInterestHtml = "";
	$("#"+div_interest	).append(strInterestHtml);
//	alert(_LWR_USPS_ID);
	if (_LWR_USPS_ID != "LOGOUT") {
		var hmpg_pd_clacd = ""; 
//		var viewId = $("#viewId").val();
		var viewId = _HMP_VIEWID;
		var subviewId = "";
		if (viewId.substring(0, 3) == "com") {
			//보험
			subviewId = viewId.substr(8,3);
			if (subviewId == "fpm"){
				subviewId = "fnc";
			}
		}
		if (viewId.substring(0, 3) == "fnc" || subviewId == "fnc") {
			//카드
			hmpg_pd_clacd = "01";
			
		} else if (viewId.substring(0, 3) == "fnp" || subviewId == "fnp") {
			//예금
			hmpg_pd_clacd = "02";
			
		} else if (viewId.substring(0, 3) == "fnf" || subviewId == "fnf") {
			//펀드
			hmpg_pd_clacd = "04";
			
		} else if (viewId.substring(0, 3) == "fnl" || subviewId == "fnl") {
			//대출
			hmpg_pd_clacd = "05";
			
		} else if (viewId.substring(0, 3) == "fne" || subviewId == "fne") {
			//외환
			hmpg_pd_clacd = "06";
			
		} else if (viewId.substring(0, 3) == "fnr" || subviewId == "fnr") {
			//퇴직연금
			hmpg_pd_clacd = "07";
			
		} else if (viewId.substring(0, 3) == "fni" || subviewId == "fni") {
			//보험
			hmpg_pd_clacd = "08";
		} 
		
		var jexAjax = jex.createAjaxUtil("fnm_ebz_10110_inpr_d002");
		
		jexAjax.set("LWR_USPS_ID",   _LWR_USPS_ID);   //하위이용자ID
		jexAjax.set("HMPG_PD_CLACD", hmpg_pd_clacd);  //홈페이지상품분류코드
		
		/* Async false */
		jexAjax.setAsync(false);
		
		jexAjax.execute(function(dat) {
			if (dat.CNT != null) {
				cntInterest = dat.CNT;
			} else {
				cntInterest = 0;
			}
			
			strInterestHtml = "<div class=\"num\"><a id=\"aInterCnt\" href=\"javascript:goInprPageCom();\">"+cntInterest+"</a></div>";
			//strInterestHtml = "<a id=\"aInterCnt\" href=\"javascript:goInprPageCom();\">"+cntInterest+"</a>";

			/* 항목 append */
			$("#"+div_interest	).append(strInterestHtml);
		});
		
	} else {
		strInterestHtml = "<div class=\"num\"><a id=\"aInterCnt\" href=\"javascript:goInprPageCom();\">"+cntInterest+"</a></div>";
		//strInterestHtml = "<a id=\"aInterCnt\" href=\"javascript:goInprPageCom();\">"+cntInterest+"</a>";

		/* 항목 append */
		$("#"+div_interest	).append(strInterestHtml);
	}
	
}

/*
 * 금융상품 공시실 자료 파일 경로 출력
 * */
function getFilePathForFnm( pdCd        //상품코드
					        ,atcFileDvcd //첨부파일구분(1:약관/2:상품설명서/3:이자율조건표/6:공통약관)
					        ,pdPrdDvcd   //상품구분코드(01:예금/02:펀드/03:신탁/04:퇴직연금/05:방카/06:전자금융/07:외환/08:카드/09:개인대출/10:기업대출/11:복합금융상품)
					        ,hmpgFnPdDvcd//상품상세구분(11:적립식예금/12:거치식예금/13:입출자유예금/14:주택청약예금/...)****상품대분류의 전체공통약관인 경우 '99:해당없음'
	       ){
	var fileObj = "";
	var jexAjax = jex.createAjaxUtil("fnm_ebz_10000_file_d001");
	
	//신탁 상품의 경우 상품원장이 존재하지 않으므로 ,  공시실 게시번호를 KEY로 간주하고 ,
	//입력받은 상품코드를 공시실 게시번호로 넣어 조회해온다. 
	//신탁상품에 대한 공시실 번호 목록은 뱅킹 사용담당자에게 별도 전달함(관리자 공시실에서 열람 가능). 2013.07.08

	if(pdPrdDvcd == "03"){
		jexAjax.set("PUTUP_WRIT_SEQ"	, jex.null2Void(pdCd)*1  	);   //게시글 일련번호<-상품코드
		jexAjax.set("PD_CD"				, ""                 		);   //상품코드
	}else{
		jexAjax.set("PD_CD"				, jex.null2Void(pdCd)  		);   //상품코드
		jexAjax.set("PUTUP_WRIT_SEQ"	, 0                  		);   //게시글 일련번호<-상품코드
	}
	
	jexAjax.set("ATC_FILE_DVCD"  	, jex.null2Void(atcFileDvcd)  	);   //첨부파일구분
	jexAjax.set("PD_PRV_DVCD"  		, jex.null2Void(pdPrdDvcd)  	);   //상품구분코드
	jexAjax.set("HMPG_FN_PD_DVCD"  	, jex.null2Void(hmpgFnPdDvcd)   );   //상품상세구분
	
	
	jexAjax.setAsync(false);
	
	jexAjax.execute(function(dat) {
	if (dat == null) {
	fileObj = "none";
	} else {
	fileObj = dat;
	}
	});
	
	/*************************************************************************/
	/** dat.RL_FILE_NM  (ex : 23423423145.pdf)                 실제파일명칭 **/
	/** dat.RL_FILE_PATH(ex : /upload/file/bbs/)               실제파일경로 **/
	/** dat.FILE_PATH   (ex : /upload/file/bbs/23423423145.pdf)전체링크경로 **/
	/** dat.DB_FILE_NM  (ex : 예금상품약관.pdf)                 업로드 파일명**/
	/*************************************************************************/
	return fileObj;
}

/* 공시실 게시물 시쿼스로 파일경로 출력 */
function getFilePathForFnmBySeq(seq,atcFileDvcd){
	var fileObj = "";
	var jexAjax = jex.createAjaxUtil("fnm_ebz_10000_file_d001");
	
	jexAjax.set("PUTUP_WRIT_SEQ"	, jex.null2Void(seq)*1  	);   //게시글 일련번호<-상품코드
	jexAjax.set("PD_CD"				, ""                 		);   //상품코드
	jexAjax.set("ATC_FILE_DVCD"  	, jex.null2Void(atcFileDvcd));   //첨부파일구분
	jexAjax.set("PD_PRV_DVCD"  		, ""  	                    );   //상품구분코드
	jexAjax.set("HMPG_FN_PD_DVCD"  	, ""                        );   //상품상세구분
	
	jexAjax.setAsync(false);
	
	jexAjax.execute(function(dat) {
		if (dat == null) {
			fileObj = "none";
		} else {
			fileObj = dat;
		}
	});
	
	/*************************************************************************/
	/** dat.RL_FILE_NM  (ex : 23423423145.pdf)                 실제파일명칭 **/
	/** dat.RL_FILE_PATH(ex : /upload/file/bbs/)               실제파일경로 **/
	/** dat.FILE_PATH   (ex : /upload/file/bbs/23423423145.pdf)전체링크경로 **/
	/** dat.DB_FILE_NM  (ex : 예금상품약관.pdf)                 업로드 파일명**/
	/*************************************************************************/
	window.open(fileObj.FILE_PATH);
}

//금융상품 공시실 자료 파일 경로 출력 - 첨부파일 포함.
//getFilePathForFnmEtc( "10508001000996000", '8' , '01' , '')          -> 기존 getFilePathForFnm 와 동일하게 사용. result :: 모든 첨부파일 조회 REC
//getFilePathForFnmEtc( "10508001000996000", '8' , '01' , '', '17')    -> 첨부파일 순번을 조회
//getFilePathForFnmEtc( "10508001000996000", '8' , '01' , '', '', '개인신용정보제3자제공동의서(핀크).pdf')    -> 첨부파일 명으로 조회
function getFilePathForFnmEtc( pdCd         // 상품코드
                        ,atcFileDvcd     // 첨부파일구분(1:약관/2:상품설명서/3:이자율조건표/6:공통약관/7: /8:기타)
                        ,pdPrdDvcd       // 상품구분코드(01:예금/02:펀드/03:신탁/04:퇴직연금/05:방카/06:전자금융/07:외환/08:카드/09:개인대출/10:기업대출/11:복합금융상품)
                        ,hmpgFnPdDvcd    // 상품상세구분(11:적립식예금/12:거치식예금/13:입출자유예금/14:주택청약예금/...)****상품대분류의 전체공통약관인 경우 '99:해당없음'
                        ,atcFileSeq      // 첨부파일순번
                        ,hmpgAtcFileNm   // 첨부파일명
                        ,dlYn            // 삭제여부
                        ,bbsId           // 게시판
                      ){
    var fileObj = "";
    var jexAjax = jex.createAjaxUtil("fnm_ebz_10000_file_d003");

    // 신탁 상품의 경우 상품원장이 존재하지 않으므로 ,  공시실 게시번호를 KEY로 간주하고 ,
    // 입력받은 상품코드를 공시실 게시번호로 넣어 조회해온다.
    // 신탁상품에 대한 공시실 번호 목록은 뱅킹 사용담당자에게 별도 전달함(관리자 공시실에서 열람 가능). 2013.07.08
    if(pdPrdDvcd == "03"  || pdPrdDvcd == "04"){
        if(jex.null2Void(pdCd) != "")
            jexAjax.set("PUTUP_WRIT_SEQ", pdCd);            //게시글 일련번호<-상품코드
    }else{
        if(jex.null2Void(pdCd) != "")
            jexAjax.set("PD_CD"         , pdCd);            //상품코드
    }
    
    if(jex.null2Void(atcFileDvcd) != "")
        jexAjax.set("ATC_FILE_DVCD"     , atcFileDvcd   );  //첨부파일구분
    
    if(jex.null2Void(pdPrdDvcd) != "")
        jexAjax.set("PD_PRV_DVCD"       , pdPrdDvcd     );  //상품구분코드
    
    if(jex.null2Void(hmpgFnPdDvcd) != "")
        jexAjax.set("HMPG_FN_PD_DVCD"   , hmpgFnPdDvcd  );  //상품상세구분
    
    if(jex.null2Void(atcFileSeq) != "")
        jexAjax.set("ATC_FILE_SEQ"      , atcFileSeq    );  //첨부파일순번
    
    if(jex.null2Void(hmpgAtcFileNm) != "")
        jexAjax.set("HMPG_ATC_FILE_NM"  , hmpgAtcFileNm );  //첨부파일명
    
    if(jex.null2Void(dlYn) != "")
        jexAjax.set("DL_YN"  , dlYn );
    
    if(jex.null2Void(bbsId) != "")
        jexAjax.set("BBS_ID"  , bbsId );
    
    jexAjax.setAsync(false);
    
    jexAjax.execute(function(dat){
        if(dat == null){
            fileObj = "none";
        }else{
            fileObj = dat;
        }
    });

    //-------------------------------------------------------------------------/
    //dat.REC
    //  REC[0].DB_FILE_NM  (ex : 예금상품약관.pdf)                 업로드 파일명  /
    //  REC[0].RL_FILE_NM  (ex : 23423423145.pdf)                 실제파일명칭  /
    //  REC[0].FILE_PATH_NM(ex : /upload/file/bbs/)               실제파일경로  /
    //  REC[0].FILE_PATH   (ex : /upload/file/bbs/23423423145.pdf)전체링크경로  /
    //-------------------------------------------------------------------------/
    return fileObj;
}

/*
 * 관심상품 페이지 이동.
 * @Description  : 관심상품 페이지 이동
 * ex)goInprPageCom()
 * @Parameter
 */
function goInprPageCom()
{
	
//	alert("fnm_ebz_common");
	if (jex.null2Void(_LOGIN_SESSION.USPS_ID) == "") {
		if(confirm("로그인이 필요합니다.\n\n로그인 페이지로 이동하시겠습니까?")) {
			var bankUrl = _CodeMgr.getCodeMsg("CODE_URL", "1001");
			parent.location.href = bankUrl + "com_ebz_11010_J001.act";
		} else {
			return;
		}
	} else {
		_HMP_PAGE_INDEX = 1;
	
		setPageParameterCom();
	    location.href = "fnm_ebz_10110_inpr.act";	
	}
}


/*
 * 오늘본상품명 출력
 * @Description  : 오늘본 상품명 출력
 * ex)drawTodayProCom("div_today");
 * @Parameter
 * 1 . div_interest : 오늘본상품DIV ID
 */
function drawTodayProCom(div_today, inprTodayYn)
{
	/* 항목초기화 */
	$("#"+div_today		).empty();
	
//	var curViewId = $("#viewId").val();
	var curViewId = _HMP_VIEWID;
	
	if($.cookie("_ARR_RECENT_PROD") != null){
		var temp = $.cookie("_ARR_RECENT_PROD");
		_ARR_RECENT_PROD = JSON.parse(temp);
	}
	
	var strTodayHtml 	=  "<ul id=\"ul_today\">"; 
	
	/* 반복부 */
	/*최근본 상품List 출력*/
	var loop = 0;
	$.each( _ARR_RECENT_PROD , function(i, v) {
		if(curViewId.substr(0,3) ==  v.VI.substr(0,3)) {

			v.NM = (v.NM).replace( /</g,"&lt;").replace( />/g,"&gt;");

			strTodayHtml 	+= "<li><a href=\"javascript:goDetailPageCom('" + v.CD + "','" + v.NM + "','" + v.VI + "',''";
			if (inprTodayYn == "Y") {
				strTodayHtml += ",'Y'";
			}else{
				strTodayHtml += ",''";
			}
			strTodayHtml += ",'"+ v.M_VAL +"','"+ v.M_ID +"',"+ v.M_NUM +");\">" + substrTitle(v.NM) + "</a></li>";
			++loop;
		}
		
		//최근 본 상품은 최대 5개만 출력되도록 함
		if (loop >= 5) {
			return false;
		}	
	});
		
	strTodayHtml 		+= "</ul>";
			
	/* 항목 append */
	$("#"+div_today		).append(strTodayHtml);
}

function substrTitle( val ){
	if (val.length > 10){
		val = val.substring(0,10) + "...";
	}
	return val;
}

/*
 *각 상품 상세페이지 이동 
 * @Description  : 각 상품별 상세페이지로 이동
 * @Parameter
 * 1 . productCd
 * 2 . productNm  (카드 : 'fnc카드명' 펀드 : 'fnf펀드명')
 * 3 . viewId     (최근본 리스트의 viewId)
 * 4 . pdDvcd     (보험상품구분코드, ※관심상품리스트에 보험상품에서만 값이 넘어와서 사용됨)
 * 5 . inprTodayYn (관심상품화면에서 최근본 상품으로 들어왔는지 여부)
 * */
function goDetailPageCom(productCd , productNm , viewId, pdDvcd, inprTodayYn , mLoc , mId , mNum)
{
	
	/* 최근본 상품 쿠키등록 */
	// 관심상품화면에서는 쿠키등록 안함
//	if($("#hidIsInprPageYn").val() != "Y") {
	
//	alert("In goDetailPageCom!");
	if(_HMP_IS_INPR_PAGE_YN != "Y") {
		//인터넷뱅킹에서 사용하는 화면에서는 쿠키등록안함
		if ((viewId.split("_")[2].substr(2,3) != "000") || (productNm != "")) {

			if(mLoc != undefined){
				parent.leftMenuPage(mLoc,mId,mNum);				
			}

			addRecentProdCom(productCd, productNm , viewId);
		}
	}
	
	var prDvCd 	= viewId.substr(0,3);
	var actName = "";
//	var curViewId = $("#viewId").val();
	var curViewId = _HMP_VIEWID;
	
	
	/* 쿠키값이 생성된 시점의 list viewId 와 현재 List의 viewId가 상이할때, 히든비교목록을 전부제거. */
	if(curViewId != viewId){
//		for (var i = 0; i < 4; i++) {
//			$("#hidCompPrcd_" + (i+1)).val("");
//			$("#hidCompPrnm_" + (i+1)).val("");
			
		_HMP_COMP_PRCD_1 ="";
		_HMP_COMP_PRCD_2 ="";
		_HMP_COMP_PRCD_3 ="";
		_HMP_COMP_PRCD_4 ="";
		_HMP_COMP_PRNM_1 ="";
		_HMP_COMP_PRNM_2 ="";
		_HMP_COMP_PRNM_3 ="";
		_HMP_COMP_PRNM_4 ="";
			
//		}		
	}
	
	if(prDvCd == "fnc"){
		actName += "fnc_ebz_11030_card"; //카드
	}
	else if(prDvCd == "fnf"){
		actName += "fnf_ebz_31030_fund"; //펀드
	}
	else if (prDvCd == "fnl"){
		actName += "fnl_ebz_41030_loan"; //대출
	}
	else if (prDvCd == "fnp"){
		actName += "fnp_ebz_21030_depo"; //예금
	}
	else if (prDvCd == "fnr"){
		actName += "fnr_ebz_65030_retr"; //퇴직연금
	}
	else if (prDvCd == "fni"){
		actName += "fni_ebz_71030_insu"; //보험
		_HMP_PD_DVCD = pdDvcd;       //보험상품구분코드
		                             // 보험상품 테이블엔 Key필드가 두개(보험상품구분코드, 보험상품코드)여서 보험상품구분코드까지 같이 넘어가도록 하기 위함 
	}
	else if (prDvCd == "fne"){
		actName += "fne_ebz_54030_foex"; //외환
	} 
	else if (prDvCd == "fnd"){
		//뱅킹에서 사용 (추후 연결방식에 대한 가이드 필요!! ※뱅킹과 홈페이지가 서버가 다르므로)
		actName += "fnd_ebz_31030_fund";

	}
	actName += ".act";
	
	if (inprTodayYn == "Y") {
		_HMP_IS_TODAY_YN = "Y";
	} else {
		_HMP_IS_TODAY_YN = "N";
	}
	
	_HMP_VIEWID  = viewId;
	_HMP_PRCD	 = productCd;
	
	var obj = {
            'url' : viewId
    };
    dataCtrl.setObjData('CANCEL_PAGE', JSON.stringify(obj));
    
	setPageParameterCom();
	
	location.href = actName;
}

/*
 * ELF 상세페이지 이동 
 * @Description  : 각 상품별 상세페이지로 이동
 * @Parameter
 * 1 . productCd
 * 2 . productNm  (카드 : 'fnc카드명' 펀드 : 'fnf펀드명')
 * 3 . viewId     (최근본 리스트의 viewId)
 * 4 . pdDvcd     (보험상품구분코드, ※관심상품리스트에 보험상품에서만 값이 넘어와서 사용됨)
 * 5 . inprTodayYn (관심상품화면에서 최근본 상품으로 들어왔는지 여부)
 * */
function goDetailElfPage(productCd , productNm , viewId, pdDvcd, inprTodayYn , mLoc , mId , mNum)
{
	
	/* 최근본 상품 쿠키등록 */
	// 관심상품화면에서는 쿠키등록 안함
	if(_HMP_IS_INPR_PAGE_YN != "Y") {
		//인터넷뱅킹에서 사용하는 화면에서는 쿠키등록안함
		if ((viewId.split("_")[2].substr(2,3) != "000") || (productNm != "")) {

			if(mLoc != undefined){
				parent.leftMenuPage(mLoc,mId,mNum);				
			}

			addRecentProdCom(productCd, productNm , viewId);
		}
	}
	
	var prDvCd 	= viewId.substr(0,3);
	var actName = "";
	var curViewId = _HMP_VIEWID;
	
	
	/* 쿠키값이 생성된 시점의 list viewId 와 현재 List의 viewId가 상이할때, 히든비교목록을 전부제거. */
	if(curViewId != viewId){

		_HMP_COMP_PRCD_1 ="";
		_HMP_COMP_PRCD_2 ="";
		_HMP_COMP_PRCD_3 ="";
		_HMP_COMP_PRCD_4 ="";
		_HMP_COMP_PRNM_1 ="";
		_HMP_COMP_PRNM_2 ="";
		_HMP_COMP_PRNM_3 ="";
		_HMP_COMP_PRNM_4 ="";
	}
	
	if(prDvCd == "fnf"){
		actName += "fnf_ebz_52010_fund"; //ELF펀드(링크주소 연결)
	}

	actName += ".act";
	
	if (inprTodayYn == "Y") {
		_HMP_IS_TODAY_YN = "Y";
	} else {
		_HMP_IS_TODAY_YN = "N";
	}
	
	_HMP_VIEWID  = viewId;
	_HMP_PRCD	 = productCd;
	
	setPageParameterCom();
	
	location.href = actName;
}


function setSesByComp(){	
	$.each( $("#inputBody").find(":input"), function(i, v) {
		if(v.type == "checkbox"){
			if($("#"+v.id).is(":checked") == true){
				_HMP_SCH_OBJ[v.id] = 'Y';
			}else{
				_HMP_SCH_OBJ[v.id] = 'N';
			}
		} else if (v.type == "button") {
			
		}
		else{
			_HMP_SCH_OBJ[v.id] = v.value;
		}
	});
}

function setCompBySesObj(){
	jex.setAll("#inputBody", _HMP_SCH_OBJ);
	
	$.each( $("#inputBody").find(":input"), function(i, v) {
		if(v.type == "checkbox"){
			if(_HMP_SCH_OBJ[v.id] == "Y"){
				$("#"+v.id).attr("checked","checked");
			}
		}else{
			if (v.type != "button") {
				$("#"+v.id).val(_HMP_SCH_OBJ[v.id]);
			}
		}
	});
}

/*
 *List 체크선택시 비교함에 상품명 올리기 
 * @Description  : 상품별 공통js 로 생성된리스트의 체크박스 선택시 비교함 컨트롤.
 *                 선택시 비교함에 올려주고 , 해제시 비교함에서 비워준다.  (히든필드 제어 공동수행)
 * @Parameter
 * 1 . chkIdx    		: 상품의 List 상 Idx
 * 2 . chk_compare_pro	: List상 chk box의 ID
 * 3 . productCd 		: 상품코드
 * 4 . productNm 		: 상품명
 * */

function chkListCom(productCd , productNm){
	
	var isChk = $("#chk_" + productCd).is(':checked'); //checkBox의 체크여부
	if (isChk) {
		addCompareItemCom(productCd, productNm);
	} else {
		delCampareItemCom(productCd, productNm);
		$("#lab_" + productCd).attr("class", "btn_checkbox01");
	}
}

/*
 * 비교함 항목추가
 * @Description  : 상품별 공통js 로 생성된리스트의 체크박스 선택시 비교함 컨트롤.
 *                 체크박스 선택시 비교함에 올려준다.
 */
function addCompareItemCom(productCd , productNm)
{
	
	// 첫 항목 선택일 경우 
	if (arrCompareProd.length == 0) {
		$("#li_compare_label_top").attr("style", "display:none");
		$("#li_compare_top").attr("style", "display:block");
		
		$("#li_compare_label_bot").attr("style", "display:none");
		$("#li_compare_bot").attr("style", "display:block");
	}
	
	// 기존항목 추가일 경우 (상세페이지에서)
	for (var i = 0; i < arrCompareProd.length; i++) {
		if (arrCompareProd[i][0] == productCd) {
			alert("이미 추가된 상품입니다.");
			$("#chk_" + productCd).attr("checked", false);
			$("#lab_" + productCd).attr("class", "btn_checkbox01");
			return;
		}
	}
	if (arrCompareProd.length >= 4) {
		alert("상품은 최대 4개까지 비교할 수 있습니다.");
		$("#chk_" + productCd).attr("checked", false);
		$("#lab_" + productCd).attr("class", "btn_checkbox01");
		return;
	}
	
	$("#lab_" + productCd).attr("class", "btn_checkbox01 on");
	
	arrCompareProd.push(new Array(productCd, productNm));
	
	var divData = "<div class=\"pro_name\"><span class=\"ellipsis\">" + arrCompareProd[arrCompareProd.length-1][1] + "</span>"
	            + "<input type=\"image\" src=\"../../../img/common/btn/ebz_btn_del_compare.png\" onclick=\"delCampareItemCom('" + arrCompareProd[arrCompareProd.length-1][0] + "', '" + arrCompareProd[arrCompareProd.length-1][1] + "')\" alt=\"삭제\" title=\"삭제\"/>"
	            + "</div>";
	
	$("#li_compare_top").append(divData);
	$("#li_compare_bot").append(divData);
	
	//비교함 전역변수에 값셋팅
	if(arrCompareProd.length       == 1){
		_HMP_COMP_PRCD_1 = arrCompareProd[arrCompareProd.length-1][0];
		_HMP_COMP_PRNM_1 = arrCompareProd[arrCompareProd.length-1][1];
	}else if(arrCompareProd.length == 2){
		_HMP_COMP_PRCD_2 = arrCompareProd[arrCompareProd.length-1][0];
		_HMP_COMP_PRNM_2 = arrCompareProd[arrCompareProd.length-1][1];
	}else if(arrCompareProd.length == 3){
		_HMP_COMP_PRCD_3 = arrCompareProd[arrCompareProd.length-1][0];
		_HMP_COMP_PRNM_3 = arrCompareProd[arrCompareProd.length-1][1];
	}else if(arrCompareProd.length == 4){
		_HMP_COMP_PRCD_4 = arrCompareProd[arrCompareProd.length-1][0];
		_HMP_COMP_PRNM_4 = arrCompareProd[arrCompareProd.length-1][1];
	}
	
}

/*
 * 비교함 항목제거 
 * @Description  : 상품별 공통js 로 생성된리스트의 체크박스 선택시 비교함 컨트롤.
 *                 선택시 비교함에 올려주고 , 해제시 비교함에서 비워준다.  (히든필드 제어 공동수행)
 * @Parameter
 * 1 . chkIdx    		: 상품의 List 상 Idx
 * 2 . chk_compare_pro	: List상 chk box의 ID
 * 3 . productCd 		: 상품코드
 * 4 . productNm 		: 상품명
 * */
function delCampareItemCom(productCd , productNm)
{
	/*
	 * 기존 비교상품 항목에서 삭제대상 항목을 찾아 
	 * 해당 항목을 제외한 나머지 항목을 연결하여 arrCompareFund에 적용
	 *   예) 기존항목 = ["a","b","c","d"]
	 *       삭제항목 = "b"
	 *       일 때, 삭제 후 결과 = ["a","c","d"]
	*/
	var arrRemoveData = new Array(productCd, productNm);
	var tempSlice = new Array();
	
	for (var i = 0; i < arrCompareProd.length; i++) {
		if (arrCompareProd[i][0] == arrRemoveData[0]) {
			tempSlice = arrCompareProd.slice(0, i).concat(arrCompareProd.slice(i+1));
		}
	}
	arrCompareProd = tempSlice;
	
	//해당 항목이 체크가 되어있으면 체크해제 
	//(삭제버튼 클릭 이벤트일 경우를 위해 작업)
	//if ($("#chk_" + productCd).is(":checked") == true) {
		$("#chk_" + productCd).attr("checked", false);
		$("#lab_" + productCd).attr("class", "btn_checkbox01");
	//}
	
	// 선택한 비교상품 항목을 모두 삭제 했을 때
	if (arrCompareProd.length == 0) {
		$("#li_compare_top").empty();
		$("#li_compare_bot").empty();
		
		$("#li_compare_label_top").attr("style", "display:block");
		$("#li_compare_top").attr("style", "display:none");
		
		$("#li_compare_label_bot").attr("style", "display:block");
		$("#li_compare_bot").attr("style", "display:none");
		
	} else {
		//선택된 비교상품 항목을 다시 적용함 (인덱스문제로 인해 다시그려줌)
		$("#li_compare_top").empty();
		$("#li_compare_bot").empty();
		
		for (var i=0; i < arrCompareProd.length; i++) {
			var divData = "<div class=\"pro_name\"><span class=\"ellipsis\">" + arrCompareProd[i][1] + "</span>"
						+ "<input type=\"image\" src=\"../../../img/common/btn/ebz_btn_del_compare.png\" onclick=\"delCampareItemCom('" + arrCompareProd[i][0] + "', '" + arrCompareProd[i][1] + "')\" alt=\"삭제\" title=\"삭제\"/>"
						+ "</div>";
			
			$("#li_compare_top").append(divData);
			$("#li_compare_bot").append(divData);
			
		}
			
	}
	

	_HMP_COMP_PRCD_1 ="";
	_HMP_COMP_PRCD_2 ="";
	_HMP_COMP_PRCD_3 ="";
	_HMP_COMP_PRCD_4 ="";
	_HMP_COMP_PRNM_1 ="";
	_HMP_COMP_PRNM_2 ="";
	_HMP_COMP_PRNM_3 ="";
	_HMP_COMP_PRNM_4 ="";
	

	for (var i = 0; i < arrCompareProd.length; i++) {
		eval("_HMP_COMP_PRCD_"+(i+1)+" = arrCompareProd["+i+"][0];");
		eval("_HMP_COMP_PRNM_"+(i+1)+" = arrCompareProd["+i+"][1];");
	}
}

/*
 * 최근본 상품 등록
 * @Description  : 금융상품몰 공통 관심상품 등록
 * @Parameter
 * 1 . productCd : 상품코드 
 * */
function addRecentProdCom(productCd, productNm , viewId)
{
	var flag = true;
	
	// 기존항목 추가일 경우 (상세페이지에서)
	$.each( _ARR_RECENT_PROD, function(i, v) {
		
		if (v.CD == productCd) {						
			flag = false;
			
		}
	});
	
	if(flag){
		var obj    = {};		
		var lObj   = {};
		lObj       = dataCtrl.getObjData('MENU_LOCATION');
		try{
			if(lObj.MENU_DEPTH == "0"){
				lObj.MENU_LOCATION += "_1";
			}

		// 웹취약점추가
		if(chkFilter(productCd) || chkFilter(productNm) ){
			history.back();
			return;
		}


		obj.CD = productCd; 
		obj.NM = productNm;
		obj.VI = viewId;
		obj.M_VAL = lObj.MENU_LOCATION;
		obj.M_ID  = lObj.ID;
		obj.M_NUM = lObj.NUM;
		
		_ARR_RECENT_PROD.unshift(obj); //배열의 첫번째 원소 추가
		
		/*cookie 초기화*/
		$.cookie('_ARR_RECENT_PROD', null);
		/*cookie 값넣기*/
		$.cookie('_ARR_RECENT_PROD', JSON.stringify(_ARR_RECENT_PROD));		
		}catch(e){}
	}

}

/*
 * 웹취약점 체크
 */
function chkFilter(val)
{
	if( val == null || val == "" ){
		return false;
	}
	if( (/<script|lt;script|%3Cscript|script/i).test(val)
		|| val.toLowerCase().indexOf("onerror") > -1
		|| val.toLowerCase().indexOf("onload") > -1
		|| val.toLowerCase().indexOf("alert") > -1 )
	{

		alert("보안위협이 발생하여 거래를 중단합니다.");
		return true;
	}
	return false;
}

/*
 *관심상품등록 
 * @Description  : 금융상품몰 공통 관심상품 등록
 * @Parameter
 * 1 . productCd : 상품코드
 * */
function regInterestProCom(productCd , dvCd)
{
	if(confirm("관심상품으로 등록 하시겠습니까?"))
	{
		//로그인여부체크
		if (jex.null2Void(_LOGIN_SESSION.USPS_ID) == "") {
			if(confirm("로그인이 필요합니다.\n\n로그인 페이지로 이동하시겠습니까?")) {
				var bankUrl = _CodeMgr.getCodeMsg("CODE_URL", "1001");
				parent.location.href = bankUrl + "com_ebz_11010_J001.act";
			} else {
				return;	
			}
			
		} else {
			var jexAjax = jex.createAjaxUtil("fnm_ebz_10110_inpr_d003");
			
			jexAjax.set("USPS_ID"          , _USPS_ID			);//이용자ID            
			jexAjax.set("LWR_USPS_ID"      , _LWR_USPS_ID		);//하위이용자ID
			
			jexAjax.set("HMPG_PD_CLACD"    , String(dvCd)		);//홈페이지상품분류코드(01:카드 02:예금 03:신탁 04:펀드 05:대출 06:외환)	    
			jexAjax.set("PD_CD"            , String(productCd)	);//상품코드/*productCd*/
			
			jexAjax.execute(function(dat) {
				//aInterCnt
				if (dat.PD_CD == String(productCd)) {
					alert("이미 관심상품으로 등록되었습니다.");
				} else {
					alert("관심상품 등록 완료.");	
					//관심상품수 숫자 변경
					var interCnt = $("#aInterCnt").text();
					$("#aInterCnt").text(parseInt(interCnt) + 1);
					if($('#product_contents_'+productCd)){
					    $('#product_contents_'+productCd).find('a').addClass('on');
					} //관심상품 on class 추가
					
				}
				
			});		
		}
	}
}

/*탭변경시 IFRAME사이즈설정*/
function setJexTabSize(curTabId) {
	var parentObj = $(window.parent.document);
	var ifr_height = $(parentObj).find("iframe").height();
	
	var pTabH = $("#" + _PRE_TAB_ID).height();
	var cTabH = $("#" + curTabId).height();
	
	var chgHeight = cTabH - pTabH; //현재탭의 높이 - 이전탭의 높이
	
	$(parentObj).find("iframe").attr("height", ifr_height + chgHeight);
	
	_PRE_TAB_ID = curTabId;
}


/*
 * 공통코드 값 가져오기
 * @param   code1  -  대분류코드값
 *          code2  -  소분류코드값
 */
function getCodeValueCom(code1, code2) {
//	var codeManager = jex.plugin.get("CODE_MANAGER");
//	var codeValue 	= codeManager.getCodeMsg(code1, code2);
	var codeValue 	= _CodeMgr.getCodeMsg(code1, code2);
	
	return codeValue;
}


/*
 * 공통코드를 사용하는 컨트롤들의 값 표시
 */
function drawCodeValueCom() {
	return; //2013.01.22 해당 사항은 홈페이지에 적용안됨
	
	/********** CODE_SVC ************/
	if ($("#div_svc_1004").length > 0) { $("#div_svc_1004").append(getCodeValueCom("CODE_SVC", "1004")); }
	if ($("#div_svc_1005").length > 0) { $("#div_svc_1005").append(getCodeValueCom("CODE_SVC", "1005")); }
	if ($("#div_svc_1006").length > 0) { 
		// TODO : 로그인여부 체크필요
//		if (로그인?) {
//			$("#div_svc_1006").append(getCodeValueCom("CODE_SVC", "1007"));
//		} else {
//			$("#div_svc_1006").append(getCodeValueCom("CODE_SVC", "1006") + getCodeValueCom("CODE_SVC", "1007"));
//		}
		$("#div_svc_1006").append(getCodeValueCom("CODE_SVC", "1006") + getCodeValueCom("CODE_SVC", "1007")); //임시
	}
	
	
	/********** CODE_BTN ************/
	//가입하기
	if ($("#btn_btn_1010").length > 0) {
		var btn_btn_1010 = getCodeValueCom("CODE_BTN", "1010");
		$("#btn_btn_1010").attr("title", btn_btn_1010);
		$("#btn_btn_1010").text(btn_btn_1010);
	}
	
	//비교함담기
	if ($("#btn_btn_1012").length > 0) {
		var btn_btn_1012 = getCodeValueCom("CODE_BTN", "1012");
		$("#btn_btn_1012").attr("title", btn_btn_1012);
		$("#btn_btn_1012").text(btn_btn_1012);
	}
	
	//관심상품등록
	if ($("#btn_btn_1011").length > 0) {
		var btn_btn_1011 = getCodeValueCom("CODE_BTN", "1011");
		$("#btn_btn_1011").attr("title", btn_btn_1011);
		$("#btn_btn_1011").text(btn_btn_1011);
	}
	
	//상품목록
	if ($("#btn_btn_1013_1").length > 0) { 
		var btn_btn_1013_1 = getCodeValueCom("CODE_BTN", "1013");
		$("#btn_btn_1013_1").attr("title", btn_btn_1013_1);
		$("#btn_btn_1013_1").text(btn_btn_1013_1);
	}
	if ($("#btn_btn_1013_2").length > 0) { 
		var btn_btn_1013_2 = getCodeValueCom("CODE_BTN", "1013");
		$("#btn_btn_1013_2").attr("title", btn_btn_1013_2);
		$("#btn_btn_1013_2").text(btn_btn_1013_2);
	}

	//비교하기
	if ($("#btn_btn_1014").length > 0) { 
		var btn_btn_1014 = getCodeValueCom("CODE_BTN", "1014");
		$("#btn_btn_1014").attr("title", btn_btn_1014);
		$("#btn_btn_1014").text(btn_btn_1014);
	}
	
	//검색하기
	if ($("#btn_btn_1015").length > 0) { 
		var btn_btn_1015 = getCodeValueCom("CODE_BTN", "1015");
		$("#btn_btn_1015").attr("title", btn_btn_1015);
		$("#btn_btn_1015").text(btn_btn_1015);
	}
	
	//상품상세보기
	if ($("#btn_btn_1018").length > 0) { 
		var btn_btn_1018 = getCodeValueCom("CODE_BTN", "1018");
		$("#btn_btn_1018").attr("title", btn_btn_1018);
		$("#btn_btn_1018").text(btn_btn_1018);
	}
	
	//닫기(팝업)
	if ($("#btn_btn_1019").length > 0) { 
		var btn_btn_1019 = getCodeValueCom("CODE_BTN", "1019");
		$("#btn_btn_1019").attr("title", btn_btn_1019);
		$("#btn_btn_1019").text(btn_btn_1019);
	}	
	
	//댓글등록
	if ($("#btn_btn_1021").length > 0) { 
		var btn_btn_1021 = getCodeValueCom("CODE_BTN", "1021");
		$("#btn_btn_1021").attr("title", btn_btn_1021);
		$("#btn_btn_1021").text(btn_btn_1021);
	}
	
	//조회
	if ($("#btn_btn_1022").length > 0) { 
		var btn_btn_1022 = getCodeValueCom("CODE_BTN", "1022");
		$("#btn_btn_1022").attr("title", btn_btn_1022);
		$("#btn_btn_1022").text(btn_btn_1022);
	}
	
	/********** CODE_INPUT ************/
	if ($("#span_input_1003").length > 0) { $("#span_input_1003").append(getCodeValueCom("CODE_INPUT", "1003")); }
	
	/********** CODE_GUID ************/
	if ($("#li_guid_1010").length > 0) { $("#li_guid_1010").append(getCodeValueCom("CODE_GUID", "1010")); }
	if ($("#li_guid_1011").length > 0) { $("#li_guid_1011").append(getCodeValueCom("CODE_GUID", "1011")); }
	
}

/*
 * 글자수 바이트 계산
 */
function getByteLength(str) {
	var l = 0;
	
	for (var idx=0; idx < str.length; idx++) {
		var c = escape(str.charAt(idx));
		
		if (c.length == 1) {
			l++;
		} else if (c.indexOf("%u") != -1) {
			l += 2;
		} else if (c.indexOf("%") != -1) {
			l += c.length/3;
		}
	}
	
	return l;
};

/*
 * 상품가입 화면호출(서브메인)
 * */
function goProductJoinByPdCd(pdCd){
	var linkInfoCn 		= "";
	var arrList    		= "";
	
	var callViewId 		= "";
	var returnViewId 	= "";
	var menuVal 		= "";
	var menuId 			= "";
	var menuNum 		= "";
	
	var jexAjax 		= jex.createAjaxUtil("fnm_ebz_10110_dscr_d001");

	jexAjax.set("PD_CD"          , pdCd );
	
	jexAjax.setAsync(false);
	
	jexAjax.execute(function(dat) {
		linkInfoCn = dat.LINK_INFO;
	});
	
	if(linkInfoCn != ""){
		arrList = linkInfoCn.split("|");

		/* LINK 정보분리작업 */
		for(var i=0;i < arrList.length;i++){		
			if(i == 0){
				callViewId 		= arrList[i];
			}
			else if(i == 1){
				returnViewId 	= arrList[i];
			}
			else if(i == 2){
				menuVal 		= arrList[i];
			}
			else if(i == 3){
				menuId 			= arrList[i];
			}
			else if(i == 4){			
				menuNum 		= arrList[i]*1;
			}
		}
		
		
		var pdDv = callViewId.substr(1,3);	
		
		var jObj = {};
		
		jObj.PD_CD          = pdCd;
		jObj.CALL_VIEW_ID 	= callViewId;
		jObj.RETURN_VIEW_ID = returnViewId;
		jObj.MENU_VAL 		= menuVal;
		jObj.MENU_ID 		= menuId;
		jObj.MENU_NUM 		= menuNum;
		
		dataCtrl.setObjData('FNM_JOIN_DATA'  , JSON.stringify(jObj));
		
		location.href = "/com_ebz_fpm_main.act";
//		if(pdDv == "fnc"){
//			location.href = "/com_ebz_fpm_main.act";
//		}else if(pdDv == "fnp"){
//			
//		}else if(pdDv == "fnf"){
//			
//		}else if(pdDv == "fnl"){
//			
//		}else if(pdDv == "fnr"){
//			
//		}else if(pdDv == "fne"){
//			
//		}else if(pdDv == "fni"){
//			
//		}
	}
}


function goProductJoinByLinkInfoCn(pdCd1,pdCd2,pdCd3,linkInfoCn){

	var pdCd = pdCd1+pdCd2+pdCd3;
	var arrList    		= "";
	
	var callViewId 		= "";
	var returnViewId 	= "";
	var menuVal 		= "";
	var menuId 			= "";
	var menuNum 		= "";

	if(linkInfoCn != ""){
		arrList = linkInfoCn.split("|");

		/* LINK 정보분리작업 */
		for(var i=0;i < arrList.length;i++){		
			if(i == 0){
				callViewId 		= arrList[i];
			}
			else if(i == 1){
				returnViewId 	= arrList[i];
			}
			else if(i == 2){
				menuVal 		= arrList[i];
			}
			else if(i == 3){
				menuId 			= arrList[i];
			}
			else if(i == 4){			
				menuNum 		= arrList[i]*1;
			}
		}
		
		
		var pdDv = callViewId.substr(1,3);	
		
		var jObj = {};
		
		jObj.PD_CD          = pdCd;
		jObj.CALL_VIEW_ID 	= callViewId;
		jObj.RETURN_VIEW_ID = returnViewId;
		jObj.MENU_VAL 		= menuVal;
		jObj.MENU_ID 		= menuId;
		jObj.MENU_NUM 		= menuNum;
		
		dataCtrl.setObjData('FNM_JOIN_DATA'  , JSON.stringify(jObj));
		
		location.href = "/com_ebz_fpm_main.act";
	}
}



/*
 * 상품상세 호출(서브메인or 베너에서 사용)
 * pdCd1 : 상품코드 6자리
 * pdCd2 : 상품코드 6자리
 * pdCd3 : 상품코드 5자리
 * linkDv : D 상세호출  J 가입뱅킹 호출
 * */

function goProductDetailByLinkInfoCn(pdCd1,pdCd2,pdCd3,linkDv,levelDv,linkInfoCn){

	var pdCd = pdCd1+pdCd2+pdCd3;
	
	if(jex.null2Void(pdCd) != "" && jex.null2Void(pdCd) != "~"){
		var arrList    		= "";
		
		var callViewId 		= "";
		var returnViewId 	= "";
		var menuVal 		= "";
		var menuId 			= "";
		var menuNum 		= "";
		var joinPage 		= "";

		if(linkInfoCn != "" && linkInfoCn != null){
			arrList = linkInfoCn.split("|");

			/* LINK 정보분리작업 */
			for(var i=0;i < arrList.length;i++){		
				if(i == 0){
					callViewId 		= arrList[i];
				}
				else if(i == 1){
					returnViewId 	= arrList[i];
				}
				else if(i == 2){
					menuVal 		= arrList[i];
				}
				else if(i == 3){
					menuId 			= arrList[i];
				}
				else if(i == 4){			
					menuNum 		= arrList[i]*1;
				}
				else if(i == 5){			
					joinPage 		= arrList[i];
				}
			}

			dataCtrl.delObjData("MENU_LOCATION");		
			var jObj = {};
			jObj.PD_CD          = pdCd;
			jObj.CALL_VIEW_ID 	= callViewId;
			jObj.RETURN_VIEW_ID = returnViewId;
			jObj.MENU_VAL 		= menuVal;
			jObj.MENU_ID 		= menuId;
			jObj.MENU_NUM 		= menuNum;
			jObj.JOIN_PAGE 		= joinPage;
			jObj.LINK_DV 		= linkDv;
//			jObj.ON_LOAD_PATH	= "fnm_" + callViewId.substr(1,3);
			jObj.ON_LOAD_PATH	= "fnm_" + callViewId.substr(0,3);
//			alert(JSON.stringify(jObj));
			dataCtrl.setObjData('FNM_DETAIL_DATA'  , JSON.stringify(jObj));
			
			var fpmMainUrl = "";
			
			if(getSiteDvcd() == "06"){//독도
				fpmMainUrl = "/com_ebz_cdd_fpm_main.act";
			}
			else if(getSiteDvcd() == "07"){//그린
				fpmMainUrl = "/com_ebz_cgr_fpm_main.act";
			}
			else if(getSiteDvcd() == "08"){//경주
				fpmMainUrl = "/com_ebz_cgj_fpm_main.act";
			}
			else if(getSiteDvcd() == "09"){//한수원
				fpmMainUrl = "/com_ebz_chs_fpm_main.act";
			}
			else if(getSiteDvcd() == "14"){//혁신도시
				fpmMainUrl = "/com_ebz_cct_fpm_main.act";
			}else{//기타
				fpmMainUrl = "/com_ebz_fpm_main.act";
			}
			
			if(levelDv == "V"){
				parent.parent.location.href = fpmMainUrl;
			}else{
				location.href = fpmMainUrl;
			}
			
//			location.href="#com_ebz_fpm_main.act";		
		}else{
			alert("상품 정보가 존재하지 않습니다.");
		}
	}
}

function goProductDetailByPdCd(pdCd1,pdCd2,pdCd3,linkDv,levelDv,urlParam){
    /**
     * 2021-04-06 - 금융인증서 문제로 인한, 상품가입중지 알림
     */
    var pdDvcd = "";
    if (pdCd1) {   
        pdDvcd = pdCd1.substring(0,2);
        if (pdDvcd) {
            if (pdDvcd == "10") {   //수신
                if ( eval(_CodeMgr.getCodeMsg('MALL_GOODS_CHK', 'PINT_DEP_CHECK')) ) {
                    jex.printUserInfo('알림',_CodeMgr.getCodeMsg('MALL_GOODS_CHK', 'PINT_DEP_MSG'));
                    return;
                }
            } else if (pdDvcd == "20") {    //여신
                //2021.03.24 금소법 상품가입 제한 메세지 출력
                if( eval(_CodeMgr.getCodeMsg('MALL_GOODS_CHK', 'PINT_LON_CHECK')) ) {
                    jex.printUserInfo("알림",_CodeMgr.getCodeMsg('MALL_GOODS_CHK', 'PINT_LON_MSG'));
                    return;
                }
            }
        }
    }

	var pdCd = pdCd1+pdCd2+pdCd3;
	
	if(jex.null2Void(pdCd) != "" && jex.null2Void(pdCd) != "~"){
        // 2022-07-19. 카드 이벤트 체크 추가 ( 2022-0808 ~ 2022-0908 UntacT카드, 세븐캐쉬백카드 )
        if (jex.null2Void(_LOGIN_SESSION.USPS_ID) != "" && jex.null2Void(linkDv) == "J" )   // 로그인 & J:가입,  D는 상세
        {
            var isEvent = false;
            var strEventPdCd = jex.null2Void( _CodeMgr.getCodeMsg('IMBANK_CODE', "MALL_CRD_EVENT_PD_CD") );
            if( strEventPdCd.indexOf(pdCd) > -1 )
            {
                // 이벤트 기간 체크
                var toDate = Number( getNowDate() );
                var evtSdt = Number( jex.null2Void(_CodeMgr.getCodeMsg('IMBANK_CODE', "MALL_CRD_EVENT_SDT")) );
                var evtEdt = Number( jex.null2Void(_CodeMgr.getCodeMsg('IMBANK_CODE', "MALL_CRD_EVENT_EDT")) );
                
                if( evtSdt <= toDate && toDate <= evtEdt )
                {
                    isEvent = true;
                }
            }
            
            if( isEvent )
            {
                // 데이터 생성
                var inParam = {
                        pdCd1   : pdCd1,
                        pdCd2   : pdCd2,
                        pdCd3   : pdCd3,
                        linkDv  : linkDv,
                        levelDv : levelDv
                };
                dataCtrl.delObjData('FNM_CARD_PARAM_DATA');
                dataCtrl.setObjData('FNM_CARD_PARAM_DATA', JSON.stringify(inParam));
                
                // 카드신청 이벤트 안내 레이어팝업
                var msg = '<strong style="font-size: 16px;">잠깐!</strong><br>캐시백 이벤트에 응모하시는 경우<br><strong class="point_red">&lsquo;상담직원 없음&rsquo;</strong>으로 체크하셔야 합니다.';
                popConfirm_card(msg, "goCardJoinPage();", "goMove_customerEventPage();", "가입하기", "이벤트 보러가기");
                return;
            }
        }

		var linkInfoCn 		= "";
		var arrList    		= "";
		
		var callViewId 		= "";
		var returnViewId 	= "";
		var menuVal 		= "";
		var menuId 			= "";
		var menuNum 		= "";
		var joinPage 		= "";
		
		var jexAjax 		= jex.createAjaxUtil("fnm_ebz_10110_dscr_d001");

		jexAjax.set("PD_CD"          , pdCd );
		
		jexAjax.setAsync(false);
		
		jexAjax.execute(function(dat) {
			linkInfoCn = dat.LINK_INFO;
		});

		if(linkInfoCn != "" && linkInfoCn != null){

			arrList = linkInfoCn.split("|");

			/* LINK 정보분리작업 */
			for(var i=0;i < arrList.length;i++){		
				if(i == 0){
					callViewId 		= arrList[i];
				}
				else if(i == 1){
					returnViewId 	= arrList[i];
				}
				else if(i == 2){
					menuVal 		= arrList[i];
				}
				else if(i == 3){
					menuId 			= arrList[i];
				}
				else if(i == 4){			
					menuNum 		= arrList[i]*1;
				}
				else if(i == 5){			
					joinPage 		= arrList[i];
				}
			}

			dataCtrl.delObjData("MENU_LOCATION");		
			var jObj = {};
			
			jObj.PD_CD          = pdCd;
			jObj.CALL_VIEW_ID 	= callViewId;
			jObj.RETURN_VIEW_ID = returnViewId;
			jObj.MENU_VAL 		= menuVal;
			jObj.MENU_ID 		= menuId;
			jObj.MENU_NUM 		= menuNum;
			jObj.JOIN_PAGE 		= joinPage;
			jObj.LINK_DV 		= linkDv;
//			jObj.ON_LOAD_PATH	= "fnm_" + callViewId.substr(1,3);
			jObj.ON_LOAD_PATH	= "fnm_" + callViewId.substr(0,3);

			jObj.URL_PARAM      = urlParam;     //URL_NEW_CHNL_INPUT_DVCD

			dataCtrl.setObjData('FNM_DETAIL_DATA'  , JSON.stringify(jObj));
			var tempObj = {};
			dataCtrl.setObjData('FNC_TEMPDATA', JSON.stringify(tempObj));
			var fpmMainUrl = "";

			var siteDvcd = getSiteDvcd();
			if( siteDvcd== "06"){//독도
				fpmMainUrl = "/com_ebz_cdd_fpm_main.act";
			}
			else if(siteDvcd == "07"){//그린
				fpmMainUrl = "/com_ebz_cgr_fpm_main.act";
			}
			else if(siteDvcd == "08"){//경주
				fpmMainUrl = "/com_ebz_cgj_fpm_main.act";
			}
			else if(siteDvcd== "09"){//한수원
				fpmMainUrl = "/com_ebz_chs_fpm_main.act";
			}
			else if(siteDvcd== "14"){//혁신도시
				fpmMainUrl = "/com_ebz_cct_fpm_main.act";
			}else{//기타
				fpmMainUrl = "/com_ebz_fpm_main.act";

				//crossdomain 대응
				if( jex.null2Void(linkDv) == "J")
				{
					if(jex.null2Void(_LOGIN_SESSION.USPS_ID) == "" || _LOGIN_SESSION.LOGIN_DVCD != "1" || _LOGIN_SESSION.CFT_LOGIN_YN != "Y")
					{
						if(window.confirm("인증서 로그인을 하셔야 합니다.    \n\n로그인하시겠습니까?\n")) {
							if (pdDvcd == "10") {   //수신
								dataCtrl.setObjData('FND_SESS_OBJ', jex.toStr({"PD_CD": pdCd}));
								dataCtrl.setObjData("MENU_LOCATION", jex.toStr({
									"TOPLVL_MNU_ID": "A01",
									"MNU_LEVL_NO": "3",
									"IBNK_UPPER_MNU_CD": "A010502",
									"STRT_PG_DRCTR_NM": "dep",
									"IBNK_MNU_CD": "X080201"
								}));
								parent.location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");
								return;
							} else if (pdDvcd == "20") {    //여신
							} else if (pdDvcd == "40") {    //카드
								dataCtrl.setObjData('FND_SESS_OBJ', jex.toStr({"PD_CD": pdCd, "GBN": "CRD"}));
								parent.location = _CodeMgr.getCodeMsg("CODE_URL", "1001") + "com_ebz_pib_main.act?mnu_cd=";

								dataCtrl.setObjData("MENU_LOCATION", jex.toStr({
									"TOPLVL_MNU_ID": "A01",
									"MNU_LEVL_NO": "3",
									"IBNK_UPPER_MNU_CD": "A010405",
									"STRT_PG_DRCTR_NM": "crd",
									"IBNK_MNU_CD": "X050501"
								}));
								parent.location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");
								return;
							}
						} else {
							return;
						}
					}
					else
					{
						if (pdDvcd == "10") {   //수신
							dataCtrl.setObjData('FND_SESS_OBJ', jex.toStr({"PD_CD" : pdCd}));
							parent.location = _CodeMgr.getCodeMsg("CODE_URL","1001") + "com_ebz_pib_main.act?mnu_cd=depA010502X080201";
							return;
						} else if (pdDvcd == "20") {    //여신
						} else if (pdDvcd == "40") {    //카드
							dataCtrl.setObjData('FND_SESS_OBJ', jex.toStr({"PD_CD" : pdCd, "GBN":"CRD"}));
							parent.location = _CodeMgr.getCodeMsg("CODE_URL","1001") + "com_ebz_pib_main.act?mnu_cd=crdA010405X050501";
							return;
						}
					}
				}
			}
			
			if(levelDv == "V"){
				parent.parent.location.href = fpmMainUrl;
			}else{

				location.href = fpmMainUrl;
			}
			
//			location.href="#com_ebz_fpm_main.act";		
		}else{
			alert("상품 정보가 존재하지 않습니다.");
		}
	}
}

function goProductDetailFromInpr(pdCd1,pdCd2,pdCd3,linkDv,levelDv){

	var pdCd = pdCd1+pdCd2+pdCd3;
	
	if(jex.null2Void(pdCd) != "" && jex.null2Void(pdCd) != "~"){
		var linkInfoCn 		= "";
		var arrList    		= "";
		
		var callViewId 		= "";
		var returnViewId 	= "";
		var menuVal 		= "";
		var menuId 			= "";
		var menuNum 		= "";
		var joinPage 		= "";
		
		var jexAjax 		= jex.createAjaxUtil("fnm_ebz_10110_dscr_d001");

		jexAjax.set("PD_CD"          , pdCd );
		
		jexAjax.setAsync(false);
		
		jexAjax.execute(function(dat) {
			linkInfoCn = dat.LINK_INFO;
		});

		if(linkInfoCn != "" && linkInfoCn != null){
			arrList = linkInfoCn.split("|");

			/* LINK 정보분리작업 */
			for(var i=0;i < arrList.length;i++){		
				if(i == 0){
					callViewId 		= arrList[i];
				}
				else if(i == 1){
					returnViewId 	= arrList[i];
				}
				else if(i == 2){
					menuVal 		= arrList[i];
				}
				else if(i == 3){
					menuId 			= arrList[i];
				}
				else if(i == 4){			
					menuNum 		= arrList[i]*1;
				}
				else if(i == 5){			
					joinPage 		= arrList[i];
				}
			}

			dataCtrl.delObjData("MENU_LOCATION");		
			var jObj = {};
			
			jObj.PD_CD          = pdCd;
			jObj.CALL_VIEW_ID 	= callViewId;
			jObj.RETURN_VIEW_ID = returnViewId;
			jObj.MENU_VAL 		= menuVal;
			jObj.MENU_ID 		= menuId;
			jObj.MENU_NUM 		= menuNum;
			jObj.JOIN_PAGE 		= joinPage;
			jObj.LINK_DV 		= linkDv;
//			jObj.ON_LOAD_PATH	= "fnm_" + callViewId.substr(1,3);
			jObj.ON_LOAD_PATH	= "fnm_" + callViewId.substr(0,3);
//			alert(JSON.stringify(jObj));
			dataCtrl.setObjData('FNM_DETAIL_DATA'  , JSON.stringify(jObj));
			
			var fpmMainUrl = "";
			
			if(getSiteDvcd() == "06"){//독도
				fpmMainUrl = "com_ebz_cdd_fpm_main.act";
			}
			else if(getSiteDvcd() == "07"){//그린
				fpmMainUrl = "com_ebz_cgr_fpm_main.act";
			}
			else if(getSiteDvcd() == "08"){//경주
				fpmMainUrl = "com_ebz_cgj_fpm_main.act";
			}
			else if(getSiteDvcd() == "09"){//한수원
				fpmMainUrl = "com_ebz_chs_fpm_main.act";
			}
			else if(getSiteDvcd() == "14"){//혁신도시
				fpmMainUrl = "com_ebz_cct_fpm_main.act";
			}else{//기타
				fpmMainUrl = "com_ebz_fpm_main.act";
			}
			
			top.location.href = _CodeMgr.getCodeMsg("CODE_URL", "1002")+fpmMainUrl;
		
		}else{
			alert("상품 정보가 존재하지 않습니다.");
		}
	}
}
/*
 *PDF 파일 합쳐 내려받기
 * filePath1 = 약관 경로
 * filePath2 = 상품설명서 경로
 * filePath3 = 자산운용보고서
 * fileNm 합쳐진 파일명
 * 사용: ex) pdfMergeDown(filePath1,filePath2,null,productNm);
 * */
function pdfMergeDown(filePath1,filePath2,filePath3,fileNm) 
{
	if(jex.null2Void(filePath1) == ""){
		alert("약관 자료가 존재 하지 않습니다.");
		return;
	}
	
	if(jex.null2Void(filePath2) == ""){
		alert("상품설명서 자료가 존재 하지 않습니다.");
		return;
	}
	
	//개발서버
	var homeUrl    		= _CodeMgr.getCodeMsg("CODE_URL", "1002");
	var extension1 		= filePath1.substr(filePath1.lastIndexOf(".")+1).toLowerCase();	//파일확장자
	var extension2 		= filePath2.substr(filePath2.lastIndexOf(".")+1).toLowerCase();	//파일확장자
	var extension3      = "";
	
	if(jex.null2Void(filePath3) != ""){
		extension3 		= filePath3.substr(filePath3.lastIndexOf(".")+1).toLowerCase();	//파일확장자
	}
	
	var mergeFileName	= "mergepdftemp";
	
	if(jex.null2Void(filePath3) != ""){
		if(extension1 != "pdf" || extension2 != "pdf" || extension3 != "pdf"){
			alert("관련 파일 확장자가 PDF 이어야만 합니다.."+filePath3);
			return;
		}
	}else{
		if(extension1 != "pdf" || extension2 != "pdf"){
			alert("관련 파일 확장자가 PDF 이어야만 합니다.");
			return;
		}
	}
	
	var jObj = {};
	jObj.pdfMergeRealNm = mergeFileName;
	jObj.pdfMergePdNm   = fileNm;
	dataCtrl.setObjData('PDF_DATA', JSON.stringify(jObj));
	
	if(jex.null2Void(filePath3) != ""){
		//PDF 합치기
		$("#mergeFrame").attr("src", homeUrl + "hmp/bbs/bbs_ebz_pdf_mergr_view.jsp?filePath1="+filePath1+"&filePath2="+filePath2+"&filePath3="+filePath3+"&fileNm="+trim(mergeFileName)+"&downFileNm="+trim(fileNm));		
	}else{
		//PDF 합치기
		$("#mergeFrame").attr("src", homeUrl + "hmp/bbs/bbs_ebz_pdf_mergr_view.jsp?filePath1="+filePath1+"&filePath2="+filePath2+"&fileNm="+trim(mergeFileName)+"&downFileNm="+trim(fileNm));		
	}

}

/*
 *PDF 파일 합쳐 내려받기
 * filePath1 = 약관 경로
 * filePath2 = 상품설명서 경로
 * filePath3 = 자산운용보고서
 * filePath3 = 요약설명서보기
 * fileNm 합쳐진 파일명
 * 사용: ex) pdfMergeDown_new(filePath1,filePath2,filePath3,filePath4,productNm);
 * */
function pdfMergeDown_new(filePath1,filePath2,filePath3,filePath4,fileNm,filePath5)
{
    if(jex.null2Void(filePath1) == ""){
        alert("약관 자료가 존재 하지 않습니다.");
        return;
    }
    
    if(jex.null2Void(filePath2) == ""){
        alert("상품설명서 자료가 존재 하지 않습니다.");
        return;
    }
    
    //개발서버
    var homeUrl         = _CodeMgr.getCodeMsg("CODE_URL", "1002");
    var extension1      = filePath1.substr(filePath1.lastIndexOf(".")+1).toLowerCase(); //파일확장자
    var extension2      = filePath2.substr(filePath2.lastIndexOf(".")+1).toLowerCase(); //파일확장자
    var extension3      = "";
    var extension4      = "";
    var extension5      = "";

    if(jex.null2Void(filePath3) != ""){
        extension3      = filePath3.substr(filePath3.lastIndexOf(".")+1).toLowerCase(); //파일확장자
    }
    if(jex.null2Void(filePath4) != ""){
        extension4      = filePath4.substr(filePath4.lastIndexOf(".")+1).toLowerCase(); //파일확장자
    }
    if(jex.null2Void(filePath5) != ""){
        extension5      = filePath5.substr(filePath5.lastIndexOf(".")+1).toLowerCase(); //파일확장자
    }

    var mergeFileName   = "mergepdftemp";
    
    if(extension1 != "pdf" || extension2 != "pdf"){
        alert("관련 파일 확장자가 PDF 이어야만 합니다..");
        return;
    }
    
    if(jex.null2Void(filePath3) != "")
    {
        if(extension3 != "pdf"){
            alert("관련 파일 확장자가 PDF 이어야만 합니다.."+filePath3);
            return;
        }
    }
    
    if(jex.null2Void(filePath4) != "")
    {
        if(extension4 != "pdf"){
            alert("관련 파일 확장자가 PDF 이어야만 합니다.."+filePath4);
            return;
        }
    }
    
    if(jex.null2Void(filePath5) != "")
    {
        if(extension5 != "pdf"){
            alert("관련 파일 확장자가 PDF 이어야만 합니다.."+filePath5);
            return;
        }
    }

    var jObj = {};
    jObj.pdfMergeRealNm = mergeFileName;
    jObj.pdfMergePdNm   = fileNm;
    dataCtrl.setObjData('PDF_DATA', JSON.stringify(jObj));
    
    var file_txt3 = '';
    var file_txt4 = '';
    var file_txt5 = '';

    if(jex.null2Void(filePath3) != "")
    {
        file_txt3 = "&filePath3=" + filePath3
    }
    if(jex.null2Void(filePath4) != '')
    {
        file_txt4 = "&filePath4=" + filePath4
    }
    if(jex.null2Void(filePath5) != '')
    {
        file_txt5 = "&filePath5=" + filePath5
    }

    $("#mergeFrame").attr("src", homeUrl + "hmp/bbs/bbs_ebz_pdf_mergr_view.jsp?filePath1="+filePath1+"&filePath2="+filePath2 + file_txt3 + file_txt4 + file_txt5 + "&fileNm="+trim(mergeFileName)+"&downFileNm="+trim(fileNm));
}

function mergeFileDown(){
	var homeUrl    		= _CodeMgr.getCodeMsg("CODE_URL", "1002");
	var jObj = {};
	jObj = dataCtrl.getObjData('PDF_DATA');
	dataCtrl.delObjData('PDF_DATA');
	var pdfMergeRealNm = jObj.pdfMergeRealNm;
	var pdfMergePdNm   = jObj.pdfMergePdNm;
	
	//파일 다운로드
//	$("#hiddenFrame").attr("src", homeUrl + "hmp/bbs/bbs_ebz_file_down_view.jsp?filePath="+filePath                  +"&fileName="+trim(fileNm)+"&realName="+trim(realName));
//	$("#hiddenFrame").attr("src", homeUrl + "hmp/bbs/bbs_ebz_file_down_view.jsp?filePath="+ filePath+                 "&fileName="+trim(fileNm)               +"&realName="+trim(realName));
	$("#hiddenFrame").attr("src", homeUrl + "hmp/bbs/bbs_ebz_file_down_view.jsp?filePath="+ "/upload/newbbs/FNM001/" +"&fileName="+trim(pdfMergePdNm)+ ".pdf" +"&realName="+trim(pdfMergeRealNm)+".pdf");
}

/*
 * 게시사이트구분코드 가져오기
 * @Describe : 상위 URL을 읽어서 해당 사이트에 따라 사이트구분값을 리턴
 *   ※ 게시사이트구분코드 (01:금융상품몰  06:독도지점  07:그린지점  08:경주지점  09:한수원  14:혁신도시)
 */
function getSiteDvcd() {
	var result = "01";
	
	var ploc = parent.location.href.split("#")[0];
	var tloc = ploc.split("/");
	var div_url = tloc[tloc.length-1].split("_")[2];
	
	if (div_url == "cdd") {
		result = "06";
	} else if (div_url == "cgr") {
		result = "07";
	} else if (div_url == "cgj") {
		result = "08";
	} else if (div_url == "chs") {
		result = "09";
	} else if (div_url == "cct") {
		result = "14";
	} 
	
	return result;
}

/*
 * 게시사이트구분코드 가져오기 (팝업화면용)
 * @Describe : 상위 URL을 읽어서 해당 사이트에 따라 사이트구분값을 리턴
 *   ※ 게시사이트구분코드 (01:금융상품몰  06:독도지점  07:그린지점  08:경주지점  09:한수원  14:혁신도시)
 */
function getSiteDvcdPopup() {
	var result = "01";
	
	var ploc = opener.parent.location.href.split("#")[0];
	var tloc = ploc.split("/");
	var div_url = tloc[tloc.length-1].split("_")[2];
	
	if (div_url == "cdd") {
		result = "06";
	} else if (div_url == "cgr") {
		result = "07";
	} else if (div_url == "cgj") {
		result = "08";
	} else if (div_url == "chs") {
		result = "09";
	} else if (div_url == "cct") {
		result = "14";
	} 
	
	return result;
}

/*
 * 상품 검색 내용 등록 
 * 각 상품 '비교하기' 시 실행
 * */
function regPdSearchInfo(hmpgPdClacd, pdCd1, pdCd2, pdCd3, pdCd4)
{
    try
    {
        // 상세
        var pdSellPsblSiteDvcd = jex.null2Void(getSiteDvcd());
        if(jex.null2Void(pdCd2) != "")
        {
            pdSellPsblSiteDvcd = jex.null2Void(getSiteDvcdPopup());
        }

        var MnuPathNm = jex.null2Str(location.href.substring(location.href.lastIndexOf("/")+1, location.href.lastIndexOf(".")), "UNKNOWN");

        var jexAjax = jex.createAjaxUtil("fnm_ebz_10000_pdse_d001");
        jexAjax.setErrTrx(false);
        jexAjax.set("HMPG_MBRSP_DVCD"       , '99');
        jexAjax.set("HMPG_PD_CLACD"         , jex.null2Void(hmpgPdClacd));
        jexAjax.set("PD_CD"                 , jex.null2Void(pdCd1      ));
        jexAjax.set("PD_CD1"                , jex.null2Void(pdCd2      ));
        jexAjax.set("PD_CD2"                , jex.null2Void(pdCd3      ));
        jexAjax.set("PD_CD3"                , jex.null2Void(pdCd4      ));
        jexAjax.set("PD_SELL_PSBL_SITE_DVCD", pdSellPsblSiteDvcd        );
        jexAjax.set("REG_STC"               , "10"                      );
        jexAjax.set("TIT_NM"                , "상세"                    );
        jexAjax.set("MNU_PATH_NM"           , MnuPathNm                 );
        jexAjax.set("DLNG_STEP_CN"          , "~"                       );
        jexAjax.set("SMRT_BNK_CHNL_DVCD"    , "00"                      );
        jexAjax.set("SMRT_DEVC_NO"          , ""                        );
        jexAjax.set("SMRT_BNK_OS_DVCD"      , "~"                       );

        jexAjax.execute(function(dat) {});
    }
    catch(e)
    {

    }
}

/*
 * 상품상세 페이지에서 내부iframe resize 처리 함수 (사용예 <iframe ... onload="autoResize(this)" ...></iframe>
 */

function autoResize(ifr){
	var iframeHiehgit = (ifr).contentWindow.document.body.scrollHeight;
	(ifr).height = iframeHiehgit+30;
	iframeReSize();
}

var cardIframeheight = 0; 
var cardIframeBeforeheight = ""; 
function cardAutoResize(ifr){
	var iframeHiehgit = (ifr).contentWindow.document.body.scrollHeight;
	(ifr).height = iframeHiehgit+30;
	cardIframeheight = iframeHiehgit+30;
	
	iframeReSize();
}

function iframeAutoResize(cardDetailToggle){
	
	if(cardDetailToggle == 0){
		$("#ifr", parent.document).attr("height", (Number($("#ifr", parent.document).attr("height").substring(0, $("#ifr", parent.document).attr("height").length - 2)) + cardIframeheight ) + "px");
		iframeReSize();
	}else{
		$("#ifr", parent.document).attr("height", (Number($("#ifr", parent.document).attr("height").substring(0, $("#ifr", parent.document).attr("height").length - 2)) - cardIframeheight ) + "px");
		iframeReSize();
	}
	
	//var iframeHiehgit = (ifr).content().height();
	//(ifr).height = iframeHiehgit+30;
	//alert(cardIframeheight);
	//$(top.document).find("#ifr").attr("height", cardIframeheight + "px");
	//alert($("#ifr", parent.document).attr("height"));
	//$("#ifr", parent.document).attr("height", cardIframeheight+"px");
}

/*
* WiseLog 출력
*/
function setWiseLog(np3,np4,np5,np6,np7,np8)
{
    try
    {
        var wiseLang = jex.lang();

        var lang = "ko";
        if(wiseLang == "EN")
        {
            lang = "en";
        }
        else if(jex.lang() == "ZH")
        {
            lang = "cn";
        }

        var sesObj      = dataCtrl.getObjData("_SES_NAVI_CONTS");
        var mnuNaviTit  = sesObj.PAGE_NAVI_TIT_NM;
        var mnuNaviPath = "";

        try
        {
            mnuNaviPath = sesObj.PAGE_NAVI_MNU_PATH.trim();
        }
        catch(e)
        {
            mnuNaviPath = sesObj.PAGE_NAVI_MNU_PATH;
        }

        var tmpPageNavi = mnuNaviPath;

        if(mnuNaviPath.substring(mnuNaviPath.length-1) == ">")
        {
            tmpPageNavi += ' ';
        }
        else
        {
            tmpPageNavi += ' > ';
        }

        tmpPageNavi += mnuNaviTit;

        _n_sid        = "dgb";
        _n_uid_cookie = "UID";
        _n_p1 = lang;     //언어구분
        _n_p2 = "hpg^" + tmpPageNavi;      //개인(pib),기업(cib)
        _n_p3 = jex.null2Str(np3, "~");      // 상품구분(카드,예금,신탁,펀드,외환,대출) 
        _n_p4 = jex.null2Str(np4, "~");      // 상품명(카드명,예금명,펀드명등)
        _n_p5 = jex.null2Str(np5, "~");      // 가입단계(상세:0, 나머지는 스텝번호)
        _n_p6 = jex.null2Str(np6, "~");      // 최종단계
        _n_p7 = jex.null2Str(np7, "~");      // 상품코드
        _n_p8 = jex.null2Str(np8, "~");      // 추천일련번호

        /*
        console.error("===========================================");
        console.error("setWiseLog start");
        console.error("_n_sid  :: " + _n_sid);
        console.error("_n_uid_cookie  :: " + _n_uid_cookie);
        console.error("_n_p1  :: " + _n_p1);
        console.error("_n_p2  :: " + _n_p2);
        console.error("_n_p3  :: " + _n_p3);
        console.error("_n_p4  :: " + _n_p4);
        console.error("_n_p5  :: " + _n_p5);
        console.error("_n_p6  :: " + _n_p6);
        console.error("_n_p7  :: " + _n_p7);
        console.error("_n_p8  :: " + _n_p8);
        console.error("===========================================");
        */

        n_logging();      // 로그실행

        // 추천상품 추천코드값 초기화
        setRcmno(""); 
    }
    catch(e)
    {
        console.error(e)
    }
}
function setRcmno(rcmno)
{
    var obj = {RCMNO:rcmno};
    dataCtrl.setObjData("RCMNO", JSON.stringify(obj));
}
function getRcmno()
{
    var rcmnoObj = dataCtrl.getObjData("RCMNO");
    if( rcmnoObj != null && rcmnoObj != undefined )
    {
        return rcmnoObj.RCMNO;
    }

    return "";
}

/*
 * Table 자동Rowspan
 */
function tableRowSpanning(Table, spanning_row_index) {
	var RowspanTd = false;
	var RowspanText = false;
	var RowspanCount = 0;
	var Rows = $('tbody tr', Table);
	
	$.each(Rows, function() {
		var This = $('td', this)[spanning_row_index];
		var text = $(This).text();
		
		if(RowspanTd == false) {
			RowspanTd = This;
			RowspanText = text;
			RowspanCount = 1;
		}
		else if(RowspanText != text){
			$(RowspanTd).attr('rowSpan', RowspanCount);
			
			RowspanTd = This;
			RowspanText = text;
			RowspanCount = 1;
		}
		else {
			$(This).remove();
			RowspanCount++;
		}
	});
	
	//반복 종료 후 마지막 rowspan 적용
	$(RowspanTd).attr('rowSpan', RowspanCount);
}

function showRatePop(pdCd) {
	var sesObj = dataCtrl.getObjData("MENU_LOCATION");

	if (jex.null2Void(_LOGIN_SESSION.USPS_ID) == "" || _LOGIN_SESSION.LOGIN_DVCD != "1" || _LOGIN_SESSION.CFT_LOGIN_YN != "Y") {
		if(window.confirm("인증서 로그인을 하셔야 합니다.    \n\n로그인하시겠습니까?\n")) {
			// 인증서 로그인후 Return Page
			var resBankUrl = _CodeMgr.getCodeMsg("CODE_URL","1002") + "com_ebz_fnp_sub_main.jsp";
//			var resBankUrl = _CodeMgr.getCodeMsg("CODE_URL","1002") + "com_ebz_fpm_main.act";
			
			var jObj = {};
			jObj.BACK_URL = resBankUrl; //상세페이지 경로를 세팅한다.
			jObj.LOCATION_PAGE = resBankUrl; //상세페이지 경로를 세팅한다.
			dataCtrl.setObjData("MENU_LOCATION", JSON.stringify($.extend(sesObj,jObj)));
			
			var objLk = {'HP_BK':'BK','LOCATION_PAGE': "com_ebz_11010_J001"};
			dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));	
			parent.location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");  //https://banking.dgb.co.kr/index.jsp
			
		} else {
			return;
		}
	} else {
		var jObj = {};
		
		jObj.PD_CD = pdCd;
		jObj.USPS_ID = _LOGIN_SESSION.USPS_ID;
		
		dataCtrl.setObjData('DEP_TMP_SESS_OBJ', JSON.stringify(jObj));

		window.open('/p_dep_ebz_21110_2716.act','나의예상금리','width=715, height=780');
//		open_popup('form1', {sizeW : '715' ,sizeH : '750' ,target:'p_dep_ebz_21110_2716', action:'p_dep_ebz_21110_2716.act'});
	}
}


/**
 * 2022-08-04. 카드 신청 이벤트때문에 confirm 창 추가
 * @param msg
 * @param sussFn
 * @param errFn
 * @param sussBtnTxt
 * @param errBtnTxt
 * @returns
 */
function popConfirm_card(msg, sussFn, errFn, sussBtnTxt, errBtnTxt) {
        var clickClose = "";
        var clickSuss  = "";
        var clickErr   = "";
        var isHp       = top.location.href.indexOf("www.dgb.co.kr") > -1;
        
        // 금융상품몰에서 진입
        if( isHp )
        {
            clickClose = " onclick='closeConfirmLayer(false);' ";
            clickSuss  = " onclick='"+sussFn+" closeConfirmLayer(false);' ";
            clickErr   = " onclick='"+errFn+"  closeConfirmLayer(false);' ";
        }
        else
        {
            clickClose = " onclick='jex.getRootDom().msgCloseConfirmLayer(false);' ";
            clickSuss  = " onclick='$(\"#ifr\")[0].contentWindow."+sussFn+" jex.getRootDom().msgCloseConfirmLayer(false);' ";
            clickErr   = " onclick='$(\"#ifr\")[0].contentWindow."+errFn+"  jex.getRootDom().msgCloseConfirmLayer(false);' ";
        }
        
        var confirmHtml =   "";
        confirmHtml +=      "<div id='confirmLayer' class='Confirm'>";
        confirmHtml +=      "   <div class='loadingWrap' "+ (isHp ? "style='width:350px; height:210px;' " : "") +">";
        confirmHtml +=      "       <div class='pop_head'>";
        confirmHtml +=      "           <h1 class='titleDep1' style='text-align:left'>안내메세지</h1>";
        confirmHtml +=      "           <button type='button' "+clickClose+" class='pop_close' title='닫기'>닫기</button>";
        confirmHtml +=      "       </div>";
        confirmHtml +=      "       <hr/>";
        confirmHtml +=      "       <article style='padding:20px 15px 10px 15px;text-align:center'>";
        confirmHtml +=      "           <p>"+jex.null2Void(msg)+"</p>";
        confirmHtml +=      "       </article>";
        confirmHtml +=      "       <hr/>";
        confirmHtml +=      "       <div class='btnArea stp_10'>";
        if($(".leftMenu", parent.document).children().length == 0) {
            confirmHtml +=  "               <span class='btn large action'><button type='button' "+clickSuss+" title='"+jex.null2Str(sussBtnTxt, "확인")+"'>"+jex.null2Str(sussBtnTxt, "확인")+"</button></span>";
            if( !jex.isNull(errFn) )
            {
                confirmHtml +=  "               <span class='btn large'><button type='button' "+clickErr+" title='"+jex.null2Str(errBtnTxt, "취소")+"'>"+jex.null2Str(errBtnTxt, "취소")+"</button></span>";
            }
        }else{
            confirmHtml +=  "               <span class='btn large action'><button type='button' "+clickSuss+" title='"+jex.null2Str(sussBtnTxt, "확인")+"'>"+jex.null2Str(sussBtnTxt, "확인")+"</button></span>";
            if( !jex.isNull(errFn) )
            {
                confirmHtml +=  "               <span class='btn large'><button type='button' "+clickErr+" title='"+jex.null2Str(errBtnTxt, "취소")+"'>"+jex.null2Str(errBtnTxt, "취소")+"</button></span>";
            }
        }

        if( jex.isNull(errFn) )
        {
            confirmHtml +=      "           <span class='btn large'><button type='button' "+clickClose+" title=''>취소</button></span>";
        }
        confirmHtml +=      "       </div>";
        confirmHtml +=      "   </div>";
        confirmHtml +=      "   <div class='LayerPop_Bg1'></div>";
        confirmHtml +=      "</div>";
        $(jex.getRootDom().document.body).append(confirmHtml);
        openConfirmLayer_card(_msgLayerId);
        try{ window.setTimeout(function(){ try{nFilterClose();}catch(e){} }, 300); }catch(e){}
}

function openConfirmLayer_card(openLayerId){
    var confirmBackHeight = jex.getRootDom().document.body.clientHeight;
    var confirmHeight     = $(".loadingWrap", jex.getRootDom().document.body).height();
    
    $(".loadingWrap",jex.getRootDom().document.body).css("top", (confirmBackHeight/2) - (confirmHeight/2));
    
    //로딩창 숨기기
    try{ loading_Stop(); }catch(e){}
    try{ parent.loading_Stop(); }catch(e){}
}

// 가입하기
function goCardJoinPage() {
    var paramObj = dataCtrl.getObjData('FNM_CARD_PARAM_DATA');
    
    if( jex.isNull(paramObj) )
    {
        jex.printUserInfo('알림', "카드정보가 존재하지 않습니다.");
        return;
    }
    dataCtrl.delObjData('FNM_CARD_PARAM_DATA');
    
    var pdCd = paramObj.pdCd1+paramObj.pdCd2+paramObj.pdCd3;
    
    var linkInfoCn      = "";
    var arrList         = "";
    
    var callViewId      = "";
    var returnViewId    = "";
    var menuVal         = "";
    var menuId          = "";
    var menuNum         = "";
    var joinPage        = "";
    
    var jexAjax         = jex.createAjaxUtil("fnm_ebz_10110_dscr_d001");

    jexAjax.set("PD_CD"          , pdCd );
    
    jexAjax.setAsync(false);
    
    jexAjax.execute(function(dat) {
        linkInfoCn = dat.LINK_INFO;
    });

    if(linkInfoCn != "" && linkInfoCn != null){
        arrList = linkInfoCn.split("|");

        /* LINK 정보분리작업 */
        for(var i=0;i < arrList.length;i++){        
            if(i == 0){
                callViewId      = arrList[i];
            }
            else if(i == 1){
                returnViewId    = arrList[i];
            }
            else if(i == 2){
                menuVal         = arrList[i];
            }
            else if(i == 3){
                menuId          = arrList[i];
            }
            else if(i == 4){            
                menuNum         = arrList[i]*1;
            }
            else if(i == 5){            
                joinPage        = arrList[i];
            }
        }

        dataCtrl.delObjData("MENU_LOCATION");       
        var jObj = {};
        
        jObj.PD_CD          = pdCd;
        jObj.CALL_VIEW_ID   = callViewId;
        jObj.RETURN_VIEW_ID = returnViewId;
        jObj.MENU_VAL       = menuVal;
        jObj.MENU_ID        = menuId;
        jObj.MENU_NUM       = menuNum;
        jObj.JOIN_PAGE      = joinPage;
        jObj.LINK_DV        = paramObj.linkDv;
//      jObj.ON_LOAD_PATH   = "fnm_" + callViewId.substr(1,3);
        jObj.ON_LOAD_PATH   = "fnm_" + callViewId.substr(0,3);
        dataCtrl.setObjData('FNM_DETAIL_DATA'  , JSON.stringify(jObj));
        var tempObj = {};
        dataCtrl.setObjData('FNC_TEMPDATA', JSON.stringify(tempObj));
        var fpmMainUrl = "";
        
        if(getSiteDvcd() == "06"){//독도
            fpmMainUrl = "/com_ebz_cdd_fpm_main.act";
        }
        else if(getSiteDvcd() == "07"){//그린
            fpmMainUrl = "/com_ebz_cgr_fpm_main.act";
        }
        else if(getSiteDvcd() == "08"){//경주
            fpmMainUrl = "/com_ebz_cgj_fpm_main.act";
        }
        else if(getSiteDvcd() == "09"){//한수원
            fpmMainUrl = "/com_ebz_chs_fpm_main.act";
        }
        else if(getSiteDvcd() == "14"){//혁신도시
            fpmMainUrl = "/com_ebz_cct_fpm_main.act";
        }else{//기타
            fpmMainUrl = "/com_ebz_fpm_main.act";
        }
        
        if(paramObj.levelDv == "V"){
            parent.parent.location.href = fpmMainUrl;
        }else{
            location.href = fpmMainUrl;
        }
        
//      location.href="#com_ebz_fpm_main.act";      
    }else{
        alert("상품 정보가 존재하지 않습니다.");
    }
}

// 이벤트 바로가기
function goMove_customerEventPage() {
    //window.open("https://www.dgb.co.kr/com_ebz_hlp_sub_main.jsp?LINK_DV=hns&LINK_SEQ=2");
    // 금융상품몰 > 카드이벤트로 링크 변경
    link4DepthMenuPage("fnm_fnc_sub6_1", "fnm_fnc_sub6","0", "com_ebz_fpm_main.act");
}