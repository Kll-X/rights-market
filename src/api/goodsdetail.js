import request from '@/utils/request'

export function getFindMembersBymid(data) { // 获取分类数据接口
    return request({
        url: '/api/qymb/findMembersBymid',
        method: 'post',
        data: data,
    })
}

export function getFindMemberSales(data, headers) { // 获取详情数据接口
    return request({
        url: '/api/qymb/findMemberSales',
        method: 'post',
        data: data,
        headers: headers,
    })
}

export function sendSmsCode(data) { // 下发短信验证码
    return request({
        url: '/api/sms/sendSmsCode',
        method: 'post',
        data: data,
    })
}

export function checkSmsCode(data) { // 校验短信验证码
    return request({
        url: '/api/sms/smsCodeCheck',
        method: 'post',
        data: data,
    })
}

export function placeOrder(data, headers) { // 立即订购接口
    return request({
        url: '/api/order/placeOrder.do',
        method: 'post',
        data: data,
        headers: headers,
    })
}

export function payOrderByH5(data) { // 第三方支付接口
    return request({
        url: '/api/payment/payOrderByH5',
        method: 'post',
        data: data,
    })
}

export function findMemberTc(data) { // 第三方支付接口
    return request({
        url: '/api/qymb/findMemberTc',
        method: 'post',
        data: data,
    })
}

export function queryAcceptFivego(data, headers) { // 查找fivego是否可用接口
    return request({
        url: '/api/order/queryAcceptFivego.do',
        method: 'post',
        data: data,
        headers: headers,
    })
}

export function checkSeckillCompp(data, headers) { // 立即订购接口
    return request({
        url: '/api/order/checkSeckillCompp.do',
        method: 'post',
        data: data,
        headers: headers,
    })
}