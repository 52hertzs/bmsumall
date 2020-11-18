<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- table -->
    <!-- 19.将list传递给list.vue 组件 -->
    <!-- $event接收子组件传过来的数据 -->
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>

    <!-- 弹框 -->
    <v-form :info="info" :list="list" @init="init" ref='form'></v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
import { reqMenuList } from "../../utils/http";

export default {
  data() {
    return {
      // 弹窗状态
      info: {
        isshow: false,
        title: "添加菜单"
      },

      list: []
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
      this.info.title = "添加菜单";
    },
    //重新从数据库请求列表数据（更新）渲染，当我点击某事件的时候重新渲染列表
    init() {
      reqMenuList().then(res => {
        this.list = res.data.list;
      });
    },
    edit(id) {
      this.info.isshow = true;
      this.info.title='编辑菜单'
      this.$refs.form.getOne(id)
    }
  },
  mounted() {
    // 请求数据库的列表数据，一进来就渲染列表
    this.init();
  }
};
</script>

<style scoped></style>
