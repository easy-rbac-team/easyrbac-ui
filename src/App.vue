<template>
  <div id="app">
  <template v-if="!isSso">
    <nav-header></nav-header>
    <el-row >
      <left-menu></left-menu>     
      <el-col :span="20">
        <router-view></router-view>
      </el-col> 
    </el-row>
  </template>
  <template v-else>
    <router-view></router-view>
  </template>
  </div>
</template>

<script>
import navHeader from './component/navHead'
import leftMenu from './component/leftMenu'


export default {
  data() {
    return {
    }
  },

  methods: {
    
  },

  computed:{
    isSso(){
      return window.location.hash.toUpperCase().includes("SSO")
    }
  },

  components: {
    navHeader,
    leftMenu
  }
}
</script>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0
}

#app {
  font-family: Helvetica, sans-serif;
  /* text-align: center; */
}


#app .el-row {
  height: calc(100% - 80px);
}

.el-row .el-col,
.el-row .el-menu {
  height: 100%;
}
</style>
