import request from '@/utils/request.js'

export function addorUpdate(data){
    return request({
        url:`${[process.env.VUE_APP_BASE_API]}/admin/category/addorUpdate`,
        method:'post',
        data
    })
}

export function fetchCategory(id){
    return request({
        url:`${[process.env.VUE_APP_BASE_API]}/admin/category/detail`,
        method: 'get',
        params: { id }
    })
}

export function fetchList(query){
    return request({
        url:`${[process.env.VUE_APP_BASE_API]}/admin/category/loadmore`,
        method: 'get',
        params: query
    })
}

