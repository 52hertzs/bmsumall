<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-list @edit="edit" @add="add"></v-list>

    <!-- 弹框 -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqUserList, reqUserCount } from "../../utils/http";

export default {
  data() {
    return {
      // 弹窗状态
      info: {
        isshow: false,
        title: "添加分类"
      }
    };
  },
  components: {
    vList,
    vForm
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    willAdd() {
      this.info.isshow = true;
      this.info.title = "添加分类";
    },

    // 编辑
    edit(id) {
      this.info.isshow = true;
      this.info.title = "编辑分类";
      this.$refs.form.getOne(id);
    },
    // list页面的添加
    add(id) {
      this.info.isshow = true;
      this.info.title = "添加分类";
      this.$refs.form.getOne1(id);
    }
  },
  mounted() {}
};
</script>

<style scoped></style>
