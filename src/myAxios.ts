import axios from 'axios';
import Vue from 'vue';
import Message from 'element-ui'
import {Config} from './service/baseConfig'

const customAxios = axios.create({
    // baseURL: '/api',
    // // target: 'http://10.66.4.67:8099/'
    // headers: {
    //     // Cookie: 'MOZARTSESSIONID=4cfd8b02-52a0-4520-8777-f11c5fc05a44',
    // },
    timeout: 15000,
    withCredentials: true
});

function getEnv(){
    if(window.location.hostname.startsWith("localhost")){
        return "dev"
    }

    if(window.location.host.startsWith("easyrbac")){
        return "prod"
    }
}

function showErro(msg:any) {
    Message.Message.error(msg);
}

const ssoUrl = Config.SsoUrl;

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
        debugger;
        window.location.href = ssoUrl + window.location.href+"&env="+getEnv();
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