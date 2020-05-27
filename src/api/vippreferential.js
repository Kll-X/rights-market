import request from '@/utils/request'

export function getData() { // 获取活动列表接口
    return request({
        url: '/api/home/getMbUserSpecList',
        method: 'get'
    })
}
