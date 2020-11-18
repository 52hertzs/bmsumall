<template>
  <el-button type="danger" @click="del()">删除</el-button>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    del() {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //31.通知父组件，点了确定
          this.$emit("confirm");

        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {}
};
</script>

<style scoped></style>
