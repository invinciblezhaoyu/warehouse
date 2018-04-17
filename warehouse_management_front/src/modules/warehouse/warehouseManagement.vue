<template>
  <div class="warehouse">
    <span>仓库管理</span><hr>
    <div class="content">
      <div class="showType" style="text-align:right;">
        <el-button type="success" size="mini" @click="addWarehouse">新增</el-button>
        <el-radio-group v-model="showTypeRadio" size="mini">
          <el-radio-button label="thumbnail"><i class="el-icon-menu"></i></el-radio-button>
          <el-radio-button label="table"><i class="el-icon-tickets"></i></el-radio-button>
        </el-radio-group>
      </div>
      <div class="list">
        <el-row v-if="showTypeRadio === 'thumbnail'">
          <el-col :span="5" v-for="(item, index) in warehouses" :key="item.StorageId" :offset="index % 4 === 0 ? 0 : 1" style="margin-bottom:5px;">
            <el-card :body-style="{ padding: '0px' }">
              <img src="../../assets/8636083.jpg" class="image">
              <div style="padding: 14px;">
                <span>{{item.StorageName}}</span>
                <div class="bottom clearfix">
                  <time class="time">2018-02-12</time>
                  <el-button type="text" class="button" @click="deleteRow(item)">删除</el-button>
                  <el-button type="text" class="button" @click="updateWarehouse(item)">详情</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div class="table" v-else>
          <el-table ref="singleTable" :data="warehouses" highlight-current-row
          @current-change="handleCurrentChange" style="width: 100%">
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column property="StorageName" label="仓库名"></el-table-column>
            <el-table-column property="StorageAddre" label="地址"></el-table-column>
            <el-table-column property="date" label="日期"></el-table-column>
            <el-table-column property="StoManID" label="管理人"></el-table-column>
            <el-table-column fixed="right" label="操作" width="220">
              <template slot-scope="scope">
                <el-button @click="updateWarehouse(scope.row)" type="primary" size="mini">修改</el-button>
                <el-button @click="deleteRow(scope.row)" type="danger" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="checkPage" style="position: absolute;bottom:10px;right:10px;">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="16">
          </el-pagination>
        </div>
      </div>
    </div>
    <ware-dialog ref="wareDialog"></ware-dialog>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import wareDialog from './wareDialog'
export default {
  data () {
    return {
      showTypeRadio: 'thumbnail',
      currentDate: new Date(),
      currentRow: null
    }
  },
  computed: {
    ...mapGetters(['warehouses','userList']),
  },
  
  async mounted () {
    await this.getWarehouses();
    await this.getAllManager();
    console.log(this.userList);
  },
  components:{
    wareDialog,
  },
  methods: {
    ...mapActions(['getWarehouses','deleteStorage','getAllManager']),
    addWarehouse() {
      this.$refs.wareDialog.open();
    },
    updateWarehouse(row) {
      this.$refs.wareDialog.open(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    deleteRow(row) {
      this.$confirm('此操作将永久删除该仓库, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let res = await  this.deleteStorage(row);
        if(res.status === 200){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }else{
          this.$message.error('删除失败!');
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
      
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .warehouse{
    margin: 10px;
  }
  .list{
    width: 100%;
    height: 460px;
    margin: 10px;
  }

  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  /* .content{
    height: 400px;
  } */
</style>
