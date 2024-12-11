// active-x load script
var g_InstallFile = "/Markany/bin/ebz_MAWS_DaeguBankRex_Setup.exe";
var g_TextInstall = "<span style=\'font-family:\'굴림\';font-size:13px;\'>고객님의 PC에 화면 보안 프로그램이 설치되어 있지 않습니다." +
		            "\n화면 보안 프로그램이란, 가상키패드가 활성화된 상태에서 PC화면이 캡쳐되어 유출되는 것을 차단하는 보안강화 프로그램입니다." +
		            "\n설치를 원하시면 <span class=\'point_orange\'>[화면보호프로그램 설치]</span> 버튼을 누르시고," +
		            "\n원하지 않으시면 <span class=\'point_orange\'>[확인]</span> 버튼을 누르시기 바랍니다.</span>";
var g_TextInstallEP = "위변조 방지 프로그램이 설치되어 있지 않습니다. \n파일 저장후 저장한 파일을 실행해 프로그램을 설치해 주세요.";

var MarkanySignature = "MARKANYWEBDRM";
var URLSchema				= "mawebdrmsvc";
var URLSchemaParam	= "";
var absolutePath  = "/Markany/";  // 절대경로 변경 요망
var InstallPage 			= absolutePath + "MaInstallPage.html";
var InstallFile 			= absolutePath + "bin/ebz_MAWS_DaeguBankRex_Setup.exe";
var ErrorPage				= absolutePath + "MaErrorPage.html";
var iVersion						= 25115;
var iPort							= 19891;
var iPort_ssl					= 29891;
var bIsConnect			= false;
var match					= navigator.userAgent.match(/(CrOS\ \w+|Windows\ NT|Mac\ OS\ X|Linux)\ ([\d\._]+)?/);
var os							= (match || [])[1] || "Unknown";
var osVersion				= (match || [])[2] || "Unknown";
//var bIsUnload				= false;
var bNeedInstall			= false;
var szCaptionName			= "";

var bMaDbgVal				= true;

var szAddCaptionName	= "_WebDRM";	// WebDRM 적용을 위해 Title 문구 뒤에 특정 문구를 적용해야 합니다. 원하는 문구를 셋팅해 주세요.
var bIsLoad						= false;
var bIsExceptPage			= false;
var bIsExistSep				= false;

var bUseRandomStr		= true;

// bIsAutoLoad : js가 해당 html에 include될 때 자동으로 WebDRM을 로드 및 언로드 시키려면 bIsAutoLoad 를 true로 셋팅하며
// 수동으로 로드하고싶으면 bIsAutoLoad값을 false로 한 뒤, 수동으로 상황에 맞게 MaLoad(), MaUnLoad()를 호출하도록 한다. (또는 MaWebDRMStart() 사용)
var bIsAutoLoad				= true;
//var bIsAutoLoad				= false;

var g_ierrCnt 				= 0;
var g_bIsSendInstallPage 	= false;
var g_iMaxErrCnt			= 5;

var g_ICPOn					= 0;			// ICP On : 1 / Off : 0
var g_ICPType				= 2;
var g_szICPMsg				= "MarkAny";
var g_iICPTextPercent		= 11;
var g_iICPOpacity			= 20;

// XHR  var
var MarkanySignatureX	= "MARKANYWEBDRMX";
var URLSchemaX				= "mawebdrmx";
var iPort_X						= 15397;
var xhrURL						= "http://127.0.0.1:" + iPort_X;
var xhr;

