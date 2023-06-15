<template>
  <div>
    <div>
      <!--内容-->
      <div>
        <div style="margin: 50px auto 0">
          <h1 style="margin-bottom: 30px"> {{ blog.title }} </h1>
          <div style="width: 700px; margin: 0 auto">
              <span>
                <i class="el-icon-timer"> {{ getTime(blog.dataTime) }} </i>
              </span>
            <span style="margin: 0 20px">
                  <i class="el-icon-view"> {{ blog.look }} </i>
              </span>
            <span>
                <i class="el-icon-chat-dot-round"> {{ blog.commentNum }}</i>
              </span>
          </div>
        </div>

        <el-divider class="header"></el-divider>

        <!--中间主要内容部分-->
        <div style="width: 80%; margin: 0 auto; text-align: left">
          {{ blog.content }}
        </div>

        <el-divider class="footer">已经到底了</el-divider>

        <div style="border-top: 1px solid black; padding: 10px; position: relative; margin-top: 30px">
          <div style="width: 95%; margin: 30px auto 0">
            <div class="field" style="display: flex">
              <el-avatar :src="getUserImage(userImage)"
                         style="height: 54px; width: 55px"></el-avatar>
              <el-input
                  type="textarea" :rows="2"
                  placeholder="请输入评论信息..." v-model="comment" style="margin: 0 20px">
              </el-input>
              <el-button type="primary" plain>
                <i class="el-icon-edit"> 发布 </i>
              </el-button>
            </div>
          </div>
          <!--评论区域列表-->
          <div style="margin: 20px auto 0; width: 95%;">
            <el-card style="max-width: 100%;  min-height: 300px">
              <h2 style="text-align: left">评 论 列 表</h2>
              <el-divider></el-divider>
              <div style="margin: 20px 0;  text-align: left;">
                <div style="padding: 10px 0; " v-for="(item, index) in commentData" :key="index">
                  <div style="display: flex">
                    <div style="width: 80px">
                      <el-avatar :size="50"
                                 :src="getUserImage(item.userPicture)"></el-avatar>
                    </div>
                    <div style="flex: 1">
                      <div>{{ item.userName }} <span style="margin-left: 10px">{{ item.createTime }}</span></div>
                      <div style="margin-top: 10px; color: #666">{{ item.content }}</div>
                      <div>
                        <el-button type="text" @click="centerDialogVisible = true">回复</el-button>
                        <el-button type="text" style="color: red">删除</el-button>
                      </div>

                      <!-- 回复列表 -->
                      <div v-if="item.subCommentList !== null"
                           style="background-color: aliceblue; padding: 10px; border-radius: 10px">
                        <div v-for="(sub, index) in item.subCommentList" :key="index">
                          <div style="padding:5px 0">
                            <div style="width: 40px; margin-right: 20px;display: inline-block">
                              <el-avatar :size="40"
                                         :src="getUserImage(sub.userPicture)"></el-avatar>
                            </div>
                            <div style="display: inline-block">
                              <span style="cursor: pointer">{{ sub.userName }}</span>
                              <span>
                                回复
                                <span style="color: cornflowerblue">@{{ sub.target }}</span>
                                <span style="color: #666; margin-left: 20px">{{ sub.content }}</span>
                              </span>
                              <span
                                  style="font-size: 14px; color: #666; margin: 4px 0 0 10px">{{ sub.createTime }}
                              </span>
                              <div>
                                <el-button type="text" @click="centerDialogVisible = true">回复</el-button>
                                <el-button type="text" style="color: red">删除</el-button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <el-divider></el-divider>
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
        title="回复"
        :visible.sync="centerDialogVisible"
        center>
      <el-input
          type="textarea" :rows="2"
          placeholder="请输入评论信息..." v-model="replay" style="margin: 0 20px">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {parseTime} from '@/utils/data'

export default {
  data() {
    return {
      userImage: '',
      blog: {},
      comment: '',
      comments: [],
      centerDialogVisible: false,
      replay: '',
      commentData: [{
        userPicture: '',
        userName: '',
        userId: '',
        createTime: '',
        content: '',
        pid: '',
        target: '',
        targetId: '',
        subCommentList: [{
          userPicture: '',
          userName: '',
          createTime: '',
          content: '',
          pid: '',
          target: '',
          targetId: '',
          userId: ''
        }]
      }]
    }
  },
  created() {
    this.init()
    this.getComment()
  },
  methods: {
    init() {
      this.userImage = JSON.parse(window.localStorage.getItem('user')).picture
      let blogId = window.location.pathname.substring(6)
      axios.get(`/blog/${blogId}`).then(res => {
        console.log(res)
        if (res.data.success === true) {
          this.blog = res.data.data
        }
      })
    },
    getComment() {
      let blogId = window.location.pathname.substring(6)
      axios.get(`/comment/list/${blogId}`).then(res => {
        if (res.data.success === true) {
          this.commentData = res.data.data
          console.log(res.data.data)
        }
      })
    },
    deleteComment() {
      if (localStorage.getItem('user') == null) {
        this.$message.error('当前未登录，不能执行删除操作')
      }
      axios.delete('/comment').then(res => {
        console.log(res)
        if (res.data.success === true) {
          this.$message.error('删除成功')
        } else {
          this.$message.error(res.data.msg)
        }
      })
    },
    replay() {

      axios.post().then(res => {
      })
    },
    getUserImage(image) {
      return `/common/download/user?name=${image}`
    },
    getTime(date) {
      return parseTime(date, '{y}年{m}月{d}日 {h}:{i}:{s} 周{a}');
    },
  }
}
</script>

<style lang="less">
.footer {
  margin: 100px 0;
}

.header {
  margin: 50px 0;
}
</style>