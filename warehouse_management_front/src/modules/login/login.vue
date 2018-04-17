<template>
  <div>
    <div class="background">
      <div class="login-box">
        <h3><i class="el-icon-upload"></i> 仓库管理系统登录</h3>
        <el-switch
          style="float:right;margin:0 20px 10px 0;"
          active-color="#ff4949"
          inactive-color="#409EFF"
          v-model="userType"
          active-text="管理员"
          inactive-text="普通用户">
        </el-switch>
        <el-input
          type="password"
          class="input-box"
          placeholder="请输入账号"
          suffix-icon="el-icon-service"
          v-model="accountNumber">
        </el-input>
        <el-input
          class="input-box"
          type="password"
          placeholder="请输入密码"
          suffix-icon="el-icon-view"
          v-model="password">
        </el-input><br><br>
        <el-button type="success" @click="userLogin" style="width:60%;">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters,mapActions } from 'vuex';
export default {
  data () {
    return {
      userType: true,
      accountNumber: '',
      password: '',

    }
  },
  computed: {
    ...mapGetters(['user']),
  },
  mounted() {
    
  },
  methods:{
    ...mapActions(['managerLogin']),
    async userLogin() {
      if (this.accountNumber === '') {
        this.$alert('请输入用户名');
        return;
      }
      let params = {
        type: this.userType ? 'admin' : 'user',
        userName: this.accountNumber,
        password: this.password
      }
      try{
        await this.managerLogin(params);
        if(!this.user.msg){
          this.$router.push('main');
        }else{
          this.$alert(this.user.msg);
        }
      }catch(error) {
        console.log(error);
        console.log('登录失败，请检查连接是否正常！');
      }

    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .background{
    background-image: url('../../assets/8636083.jpg');
    width: 100%;
    height:100%;  
    background-size:100% 100%;  
    position:absolute;
  }
  .login-box{
    position: absolute;
    width: 400px;
    height: 300px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5%;
    top: 30%;
    left: 50%;
    text-align: center;
  }
  .input-box{
    width: 60%;
    margin: 10px;
  }
</style>
