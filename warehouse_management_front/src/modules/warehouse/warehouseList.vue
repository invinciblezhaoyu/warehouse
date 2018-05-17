<template>
  <div>
    <div class="showType" style="text-align:right;">
      <el-input v-model="input" placeholder="请输入内容" size="mini" style="width:200px;float:left;margin-left:10px;"></el-input>
      <el-button type="success" size="mini" style="float:left;">搜索</el-button>
      <el-button type="success" size="mini" @click="addWarehouse">新增</el-button>
      <el-radio-group v-model="showTypeRadio" size="mini">
        <el-radio-button label="thumbnail"><i class="el-icon-menu"></i></el-radio-button>
        <el-radio-button label="table"><i class="el-icon-tickets"></i></el-radio-button>
      </el-radio-group>
    </div><hr>
    <div class="list">
      <el-row v-if="showTypeRadio === 'thumbnail'">
        <el-col :span="5" v-for="(item, index) in warehouses" :key="item.StorageId"
        :offset="index % 4 === 0 ? 0 : 1" style="margin-bottom:5px;">
          <el-card :body-style="{ padding: '0px' }">
            <img src="../../assets/8636083.jpg" class="image"  @click="getDetail(item)">
            <div style="padding: 14px;">
              <span>{{item.StorageName}}</span>
              <div class="bottom clearfix">
                <time class="time">2018-02-12</time>
                <el-button type="text" class="button" @click="deleteRow(item)">删除</el-button>
                <el-button type="text" class="button" @click="updateWarehouse(item)">修改</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="table" v-else>
        <el-table ref="singleTable" :data="warehouseData" highlight-current-row
        @current-change="handleCurrentChange" style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column label="创建日期" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
            </template>
          </el-table-column>
          <el-table-column property="StorageName" label="仓库名"></el-table-column>
          <el-table-column property="StorageAddre" label="地址"></el-table-column>
          <el-table-column label="查看详情">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="getDetail(scope.row)">详情</el-button>
            </template>
          </el-table-column>
          <el-table-column label="管理人">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.manager.ManagerName }}</p>
                <p>住址: {{ scope.row.manager.ManagerAddre }}</p>
                <p>联系电话: {{ scope.row.manager.ManagerTel }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.manager.ManagerName }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
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
          :total="Math.ceil(wareCount / 8) * 8"
           @current-change="pageChange">
        </el-pagination>
      </div>
      <ware-dialog ref="wareDialog"></ware-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import wareDialog from './wareDialog'
import moment from 'moment'
export default {
  data () {
    return {
      showTypeRadio: 'thumbnail',
      currentDate: new Date(),
      currentRow: null,
      input:'',
    }
  },
  computed: {
    ...mapGetters(['warehouses', 'wareCount', 'userList']),
    warehouseData: function () {
      return this.warehouses.map(item => {
        item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
        item.manager = this.userList.find(user => user.ManagerID === item.StoManID);
        return item;
      });
    },
  },
  components:{
    wareDialog,
  },
  async mounted () {
    await this.getAllManager();
    await this.getWarehouses(0);
    // await this.getAllGoods();
    // 需要传仓库id
  },
  methods: {
    ...mapActions(['getWarehouses','deleteStorage','getAllManager','getAllGoods']),
    addWarehouse() {
      this.$refs.wareDialog.open();
    },
    updateWarehouse(row) {
      delete row.manager;
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
        let res = await this.deleteStorage(row);
        if(res.status === 200){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }else{
          this.$message.error('删除失败!');
        }
      }).catch((error) => {
        console.log(error);
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    getDetail(item) {
      this.getAllGoods(item.StorageID);
      this.$router.push('/detail');
    },
    async pageChange(page) {
      let begin = (page - 1) * 8;
      await this.getWarehouses(begin);
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
