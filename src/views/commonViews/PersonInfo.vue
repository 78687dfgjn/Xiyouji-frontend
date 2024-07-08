<style scoped>
.el-form {
  width: 50%;
  margin: 0 auto;
}

.avatar-uploader {
  width: 60%;
}

.avatar-uploader {
  margin-left: 30%;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  //position: relative;
  overflow: hidden;
}

.avatar-uploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  //text-align: center;
}

.avatar {
  width: 100%;
  height: 100%;
  display: block;
  //margin-left: 190px;
}


</style>
<template>
  <div>
    <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
    >
      <el-upload
          class="avatar-uploader"
          :headers="myHeaders"
          action="http://8.138.10.52:6060/upload/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
      >
        <img
            v-if="ruleForm.avatar"
            :src="ruleForm.avatar"
            class="avatar"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form-item label="昵称" prop="adminName">
        <el-input v-model="ruleForm.nickname" clearable></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="adminAccount">
        <el-input v-model="ruleForm.account" clearable></el-input>
      </el-form-item>

      <el-form-item label="手机号码" prop="contactNumber">
        <el-input v-model="ruleForm.phoneNumber" clearable></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="adminEmail">
        <el-input v-model="ruleForm.email" clearable></el-input>
      </el-form-item>

      <!-- <el-form-item label="用户性别" prop="sex">
        <template>
          <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
          <el-radio v-model="ruleForm.sex" label="0">女</el-radio>
        </template>
      </el-form-item> -->

      <el-form-item label="所属地区" prop="region">
        <el-cascader
            v-model="districtValue"
            placeholder="请选择所属地区"
            :options="districtOptions"
            filterable
        ></el-cascader>
      </el-form-item>

      <!-- <el-form-item label="生日">
        <el-col :span="11">
          <el-form-item prop="birthday">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.birthday"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
        >确认修改
        </el-button
        >
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "PersonInfo",
  data() {
    return {
      districtValue: [],
      ruleForm: {},
      myHeaders: {
        token: localStorage.getItem("accountData") ? JSON.parse(localStorage.getItem("accountData")).token : null,
      },
      districtOptions: [],
    };
  },
  watch: {
    deep: true,
    districtValue(newValue, oldValue) {
      // this.ruleForm.districtId = newValue[2];
      // console.log(newValue, oldValue);
    },
  },
  mounted() {
    this.getAdmin();
  },
  methods: {
    handleCancel() {
      this.ruleForm = {...this.$store.state.info};
    },
    getDistrict() {
      this.request.get("/account/district").then((res) => {
        res.data.forEach((item) => {
          // 查找省份对象是否已存在
          let provinceObj = this.districtOptions.find(
              (option) => option.label === item.province
          );
          if (!provinceObj) {
            // 如果省份对象不存在，则创建省份对象并添加到数组中
            provinceObj = {
              value: item.province,
              label: item.province,
              children: [],
            };
            this.districtOptions.push(provinceObj);
          }

          // 查找城市对象是否已存在
          let cityObj = provinceObj.children.find(
              (option) => option.label === item.city
          );
          if (!cityObj) {
            // 如果城市对象不存在，则创建城市对象并添加到省份的children数组中
            cityObj = {
              value: item.city,
              label: item.city,
              children: [],
            };
            provinceObj.children.push(cityObj);
          }

          // 创建区县对象并添加到城市的children数组中
          cityObj.children.push({
            value: item.id,
            label: item.county,
          });
        });
        // console.log(this.districtOptions);
      });
    },
    handleAvatarSuccess(res, file) {
      //上传文件不过拦截器，所以res.data.data才是url
      // console.log(res.data.data)
      this.ruleForm.avatar = res.data;

      // this.$store.state.info = this.ruleForm;
      // localStorage.setItem("admin", JSON.stringify(this.ruleForm));
      // this.submitForm();
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt8M = file.size / 1024 / 1024 < 8;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt8M) {
        this.$message.error("上传头像图片大小不能超过 8MB!");
      }
      return isJPG && isLt8M;
    },
    submitForm() {
      this.request
          .post("/account", this.ruleForm)
          .then((res) => {
            if (res) {
              // console.log(res);
              const obj = {
                id: this.ruleForm.id,
                account: this.ruleForm.account,
                nickname: this.ruleForm.nickname,
                avatar: this.ruleForm.avatar,
                identity: this.ruleForm.identity,
                token: localStorage.getItem("accountData") ? JSON.parse(localStorage.getItem("accountData")).token : null,
              }
              localStorage.setItem(
                  "accountData",
                  JSON.stringify(obj)
              );
              this.$store.state.info = {...obj}
              this.$message.success("更新信息成功");
              // this.getAdmin();
            } else {
              this.$message.error("保存失败");
            }
          })
          .catch((e) => {
            console.log(e);
          });
    },
    getAdmin() {
      // console.log(this.ruleForm.adminId);
      const id = localStorage.getItem("accountData")
          ? JSON.parse(localStorage.getItem("accountData")).id
          : null;
      if (id) {
        this.request.get("/account", {
          params: {
            id: id,
          }
        }).then((res) => {
          // delete res.data.password
          // this.$store.state.info = {...res};
          this.ruleForm = {...res.data};
          // localStorage.setItem("accountData", JSON.stringify(this.ruleForm));
        })
      }
    },
  },
};
</script>
