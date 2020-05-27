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