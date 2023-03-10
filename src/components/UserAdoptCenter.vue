<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
      <span class="title">用 户 申 请 中 心</span>
    </div>
    <el-card>
      <el-table :data="tableData"
                style="width: 100%; min-height: 300px">
        <el-table-column prop="id"
                         label="ID"
                         width="100"
                         align="center">
        </el-table-column>
        <el-table-column prop="petId"
                         label="宠物ID"
                         align="center">
        </el-table-column>
        <el-table-column prop="petName"
                         label="宠物名称"
                         align="center">
        </el-table-column>
        <el-table-column prop="userPhone"
                         label="电话"
                         width="180"
                         align="center">
        </el-table-column>
        <el-table-column prop="createTime"
                         label="申请时间"
                         width="180"
                         align="center">
        </el-table-column>
        <el-table-column prop="status"
                         label="审核状态"
                         align="center">
          <template slot-scope="{ row }">
            <span>{{ getOrderType(row) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         align="center">
          <el-button type="text"
                     size="small"
                     class="delBut non"
                     @click="statusHandle(scope.row)">
            取消
          </el-button>
        </el-table-column>
      </el-table>
      <el-pagination class="pageList"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageSize"
                     :current-page.sync="page"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="counts"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"></el-pagination>
    </el-card>
  </el-card>
</template>

<script>
const axios = require('axios')
export default {
  data () {
    return {
      counts: 0,
      page: 1,
      pageSize: 10,
      tableData: []
    }
  },
  created () {
    this.getAdopt(JSON.parse(localStorage.getItem("user")).id)
  },
  methods: {
    getAdopt (userId) {
      axios.get(`/adopt/${userId}`).then(res => {
        console.log(res)
        if (res.data.success === true) {
          this.tableData = res.data.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    getOrderType (row) {
      let str = ''
      switch (row.status) {
        case 0:
          str = '待审核'
          break;
        case 1:
          str = '同意'
          break;
        case 2:
          str = '拒绝'
          break;
      }
      return str
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.page = val
      this.init()
    }
  }
}
</script>

<style>
</style>