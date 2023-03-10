<template>
  <div class="container">
    <div class="user-list">
      <!-- 搜索框 -->
      <div class="wrapper">
        <div class="search-wrapper">
          <input type="text"
                 class="searchInput"
                 placeholder="搜索">
          <!-- <i class="icon iconfont icon-search"></i> -->
          <!-- <div class="searchInput-delete"></div> -->
        </div>
      </div>
      <!-- 聊天用户列表 -->
      <div class="msg-list">
        <ul>
          <li class="session-list active">
            <div class="list-left">
              <img width="42"
                   height="42"
                   alt="美女"
                   src="/images/face/face1.webp"
                   class="avatar">
            </div>
            <div class="list-right">
              <p class="name">美女</p> <span class="time">08:00</span>
              <p class="last-msg">按回车可以发送信息，还可以给我发送表情哟</p>
            </div>
          </li>
          <li class="session-list">
            <div class="list-left">
              <img width="42"
                   height="42"
                   alt="帅哥"
                   src="/images/face/face2.webp"
                   class="avatar">
            </div>
            <div class="list-right">
              <p class="name">帅哥</p> <span class="time">12:09</span>
              <p class="last-msg">/:,@f/::-S
              </p>
            </div>
          </li>
          <li class="session-list">
            <div class="list-left">
              <img width="42"
                   height="42"
                   alt="大白机器人"
                   src="/images/face/robot.webp"
                   class="avatar">
            </div>
            <div class="list-right">
              <p class="name">大白机器人</p> <span class="time">20:01</span>
              <p class="last-msg">你有什么想知道的？</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="chat-list">
      <!-- 聊天内容区域 -->
      <div class="message">
        <!-- 聊天框头部 -->
        <header class="header">
          <div class="friendname">美女</div>
        </header>
        <div class="message-wrapper">
          <ul>
            <li class="message-item">
              <div class="time"><span>08:00</span></div>
              <div class="message-main">
                <img width="36"
                     height="36"
                     src="/images/face/face1.webp"
                     class="avatar">
                <div class="content">
                  <div class="text">亲爱的在么？</div>
                </div>
              </div>
            </li>
            <li class="message-item">
              <div class="time"><span>12:01</span></div>
              <div class="message-main">
                <img width="36"
                     height="36"
                     src="/images/face/face1.webp"
                     class="avatar">
                <div class="content">
                  <div class="text">晚上有空一起吃饭吧。</div>
                </div>
              </div>
            </li>
            <li class="message-item">
              <div class="time"><span>14:44</span></div>
              <div class="message-main self"><img width="36"
                     height="36"
                     src="/images/face/face0.jpeg"
                     class="avatar">
                <div class="content">
                  <div class="text">
                    没空，晚上加班！别打扰我！
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 消息发送区 -->
      <div class="send-text">
        <!-- emoji -->
        <!-- <div class="emoji">
              <i class="icon iconfont icon-look"></i>
              <div class="emojiBox">
                <li><img src="./images/emoji/100.gif"
                       data="/::)"></li>
                <li><img src="./images/emoji/101.gif"
                       data="/::~"></li>
                <li><img src="./images/emoji/102.gif"
                       data="/::B"></li>
              </div>
            </div> -->
        <!-- 发送消息框 -->
        <textarea></textarea>
        <div class="send">
          <span>发送(Enter)</span>
        </div>
        <div class="warn">
          <div class="description">不能发送空白信息</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/css/chat.less'

export default {
}
</script>