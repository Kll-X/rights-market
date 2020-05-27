import request from '@/utils/request'

export function getData() {
    return request({
        url: '/api/home/data',
        method: 'get'
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