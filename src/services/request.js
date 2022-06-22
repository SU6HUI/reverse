import request from 'umi-request'
import { Alert, message, Tabs, Button } from 'antd';
import { history } from 'umi'

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url, options) => {
    if (url == '/api/users/loginuser') return { options: { ...options } }

    let token = localStorage.getItem('token');
    if (null === token) {
        token = '';
    }
    const authHeader = { Authorization: `${token}` };
    return {
        url: url,
        options: { ...options, interceptors: true, headers: authHeader },
    };
});

request.interceptors.response.use(response => {
    if (response.status >= 500) {
        const codeMaps = {
            500: 'token过期，请重新登录',
            502: '网关错误。',
            503: '服务不可用，服务器暂时过载或维护。',
            504: '网关超时错误',
        };
        message.error(codeMaps[response.status] + '3s之后跳转到登录页');
        setTimeout(() => {
            history.push('/user/login')
        }, 3000)
    }

    return response;
});

export default request;
