/**
 * Formatter를 정의합니다.
 */
var formatter = new (Class.extend({
	init : function() {
	}
	// 숫자
	// 1234567.908의 숫자를 "12,345,67.908"형식으로 포매팅한다.
	,
	number : function(dat) {
		if(String(jex.null2Void(dat)) == '') {
			return '';
		}

		if (typeof(dat) == 'string') {
			dat = String(parseInt(dat, 10));
		} else {
			dat = String(dat);
		}

		var reg = /(^[+-]?\d+)(\d{3})/; // 정규식(3자리마다 ,를 붙임)

		// dat값의 첫째자리부터 마지막자리까지 인자로 받은 dat 값을 ,가 찍힌 값으로 변환시킴
		while (reg.test(dat)) {
			dat = dat.replace(reg, '$1' + ',' + '$2');
		}//end while
		
		return dat; // 바뀐 dat 값을 반환.
	}
	// 날짜형식
	// "yyyymmdd" 형식의 문자열을 "yyyy-mm-dd"로 포매팅한다.
	,
	date : function(dat) {
		if ((null != dat) && (dat.length == 8)) {
			dat = String(dat);
			dat = dat.substring(0, 4) + "-" + dat.substring(4, 6) + "-"
					+ dat.substring(6, 8);
			return dat;
		} else {
			return dat;
		}
	}
	// 날짜형식
	// "yyyymmdd" 형식의 문자열을 "yyyy.mm.dd"로 포매팅한다.
	,
	dateDot : function(dat) {
		if ((null != dat) && (dat.length == 8)) {
			dat = String(dat);
			dat = dat.substring(0, 4) + "." + dat.substring(4, 6) + "."
					+ dat.substring(6, 8);
			return dat;
		} else {
			return dat;
		}
	}	
	// 시간
	// "hhmmdd" 형식의 문자열을 "hh:mm:dd"로 포매팅한다.
	,
	time : function(dat) {
		if ((null != dat) && (dat.length == 6)) {
			dat = dat.substring(0, 2) + ":" + dat.substring(2, 4) + ":"
					+ dat.substring(4, 6);
			return dat;
		} else {
			return dat;
		}
	}
	// 날짜+시간
	,
	datetime : function(date, format) {
		if (!format) {
			alert("날짜 포맷을 입력해주세요");
			return false;
		}

		if (!date)
			return "";

		// 이미 포맷팅 되어있는값을 삭제한다.
		date = date.replace(/[^0-9]/g, "");

		// 입력된 날짜의 길이가 포맷팅되어야 하는 길이보다 작으면 뒤에 0을 붙인다.
		var formatLength = format.replace(/[^a-z]/g, "").length;
		var dateLength = date.length;
		for ( var i = 0; i < formatLength - dateLength; i++) {
			date += '0';
		}

		if (format.replace(/[^a-z]/g, "") == "hhmiss" && date.length == 6) {
			date = "00000000" + date;
		}

		var idx = format.indexOf("yyyy");
		if (idx > -1) {
			format = format.replace("yyyy", date.substring(0, 4));
		}
		idx = format.indexOf("yy");
		if (idx > -1) {
			format = format.replace("yy", date.substring(2, 4));
		}
		idx = format.indexOf("mm");
		if (idx > -1) {
			format = format.replace("mm", date.substring(4, 6));
		}
		idx = format.indexOf("dd");
		if (idx > -1) {
			format = format.replace("dd", date.substring(6, 8));
		}
		idx = format.indexOf("hh24");
		if (idx > -1) {
			format = format.replace("hh24", date.substring(8, 10));
		}
		idx = format.indexOf("hh");
		if (idx > -1) {
			var hours = date.substring(8, 10);
			hours = parseInt(hours, 10) <= 12 ? hours : "0"
					+ String(parseInt(hours, 10) - 12);
			format = format.replace("hh", hours);
		}
		idx = format.indexOf("mi");
		if (idx > -1) {
			format = format.replace("mi", date.substring(10, 12));
		}
		idx = format.indexOf("ss");
		if (idx > -1) {
			format = format.replace("ss", date.substring(12));
		}
		idx = format.indexOf("EEE");
		if (idx > -1) {
			var weekstr = '일월화수목금토'; // 요일 스트링

			var day = weekstr.substr(new Date(date.substring(0, 4), new Number(
					date.substring(4, 6)) - 1, date.substring(6, 8)).getDay(),
					1);
			format = format.replace("EEE", day);
		}

		return format;
	}
	// -----------------------------
	// 계좌번호 포맷팅
	// 이미 포매팅 되어있을경우 제거후 다시 포맷팅함
	// @param dat : 계좌번호
	// @param arg : Array형식의 계좌번호 자리수를 입력한다. 해당 자리수별로 파싱해서 포맷팅함
	// 사용예) formatter.account( "0123456789" , [3,3,4]) ==>결과 : "012-345-6789"
	// formatter.account( "01234567890" , [3,3,4]) ==>결과 : "012-345-6789-0"
	// formatter.account( "0123456" , [3,3,4]) ==>결과 : "012-345-6"
	// -----------------------------
	,
	account : function(dat, arg) {
		if (!dat)
			return dat;

		// arg가 없을때 기본포맷을 설정하고자 할 경우, 여기에서 arg에 기본포맷을 할당하면됨
		// 예)if(!arg||!arg.length) arg=[3,3,4];
		if (!arg || !arg.length)
			return dat;

		if (typeof dat == "number")
			dat = String(dat);

		// 이미 포매팅되어있을경우 제거한다.
		else if (/[^0-9]/g.test(dat)) {
			dat = dat.replace(/[^0-9]/g, "");
		}

		var rArr = [];
		var startIdx = 0;
		for ( var i = 0; i < arg.length; i++) {
			if (!!dat.substr(startIdx, arg[i]))
				rArr.push(dat.substr(startIdx, arg[i]));

			startIdx += arg[i];
		}
		if (!!dat.substr(startIdx)) {
			rArr.push(dat.substr(startIdx));
		}

		var result = "";
		for ( var i = 0; i < rArr.length; i++) {
			if (i == 0)
				result = rArr[i];
			else
				result += "-" + rArr[i];
		}
		return result;
	}
	// 계좌번호 포멧팅(대구은행 계좌번호 포맷팅)
	,
	accountNo : function(dat) {

		if (!dat)
			return dat;

		if (typeof dat == "number")
			dat = String(dat);

		var result = "";
		if (dat.length < 11) {
			result = dat;
		} else if (dat.length == 11) {
			result = dat.substring(0, 3) + "-" + dat.substring(3, 5) + "-"
					+ dat.substring(5);
		} else {
			result = dat.substring(0, 3) + "-" + dat.substring(3, 5) + "-"
					+ dat.substring(5, 11) + "-" + dat.substring(11);
		}

		return result;

	}
	// 전화번호 포멧팅
	// 9자리 일경우 : xx - xxx - xxxx
	// 10자리 일경우 : xxx - xxx - xxxx
	// 11자리 일경우 : xxx - xxxx - xxxx
	,
	telNo : function(dat) {
		if (!dat)
			return dat;

		if (typeof dat == "number")
			dat = String(dat);

		// 이미 포매팅되어있을경우 제거한다.
		else if (/[^0-9]/g.test(dat)) {
			dat = dat.replace(/[^0-9]/g, "");
		}

		var result = "";
		if (dat.length == 9) // 02-xxx-xxxx
		{
			result = dat.substring(0, 2) + "-" + dat.substring(2, 5) + "-"
					+ dat.substring(5, 9);
		} else if (dat.length == 10) // xxx-xxx-xxxx
		{
			result = dat.substring(0, 3) + "-" + dat.substring(3, 6) + "-"
					+ dat.substring(6, 10);
		} else if (dat.length == 11) // xxx-xxxx-xxxx
		{
			result = dat.substring(0, 3) + "-" + dat.substring(3, 7) + "-"
					+ dat.substring(7, 11);
		} else {
			return dat;
		}

		return result;
	},
	/*
	 * 휴대폰번호 체크
	 * 첫번째값은 select로 defult로 밖을경우
	 */
	phoneNomber : function(dat) {
		if(/[^0-9]/g.test(dat))dat = String(dat);
		var telSubNumber1 =dat.substring(4,8);
		var telSubNumber2 = dat.substring(8,12);
		if(telSubNumber1=="" || telSubNumber1=="")return alert("휴대폰번호를 제대로 입력하시기바랍니다");
		if(telSubNumber1.length<1 || telSubNumber2.length<1)return alert("휴대폰번호를 모두입력해주시기바랍니다");
		
	}
	
	
	
	// 카드 번호 : xxxx-xxxx-xxxx-xxxx
	,
	cardNo : function(dat) {
		if (dat.length == 16) {
			return dat.substring(0, 4) + "-" + dat.substring(4, 8) + "-"
					+ dat.substring(8, 12) + "-" + dat.substring(12, 16);
		} else {
			return dat;
		}
	},
	cardCheck : function(dat) {

		var No1, No2, No3, No4 = 0;

		for ( var i = 0; i < 16; i++) {
			No1 = (i % 2 == 0) ? 2 : 1;
			No2 = No1 * dat.charAt(i);
			No3 = (No2 > 9) ? (No2 % 10 + 1) : No2;
			No4 += No3;
		}

		if (No4 % 10 == 0)
			return true;
		else
			return false;
	}
	/* 카드번호 마스크 포맷팅 - 가온데 8자리 '*' 처리 */
	,
	cardMask : function(dat) {
		if (dat == null || (dat.replace(/(^\s*)|(\s*$)/gi, "") == "")) {
			return dat;
		}

		// 길이 16자리일경우 세팅
		if (dat.length == 16) {
			var tmp = dat.substring(0, 4) + "-****-****-" + dat.substring(12);
			return tmp;
		} else {
			return dat;
		}
	}
	// 주민,사업자, 법인 번호 ( 13 자리 값에 따라 유효성 체크후 사업자번호 혹은 주민번호 혹은 법인번호 포멧으로 반환 )
	,
	ssnBizNo : function(dat) {
		if (!dat)
			return dat;

		if (typeof dat == "number")
			dat = String(dat);

		// 이미 포매팅되어있을경우 제거한다.
		else if (/[^0-9]/g.test(dat)) {
			dat = dat.replace(/[^0-9]/g, "");
		}

		var flag = false;

		if (dat.length == 13) {
			flag = this.ssnNoCheck(dat); // 주민번호 유효성 체크
			if (flag) {
				return this.ssnNo(dat); // 주민번호 포맷
			} else {

				var dat_s = dat.substring(3, 13); // 앞 3자리 "000" 제외
				flag = this.bizNoCheck(dat_s); // 개인사업자번호 유효성 체크
				if (flag) {
					return this.bizNo(dat_s); // 개인사업자번호 포맷
				} else {
					flag = this.corpNoCheck(dat); // 법인사업자번호 유효성 체크
					if (flag) {
						return this.corpNo(dat); // 법인 사업자번호 포맷
					} else {
						return dat;
					}
				}
			}
		} else if (dat.length == 10) {
			flag = this.bizNoCheck(dat);
			if (flag)
				return this.bizNo(dat);
			else
				return dat;
		} else {
			return dat;
		}

	}
	// 주민등록번호 : xxxxxx-xxxxxxx
	,
	ssnNo : function(dat) {

		if (!dat)
			return dat;

		if (typeof dat == "number")
			dat = String(dat);

		// 이미 포매팅되어있을경우 제거한다.
		else if (/[^0-9]/g.test(dat)) {
			dat = dat.replace(/[^0-9]/g, "");
		}

		if (dat.length == 13) {
			return dat.substring(0, 6) + "-" + dat.substring(6, 13);
		} else {
			return dat;
		}

	},
	//주민번호 mask
	maskSsnNo : function(dat) {

		if (!dat)
			return dat;

		if (typeof dat == "number")
			dat = String(dat);

		// 이미 포매팅되어있을경우 제거한다.
		else if (/[^0-9]/g.test(dat)) {
			dat = dat.replace(/[^0-9]/g, "");
		}

		if (dat.length == 13) {
			return dat.substring(0, 6) + "-" + "*******";
	
		} else {
			return dat;
		}

	},
	// 사업자번호 : xxx-xx-xxxxx
	
	bizNo : function(dat) {

		if (!dat)
			return dat;

		if (typeof dat == "number")
			dat = String(dat);

		// 이미 포매팅되어있을경우 제거한다.
		else if (/[^0-9]/g.test(dat)) {
			dat = dat.replace(/[^0-9]/g, "");
		}

		if (dat.length == 10) {
			return dat.substring(0, 3) + "-" + dat.substring(3, 5) + "-"
					+ dat.substring(5, 10);
		} else {
			return dat;
		}

	},
	//사업자번호 mask
	maskbizNo : function(dat) {

		if (!dat)
			return dat;

		if (typeof dat == "number")
			dat = String(dat);

		// 이미 포매팅되어있을경우 제거한다.
		else if (/[^0-9]/g.test(dat)) {
			dat = dat.replace(/[^0-9]/g, "");
		}

		if (dat.length == 10) {
			dat = dat.substring(0, 3) + "-" + "**" + "-"
			+ "*****"
			return dat;
		} else {
			return dat;
		}

	},
	// 법인번호 : xxxxxx-xxxxxxx
	
	corpNo : function(dat) {

		if (!dat)
			return dat;

		if (typeof dat == "number")
			dat = String(dat);

		// 이미 포매팅되어있을경우 제거한다.
		else if (/[^0-9]/g.test(dat)) {
			dat = dat.replace(/[^0-9]/g, "");
		}

		if (dat.length == 13) {
			return dat.substring(0, 6) + "-" + dat.substring(6, 13);
		} else {
			return dat;
		}

	}
	// 주민번호 유효성 체크
	,
	ssnNoCheck : function(dat) {

		if (dat.length != 13)
			return false;

		var arrList = new Array(13);

		arrList[0] = dat.charAt(0);
		arrList[1] = dat.charAt(1);
		arrList[2] = dat.charAt(2);
		arrList[3] = dat.charAt(3);
		arrList[4] = dat.charAt(4);
		arrList[5] = dat.charAt(5);
		arrList[6] = dat.charAt(6);
		arrList[7] = dat.charAt(7);
		arrList[8] = dat.charAt(8);
		arrList[9] = dat.charAt(9);
		arrList[10] = dat.charAt(10);
		arrList[11] = dat.charAt(11);
		arrList[12] = dat.charAt(12);

		var sumNo = 0;
		sumNo += arrList[0] * 2;
		sumNo += arrList[1] * 3;
		sumNo += arrList[2] * 4;
		sumNo += arrList[3] * 5;
		sumNo += arrList[4] * 6;
		sumNo += arrList[5] * 7;
		sumNo += arrList[6] * 8;
		sumNo += arrList[7] * 9;
		sumNo += arrList[8] * 2;
		sumNo += arrList[9] * 3;
		sumNo += arrList[10] * 4;
		sumNo += arrList[11] * 5;

		var no = sumNo % 11;
		var check = 11 - no;
		var checkNo = check % 10;

		if (checkNo != arrList[12])
			return false;
		else
			return true;

	}
	// 사업자번호 유효성 체크
	,
	bizNoCheck : function(dat) {

		if (dat.length != 10)
			return false;

		var arrList = new Array(10);

		arrList[0] = (parseFloat(dat.charAt(0)) * 1) % 10;
		arrList[1] = (parseFloat(dat.charAt(1)) * 3) % 10;
		arrList[2] = (parseFloat(dat.charAt(2)) * 7) % 10;
		arrList[3] = (parseFloat(dat.charAt(3)) * 1) % 10;
		arrList[4] = (parseFloat(dat.charAt(4)) * 3) % 10;
		arrList[5] = (parseFloat(dat.charAt(5)) * 7) % 10;
		arrList[6] = (parseFloat(dat.charAt(6)) * 1) % 10;
		arrList[7] = (parseFloat(dat.charAt(7)) * 3) % 10;

		var checkKey = parseFloat(dat.charAt(8)) * 5 + "0";

		arrList[8] = parseFloat(checkKey.charAt(0))
				+ parseFloat(checkKey.charAt(1));
		arrList[9] = parseFloat(dat.charAt(9));

		var sumNo = 0;
		for ( var i = 0; i < 9; i++) {
			sumNo += arrList[i];
		}

		var checkId = (10 - (sumNo % 10)) % 10;

		if (arrList[9] != checkId)
			return false;
		else
			return true;

	}
	// 법인번호 유효성 체크
	,
	corpNoCheck : function(dat) {

		if (dat.length != 13)
			return false;

		var sumNo = 0;

		for ( var i = 0; i < 12; i++) {
			sumNo += ((i % 2) + 1) * parseFloat(dat.charAt(i));
		}

		var result = (10 - (sumNo % 10)) % 10;

		if (parseFloat(dat.charAt(12)) != result)
			return false;
		else
			return true;

	},

	// 외화표시 : 1.123
	// 환율표시 0.1.0000
	// 원화표시 1.000.000
	fixDotNumber : function(dat, fix) {
		var firstData = "";
		var lastData = "";
		var str = String(dat);
		var dot = "0.";
		if (!str) {
			return str;
		}
		firstData = str.substring(0, str.length - fix);
		lastData = str.substring(str.length - fix);

		firstData = parseFloat(firstData);
		if (isNaN(firstData) == true) { // 숫자표현이 아닌경우는 원래의 data 그대로 return
			if (fix == str.length || fix <= str.length) {
				return String(dot)  + str; // fix 길이가 정한길이보다 같거나 길면 0.0을
												// 먼저출력후 dat출력
			} else if (fix >= str.length || fix != str.length) {
				firstData = String(0);

				return firstData + "." + lastData; // fix 길이가 전체 입력값보다 작을시
													// dat출력
			}
		}
		if (typeof firstData == "number")
			firstData = String(firstData);

		var reg = /(^[+-]?\d+)(\d{3})/; // 정규식(3자리마다 ,를 붙임)
		firstData += ''; // ,를 찍기 위해 숫자를 문자열로 변환
		while (reg.test(firstData))
			// dat값의 첫째자리부터 마지막자리까지
			firstData = firstData.replace(reg, '$1' + ',' + '$2'); // 인자로받은
		// dat값을
		// ,가찍힌값으로변환시킴

		if (isNaN(firstData) == true)
			str = String(firstData) + "." + lastData;
		return String(firstData+"."+lastData);

	},

	// 숫자 데이터가 문자 형으로 올때 0을 제거해서 출력
	// ex)000050 = > 50 으로 출력
	rmZero : function(dat) {
		var indexChr = ' ';
		if (jex.null2Void(dat) == "")
			return dat;
		var index = 0;
		while (index < dat.length) {
			if (dat.charAt(index) == '0') {
				index++;
			} else {
				indexChr = dat.charAt(index);
				break;
			}
		}
		if (index < dat.length)
			return dat.substring(indexChr == '.' ? index - 1 : index);
		else
			return "0";
	},

	// 정해진 길이만큼 앞에서 "0"을 채움
	// param inputValue java.lang.String
	// param len int
	// return java.lang.String
	setLeftLeng : function (inputValue, len){
		var spaceTemp = "";

		if (inputValue == null){
			return "null";

		}else if (inputValue.length > len){
			return inputValue.substring(0,len);

		}else {
    		for (var i =  inputValue.length; i < len ; i++){
    			spaceTemp += "0";
    		}
    	}
    	return spaceTemp + inputValue;
	},
	toDecimal : function(dat, nCount) {
		var value = String(dat);

		if (nCount > 0) {
			if (value.charAt('.')) {
				var start = value.toString().substring(0, dat.length);
				for ( var i = 1; i <= start.length; i++) {
					var temp = start.charAt(i) == ".";
					if (temp == true) {
						start = start.substring(0, i);
						var end = value.substring(value.length, i + 1);
						end = end.substring(0, nCount);
						return parseInt(start) + "." + parseInt(end);

					}

				}

			}
		} else {
			return value;
		}
	},
	// 사용자 ID XX*******
	userIdMarking : function(dat) {

		if (!dat)
			return dat;

		if (typeof dat == "number")
			dat = String(dat);

		//var result  = "*****"+dat.substring(5,dat.length);
		var result  = dat.substring(0,3);
		
		for (var i=0; i < dat.length-3 ; i++){
			result += "*";
		}

		return result;

	},
	//e-mail마스킹 XX******@dgbfn.com
    eMailMarking : function(dat) {

		if (!dat)
			return dat;

		if (typeof dat == "number")
			dat = String(dat);

		var result  = dat.substring(0,2);
		var fs = dat.indexOf('@',0);
		
		for (var i = 0; i < fs-2 ; i++ ){
			result += "*";
		}
		
		result += dat.substring(fs);
		
		return result;

	},
	// 전화번호 포멧팅
	// 9자리 일경우 : 00 - 00* - 00**
	// 10자리 일경우 : 000 - 00* - 00**
	// 11자리 일경우 : 000 - 00**- 00**
	
	telNoMarking : function(dat) {
		if (!dat)
			return dat;

		if (typeof dat == "number")
			dat = String(dat);

		// 이미 포매팅되어있을경우 제거한다.
		else if (/[^0-9]/g.test(dat)) {
			dat = dat.replace(/[^0-9]/g, "");
		}

		var result = "";
		if (dat.length == 9) // 02-xxx-xxxx
		{
			result = dat.substring(0, 2) + "-" + dat.substring(2, 4) + "*-"	+ dat.substring(5, 7) + "**";
		} else if (dat.length == 10) // xxx-xxx-xxxx
		{
			result = dat.substring(0, 3) + "-" + dat.substring(3, 5) + "*-" + dat.substring(6, 8) + "**";
		} else if (dat.length == 11) // xxx-xxxx-xxxx
		{
			if (dat.substring(0, 4) == "0502" || dat.substring(0, 4) == "0504" || dat.substring(0, 4) == "0505" || dat.substring(0, 4) == "0506"){ //xxxx-xxx-xxxx
				result = dat.substring(0, 4) + "-" + dat.substring(4, 6) + "*-" + dat.substring(7, 9) + "**";
			}else{
				result = dat.substring(0, 3) + "-" + dat.substring(3, 5) + "**-" + dat.substring(7, 9) + "**";
			}
			
		} else {
			return dat;
		}

		return result;
	}

}))();