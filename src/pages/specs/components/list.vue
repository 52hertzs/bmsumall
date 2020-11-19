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
      <el-table-column prop="id" label="规格编号" sortable></el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable>
      </el-table-column>
      <el-table-column
        label="规格属性"
        sortable
      >
      <template slot-scope="scope">
      <el-tag v-for="item in scope.row.attrs" :key='item' >{{item}}</el-tag>
      </template>
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
          <el-button type="primary" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <!-- 删除 -->
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqspecsDel } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "specs/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList"
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      // 当点击确定就执行这条
      reqspecsDel(id).then(res => {
        if (res.data.code == 200) {
          //  提示删除成功
          successAlert(res.data.msg);
          //  刷新页面
          this.reqList()
        }
      });
    }
  },
  mounted() {
    this.reqList();
  }
};
</script>

<style scoped></style>
