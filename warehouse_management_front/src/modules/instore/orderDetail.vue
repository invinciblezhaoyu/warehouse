<template>
  <div style="margin:10px;">
    <div style="margin:10px;font-family: '微软雅黑'">
      <i class="el-icon-tickets"></i>
      <span>{{row.orderName}}</span>
      <el-button size="mini" type="success" style="float:right;" @click="importExcel">打印报表</el-button>
    </div>
    <hr>
    <el-table
      :show-summary="true"
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
      <el-table-column
        prop="prize"
        label="合计">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Excel from 'exceljs/dist/exceljs.min.js';
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
        item.prize = this.goods.find(val => val.GoodsID === item.GoodsID).GoodsPrize * item.InstorGoodsQty;
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
    importExcel() {
      let workbook = new Excel.Workbook();
      workbook.views = [{x: 0, y: 0, width: 10000, height: 20000,firstSheet: 0, activeTab: 1, visibility: 'visible'}];
      let worksheet = workbook.addWorksheet('sheet', {properties: {showGridLines: false,tabColor:{argb:'FF00FF00'}}});
      worksheet.mergeCells('A1:F2');
      worksheet.getCell('A1').value = `${this.row.orderName}`;
      worksheet.getCell('A1').alignment = { vertical: 'top', horizontal: 'center' };
      worksheet.getCell('A1').font = { name: '微软雅黑', family: 4, size: 16, underline: false, bold: true };
      worksheet.mergeCells('A3:F3');
      worksheet.getCell('A3').value = `共${this.oneOrder.length}条记录`;
      worksheet.getCell('A3').alignment = { vertical: 'top', horizontal: 'right' };
      worksheet.mergeCells('A4:B4');
      worksheet.getCell('A4').value = `报告人：${sessionStorage.userName}`;
      worksheet.getCell('A4').alignment = { vertical: 'top', horizontal: 'right' };
      worksheet.mergeCells('C4:F4');
      worksheet.getCell('C4').value = `报告生成时间：${moment().format('YYYY-MM-DD HH:mm:ss')}`;
      worksheet.getCell('C4').alignment = { vertical: 'top', horizontal: 'right' };

      worksheet.columns = [
        {  key: 'GoodsName', width: 20 },
        {  key: 'SupplierName', width: 20},
        {  key: 'InstorGoodsQty', width: 10,color:{argb:'FFFFFFFF'}},
        {  key: 'InstorDate', width: 30 },
        {  key: 'StorageName', width: 30 },
        {  key: 'prize', width: 10},
      ];
      worksheet.addRow(['产品', '供应商', '数量', '时间', '仓库', '合计']);
      let list = [];
      list.push(...this.oneOrder)
      list.forEach((item, index) => {
        const row = worksheet.addRow(item);
        row.alignment = {vertical: 'middle', horizontal: 'left'};
      });
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data.buffer]);
        this.saveAs(blob,`${this.row.orderName}.xlsx`);
      }).catch((err) => {
        console.log('发生错误',err);
      });
    },
    saveAs(blob, filename) {
      let url = URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = filename;
      let event = document.createEvent('MouseEvents');
      event.initMouseEvent('click');
      a.dispatchEvent(event);
      URL.revokeObjectURL(url);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
