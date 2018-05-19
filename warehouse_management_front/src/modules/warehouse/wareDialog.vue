<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
    <el-form :model="newWare">
      <el-form-item label="仓库名称" :label-width="formLabelWidth" style="width:295px;">
        <el-input v-model="newWare.StorageName"></el-input>
      </el-form-item>
      <el-form-item label="管理人" :label-width="formLabelWidth">
        <el-select
          v-model="newWare.StoManID"
          collapse-tags
          placeholder="请选择">
          <el-option
            v-for="item in userList"
            :key="item.ManagerID"
            :label="item.ManagerName"
            :value="item.ManagerID">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth" style="width:295px;">
        <el-input v-model="newWare.StorageAddre"></el-input>
      </el-form-item>
      <!-- <el-form-item label="物品" :label-width="formLabelWidth">
        <el-input v-model="newWare.StorageDescribe" type="textarea"></el-input>
      </el-form-item> -->
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="storageUpdate()">{{dialogTitle}}</el-button>
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
      dialogTitle: '',
    }
  },
  computed: {
    ...mapGetters(['userList']),
  },
  methods: {
    ...mapActions(['addNewStorage','updateStorage']),
    open(ware) {
      this.dialogVisible = true;
      if(ware) ware.createTime = moment(ware.createTime).format('YYYY-MM-DD HH:mm:ss');
      this.newWare = ware || {
        type: 'new',
        StorageName: `仓库${moment().format('YYMM-DDHH-mmss')}`,
        StoManID: '',
        StorageAddre: '',
        StorageDescribe: '',
        createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      }
      this.dialogTitle = this.newWare.type ? '新增' : '修改';
    },
    async storageUpdate() {
      try{
        let res = {};
        if(this.newWare.type) {
          this.newWare.StorageID = `${moment().format('MHHmmss')}`;
          res = await this.addNewStorage([this.newWare]);
        }
        else res = await this.updateStorage(this.newWare);
        if(res.status === 200){
          let str = this.newWare.type ? '新增' : '修改';
          this.$message({ message: `${str + this.newWare.StorageName}成功`, type: 'success' });
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
