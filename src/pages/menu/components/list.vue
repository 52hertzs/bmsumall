<template>
  <div>
    <!-- 有下一层数据就写children -->
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="菜单编号" sortable> </el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable>
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="url" label="菜单地址"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <!-- 不能原样输出的数据都要scope.row.status去拿，表示row表示列表每一行存在的数据 -->
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--  点击的时候取得是一条数据的ID -->
          <el-button type="primary" @click='edit(scope.row.id)'>编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqMenuDel } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";

export default {
  props: ["list"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    del(id) {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 当点击确定就执行这条
          reqMenuDel(id).then(res => {
            if (res.data.code == 200) {
              //  提示删除成功
              successAlert(res.data.msg);
              //  刷新页面
              this.$emit('init');
            } else {
              errorAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    edit(id){
      this.$emit('edit',id)
    }
  },
  mounted() {}
};
</script>

<style scoped></style>
