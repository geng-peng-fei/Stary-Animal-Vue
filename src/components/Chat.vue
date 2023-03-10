<template>
  <div class="dialogue-wrapper">
    <div id="btn_open"
         @click="changeShow(),initWebpack()"
         v-show="!isShow"
         class="dialogue-support-btn">
      <i class="dialogue-support-icon"></i>
      <i class="dialogue-support-line"></i>
      <span class="dialogue-support-text">联系客服</span>
    </div>
    <div class="dialogue-main"
         v-show="isShow">
      <div class="dialogue-header">
        <div class="dialogue-service-info">
          <p class="dialogue-service-name"
             style="font-size: 16px;height: 40px;line-height: 40px;">流浪动物救助平台客服</p>
          <div style="font-size:20px; position: absolute; top: -10px; right: 0px; cursor: pointer;"
               @click="changeShow">
            <i class="el-icon-circle-close"></i>
          </div>
        </div>
      </div>
      <div id="dialogue_contain"
           class="dialogue-contain">
        <!-- <p class="dialogue-service-contain">
          <span class="dialogue-text dialogue-service-text">{{ }}</span>
        </p>
        <p class="dialogue-customer-contain">
          <span class="dialogue-text dialogue-customer-text">{{ }}</span>
        </p> -->
      </div>
      <div class="dialogue-submit">
        <p id="dialogue_hint"
           class="dialogue-hint">
          <span class="dialogue-hint-icon">!</span>
          <span class="dialogue-hint-text">发送内容不能为空</span>
        </p>
        <textarea id="dialogue_input"
                  class="dialogue-input-text"
                  placeholder="请输入您的问题，按Enter键提交（shift+Enter换行）"
                  v-model="msg"
                  @keyup.enter="sendMessage(msg)"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShow: false,
      type: 0,
      msg: '',
    }
  },
  methods: {
    changeShow () {
      this.isShow = !this.isShow
    },
    //初始化websocket
    initWebpack () {
      var clientName = " ";
      if (localStorage.getItem("user")) {
        this.type = 1;
        clientName = JSON.parse(localStorage.getItem("user"))
      } else {
        clientName = Math.floor(Math.random() * 100000)
      }
      //WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      const websocketURL = `ws://localhost:8081/ws/1/${clientName}`;
      //这里面的this都指向vue
      this.websocket = new WebSocket(websocketURL);
      this.websocket.onopen = this.websocketOnOpen;
      this.websocket.onmessage = this.websocketOnMessage;
      this.websocket.onclose = this.websocketOnClose;
      this.websocket.onerror = this.websocketOnError;
    },
    websocketOnOpen () {
      alert("WebSocket连接成功 —————— " + "当前时间" + new Date());
      console.log("WebSocket连接成功 —————— " + "当前时间" + new Date());
    },

    websocketOnMessage (msg) { //数据接收
      this.websocket.send(msg)
    },

    websocketOnClose () { //关闭
      alert("WebSocket连接关闭");
      console.log("WebSocket连接关闭");
      this.websocket.close();
    },

    websocketOnError (e) { //失败
      alert("WebSocket连接发生错误" + e);
      console.log("WebSocket连接发生错误" + e);
    },

  }
}
</script>

<style>
@charset "utf-8";
/*公共样式*/
html {
  font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}
body {
  -webkit-overflow-scrolling: touch;
  margin: 0;
}
a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: currentColor;
}
a,
dt,
dd {
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}
p {
  margin: 0;
}
input,
button,
select,
textarea {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  background-color: transparent;
}
/*css reset*/
body {
  position: relative;
}

.dialogue-wrapper {
  font-size: 14px;
  color: #fff;
}
/*右侧点击按钮*/
.dialogue-wrapper .dialogue-support-btn {
  position: fixed;
  display: inline-block;
  top: 50%;
  right: 0;
  margin-top: -70px;
  padding: 10px 0;
  width: 40px;
  height: 120px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: -1px 1px 5px rgba(0, 0, 0, 0.4);
  background-color: #5d94f3;
  z-index: 999;
}

.dialogue-wrapper .dialogue-support-btn .dialogue-support-icon {
  position: relative;
  display: inline-block;
  margin-bottom: -2px;
  width: 20px;
  height: 16px;
  border-radius: 4px;
  background-color: #fff;
}

