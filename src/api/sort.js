import request from '@/utils/request'

export function getCategory() { // 获取分类列表接口
    return request({
        url: '/api/home/category',
        method: 'get',
    })
}

export function getFindMembers(data) { // 获取分类数据接口
    return request({
        url: '/api/qymb/findMembers',
        method: 'post',
        data: data,
    })
}