<template>
  <div class="employee">
    <el-input v-model="input" placeholder="请输入内容" size="mini" style="width:200px;float:left;margin-left:10px;"></el-input>
    <el-button type="success" size="mini" style="float:left;">搜索</el-button>
    <el-button type="success" size="mini" @click="addNewManager">新增</el-button>
    <hr>
    <div>
      <el-table
        :data="userList"
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index">
        </el-table-column>
        <el-table-column
          label="姓名"
          prop="ManagerName">
        </el-table-column>
        <el-table-column
          label="性别"
          prop="ManagerSex">
        </el-table-column>
        <el-table-column
          label="联系方式"
          prop="ManagerTel">
        </el-table-column>
        <el-table-column
          label="家庭住址"
          prop="ManagerAddre">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">修改</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.ManagerID)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <employee-dialog ref="dialog"></employee-dialog>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import employeeDialog from './employeeDialog'
export default {
  data () {
    return {
      input: '',
    }
  },
  computed: {
    ...mapGetters(['userList']),
  },
  components: {
    employeeDialog,
  },
  async mounted() {
    await this.getAllManager();
    await this.getAllGoods();
  },
  methods: {
    ...mapActions(['getAllManager','deleteManager','getAllGoods']),
    addNewManager() {
      this.$refs.dialog.open();
    },
    handleDelete(ManagerID) {
      this.deleteManager(ManagerID).then(data => {
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
