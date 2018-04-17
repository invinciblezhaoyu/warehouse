<template>
  <div>
    <el-container>
      <el-header class="header">
        <span style="width:200px;font-size:24px;">仓库管理系统</span>
        <div class="litlePart" style="width:100px;color:#fff;float:right;text-align:right;">
          admin
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router default-active="warehourse" class="el-menu-vertical-demo" 
          @open="handleOpen" @close="handleClose" :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
            <el-menu-item index="warehourse">
              <i class="el-icon-menu"></i>
              <span slot="title">仓库管理</span>
            </el-menu-item>
            <el-menu-item index="employee">
              <i class="el-icon-service"></i>
              <span slot="title">员工管理</span>
            </el-menu-item>
            <el-menu-item index="supplier">
              <i class="el-icon-goods"></i>
              <span slot="title">供应商管理</span>
            </el-menu-item>
            <el-menu-item index="supplier">
              <i class="el-icon-goods"></i>
              <span slot="title">入库信息</span>
            </el-menu-item>
            <el-menu-item index="supplier">
              <i class="el-icon-goods"></i>
              <span slot="title">出库信息</span>
            </el-menu-item>
            <el-menu-item index="system">
              <i class="el-icon-setting"></i>
              <span slot="title">系统设置</span>
            </el-menu-item>
            <el-menu-item index="help">
              <i class="el-icon-question"></i>
              <span slot="title">帮助</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{
    background: #535B63;
    color: #fff;
    padding: 20px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 570px;
    box-sizing: border-box;
  }
  .el-main{
    padding: 0;
  }
</style>
