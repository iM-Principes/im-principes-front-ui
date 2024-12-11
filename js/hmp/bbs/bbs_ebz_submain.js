
/**
 * <pre>
 * DGBHP PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 *
 * @File Name        : ebz_ibs.bbs_ebz_submain.js / bbs_ebz_submain.js 
 * @File path        : DGBHP_PT_STATIC/web/js/hmp/com  
 *                     DGBIB_PT_STATIC/web/js/ibsCustom
 * @author           : 源��먯쭊 
 * @Description      : �쒕툕硫붿씤 �몄텧�� 寃뚯떆�� html 異쒕젰
 * @History          : 20130313092914, 源��먯쭊
 * @ETC              : HP / IB  蹂듭닔愿�由щ���(�묒そ PT�� 議댁옱��) 
 * </pre>
 **/
/******************************/
/** getSubBbsHtml() �몄텧 key **/
/******************************/
//1  : 硫붿씤                / �덉냼��               
//2  : 硫붿씤                / 吏���뻾��             
//3  : 硫붿씤                / �대깽��               
//4  : DGB�뚭컻             / �덉냼��               
//5  : DGB�뚭컻             / 蹂대룄�먮즺             
//6  : 媛쒖씤諭낇궧            / �덉냼��               
//7  : 湲곗뾽諭낇궧            / �덉냼��               
//8  : 吏���궗�뚭났��        / 吏���낫�꾩옄猷�         
//9  : 吏���궗�뚭났��        / 吏���궗�뚰솢��         
//10 : DGB�⑤�由�           / �댁쭅�됱슦�숈젙         
//11 : DGB�⑤�由�           / �쇱궗                 
//12 : DGB�⑤�由�           / 議곗궗
//26 : DGB�⑤�由�           / 媛�議깊뻾蹂듭꽱��(怨듭��ы빆)
//13 : 踰좎뒪�몄삤釉뚮쿋�ㅽ듃    / �좉퇋 踰좎뒪�� of 踰좎뒪��
//14 : 踰좎뒪�몄삤釉뚮쿋�ㅽ듃    / 留쏆쭛 硫뗭쭛 諛⑸Ц湲�     
//15 : eZ諭낇겕              / �덉냼��               
//16 : eZ諭낇겕              / �대깽��               
//17 : �ъ씠踰꾧꼍二쇱���      / 怨듭��ы빆             
//18 : �ъ씠踰꾧꼍二쇱���      / �대깽��               
//19 : �ъ씠踰꾧렇由�          / 怨듭��ы빆             
//20 : �ъ씠踰꾧렇由�          / �섍꼍�댁뒪             
//21 : �ъ씠踰꾧렇由�          / �대깽��               
//22 : �ъ씠踰꾪븳�섏썝        / 怨듭��ы빆             
//23 : �ъ씠踰꾪븳�섏썝        / �대깽��               
//24 : �ъ씠踰꾨룆��          / 怨듭��ы빆             
//25 : �ъ씠踰꾨룆��          / �대깽��    

var siteCd          = "";
var menuCd          = "";
var bbsId           = "";
var rowCnt          = 0;
var mainUrl         = "";
var EtcMainUrl      = "";
var EtcBbsListUrl   = "";
var EtcBbsDetailUrl = "";
var arrBbsList;     //議고쉶�댁슜
var subBbsKey = 0;
var pObj = {};
var jObj = {};
var arrJOBj = new Array();
var arrSubBbsKeySet = new Array();
var menuId;
var menuNum;
var menuVal;
var locIdxBySub  = 0;
var callCntByIdx = 0;
var homeUrl = "";

/*
 * �쒕툕硫붿씤 �몄텧寃뚯떆�� HTML �앹꽦.
 * ���� �쒕툕硫붿씤�� 寃뚯떆�먯씠 異쒕젰�섎뒗 紐⑤뱺 而⑦뀒�대꼫�댁뿉 HTML 鍮꾩슦怨� 蹂� �⑥닔�� 由ы꽩媛믪쓣 .append()�쒕떎.
 */
function getSubBbsHtml(dvCd){
    homeUrl = _CodeMgr.getCodeMsg("CODE_URL", "1002");
    homeUrl = homeUrl.substr(0, homeUrl.length-1);
    
    subBbsKey = dvCd;
    setParam();

        if(subBbsKey != "44"){
            /* 2/3  DATA瑜� 遺덈윭�⑤떎 */
            var jexAjax = jex.createAjaxUtil("bbs_ebz_10010_bord_d0071");
            
            //jexAjax.setCache(true);
            jexAjax.addHeader("cache-control","private");
            jexAjax.addHeader("pragma","");
            jexAjax.setType("GET");

            jexAjax.set("BBS_ID"          , bbsId );
            jexAjax.set("PUTUP_SITE_DVCD" , siteCd);
            jexAjax.set("PUTUP_MNU_DVCD"  , menuCd);
            jexAjax.set("RCOUNT"          , rowCnt);
            //_BBS_TOPDVCD = "25";
            if     (dvCd == "37"){//吏���뻾��[��援�]
                jexAjax.set("ZON_LV_CD"          , "100");
            }
            else if(dvCd == "38"){//吏���뻾��[寃쎈턿]
                jexAjax.set("ZON_LV_CD"          , "200");
            }else if(dvCd == "42" || dvCd == "70" || dvCd == "73"){
                jexAjax.set("EVENT_CUR_YN"       , "Y");
            }else if(dvCd == "45"){
                jexAjax.set("EVENT_CUR_YN"       , "N");
            }else if (dvCd == "72" || dvCd == "71")
            {
                jexAjax.set("EVENT_CUR_YN"       , "Y");
                jexAjax.set("APRYN"              , "Y");
            }
            
            jexAjax.setAsync(false);
            
            jexAjax.execute(function(dat) {
                
                arrBbsList = dat.REC1;
                
            });
        }
//  }
    
    /* 3/3  HTML 異쒕젰 */
    return createBbsHtml();
}

/*
 * 異쒕젰dat.REC1 瑜� �듯빐 HTML臾몄쓣 援ъ꽦�쒕떎.
 * */
