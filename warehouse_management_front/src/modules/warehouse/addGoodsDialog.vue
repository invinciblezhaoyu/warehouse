<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="物品名称" :label-width="formLabelWidth" style="width:300px;">
        <el-input v-model="form.GoodsName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="物品类型" :label-width="formLabelWidth" style="width:300px;">
        <el-input v-model="form.GoodsType" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="物品价格" :label-width="formLabelWidth">
        <el-input-number v-model="form.GoodsPrize" :min="1" :max="1000000"></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitNewGood">确 定</el-button>
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
      form: {
          StorageID: this.$route.query.StorageID,
          GoodsName: '',
          GoodsType: '',
          GoodsPrize: '',
        },
      formLabelWidth: '80px',
    }
  },
  computed: {
    ...mapGetters(['']),
  },
  mounted() {
    
  },
  methods: {
    ...mapActions(['addNewGoods','updateGoods']),
    open(row) {
      this.dialogFormVisible = true;
      this.form = row || {
        StorageID: this.$route.query.StorageID,
        GoodsName: '',
        GoodsType: '',
        GoodsPrize: '',
      }
    },
    submitNewGood() {
      if(this.form.GoodsID) {
        this.updateGoods(this.form);
      }else{
        this.form.GoodsID = `${moment().format('MHHmmss')}`
        this.addNewGoods(this.form).then(data => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }).catch(err => {
          console.log(err);
          this.$message({
            type: 'warring',
            message: '操作失败，请重试！'
          });
        });
        this.dialogFormVisible = false;
      }
    },
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
