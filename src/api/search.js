import request from '@/utils/request'

export function getResult(val) {
    return request({
        url: '/api/search/searchResult.do',
        method: 'post',
        data:{
            name:val
        }
    })
}

export function getHot() {
    return request({
        url: '/api/search/hotSearch.do',
        method: 'post',
    })
}