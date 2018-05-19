<template>
  <el-row class="row">
    <el-col :span="2" style="line-height:40px;text-align:right;">
      <span>物品名称：</span>
    </el-col>
    <el-col :span="6">
      <el-select v-model="value.GoodsID" clearable placeholder="请选择">
        <el-option
          v-for="item in selectGoods"
          :key="item.GoodsID"
          :label="`${item.GoodsQty === 0 ? item.GoodsName + '(库存不足)' : item.GoodsName + '(' + item.GoodsQty + ')'} `"
          :value="item.GoodsID"
          :disabled="item.disabled">
          </el-option>
      </el-select>
    </el-col>
    
    <el-col :span="3" style="line-height:40px;text-align:right;">
      <span>物品数量：</span>
    </el-col>
    <el-col :span="5">
      <el-input v-model="value.OutstorGoodsQty" placeholder="请输入内容" @blur="trunMinus"></el-input>
    </el-col>
    
    <el-col :span="1" :offset="7" style="line-height:40px;text-align:center;font-size:20px;">
      <i class="el-icon-error"></i>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import moment from 'moment';
export default {
  data () {
    return {
      
    }
  },
  props:['value'],
  computed: {
    ...mapGetters(['warehouses','goodsType']),
    selectGoods: function () {
      return this.goodsType.map(item => {
        if(item.GoodsQty === 0) item.disabled = true;
        return item;
      });
    }
  },
  components: {
    
  },
  mounted() {
    
  },
  methods: {
    ...mapActions(['getGoodsTypeByWareId']),
    trunMinus() {
      this.value.OutstorGoodsQty = -this.value.OutstorGoodsQty;
    }
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
