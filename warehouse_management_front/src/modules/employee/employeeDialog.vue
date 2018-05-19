<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.ManagerName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" :label-width="formLabelWidth">
        <el-radio v-model="form.ManagerSex" label="男">男</el-radio>
        <el-radio v-model="form.ManagerSex" label="女">女</el-radio>
      </el-form-item>
      <el-form-item label="联系方式" :label-width="formLabelWidth">
        <el-input v-model="form.ManagerTel" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="家庭住址" :label-width="formLabelWidth">
        <el-input v-model="form.ManagerAddre" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitNewManager">确 定</el-button>
    </div>
    </el-dialog>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import moment from 'moment'
export default {
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '100px',
      form: {},
      title: '新增用户',
    }
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions(['addManager','updateManager']),
    open(row){
      if(row) this.title = '用户信息修改';
      this.dialogFormVisible = true;
      this.form = row || {
        ManagerName: '',
        ManagerSex: '男',
        ManagerTel: '',
        ManagerAddre: '',
      }
    },
    submitNewManager() {
      if(this.form.ManagerID){
        this.updateManager(this.form).then(data => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          this.dialogFormVisible = false;
        }).catch(err => {
          console.log(err);
          this.$message({
            type: 'warring',
            message: '操作失败!'
          });
        });
      }else{
        this.form.ManagerID = moment().format('MDDHHmmss');
        this.addManager(this.form).then(data => {
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          this.dialogFormVisible = false;
        }).catch(err => {
          console.log(err);
          this.$message({
            type: 'warring',
            message: '操作失败!'
          });
        });
      }
      
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
