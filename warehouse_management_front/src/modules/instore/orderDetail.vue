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
        prop="SupplierName"
        label="供应商名称">
      </el-table-column>
      <el-table-column
        prop="InstorGoodsQty"
        label="数量"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="InstorDate"
        label="入库时间">
      </el-table-column>
      <el-table-column
        prop="StorageName"
        label="存放仓库">
      </el-table-column>
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
    ...mapGetters(['oneOrder','supplierList','warehouses','goods']),
    filterOrder: function () {
      return this.oneOrder.map(item => {
        item.GoodsName = this.goods.find(val => val.GoodsID === item.GoodsID).GoodsName;
        item.SupplierName = this.supplierList.find(val => val.SupplierID === item.SupplierID).SupplierName;
        item.StorageName = this.warehouses.find(val => val.StorageID === item.StorageID).StorageName;
        item.InstorDate = moment(item.InstoreDate).format('YYYY-MM-DD HH:mm:ss');
        return item;
      });
    }
  },
  mounted() {
    this.getAllGoods();
    this.getWarehouses(0);
    this.getOrderById(this.row.orderID);
  },
  methods: {
    ...mapActions(['getOrderById','getAllGoods','getWarehouses']),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
