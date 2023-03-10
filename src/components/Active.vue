<template>
  <el-card class="box-card">
    <div slot="header"
         class="clearfix">
      <span class="title">活 动 专 区</span>
    </div>
    <div class="active">
      <div class="center">
        <el-input v-model="params.key"
                  @keyup.enter.native="handleSearch"
                  placeholder="搜 索 活 动">
          <el-button slot="append"
                     icon="el-icon-search"
                     id="search"
                     @click="handleSearch"></el-button>
        </el-input>
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
      <!--列表-->
      <div style="display: flex; justify-content: space-between;">
        <div class="active-list">
          <div class="active-box"
               v-if="isNull == false"
               v-for="active in activeList"
               :key="active.id"
               style="display: flex; justify-content: space-between;">
            <div style="width: 0;"></div>
            <div style="width: 25%"><img width="100%"
                   :src="getImage(active.image)"></div>
            <div class="active-info"
                 style="color: black;">
              <div class="active-name"><span>活动名称：{{ active.name }}</span></div>
              <div class="active-varietiesName"><span>地点： {{ active.address }}</span></div>
              <div class="active-age"><span>时间： {{ active.startTime }} -- {{active.endTime}} </span></div>
              <div class="active-description"
                   style="height: 48px;overflow: hidden;">
                <span>描述： {{ active.description }}</span>
              </div>
            </div>
            <div style="text-align: center; width: 140px; height: 240px; display: flex; align-content: center; flex-wrap: wrap;">
              <div v-if=" active.status == '0' ">
                <el-button type="primary"
                           @click="open(active.id)">申请参加</el-button>
              </div>
              <div v-else>
                <el-button :disabled=" active.status == '1' "
                           type="info">申请参加
                </el-button>
                <div class="order"> 该活动未在活动期间 </div>
              </div>
            </div>
          </div>
          <div class="active-box"
               v-if="isNull == true"
               style="text-align: center;">
            <p> 暂 无 活 动 </p>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
const axios = require('axios')
export default {
  data () {
    return {
      activeList: [],
      /** 参数的数据 */
      params: {
        key: "", // 搜索关键字
        page: 1, // 当前页码
        pageSize: 5, // 每页大小
        sortBy: "default", // 排序字段
      },
      /** 排序的数据 */
      sortItems: [{
        key: "default",
        text: "默认",
      }, {
        key: "timeDesc",
        text: "时间降序",
      }],
      total: 0, // 总条数
      totalPage: 0, // 总页数
      isNull: true,
    }
  },
  created () {
    // 页面加载时，先搜索一下
    this.search();
  },
  methods: {
    /** 搜索框方法 */
    handleSearch () {
      this.search();
    },/** 搜索数据的方法 */
    search () {
      // 准备参数
      const { ...params } = this.params;
      axios.post("/active/list", params).then(res => {
        this.activeList = res.data.data.records || [];
        this.total = res.data.data.total;
        this.totalPage = Math.floor((this.total + 5 - 1) / 5);
        console.log(res);
      }).catch(err => {
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
    open (activeId) {
      const up = JSON.parse(localStorage.getItem('user'))
      if (up != null) {
        this.$confirm('您确定参加活动吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post(`/active/join?activeId=${activeId}&userId=${up.id}`).then(res => {
            console.log(res)
            if (res.data.success === true) {
              this.$message.success("恭喜你 参加成功")
            } else {
              this.$message.error("您已经参与此活动，请勿重复参加")
            }
          }).catch(err => {
            this.$message.error("参加失败 请稍后再试")
          })
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
  },
  watch: {
    "activeList" () {
      if (this.activeList.length === 0) {
        this.isNull = true;
      } else if (this.activeList.length > 0) {
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
  }
}
</script>

<style>
.active {
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
/**  */
.sort-item {
  display: inline;
  width: 70px;
  float: left;
  font-size: 16px;
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
.active-info {
  text-align: left;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.active-name {
  font-size: 18px;
  color: #333;
  font-weight: bold;
  font-family: "Helvetica Neue", "Arial", "PingFang SC", "SimSun", sans-serif;
  line-height: 26px;
}

.active-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.active-list span {
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

.active-box {
  padding: 20px;
  margin-bottom: 10px;
  position: relative;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.2);
}

.active-box:hover {
  box-shadow: 0 1px 3px 1px rgba(245, 131, 8, 0.3);
}

em {
  color: red;
}
</style>