<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- table -->
    <!-- $event接收子组件传过来的数据 -->
    <v-list @edit="edit($event)"></v-list>

    <!-- 分页 -->
    <!-- 50.分页 
    total：总条数
    page-size:一页的数量
    current-change:当前页码发生了修改，会触发，回调函数的参数就是新的页码
    -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="this.total"
      :page-size="this.size"
      @current-change="changePage"
    >
    </el-pagination>
    <!-- 弹框 -->
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vList from "./components/list.vue";
import vForm from "./components/form.vue";
// import { reqUserList, reqUserCount } from "../../utils/http";

export default {
  data() {
    return {
      // 弹窗状态
      info: {
        isshow: false,
        title: ""
      }
    };
  },
  components: {
    vList,
    vForm
  },
  computed: {
    ...mapGetters({
      total: "specs/total",
      size: "specs/size"
    })
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqCount:'specs/reqCount',
      changePage:'specs/changePage'
    }),
    willAdd() {
      this.info.isshow = true;
      this.info.title = "添加商品";
    },

    // 编辑
    edit(id) {
      this.info.isshow = true;
      this.info.title = "编辑商品";
      this.$refs.form.getOne(id);
    },

    newInit() {
      this.reqList();
      this.getCount();
    }
  },
  mounted() {
    // this.reqList();
    this.reqCount();
  }
};
</script>

<style scoped></style>
