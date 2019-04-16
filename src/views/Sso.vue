<template>
  <div class="panel">
    <h1>EasyRBAC Login</h1>
    <div style="padding: 10px;">
      <span class="labels">User Name</span>
      <input type="text" v-model="userName" class="user-input">
    </div>
    <div class="password-show">
      <span class="labels">Password</span>
      <input type="password" id="pwd"  v-model="password" class="user-input">
      <span class="msg">{{msg}}</span>
    </div>
    <div class="button-group">
      <button @click="login">login</button>
      <button style="margin-right: 10px;">logout</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import jsonp from 'jsonp'

export default {
  data() {
    return {
      userName: "",
      password: "",
      msg:""
    };
  },
  methods: {
    async login() {
        let tokenResult = this.getTokenInfo();
        if (tokenResult == null) {
            tokenResult = await this.getToken()
            if (tokenResult == null || tokenResult == undefined) {
                return
            }
        }
        let url = `${process.env.VUE_APP_SSO_API_URL}/callbackUrl?appCode=${this.appCode}&env=${this.env}`
        let rsp = await axios.get(url)
        let callbackData = rsp.data
        if(callbackData.callbackType === 1){
            jsonp(`${callbackData.callbackUrl}?token=${tokenResult.token}`,null,(err,data)=>{
                if(!err){
                    let fromUrl = this.from
                    if(fromUrl){
                        window.location.href = fromUrl;
                    }
                }else{
                    this.msg ="登录失败，请联系管理员"
                }
            })
        }else if(callbackData.callbackType === 4){
            window.location.href = `${callbackData.callbackUrl}?token=${tokenResult.token}`
        }

    },
    getTokenInfo() {
      let tokenJson = localStorage.getItem("token");
      if (tokenJson == null) {
        return null;
      }
      let tokenResult = JSON.parse(tokenJson);
      
      if (tokenResult.expireOn > new Date().valueOf()) {
        return tokenResult;
      } else {
        localStorage.removeItem("token");
      }
      return null;
    },
    async getToken() {
            let loginUrl = process.env.VUE_APP_SSO_API_URL;
            let appCode = "easyRBAC";


            let rsp = await axios.post(loginUrl,{
                    userName:this.userName,
                    password:this.password,
                    appCode:appCode
                })
            let result = rsp.data
            if (rsp.status === 200) {
                this.msg = "登录成功，等待验证"
                this.saveTokenInfo(result);
                return result;
            } else {
                alert(result.message)
            }
    },
    saveTokenInfo(loginResult) {
            debugger;
            let expireIn = loginResult.expireIn;
            let now = new Date().valueOf();
            let expireOn = now + expireIn * 1000;
            let tokenObj = JSON.stringify({
                token: loginResult.token,
                expireOn: expireOn
            });
            localStorage.setItem("token", tokenObj);
    }    
  },
  computed: {
    env() {
      return this.$route.query.env;
    },
    appCode() {
      return this.$route.query.appCode;
    },
    action() {
      return this.$route.query.action;
    },
    from(){
        return this.$route.query.from;
    }
  },
  mounted() {}
};
</script>

<style scoped>
body {
  margin: 0;
  font: normal 75% Arial, Helvetica, sans-serif;
}

.labels {
  width: 90px;
  background: rgba(145, 135, 135, 0.26);
  display: inline-block;
  text-align: right;
  padding-right: 10px;
  border-radius: 4px;
  color: #222;
}

.user-input {
  border: 0;
  background: transparent;
  border-bottom: 1px solid #999;
  outline: none;
  width: 220px;
  padding-left: 10px;
}
.panel {
  font-family: "Source Sans Pro";
  font-size: 1.3em;
  position: absolute;
  width: 400px;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  z-index: 100;
  height: 200px;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 4px;
  margin: 0;
  background: rgba(238, 238, 238, 0.82);
}

h1 {
  display: block;
  font-size: 1em;
  -webkit-margin-before: 0.67em;
  -webkit-margin-after: 0.67em;
  -webkit-margin-start: 0px;
  -webkit-margin-end: 0px;
  font-weight: bold;
  margin: 0px 0px;
  text-align: center;
  border-bottom: 1px solid #999;
  padding: 10px;
}

.button-group {
  padding: 10px;
}

button {
  background: #2196f3;
  border: 0;
  padding: 10px;
  width: 75px;
  border-radius: 5px;
  cursor: pointer;
  float: right;
}

button:hover {
  background: #0e64a8;
}

.password-show {
  padding: 0px 10px 10px 10px;
  border-bottom: 1px solid #999;
}
</style>
