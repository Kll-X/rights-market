import request from '@/utils/request'

export function getWxconfig(data) { // 获取微信配置
    return request({
        url: '/api/wx/getWechatConfig',
        method: 'post',
        data:data
    })
}
