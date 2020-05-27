import request from '@/utils/request'

export function gotoService(data) {  
    return request({
        url: '/api/customerservices//encryptUrl',
        method: 'post',
        data: data
    })
}
