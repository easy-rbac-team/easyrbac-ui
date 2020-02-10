import axios from 'axios';
import Vue from 'vue';
import Message from 'element-ui'

const customAxios = axios.create({
    timeout: 15000,
    withCredentials: true
});

function showErro(msg:any) {
    Message.Message.error(msg);
}

const ssoUrl = process.env.VUE_APP_SSO_URL;

customAxios.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    debugger;
    if (error.response == undefined) {
        showErro('服务器连接超时')
        return;
    }
    let code = error.response.status;

    if (code >= 500) {
        let data = error.response.data;
        showErro(`服务器发生错误：${data.message}`)
    }

    if (code === 401) {
        //goTo(ssoUrl);        
        console.log(process.env.VUE_APP_BASE_URL)
        console.log(process.env)
        debugger;
        window.location.href = ssoUrl + encodeURIComponent(window.location.href)
    }

    if (code === 403) {
        showErro(`没有权限进行此操作`)
    }

    if (code === 400) {
        let data = error.response.data;
        showErro(`输入错误`)
    }

    // Do something with response error
    return Promise.reject(error);
});
export default customAxios;