function createBbsHtml(){
    var rstHtml = "";
    //TODO: NEW �꾩씠肄� 泥⑤� 湲곗� �뺤쓽�섎㈃ <a>��</a> �대젃寃� �ｌ뼱二쇨툝
    //<img src=\"/img/common/sub/ebz_Psub_icon_new.gif\" alt=\"new\">

    var arrLen = ( arrBbsList.length < 4 ? arrBbsList.length : 4 );
    if(null != arrBbsList) {
        switch (subBbsKey){
            case 1 ://1  : 硫붿씤                / �덉냼��
                for(var i=0;i < arrLen;i++){
                    var obj = arrBbsList[i];
                    rstHtml += '<li>';
                    rstHtml += '    <button type="button">';
                    rstHtml += '        <span>';
                    rstHtml += '            <em onclick="javascript:goBbsPagePreMain('+ obj.PUTUP_WRIT_SEQ +',1,0);">'+ obj.TIT_NM +'</em>';
                    rstHtml += '            <span>'+ obj.REG_DTTI +'</span>';
                    rstHtml += '        </span>';
                    rstHtml += '    </button>';
                    rstHtml += '</li>';
                }
                break;
            case 2 ://2  : 硫붿씤                / 吏���뻾��
                rstHtml
                    += "<h3 class=\"titleSub\">"
                    +  "    <img src=\"/img/common/main/ebz_top_board_tit_2.gif\" alt=\"吏���뻾��\">"
                    +  "</h3>"
                    +  "<ul>";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="  <li class=\"list\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",2,1);\" title=\"\">"+ obj.TIT_NM +"</a>";
                    //NEW ICON 異붽�湲곗�
                    if(obj.NEW_YN == "Y"){
                        rstHtml
                            +=" <img src=\"/img/common/sub/ebz_Psub_icon_new.gif\" alt=\"new\">";
                    }
                    
                    rstHtml
                     += "<span class=\"right\">"+ arrBbsList[i].REG_DTTI +"</span></li>";
                }
                rstHtml 
                    +="    </ul>"
                    + "    <span class=\"main_more_bodBtn1\" style=\"padding-left:205px\"><a href=\"javascript:goBbsPagePreMain(0,2,1);\" title=\"吏���뻾�� �붾낫湲�\" class=\"subMoreBtn\">�붾낫湲� <img src=\"../img/common/sub/ebz_sub_bult03.gif\" alt=\"eventMore\" align=\"absmiddle\"></a></span>";
                break;
            case 3 ://3  : 硫붿씤                / �대깽��
                 for(var i=0;i < arrLen;i++){
                        var obj = arrBbsList[i];
                        rstHtml += '<li>';
                        rstHtml += '    <button type="button">';
                        rstHtml += '        <span>';
                        rstHtml += '            <em onclick="javascript:goBbsPagePreMain('+ obj.PUTUP_WRIT_SEQ +',3,1);">'+ obj.TIT_NM +'</em>';
                        rstHtml += '            <span>'+ obj.REG_DTTI +'</span>';
                        rstHtml += '        </span>';
                        rstHtml += '    </button>';
                        rstHtml += '</li>';
                    }
//              
//              rstHtml 
//                  += "<p class=\"con_slide_box\"></p>"
//                  +  "<div class=\"event-cont\" style=\"position:relative;\">";
//              for(var i=0;i < arrBbsList.length;i++){
//              var obj = arrBbsList[i];
//              var scrtNum = ( i + 1 ) * 1;                
//              if(i > 0)
//                  rstHtml +="<a class=\"page active\" style=\"margin-left:330px;\" onkeyup=\"thisArea3("+ scrtNum +")\" href=\"thisArea3("+ scrtNum +");\" href=\"#event"+ scrtNum +"\">"+ scrtNum +"</a>";                   
//              else
//                  rstHtml +="<a style=\"margin-left:270px;\" class=\"page\" onKeyUp=\"thisArea3("+ scrtNum +")\" href=\"thisArea3("+ scrtNum +")\" href=\"#event2\">"+ scrtNum +"</a>";
                
//              rstHtml 
//                  +="<p class=\"con_slide_box\">"
//                  + "<span class=\"right\"><a href=\"goBbsPagePreMain(0,3,2);\" title=\"�붾낫湲�\" class=\"subMoreBtn\">�붾낫湲�</a></span>"
//                  + "</p>"
//                  + "<div class=\"event-cont\" style=\"position:relative;\" >";
//              for(var i=0;i < arrBbsList.length;i++){
//                  var obj = arrBbsList[i];
//                  var scrtNum = ( i + 1 ) * 1;
//                  
//                  if(i > 0)
//                      rstHtml +="<a class=\"page\" onKeyUp=\"thisArea3("+ scrtNum +")\" href=\"thisArea3("+ scrtNum +")\" href=\"#event"+ scrtNum +"\">"+ scrtNum +"</a>";
//                  else
//                      rstHtml +="<a style=\"margin-left:270px;\" class=\"page\" onKeyUp=\"thisArea3("+ scrtNum +")\" href=\"thisArea3("+ scrtNum +")\" href=\"#event2\">"+ scrtNum +"</a>";
//                      
//                  rstHtml
//                      +="<p style=\"left:0px; top:0px; display:block; position:absolute; z-index:0;\" id=\"event"+ scrtNum +"\" class=\"event\">"
//                      + "   <a title=\""+ obj.EVENT_NM +"\" href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",3,2);\">"
//                      + "     <img alt=\""+ obj.EVENT_NM +"\" src=\""+ homeUrl + obj.IMG_PATH_NM + obj.IMG_FILE_NM +"\">"
//                      + "   </a>"
//                      + "</p>";
//              }       
//              rstHtml 
//                  += "</div>";
                 
                break;
            case 4 ://4  : DGB�뚭컻             / �덉냼��
                
                rstHtml
                    +="   <p class=\"title_line\">�덉냼��</p>"
                    + "    <ul class=\"list_type1\">";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="  <li><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",4,0);\" title=\"\">"+ obj.TIT_NM +"</a><span>"+ obj.REG_DTTI +"</span></li>";
                }
                rstHtml 
                    +="    </ul>"
                    + "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,4,0)\" title=\"�덉냼�� �붾낫湲�\"><span>�붾낫湲�</span></a></p>";
                 
                break;
            case 5 ://5  : DGB�뚭컻             / 蹂대룄�먮즺
                
                rstHtml
                    +="   <p class=\"title_line\">DGB�댁뒪</p>"
                    + "    <ul class=\"list_type1\">";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="  <li><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",5,1);\" title=\"\">"+ obj.TIT_NM +"</a><span>"+ obj.REG_DTTI +"</span></li>";
                }       
                rstHtml 
                    +="    </ul>"
                    + "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,5,1);\" title=\"DGB�댁뒪 �붾낫湲�\"><span>�붾낫湲�</span></a></p>";
                 
                break;
            case 6 ://6  : 媛쒖씤諭낇궧            / �덉냼��
                
                rstHtml
                    +="    <h3 class=\"titleSub01\">�덉냼��</h3>"
                    + "    <ul>";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="  <li ><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",6,0);\" title=\"\">"+ obj.TIT_NM +"</a></li>";
                }
                rstHtml 
                    +="    </ul>"
                    + "<span class=\"board_rgt_more\"><a href=\"javascript:goBbsPagePreMain(0,6,0);\" title=\"�덉냼�� �붾낫湲�\" class=\"subMoreBtn\">�붾낫湲�</a></span>";
                break;
            case 7 ://7  : 湲곗뾽諭낇궧            / �덉냼��
                
                rstHtml
                    +="    <h3 class=\"titleSub01\">�덉냼��</h3>"
                    + "    <ul>";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="  <li ><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",7,0);\" title=\"\">"+ obj.TIT_NM +"</a></li>";
                }       
                rstHtml 
                    +="    </ul>"
                    + "<span class=\"board_rgt_more\"><a href=\"javascript:goBbsPagePreMain(0,7,0);\" title=\"�덉냼�� �붾낫湲�\" class=\"subMoreBtn\">�붾낫湲�</a></span>";
                
                break;
            case 8 ://8  : 吏���궗�뚭났��        / 吏���낫�꾩옄猷�  ==> 蹂대룄�먮즺濡� 紐낅챸 蹂�寃�  06.28
                
                rstHtml += "<p class=\"ser_tit\">蹂대룄�먮즺</p>"+
                           "<div class=\"ser_list_go\"><ul class=\"list_in\">"; 
                
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    
                    rstHtml += "<li class=\"list_01\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",8,0);\" title=\""+ obj.TIT_NM +"\"><p>"+ obj.TIT_NM +"</p><span>"+ arrBbsList[i].REG_DTTI +"</span></a></li>";

                }
                
                rstHtml +="</ul>"
                        + "<p class=\"list_03\"><a href=\"javascript:goBbsPagePreMain(0,8,0);\" title=\"蹂대룄�먮즺 �붾낫湲�\">�붾낫湲�</a></p>";
                
                break;
            case 9 ://9  : 吏���궗�뚭났��        / 吏���궗�뚰솢��  ==> 二쇱슂�쒕룞�쇰줈  紐낅챸蹂�寃� 06.28
    
                rstHtml
                    +="<h3>"
                    + "    二쇱슂�쒕룞"
                    + "</h3>"
                    + "<ul>";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="<li>"
                        + "    <div class=\"thumb\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",9,1);\" title=\""+ obj.TIT_NM +"\"><img src=\""+ homeUrl + obj.IMG_PATH_NM + obj.IMG_FILE_NM +"\" alt=\""+ obj.TIT_NM +"\" style=\"width:99px;height:64px;\"/></a></div>"
                        + "    <div class=\"txt\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",9,1);\" title=\""+ obj.TIT_NM +"\">"+ obj.TIT_NM +"</a>"+ obj.PUTUP_WRIT_CN +"</div>"
                        + "</li>";
                }
                rstHtml 
                    +="    </ul>"
                    + "    <span style=\"padding-right:25px; background: url(../../../img/common/bullet/ebz_bult_type1.gif) 39px 7px no-repeat; position:absolute; top:16px; left:112px;\"><a href=\"javascript:goBbsPagePreMain(0,9,1);\" title=\"二쇱슂�쒕룞 �붾낫湲�\">�붾낫湲�</a></span>"; 
                break;
            case 26://26 : DGB�⑤�由�           / 媛�議깊뻾蹂듭꽱��
                rstHtml
                    +="<h4>DGB媛�議깊뻾蹂듭꽱��</h4>"
                    + "<ul class=\"list_type1\">";
                //for(var i=0;i < arrBbsList.length;i++){
                arrLen = ( arrBbsList.length < 1 ? arrBbsList.length : 1 );
                for(var i=0;i < arrLen;i++){
                    var obj = arrBbsList[i];
                    rstHtml
                        +="    <li>"
                        +  "<a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",26,0);\" title=\"\">"+ obj.TIT_NM +"</a>";
                        + "    </li>";
                }
                if(arrBbsList.length == 0) rstHtml += "寃뚯떆湲��� 議댁옱�섏� �딆뒿�덈떎.";
                rstHtml
                    +="</ul>"
                    + "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,26,0);\" title=\"DGB媛�議깊뻾蹂듭꽱�� �붾낫湲�\"><span>�붾낫湲�</span></a></p>";
                break;
            case 10://10 : DGB�⑤�由�           / �댁쭅�됱슦�숈젙
                rstHtml
                    +="<h4>�댁쭅�됱슦�숈젙</h4>"
                    + "<ul class=\"list_type1\">";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        += "<li><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",10,2);\" title=\"\">"+ obj.TIT_NM +"</a><span>"+obj.REG_DTTI+"</span></li>";
                }
                rstHtml 
                    +="    </ul>"
                    
                    + "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,10,2);\" title=\"�댁쭅�됱슦�숈젙 �붾낫湲�\"><span>�붾낫湲�</span></a></p>";
                break;
            case 11://11 : DGB�⑤�由�           / �쇱궗
                rstHtml
                    +="<h4>�쇱궗</h4>"
                    + "<ul class=\"list_type1\">";
                //for(var i=0;i < arrBbsList.length;i++){
                arrLen = ( arrBbsList.length < 1 ? arrBbsList.length : 1 );
                for(var i=0;i < arrLen;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        += "<li><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",11,3);\" title=\"\">"+ obj.TIT_NM +"</a></li>";
                }
                rstHtml 
                    +="    </ul>"
                    + "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,11,3);\" title=\"�쇱궗 �붾낫湲�\"><span>�붾낫湲�</span></a></p>";
                break;
            case 12://12 : DGB�⑤�由�           / 議곗궗
                rstHtml
                    +="<h4>議곗궗</h4>"
                    + "<ul class=\"list_type1\">";  
                //for(var i=0;i < arrBbsList.length;i++){
                arrLen = ( arrBbsList.length < 1 ? arrBbsList.length : 1 );
                for(var i=0;i < arrLen;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        += "<li class=\"list\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",12,4);\" title=\"\" style=\"max-width:197px;\">"+ obj.TIT_NM +"</a></li>";
                }
                rstHtml
                    +="    </ul>"
                    + "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,12,4);\" title=\"議곗궗 �붾낫湲�\"><span>�붾낫湲�</span></a></p>";
                break;
            case 13://13 : 踰좎뒪�몄삤釉뚮쿋�ㅽ듃    / �좉퇋 踰좎뒪�� of 踰좎뒪��
                rstHtml
                    +="<h3>�좉퇋 踰좎뒪�� of 踰좎뒪��</h3>"
                    + "<ul>"
                    + "    <li>";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        += "<div class=\"thumb\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",13,0);\" title=\""+ obj.TIT_NM +"\"><img src=\""+ homeUrl +obj.IMG_PATH_NM + obj.IMG_FILE_NM +"\" alt=\"img\" style=\"width:99px;height:64px;\" /></a></div>"
                        +  "<div class=\"txt\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",13,0);\" title=\""+ obj.TIT_NM +"\">"+ obj.TIT_NM +"</a><p>"+ jex.null2Void(obj.EVENT_DTL_CN) +"</p></div>";
                }
                rstHtml 
                    +="    </li>"
                    + "</ul>"
                    + "<span class=\"board_rgt_more4\"><a href=\"javascript:goBbsPagePreMain(0,13,0);\" title=\"�좉퇋踰좎뒪�퇻f踰좎뒪�� �붾낫湲�\">�붾낫湲�</a></span>";
                break;
            case 14://14 : 踰좎뒪�몄삤釉뚮쿋�ㅽ듃    / 留쏆쭛 硫뗭쭛 諛⑸Ц湲�
                rstHtml
                    +="<h3>留쏆쭛 硫뗭쭛 諛⑸Ц湲�</h3>"
                    + "<ul>";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="<li>"
                        + "    <div class=\"thumb\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",14,1);\" title=\""+ obj.TIT_NM +"\"><img src=\""+ homeUrl + obj.IMG_PATH_NM + obj.IMG_FILE_NM +"\" alt=\"img\"  style=\"width:99px;height:64px;\" /></a></div>"
                        + "    <div class=\"txt\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",14,1);\" title=\""+ obj.TIT_NM +"\">"+ obj.TIT_NM +"</a><p>"+ jex.null2Void(obj.EVENT_DTL_CN) +"</p></div>"
                        + "</li>";
                }
                rstHtml 
                    += "</ul>"
                    +  "<span class=\"board_rgt_more2\"><a href=\"javascript:goBbsPagePreMain(0,14,1);\" title=\"留쏆쭛 硫뗭쭛 諛⑸Ц湲� �붾낫湲�\">�붾낫湲�</a></span>";
                break;
            case 15://15 : eZ諭낇겕              / �덉냼��
                rstHtml
                    +="<h3 class=\"titleSub01\">�덉냼��</h3>"
                    + "<ul>";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        += "<li class=\"list\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",15,0);\" title=\""+ obj.TIT_NM +"\">"+ obj.TIT_NM +"</a>";
                    //NEW ICON 異붽�湲곗�
                    if(obj.NEW_YN == "Y"){
                        rstHtml
                            +=" <img src=\"/img/common/sub/ebz_Psub_icon_new.gif\" alt=\"new\">";
                    }
                    
                    rstHtml
                     += "<span class=\"right\">"+ arrBbsList[i].REG_DTTI +"</span></li>";
                }
                rstHtml 
                    += "</ul>"
                    +  "<span class=\"board_rgt_more\"><a href=\"javascript:goBbsPagePreMain(0,15,0);\" title=\"�덉냼�� �붾낫湲�\" class=\"subMoreBtn\">�붾낫湲�</a></span>";
                break;
            case 16://16 : eZ諭낇겕              / �대깽��
                rstHtml
                    += "<h3 class=\"titleSub01\">�대깽��</h3>";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        += "<p><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",16,1);\" title=\""+ obj.TIT_NM +"\"><img style=\"width:300px;height:100px;\" src=\""+ homeUrl + obj.IMG_PATH_NM + obj.IMG_FILE_NM +"\" alt=\""+ obj.TIT_NM +"\" /></a></p>";
                } 
                rstHtml += "<span class=\"board_rgt_more\"><a href=\"javascript:goBbsPagePreMain(0,16,1);\" title=\"�대깽�� �붾낫湲�\" class=\"subMoreBtn\">�붾낫湲�</a></span>";
    
                break;
            case 17://17 : �ъ씠踰꾧꼍二쇱���      / 怨듭��ы빆
                rstHtml
                    +="<h5>怨듭��ы빆</h5>"
                    + "<ul  class=\"list_type1\">";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        += "<li><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",17,0);\" title=\"\">"+ obj.TIT_NM +"</a> "
                        +  "<span class=\"right\">"+ obj.REG_DTTI +"</span></li>";
                }
                rstHtml 
                    += "</ul>"
                    + "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,17,0);\" title=\"怨듭��ы빆 �붾낫湲�\"><span>�붾낫湲�</span></a></p>";
                break;
            case 18://18 : �ъ씠踰꾧꼍二쇱���      / �대깽��
                rstHtml +="<h5>�대깽��</h5>";
                arrLen = ( arrBbsList.length < 1 ? arrBbsList.length : 1 );
                for(var i=0;i < arrLen;i++){
                    var obj = arrBbsList[i];
                    rstHtml +="<div class=\"banner_wrap\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",18,1);\" title=\""+ obj.TIT_NM +"\"><img style=\"width:300px;height:100px;\" src=\""+ homeUrl + obj.IMG_PATH_NM + obj.IMG_FILE_NM +"\" alt=\""+ obj.TIT_NM +"\" />"
                        //+ " <p class=\"date\">�됱궗�쒓컙 : "+obj.EVENT_STRT_DTTI+" ~ "+obj.EVENT_END_DTTI+ "</p>"
                        + "</a></div>";
                } 
                rstHtml += "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,18,1);\" title=\"�대깽�� �붾낫湲�\" ><span>�붾낫湲�</span></a>";
    
                break;
                
            case 19://19 : �ъ씠踰꾧렇由�          / 怨듭��ы빆
                rstHtml += "<ul class=\"list_type1\">";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        += "<li><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",19,0);\" title=\"\">"+ obj.TIT_NM +"</a> "
                        +  "<span class=\"right\" style=\"*position:absolute; *bottom:8px;\">"+ obj.REG_DTTI +"</span></li>";
                }
                rstHtml 
                    += "</ul>"
                    +  "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,19,0);\" title=\"怨듭��ы빆 �붾낫湲�\" ><span>�붾낫湲�</span></a></p>";
                    
                break;
            case 20://20 : �ъ씠踰꾧렇由�          / �섍꼍�댁뒪
                rstHtml
                    +="<ul class=\"list_type1\">";+ "<ul>";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                    += "<li><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",20,1);\" title=\"\">"+ obj.TIT_NM +"</a> "
                    +  "<span class=\"right\" style=\"*position:absolute; *bottom:8px;\">"+ obj.REG_DTTI +"</span></li>";
                }
                rstHtml 
                    += "</ul>"
                        +  "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,20,1);\" title=\"�섍꼍�댁뒪 �붾낫湲�\" ><span>�붾낫湲�</span></a></p>";
                break;
            case 21://21 : �ъ씠踰꾧렇由�          / �대깽��
                rstHtml +="<h5>�대깽��</h5>";
                for(var i=0;i < 1;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                    += "<p><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",21,2);\" title=\""+ obj.TIT_NM +"\"><img style=\"width:300px;height:100px;\" src=\""+ homeUrl + obj.IMG_PATH_NM + obj.IMG_FILE_NM +"\" alt=\""+ obj.TIT_NM +"\" /></a></p>";
                } 
                rstHtml += "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,21,2);\" title=\"�대깽�� �붾낫湲�\"><span>�붾낫湲�</span></a>";
            
                break;
                
            case 22://22 : �ъ씠踰꾪븳�섏썝        / 怨듭��ы빆
                rstHtml +="<h5>怨듭��ы빆</h5>"
                    + "<ul  class=\"list_type1\">";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        += "<li><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",22,0);\" title=\"\">"+ obj.TIT_NM +"</a> "
                        +  "<span class=\"right\">"+ obj.REG_DTTI +"</span></li>";
                }
                rstHtml 
                    += "</ul>"
                    +  "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,22,0);\" title=\"怨듭��ы빆 �붾낫湲�\"><span>�붾낫湲�</span></a></p>";
                break;
            case 23://23 : �ъ씠踰꾪븳�섏썝        / �대깽��
                rstHtml +="<h5>�대깽��</h5>";
                arrLen = ( arrBbsList.length < 1 ? arrBbsList.length : 1 );
                for(var i=0;i < arrLen;i++){
                    var obj = arrBbsList[i];
                    rstHtml +="<div class=\"banner_wrap\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",23,1);\" title=\""+ obj.TIT_NM +"\"><img style=\"width:300px;height:100px;\" src=\""+ homeUrl + obj.IMG_PATH_NM + obj.IMG_FILE_NM +"\" alt=\""+ obj.TIT_NM +"\" />"
                        + "</a></div>";
                } 
                rstHtml += "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,23,1);\" title=\"�대깽�� �붾낫湲�\" ><span>�붾낫湲�</span></a>";
    
                break;
                
            case 24://24 : �ъ씠踰꾨룆��          / 怨듭��ы빆
                rstHtml
                    +="<h5>怨듭��ы빆</h5>"
                    + "<ul  class=\"list_type1\">";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        += "<li><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",24,0);\" title=\"\">"+ obj.TIT_NM +"</a> "
                        +  "<span class=\"right\">"+ obj.REG_DTTI +"</span></li>";
                }
                rstHtml 
                    += "</ul>"
                    + "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,24,0);\" title=\"怨듭��ы빆 �붾낫湲�\"><span>�붾낫湲�</span></a></p>";
                break;
            case 25://25 : �ъ씠踰꾨룆��          / �대깽��
                rstHtml
                    +="<h5>�대깽��</h5>";
                arrLen = ( arrBbsList.length < 1 ? arrBbsList.length : 1 );
                for(var i=0;i < arrLen;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="<div class=\"banner_wrap\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",25,1);\" title=\""+ obj.TIT_NM +"\"><img style=\"width:300px;height:100px;\" src=\""+ homeUrl + obj.IMG_PATH_NM + obj.IMG_FILE_NM +"\" alt=\""+ obj.TIT_NM +"\" />"
                        + "</a></div>";
                } 
                rstHtml += "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,25,1);\" title=\"�대깽�� �붾낫湲�\" ><span>�붾낫湲�</span></a>";
    
                break;
            case 37://37 : 吏���궗�� / ��援ъ���뻾��
                rstHtml
                    += "<h3 class=\"titleregion\">��援ъ���뻾��</h3>"
                    +  "<ul>";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="  <li class=\"list\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",37,0);\" title=\"\">"+ obj.TIT_NM +"</a>";
                    
                    //NEW ICON 異붽�湲곗�
                    if(obj.NEW_YN == "Y"){
                        rstHtml
                            +=" <img src=\"/img/common/sub/ebz_Psub_icon_new.gif\" alt=\"new\">";
                    }
                    
                    rstHtml
                     += "</li>";
                }
                rstHtml 
                    +="    </ul>"
                    + "<span class=\"board_rgt_more2\"><a href=\"javascript:goBbsPagePreMain(0,37,0);\" title=\"��援ъ���뻾�� �붾낫湲�\" class=\"subMoreBtn\">�붾낫湲�</a></span>";
                break;
            case 38://38 : 吏���궗�� / 寃쎈턿吏���뻾��
                rstHtml
                    += "<h3 class=\"titleregion\">寃쎈턿吏���뻾��</h3>"
                    +  "<ul>";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="  <li class=\"list\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",38,1);\" title=\"\">"+ obj.TIT_NM +"</a>";
                    
                    //NEW ICON 異붽�湲곗�
                    if(obj.NEW_YN == "Y"){
                        rstHtml
                            +=" <img src=\"/img/common/sub/ebz_Psub_icon_new.gif\" alt=\"new\">";
                    }
                    
                    rstHtml
                     += "</li>";
                }
                rstHtml 
                    +="    </ul>"
                    + "<span class=\"board_rgt_more2\"><a href=\"javascript:goBbsPagePreMain(0,38,1);\" title=\"寃쎈턿吏���뻾�� �붾낫湲�\" class=\"subMoreBtn\">�붾낫湲�</a></span>";
                break;
            case 39://39 : �곸떊�꾩떆 / ���됱냼��
                rstHtml
                    //+= "<h3 class=\"titleSub01\">���됱냼��</h3>"
                    += "<ul class=\"list_type1\">";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="  <li><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",39,0);\" title=\"\">"+ obj.TIT_NM +"</a>";
                    
                    //NEW ICON 異붽�湲곗�
                    if(obj.NEW_YN == "Y"){
                        rstHtml
                            +=" <img src=\"/img/common/sub/ebz_Psub_icon_new.gif\" alt=\"new\">";
                    }
                    
                    rstHtml
                     += "<span class=\"right\" style=\"*position:absolute; *bottom:8px;\">"+ obj.REG_DTTI +"</span>" 
                     +  "</li>";
                }
                rstHtml 
                    +="    </ul>"
                    + "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,39,0);\" title=\"���됱냼�� �붾낫湲�\"><span>�붾낫湲�</span></a></p>";
                break;
            case 40://40 : �곸떊�꾩떆 / �곸떊�꾩떆�댁뒪
                rstHtml
                    //+= "<h3 class=\"titleSub01\" style=\"padding: 20px 0 15px 0;\">�곸떊�꾩떆�댁뒪</h3>"
                    += "<ul class=\"list_type1\">";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="  <li><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",40,1);\" title=\"\">"+ obj.TIT_NM +"</a>";
                    
                    //NEW ICON 異붽�湲곗�
                    if(obj.NEW_YN == "Y"){
                        rstHtml
                            +=" <img src=\"/img/common/sub/ebz_Psub_icon_new.gif\" alt=\"new\">";
                    }
                    
                    rstHtml
                     += "<span class=\"right\" style=\"*position:absolute; *bottom:8px;\">"+ obj.REG_DTTI +"</span></li>" 
                     +  "</li>";
                }
                rstHtml 
                    +="    </ul>"
                    + "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,40,1);\" title=\"�곸떊�꾩떆�댁뒪 �붾낫湲�\"><span>�붾낫湲�</span></a></p>";
                break;
            case 41://41 : �곸떊�꾩떆 / �대깽��
                rstHtml
                    +="<h5>�대깽��</h5>";
                arrLen = ( arrBbsList.length < 1 ? arrBbsList.length : 1 );
                for(var i=0;i < arrLen;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="<div class=\"banner_wrap\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",41,2);\" title=\""+ obj.TIT_NM +"\">" +
                                "<img style=\"width:300px;height:100px;\" src=\""+ homeUrl + obj.IMG_PATH_NM + obj.IMG_FILE_NM +"\" alt=\""+ obj.TIT_NM +"\" />"
                        + "</a></div>";
                } 
                rstHtml += "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,41,2);\" title=\"�대깽�� �붾낫湲�\"><span>�붾낫湲�</span></a></p>";
    
                break;
            case 42://42 : 移대뱶紐� / 吏꾪뻾以묒씤�대깽��
                rstHtml
                    +="<ul>"
                    + "    <li class=\"active\"><a href=\"#\" title=\"吏꾪뻾以묒씠踰ㅽ듃\"><span>吏꾪뻾以묒씠踰ㅽ듃</span></a>"
                    + "        <ul style=\"display: block;\">";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    if(i == 0){
                        rstHtml 
                        +="  <li class=\"first\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",42,0);\">"+ obj.TIT_NM +"</a>";
                    }else{
                        rstHtml 
                        +="  <li ><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",42,0);\">"+ obj.TIT_NM +"</a>";                        
                    }
                    
                    //NEW ICON 異붽�湲곗�
                    if(obj.NEW_YN == "Y"){
                        rstHtml
                            +="<span class=\"new\"><img src=\"../../../img/common/mark/ebz_mark_new01.gif\" alt=\"new\" /></span>";
                    }
                    
                    rstHtml
                     += " <span class=\"time\">"+ obj.REG_DTTI +"</span></li>";
                }
                rstHtml 
                    += "        </ul>"
                     + "    </li>"
                     + "    <li><a href=\"https://www.bccard.com/app/card/evntSubmainActn.do\" target=\"_blank\" title=\"BC怨듬룞�대깽��\"><span>BC怨듬룞�대깽��</span></a>"
                     + "    <ul></ul></li>"
                     + "    <li><a href=\"javascript:goBbsPagePreMain(0,44,2);\" title=\"�뱀꺼�먮컻��\"><span>�뱀꺼�먮컻��</span></a>"
                     + "    <ul></ul></li>"
                     + "    <li><a href=\"javascript:goEvent(45);\" title=\"吏��쒖씠踰ㅽ듃\"><span>吏��쒖씠踰ㅽ듃</span></a>"
                     + "    <ul></ul></li>"
                     + "</ul>";
                break;
            
            case 43://43 : 移대뱶紐� / �대깽�몃쿋��
                rstHtml
                    +="<h3 class=\"tit\">�대깽��</h3>";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    
                    rstHtml 
                    +="<a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",43,1);\" title=\""+ obj.TIT_NM +"\">"
                    + "   <img style=\"width:300px;height:100px;\" src=\""+ homeUrl + obj.IMG_PATH_NM + obj.IMG_FILE_NM +"\" alt=\""+ obj.TIT_NM +"\">"
                    + "</a>";
                }
                
                break;
            case 45://45 : 移대뱶紐� / 吏��쒖씠踰ㅽ듃
                rstHtml
                    +="<ul>"
                    + "    <li><a href=\"javascript:goEvent(42);\" title=\"吏꾪뻾以묒씠踰ㅽ듃\"><span>吏꾪뻾以묒씠踰ㅽ듃</span></a>"
                    + "    <ul></ul></li>"
                    + "    <li><a href=\"https://www.bccard.com/app/card/evntSubmainActn.do\" target=\"_blank\" title=\"BC怨듬룞�대깽��\"><span>BC怨듬룞�대깽��</span></a>"
                    + "    <ul></ul></li>"
                    + "    <li><a href=\"javascript:goBbsPagePreMain(0,44,2);\" title=\"�뱀꺼�먮컻��\"><span>�뱀꺼�먮컻��</span></a>"
                    + "    <ul></ul></li>";
                
                rstHtml
                    +="    <li class=\"active\"><a href=\"#\" title=\"吏��쒖씠踰ㅽ듃\"><span>吏��쒖씠踰ㅽ듃</span></a>"
                    + "    <ul style=\"display: block;\">";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    if(i == 0){
                        rstHtml 
                        +="  <li class=\"first\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",45,0);\">"+ obj.TIT_NM +"</a>";
                    }else{
                        rstHtml 
                        +="  <li ><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",45,0);\">"+ obj.TIT_NM +"</a>";                        
                    }
                    
                    //NEW ICON 異붽�湲곗�
                    if(obj.NEW_YN == "Y"){
                        rstHtml
                            +="<span class=\"new\"><img src=\"../../../img/common/mark/ebz_mark_new01.gif\" alt=\"new\" /></span>";
                    }
                    
                    rstHtml
                     += " <span class=\"time\">"+ obj.REG_DTTI +"</span></li>";
                }
                rstHtml
                     +="</ul></li>"
                     + "</ul>";
                break;
            case 36://36 : 湲덉쑖吏�二�(korea)  / DGB�댁뒪
                rstHtml
                    +=  "<h3>DGB�댁뒪</h3>"
                     +  "<div style=\"clear:both; display:block;\">"
                     +  "    <ul style=\"margin-top:10px;\">";
                
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="<li><a href=\"javascript:goEtcBbsPage("+ obj.PUTUP_WRIT_SEQ +",36,0);\" title=\""+ obj.TIT_NM +"\">"+ obj.TIT_NM +"</a></li>";
                }
                
                rstHtml 
                    +=  "    </ul>"
                     +  "</div>"
                     +  "<span class=\"right\"><a href=\"javascript:goEtcBbsPage(0,36,0);\" title=\"DGB�댁뒪 �붾낫湲�\"><img src=\"/cms/group/dfg/images/main/ebz_fq_top_plus.gif\" alt=\"�붾낫湲�\"/></a></span>";
    
                break;
            case 63://63 : 湲덉쑖吏�二�(kroea)  / DGB�섏슂媛뺤쥖
                rstHtml
                    +=  "<h3>DGB�섏슂媛뺤쥖</h3>"
                     +  "<div style=\"clear:both; display:block;\">"
                     +  "    <ul style=\"margin-top:10px;\">";
                
                arrLen = ( arrBbsList.length < 1 ? arrBbsList.length : 1 );
                for(var i=0;i < arrLen;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="<li><a href=\"javascript:goEtcBbsPage("+ obj.PUTUP_WRIT_SEQ +",63,2);\" title=\""+ obj.TIT_NM +"\">"+ obj.TIT_NM +"</a></li>";
                }
                
                rstHtml 
                    +=  "    </ul>"
                     +  "</div>"
                     +  "<span class=\"right\"><a href=\"javascript:goEtcBbsPage(0,63,2);\" title=\"DGB�섏슂媛뺤쥖 �붾낫湲�\"><img src=\"/cms/group/dfg/images/main/ebz_fq_top_plus.gif\" alt=\"�붾낫湲�\"/></a></span>";
    
                break;
            case 28://28 : 湲덉쑖吏�二�(kroea)  / IR�댁뒪/IR�덊꽣
                rstHtml
                    +="<p class=\"m_info_btns\"><a href=\"javascript:goEtcBbsPage(0,28,1);\" title=\"IR�쇱젙 諛� �뚯떇\">IR�쇱젙 諛� �뚯떇</a></p>"
                     + "<ul class=\"m_info_news_list\">"
                     + "    <li class=\"invisible\">IR�쇱젙 諛� �뚯떇</li>";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="<li><a href=\"javascript:goEtcBbsPage("+ obj.PUTUP_WRIT_SEQ +",28,1);\" title=\""+ obj.TIT_NM +"\"><span class=\"li_strong\">"+ obj.REG_DTTI +"</span> "+ obj.TIT_NM +"</a></li>";
                } 
                
                rstHtml 
                    +=  "    </ul>";
                
                break;
            case 29://29 : 湲덉쑖吏�二�(English)  / IR News
                rstHtml
                    += "<p class=\"m_info_btns\"><a href=\"javascript:goEtcBbsPage(0,29,0);\" title=\"IR  Activities News\">IR  Activities &amp; News</a></p>"
                     + "<ul class=\"m_info_news_list\">"
                     + "    <li class=\"invisible\">IR  Activities &amp; News</li>";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="<li><a href=\"javascript:goEtcBbsPage("+ obj.PUTUP_WRIT_SEQ +",29,0);\" title=\""+ obj.TIT_NM +"\"><span class=\"li_strong\">"+ obj.REG_DTTI +"</span> "+ obj.TIT_NM +"</a></li>";
                } 
                
                rstHtml 
                    +=  "    </ul>";
    
                break;
            case 30://30 : �곗씠�곗떆�ㅽ뀥  / NOTICE(DGB湲덉쑖洹몃９�뚯떇)
                rstHtml
                    +="<ul class=\"main_list_box\">";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="<li><a href=\"javascript:goEtcBbsPage("+ obj.PUTUP_WRIT_SEQ +",30,0);\" title=\"\">["+ obj.REG_DTTI +"] "+ obj.TIT_NM +"</a></li>";
                }
                rstHtml 
                    +=  "    </ul>"
                    +   "<span class=\"right\"><a href=\"javascript:goBbsMain();\" title=\"NOTICE �붾낫湲�\"><img src=\"/cms/group/dds/images/main/more_btn.gif\" alt=\"NOTICE �붾낫湲�\"></a></span>";
                break;
            case 31://31 : �곗씠�곗떆�ㅽ뀥  / NEWS(怨듭��ы빆)
                rstHtml
                    +="<ul class=\"main_list_box\">";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="<li><a href=\"javascript:goEtcBbsPage("+ obj.PUTUP_WRIT_SEQ +",31,1);\" title=\"\">["+ obj.REG_DTTI +"] "+ obj.TIT_NM +"</a></li>";
                }
                rstHtml 
                    +=  "    </ul>"
                    +   "<span class=\"right\"><a href=\"javascript:goBbsMain();\" title=\"NEWS �붾낫湲�\"><img src=\"/cms/group/dds/images/main/more_btn.gif\" alt=\"NEWS �붾낫湲�\"></a></span>";
                break;
            case 32://32 :  �낆궗紐� / 怨듭��ы빆           
                /*rstHtml
                    += "<h3 class=\"titleSub01\">怨듭��ы빆<a href=\"javascript:goEtcBbsPage(0,32,0);\" title=\"怨듭��ы빆 �붾낫湲�\" class=\"MoreBtn\">�붾낫湲�</a>"
                     + "</h3>"
                     + "<ul>";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="<li class=\"list\"><a href=\"javascript:goEtcBbsPage("+ obj.PUTUP_WRIT_SEQ +",32,0);\" title=\"\">"+ obj.TIT_NM +"</a><span class=\"right\">"+ obj.REG_DTTI +"</span></li>";
                }*/

                rstHtml += "<ul class=\"list_type1 main_cardtab\">";
                
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml += "<li><a href=\"javascript:goBbsPagePreMainCD("+ obj.PUTUP_WRIT_SEQ +",32,0,'1020');\" title=\"\">"+ obj.TIT_NM +"</a><span>"+ obj.REG_DTTI +"</span></li>";
                }
                
                rstHtml += "</ul><p class=\"more\"><a href=\"javascript:goBbsPagePreMainCD(0,32,0,'1020');\"><span>�붾낫湲�</span></a></p>";
                break;
            case 33://33 :  �낆궗紐� / �몃줎蹂대룄
                rstHtml += "<ul class=\"list_type1 main_cardtab\">";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml += "<li><a href=\"javascript:goBbsPagePreMainCD("+ obj.PUTUP_WRIT_SEQ +",33,1,'1020');\" title=\"\">"+ obj.TIT_NM +"</a><span>"+ obj.REG_DTTI +"</span></li>";
                }
                rstHtml += "</ul><p class=\"more\"><a href=\"javascript:goBbsPagePreMainCD(0,33,1,'1020');\"><span>�붾낫湲�</span></a></p>";

                break;
            case 34://34 :  �곹빐吏���(korea) / 怨듭��ы빆
                rstHtml
                    += "<h3>News &amp; Notice</h3>"
                     + "<ul>";
                
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        += "<li><a href=\"javascript:goEtcBbsPage("+ obj.PUTUP_WRIT_SEQ +",34,0);\" title=\"\">"+ obj.TIT_NM +"</a> <span class=\"date\">"+ obj.REG_DTTI +"</span></li>";
                }
    
                rstHtml 
                    +=  "    </ul>"
                    +   "<p class=\"more\"><a href=\"javascript:goEtcBbsPage(0,34,0);\" title=\"MORE\"><img src=\"/cms/site/dcn/img/icon_more.png\" alt=\"News &amp; Notice �붾낫湲�\" /></a></p>";
                break;
            case 35://35 :  �곹빐吏���(以묐Ц) / 怨듭��ы빆
                rstHtml
                    += "<h3 >News & Notice</h3>"
                     + "<ul>";
                
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        += "<li><a href=\"javascript:goEtcBbsPage("+ obj.PUTUP_WRIT_SEQ +",35,0);\" title=\"\">"+ obj.TIT_NM +"</a> <span class=\"date\">"+ obj.REG_DTTI +"</span></li>";
                }
    
                rstHtml 
                    +=  "    </ul>"
                    +   "<p class=\"more\"><a href=\"javascript:goEtcBbsPage(0,35,0);\" title=\"MORE\"><img src=\"/cms/site/dcn/img/icon_more.png\" alt=\"News &amp; Notice �붾낫湲�\" /></a></span>";
                break;
            case 46: //46 : �대깽�� / �대깽�퇣UB     
                rstHtml
                    +="<h3 class=\"tit\">�대깽��</h3>";
                for(var i=0;i < arrBbsList.length;i++){   
                    var obj = arrBbsList[i];
                    
                    rstHtml 
                    +="<a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",43,1);\" title=\""+ obj.TIT_NM +"\">"
                    + "   <img style=\"width:300px;height:100px;\" src=\""+ homeUrl + obj.IMG_PATH_NM + obj.IMG_FILE_NM +"\" alt=\""+ obj.TIT_NM +"\">"
                    + "</a>";
                }
                
                break;  
                
            case 50 ://50  : DGB�댁뒪 / 寃뚯떆�� �곷떒
                rstHtml
                    +="    <ul style=\"overflow:hidden;\">";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    var writ = obj.PUTUP_WRIT_CN;
                    writ = writ.replace(/(<([^>]+)>)/gi, "");
                    if(writ.length > 100){
                        writ = writ.substring(0, 50) + "..";
                    }
                    rstHtml 
                        +="  <li class=\"list\" style=\"float:left;width:33%;\">"
                        + "<img style=\"width:100%;height:100px;\" src=\""+ homeUrl + obj.IMG_PATH_NM + obj.IMG_FILE_NM +"\" alt=\""+ obj.TIT_NM +"\"><br/>"
                        +"<a href=\"javascript:goDetailBbsPage("+ obj.PUTUP_WRIT_SEQ +",5,1);\" title=\"\"><b>"+ obj.TIT_NM +"</b></a><br/>"
                        + writ + "<br/>"
                        +"<span class=\"right\">"+ obj.REG_DTTI +"</span></li>";
                }       
                rstHtml 
                    +="    </ul>";
                break;
            case 70://70 : 移대뱶�대깽��

                rstHtml = "";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    if(i == 0){
                        rstHtml 
                        +="  <li class=\"first\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",70,1);\">"+ obj.TIT_NM +"</a>";
                    }else{
                        rstHtml 
                        +="  <li ><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",70,1);\">"+ obj.TIT_NM +"</a>";                        
                    }
                    
                    //NEW ICON 異붽�湲곗�
                    if(obj.NEW_YN == "Y"){
                        rstHtml
                            +="<span class=\"new\"><img src=\"../../../img/common/mark/ebz_mark_new01.gif\" alt=\"new\" /></span>";
                    }
                    
                    rstHtml += "</li>";
                }
                break;
            
            case 71://71 : BC怨듬룞�대깽��

                rstHtml = "";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    if(i == 0){
                        rstHtml 
                        +="  <li class=\"first\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",71,2);\">"+ obj.TIT_NM +"</a>";
                    }else{
                        rstHtml 
                        +="  <li ><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",71,2);\">"+ obj.TIT_NM +"</a>";
                    }
                    
                    //NEW ICON 異붽�湲곗�
                    if(obj.NEW_YN == "Y"){
                        rstHtml
                            +="<span class=\"new\"><img src=\"../../../img/common/mark/ebz_mark_new01.gif\" alt=\"new\" /></span>";
                    }
                    
                    rstHtml += "</li>";
                }
                break;

            case 72://72 : 李몄뿬�대깽��  

                rstHtml = "";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    if(i == 0){
                        rstHtml 
                        +="  <li class=\"first\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",43,1);\">"+ obj.TIT_NM +"</a>";
                    }else{
                        rstHtml 
                        +="  <li ><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",43,1);\">"+ obj.TIT_NM +"</a>";
                    }
                    
                    //NEW ICON 異붽�湲곗�
                    if(obj.NEW_YN == "Y"){
                        rstHtml
                            +="<span class=\"new\"><img src=\"../../../img/common/mark/ebz_mark_new01.gif\" alt=\"new\" /></span>";
                    }
                    
                    rstHtml += "</li>";
                }
                break;

            case 73://73 : �뱀꺼�먮낫湲�

                rstHtml = "";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    if(i == 0){
                        rstHtml 
                        +="  <li class=\"first\"><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",44,0);\">"+ obj.TIT_NM +"</a>";
                    }else{
                        rstHtml 
                        +="  <li ><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",44,0);\">"+ obj.TIT_NM +"</a>";
                    }
                    
                    //NEW ICON 異붽�湲곗�
                    if(obj.NEW_YN == "Y"){
                        rstHtml
                            +="<span class=\"new\"><img src=\"../../../img/common/mark/ebz_mark_new01.gif\" alt=\"new\" /></span>";
                    }
                    
                    rstHtml += "</li>";
                }
                break;
            
            case 74://74 : 理쒖떊�대깽��

                rstHtml = "";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    rstHtml 
                        +="  <li class=\"banner_03_"+(i+1)+" slide_content\">"
                        +"<a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",74,0);\">"
                        +"<img src=\""+ homeUrl + obj.IMG_PATH_NM + obj.IMG_FILE_NM +"\" alt=\""+ obj.TIT_NM +"\" alt=\""+obj.TIT_NM+"\" width='430' height='143' /></a></li>";
                }
                break;
            case 75://75 : �ы뀒�� > �쒖옣�뺣낫 > DGB紐⑤떇釉뚮━��

                rstHtml = "<p class=\"inbox_tit w\">�ы뀒�� �뺣낫</p>";
                rstHtml += "<ul class=\"list_type3\">";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    
                    rstHtml 
                        +="  <li><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",75,1);\">"+ obj.TIT_NM +"</a>";
                    
                    rstHtml += " <span class=\"time\">"+ obj.REG_DTTI +"</span></li>";
                    rstHtml += "</li>";
                }
                rstHtml += "</ul>";
                rstHtml += "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,75,1)\" title='�ы뀒�ъ젙蹂� �붾낫湲�'>�붾낫湲�</a></p>";
                break;
            case 76://76 : �됰났���댁꽕怨� > �됰났�뚰듃�� > �됰났�뚯떇吏�

                rstHtml = "<p class=\"inbox_tit w\">�됰났�뚯떇吏� �뺣낫</p>";
                rstHtml += "<ul class=\"list_type3\">";
                for(var i=0;i < arrBbsList.length;i++){
                    var obj = arrBbsList[i];
                    
                    rstHtml 
                        +="  <li><a href=\"javascript:goBbsPagePreMain("+ obj.PUTUP_WRIT_SEQ +",76,2);\">"+ obj.TIT_NM +"</a>";
                    
                    rstHtml += " <span class=\"time\">"+ obj.REG_DTTI +"</span></li>";
                    rstHtml += "</li>";
                }
                rstHtml += "</ul>";
                rstHtml += "<p class=\"btn_more\"><a href=\"javascript:goBbsPagePreMain(0,76,2)\" title='�됰났�뚯떇吏� �붾낫湲�'>�붾낫湲�</a></p>";
                break;
            case 77://77 : 硫붿씤 > �꾩떆�됱궗

                rstHtml = "<p class=\"inbox_tit w\">�꾩떆�됱궗�덈궡</p>";
                
                arrLen = ( arrBbsList.length < 1 ? arrBbsList.length : 1 );
                for(var i=0;i < arrLen;i++){
                    var obj = arrBbsList[i];
                    rstHtml += "<p class=\"sub_tit\">"+obj.TIT_NM+"</p>";
                    rstHtml += "<ul class=\"list_type3\">";
                    rstHtml += "<li>湲곌컙 : <span>"+jex.null2Void(obj.EVENT_STRT_DTTI)+" ~ "+jex.null2Void(obj.EVENT_END_DTTI)+"</span></li>"; 
                    rstHtml += "<li>李몄뿬�묎� : <span>"+jex.null2Void(obj.EVENT_NM)+"</span></li>";                  
                }
                rstHtml += "</ul>";
                rstHtml += "<p class=\"btn_more\"><a href=\"javascript:linkMenuPage('dgi_fac_sub3_3','dgi_fac_sub3','0','com_ebz_dgi_main.act')\" title='�꾩떆�됱궗�덈궡 �붾낫湲�'>�붾낫湲�</a></p>";
                break;
            case 78://78 : 硫붿씤 > �대깽�� 
                rstHtml = "";
                rstHtml += "<ul class=\"banner_list\">";
                
                for(var i=0; i<arrBbsList.length; i++){
                        var obj = arrBbsList[i];
                        rstHtml +="<li class=\"banner_03_"+(i+1)+" slide_content\">";
                        rstHtml +="<a href=\"javascript:goBbsPagePreMain("+jex.null2Void(obj.PUTUP_WRIT_SEQ)+",78,4)\"><img src=\""+jex.null2Void(obj.IMG_PATH_NM)+jex.null2Void(obj.IMG_FILE_NM)+"\" alt=\""+(i+1)+"踰덉㎏ 諛곕꼫\"></a>";
                        rstHtml +="</li>";
                }
                
                rstHtml += "</ul>";
                rstHtml += "<ul class=\"banner_pagging_btn\">";
                rstHtml += "<li class=\"stall\"><a href=\"#none\"><span>硫덉땄</span></a></li>";
                rstHtml += "<li class=\"play\"><a href=\"#none\"><span>�ъ깮</span></a></li>";
                rstHtml += "</ul>";
                
                break;
            default:
        }
    }
    
    return rstHtml;
}

