import request from '@/utils/request'

export function getData() { // 获取列表接口
    return request({
        url: '/api/home/getFiveGoSpecList',
        method: 'get'
    })
}