var masocket;
function ePageSAFERInstall()
{
	if(navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident")>=0) 	
	{
		if((typeof(MAWS_DaeguBankRex) == "object") && (MAWS_DaeguBankRex.object != null))	
		{
		}
		else
		{
			var newDiv2 = document.createElement("div");
			newDiv2.innerHTML = "<OBJECT ID='MAWS_DaeguBankRex' width='0' height='0' style='display:none;' CLASSID='CLSID:B9CBBFC4-4427-419A-8F98-D5301D23B271' CODEBASE='#version=2,5,0,3'> </OBJECT>";	
			document.body.appendChild(newDiv2);		
		}
		
		if((typeof(MAWS_DaeguBankRex) == "object") && (MAWS_DaeguBankRex.object != null))
		{	
		}
		else
		{	
			checkSetupErr(1, g_TextInstallEP);
		}
	}
	else if(navigator.userAgent.indexOf("Opera") >= 0 || navigator.userAgent.indexOf("Firefox") >= 0 || navigator.userAgent.indexOf("Chrome") >= 0 || navigator.userAgent.indexOf("Safari") >= 0)
	{
		navigator.plugins.refresh(false);
		if(navigator.mimeTypes["application/markany_fps_plugin_baegubankrex;version=1,0,0,1"])
		{
		}
		else
		{
			checkSetupErr(2, g_TextInstallEP);
		}
	}
}

//프로그램설치 레이어창
function checkSetupErr(type, msg){
	if(/win16|win32|win64/.test(navigator.platform.toLowerCase())){
		try{
			if(getCookieVar("isOpen") == false && !/whale/.test(navigator.userAgent.toLowerCase())){
				msg += "\n\n<span class='btn large action'><button type='button' onClick='javascript:downLoadSetup(" +type+ ");' title='화면보호프로그램 설치'>화면보호프로그램 설치</button></span>";
	
				if(/banking.dgb.co.kr/.test(top.location.href)){
					jex.printUserInfo("화면보호프로그램 설치", msg);
				}else{
					top.jex.printUserInfo("화면보호프로그램 설치", msg);
				}
				
				window.setTimeout(function(){ link_nFilterClose(); }, 300);
			}
		
			setMarkAny();
		}catch(e){
		}
	}
}

//프로그램설치 파일 다운로드
function downLoadSetup(type){
	try{
		if(type==1){
			top.document.location.href=g_InstallFile;
		}else if(type==2){
			document.location = InstallFile;
		}else if(type==3){
			top.location.href=g_InstallFile;
		}

		if(/banking.dgb.co.kr/.test(top.location.href)){
			jex.getRootDom().msgCloseErrorLayer();
		}else{
			top.jex.getRootDom().msgCloseErrorLayer();
		}
	}catch(e){
	}
}

function link_nFilterClose(){	
	try{
		nFilterMaLoad = false;
		nFilterClose();
		nFilterMaLoad = false;
	}catch(e){
	}
}

function WebDRMInstallCheck()
{	
	if((typeof(MarkanyWebSAFER) == "object") && (MarkanyWebSAFER.object != null))	
	{
	}
	else
	{
		var newDiv3 = document.createElement("div");
		newDiv3.innerHTML = "<OBJECT ID='MarkanyWebSAFER' width='0' height='0' style='display:none;' CLASSID='CLSID:821D5E41-892C-4CED-A4EB-C10CF9D19524' CODEBASE='#version=5,1,10,8'> </OBJECT>";	
		document.body.appendChild(newDiv3);		
	}
	
	if((typeof(MarkanyWebSAFER) == "object") && (MarkanyWebSAFER.object != null))	
	{		
		try{
			setMarkAny();
		} catch(e) {}
	}
	else
	{	
		g_bIsSendInstallPage = true;
		checkSetupErr(1, g_TextInstall);
	}
}

function load_markany_module()
{	
	if((typeof(MarkanyWebSAFER) == "object") && (MarkanyWebSAFER.object != null))	
	{
	}
	else
	{
		var newDiv = document.createElement("div");
		newDiv.innerHTML = "<OBJECT ID='MarkanyWebSAFER' width='0' height='0' style='display:none;' CLASSID='CLSID:821D5E41-892C-4CED-A4EB-C10CF9D19524' CODEBASE='#version=5,1,10,8'> </OBJECT>";	
		document.body.appendChild(newDiv);		
	}
	
	if((typeof(MarkanyWebSAFER) == "object") && (MarkanyWebSAFER.object != null))	
	{		
			// 저장, 복사, 인쇄, 소스보기, 영역캡쳐방지, 전체화면캡쳐방지, 원격제어,  , 가상PC제어, DRM전체적용
			var Policy = "GCZaqCuiq69eAtWSxO/rS5oeRNE3EyJEONNa+5HyOdg=";	//Y^Y^Y^Y^N^Y^Y^N^Y^Y^			전체
			//var Policy = "0LWXHc55p0DITt41RHRYs6yYg/ms4CC6gBm9gxIOTz8=";	//Y^Y^Y^Y^Y^N^Y^N^Y^Y^			부분
			document.getElementById('MarkanyWebSAFER').MaSetPolicy(Policy); 
			
			var LicenseInfo = "z7FDbDBxe8EmRd6HCMaoQ2Oi5zPsCwA/B2sfnE04B3EwMdZCGCfQ2frNLkczXsES";	 
			document.getElementById('MarkanyWebSAFER').MaInitModule(LicenseInfo);			
	}
	else
	{	
		checkSetupErr(1, g_TextInstall);
	}
}

function unload_markany_module()
{	
	if((typeof(MarkanyWebSAFER) == "object") && (MarkanyWebSAFER.object != null))	
	{		
		document.getElementById('MarkanyWebSAFER').MaUnload();
	}
}

// npplugin load javascript
function SudongInstall_OK()
{		// 함수명 바꾸면 안됨. 플러그인에서 호출 하게 돼 있음.
	checkSetupErr(3, g_TextInstall);
}

function goURL( nFlag ){
	checkSetupErr(3, g_TextInstall);
}

function load_markany_plugin()
{
	navigator.plugins.refresh(false);
	if(!navigator.mimeTypes["application/markany_multi_websafer_plugin_std_2509"]){		
		SudongInstall_OK();
	}
	
	var newDiv = document.createElement("div");
	newDiv.innerHTML = "<EMBED id='winwebsafer' type='application/markany_multi_websafer_plugin_std' width='1' height='1'></EMBED>";
	document.body.appendChild(newDiv);
	document.onselectstart = nocopy;
	document.oncontextmenu = nocopy;
	document.ondragstart = nocopy;
	function nocopy(){return false;}
}

// NonActiveX 관련
function goURL(){	
	top.location.href= InstallPage;
}

function getWebSocketProtocol()
{
	if(window.location.protocol === 'https:') 
		return "wss://127.0.0.1:" + iPort_ssl;

	if( get_browser() == 'MSIE' && get_browser_version() < 10 )
		return "ws://127.0.0.1:" + iPort_X;
	else
		return "ws://127.0.0.1:" + iPort;
}

function getURLSchemaParam()
{
	if(window.location.protocol === 'https:') 
		return "wss";

	return "ws";
}

function getInstallPage()
{ 
	return InstallPage;
}

function randomString()
{
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 3;
	var randomstring = '';
	for (var i=0; i<string_length; i++)
	{
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	//document.randform.randomfield.value = randomstring;
	return randomstring;
}

function setMaPolicy()
{
	var Policy;

	//////////////////////////////////////////////////////////////////////////////////////////////////
	// ImageSAFER Policy Start

	// 캡쳐 On / Off
	// 캡쳐 막기 사용  : 1, 캡쳐 허용 : 0
	var bImgsfOn				= 1;
	
	var MA_VIRTUALBOX	= 0x00000001;
	var MA_VMWARE			= 0x00000002;
	var MA_VIRTUALPC		= 0x00000004;
	var MA_QEMU				= 0x00000008;
	var MA_PARALLELS		= 0x00000010;
	var MA_CITRIX			= 0x00000020;
	var MA_VMALLOWALL	= MA_VIRTUALBOX | MA_VMWARE | MA_VIRTUALPC | MA_QEMU | MA_PARALLELS | MA_CITRIX;		// 모든 가상머신을 허용
	var MA_DEFAULT			= 0xFFFFFFFF;		// 모든 가상머신을 허용 안함
	
	// 가상머신 예외
	// 여러개의 가상머신을 예외시키고자 하는 경우 비트연산자 | 를 사용해 추가시킨다.
	// ex) exceptVm = MA_CITRIX | MA_PARALLELS;
	var exceptVm = MA_VMALLOWALL;
	
	// 전체, 부분가리기
	// 전체가리기 : 1, 부분가리기 : 0
	var bCoverOpt = 1;
	
	// 서브클래싱 유무
	// 서브클래싱 사용 : 1, 사용안함 : 0   * 디폴트로 true를 사용. 왠만하면 건들지 말자
	var bSubclassing	=	1;
	
	// 예외 프로세스
	// 예외프로세스를 여러개 넘기고자 할경우 구분자 | 를 넣는다 ( | 사용시 띄어쓰기 금지! )
	// ex) exceptProc = "rc40app.exe|snippingtool.exe";
	var exceptProc = "";
	
	// ImageSAFER Policy End
	//////////////////////////////////////////////////////////////////////////////////////////////////
	
	
	//////////////////////////////////////////////////////////////////////////////////////////////////
	// Function Policy Start
	
	var fPolicy = 0X00;
	
	// 저장 단축키 ( IE는 메뉴까지 제어 가능 )
	// 막음 :0, 뚫음 : 1
	var MA_EXCEPT_SAVE		= 0;
	
	// 프린트 단축키 ( IE는 메뉴까지 제어 가능 )
	// 막음 :0, 뚫음 : 1
	var MA_EXCEPT_PRINT	= 0;
	
	// 개발자도구 단축키 ( IE는 메뉴까지 제어 가능 )
	// 막음 :0, 뚫음 : 1
	var MA_EXCEPT_DEV		= 0;
	
	// 복사 단축키 ( IE는 메뉴까지 제어 가능 )
	// 막음 :0, 뚫음 : 1
	var MA_EXCEPT_COPY	= 0;
	 
	// 이부분은 건들지 말것
	if( MA_EXCEPT_SAVE === 1 )		fPolicy = fPolicy | 0X01;
	if( MA_EXCEPT_PRINT === 1 )		fPolicy = fPolicy | 0X02;
	if( MA_EXCEPT_DEV === 1 )		fPolicy = fPolicy | 0X04;
	if( MA_EXCEPT_COPY === 1 )		fPolicy = fPolicy | 0X08;
	
	// Function Policy End
	//////////////////////////////////////////////////////////////////////////////////////////////////
	
	//////////////////////////////////////////////////////////////////////////////////////////////////
	// ICP Policy Start
	var ICPOn					= g_ICPOn;						// ICP On : 1 / Off : 0	
	var ICPMessage			= MaBase64.encode(g_szICPMsg);		// ICP Print String
	var ICPType				= g_ICPType;
	var ICPOpacity			= g_iICPOpacity; 
	var ICPTextPercent		= g_iICPTextPercent;
	var ICPPolicy = "\"icpopt\":{\"on\":" + ICPOn +",\"message\":\""+ ICPMessage +"\",\"type\":" + ICPType +",\"opacity\":"+ ICPOpacity +",\"textpercent\":" + ICPTextPercent +"}";
	// ICP Policy End
	//////////////////////////////////////////////////////////////////////////////////////////////////
	
	Policy = "\"fpolicy\":\""+ fPolicy.toString(16) + "\",\"imgsfopt\":{\"imgsfon\":"  + bImgsfOn + ",\"exceptvm\":"  + exceptVm + ",\"coveropt\":" + bCoverOpt + ",\"dosubclass\":" + bSubclassing + ",\"exceptprocess\":\"" + exceptProc + "\"}," + ICPPolicy;
	
	//MaDBGOUT(Policy);
	return Policy;
}

// getWebDRMPacket() param 1 : load, 0 : unload
function getWebDRMPacket(i)
{
	var browser = get_browser();
	var caption = window.parent.document.title;
	
	var varBrowser;
/*	if( browser == 'Firefox' )				{	varBrowser = "F";		caption = caption + " - Mozilla Firefox"; }
	else if( browser == "Chrome" )	{	varBrowser = "C";		caption = caption + " - Chrome"; }
	else if( browser == "Opera" )		{	varBrowser = "O";	caption = caption + " - Opera"; }
	else if( browser == "EDGE" )		{	varBrowser = "E"; }
	else if( browser == "MSIE" )
	{
		varBrowser = "IE";
		if( get_browser_version() == 11 )		caption = caption + " - Internet Explorer"; 
		else														caption = caption + " - Windows Internet Explorer"; 
	}*/ 
	/* 2021.10.27 추가 markany 크롬 오류 수정 */
	if( browser == 'Firefox' )					varBrowser = "F"; 
	else if( browser == "Chrome" )				varBrowser = "C"; 
	else if( browser == "Opera" )				varBrowser = "O"; 
	else if( browser == "EDGE" )				varBrowser = "E"; 
	else if( browser == "MSIE" )				varBrowser = "IE";
	else if( browser == "Safari" )				varBrowser = "S";
	else if( browser == "CEdge" )				varBrowser = "CE";
	
	// add x64
	else if( browser == "MSIEX64" )				varBrowser = "IE64"; 
	else if( browser == "ChromeX64" )			varBrowser = "C64"; 
	else if( browser == "FirefoxX64" )			varBrowser = "F64"; 
	else if( browser == "OperaX64" )			varBrowser = "O64"; 
	else if( browser == "CEdgeX64" )			varBrowser = "CE64"; 
	
	MaDBGOUT("browser = " + browser);
	MaDBGOUT("varBrowser = " + varBrowser);
	MaDBGOUT("caption = " + caption);
	
	caption = MaBase64.encode(caption);
	if( browser == 'MSIE' )
	{
		if( get_browser_version() == 7 || get_browser_version() == 8 )
			var charset = document.charset;
		else
			var charset = document.characterSet;
	}
	else
		var charset = document.characterSet;
	 
	var url = location.host + "/" + location.search;
	
	if( url.length > 80 )
	{
		var tmpUrl = url;
		url = "";
		 url = tmpUrl.substring(0, 80);
	}
	
	url = MaBase64.encode(url);
	
	if( i === 1 )
		var packet = "[{\"uid\":\"uid\",\"opcode\":\"sWebdrmLoad\",\"browserInfo\":\"" + varBrowser + "\",\"url\":\"" + url + "\",\"caption\":\"" + caption +"\",\"charset\":\"" + charset + "\"," + setMaPolicy() + "}][WEBDRMEOF]";

	else if( i === 0 )
		var packet = "[{\"uid\":\"uid\",\"opcode\":\"sWebdrmUnload\",\"browserInfo\":\"" + varBrowser + "\",\"url\":\"" + url + "\",\"caption\":\"" + caption +"\",\"charset\":\"" + charset + "\"," + setMaPolicy() + "}][WEBDRMEOF]";

	//return Base64.encode(packet);
	return packet;
}

function get_browser()
{
    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	
	if(ua.indexOf("Edge") != -1)
		return 'EDGE';
	
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'MSIE';
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem != null) {
            //return 'Opera';
			// WebDRM의 경우 구형 오페라와 신형 오페라에 따라 인젝션하는 dll이 다르기 때문에 구분
			return 'Opera';
        }
    }
	if (M[1] === 'Chrome') {
		tem = ua.match('x64');
        if (tem != null) {
			return 'ChromeX64';	//Chrome 64비트 모듈
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return M[0];
}
function get_browser_version()
{
    var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return tem[1];
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR\/(\d+)/);
        if (tem != null) {
            return tem[1];
        }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }
    return M[1];
}

