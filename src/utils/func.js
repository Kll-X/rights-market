export function is_weixin() {
    var a = navigator.userAgent.toLowerCase();
    return "micromessenger" == a.match(/MicroMessenger/i) ? !0 : !1
}

export function getQuery(str)
{
       var query = window.location.search.substring(1);
       var vars = query?query.split("&"):[];
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == str){return pair[1];}
       }
       return(false);
}
export function delQuery(url=window.location.href,paramKey) {
    let urlParam = window.location.search.substr(1);   //页面参数
    let beforeUrl = url.substr(0, url.indexOf("?"));   //页面主地址（参数之前地址）
    let nextUrl = "";

    let arr = new Array();
    if (urlParam != "") {
        let urlParamArr = urlParam.split("&"); //将参数按照&符分成数组

        for (let i = 0; i < urlParamArr.length; i++) {
            let paramArr = urlParamArr[i].split("="); //将参数键，值拆开
            //如果键雨要删除的不一致，则加入到参数中
            if (paramArr[0] != paramKey) {
                arr.push(urlParamArr[i]);
            }
        }
    }

    if (arr.length > 0) {
        nextUrl = "?" + arr.join("&");
    }
    url = beforeUrl + nextUrl;
    return url;
}
export function getBanner(list, channelCode) {
    let arr = [];
    const nowTime = Date.parse(new Date());
    for (let index = 0; index < list.length; index++) {
        let item = list[index];
        let start = Date.parse(new Date(item.startDate));
        let end = Date.parse(new Date(item.endDate))
        if (start <= nowTime && end > nowTime) {
            let channelCodeTxt = channelCode? '/?channelCode=' + channelCode :'';
            if (!item.linkurl) item.linkurl = window.location.origin + channelCodeTxt + '#/custompage/2';
            arr.push(item);
        }
    }
    return arr;
}

export function share(data) {
    window.wx.ready(function () {
        window.wx.onMenuShareAppMessage({
            title: data.title, // 分享标题
            desc: data.desc, // 分享描述
            link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: data.imgUrl ? data.imgUrl : location.origin + '/imgs/pro/share.png', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        window.wx.onMenuShareTimeline({
            title: data.title, // 分享标题
            link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: data.imgUrl ? data.imgUrl : location.origin + '/imgs/pro/share.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
               window.console.log()
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    });
}