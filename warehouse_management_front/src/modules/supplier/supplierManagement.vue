<template>
  <div class="employee">
    <el-input v-model="input" placeholder="请输入内容" size="mini" style="width:200px;float:left;margin-left:10px;"></el-input>
    <el-button type="success" size="mini" style="float:left;">搜索</el-button>
    <el-button type="success" size="mini" @click="addNewSupplier">新增</el-button>
    <hr>
    <div>
      <el-table
        :data="suppliers"
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index">
        </el-table-column>
        <el-table-column
          label="供应商名称"
          prop="SupplierName">
        </el-table-column>
        <el-table-column
          label="联系方式"
          prop="SupplierTel">
        </el-table-column>
        <el-table-column
          label="地址"
          prop="SupplierAddre">
        </el-table-column>
        <el-table-column
          label="录入时间"
          prop="createTime">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.SupplierID)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <supplier-dialog ref="dialog"></supplier-dialog>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import supplierDialog from './supplierDialog'
import moment from 'moment';
export default {
  data () {
    return {
      input: '',
    }
  },
  computed: {
    ...mapGetters(['supplierList']),
    suppliers: function () {
      return this.supplierList.map(item => {
        item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
        return item;
      });
    },
  },
  components: {
    supplierDialog,
  },
  async mounted() {
    await this.getSupplierList();
    await this.getAllGoods();
  },
  methods: {
    ...mapActions(['getSupplierList','deleteSupplier','getAllGoods']),
    addNewSupplier() {
      this.$refs.dialog.open();
    },
    handleDelete(SupplierID) {
      this.deleteSupplier(SupplierID).then(data => {
        this.$message({
          type: 'success',
          message: '操作成功!'
        });
      }).catch(err => {
        console.log(err);
        this.$message({
          type: 'warring',
          message: '操作失败!'
        });
      });
    },
    handleEdit(row) {
      this.$refs.dialog.open(row);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .employee{
    margin: 10px;
  }
</style>