function IsXHR()
{
	if( get_browser() == 'MSIE' && get_browser_version() < 10 )
		return true;
	else
		return false;
}

function LaunchAppImplement(src)
{
	var topWindow = getTopWindow();
	try
	{
		try
		{
			var ifrm = topWindow.document.createElement("iframe");
			ifrm.src = src;
			ifrm.style.display = "none";
			ifrm.setAttribute("id", "maiFrame");
			topWindow.document.body.appendChild(ifrm);    	
		}
		catch(err)
		{
			var maIframe = '<iframe id="maiFrame" src=' +src+ '></iframe>';
			topWindow.document.writeln(maIframe);
			document.getElementById("maiFrame").style.display = "none";
		}
	}
	catch(err)
	{
		
	}
	

}

function checkProduct(str)
{
    var iCheck = str.lastIndexOf(MarkanySignature);
    if (iCheck >= 0)
        return true;
    return false;
}
function checkVersion(str)
{
		var iCheck = str.lastIndexOf(MarkanySignature);
		if (iCheck >= 0)
		{
			var arrValue = str.split(';');
			if (arrValue.length >= 1) {
				return parseInt(arrValue[1]) - iVersion;
			}
			else
				return -1;
		}
		else
			return 100;
}
function checkInjectSuccess(str)
{
	var iCheck = str.lastIndexOf('injectSuccess');
	if (iCheck >= 0)
		return true;
	return false;
}
function checkInjectFail(str)
{
	var iCheck = str.lastIndexOf('injectFail');
	if (iCheck >= 0)
		return true;
	return false;
}

