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
          <el-image :src="pictureURL"></el-image>
        </div>
        <el-form-item label="昵称">
          <el-input v-model="user.nickName"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="user.name"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="user.sex"
                     style="width: 100%"
                     placeholder="请选择性别"
                     :disabled="true">
            <el-option label="男"
                       value="1"></el-option>
            <el-option label="女"
                       value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="user.age"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="user.telephone"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码">
          <el-input v-model="user.idCard"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.email"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="user.address"
                    :disabled="true"></el-input>
        </el-form-item>
        <el-button style="margin: 2%"
                   type="primary"
                   @click="goUpdate(user)">去 修 改</el-button>
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
        telephone: '',
        idcard: '',
        address: '',
        email: '',
      },
      pictureURL: '',
    }
  },
  created () {
    /**  */
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    this.getUserMessage(user.id)
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
    getImage (image) {
      return `/common/download?name=${image}`
    },
    goUpdate () {
      this.$router.push('/userUpdate')
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
.el-image {
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