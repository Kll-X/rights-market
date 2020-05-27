import request from '@/utils/request'

export function znLogin(param) {
    return request({
        url: '/api/cmpp/znLogin',
        method: 'post',
        data: param
    })
}

export function sendSmsCode(param) {
    return request({
        url: '/api/cmpp/sendSmsCode',
        method: 'post',
        data: param
    })
}

export function checkSmsCode(param) {
    return request({
        url: '/api/cmpp/checkSmsCode',
        method: 'post',
        data: param
    })
}

export function signLogin(param) {
    return request({
        url: '/api/cmpp/signLogin',
        method: 'post',
        data: param
    })
}