function checkSocket(appGUID, param, bFlag)
{
	MaDBGOUT("checkSocket g_bIsSendInstallPage == " + g_bIsSendInstallPage);
    var validVer = false;
    var validProduct = false;
    var bProductFirst = false;
	var bInformFirst = false;
	
	try
	{
		masocket = new WebSocket( getWebSocketProtocol() );
	}
	catch(err)
    {
		//return; // 아이프레임방식에서 모든 페이지에 공통으로 스크립트가 로드될 경우 return 처리시켜야한다.
		//alert("보안상 동시에 한 브라우저 내에서 같은 도메인을 접속할 수 없습니다.");
		//parent.document.location = ErrorPage;
		MaDBGOUT("checkSocket err == " + err);
    }
	MaDBGOUT(masocket);
	if(g_bIsSendInstallPage === false)
	{
		setTimeout(MaReConnection, 300);
	}
	
	try
	{
		masocket.addEventListener("open", function(event) {
			bIsConnect = true;
			try{
				setMarkAny();
			} catch(e) {}
			
			MaDBGOUT("onopen bProductFirst == " + bProductFirst);
			if( bProductFirst== false )
			{
				var sendMsg = "[{\"uid\":\"uid\",\"opcode\":\"gversion\"}][WEBDRMEOF]";
				masocket.send(sendMsg);
			}
		//masocket.send(Base64.encode(sendMsg));
    });
	}
	catch(err)
	{
		MaDBGOUT("masocket open catch !!!");
	}
	    
    // Display messages received from the server
    masocket.addEventListener("message", function(event) {
		if( bProductFirst== false )
		{
			validVer = checkVersion(event.data);
			MaDBGOUT("validVer == " + validVer);
			bProductFirst = true;
			bIsConnect = true;
			try{
				setMarkAny();
			} catch(e) {}
		}
		MaDBGOUT("======================================================");
		MaDBGOUT(event.data);
		MaDBGOUT("======================================================");
		
        //if (validProduct == true)
		//{
            if (validVer >= 0 && validVer !== 100) 
			{
				if( bInformFirst == false )
				{
					var packet = getWebDRMPacket(1);
					masocket.send( packet );
					bInformFirst = true;
				}
				var bInjectFlag = false;
				bInjectFlag = checkInjectSuccess(event.data);
				if( bFlag == 1 && bInjectFlag == true)
				{
					bIsConnect = true;
					try{
						setMarkAny();
					} catch(e) {}
				}
            }
            else if (validVer < 0)
			{                
				checkSetupErr(2, g_TextInstall);
				bNeedInstall = true;
				ClosePopup();
			}
			else if(validVer === 100)
			{	
				if( bInformFirst == false )
				{
					var packet = getWebDRMPacket(1);
					masocket.send( packet );
					bInformFirst = true;
				}
				var bInjectFlag = false;
				bInjectFlag = checkInjectSuccess(event.data);
				MaDBGOUT("@@@@@@@@@@@");
				MaDBGOUT(bInjectFlag);
				MaDBGOUT(bFlag);
				MaDBGOUT("@@@@@@@@@@@");
				if( bFlag == 1 && bInjectFlag == true)
				{			
					bIsConnect = true;
					try{
						setMarkAny();
					} catch(e) {}
				}
			}
    });

    // Display any errors that occur
    masocket.addEventListener("error", function(event) {
		MaDBGOUT("======================================================");
		MaDBGOUT("error");
		MaDBGOUT("======================================================");
		sendInstallPage();
		//document.location = ErrorPage;
    }); 
    masocket.addEventListener("close", function(event) {
		MaDBGOUT("======================================================");
		MaDBGOUT("close");
		MaDBGOUT("======================================================");
		// Def. Close Code 
		// 1006 : agent를 강제종료 했을 경우 (Server 의 소켓이 닫힐 경우)
		// 1001 : 보호대상 페이지를 벗어날 경우 또는 보호대상 페이지에서 다른 보호대상 페이지로 접속할 경우 (Client 의 소켓이 닫힐 경우) - firefox 에서만 발생
		// https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent 참고
		MaDBGOUT(event.code);
		if( event.code == 1006 )
		{
			if( bIsConnect === true )
				parent.document.location = ErrorPage;
			
			g_ierrCnt++;
			MaDBGOUT("g_ierrCnt : " + g_ierrCnt);
			if( g_ierrCnt == g_iMaxErrCnt )
			{				
				g_ierrCnt = 0;
				sendInstallPage();
			}	
		}
		// WebDRM Agent를 강제종료 시켰을 경우 에러 페이지로 강제 전환시킨다. ( Code 1006 )
		if( event.code != 1001 )
		{
			//var url = document.location.href;
			//document.location = getErrorPage( url );
		}
    });
}

