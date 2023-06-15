<template>
  <div style="width: 100%; height:100%">
    <!-- 侧边栏 -->
    <div class="sidebar"
         style="display: inline-block">
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
    <div class="container"
         style="display: inline-block; text-align: none">
      <div class="friend-wrapper">
        <!-- 搜索框 -->
        <div class="wrapper">
          <div class="search-wrapper">
            <input type="text"
                   class="searchInput"
                   placeholder="搜索">
            <i class="icon iconfont icon-search"></i>
            <!-- <div class="searchInput-delete"></div> -->
          </div>
        </div>
        <!-- 好友列表 -->
        <div class="friend-list">
          <ul>
            <li class="friend-item">
              <div class="list-title">新的朋友</div>
              <div class="friend-info"><img width="36"
                     height="36"
                     src="/images/newfriend.jpg"
                     class="avatar">
                <div class="remark">新的朋友</div>
              </div>
            </li>
            <li class="friend-item">
              <div class="list-title">A</div>
              <div class="friend-info"><img width="36"
                     height="36"
                     src="/images/face/face2.webp"
                     class="avatar">
                <div class="remark">阿玛尼</div>
              </div>
            </li>
            <li class="friend-item">
              <div class="list-title">B</div>
              <div class="friend-info active"><img width="36"
                     height="36"
                     src="/images/face/face3.webp"
                     class="avatar">
                <div class="remark">巴拉拉</div>
              </div>
            </li>
            <li class="friend-item">
              <div class="list-title">D</div>
              <div class="friend-info"><img width="36"
                     height="36"
                     src="/images/face/face10.webp"
                     class="avatar">
                <div class="remark">大佬</div>
              </div>
            </li>
            <li class="friend-item">
              <div class="list-title">F</div>
              <div class="friend-info"><img width="36"
                     height="36"
                     src="/images/face/face4.webp"
                     class="avatar">
                <div class="remark">法大大</div>
              </div>
            </li>
            <li class="friend-item">
              <div class="list-title">J</div>
              <div class="friend-info"><img width="36"
                     height="36"
                     src="/images/face/face5.webp"
                     class="avatar">
                <div class="remark">佳佳</div>
              </div>
            </li>
            <li class="friend-item noborder">
              <!---->
              <div class="friend-info"><img width="36"
                     height="36"
                     src="/images/face/face6.webp"
                     class="avatar">
                <div class="remark">叽叽叽叽</div>
              </div>
            </li>
            <li class="friend-item">
              <div class="list-title">M</div>
              <div class="friend-info"><img width="36"
                     height="36"
                     src="/images/face/face7.webp"
                     class="avatar">
                <div class="remark">喵喵喵</div>
              </div>
            </li>
            <li class="friend-item noborder">
              <!---->
              <div class="friend-info"><img width="36"
                     height="36"
                     src="/images/face/face8.webp"
                     class="avatar">
                <div class="remark">萌萌</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="friend-info">
        <!-- 好友详情 -->
        <div class="info-wrapper">
          <div class="friend-info">
            <div class="es-info">
              <div class="left">
                <div class="people">
                  <div class="nickname">巴拉拉</div>
                  <div class="gender-male"></div>
                </div>
                <div class="signature">两只小蜜蜂啊，飞到花丛中啊</div>
              </div>
              <div class="right">
                <img class="avatar"
                     width="60"
                     height="60"
                     src="/images/face/face3.webp">
              </div>
            </div>
            <div class="detInfo">
              <div class="remark"><span>备&nbsp;&nbsp;&nbsp;注</span>巴拉拉</div>
              <div class="area"><span>地&nbsp;&nbsp;&nbsp;区</span>北京 昌平</div>
              <div class="wxid"><span>微信号</span>goddlts</div>
            </div>
            <div class="send">
              <span>发消息</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/css/friend.less'
export default {

}
</script>

<style>
</style>