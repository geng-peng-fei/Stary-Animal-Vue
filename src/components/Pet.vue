<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
      <span class="title">宠 物 专 区</span>
    </div>
    <div class="pet">
      <div class="center">
        <el-input v-model="params.key"
                  @keyup.enter.native="handleSearch"
                  placeholder="搜 索 你 心 爱 的 宠 物">
          <el-button slot="append"
                     icon="el-icon-search"
                     id="search"
                     @click="handleSearch"></el-button>
        </el-input>
      </div>
      <!-- 已选择过滤项 -->
      <div class="selected-ops">
        <div class="open">筛选条件：</div>
        <div class="selected-op"
             v-for="(filter, filterIndex) in params.filters"
             :key="filterIndex"
             @click="deleteFilter(filterIndex)">
          {{ filterNames[filterIndex] }}：<span>{{filter}} <span class='close'>×</span></span>
        </div>
      </div>
      <!--过滤项-->
      <div class="filter-list">
        <div v-for="(filterList, filterIndex) in remainFilter"
             :key="filterIndex">
          <div class="filter-box">
            <div class="f-key"><strong>{{ filterNames[filterIndex] }}</strong></div>
            <div class="column-divider"></div>
            <div class="f-items">
              <div class="f-item"
                   @click="clickFilter(filterIndex, item)"
                   v-for="(item, i) in filterList"
                   :key="i">
                <a>{{ item }}</a>
              </div>
            </div>
          </div>
          <div class="row-divider"></div>
        </div>
      </div>
      <div class="top-ban">
        <!--排序条件-->
        <div class="sort-items">
          <div class="sort-item"
               v-for="(item, i) in sortItems"
               :key="i">
            <a :class="{ selected: params.sortBy === item.key }"
               @click="params.sortBy=item.key">{{ item.text }}</a>
          </div>
        </div>
        <!--分页条-->
        <div class="top-pagination">
          <span>共搜索到<strong style="color: black;padding:0px 5px">{{ total }}</strong>项</span>
          <a class="btn-arrow"
             style="display: inline-block"
             @click="prePage">&lt;</a>
          <span><strong style="color: black">{{ params.page }}</strong>/{{ totalPage }}</span>
          <a class="btn-arrow"
             style="display: inline-block"
             @click="nextPage">&gt;</a>
        </div>
      </div>
      <div class="row-divider"
           style="margin-bottom: 5px; width: 100%"></div>
      <!--宠物列表-->
      <div style="display: flex; justify-content: space-between;">
        <div class="pet-list">
          <div class="pet-box"
               v-if="isNull === false"
               v-for="pet in pets"
               :key="pet.id"
               style="display: flex; justify-content: space-between;">
            <div style="width: 0;"></div>
            <div style="width: 25%"><img width="100%"
                   :src="getImage(pet.image)"></div>
            <div class="pet-info"
                 style="color: black;">
              <div class="pet-name"><span>宠物昵称：{{ pet.nickName }}</span></div>
              <div class="pet-varietiesName"><span>品种： {{ pet.petVarietiesName }}</span></div>
              <div class="pet-age"><span>年龄： {{ pet.age }} 个月</span></div>
              <div class="pet-sex"><span>性别： {{ pet.sex == 0 ? '母' : '公'}}</span></div>
              <div class="pet-description"
                   style="height: 48px;overflow: hidden;">
                <span>描述： {{ pet.description}}</span>
              </div>
            </div>
            <div style="text-align: center; width: 140px; height: 240px; display: flex; align-content: center; flex-wrap: wrap;">
              <div v-if=" pet.status == '0' ">
                <el-button type="primary"
                           @click="open(pet.id)">申请领养</el-button>
              </div>
              <div v-else>
                <el-button :disabled=" pet.status == '1' "
                           type="info">申请领养
                </el-button>
                <div class="order"> 该宠物已被领养</div>
              </div>
            </div>
          </div>
          <div class="pet-box"
               v-if="isNull === true"
               style="text-align: center;">
            <p> 暂 无 宠 物 </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 领养表单 -->
    <el-dialog title="领养申请"
               :visible.sync="dialogFormVisible">
      <el-form :model="adopt">
        <el-form-item label="领养的宠物Id"
                      label-width="100px">
          <el-input v-model="adopt.petId"
                    autocomplete="off"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="领养人Id"
                      label-width="100px">
          <el-input v-model="adopt.userId"
                    autocomplete="off"
                    disabled></el-input>
        </el-form-item>
        <el-form-item label="领养描述"
                      label-width="100px">
          <el-input v-model="adopt.description"
                    type="textarea"
                    :rows="2"
                    placeholder="请填写您领养的描述"
                    autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogFormVisible = false; petAdopt(adopt)">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