function SendXHRMetaPacket()
{
	MaDBGOUT("SendXHRMetaPacket() Called !");
	var packet = getWebDRMPacket(1);
	var meta = "mameta=" + packet;

	xhr.open("POST",xhrURL,true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8"); 
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){				
			if( xhr.responseText == 'injectSuccess' )
			{				
				bIsConnect = true;
				try{
					setMarkAny();
				} catch(e) {}
			}
			else
				document.location = getInstallPage();
		}
		else 
		{

		}
	}
	xhr.send(meta);
}

function IsOpeningSocket(appGUID, param)
{
	if( IsXHR() === true )
	{
		var ver = MarkanySignature + "#" + iVersion;
		if( navigator.userAgent.indexOf(MarkanySignature) != -1 )
		{
			var str = navigator.userAgent;
			var arr = str.split('MARKANYWEBDRM#');

			if( arr[1].substring(0, 5) >= iVersion )
			{
				if( get_browser_version() > 9 )			xhr = new XMLHttpRequest();
				else														xhr = new ActiveXObject("Microsoft.XMLHTTP");
				SendXHRMetaPacket();
			}
			else
			{
				sendInstallPage();
			}
		}
		else
		{
			sendInstallPage();
		}
	}
	else
	{
		setTimeout("sendInstallPage()", 25000);
		checkSocket(URLSchema, URLSchemaParam, 0);
	}
}

