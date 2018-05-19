<template>
  <div style="margin:10px;">
    <div style="margin:10px;font-family: '微软雅黑'">
      <i class="el-icon-tickets"></i>
      <span>{{row.orderName}}</span>
      <el-button size="mini" type="success" style="float:right;">打印报表</el-button>
    </div>
    <hr>
    <el-table
      :data="filterOrder"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="GoodsName"
        label="物品名称">
      </el-table-column>
      <el-table-column
        prop="ClientID"
        label="去向">
      </el-table-column>
      <el-table-column
        prop="OutstorGoodsQty"
        label="数量">
      </el-table-column>
      <el-table-column
        prop="OutstorDate"
        label="出库时间">
      </el-table-column>
      <!-- <el-table-column
        prop="StorageName"
        label="存放仓库">
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import moment from 'moment';
export default {
  data () {
    return {
      row: this.$route.query.row,
    }
  },
  computed: {
    ...mapGetters(['oneOutOrder','supplierList','warehouses','goods']),
    filterOrder: function () {
      return this.oneOutOrder.map(item => {
        item.GoodsName = this.goods.find(val => val.GoodsID === item.GoodsID).GoodsName;
        item.OutstorDate = moment(item.OutstoreDate).format('YYYY-MM-DD HH:mm:ss');
        return item;
      });
    }
  },
  mounted() {
    this.getOutOrderById(this.row.orderID);
    this.getAllGoods();
  },
  methods: {
    ...mapActions(['getOutOrderById','getAllGoods']),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
