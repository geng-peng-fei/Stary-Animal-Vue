<template>
  <!--中间内容-->
  <div class="container" style="margin-bottom: 50px;">
    <div>
      <div style="width: 50%; height: 50px; margin: 20px auto; line-height: 50px;">
        最新文章
      </div>
      <!--博文列表-->
      <el-card v-for="blog in blogs" :key="blog.id" @click="goBlog(blog.id)"
               style="width: 70%; height: 150px; margin: 0 auto 20px; padding: 15px 30px; position: relative;">
        <!--博文信息-->
        <div style="width: 90%; position: absolute">
          <h3 style="text-align: left;cursor: pointer;" @click="goBlog(blog.id)">
            <span>{{ blog.title }}</span>
          </h3>
          <p style="overflow: hidden; text-overflow: ellipsis;
          display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;
          margin: 10px 0 20px 0; text-align: left; cursor: pointer">
            {{ blog.content }}
          </p>
          <div style="height: 40px; bottom: 10px">
            <div class="" style="height: 40px; width: 20%; display:inline-block; position: absolute; left: -90px; ">
              <el-avatar :src="getImage(blog.userImg)" style="cursor: pointer"></el-avatar>
              <span style="line-height: 40px; position: absolute; margin: 0 0 0 15px; cursor: pointer">{{ blog.nickName }}</span>
            </div>
            <div style="height: 40px;width: 50%; display:inline-block; position: absolute; right: -20px;">
              <span style="line-height: 40px;  cursor: pointer"> <i class="el-icon-timer"></i> {{
                  getTime(blog.dataTime)
                }}</span>
              <span style="line-height: 40px; margin: 0 10px;  cursor: pointer"><i
                  class="el-icon-view"></i> {{ blog.look }} </span>
              <span style="line-height: 40px;  cursor: pointer"><i
                  class="el-icon-chat-dot-round"></i> {{ blog.commentNum }} </span>
            </div>
          </div>
        </div>
        <!--博文图片-->
<!--        <div class="blogImage" v-show="blog.picture !== null"-->
<!--             style="width: 25%; position: absolute; right: 0; bottom: 15px; cursor: pointer">-->
<!--          <el-image-->
<!--              style="width: 200px; height: 150px"-->
<!--              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg">-->
<!--          </el-image>-->
<!--        </div>-->
      </el-card>
      <!--分页-->
      <div>
        <el-pagination
            layout="total, prev, pager, next"
            @current-change="handleCurrentChange"
            :page-size="10"
            :total=total>
        </el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import {parseTime} from "@/utils/data";

export default {
  name: 'BlogView',
  data() {
    return {
      page: 1,
      total: 0,
      blogs: {},
    };
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      const params = {
        page: this.page,
        pageSize: 10,
      }
      axios.post('/blog/page', params).then(res => {
        if (res.data.success === true) {
          this.blogs = res.data.data.records || []
          this.total = res.data.data.total
        }
      })
    },
    goBlog(blogId) {
      const userId = JSON.parse(window.localStorage.getItem('user')).id
      axios.post(`/blog/${blogId}/${userId}`).then(res => {
        if (res.data.success === true) {
          this.$router.push('/blog/' + blogId)
        }else{
          this.$message.error('出现问题，请稍后再试!')
        }
      })
    },
    getImage(image) {
      return `/common/download/user?name=${image}`
    },
    getTime(date) {
      return parseTime(date, '{y}-{m}-{d}- {h}:{i}:{s}');
    },
    handleCurrentChange(val) {
      this.page = val
      this.init()
    }
  }
};
</script>

<style>

</style>