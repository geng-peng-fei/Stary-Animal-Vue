<template>
  <div class="back-top">
    <i href="javascript:void(0);"
       id="top"
       class="el-icon-top"
       name="back-top"
       @click="backTop"
       v-if="showBtn" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      showBtn: false, // 回到顶部，默认是false，就是隐藏起来
    }
  },

  created () {

  },
  mounted () {
    window.addEventListener("scroll", this.showBottom, true);
  },
  methods: {
    // 回到顶部
    showBottom () {
      let that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (scrollTop > 500) {
        this.showBtn = true;
      } else {
        this.showBtn = false;
      }
    },
    /** 回到顶部实现过程注解：
        1.获取当前页面距离顶部的距离
        2.计算出每次向上移动的距离，用负的滚动距离除以5，因为滚动的距离是一个正数，想向上移动就是一个减法
        3.用当前距离加上计算出的距离，然后赋值给当前距离，就可以达到向上移动的效果
        4.最后在移动到顶部的时候，清除定时器
        */
    backTop () {
      var timer = setInterval(function () {
        let osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        let isPeed = Math.floor(-osTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + isPeed;
        this.isTop = true;
        if (osTop === 0) {
          clearInterval(timer);
        }
      }, 20);
    },
  }
};
</script>

<style>
#top {
  height: 35px;
  width: 35px;
  position: fixed;
  right: 10px;
  bottom: 50px;
  line-height: 35px;
  font-size: 25px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 1px 1px 5px 1px #888888;
  cursor: pointer;
  z-index: 998;
}

.background-color {
  width: 100%;
  height: 80px;
  background-color: pink;
}
</style>