/*
 * 硫붾돱 key �� �곕Ⅸ 寃뚯떆�� �먯옣�� �낅젰�� 蹂��섎� �ㅼ젙�쒕떎
 * */
function setParam(){
    switch (subBbsKey){
        case 1 ://1  : 硫붿씤                / �덉냼��
            mainUrl = "com_ebz_hlp_main";
            siteCd  = "03";
            menuCd  = "A";
            bbsId   = "NEW001";
            locIdxBySub = 0;
            rowCnt  = 7; 
            menuId  = "hlp_hns_sub1";
            menuNum = 0;
            menuVal = "";
            break;
        case 2 ://2  : 硫붿씤                / 吏���뻾��
            mainUrl = "com_ebz_hlp_main";
            siteCd  = "03";
            menuCd  = "A";
            bbsId   = "NOM021";
            locIdxBySub = 1;
            rowCnt  = 7;   
            menuId  = "hlp_hns_sub3";
            menuNum = 0;
            menuVal = "";
            break;
        case 3 ://3  : 硫붿씤                / �대깽��
            mainUrl = "com_ebz_hlp_main";
            siteCd  = "03";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 1;
            rowCnt  = 3;   
            menuId  = "hlp_hns_sub2";
            menuNum = 0;
            menuVal = "";
            break;
        case 4 ://4  : DGB�뚭컻             / �덉냼��
            mainUrl = "com_ebz_hlp_main";
            siteCd  = "03";
            menuCd  = "J";
            bbsId   = "NEW001";
            locIdxBySub = 0;
            rowCnt  = 3;  
            menuId  = "hlp_hns_sub1";
            menuNum = 0;
            menuVal = "";
            break;
        case 5 ://5  : DGB�뚭컻             / 蹂대룄�먮즺
            mainUrl = "com_ebz_dgi_main";
            siteCd  = "04";
            menuCd  = "A";
            bbsId   = "CRG001";
            locIdxBySub = 1;
            rowCnt  = 3;  
            //menuId  = "dgi_new_sub1";
            menuId  = "dgi_pub_sub2";
            menuNum = 0;
            menuVal = "";
            break;
        case 6 ://6  : 媛쒖씤諭낇궧            / �덉냼��
            mainUrl = "com_ebz_hlp_main";
            siteCd  = "03";
            menuCd  = "B";
            bbsId   = "NEW001";
            locIdxBySub = 0;
            rowCnt  = 3; 
            menuId  = "hlp_hns_sub1";
            menuNum = 0;
            menuVal = "";
            break;
        case 7 ://7  : 湲곗뾽諭낇궧            / �덉냼��
            mainUrl = "com_ebz_hlp_main";
            siteCd  = "03";
            menuCd  = "C";
            bbsId   = "NEW001";
            locIdxBySub = 0;
            rowCnt  = 3;  
            menuId  = "hlp_hns_sub1";
            menuNum = 0;
            menuVal = "";
            break;
        case 8 ://8  : 吏���궗�뚭났��        / 吏���낫�꾩옄猷�
            mainUrl = "com_ebz_lcc_main";
            siteCd  = "05";
            menuCd  = "A";
            bbsId   = "CRG001";
            locIdxBySub = 0;
            rowCnt  = 2;  
            menuId  = "lcc_act_sub1";
            menuNum = 0;
            menuVal = "";
            break;
        case 9 ://9  : 吏���궗�뚭났��        / 吏���궗�뚰솢��
            mainUrl = "com_ebz_lcc_main";
            siteCd  = "05";
            menuCd  = "A";
            bbsId   = "GAL004";
            locIdxBySub = 1;
            rowCnt  = 3;  
            menuId  = "lcc_act_sub2";
            menuNum = 0;
            menuVal = "";
            break;
        case 26://26 : DGB�⑤�由�           / DGB媛�議깊뻾蹂듭꽱��
            mainUrl = "com_ebz_dfm_main";
            siteCd  = "33";
            menuCd  = "A";
            bbsId   = "NOT006";
            locIdxBySub = 0;
            rowCnt  = 1;  
            menuId  = "dfm_dhc_sub3";
            menuNum = 0;
            menuVal = "";
            break;
        case 27://27 : DGB�⑤�由�          / �닿��곷떞��
            mainUrl = "com_ebz_dfm_main";
            siteCd  = "11";
            menuCd  = "A";
            bbsId   = "NOM084";
            locIdxBySub = 1;
            rowCnt  = 0;  
            menuId  = "dfm_dhc_sub2";
            menuNum = 2;
            menuVal = "";
            break;
        case 10://10 : DGB�⑤�由�           / �댁쭅�됱슦�숈젙
            mainUrl = "com_ebz_dfm_main";
            siteCd  = "32";
            menuCd  = "A";
            bbsId   = "NOT016";
            locIdxBySub = 2;
            rowCnt  = 4;  
            menuId  = "dfm_reg_sub7";
            menuNum = 0;
            menuVal = "";
            break;
        case 11://11 : DGB�⑤�由�           / �쇱궗
            mainUrl = "com_ebz_dfm_main";
            siteCd  = "32";
            menuCd  = "A";
            bbsId   = "NOM075";
            locIdxBySub = 3;
            rowCnt  = 1;  
            menuId  = "dfm_reg_sub3";
            menuNum = 0;
            menuVal = "dfm_reg_sub3_1";
            break;
        case 12://12 : DGB�⑤�由�           / 議곗궗
            mainUrl = "com_ebz_dfm_main";
            siteCd  = "32";
            menuCd  = "A";
            bbsId   = "NOM076";
            locIdxBySub = 4;
            rowCnt  = 1;  
            menuId  = "dfm_reg_sub3";
            menuNum = 1;
            menuVal = "dfm_reg_sub3_2";
            break;
        case 13://13 : 踰좎뒪�몄삤釉뚮쿋�ㅽ듃    / �좉퇋 踰좎뒪�� of 踰좎뒪��
            mainUrl = "com_ebz_bob_main";
            siteCd  = "12";
            menuCd  = "A";
            bbsId   = "ADV003";
            locIdxBySub = 0;
            rowCnt  = 1;  
            menuId  = "bob_sbb_sub2";
            menuNum = 0;
            menuVal = "";
            break;
        case 14://14 : 踰좎뒪�몄삤釉뚮쿋�ㅽ듃    / 留쏆쭛 硫뗭쭛 諛⑸Ц湲�
            mainUrl = "com_ebz_bob_main";
            siteCd  = "12";
            menuCd  = "A";
            bbsId   = "ADV005";
            locIdxBySub = 1;
            rowCnt  = 2;  
            menuId  = "bob_foo_sub1";
            menuNum = 0;
            menuVal = "";
            break;
        case 15://15 : eZ諭낇겕              / �덉냼��
            mainUrl = "com_ebz_hlp_main";
            siteCd  = "03";
            menuCd  = "A";
            bbsId   = "NEW001";
            locIdxBySub = 0;
            rowCnt  = 4; 
            menuId  = "hlp_hns_sub1";
            menuNum = 0;
            menuVal = "";
            break;
            break;
        case 16://16 : eZ諭낇겕              / �대깽��      
            mainUrl = "com_ebz_hlp_main";
            siteCd  = "03";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 1;
            rowCnt  = 1;   
            menuId  = "hlp_hvt_sub1";
            menuNum = 0;
            menuVal = "";
            break;
        case 17://17 : �ъ씠踰꾧꼍二쇱���      / 怨듭��ы빆
            mainUrl = "com_ebz_cgj_main";
            siteCd  = "08";
            menuCd  = "A";
            bbsId   = "NOT001";
            locIdxBySub = 0;
            rowCnt  = 3;  
            menuId  = "cgj_svc_sub2";
            menuNum = 0;
            menuVal = "";
            break;
        case 18://18 : �ъ씠踰꾧꼍二쇱���      / �대깽��
            mainUrl = "com_ebz_cgj_main";
            siteCd  = "08";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 1;
            rowCnt  = 1;  
            menuId  = "cgj_svc_sub3";
            menuNum = 0;
            menuVal = "cgj_svc_sub3_1";
            break;
        case 19://19 : �ъ씠踰꾧렇由�          / 怨듭��ы빆
            mainUrl = "com_ebz_cgr_main";
            siteCd  = "07";
            menuCd  = "A";
            bbsId   = "NOT001";
            locIdxBySub = 0;
            rowCnt  = 3;  
            menuId  = "cgr_grg_sub2";
            menuNum = 0;
            menuVal = "";
            break;
        case 20://20 : �ъ씠踰꾧렇由�          / �섍꼍�댁뒪
            mainUrl = "com_ebz_cgr_main";
            siteCd  = "07";
            menuCd  = "A";
            bbsId   = "NOM060";
            locIdxBySub = 1; 
            rowCnt  = 3;  
            menuId  = "cgr_evi_sub5";
            menuNum = 4;
            menuVal = "cgr_evi_sub";
            break;
        case 21://21 : �ъ씠踰꾧렇由�          / �대깽��
            mainUrl = "com_ebz_cgr_main";
            siteCd  = "07";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 2;
            rowCnt  = 1;  
            menuId  = "cgr_grg_sub3";
            menuNum = 0;
            menuVal = "cgr_grg_sub3_1";
            break;
        case 22://22 : �ъ씠踰꾪븳�섏썝        / 怨듭��ы빆 
            mainUrl = "com_ebz_chs_main";
            siteCd  = "09";
            menuCd  = "A";
            bbsId   = "NOT001";
            locIdxBySub = 0;
            rowCnt  = 3;  
            menuId  = "chs_svc_sub2";
            menuNum = 0;
            menuVal = "";
            break;
        case 23://23 : �ъ씠踰꾪븳�섏썝        /  �대깽��
            mainUrl = "com_ebz_chs_main";
            siteCd  = "09";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 1;
            rowCnt  = 1;  
            menuId  = "chs_svc_sub3";
            menuNum = 0;
            menuVal = "chs_svc_sub3_1";
            break;
        case 24://24 : �ъ씠踰꾨룆��          / 怨듭��ы빆
            mainUrl = "com_ebz_cdd_main";
            siteCd  = "06";
            menuCd  = "A";
            bbsId   = "NOT001";
            locIdxBySub = 0;
            rowCnt  = 3;  
            menuId  = "cdd_bor_sub1";
            menuNum = 0;
            menuVal = "";
            break;
        case 25://25 : �ъ씠踰꾨룆��          / �대깽��
            mainUrl = "com_ebz_cdd_main";
            siteCd  = "06";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 1;
            rowCnt  = 1;
            menuId  = "cdd_evt_sub1";
            menuNum = 0;
            menuVal = "";
            break;
        case 37://37 : 吏���궗�� / ��援ъ���뻾��
            mainUrl = "com_ebz_hlp_main";
            siteCd  = "03";
            menuCd  = "A";
            bbsId   = "NOM021";
            locIdxBySub = 0;
            rowCnt  = 3;   
            menuId  = "hlp_hre_sub1";
            menuNum = 0;
            menuVal = "";
            break;
        case 38://38 : 吏���궗�� / 寃쎈턿吏���뻾��
            mainUrl = "com_ebz_hlp_main";
            siteCd  = "03";
            menuCd  = "A";
            bbsId   = "NOM021";
            locIdxBySub = 1;
            rowCnt  = 3;
            menuId  = "hlp_hre_sub1";
            menuNum = 0;
            menuVal = "";
            break;
        case 39://39 : �곸떊�꾩떆 / ���됱냼��
            mainUrl = "com_ebz_cct_main";
            siteCd  = "03";
            menuCd  = "A";
            bbsId   = "NEW001";
            locIdxBySub = 0;
            rowCnt  = 3;
            menuId  = "cct_svc_sub1";
            menuNum = 2;
            menuVal = "";
            break;
        case 40://40 : �곸떊�꾩떆 / �곸떊�꾩떆�댁뒪
            mainUrl = "com_ebz_cct_main";
            siteCd  = "14";
            menuCd  = "B";
            bbsId   = "NOT001";
            locIdxBySub = 1;
            rowCnt  = 3;
            menuId  = "cct_svc_sub2";
            menuNum = 3;
            menuVal = "";
            break;
        case 41://41 : �곸떊�꾩떆 / �대깽��
            mainUrl = "com_ebz_cct_main";
            siteCd  = "14";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 2;
            rowCnt  = 1;
            menuId  = "cct_svc_sub3";
            menuNum = 0;
            menuVal = "";
            break;
        case 42://42 : 移대뱶紐� / 吏꾪뻾以묒씤�대깽��
            mainUrl = "com_ebz_fpm_main";
            siteCd  = "01";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 0;
            rowCnt  = 4;
            menuId  = "fnm_fnc_sub6";
            menuNum = 0;
            menuVal = "fnm_fnc_sub6_1";
            break;
        case 43://43 : 移대뱶紐� / �대깽�몃같��[�ъ슜X]
            mainUrl = "com_ebz_fpm_main";
            siteCd  = "01";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 1;
            rowCnt  = 1;
            menuId  = "fnm_fnc_sub6";
            menuNum = 0;
            menuVal = "fnm_fnc_sub6_1";
            break;
        case 44://44 : 移대뱶紐� / �뱀꺼�� 諛쒗몴
            mainUrl = "com_ebz_fpm_main";
            siteCd  = "14";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 2;
            rowCnt  = 1;
            menuId  = "fnm_fnc_sub6";
            menuNum = 1;
            menuVal = "fnm_fnc_sub6_2";
            break;
        case 45://45 : 移대뱶紐� / 吏��쒖씠踰ㅽ듃
            mainUrl = "com_ebz_fpm_main";
            siteCd  = "01";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 0;
            rowCnt  = 4;
            menuId  = "fnm_fnc_sub6";
            menuNum = 0;
            menuVal = "fnm_fnc_sub6_1";
            break;
        case 36://36 : 湲덉쑖吏�二�(korea)  / DGB�댁뒪(蹂대룄�먮즺)
            EtcBbsListUrl   = "dfg_ebz_10122_bord";
            EtcBbsDetailUrl = "dfg_ebz_10222_bord";
            mainUrl = "ETC";
            siteCd  = "30";
            menuCd  = "A";      
            bbsId   = "CRG006";
            locIdxBySub = 0;
            rowCnt  = 3;
            break;
        case 63://63 : 湲덉쑖吏�二�(kroea)  / DGB�섏슂�밴컯
            EtcBbsListUrl   = "dfg_ebz_10128_bord";
            EtcBbsDetailUrl = "dfg_ebz_10228_bord";
            mainUrl = "ETC";
            siteCd  = "30";
            menuCd  = "A";
            bbsId   = "NOM140";
            locIdxBySub = 2;
            rowCnt  = 1;
            break;
        case 28://28 : 湲덉쑖吏�二�(korea)  / IR�댁뒪/IR�덊꽣
            EtcBbsListUrl   = "dfg_ebz_10103_bord";
            EtcBbsDetailUrl = "dfg_ebz_10203_bord";
            mainUrl = "ETC";
            siteCd  = "30";
            menuCd  = "A";
            bbsId   = "RFN019";
            locIdxBySub = 1;
            rowCnt  = 3;
            break;
        case 29://29 : 湲덉쑖吏�二�(English)  / IR News
            EtcBbsListUrl   = "dfg_ebz_10107_bord";
            EtcBbsDetailUrl = "dfg_ebz_10207_bord";
            mainUrl = "ETC";
            siteCd  = "30";
            menuCd  = "A";
            bbsId   = "RFN025";
            locIdxBySub = 0;
            rowCnt  = 3;
            break;
        case 30://30 : �곗씠�곗떆�ㅽ뀥  / NOTICE(DGB湲덉쑖洹몃９�뚯떇)
            EtcBbsListUrl   = "dds_ebz_10101_bord";
            EtcBbsDetailUrl = "dds_ebz_10201_bord";
            mainUrl = "ETC";
            siteCd  = "31";
            menuCd  = "A";
            bbsId   = "NEW003";
            locIdxBySub = 0;
            rowCnt  = 3;
            break;
        case 31://31 : �곗씠�곗떆�ㅽ뀥  / NEWS(怨듭��ы빆)
            EtcBbsListUrl   = "dds_ebz_10102_bord";
            EtcBbsDetailUrl = "dds_ebz_10202_bord";
            mainUrl = "ETC";
            siteCd  = "31";
            menuCd  = "A";
            bbsId   = "NOT009";
            locIdxBySub = 1;
            rowCnt  = 3;
            break;
        case 32://32 :  �낆궗紐� / 怨듭��ы빆
            mainUrl = "dlo_ebz_main";
            siteCd  = "06";
            menuCd  = "A";
            bbsId   = "NOT001";
            locIdxBySub = 0;
            rowCnt  = 4;  
            menuId  = "dok_new_sub1";
            menuNum = 0;
            menuVal = "";
            break;
        case 33://33 :  �낆궗紐� / �몃줎蹂대룄
            mainUrl = "dlo_ebz_main";
            siteCd  = "06";
            menuCd  = "A";
            bbsId   = "CRG001";
            locIdxBySub = 1;
            rowCnt  = 4;  
            menuId  = "dok_new_sub2";
            menuNum = 0;
            menuVal = "";
            break;
        case 34://34 :  �곹빐吏���(korea) / 怨듭��ы빆
            EtcBbsListUrl   = "dcn_ebz_10102_bord";
            EtcBbsDetailUrl = "dcn_ebz_10202_bord";
            mainUrl = "ETC";
            siteCd  = "16";
            menuCd  = "A";
            bbsId   = "NOT012";
            locIdxBySub = 0;
            rowCnt  = 4;
            break;
        case 35://35 :  �곹빐吏���(以묐Ц) / 怨듭��ы빆
            EtcBbsListUrl   = "dcn_ebz_10101_bord";
            EtcBbsDetailUrl = "dcn_ebz_10201_bord";
            mainUrl = "ETC";
            siteCd  = "16";
            menuCd  = "A";
            bbsId   = "NOT011";
            locIdxBySub = 0;
            rowCnt  = 4;
            break;
        case 46 ://46  : 硫붿씤                / �대깽��
            mainUrl = "com_ebz_hlp_main";
            siteCd  = "01";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 2;
            rowCnt  = 3;   
            menuId  = "hlp_hvt_sub1";
            menuNum = 0;
            menuVal = "";
            break;  
        case 50 ://50  : DGB�댁뒪
            mainUrl = "com_ebz_dgi_main";
            siteCd  = "04";
            menuCd  = "A";
            bbsId   = "CRG001";
            locIdxBySub = 1;
            rowCnt  = 3;  
            menuId  = "dgi_new_sub1";
            menuNum = 0;
            menuVal = "";
            break;
        case 70://70 : 移대뱶�대깽��
            mainUrl = "com_ebz_fpm_main";
            siteCd  = "01";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 1;
            rowCnt  = 4;
            menuId  = "fnm_fnc_sub6";
            menuNum = 0;
            menuVal = "fnm_fnc_sub6_1";
            break;
        case 71://71 : 李몄뿬�대깽��
            mainUrl = "com_ebz_fpm_main";
            siteCd  = "01";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 2;
            rowCnt  = 4;
            menuId  = "fnm_fnc_sub6";
            menuNum = 0;
            menuVal = "fnm_fnc_sub6_2";
            break;
        case 72://72 : BC怨듬룞�대깽��
            mainUrl = "com_ebz_fpm_main";
            siteCd  = "01";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 0;
            rowCnt  = 4;
            menuId  = "fnm_fnc_sub6";
            menuNum = 0;
            menuVal = "fnm_fnc_sub6_3";
            break;
        case 73://73 : �뱀꺼�먮낫湲�
            mainUrl = "com_ebz_fpm_main";
            siteCd  = "01";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 3;
            rowCnt  = 1;
            menuId  = "fnm_fnc_sub6";
            menuNum = 1;
            menuVal = "fnm_fnc_sub6_4";
            break;
        case 74://74 : 移대뱶�대깽��
            mainUrl = "com_ebz_fpm_main";
            siteCd  = "01";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 0;
            rowCnt  = 4;
            menuId  = "fnm_fnc_sub6";
            menuNum = 0;
            menuVal = "fnm_fnc_sub6_1";
            break;
        
        case 75://75 : 湲덉쑖�쒕퉬�� > �ы뀒�� > �쒖옣�뺣낫
            mainUrl = "com_ebz_fsv_main";
            siteCd  = "02";
            menuCd  = "A";
            bbsId   = "RFN051";
            locIdxBySub = 1;
            rowCnt  = 3;
            menuId  = "fsv_fnz_sub1";
            menuNum = 0;
            menuVal = "fsv_fnz_sub1_1";
            break;
        case 76://76 : 湲덉쑖�쒕퉬�� �됰났���댁꽕怨꾩꽱�� �됰났�뚰듃�� �뚯떇 �됰났�뚯떇吏�
            mainUrl = "com_ebz_fsv_main";
            siteCd  = "02";
            menuCd  = "A";
            bbsId   = "NOM011";
            locIdxBySub = 2;
            rowCnt  = 2;
            menuId  = "fsv_fnr_sub4";
            menuNum = 0;
            menuVal = "fsv_fnr_sub4_1";
            break;
        case 77://77 : DGB媛ㅻ윭由�
            mainUrl = "com_ebz_dgi_main";
            siteCd  = "04";
            menuCd  = "A";
            bbsId   = "NOM142";
            locIdxBySub = 3;
            rowCnt  = 1;  
            menuId  = "dgi_fac_sub3";
            menuNum = 0;
            menuVal = "dgi_fac_sub3_3";
            break;
        case 78://78 : �대깽�몃같��
            mainUrl = "com_ebz_hlp_main";
            siteCd  = "01";
            menuCd  = "A";
            bbsId   = "EVE001";
            locIdxBySub = 4;
            rowCnt  = 3;  
            menuId  = "hlp_hns_sub2";
            menuNum = 0;
            menuVal = "hlp_hns_sub2_1";
            break;
        default:
    }
    jObj._BBS_LIST_URL        = EtcBbsListUrl;   //�꾩꽦�ъ씠�� 寃뚯떆�� URL
    jObj._BBS_DETAIL_URL      = EtcBbsDetailUrl; //�꾩꽦�ъ씠�� �곸꽭 URL
    
    jObj._BBS_ID         = bbsId   ;    //寃뚯떆�먯븘�대뵒
    jObj._BBS_SITECD     = siteCd  ;    //寃뚯떆�먯궗�댄듃援щ텇
    jObj._BBS_MENUCD     = menuCd  ;    //寃뚯떆�먮찓�닿뎄遺�
    jObj._BBS_RCOUNT     = rowCnt  ;    //異쒕젰媛�닔
    jObj._BBS_MAIN_ACT   = mainUrl ;    //�몄텧 寃뚯떆�먯쓽 MAIN_URL(dgb.co.kr/?????.act)
    jObj._BBS_MENU_ID    = menuId;
    jObj._BBS_MENU_NUM   = menuNum;
    jObj._BBS_MENU_VAL   = menuVal;

    /* N媛쒖씠�� SUBMAIN BBS �몄텧��  �몄뀡蹂��� �ш갚�� */
    if(locIdxBySub > 0){
        pObj = dataCtrl.getObjData('TEMP_SUBBBS');
        arrJOBj = pObj._TEMP_ARR;
    }

    arrJOBj[locIdxBySub]  = jObj;
    pObj._TEMP_ARR        = arrJOBj;

    dataCtrl.setObjData('TEMP_SUBBBS', JSON.stringify(pObj));
    arrSubBbsKeySet[locIdxBySub] = subBbsKey;

    pObj._BBS_ARR_SUB_KEY = arrSubBbsKeySet;   //submain bbs keyset 
}

