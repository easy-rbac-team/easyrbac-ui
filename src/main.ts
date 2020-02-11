import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import treeMenu from './component/treeMenu.vue'
import searchLst from './component/commons/searchLst.vue'
import appResource from './component/commons/appResource.vue'
// import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/iconfont.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.component("tree-menu", treeMenu);
Vue.component("search-lst", searchLst);
Vue.component("app-resource", appResource);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
