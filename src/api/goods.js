import request from '@/utils/request.js'

export function fetchList(query){
    return request({
        url:`${[process.env.VUE_APP_BASE_API]}/admin/goods/loadmore`,
        method: 'get',
        params: query
    })
}