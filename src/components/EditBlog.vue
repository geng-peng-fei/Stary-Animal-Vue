<template>
  <div class="EditBlog">
    <i href="javascript:void(0);"
       class="el-icon-edit"
       id="editBlog"
       name="back-top"
       @click="goEdit()"
    />
  </div>
</template>

<script>
export default {
  name: "EditBlog",
  data() {
    return {

    }
  },
  methods:{
    goEdit(){
      this.$router.push('/editBlog')
    }
  }
}
</script>

<style scoped>
#editBlog {
  height: 35px;
  width: 35px;
  position: fixed;
  right: 10px;
  bottom: 100px;
  line-height: 35px;
  font-size: 25px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 1px 1px 5px 1px #888888;
  cursor: pointer;
  z-index: 998;
}
</style>