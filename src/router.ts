import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/user",
      component: () => import("./component/user/userManage.vue"),
      children: [{
        path: "edit/:userId",
        component: () => import("./component/user/editUser.vue")
      }]
    },
    {
      path: '/role',
      component: () => import("./component/role/roleManage.vue")
    },
    {
      path:"/role/roleResource",
      component:() => import('./component/role/resource/roleResourceManage.vue')
    },
    {
      path:'/application',
      component:()=> import('./component/application/applicationManage.vue')
    },
    {
      path:'/app/resource',
      component:()=> import('./component/application/resources/appResourceManage.vue')
    },{
      path:'/role/user',
      component:()=> import('./component/role/user/roleUser.vue')
    },{
      path:'/user/resource',
      component:()=> import('./component/user/resource/userResourceManage.vue')
    },{
      path:'/manager',
      component:()=> import('./component/manager/managerUser.vue')
    },{
      path:'/manager/userAuthorization',
      component:()=> import('./component/manager/userAuthorization.vue')
    },
    {
      path:"/sso",
      name:"SSO",
      component:() => import('./views/Sso.vue')
    }
  ]
})
