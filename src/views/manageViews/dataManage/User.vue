<style scoped>

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 50%;
  margin-left: 30%;
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

  //line-height: 20%;
  //text-align: center;
}

.avatar {
  //width: 178px;
  //height: 178px;
  width: 100%;
  height: 100%;
  display: block;
}

/*.search {
    display: flex;
    justify-content: space-between;
}*/

</style>

<template>
  <div>
    <div class="search">
      <ul>

        <li>
          <el-input
              v-model="nickname"
              style="width: 200px"
              prefix-icon="el-icon-search"
              placeholder="请输入游客昵称"
          ></el-input>
        </li>
        <li class="mg-10">
          <el-input
              v-model="account"
              style="width: 200px"
              prefix-icon="el-icon-search"
              placeholder="请输入游客账号"
          ></el-input>
        </li>

        <li class="mg-10">
          <el-input
              v-model="province"
              style="width: 200px"
              prefix-icon="el-icon-search"
              placeholder="请输入游客省份"
          ></el-input>
        </li>

        <li>
          <el-date-picker
              v-model="dateTimeRange"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
          </el-date-picker>
        </li>

        <div class="func">
          <el-button type="primary" @click="search" class="mg-10"
          >搜索
          </el-button
          >
          <el-button type="warning" @click="reset">重置</el-button>
          <el-button type="primary" @click="save" size="small"
          >新增<i class="el-icon-circle-plus-outline"></i
          ></el-button>
          <el-badge :value="multipleSelection.length" class="item">
            <el-button
                type="danger"
                @click="multipleDel()"
                style="width: 110px; height: 40px; margin-left: 10px"
            >
              批量删除
              <i class="el-icon-remove-outline"></i>
            </el-button>
          </el-badge>
          <el-button type="primary" style="margin-left: 10px"
          >导入<i class="el-icon-remove-outline"></i
          ></el-button>
          <el-button type="primary"
          >导出<i class="el-icon-remove-outline"></i
          ></el-button>
        </div>
      </ul>
    </div>
    <el-table
        :data="tableData"
        ref="multipleTable"
        border
        stripe
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40"></el-table-column>
      <el-table-column prop="account" sortable label="账号" width="80">
      </el-table-column>
      <el-table-column
          prop="createTime"
          sortable
          label="创建日期"
          width="140"
          :formatter="formatDate"
      >
      </el-table-column>

      <el-table-column prop="nickname" label="用户昵称"></el-table-column>
      <el-table-column prop="sex" label="性别" width="60">
        <template slot-scope="scope">
          <!-- 使用 <img> 标签来显示头像 -->
          <el-tag v-if="scope.row.sex === 1">男</el-tag>
          <el-tag type="danger" v-else>女</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="avatar" label="用户头像" width="80">
        <template slot-scope="scope">
          <!-- 使用 <img> 标签来显示头像 -->
          <!-- <img
                  :src="scope.row.avatar"
                  alt="Avatar"
                  style="width: 50px; height: 50px"
                /> -->
          <el-avatar
              shape="square"
              :size="50"
              :src="scope.row.avatar"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="province" label="省份"></el-table-column>
      <el-table-column prop="city" label="城市"></el-table-column>
      <el-table-column prop="county" label="县区"></el-table-column>
      <el-table-column prop="state" label="账号状态">
        <template slot-scope="scope">
          <el-switch
              style="display: block; height: 100%"
              v-model="scope.row.state"
              @change="stateChange(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="正常"
              inactive-text="禁用"
          >
          </el-switch>
          <!-- <el-tag effect="dark" v-if="scope.row.state == 1">正常</el-tag>
                <el-tag effect="dark" type="danger" v-else>禁用</el-tag> -->
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" class="dif">
        <template slot-scope="scope">
          <el-button-group class="operation">
            <el-button type="success" @click="handleEdit(scope.row)">
              编辑<i class="el-icon-edit"></i>
            </el-button>
            <!-- <el-popconfirm
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    icon="el-icon-info"
                    icon-color="red"
                    title="确定删除该用户吗？
                    "
                    @confirm="singleDel(scope.row.id)"
                  > -->
            <el-button type="danger" @click="singleDel(scope.row.id)">
              删除<i class="el-icon-remove-outline"></i>
            </el-button>
            <!-- </el-popconfirm> -->
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          background
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      >
      </el-pagination>
    </div>

    <el-dialog
        title="新增用户"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
    >
      <el-form
          :model="ruleForm"
          :rules="rules"
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
          <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar"/>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form-item label="用户昵称" prop="nickname">
          <el-input v-model="ruleForm.nickname" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input v-model="ruleForm.phoneNumber" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" clearable></el-input>
        </el-form-item>

        <el-form-item label="用户密码" prop="password">
          <el-input
              placeholder="请输入密码"
              v-model="ruleForm.password"
              show-password
          ></el-input>
        </el-form-item>

        <el-form-item label="用户性别" prop="sex">
          <template>
            <el-radio v-model="ruleForm.sex" label="1">男</el-radio>
            <el-radio v-model="ruleForm.sex" label="0">女</el-radio>
          </template>
        </el-form-item>

        <el-form-item label="所属地区" prop="region">
          <el-cascader
              v-model="districtValue"
              placeholder="请选择所属地区"
              :options="districtOptions"
              filterable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="生日">
          <el-col :span="11">
            <el-form-item prop="createTime">
              <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="ruleForm.createTime"
                  style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
          >确定
          </el-button
          >
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      districtOptions: [],
      districtValue: [],
      multipleSelection: [],
      tableData: [],
      total: 0,
      pageSize: 5,
      pageNum: 1,
      nickname: "",
      account: "",
      province: "",
      centerDialogVisible: false,
      // userState: true,
      ruleForm: {
        nickname: "",
        phoneNumber: "",
        email: "",
        password: "",
        sex: "",
        district: {
          province: "",
          city: "",
          county: "",
        },
        districtId: null,
        birthday: "",
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      dateTimeRange: [],
      // dateTimeRange: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      rules: {
        nickname: [
          {required: false, message: "请输入用户昵称", trigger: "blur"},
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        phoneNumber: [
          {required: true, message: "请输入手机号码", trigger: "blur"},
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        email: [
          {required: false, message: "请输入用户邮箱", trigger: "blur"},
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          {required: true, message: "请输入用户密码", trigger: "blur"},
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],

        region: {
          province: [
            {
              required: false,
              message: "请选择用户所属省份",
              trigger: "change",
            },
          ],
          city: [
            {
              required: false,
              message: "请选择用户所属城市",
              trigger: "change",
            },
          ],
          county: [
            {
              required: false,
              message: "请选择用户所属县区",
              trigger: "change",
            },
          ],
        },
        birthday: [
          {
            // type: "date",
            required: false,
            message: "请选择用户创建时间",
            trigger: "change",
          },
        ],
      },
      // blankForm: {
      //   nickname: "",
      //   phoneNumber: "",
      //   email: "",
      //   password: "",
      //   sex: null,
      //   province: "",
      //   city: "",
      //   county: "",
      //   districtId: null,
      //   birthday: "",
      //   avatar: "",
      //   createTime: "",
      // },
      myHeaders: {
        token: localStorage.getItem("accountData") ? JSON.parse(localStorage.getItem("accountData")).token : null,
      },
    };
  },
  watch: {
    deep: true,
    districtValue(newValue, oldValue) {
      if (newValue[2]) {
        this.ruleForm.province = newValue[0];
        this.ruleForm.city = newValue[1];
        const arr = newValue[2].split("/");
        this.ruleForm.districtId = arr[0];
        this.ruleForm.county = arr[1];
      }
      // console.log(newValue, oldValue);
    },
  },
  methods: {
    handleAvatarSuccess(res, file) {
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
    save() {
      //防止浏览器默认填密码行为
      // this.resetForm()
      const blankForm = {};
      for (let key in this.ruleForm) {
        blankForm[key] = ''
      }
      this.ruleForm = {...blankForm}
      // this.ruleForm = {...this.blankForm};
      // setTimeout(() => {
      //   this.ruleForm = {...this.blankForm};
      // }, 100);
      //防止新增时表不为空值
      //地区值（数组）不是每个用户的值
      this.districtValue = [];
      // this.ruleForm = { ...this.blankForm };
      this.centerDialogVisible = true;
    },
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach((row) => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    search() {
      this.fetchDate();
    },
    fetchDate() {
      this.request
          .get("/account/page", {
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              nickname: this.nickname,
              account: this.account,
              province: this.province,
              startTime: this.dateTimeRange[0],
              endTime: this.dateTimeRange[1]
            },
          })
          .then((res) => {
            this.tableData = res.data.records;
            this.tableData.forEach((ele) => {
              ele.state = ele.state == 1;
            });
            this.total = res.data.total;
          });
    },
    stateChange(row) {
      const accountObj = {
        id: row.id,
        state: row.state,
      };
      accountObj.state = accountObj.state ? 1 : 0;
      if (accountObj.state == 0) {
        this.$message({
          showClose: true,
          message: "已禁用用户：" + row.nickname,
          type: "warning",
        });
      } else {
        this.$message({
          showClose: true,
          message: "用户：" + row.nickname + "已解除禁用状态",
          type: "success",
        });
      }
      this.request.post("/account", accountObj);
    },

    handleEdit(row) {
      this.ruleForm = {...row};
      // delete this.ruleForm.state;
      this.ruleForm.sex = '' + this.ruleForm.sex
      this.districtValue = [
        this.ruleForm.province,
        this.ruleForm.city,
        this.ruleForm.districtId + "/" + this.ruleForm.county,
      ];
      this.centerDialogVisible = true;
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.fetchDate();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.fetchDate();
    },
    reset() {
      this.nickname = "";
      this.account = "";
      this.province = "";
      this.dateTimeRange = [];
      this.fetchDate();
    },

    multipleDel() {
      if (this.multipleSelection.length > 0) {
        this.$confirm("此操作将永久删除这些用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
            .then(() => {
              this.multipleSelection.forEach((ele) => {
                this.deleteUser(ele.id);
                // console.log(ele);
              });
              // this.$message({

              //   type: 'success',
              //   message: '删除成功!'
              // });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
      }
    },
    deleteUser(id) {
      this.request.delete("/account/" + id).then((res) => {
        if (res) {
          this.$message.success("删除成功");
          this.fetchDate();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    singleDel(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            this.deleteUser(id);
            // ruleForm;
            // this.$message({

            //   type: 'success',
            //   message: '删除成功!'
            // });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
    },

    submitForm(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          this.ruleForm.sex = +this.ruleForm.sex
          //修改用户对话框的不包含用户状态
          delete this.ruleForm.state;
          this.request.post("/account", this.ruleForm).then((res) => {
            // console.log(this.ruleForm);
            if (res) {
              // console.log(res);
              this.$message.success("保存成功");
              this.centerDialogVisible = false;
              this.fetchDate();
            } else {
              this.$message.error("保存失败");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    formatDate(row, column) {
      const timestamp = row[column.property];
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      // return `${year}-${month}-${day}`;
    },
    resetForm(ruleForm) {
      this.$refs[ruleForm].resetFields();
      this.districtValue = [];
    },
    // tableRowClassName({ row, rowIndex }) {
    //   console.log(row);
    //   if (!row.state) {
    //     return "warning-row";
    //   }
    //   return "";
    // },
    getDistrict() {
      // this.request.get("")
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
            value: item.id + "/" + item.county,
            label: item.county,
          });
        });
        // console.log(this.districtOptions);
      });
    },
  },
  created() {
    this.fetchDate();
    this.getDistrict();
  },
  mounted() {
    // console.log(this.$store.state.info);
  },
};
</script>


