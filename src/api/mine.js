import request from '@/utils/request'

export function queryOrderCount(data,headers) {
    return request({
        url: '/api/order/queryOrderCount.do',
        method: 'post',
        data: data,
        headers: headers
    })
}

export function myManager() {
    return request({
        url: '/api/home/mine',
        method: 'get',
        data: {},
    })
}
