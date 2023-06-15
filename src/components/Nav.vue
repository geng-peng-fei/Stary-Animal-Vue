<template>
  <el-menu :default-active="activeIndex"
           class="el-menu"
           mode="horizontal"
           router
           @select="handleSelect">
    <el-menu-item id="logo">Stray Animal</el-menu-item>
    <el-menu-item index="index">主页</el-menu-item>
    <el-menu-item index="pet">宠物</el-menu-item>
    <el-menu-item index="active">活动</el-menu-item>
    <el-menu-item index="blogHome">论坛</el-menu-item>
    <!--      <el-menu-item index="">选项2</el-menu-item>-->
    <el-menu-item index="about">关于我们</el-menu-item>
    <el-menu-item v-if="isLogin === false"
                  @click="goLogin()">
      <el-avatar style="font-size: 12px">未登录</el-avatar>
    </el-menu-item>
    <el-submenu v-else>
      <template slot="title">
        <el-avatar v-if="isPictureNull === false"
                   :src="getImage(userPicture)"></el-avatar>
        <el-avatar v-else
                   :src="circleUrl"></el-avatar>
      </template>
      <el-menu-item index="user"
                    id="userCenter">个人中心
      </el-menu-item>
      <el-menu-item index="userAdoptCenter"
                    id="userCenter">领养中心
      </el-menu-item>
      <el-menu-item @click="loginOut()"
                    id="userCenter">退出登录
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      activeIndex: 'index',
      userPicture: '',
      isLogin: false,
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      isPictureNull: true
    }
  },
  created() {
    this.activeIndex = window.location.href.replace(window.location.origin, '').replace("/", "").toString()
    if (localStorage.getItem('user') != null) {
      this.userPicture = JSON.parse(localStorage.getItem('user')).picture
      this.isPictureNull = (JSON.parse(localStorage.getItem('user')).picture === null)
      this.isLogin = true
    } else {
      this.isLogin = false
    }
  },
  watch: {
    'activeIndex'() {
      this.activeIndex = window.location.href.replace(window.location.origin, '').replace("/", "").toString()
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      this.activeIndex = keyPath
    },
    /** 登出 */
    loginOut() {
      const user = JSON.parse(localStorage.getItem('user'))
      axios.post(`/user/${user.token}`).then(res => {
        if (res.data.success === true) {
          localStorage.removeItem("user")
          this.$router.push('/login') //页面跳转
        }
      })
    },
    /** 跳转登陆 */
    goLogin() {
      this.$router.push('/login')
    },
    /** 下载图片 */
    getImage(image) {
      return `/common/download/user?name=${image}`
    },
  }
}
</script>

<style>
.el-menu {
  padding: 0px;
}

.el-menu .el-menu-item {
  width: 5%;
  padding: 0px;
}

#logo {
  width: 20%;
  margin-right: 45%;
  color: red;
  font-weight: bolder;
  font-size: 24px;
}

.el-menu > .el-menu-item:last-child {
  margin-left: 2%;
}

.el-menu-item [class^="el-icon-"] {
  padding: 0;
  border: 0;
}

.el-submenu__title i::before {
  display: none;
}

.el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
  min-width: 100px !important;
}

#userCenter {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
</style>