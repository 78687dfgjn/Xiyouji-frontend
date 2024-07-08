<template>
  <div>
    <!--
    新增或更新所用表单
    -->
    <el-dialog
        title="新增用户"
        :visible.sync="centerDialogVisible"
        width="30%"
        center
    >
      <el-form
          :model="infoForm"
          ref="infoForm"
          label-width="100px"
          class="demo-ruleForm"
      >
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="infoForm.categoryName" clearable></el-input>
        </el-form-item>
        <el-form-item label="日期时间">
          <el-form-item prop="createTime">
            <el-date-picker
                type="datetime"
                placeholder="选择日期时间"
                v-model="infoForm.createTime"
                style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('infoForm')"
          >确定
          </el-button
          >
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button @click="resetForm('infoForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="search">
      <ul>
        <li>
          <el-input
              v-model="categoryName"
              style="width: 200px"
              prefix-icon="el-icon-search"
              placeholder="请输入分类名称"
          ></el-input>
        </li>

        <li class="mg-10">
          <el-date-picker
              v-model="dateTimeRange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
          </el-date-picker>
        </li>
      </ul>
      <!--      功能区-->
      <div class="func">
        <el-button type="primary" @click="search" class="mg-10"
        >搜索
        </el-button
        >
        <el-button type="warning" @click="reset">重置</el-button>
        <el-button
            type="primary"
            @click="save"
            size="small"
        >新增<i class="el-icon-circle-plus-outline"></i
        ></el-button>
        <el-badge :value="multipleSelection.length" class="item">
          <el-button
              type="danger"
              @click="multipleDel()"
              style="width: 110px; height: 40px; margin-left: 10px"
          >批量删除<i class="el-icon-remove-outline"></i
          ></el-button>
        </el-badge>
        <el-button type="primary" style="margin-left: 10px"
        >导入<i class="el-icon-remove-outline"></i
        ></el-button>
        <el-button type="primary"
        >导出<i class="el-icon-remove-outline"></i
        ></el-button>
      </div>
    </div>
    <el-table
        :data="tableData"
        ref="multipleTable"
        border
        stripe
        @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="40"></el-table-column>

      <!--      <el-table-column prop="categoryId" sortable label="分类编号">-->
      <!--      </el-table-column>-->
      <el-table-column prop="categoryName" sortable label="分类名称">
        <template slot-scope="scope">
          <el-tag size="large" :type="randomTag()">{{
              scope.row.categoryName
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="createTime"
          sortable
          label="分类创建时间"
          :formatter="formatDate"
      >
      </el-table-column>
      <el-table-column label="操作" fixed="right" class="dif">
        <template slot-scope="scope">
          <el-button-group class="operation">
            <el-button type="success" @click="handleEdit(scope.row)">
              编辑<i class="el-icon-edit"></i>
            </el-button>

            <el-button type="danger" @click="singleDel(scope.row.id)">
              删除<i class="el-icon-remove-outline"></i>
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Category",
  created() {
    this.fetchData();
  },
  mounted() {
  },
  data() {
    return {
      /*
      通用属性
       */
      //表格数据
      tableData: [],
      //表格总行数
      total: 0,
      //每页的尺寸
      pageSize: 10,
      //当前页数
      pageNum: 1,
      // 控制对话框（新增，修改表单）
      centerDialogVisible: false,
      //时间范围选择器（一个数组两个值，起始值与结束值）
      dateTimeRange: [],
      //表单数据展示(每个页面不同)
      infoForm: {
        dateTimeRange: [],
        categoryName: '',
      },
      //用来装多选选中的数据
      multipleSelection: [],
      // 以上为通用
      categoryName: '',
      tagList: ["success", "", "info", "warning", "danger"],
    };
  },

  methods: {
    randomTag() {
      // 生成0到5之间的整数
      return this.tagList[Math.floor(Math.random() * 5)];
    },
    /*
    通用方法
     */

    //根据条件获取数据
    fetchData() {
      this.request
          .get(`/category/page`, {
            params: {
              pageNum: this.pageNum,
              pageSize: this.pageSize,
              categoryName: this.categoryName,
              startTime: this.dateTimeRange[0],
              endTime: this.dateTimeRange[1]
            },
          })
          .then((res) => {
            this.tableData = res.data.records;
            this.total = res.data.total;
          });
    },
    //修改所选记录数
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 切换页面展示记录数
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },
    // 切换当前页码
    handleCurrentChange(val) {
      this.pageNum = val;
      this.fetchData();
    },
    //搜索按钮，模糊搜索
    search() {
      this.fetchData();
    },
    //取消编辑
    handleEdit(row) {
      //深拷贝，防止还没确定，出现内容已被修改的伪现象
      this.infoForm = {...row};
      this.centerDialogVisible = true;
    },
    //重置当前搜索条件，并回到无条件查找数据
    reset() {
      this.categoryTitle = '';
      this.categoryName = '';
      this.storeName = '';
      this.dateTimeRange = [];
      this.fetchData();
    },
    //批量删除
    multipleDel() {
      //所选择数不能为零
      if (this.multipleSelection.length > 0) {
        this.$confirm("此操作将永久删除这些记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
            .then(() => {
              this.multipleSelection.forEach((ele) => {
                this.delete(ele.categoryId);
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
      }
    },
    //删除一个用户
    delete(id) {
      this.request.delete("/category/" + id).then((res) => {
        if (res) {
          this.$message.success("删除成功");
          this.fetchData();
        } else {
          this.$message.error("删除失败");
        }
      });
    },
    //删除单个用户，为了区分批量删除，确认框会影响批量删除（只删除一个的现象）
    singleDel(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            this.delete(id);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
    },
    // 提交表单（新增或更新）
    submitForm(infoForm) {
      this.$refs[infoForm].validate((valid) => {
        if (valid) {
          this.request.post("/category", this.infoForm).then((res) => {
            if (res) {
              // console.log(res);
              this.$message.success("保存成功");
              this.centerDialogVisible = false;
              this.fetchData()
            } else {
              this.$message.error("保存失败");
              this.centerDialogVisible = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //新增记录，
    save() {
      //因为新增与修改表单公用，所以当新增时需将一起修改的表单数据清空
      const blankForm = {};
      //下面操作为了复制结构而不复制数据
      for (let key in this.infoForm) {
        blankForm[key] = ''
      }
      // 深拷贝，防止引用问题
      this.infoForm = {...blankForm}
      //防止新增时表不为空值
      this.centerDialogVisible = true;
    },
    // 时间格式化，后端传来的是时间戳
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
    },
    // 重置表单，仅用于表单弹出时的重置按钮，
    resetForm(infoForm) {
      this.$refs[infoForm].resetFields();
    },
  },
};
</script>

<style>
</style>