function waitForSocketConnection(masocket, callback)
{
    setTimeout(
        function () {
            if (masocket.readyState === 1)
			{
                MaDBGOUT("Connection is made");
				bIsConnect = true;
                if(callback != null){
                    callback();
                }
                return;
            }
			else
			{
                MaDBGOUT("wait for connection...");
				//nWaitCnt++;
				//if( nWaitCnt == 10 )
				//	OpenPopup();
                waitForSocketConnection(masocket, callback);
            }
        }, 3); // wait 3 milisecond for the connection...
}
function sendMessage()
{
	if( IsXHR() == true )
	{
		
	}
	else
	{
		//masocket = new WebSocket( getWebSocketProtocol() );
		MaDBGOUT(getWebSocketProtocol());
		// Wait until the state of the socket is not ready and send the message when it is...
		waitForSocketConnection(masocket, function(){
			MaDBGOUT("connection!!!");
			//masocket.close();
			checkSocket(URLSchema, URLSchemaParam, 1);
	   });
	}
}


/**
 * 	20150904_hcchoi\n
 * 	프레임 형식으로 인베딩되어 webDRM이 동작했을 경우\n
 *  최상위 윈도우에 화면가리기 <div>를 생성하기 위해\n
 *  루프를 돌면 윈도우와 상위 윈도우를 비교하여\n
 *  최상위 윈도우를 찾아 리턴해줍니다.
 */
function getTopWindow(){
	var topWindow = window.self;
	
	for( ; ; ){
		if( topWindow.top == topWindow ){
			break;
		}
		topWindow = topWindow.top;
	}
	return topWindow;
}

