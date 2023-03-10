<template>
  <div>
    <div class="banner">
      <div class="text">
        <p>和我们一起</p>
        <p>构建人与动物和谐相处的友善世界</p>
        <p>我们相信人与动物应该有更好的相处方式。我们致力于改变人与宠物相处的方式</p>
        <p>在更进一步的情况下，负责任地对人和宠物进行平衡调控</p>
        <p>与我们一起改变，见证人与动物的友好相处</p>
      </div>
    </div>
    <el-card class="box-card">
      <div class="clearfix">
        <span class="title">关 于 我 们</span>
      </div>
    </el-card>
    <el-card>
      <div class="about">
        <img id="img"
             src="../assets/bg1.jpg"
             alt="图片丢失了">
        <!-- <p style="font-weight: bolder">自我介绍</p> -->
        <p>流浪动物救助平台自2015年成立，当初只有几个志同道合的人临时组建的小团队，截止到现在，已逐渐发展成为当地相当大的的民间动物救助机构。我们是一个爱心人士自发组成的民间流浪动物救助的公益群体，流浪动物的救助、医疗、防疫、绝育、食粮、救助站基地水电等开支来源于几位主力义工及群友捐助、群体内或向社会发动、举办义卖活动而来。“公益不是一个人的全力以赴，而是绝大多数人的力所能及”。</p>
        <p>我们希望每个人和社会责任感的企业参与到公益的事业中来时，可以起到重要的引导和连接作用，发挥更大的公益效能。除了保护人不受动物的困扰，也要保护宠物不受人类的丢弃和虐待。动物和人一样，都有生命，每一个生命都值得我们去被理解和尊重，可以不爱，但不要去伤害。</p>
      </div>
    </el-card>
    <!-- 领养须知 -->
    <el-card class="box-card">
      <div class="clearfix">
        <span class="title">领 养 须 知</span>
      </div>
    </el-card>
    <el-card>
      <div style="text-align">
        <ul>
          <li>有足够的时间做基础的训练、照顾、陪伴。</li>
          <li>领养的动物严禁用于繁殖或其他任何商业用途。</li>
          <li>领养人征得家人的同意，都愿意接纳伴侣动物。</li>
          <li>遵守当地动物管理条例，办理相关证明，文明养宠。</li>
          <li>科学喂养、定时驱虫、适龄绝育、按时免疫、有病就医。</li>
          <li>有固定的住所，空间合适，室内养、不笼养、不散养在院子。</li>
          <li>领养人必须年满十八周岁,有稳定的收入，负担得起养宠的所有费用。</li>
          <li>严禁领养人以任何形式虐待动物，一经发现，协会将追回猫狗，并根据有关条例追究领养人的法律责任。</li>
          <li>不以任何借口遗弃领养动物（包括但不限于怀孕），如确实不能继续喂养，须与当地动物保护志愿者协会提前沟通。</li>
        </ul>
      </div>
      <div style="margin-top: 20px; color: red">请慎重考虑，考虑未来可能出现的各种情况（如搬家、结婚、怀孕、工作变动、工作时间过长、出差等）再决定是否领养，如果将领养的宠物用作其他用途，严重将依法追究法律责任！</div>
    </el-card>
    <!--联系我们 -->
    <el-card class="box-card">
      <div class="clearfix">
        <span class="title">联 系 我 们</span>
      </div>
    </el-card>
    <el-card class="clearfix">
      <el-card class="content_item">
        <i class="el-icon-location-outline"
           style="font-size: 45px;"></i>
        <h2>地址</h2>
        <p>上海市</p>
      </el-card>
      <el-card class="content_item">
        <i class="el-icon-phone-outline"
           style="font-size: 45px;"></i>
        <h2>电话</h2>
        <p>18437128867</p>
      </el-card>
      <el-card class="content_item">
        <i class="el-icon-message"
           style="font-size: 45px;"></i>
        <h2>邮箱</h2>
        <p>623318394@qq.com</p>
      </el-card>
      <el-card class="content_item">
        <i class="el-icon-monitor"
           style="font-size: 45px;"></i>
        <h2>网址</h2>
        <p>http://www.StaryAnimal.com</p>
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style>
.title {
  font-size: 28px;
  font-weight: bolder;
  color: black;
  text-shadow: 2px 2px 2px gray;
}

.banner {
  width: 100%;
  height: 800px;
  background-image: url(../assets/bg.jpg);
  background-repeat: no-repeat;
  color: white;
}

.banner p:nth-child(1),
.banner p:nth-child(2) {
  font-weight: bolder;
  font-size: 32px;
  text-shadow: 2px 2px 2px gray;
}

.text {
  width: 50%;
  position: relative;
  top: 10%;
  left: 5%;
}

.banner p {
  text-align: left;
  animation: enterEnter 2s 1 cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes enterEnter {
  0% {
    /* 加上文字间距 */
    letter-spacing: 1em;
    /* filter: blur(); 像素模糊效果 */
    filter: blur(12px);
    /* 透明度也要改变 */
    opacity: 0;
  }

  100% {
    filter: blur(0);
    opacity: 1;
  }
}

.about {
  font-size: 18px;
  line-height: 36px;
  text-align: left;
}
.about p {
  padding: 0.5% 2%;
}

#img {
  width: 50%;
  float: right;
  margin: 2%;
}

.content_item {
  width: 20%;
  float: left;
  margin: 5% 2%;
}

.content_item:first-child {
  margin-left: 3%;
}

.content_item h2 {
  margin: 5% 0;
}
</style>