//[�꾩꽦]�곗씠�� �쒖뒪�� 由ъ뒪�� 諛붾줈媛�湲�
function goBbsMain(){
    var btn = $(".main_tab_menu li");
    
    if(btn.eq(0).attr("class")=="on"){
        location.href = "/dds_ebz_10101_bord.act";
    }else if(btn.eq(1).attr("class")=="on"){
        location.href = "/dds_ebz_10102_bord.act";
    }
    
}

/*
 * �꾩꽦�ъ씠�� 寃뚯떆�먰샇異� [由ъ뒪��/�곸꽭]
 * */
function goEtcBbsPage(seq , subKey , locIdx){
    var tObj = {};
    tObj = dataCtrl.getObjData('TEMP_SUBBBS');

    /* �쒕툕硫붿씤 濡쒕뱶 �쒖젏�� �좎븘媛� 理쒖쥌媛� �댁쟾 DATA 蹂듭썝 */
    arrJOBj = tObj._TEMP_ARR;
    jObj = arrJOBj[locIdx];
    
    if(seq == 0){
        jObj._BBS_CALL_CN    = "11"    ;    //寃뚯떆�먰샇異쒕궡�� 11:由ъ뒪��  22:�곸꽭
    }else{
        jObj._BBS_CALL_CN    = "22"    ;    //寃뚯떆�먰샇異쒕궡�� 11:由ъ뒪��  22:�곸꽭
        jObj._BBS_WRITSEQ    = seq     ;    //寃뚯떆臾쇰쾲��
    }

    pObj._BBS_CLK_IDX = locIdx;
    arrJOBj[locIdx] = jObj;
    dataCtrl.setObjData('BBS_DATA'        , JSON.stringify(pObj           ));
    dataCtrl.setObjData('BBS_DATA'+ subKey, JSON.stringify(arrJOBj[locIdx]));

    if(seq == 0){
        location.href = "/" + jObj._BBS_LIST_URL + ".act";
    }else{
        location.href = "/" + jObj._BBS_DETAIL_URL + ".act";
    }
}


