import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/",
      redirect:{
        name :"admin"
      }
    },
    {
      path: "/admin/user",
      component: () => import("./component/user/userManage.vue"),
      children: [{
        path: "edit/:userId",
        component: () => import("./component/user/editUser.vue")
      }]
    },
    {
      path: '/admin/role',
      component: () => import("./component/role/roleManage.vue")
    },
    {
      path:"/admin/role/roleResource",
      component:() => import('./component/role/resource/roleResourceManage.vue')
    },
    {
      path:'/admin/application',
      component:()=> import('./component/application/applicationManage.vue')
    },
    {
      path:'/admin/app/resource',
      component:()=> import('./component/application/resources/appResourceManage.vue')
    },{
      path:'/admin/role/user',
      component:()=> import('./component/role/user/roleUser.vue')
    },{
      path:'/admin/user/resource',
      component:()=> import('./component/user/resource/userResourceManage.vue')
    },{
      path:'/admin/manager',
      component:()=> import('./component/manager/managerUser.vue')
    },{
      path:'/admin/manager/userAuthorization',
      component:()=> import('./component/manager/userAuthorization.vue')
    },
    {
      path:"/sso",
      name:"SSO",
      component:() => import('./views/Sso.vue')
    },{
      path:"/admin",
      name:"admin",
      component:()=>import('./views/AdminBase.vue')
    }
  ]
})
