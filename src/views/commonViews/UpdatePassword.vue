<script>
export default {
  name: "UpdatePassword",
  data() {
    return {
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      }
    }
  },
  methods: {
    updatePassword() {

    }
  }
}
</script>

<template>
  <div class="outer-box">
    <el-form
        :model="passwordForm"
        ref="passwordForm"
        label-width="100px"
        class="demo-passwordForm"
    >
      <el-form-item label="原密码">
        <el-input v-model="passwordForm.oldPassword" clearable show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="passwordForm.newPassword" clearable show-password></el-input>
      </el-form-item>

      <el-form-item label="确认密码">
        <el-input v-model="passwordForm.confirmPassword" clearable show-password></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" @click="updatePassword()"
        >确认修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.outer-box {
  display: flex;
  justify-content: center;
  align-content: center;
}

.demo-passwordForm {
  width: 40vw;
  height: 40vh;
}
</style>
