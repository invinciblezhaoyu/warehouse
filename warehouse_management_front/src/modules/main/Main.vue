<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu router default-active="warehourse" 
          id="leftNav"
          class="el-menu-vertical-demo "
          :collapse="isCollapse"
          background-color="#545c64"
          text-color="#fff"
          :style="navStyle"
          active-text-color="#ffd04b">
          <div style="font-size:26px;color:white;margin:20px;">仓库管理系统</div>
          <el-menu-item index="warehouse">
            <i class="el-icon-menu"></i>
            <span slot="title">仓库管理</span>
          </el-menu-item>
          <el-menu-item index="employee" v-if="rightUser === 'admin'">
            <i class="el-icon-service"></i>
            <span slot="title">员工管理</span>
          </el-menu-item>
          <el-menu-item index="supplier" v-if="rightUser === 'admin'">
            <i class="el-icon-goods"></i>
            <span slot="title">供应商管理</span>
          </el-menu-item>
          <el-menu-item index="instore" v-if="rightUser !== 'admin'">
            <i class="el-icon-goods"></i>
            <span slot="title">入库信息</span>
          </el-menu-item>
          <el-menu-item index="outstore" v-if="rightUser !== 'admin'">
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
      <el-container style="position:relative;left:-1px;">
        <el-header class="header">
          <div class="litlePart">
            {{rightUser}}
          </div>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
export default {
  data () {
    return {
      isCollapse: false,
      navStyle: {
        height: `${document.documentElement.clientHeight}px`,
      },
    }
  },
  computed: {
    ...mapGetters(['user']),
    rightUser: function () {
      return sessionStorage.userName;
    }
  },
  mounted() {
    
  },
  methods: {
    
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
  .litlePart{
    width:50px;
    color:#fff;
    float:right;
    text-align:center;
    /* padding-top: 10px; */
    /* box-sizing: border-box; */
    /* background:#ccc; */
    /* border-radius:50%; */
    /* position: relative;
    top: -10px; */
  }
</style>
