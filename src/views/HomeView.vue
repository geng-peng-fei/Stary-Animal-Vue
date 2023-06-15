<template>
  <el-container>
    <el-header>
      <Nav class="nav"></Nav>
    </el-header>
    <el-main>
      <GoTop></GoTop>
      <router-view></router-view>
      <Chat></Chat>
      <EditBlog></EditBlog>
    </el-main>
    <el-footer height="200px"
               style="background-color: rgb(47, 47, 47);
            color: white;
            font-size: 14px;">
      <Footer></Footer>
    </el-footer>
  </el-container>
</template>

<script>
import Nav from '@/components/Nav.vue'
import Footer from '@/components/Footer.vue'
import GoTop from '@/components/GoTop.vue'
import Chat from '@/components/Chat.vue'
import EditBlog from "@/components/EditBlog.vue";

export default {
  components: {
    Nav,
    Footer,
    GoTop,
    Chat,
    EditBlog
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
.el-header,
.el-main,
.el-footer {
  height: 100%;
  padding: 0;
}

.nav {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
}
</style>