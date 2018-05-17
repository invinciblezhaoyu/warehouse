<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="1000px">
    <el-row>
      <el-col :span="2" style="line-height:40px;text-align:right;">
        <span>订单名称：</span>
      </el-col>
      <el-col :span="9">
        <el-input v-model="order.orderName" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="2" style="line-height:40px;text-align:right;">
        <span>供应商：</span>
      </el-col>
      <el-col :span="9">
        <el-select v-model="order.SupplierID" clearable placeholder="请选择">
          <el-option
            v-for="item in supplierList"
            :key="item.SupplierID"
            :label="item.SupplierName"
            :value="item.SupplierID">
            </el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" plain size="mini" style="float:right;">批量导入</el-button>
      </el-col>
    </el-row>
    
    <div class="instoreContent">
      <row-select v-for="(item,index) in order.list" :key="index" :value.sync="item"></row-select>
      <el-button class="add" @click="addNewRow"><i class="el-icon-plus" ></i></el-button>
      
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="instore()">入 库</el-button>
    </div>
    
  </el-dialog>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import rowSelect from './rowSelect'
import moment from 'moment'
import uuidv1 from 'uuid/v1'
export default {
  data () {
    return {
      dialogVisible: false,
      formLabelWidth: '80px',
      newWare: {},
      dialogTitle: '入库单',
      order: {},
    }
  },
  computed: {
    ...mapGetters(['supplierList']),
  },
  components:{
      rowSelect,
  },
  mounted() {
    this.getSupplierList();
  },
  methods: {
    ...mapActions(['getSupplierList','instoreSubmit']),
    open(ware) {
      this.dialogVisible = true;
      this.order = {
        orderID: moment().format('MMDDHHmmss'),
        orderName : `订单${moment().format('YYMMDDHHmmss')}`,
        SupplierID: '',
        InstoreDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        ManagerID: sessionStorage.ManagerID,
        list: [{}],
      };
    },
    addNewRow() {
      this.order.list.push({});
    },
    instore() {
      this.instoreSubmit(this.order);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input{
  width: 200px;
}
.add{
    /* border: 1px solid #409EFF; */
    border: 1px solid #ccc;
    border-radius: 2%;
    padding: 10px;
    margin: 10px;
    text-align: center;
    font-size: 25px;
    width: 97%;
    /* width: 1000px; */
  }
  .instoreContent{
    width: 100%;
    height: 250px;
    overflow: auto;
    /* border:1px solid #ccc; */
    margin-top: 10px;
  }
</style>
