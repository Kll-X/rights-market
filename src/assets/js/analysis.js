/*
    PV UV 统计
    id                          --  活动ID(必填)
    location                    --  渠道号(没有则传空)
    debug                       -- true:测试环境,false:现网
*/
var  url1 = "http://120.197.230.65:40081/mssp_pps/ela/collect.do?";
var  url2 = "https://h5.mmarket.com/mssp_ppsh5/ela/collect.do?";

function pvAnalysis(id, location, debug) {
    var  params = {
        "index": "actrecord"
        , "type": "visit"
        , "activityId": id
        , "event": "pagein"
        , "location": location
        , "userAgent": navigator.userAgent
    }
    var  script = document.createElement("script");
    var  args = "";
    for (var  i in params) {
        if (args != "") {
            args += "&";
        }
        args += i + "=" + encodeURIComponent(params[i]);
    }
    debug ? script.src = url1 + args : script.src = url2 + args;
    document.getElementsByTagName("head")[0].appendChild(script);
}


/*
    我的定制内 按钮类的统计
    activityId          --  活动ID
    event               --  key
    location            --  渠道号(没有则传空)
    debug               -- true:测试环境,false:现网
*/
function customAnalysis(id, event, location, debug) {
    var  params = {
        "index": "yxb_common"
        , "type": "common"
        , "activityId": id
        , "event": event
        , "location": location
    }
    var  script = document.createElement("script");
    var  args = "";
    for (var  i in params) {
        if (args != "") {
            args += "&";
        }
        args += i + "=" + encodeURIComponent(params[i]);
    }
    debug ? script.src = url1 + args : script.src = url2 + args;
    document.getElementsByTagName("head")[0].appendChild(script);
}
export {pvAnalysis,customAnalysis}