/** 	
 *	function			OpenPopup()<br>
 * 	Writer / Date		hcchoi / 20150806<br>
 * 	
 * 	iFream여부를 체크 후 상위 windows객체에 화면가리기 protectedScreen div를 생성.<br>
 * 	maSetCss()를 호출하여 div에 css적용
 */
function OpenPopup()
{	 
	setTimeout("sendInstallPage()", 3000);
	sendMessage();
}

/** 	
 *	function			maSetCss()<br>
 * 	Writer / Date		hcchoi / 20150806<br>
 * 	
 * 	넘겨받은 화면가리기 div 및 하위 영역에 css적용 함수
 */
function maSetCss(maProtectedScreen, maMentSection, maProgressBar)
{
	maProtectedScreen.style.position = "absolute";
	maProtectedScreen.style.width = "100%";
	maProtectedScreen.style.height = "100%";
	maProtectedScreen.style.border = "0";
	maProtectedScreen.style.top = "0";
	maProtectedScreen.style.left = "0";
	maProtectedScreen.style.background = "#fff no-repeat 96% 96%";
 	
 	maMentSection.style.width = "500px";
	maMentSection.style.margin = "250px auto 0 auto";
	maMentSection.style.padding = "20px";
	maMentSection.style.border = "7px outset rgb(75, 151, 215)";
	maMentSection.style.borderRadius = "20px";
 	maMentSection.style.fontSize = "12px"; 
 	maMentSection.style.background = "#fff";
 	 	
 	maProgressBar.style.textAlign = "center";
 	maProgressBar.style.margin = "20px auto 10px auto";
 	maProgressBar.style.display = "block";
}

/** 	
 *	function			ClosePopup()<br>
 * 	Writer / Date		hcchoi / 20150806<br>
 * 	
 * 	정상적으로 NonActive-X WebDRM이 호출될 경우 화면가리기 div를 숨기는 함수
 */
function ClosePopup()
{	
}
var g_iReconnection = 0;

function MaReConnection()
{
	g_iReconnection++;
	MaDBGOUT("MaReConnection() Called! bIsConnect == " + bIsConnect + ", g_iReconnection : " + g_iReconnection);
	if( g_iReconnection == 3 )
	{				
		g_iReconnection = 0;
		sendInstallPage();
	}	
	
	if( bIsConnect === false )
   {
		if( g_ierrCnt <= g_iMaxErrCnt )
		{
			URLSchemaParam = getURLSchemaParam();
			checkSocket(URLSchema, URLSchemaParam, 0);
		}	
   }
}

function sendInstallPage()
{
	MaDBGOUT("sendInstallPage() bIsConnect == " + bIsConnect + ", g_bIsSendInstallPage : " + g_bIsSendInstallPage);
	if( bIsConnect === false && g_bIsSendInstallPage === false)
	{
		bNeedInstall = true;
		g_bIsSendInstallPage = true;
		bIsLoad = false;
		checkSetupErr(2, g_TextInstall);
		ClosePopup();
	}
}

var MaBase64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = MaBase64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		output = MaBase64._utf8_decode(output);
 
		return output;
 
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 }

 function MaVarInit()
 {
	URLSchemaParam		= "";
	bNeedInstall		= false;
 }
 
 function MaUnload()
 {
	 try{
		if(getCookieVar("isOpen") == true || /whale/.test(navigator.userAgent.toLowerCase())){
			return;
		}		
	}catch(e){
	}

	if( get_browser() !== "MSIE" )
	{
		// --------------------------------------------------------------
		// WebSocket 가능 여부 체크
		// --------------------------------------------------------------
		var bSupportWS = true;
		
		if (get_browser() === 'Chrome' && get_browser_version() < 39)
			bSupportWS = false;
		
		if (get_browser() === 'Firefox' && get_browser_version() < 45) 
			bSupportWS = false;
		
		if (get_browser() === 'Safari' && get_browser_version() < 7) 
			bSupportWS = false;
		
		if (get_browser() === 'Opera' && get_browser_version() < 15) 
			bSupportWS = false;
		
		if( bSupportWS === true )
		{
			if( bNeedInstall === true )
			{
				MaVarInit();
				bIsLoad = false;
				return;
			}
			maiFrameDel();
			
			try
			{
				var unloadPacket = getWebDRMPacket(0);
				masocket.send( unloadPacket );
				masocket.close();
			}
			catch(e)
			{
				
			}
			document.oncontextmenu = function(){return true};
			//MaVarInit();
			bIsLoad = false;
		}		
	}
	else	// IE
	{
		if( navigator.userAgent.indexOf("Win64") != -1 )
		{
			alert("64Bit IE 는 지원하지 않습니다.");
		}
		if( get_browser_version() >= 10 )
		{
			if( bNeedInstall === true )
			{
				MaVarInit();
				bIsLoad = false;
				return;
			}
				
			maiFrameDel();
			
			try
			{
				var unloadPacket = getWebDRMPacket(0);
				masocket.send( unloadPacket );
				masocket.close();
			}
			catch(e)
			{
				
			}
			document.oncontextmenu = function(){return true};
			//MaVarInit();
			
			bIsLoad = false;
		}
		else
		{
			unload_markany_module();
		}
	}
}

