<template>
  <div class="employee">
    <span>员工管理</span><hr>
    <el-container>
      <el-aside width="200px" style="border:1px solid #ccc;padding:10px;height:530px;">
        <span>员工列表</span><hr>
        <el-table ref="singleTable" :data="tableData" highlight-current-row 
        @current-change="handleCurrentChange" style="width: 100%">
          <el-table-column property="name" label="姓名"></el-table-column>
          <el-table-column property="age" label="地址"></el-table-column>
        </el-table>
      </el-aside>
      <el-main style="border:1px solid #ccc;margin-left:10px;">
        <div>
          <span>姓名：{{currentRow.name}}</span><br>
          <span>年龄：{{currentRow.age}}</span>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
          name: '王小虎',
          age: 2
        }, {
          name: '王小猪',
          age: 3
        },{
          name: '王小鱼',
          age: 4
        },
      ],
      currentRow: {},

    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val;
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .employee{
    margin: 10px;
  }
</style>
