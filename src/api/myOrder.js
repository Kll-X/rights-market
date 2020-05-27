import request from '@/utils/request'

export function queryOrderList(query,headers) {
    return request({
        url: '/api/order/queryOrderList.do',
        method: 'post',
        data: query,
        headers: headers
    })
}
export function placeOrder(query, headers) {
    return request({
        url: '/api/order/placeOrder.do',
        method: 'post',
        data: query,
        headers: headers
    })
}

export function queryOrderStatus(query,headers) {
    return request({
        url: '/api/order/queryOrderStatus.do',
        method: 'post',
        data: query,
        headers: headers
    })
}