const axios = require('axios')
export default {
  data () {
    return {
      /**  */
      /** 过滤条件的数据 */
      filterNames: {
        varietiesName: "类型",
        petVarietiesName: "品种",
      },
      filterList: {
        "varietiesName": [""],
        "petVarietiesName": [""]
      }, // 过滤项
      /** 排序的数据 */
      sortItems: [{
        key: "default",
        text: "默认",
      }, {
        key: "timeDesc",
        text: "时间降序",
      }], // 排序字段
      pets: [], // 宠物数据
      total: 0, // 总条数
      totalPage: 0, // 总页数
      /** 参数的数据 */
      params: {
        key: "", // 搜索关键字
        page: 1, // 当前页码
        pageSize: 5, // 每页大小
        sortBy: "default", // 排序字段
        filters: {}, // 过滤字段
      },
      isNull: true,
      /** 申请领养数据 */
      dialogFormVisible: false,
      adopt: {
        petId: '',
        userId: '',
        description: '',
      },
    }
  },
  watch: {
    "pets" () {
      if (this.pets.length === 0) {
        this.isNull = true;
      } else if (this.pets.length > 0) {
        this.isNull = false;
      }
    },
    "params.sortBy" () {
      // 每当page改变，当前代码就会执行。搜索一下
      this.search();
    },
    "params.page" () {
      // 每当page改变，当前代码就会执行。搜索一下
      this.search();
    },
    "params.filters": {
      deep: true,
      handler () {
        // 获取过滤项
        this.getFilter();
        // 搜索数据
        this.search();
      }
    },
  },
  created () {
    // 页面加载时，先搜索一下
    this.search();
    // 获取过滤项
    this.getFilter();
  },
  methods: {
    /** 搜索框方法 */
    handleSearch () {
      this.search();
    },
    /** 过滤方法 */
    getFilter () {
      // 准备参数
      const {
        filters: { ...fs }, ...params
      } = this.params;
      for (let _k in fs) {
        params[_k] = fs[_k];
      }
      axios.post("/varieties/filters", params).then(res => {
        this.filterList = res.data.data;
        console.log(res)
      }).catch(err => {
        console.log(err);
      })
    },
    clickFilter (key, option) {
      const {
        ...obj
      } = this.params.filters;
      obj[key] = option;
      this.params.filters = obj;
    },
    deleteFilter (k) {
      const {
        ...obj
      } = this.params.filters;
      delete obj[k];
      this.params.filters = obj;
    },
    /** 搜索数据的方法 */
    search () {
      // 准备参数
      const {
        filters: { ...fs }, ...params
      } = this.params;
      for (let _k in fs) {
        params[_k] = fs[_k];
      }
      axios.post("/pet/list", params).then(res => {
        this.pets = res.data.data.records || [];
        this.total = res.data.data.total;
        this.totalPage = Math.floor((this.total + 5 - 1) / 5);
        console.log(res);
      }).catch(err => {
        console.log(err)
      })
    },
    /**  */
    petAdopt (adopt) {
      axios.post('adopt', adopt).then(res => {
        console.log(res)
        this.$message.success('提交成功！请耐心等待审批')
      }).catch(err => {
        this.$message.error('提交失败！请重试')
        console.log(err)
      })
    },
    getImage (image) {
      return `/common/download?name=${image}`
    },
    prePage () {
      if (this.params.page > 1) {
        this.params.page--
      }
    },
    nextPage () {
      if (this.params.page < this.totalPage) {
        this.params.page++
      }
    },
    /**  */
    open (petId) {
      const up = JSON.parse(localStorage.getItem('user'))
      if (up != null) {
        this.$confirm('您确定领养该宠物吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialogFormVisible = true
          this.adopt.userId = up.id
          this.adopt.petId = petId
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      } else {
        this.$confirm('您当前未登陆，是否登陆？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        })
      }
    },

    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
  },
  computed: {
    /** 过滤 */
    remainFilter () {
      // Object.keys() 遍历得到对象的每一个属性名
      let keys = Object.keys(this.params.filters);
      let obj = {};
      Object.keys(this.filterList).forEach(key => {
        if (this.filterList[key].length > 1) {
          obj[key] = this.filterList[key];
        }
      })
      return obj;
    },
  }
}
</script>

<style>
.pet {
  width: 70%;
  text-align: center;
  margin: auto;
}
.title {
  font-size: 24px;
  font: bolder;
  margin-top: 4%;
}
/** 搜索框样式 */
.center {
  width: 40%;
  margin: 2% auto;
}
#search {
  background-color: #ffc300;
  border-radius: 0%;
}

/** 过滤项样式 */
.selected {
  color: red;
}

.filter-list {
  padding: 5px 0;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.2);
}