function goBbsPagePreMainCD(seq,subKey,locIdx,_code){
    var bankUrl = _CodeMgr.getCodeMsg("CODE_URL",_code);
    var tObj = {};
    tObj = dataCtrl.getObjData('TEMP_SUBBBS');
    
    /* �쒕툕硫붿씤 濡쒕뱶 �쒖젏�� �좎븘媛� 理쒖쥌媛� �댁쟾 DATA 蹂듭썝 */
    arrJOBj = tObj._TEMP_ARR;
    jObj = arrJOBj[locIdx];
    
    if(seq == 0){
        jObj._BBS_CALL_CN    = "11"    ;    //寃뚯떆�먰샇異쒕궡�� 11:由ъ뒪��  22:�곸꽭
    }else{
        jObj._BBS_CALL_CN    = "22"    ;    //寃뚯떆�먰샇異쒕궡�� 11:由ъ뒪��  22:�곸꽭
        jObj._BBS_WRITSEQ    = seq     ;    //寃뚯떆臾쇰쾲��
    }

    dataCtrl.delObjData("MENU_LOCATION");
    //locIdx��  setParam �� locIdxBySub �� 媛숈� �レ옄濡� 留욎떠�쇳븿 �ㅼ젣濡� �꾩떆濡� �닿린�� obj�� 諛곗뿴踰덊샇��... -_-
    pObj._BBS_CLK_IDX = locIdx;
    
    arrJOBj[locIdx] = jObj;
    dataCtrl.setObjData('BBS_DATA'        , JSON.stringify(pObj));
    dataCtrl.setObjData('BBS_DATA'+ subKey, JSON.stringify(arrJOBj[locIdx]));
    
    location.href = bankUrl + jObj._BBS_MAIN_ACT + ".act";
}

