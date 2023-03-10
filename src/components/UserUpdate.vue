<template>
  <div class="user">
    <el-card class="box-card"
             style="margin: 5% 0">
      <div slot="header"
           class="clearfix">
        <span>个人信息</span>
      </div>
      <el-form ref="user"
               :model="user"
               label-width="70px">
        <div class="userImage">
          <el-upload class="avatar-uploader"
                     action="/common/upload"
                     :show-file-list="false"
                     :on-success="handleAvatarSuccess"
                     :on-change="onChange"
                     ref="upload">
            <img v-if="pictureURL"
                 :src="pictureURL"
                 class="avatar">
            <i v-else
               class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <el-form-item label="昵称">
          <el-input v-model="user.nickName"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="user.sex"
                     style="width: 100%"
                     placeholder="请选择性别">
            <el-option label="男"
                       value="1"></el-option>
            <el-option label="女"
                       value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="user.age"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="user.telephone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="user.idCard"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="地址"
                      style="width: 94%">
          <el-input v-model="user.address"></el-input>
        </el-form-item>
        <el-button style="margin: 2%"
                   type="primary"
                   @click="updateUser(user)">修 改</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
const axios = require('axios')
export default {
  data () {
    return {
      user: {
        picture: '',
        nickName: '',
        name: '',
        sex: '',
        age: '',
        idCard: '',
        telephone: '',
        address: '',
        email: '',
      },
      pictureURL: '',
    }
  },
  created () {
    this.getUserMessage(JSON.parse(localStorage.getItem("user")).id)
  },
  methods: {
    getUserMessage (userId) {
      axios.post(`/user/userCenter/${userId}`).then(response => {
        console.log(response)
        this.user = response.data.data
        this.pictureURL = `/common/download?name=${response.data.data.picture}`
      }).catch(err => {
        console.log(err)
      })
    },
    updateUser (user) {
      if (!this.user.picture) {
        this.$message.error('请上传图片')
        return
      } else {
        axios.post('/user/update', user).then(response => {
          console.log(response)
          this.user = response.data.data
          if (response.data.success === true) {
            JSON.parse(localStorage.getItem("user")).picture = user.picture
            localStorage.setItem("user", user)
            console.log(JSON.parse(localStorage.getItem("user")).picture)
            this.$message.success("修改成功")
            this.$router.push("/index")
          } else {
            this.$message.error("修改失败")
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    /** 拼接down接口预览 */
    handleAvatarSuccess (response, file, fileList) {
      if (response.success !== true) {
      } else {
        this.pictureURL = `/common/download?name=${response.data}`
        this.user.picture = response.data
      }
    },
    /** 校验图片格式 大小 */
    onChange (file) {
      if (file) {
        const suffix = file.name.split('.')[1]
        const size = file.size / 1024 / 1024 < 2
        if (['png', 'jpeg', 'jpg'].indexOf(suffix) < 0) {
          this.$message.error('上传图片只支持 png、jpeg、jpg 格式！')
          this.$refs.upload.clearFiles()
          return false
        }
        if (!size) {
          this.$message.error('上传文件大小不能超过 2MB!')
          return false
        }
        return file
      }
    },
  },
}
</script>

<style>
.user {
  width: 70%;
  height: 100%;
  margin: 0 auto;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.el-form-item {
  width: 45%;
  margin: 2% 2%;
  float: left;
}
.el-form-item:last-child {
  width: 100%;
}
.el-form-item:last-child .label {
  margin-right: 0;
}
.el-radio-group {
  width: 100%;
  text-align: left;
}

.el-radio {
  margin-right: 10%;
}
</style>