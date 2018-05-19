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
    ...mapGetters(['oneOutOrder','supplierList','warehouses','goods']),
    filterOrder: function () {
      return this.oneOutOrder.map(item => {
        item.GoodsName = this.goods.find(val => val.GoodsID === item.GoodsID).GoodsName;
        item.OutstorDate = moment(item.OutstoreDate).format('YYYY-MM-DD HH:mm:ss');
        item.prize = this.goods.find(val => val.GoodsID === item.GoodsID).GoodsPrize * item.OutstorGoodsQty;
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
    importExcel() {
      let workbook = new Excel.Workbook();
      workbook.views = [{x: 0, y: 0, width: 10000, height: 20000,firstSheet: 0, activeTab: 1, visibility: 'visible'}];
      let worksheet = workbook.addWorksheet('sheet', {properties: {showGridLines: false,tabColor:{argb:'FF00FF00'}}});
      worksheet.mergeCells('A1:E2');
      worksheet.getCell('A1').value = `${this.row.orderName}`;
      worksheet.getCell('A1').alignment = { vertical: 'top', horizontal: 'center' };
      worksheet.getCell('A1').font = { name: '微软雅黑', family: 4, size: 16, underline: false, bold: true };
      worksheet.mergeCells('A3:E3');
      worksheet.getCell('A3').value = `共${this.oneOutOrder.length}条记录`;
      worksheet.getCell('A3').alignment = { vertical: 'top', horizontal: 'right' };
      worksheet.mergeCells('A4:B4');
      worksheet.getCell('A4').value = `报告人：${sessionStorage.userName}`;
      worksheet.getCell('A4').alignment = { vertical: 'top', horizontal: 'right' };
      worksheet.mergeCells('C4:E4');
      worksheet.getCell('C4').value = `报告生成时间：${moment().format('YYYY-MM-DD HH:mm:ss')}`;
      worksheet.getCell('C4').alignment = { vertical: 'top', horizontal: 'right' };

      worksheet.columns = [
        {  key: 'GoodsName', width: 20 },
        {  key: 'ClientID', width: 20},
        {  key: 'OutstorGoodsQty', width: 10},
        {  key: 'OutstorDate', width: 30 },
        {  key: 'prize', width: 10},
      ];
      worksheet.addRow(['产品', '去向', '数量', '时间', '合计']);
      let list = [];
      list.push(...this.oneOutOrder)
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
