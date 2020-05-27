import request from '@/utils/request'
// 单点登录
export function actSignLogin(data) {
    return request({
        url: '/api/cmpp/actSignLogin',
        method: 'post',
        data: data,
    })
}
// 获取权益列表
export function getListRights(headers,data) {
    return request({
        url: '/api/activity/listRights.do',
        method: 'post',
        headers: headers,
        data: data,
    })
}
// 是否能购买
export function checkRules(headers, data) {
    return request({
        url: '/api/activity/checkRules.do',
        method: 'post',
        data: data,
        headers: headers
    })
}