/*
 * 寃뚯떆�� �몄텧(LIST �몄텧�� seq:0)
 * */
function goBbsPagePreMain(seq,subKey,locIdx){ 
    
    if (subKey == 3 && locIdx == 0){
        subKey = 78;
        locIdx = 4;
    }
    var bankUrl = _CodeMgr.getCodeMsg("CODE_URL","1002");
    var tObj = {};
    tObj = dataCtrl.getObjData('TEMP_SUBBBS');
//  alert(JSON.stringify(tObj));
    /* �쒕툕硫붿씤 濡쒕뱶 �쒖젏�� �좎븘媛� 理쒖쥌媛� �댁쟾 DATA 蹂듭썝 */
    arrJOBj = tObj._TEMP_ARR;
    jObj = arrJOBj[locIdx];
    
    if(seq == 0){
        jObj._BBS_CALL_CN    = "11"    ;    //寃뚯떆�먰샇異쒕궡�� 11:由ъ뒪��  22:�곸꽭
    }else{
        jObj._BBS_CALL_CN    = "22"    ;    //寃뚯떆�먰샇異쒕궡�� 11:由ъ뒪��  22:�곸꽭
        jObj._BBS_WRITSEQ    = seq     ;    //寃뚯떆臾쇰쾲��
    }
//  alert(JSON.stringify(jObj));
    dataCtrl.delObjData("MENU_LOCATION");
    //locIdx��  setParam �� locIdxBySub �� 媛숈� �レ옄濡� 留욎떠�쇳븿 �ㅼ젣濡� �꾩떆濡� �닿린�� obj�� 諛곗뿴踰덊샇��... -_-
    pObj._BBS_CLK_IDX = locIdx;
    arrJOBj[locIdx] = jObj;
    
    dataCtrl.setObjData('BBS_DATA'        , JSON.stringify(pObj));
    dataCtrl.setObjData('BBS_DATA'+ subKey, JSON.stringify(arrJOBj[locIdx]));
    
    location.href = bankUrl + jObj._BBS_MAIN_ACT + ".act";
}

