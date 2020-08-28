import request from '@/utils/request'

export function getData(headers) {
    return request({
        url: '/api/home/data',
        method: 'get',
        headers: headers,
    })
}

export function findSecKill(param) {
    return request({
        headers: {
            'Content-Type': 'application/json;charset=utf8'
        },
        url: '/api/home/findSecKill',
        method: 'post',
        data: param
    })
}
export function spec(param) {
    return request({
        headers: {
            'Content-Type': 'application/json;charset=utf8'
        },
        url: '/api/home/spec',
        method: 'post',
        data: param
    })
}
export function hotSales(params) {
    return request({
        headers: {
            'Content-Type': 'application/json;charset=utf8'
        },
        url: '/api/sales/hotSales',
        method: 'post',
        data: params
    })
}