function maiFrameDel(){
	var topWindowMaiFrame = getTopWindow().document.getElementById("maiFrame");
	if( topWindowMaiFrame != null )
	{
		try
		{
			topWindowMaiFrame.parentNode.removeChild(topWindowMaiFrame);
		}
		catch(err)
		{
			topWindowMaiFrame.removeChild(topWindowMaiFrame);
		}
	}
}

function SetExceptPage()
{
	var szfileName = window.location.pathname;
	var ArrExceptPage = [
										'getfilename.jsp',
										'bottom2.html'
									];

	for(var i=0; i<ArrExceptPage.length; i++)
	{
		if( szfileName.indexOf(ArrExceptPage[i]) != -1 )
			bIsExceptPage = true;
	}
}

function MaLoad()
{	
	try{
		if(getCookieVar("isOpen") == true || /whale/.test(navigator.userAgent.toLowerCase())){
			return;
		}		
	}catch(e){
	}
	
	MaDBGOUT("MaLoad() bIsConnect == " + bIsConnect + ", g_bIsSendInstallPage : " + g_bIsSendInstallPage + ", bIsLoad : " + bIsLoad);
	MaDBGOUT("MaLoad() g_ierrCnt == " + g_ierrCnt + ", g_iReconnection : " + g_iReconnection);
	
	g_ierrCnt 				= 0;
	g_bIsSendInstallPage 	= false;
	document.oncontextmenu = function(){return false};

	if( get_browser() !== "MSIE" )
	{
		var bSupportWS = true;
		
		if (get_browser() === 'Chrome' && get_browser_version() < 39)
			bSupportWS = false;
			
/*		if (get_browser() === 'ChromeX64')
		{
			alert("64Bit Chrome 은 지원하지 않습니다.");
			return;
		}	*/			
		
		if (get_browser() === 'Firefox' && get_browser_version() < 45) 		
			bSupportWS = false;
		
		if (get_browser() === 'Safari' && get_browser_version() < 7) 
			bSupportWS = false;
		
		if (get_browser() === 'Opera' && get_browser_version() < 15) 
			bSupportWS = false;
		
		if( bSupportWS === true )
		{	
			if( bIsExceptPage === true )
			{
				MaUnload();
				return;
			}

			if( bIsLoad === true ) {
				return;
			}

			if( bUseRandomStr === true )
			{
				szCaptionName =  getTopWindow().document.title;

				if(szCaptionName.length == 0)
				{				
					getTopWindow().document.title = location.host + szAddCaptionName + "[" + randomString() + "]";				
				}
			}

			parent.document.oncontextmenu = function(){return false};

			if( IsXHR() === true )
			{
				URLSchemaParam = getURLSchemaParam();
				IsOpeningSocket(URLSchemaX, URLSchemaParam);
			}
			else
			{
				URLSchemaParam = getURLSchemaParam();
				IsOpeningSocket(URLSchema, URLSchemaParam);
			}

			bIsLoad = true;	
		}
		else
		{
			// WebSocket 지원 불가 버전일 경우 npPlugin 모듈을 로드하는 js를 호출한다.
			load_markany_plugin();
		}
	}
	else	// IE
	{		
		WebDRMInstallCheck();
		
		if( navigator.userAgent.indexOf("Win64") != -1 )
		{
			// ie 64bit
			alert("64Bit IE 는 지원하지 않습니다.");
		}
		if( get_browser_version() >= 10 )
		{
			if( bIsExceptPage === true )
			{
				MaUnload();
				return;
			}

			if( bIsLoad === true )
				return;

			if( bUseRandomStr === true )
			{
				szCaptionName =  getTopWindow().document.title;

				if(szCaptionName.length == 0)
				{				
					getTopWindow().document.title = location.host + szAddCaptionName + "[" + randomString() + "]";				
				}
			}

			parent.document.oncontextmenu = function(){return false};

			if( IsXHR() === true )
			{
				URLSchemaParam = getURLSchemaParam();
				IsOpeningSocket(URLSchemaX, URLSchemaParam);
			}
			else
			{
				URLSchemaParam = getURLSchemaParam();
				IsOpeningSocket(URLSchema, URLSchemaParam);
			}

			bIsLoad = true;	
		}
		else
		{
			load_markany_module();
		}
	}	
}

function MaDBGOUT( str )
{
	if( bMaDbgVal === true )
	{
		try
		{
			console.log( str );
		}
		catch(e)
		{
			
		}
		
	}
}
