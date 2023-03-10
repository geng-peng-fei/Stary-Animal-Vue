<template>
  <div>
    <!-- 轮播图 -->
    <el-carousel class="el-carousel"
                 :height="screenHeight"
                 indicator-position="outside">
      <el-carousel-item v-for="item in imageList"
                        :key="item.id">
        <img :src="item.src"
             style="width:100%; height:100%" />
      </el-carousel-item>
    </el-carousel>
    <!-- 关于我们 -->
    <el-card class="aboutUs">
      <span style="font-size:28px;  font-weight: bold; width:100%; display:block; text-align:center;">关 于 我 们</span>
      <el-card style="margin:5%">
        <el-row>
          <el-col :span="24">流浪动物救助平台是由一群爱护动物的人自发的公益性网站。我们平台致力于流浪动物的保护，为适合的爱护动物人士找到他们所需要的动物。</el-col>
          <el-col :span="24">如果您觉得自己是一位合格的爱护动物的人或者想为保护流浪动物尽一份绵薄之力。</el-col>
          <el-col :span="24">我们欢迎每一位爱护动物，志同道合的朋友。</el-col>
          <el-col :span="24">
            <router-link to="/about">
              <el-button type="primary">了解更多</el-button>
            </router-link>
          </el-col>
        </el-row>
      </el-card>
    </el-card>
    <!-- 公告/信息 -->
    <el-card>
      <span style="font-size:28px;  font-weight: bold; width:100%; display:block; text-align:center;">板 块</span>
      <el-card class="pet-box-card"
               style="margin:5%">
        <template #header>
          <div class="pet-card-header">
            <span class="card-title">宠 物</span>
            <el-button class="more"
                       style="float:right"
                       @click="toPet">更 多</el-button>
          </div>
        </template>
        <div>
          <div v-for="item in petList"
               :key="item.id"
               class="item">
            <img :src="getImage(item.image)">
          </div>
        </div>
      </el-card>
      <el-card class="active-box-card"
               style="margin:5%">
        <template #header>
          <div class="active-card-header">
            <span class="card-title">活 动</span>
            <el-button class="more"
                       style="float:right"
                       @click="toActive">更 多</el-button>
          </div>
        </template>
        <div>
          <div v-for="item in activeList"
               :key="item.id"
               class="item">
            <img :src="getImage(item.image)">
          </div>
        </div>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      screenHeight: document.documentElement.clientHeight + 'px',
      imageList: [
        { id: 1, src: require('../assets/bg.jpg') },
        { id: 2, src: require('../assets/bg1.jpg') },
        { id: 3, src: require('../assets/bg2.jpg') },
        { id: 4, src: require('../assets/bg3.jpg') }
      ],
      petList: [],
      activeList: []
    }
  },
  created () {
    window.onresize = () => {
      return (() => {
        this.screenHeight = document.documentElement.clientHeight + 'px'
      })
    },
      this.init()
  },
  methods: {
    init () {
      axios.post('/pet/listWu').then(res => {
        this.petList = res.data.data
      })
      axios.post('/active/listWu').then(res => {
        this.activeList = res.data.data
      })
    },
    toActive () {
      this.$router.push('/active')
    },
    toPet () {
      this.$router.push('/pet')
    },
    getImage (image) {
      return `/common/download?name=${image}`
    },
  }
}
</script>

<style>
.el-carousel {
  width: 100%;
}

.aboutUs .el-row .el-col {
  margin: 1% 0;
}

.pet-card-header,
.active-card-header {
  height: 32px;
  line-height: 32px;
  text-align: left;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
}

.item {
  width: 20%;
  float: left;
  margin: 0 0 1% 0;
}

.item img {
  width: 90%;
}
</style>