function articleShow(id, el){
    $(el).parent().parent().find("li").removeClass("on");
    $(el).parent().addClass("on");
    $("article").hide();
    $("#" + id).show();
}

/**************************************************************************************/
/** 硫붿씤(�ㅼ젣 寃뚯떆�먯씠 �쇱퀜吏�) 諛고룷 �⑥닔�곸뿭  (蹂듭궗�섏뿬 硫붿씤.js onload�� 湲곕룞)       **/
/**************************************************************************************/
function callBbsPage(){
    
    var pObj = {};
    var arrTemp = new Array();
    var subBbsKeyForMain = 0;
    pObj = dataCtrl.getObjData('BBS_DATA');
    
    if(pObj != null){
        arrTemp = pObj._BBS_ARR_SUB_KEY;
        subBbsKeyForMain = arrTemp[pObj._BBS_CLK_IDX];
    
        var jObj = {};
        jObj = dataCtrl.getObjData('BBS_DATA' + subBbsKeyForMain);
        
        if(jObj._BBS_CALL_CN != undefined && jObj._BBS_CALL_CN != null && jObj._BBS_CALL_CN != ""){
            if(jObj._BBS_CALL_CN == "11"){//由ъ뒪�명샇異�
                
                $("#ifr").attr("src","bbs_ebz_10010_bord.act");
                
            }else if(jObj._BBS_CALL_CN == "22"){//�곸꽭�몄텧
                
                $("#ifr").attr("src","bbs_ebz_10020_bord.act");
                
            }
        }
    }
}