<template>
  <div class="login">
    <div class="title">欢迎使用流浪动物救助平台</div>
    <el-form :model="loginForm"
             :rules="rules"
             ref="loginForm"
             class="loginForm">
      <el-form-item prop="checkPhone">
        <span slot="label">
          <span style="color: white">手机号</span>
        </span>
        <el-input v-model="loginForm.phone"
                  autocomplete="off"
                  type="text"></el-input>
      </el-form-item>
      <el-form-item prop="checkCode">
        <span slot="label">
          <span style="color: white">验证码</span>
        </span>
        <el-input class="code"
                  v-model="loginForm.code"
                  autocomplete="off"
                  type="text"></el-input>
        <el-button type="primary"
                   @click="getCode(loginForm.phone)">获取验证码</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="login(loginForm)"
                   style="margin-top: 5%">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const axios = require('axios')

export default {
  data () {
    return {
      loginForm: {
        phone: '',
        code: '',
      },
      rules: {
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
        ]
      },
    }
  },
  methods: {
    /** 获取验证码 */
    getCode (phone) {
      axios.post(`/user/code?phone=${phone}`).then(res => {
        console.log(res.data)
        if (res.data.success === true) {
          this.$message({
            type: 'success',
            message: '验证码为：' + res.data.data
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /** 登陆 */
    login (loginForm) {
      axios.post('/user/login', loginForm).then(res => {
        console.log(res)
        if (res.data.success === false) {
          this.$message.error('验证码或者手机号错误')
        } else if (res.data.data.status == '0') {
          this.$message.error("当前用户已被封禁")
          return
        } else {
          if (res.data.success === true) {
            this.$router.push('/index') //页面跳转
            localStorage.setItem("user", JSON.stringify(res.data.data))
          }
        }
      }).catch(err => {
        console.log(err)
      })
    },
  },
  /** 判断上次的页面这次刷新的路由是否一样，不一样才刷新 */
  mounted: function () {
    if (location.href.indexOf("#reloaded") == -1) {
      location.href = location.href + "#reloaded";
      location.reload();
    }
  },
}
</script>

<style>
body {
  background-image: url(/src/assets/bg.jpg);
  background-repeat: no-repeat;
}

.login {
  width: 50%;
  height: 50%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(139, 139, 139, 0.1);
  padding: 5%;
}

.title {
  text-align: center;
  font-size: 24px;
  color: white;
  height: 20%;
  margin: 0 0 5% 0;
  text-shadow: 2px 2px 2px gray;
}

.el-form {
  width: 50%;
  margin: 0 auto;
}

.el-input {
  width: 80%;
  float: left;
}

.code {
  width: 40%;
  margin-right: 5%;
}
</style>