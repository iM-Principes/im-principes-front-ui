/**
 * <pre>
 * DGBHP PROJECT
 * @COPYRIGHT (c) 2009-2012 WebCash, Inc. All Right Reserved.
 * @File Name      : dgb_ebz_main.js
 * @File path        : DGBHP_PT_STATIC/web/js/hmp/mnv
 * @author           : 源�寃쎌닔 
 * @Description    : 硫붿씤�섏씠吏�
 * @History          : 20130212084537, 源�寃쎌닔 
 * </pre>
 **/
var _VIEW_ID = "dgb_ebz_main";
new (Jex.extend({
    onload:function() {
        _this = this;

        noticeHtml = getSubBbsHtml(1);    // �덉냼��
        eventHtml  = getSubBbsHtml(3);    // �대깽��

        $("#list_newBbs").html(noticeHtml);
        $("#list_event" ).html(eventHtml);

        // 濡쒓렇�� 泥댄겕
        getSessionInfoHomeMain("dgb");
    }, event:function() {
        // �곷떒 硫붾돱 START  -------------------------
        // 
        this.addEvent('#btn_quickSearch', 'click', function(e) {
            fn_quickSearchPopup();
        });
        // �곷떒 硫붾돱 END    -------------------------
    }
}))();

// �쒓뎅��
function selectKRLanguage(){
    dataCtrl.delObjData("MENU_LOCATION");
    location.href = getUrl("dgb");
}

// �곷Ц
function selectENLanguage(){
    dataCtrl.delObjData("MENU_LOCATION");
    var jexAjax = jex.createAjaxUtil("com_ebz_logout");
    jexAjax.execute(function(dat) {
        var objLk = {'HP_BK':'BK','LOCATION_PAGE': getUrl("dgb_en")};
        dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));   
        location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");  //https://banking.dgb.co.kr/index.jsp         
    });
}

// 以묎뎅��
function selectCNLanguage(){
    dataCtrl.delObjData("MENU_LOCATION");
    var jexAjax = jex.createAjaxUtil("com_ebz_logout");
    jexAjax.execute(function(dat) {
        var objLk = {'HP_BK':'BK','LOCATION_PAGE': getUrl("dgb_cn")};
        dataCtrl.setObjData("BK_LINK",JSON.stringify(objLk));   
        location.href = _CodeMgr.getCodeMsg("CODE_URL", "1090");  //https://banking.dgb.co.kr/index.jsp         
    });
}

// 濡쒓렇�꾩썐
function logOut(){
    var jexAjax = jex.createAjaxUtil("com_ebz_logout");
    jexAjax.execute(function(dat) {
    });
}

/**
 * �덊럹�댁� 濡쒓렇�� 泥댄겕
 * @param sub
 */
function getSessionInfoHomeMain(sub){
    _PREV_LOGIN_PAGE = getUrl(sub);
    
    var obj = new Object();
    obj = getLoginSessionInfo();
    
    if( obj.LOGIN_DVCD == "0" )
    {
        $(".login-after" ).hide();
        $(".login-before").show();
    }
    else if( obj.LOGIN_DVCD == "1" )
    {
        $(".login-before").hide();
        $("#bzman_nm").html(obj.CUST_NM);
        $(".login-after" ).show();
        sessionCountdown("topSessionCount",dbSessionTime,0, 'N');
    }
    else if( obj.LOGIN_DVCD == "2" )
    {
        $(".login-before").hide();
        $("#bzman_nm").html(obj.CUST_NM);
        $(".login-after" ).show();
        sessionCountdown("topSessionCount",dbSessionTime,0, 'N');
    }
    else
    {
        $(".login-after" ).hide();
        $(".login-before").show();
    }
}


