<template>
<div>
    <nav-header></nav-header>
    <el-row >
      <left-menu></left-menu>     
      <el-col :span="20">
        <router-view></router-view>
      </el-col> 
    </el-row>
</div>
</template>

<script>
import navHeader from "@/component/navHead";
import leftMenu from "@/component/leftMenu";

export default {
  components: {
    navHeader,
    leftMenu
  }
};
</script>
