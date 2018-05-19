<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="仓库物品列表" name="first">
      <el-button v-if="auth === 'admin'" type="primary" size="mini" style="float:right;" @click="updateGoods()">增加物品</el-button>
      <el-table :data="goodsType" style="width: 100%" :row-class-name="tableRowClassName" height="450">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="GoodsName" label="产品名称"></el-table-column>
        <el-table-column prop="GoodsType" label="产品类型"></el-table-column>
        <el-table-column prop="GoodsQty" label="产品数量"></el-table-column>
        <el-table-column prop="GoodsPrize" label="产品价格"></el-table-column>
        <el-table-column prop="GoodsStorID" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="updateGoods(scope.row)">修改</el-button>
            <el-button v-if="auth === 'admin'" type="danger" size="mini" @click="deleteGood(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <add-goods-Dialog ref="goodsDialog"></add-goods-Dialog>
    </el-tab-pane>
    <el-tab-pane label="仓库统计信息" name="second">
      <div ref="bar" style="width: 700px;height:250px;float:left">1</div>
      <div ref="pie" style="width: 400px;height:250px;float:right;">2</div>
      <div ref="line" style="width: 1100px;height:250px;float:left;">3</div>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import echarts from 'echarts'
import addGoodsDialog from './addGoodsDialog'
export default {
  data () {
    return {
      auth: sessionStorage.userName,
      activeName: 'first',
      tableRowClassName: ''
    }
  },
  computed: {
    ...mapGetters(['goods','goodsType']),
  },
  components: {
    addGoodsDialog,
  },
  mounted() {
    
  },
  methods: {
    ...mapActions(['deleteGoods']),
    handleClick(tab, event) {
      this.createCharts();
    },
    createCharts() {
      const bar = echarts.init(this.$refs.bar);
      const pie = echarts.init(this.$refs.pie);
      const line = echarts.init(this.$refs.line);

      let option = {
        title : {
            text: '物品占比柱状图',
            // subtext: '纯属虚构',
            x:'left'
        },
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                // data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                data : this.goodsType.map(item => item.GoodsName),
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'直接访问',
                type:'bar',
                barWidth: '60%',
                data:this.goodsType.map(item => item.GoodsQty)
            }
        ]
      };
      let option1 = {
        title : {
            text: '物品占比饼状图',
            // subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: this.goodsType.map(item => item.GoodsName)
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data: this.goodsType.map(item => {
                  let obj = {};
                  obj.value = item.GoodsQty;
                  obj.name = item.GoodsName;
                  return obj;
                }),
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
      };
      let option2 = {
        title: {
            text: '近一周出入库数据对比'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['入库数据','出库数据']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'入库总量',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'出库总量',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            }
        ]
      };
      bar.setOption(option);
      pie.setOption(option1);
      line.setOption(option2);
    },
    barChart() {

    },
    updateGoods(row) {
      this.$refs.goodsDialog.open(row);
    },
    deleteGood(row) {
      this.deleteGoods(row);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
