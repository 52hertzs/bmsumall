<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- table -->
    <!-- 19.将list传递给list.vue 组件 -->
    <!-- $event接收子组件传过来的数据 -->
    <v-list   @edit="edit($event)"></v-list>

    <!-- 分页 -->
    <!-- 50.分页 
    total：总条数
    page-size:一页的数量
    current-change:当前页码发生了修改，会触发，回调函数的参数就是新的页码
    -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="10"
      :page-size="2"
      @current-change="changePage"
    >
    </el-pagination>
    <!-- 弹框 -->
    <v-form :info="info"  ref="form"></v-form>
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
      },
    };
  },
  components: {
    vList,
    vForm
  },
  computed: {
    ...mapGetters({

    })
  },
  methods: {
    ...mapActions({
            reqList:'specs/reqList'
    }),
    willAdd() {
      this.info.isshow = true;
      this.info.title = "添加商品规格";
    },

    // 编辑
    edit(id) {
      this.info.isshow = true;
      this.info.title = "编辑商品规格";
      this.$refs.form.getOne(id);
    },
    // 获取总数
    getCount() {
      reqUserCount().then(res => {
        this.total = res.data.list[0].total;
      });
    },
    //54.页码发生了修改
    changePage(page) {
      this.page = page;
      this.init();
    },
    newInit() {
      this.init();
      this.getCount();
    }
  },
  mounted() {
    // 请求数据库的列表数据，一进来就渲染列表
    // 为什么？因为重新进这个借口，数据库有数据，他就渲染，当跳转到别的页面在跳转到当前页就要渲染
    this.reqList();
    this.getCount();
  }
};
</script>

<style scoped></style>
