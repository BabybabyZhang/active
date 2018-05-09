var s = parseInt(window.screen.width) / 750;
var vp = '<meta name="viewport" content="width=750, minimum-scale = ' + s + ', maximum-scale = ' + s + ', target-densitydpi=device-dpi">';
document.write(vp);

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if (r != null) {
		return unescape(r[2]);
	}
	return null;
}

/*cookie的设置、获取和删除*/
function setCookie(name,value,iDay){
  var oDate=new Date();
  oDate.setDate(oDate.getDate()+iDay);
  if(navigator.userAgent.indexOf('MSIE')>0){
    document.cookie=name+'='+value+';expires='+oDate.toGMTString()+";path=/";
  }else{
    document.cookie=name+'='+value+';expires='+oDate+";path=/";
  }
}

function getCookie(name){
  var arr=document.cookie.split("; ");
  for(var i=0;i<arr.length;i++){
    var arr2=arr[i].split("=");
    if(arr2[0]==name){
      return arr2[1]
    }
  }
  return '';
}

function deleteCookie(name){
  setCookie(name,'',-1)
}