.dialogue-wrapper .dialogue-support-btn .dialogue-support-icon:before {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -6px;
  margin-left: -3px;
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid #fff;
}

.dialogue-wrapper .dialogue-support-btn .dialogue-support-line {
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: #ddd;
}

.dialogue-wrapper .dialogue-support-btn .dialogue-support-text {
  padding: 5px 0;
  letter-spacing: 4px;
  writing-mode: vertical-rl;
  -webkit-user-select: none;
}

/*底部客服对话框*/
.dialogue-wrapper .dialogue-main {
  position: fixed;
  right: 10px;
  bottom: 100px;
  width: 400px;
  height: 600px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  z-index: 999;
}

/*客服对话框头部*/
.dialogue-wrapper .dialogue-main .dialogue-header {
  position: relative;
  padding: 10px;
  height: 50px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background-color: #5d94f3;
}

.dialogue-wrapper .dialogue-main .dialogue-service-info {
  position: relative;
  top: 50%;
  margin-top: -20px;
  height: 40px;
}

/*客服对话框内容*/
.dialogue-wrapper .dialogue-main .dialogue-contain {
  overflow-y: auto;
  padding: 10px;
  height: 400px;
  word-wrap: break-word;
  background-color: #f9f9f9;
}

.dialogue-wrapper .dialogue-main .dialogue-service-contain {
  margin-bottom: 10px;
  text-align: left;
}

.dialogue-wrapper .dialogue-main .dialogue-service-text {
  margin-left: 20px;
  display: inline-block;
  position: relative;
  padding: 10px;
  max-width: 120px;
  white-space: pre-wrap;
  border: 1px solid #09d07d;
  border-radius: 4px;
  background-color: #09d07d;
  box-sizing: border-box;
}
.dialogue-wrapper .dialogue-main .dialogue-customer-text {
  margin-left: 20px;
  display: inline-block;
  position: relative;
  padding: 10px;
  max-width: 120px;
  white-space: pre-wrap;
  border: 1px solid #2586da;
  border-radius: 4px;
  background-color: #2586da;
  box-sizing: border-box;
}
.dialogue-wrapper .dialogue-main .dialogue-service-text:before {
  content: "";
  position: absolute;
  top: 50%;
  left: -10px;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 10px solid #09d07d;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
}

.dialogue-wrapper .dialogue-main .dialogue-customer-contain {
  margin-bottom: 10px;
  text-align: right;
}

.dialogue-wrapper .dialogue-main .dialogue-customer-text {
  margin-right: 20px;
}

.dialogue-wrapper .dialogue-main .dialogue-customer-text:after {
  content: "";
  position: absolute;
  top: 50%;
  right: -10px;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 10px solid #2586da;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
}

/*客服对话框底部与输入*/
.dialogue-wrapper .dialogue-main .dialogue-submit {
  position: relative;
  padding: 10px;
  height: 100px;
  color: #000;
  word-wrap: break-word;
  border-top: 1px solid #ddd;
  box-sizing: border-box;
  background-color: #fff;
}

/*空输入提示*/
.dialogue-wrapper .dialogue-main .dialogue-hint {
  position: absolute;
  top: -15px;
  left: 20px;
  padding: 2px;
  width: 140px;
  height: 18px;
  opacity: 0;
  font-size: 12px;
  text-align: center;
  line-height: 18px;
  border: 1px solid #ddd;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  background-color: #fff;
}

.dialogue-wrapper .dialogue-main .dialogue-hint-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 5px;
  font-size: 14px;
  font-style: italic;
  font-weight: 700;
  vertical-align: middle;
  line-height: 18px;
  color: #fff;
  border-radius: 50%;
  background-color: #5d94f3;
}

.dialogue-wrapper .dialogue-main .dialogue-hint-text {
  display: inline-block;
  vertical-align: middle;
}

/*输入框*/
.dialogue-wrapper .dialogue-submit .dialogue-input-text {
  overflow-y: auto;
  display: inline-block;
  padding: 5px 0;
  width: 380px;
  height: 70px;
  vertical-align: middle;
  white-space: pre-wrap;
  word-wrap: break-word;
  resize: none;
  box-sizing: border-box;
}
</style>