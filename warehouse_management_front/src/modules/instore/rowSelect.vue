<template>
  <el-row class="row">
    <el-col :span="2" style="line-height:40px;text-align:right;">
      <span>物品名称：</span>
    </el-col>
    <el-col :span="6">
      <el-select v-model="value.GoodsID" clearable placeholder="请选择">
        <el-option
          v-for="item in goods"
          :key="item.GoodsID"
          :label="item.GoodsName"
          :value="item.GoodsID">
          </el-option>
      </el-select>
    </el-col>
    <el-col :span="2" style="line-height:40px;text-align:right;">
      <span>物品数量：</span>
    </el-col>
    <el-col :span="5">
      <el-input v-model="value.InstorGoodsQty" placeholder="请输入内容"></el-input>
    </el-col>

    <el-col :span="2" style="line-height:40px;text-align:right;">
      <span>存放仓库：</span>
    </el-col>
    <el-col :span="6">
      <el-select v-model="value.StorageID" clearable placeholder="请选择">
        <el-option
          v-for="item in warehouses"
          :key="item.StorageID"
          :label="item.StorageName"
          :value="item.StorageID">
          </el-option>
      </el-select>
    </el-col>
    <el-col :span="1" style="line-height:40px;text-align:center;font-size:20px;">
      <i class="el-icon-error"></i>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
export default {
  data () {
    return {
      value4: '',
      input: ''
    }
  },
  props:['value'],
  computed: {
    ...mapGetters(['goods','warehouses']),
  },
  components: {
    
  },
  mounted() {
    console.log(123,this.goods);
  },
  methods: {
    ...mapActions([]),
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .row{
    /* border: 1px solid #409EFF; */
    border: 1px solid #ccc;
    border-radius: 2%;
    /* width: 90%; */
    padding: 10px;
    margin: 10px;
  }
</style>
