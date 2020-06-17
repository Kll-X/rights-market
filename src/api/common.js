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