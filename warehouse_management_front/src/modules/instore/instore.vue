<template>
  <div style="margin:10px;">
    <div class="showType" style="text-align:right;">
      <el-input v-model="input" placeholder="请输入内容" size="mini" style="width:200px;float:left;margin-left:10px;"></el-input>
      <el-button type="success" size="mini" style="float:left;">搜索</el-button>
      <el-button type="success" size="mini" @click="addOrder">新的入库单</el-button>
    </div><hr>
    <el-table
      ref="singleTable"
      :data="orders"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        property="orderID"
        label="订单号">
      </el-table-column>
      <el-table-column
        property="orderName"
        label="订单名称">
      </el-table-column>
      <el-table-column
        property="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        property="SupplierID"
        label="供应商">
      </el-table-column>
    </el-table>
    <div class="checkPage" style="position: absolute;bottom:10px;right:10px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="6"
        >
      </el-pagination>
    </div>
    <instore-dialog ref="dialog"></instore-dialog>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import moment from 'moment'
import instoreDialog from './instoreDialog'
export default {
  data () {
    return {
      list: [
        {

        }
      ],
      input: '',
    }
  },
  computed: {
    ...mapGetters(['orderList']),
    orders: function (){
      console.log(111,this.orderList);
      return this.orderList.map(item => {
        item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
        return item;
      });
    }
  },
  components:{
    instoreDialog,
  },
  mounted() {
    this.getOrderList({ManagerID:sessionStorage.ManagerID,page:0});
  },
  methods: {
    ...mapActions(['getOrderList']),
    addOrder(){
      this.$refs.dialog.open();
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
