import request from '@/utils/request'

export function getWxconfig(data) { // 获取微信配置
    return request({
        url: '/api/wx/getWechatConfig',
        method: 'post',
        data:data
    })
}
export function assertionQryUID(data) { // 手厅单点登录，校验uid
    return request({
        headers: {
            'Content-Type': 'application/json;charset=utf8'
        },
        url: '/api/assert/assertionQryUID.do',
        method: 'post',
        data:data
    })
}

export function getPageType(data,successFunc){
    // return request({
    //     url: '/api/channel/verfy',
    //     method: 'post',
    //     data:data
    // })
    return window.$.ajax({
        url: process.env.VUE_APP_BASE_API + '/api/channel/verfy',
        type: 'post',
        async: false,
        data: JSON.stringify(data),
        dataType: 'json',
        headers: { 'Content-Type': 'application/json;charset=utf8' },
        success: successFunc
    })
}

export function pagelog(headers,data){
    return request({
        headers: headers,
        url: '/api/rep/collect',
        method: 'post',
        data: Object.assign({},data,{
            index:'visit',
            ua:navigator.userAgent.toLowerCase()
        })
    })
}


export function blocklog(headers,data){
    return request({
        headers: headers,
        url: '/api/rep/collect',
        method: 'post',
        data: Object.assign({},data,{
            index:'visitblock',
            ua:navigator.userAgent.toLowerCase()
        })
    })
}

export function getTime(){
    return request({
        url: '/api/order/getCurrentTime.do',
        method: 'post'
    })
}

export function myPlaceNewStarVip(headers,data) { 
    return request({
        headers: headers,
        url: '/api/order/myPlaceNewStarVip.do',
        method: 'post',
        data: data
    })
}