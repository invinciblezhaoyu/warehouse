<template>
  <div style="margin:10px;">
    <div class="showType" style="text-align:right;">
      <el-input v-model="input" placeholder="请输入内容" size="mini" style="width:200px;float:left;margin-left:10px;"></el-input>
      <el-button type="success" size="mini" style="float:left;">搜索</el-button>
      <!-- <el-button type="success" size="mini" @click="addOrder">新的入库单</el-button> -->
    </div><hr>
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        property="date"
        label="订单号">
      </el-table-column>
      <el-table-column
        property="name"
        label="订单名称"
        width="120">
      </el-table-column>
      <el-table-column
        property="address"
        label="创建时间">
      </el-table-column>
      <el-table-column
        property="address"
        label="供应商">
      </el-table-column>
    </el-table>
    <div class="checkPage" style="position: absolute;bottom:10px;right:10px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="6">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {

        }
      ],
      tableData: [{}],
      input: '',
    }
  },
  components:{
    
  },
  methods: {
    
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
