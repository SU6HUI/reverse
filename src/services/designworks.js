import { request } from 'umi';

/**上传作业设计 */
export async function infowork(params) {
    return request(`/api/designworks/updesignworks`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params.values)
    })
}

//查看作业设计列表
export async function findwork() {
    return request(`/api/designworks/fdesignworks`, {
        method: 'GET'
    })
}

//删除作业
export async function delwork(params) {
    return request(`/api/designworks/deldesignworks`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })
}

//查看作业详情
export async function infoDetail() {
    return request(`/api/designworks/fdesignworks`, {
        method: 'GET'
    })
}