.filter-box {
  display: flex;
  align-content: center;
  position: relative;
  line-height: 24px;
}

.f-key {
  font-size: 12px;
  color: #666;
  width: 10%;
  text-align: center;
  line-height: 60px;
}

.column-divider {
  width: 2px;
  border-radius: 1px;
  box-shadow: 1px 0 0 rgba(0, 0, 0, 0.2) inset,
    -1px 0 0 rgba(255, 255, 255, 0.2) inset;
}

.row-divider {
  margin: auto;
  width: 98%;
  border-radius: 1px;
  height: 3px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.2) inset,
    0 -1px 0 rgba(255, 255, 255, 0.2) inset;
}

a {
  text-decoration: none;
  color: #999;
}

a:hover {
  color: #f80;
}

.f-items {
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}

.f-item {
  width: 10%;
  line-height: 30px;
  font-size: 12px;
  cursor: pointer;
}

.sort-item {
  display: inline;
  width: 70px;
  float: left;
  font-size: 16px;
  cursor: pointer;
}

.selected-ops {
  display: flex;
  align-items: center;
}

.close {
  margin-left: 8px;
  font-size: 16px;
  font-weight: 800;
}

.open {
  font-size: 16px;
  margin-left: 10px;
  line-height: 24px;
  margin-bottom: 3px;
}

.selected-op {
  border: 1px solid #eee;
  border-radius: 3px;
  font-size: 16px;
  margin-left: 10px;
  line-height: 16px;
  background: #fff;
  padding: 0.5%;
  margin-bottom: 0.5%;
}

.selected-op:hover {
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.1);
}

.selected-op span {
  color: red;
  cursor: pointer;
}

.top-ban {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.top-pagination {
  padding: 5px 15px;
  font-size: 16px;
  font-weight: 700;
  line-height: 18px;
  color: #999;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
}

.top-pagination span {
  margin: 10px;
}
.top-pagination a {
  cursor: pointer;
}
/** 宠物数据样式 */
.pet-info {
  text-align: left;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.pet-name {
  font-size: 18px;
  color: #333;
  font-weight: bold;
  font-family: "Helvetica Neue", "Arial", "PingFang SC", "SimSun", sans-serif;
  line-height: 26px;
}

.pet-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.pet-list span {
  font-size: 16px;
}

.order {
  color: #ff0000;
  cursor: default;
  font: 16px/1.5 tahoma, arial, "Hiragino Sans GB", \5b8b\4f53, sans-serif;
}

.address {
  margin-bottom: 10px;
  font: 16px/1.5 tahoma, arial, "Hiragino Sans GB", \5b8b\4f53, sans-serif;
}

.pet-box {
  padding: 20px;
  margin-bottom: 10px;
  position: relative;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.2);
}

.pet-box:hover {
  box-shadow: 0 1px 3px 1px rgba(245, 131, 8, 0.3);
}
</style>