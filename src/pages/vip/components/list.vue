<template>
  <div>
    <el-table
      :data="[]"
      border
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <!-- 用户编号 -->
      <el-table-column prop="date" label="用户编号" sortable> </el-table-column>
      <!-- 昵称 -->
      <el-table-column prop="name" label="昵称" sortable> </el-table-column>
      <!-- 手机号 -->
      <el-table-column prop="address" label="手机号" sortable>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <del-btn @confirm="del(scope.row.uid)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    edit(){
      
    }
  },
  mounted() {}
};
</script>

<style scoped></style>
