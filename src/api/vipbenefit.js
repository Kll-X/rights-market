import request from '@/utils/request'

export function vipCheck(param) {
    return request({
        headers: {
            'Content-Type': 'application/json;charset=utf8'
        },
        url: '/api/vip/vipCheck',
        method: 'post',
        data: param
    })
}

export function myVip(param) {
    return request({
        headers: {
            'Content-Type': 'application/json;charset=utf8'
        },
        url: '/api/vip/myVip',
        method: 'post',
        data: param
    })
}