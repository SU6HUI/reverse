//还没整明白，先不管了

//封装request
const { request } = require('umi')

//请求拦截器：在请求之间添加header头
export default function requests(url, options) {
    request.interceptors.request.use((url, options) => {

        //获取token
        const token = 'sss'

        //设置header头
        const headers = {
            Authorization: `Bearer ${token}`,
        }

        return {
            url,
            options: { ...options, headers, interceptors: true },
        };
    });
}

