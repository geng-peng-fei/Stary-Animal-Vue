<template>
  <div style="width: 90%; margin: 0 auto">
    <h1 style="margin: 50px auto">编 辑 文 章</h1>
    <el-form ref="editForm" status-icon :model="editForm" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="editForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="editForm.content"
                  :autosize="{ minRows: 5, maxRows: 20}"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()" style="margin: 20px 20px 0 0">发 布</el-button>
        <el-button>取 消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "EditBlog",
  components: {},
  data() {
    return {
      editForm: {
        title: '',
        content: ''
      },
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur'}
        ],
        content: [
          {required: true, message: '请输入内容', trigger: 'blur'}
        ]
      }
    }
  },
  created() {

  },
  methods: {

    //判断用户是否登录及文章发布
    submitForm() {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user == null) {
        this.$message.error("您未登录")
      }
      const params = {
        title: this.editForm.title,
        content: this.editForm.content,
        userId: user.id,
        look: 0,
        commentNum: 0
      }
      console.log(params)
      axios.post('/blog', params).then(res => {
        if (res.data.success === true) {
          this.$message.success("发布成功")
          this.$router.push('/blogHome')
        } else {
          this.$message.error("发布失败")
        }
      });
    }

  }
}
</script>
