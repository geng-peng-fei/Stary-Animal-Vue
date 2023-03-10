<template>
  <div class="container">
    <!-- 侧边栏 -->
    <div class="sidebar">
      <section>
        <header>
          <img src="/images/face/face0.jpeg"
               class="avatar">
        </header>
        <nav>
          <router-link to="chat"
                       class="icon iconfont icon-msg active"></router-link>
          <router-link to="friends"
                       class="icon iconfont icon-friend"></router-link>
        </nav>
        <footer>
          <i class="icon iconfont icon-more"></i>
        </footer>
      </section>
    </div>
    <div class="main">
      <!-- 聊天窗口 -->
      <!-- 主内容区 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import '../assets/css/chat.less'

export default {
}
</script>