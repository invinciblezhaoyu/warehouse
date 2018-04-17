<template>
  <el-dialog title="新增仓库" :visible.sync="dialogVisible">
    <!-- <div>
      <span>仓库名称：</span><el-input class="input" v-model="newWare.name" placeholder="请输入内容" size="mini"></el-input>
    </div> -->
    <el-form :model="newWare">
      <el-form-item label="仓库名称" :label-width="formLabelWidth">
        <el-input v-model="newWare.StorageName"></el-input>
      </el-form-item>
      <el-form-item label="管理人" :label-width="formLabelWidth">
        <el-select
          v-model="newWare.StoManID"
          multiple
          collapse-tags
          style="margin-left: 20px;"
          placeholder="请选择">
          <el-option
            v-for="item in userList"
            :key="item.ManagerID"
            :label="item.ManagerName"
            :value="item.ManagerName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="newWare.StorageAddre"></el-input>
      </el-form-item>
      <!-- <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input v-model="newWare.StorageDescribe" type="textarea"></el-input>
      </el-form-item> -->
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateStorage()">立 即 创 建</el-button>
    </div>
    </el-dialog>
</template>

<script>
import { mapGetters,mapActions } from 'vuex'
import moment from 'moment'
import uuidv1 from 'uuid/v1'
export default {
  data () {
    return {
      dialogVisible: false,
      formLabelWidth: '80px',
      newWare: {},
    }
  },
  computed: {
    ...mapGetters(['userList']),
  },
  methods: {
    ...mapActions(['addNewStorage']),
    open(ware) {
      this.dialogVisible = true;
      this.newWare = ware || {
        StorageName: `仓库${moment().format('YY-MMDD-HHmm')}`,
        StoManID: '',
        StorageAddre: '',
        StorageDescribe: '',
      }
    },
    async updateStorage() {
      this.newWare.StorageID = moment().format('YYMMDDHHmm');
      try{
        let res = await this.addNewStorage([this.newWare]);
        if(res.status === 200){
          this.$message({ message: `新增${this.newWare.StorageName}成功`, type: 'success' });
        }
      }catch(err){
        this.$message.error(`操作失败，尝试刷新后重试`);
        console.log('错误原因',err);
      };
      this.dialogVisible = false;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input{
  width: 200px;
}
</style>
