// var url = 'http://192.168.1.10:9030'; //兰栋琪
//var url = 'http://192.168.1.11:2002'; //戚萌萌
// var url = 'http://192.168.1.19:2002';//测试环境
var url = 'https://app.5izhujia.com'; //测试环境
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);return null;
}

/*格式化时间格式*/
function getTime(time, type) {
    var now = new Date(time);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month < 10) {
        month = '0' + month;
    }
    if (date < 10) {
        date = '0' + date;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (second < 10) {
        second = '0' + second;
    }
    if (type == 'date') {
        return year + "-" + month + "-" + date;
    }
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}
/*数字精确后两位*/
function num(n) {
    return Number(n).toFixed(2);
}