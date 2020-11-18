<template>
  <div>
    <!-- 有下一层数据就写children -->
    <!-- 请求回来的数据有id号(后台自动添加号的)所以 -->
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="角色编号" sortable> </el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable>
      </el-table-column>
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
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- 删除 -->
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqRoleDel } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";

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
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      // 当点击确定就执行这条
      reqRoleDel(id).then(res => {
        if (res.data.code == 200) {
          //  提示删除成功
          successAlert(res.data.msg);
          //  刷新页面
          this.$emit("init");
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped></style>
