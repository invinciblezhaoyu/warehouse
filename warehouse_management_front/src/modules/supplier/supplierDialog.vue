<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="供应商" :label-width="formLabelWidth">
        <el-input v-model="form.SupplierName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" :label-width="formLabelWidth">
        <el-input v-model="form.SupplierTel" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="form.SupplierAddre" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitNewSupplier">确 定</el-button>
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
      title: '新增供应商',
    }
  },
  computed: {
    ...mapGetters([]),
  },
  methods: {
    ...mapActions(['addSupplier','updateSupplier']),
    open(row){
      if(row) this.title = '供应商信息修改';
      this.dialogFormVisible = true;
      this.form = row || {
        SupplierName: '',
        SupplierTel: '',
        SupplierAddre: '',
      }
    },
    submitNewSupplier() {
      if(this.form.SupplierID){
        this.updateSupplier(this.form).then(data => {
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
        this.form.SupplierID = moment().format('MDDHHmmss');
        this.form.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
        this.addSupplier(this.form).then(data => {
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
