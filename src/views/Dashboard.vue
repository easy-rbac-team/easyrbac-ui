<template lang="pug">
    el-container
        el-container
            el-header(class="header")
                .search-input
                    el-input(placeholder="应用名/Code" v-model="keyword")
                        i(class="el-icon-search el-input__icon" slot="suffix")
                el-button(type="warning" @click="logout") 退出                    
            el-main
                el-row(:gutter="12")
                    template(v-for="item in filtedApps")
                        el-col(:span="6")        
                            el-card(shadow="hover" @click.native="cardClickHandler" style="cursor: pointer;")
                                el-row                                
                                    el-col(:span="8")
                                        img.app-icon(src="https://image.flaticon.com/icons/svg/942/942207.svg")
                                    el-col(:span="16")
                                        ul
                                            li 应用名： {{item.appName}}
                                            li 描述： {{item.desc}}
</template>

<script>
import {appService} from '@/service/appService'
import {loginService} from '@/service/loginService'

export default {
    data(){
        return {
            keyword:"",
            apps:[]
        }
    },
    methods:{
        async getAllApps(){
            let apps = await appService.searchApp("",1,999999)
            this.apps = apps.items
        },
        cardClickHandler(){
            window.alert('fuck')
        },
        async logout(){
            await loginService.easyRbacLogout()
        }
    },
    computed:{
        filtedApps(){            
            return this.apps.filter(x=>x.appName.includes(this.keyword) || x.appCode.includes(this.keyword))
        }
    },
    created(){
        this.getAllApps()
    }
}
</script>

<style scoped>
    .search-input{
        margin-top: 10px;
        margin-left: auto;
        width: 1000px;
        margin-right: auto;
        margin-bottom: 10px;
    }

    .search-input > div{
        margin-bottom: 10px;
    }

    .app-icon{
        width: 100px;
        height: 100px;
    }

    li{
        list-style: none;
    }
    .header{
        position: relative;
        text-align: right;
        font-size: 25px;
        height: 100px!important;
        background-color:rgb(238, 241, 246)
    }
    .header button{
        position: absolute;
        top: 0;
        right: 20px;
    }
</style>