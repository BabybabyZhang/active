$('#mask').hide();
var flag = true;
var flags = true;
var type = '';
$('#btn').click(function () {
    type = 'landlord';
    if (flag) {
        flag = false;
        xiazai();
    }
    // androidXiaZai()
});

$('#btns').click(function () {
    type = 'user';
    if (flags) {
        flags = false;
        xiazai();
    }
    // androidXiaZai()
});

function is_weixinbrose() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        // webToast('请使用浏览器打开','top',1000);
        $('#mask').show();
        flag = true;
        flags = true;
        return false;
    } else {
        return true;
    }
}
function xiazai() {
    if (navigator.userAgent.match(/android/i)) {
        if (is_weixinbrose()) {
            androidXiaZai();
        } else {}
    } else if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        flag = true;
        flags = true;
        if (type == 'landlord') {
            window.location.href = "https://itunes.apple.com/us/app/%E5%AE%89%E9%80%B8%E5%AE%A2-%E6%88%BF%E4%B8%9C%E7%89%88/id1374721404?l=zh&ls=1&mt=8"; //ios app协议
            window.setTimeout(function () {
                window.location.href = "https://itunes.apple.com/us/app/%E5%AE%89%E9%80%B8%E5%AE%A2-%E6%88%BF%E4%B8%9C%E7%89%88/id1374721404?l=zh&ls=1&mt=8";
            }, 2000);
        } else if (type == 'user') {
            window.location.href = "https://itunes.apple.com/us/app/%E5%AE%89%E9%80%B8%E5%AE%A2-%E7%A7%9F%E5%AE%A2%E7%89%88/id1374861992?l=zh&ls=1&mt=8"; //ios app协议
            window.setTimeout(function () {
                window.location.href = "https://itunes.apple.com/us/app/%E5%AE%89%E9%80%B8%E5%AE%A2-%E7%A7%9F%E5%AE%A2%E7%89%88/id1374861992?l=zh&ls=1&mt=8";
            }, 2000);
        }
    }
}
function androidXiaZai() {
    var objectKey = '';
    var saveAs = '';
    if (type == 'landlord') {
        objectKey = 'apk/zhujialand.apk';
        saveAs = 'zhujialand.apk';
    } else if (type == 'user') {
        objectKey = 'apk/zhujia.apk';
        saveAs = 'zhujia.apk';
    }
    //console.log(objectKey + ' => ' + saveAs);
    OSS.urllib.request(url + "/file/getToken", { method: 'GET' }, function (err, response) {
        if (err) {
            flag = true;
            flags = true;
            return alert(err);
        }
        try {
            var result = JSON.parse(response);
            console.log('result', result);
        } catch (e) {
            return alert('parse sts response info error: ' + e.message);
            flag = true;
            flags = true;
        }
        if (result.StatusCode == 200) {
            var client = new OSS.Wrapper({
                accessKeyId: result.AccessKeyId,
                accessKeySecret: result.AccessKeySecret,
                stsToken: result.SecurityToken,
                endpoint: 'http://oss-cn-qingdao.aliyuncs.com',
                bucket: 'zhujiatest'
            });
            var result = client.signatureUrl(objectKey, {
                expires: 3600,
                response: {
                    'content-disposition': 'attachment; filename="' + saveAs + '"'
                }
            });
            console.log(result);
            /*var urlArr = result.split('com');
            urlArr[0] = 'http://osstest.5izhujia.com'
            var urlStr = urlArr.join('');
            console.log('urlStr',urlStr)*/
            window.location = result;
            flag = true;
            flags = true;
        } else {
            flag = true;
            flags = true;
            webToast('请求出错了', 'top', 1000);
        }
    });
}