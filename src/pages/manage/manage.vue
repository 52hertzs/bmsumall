<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- table -->
    <!-- 19.将list传递给list.vue 组件 -->
    <!-- $event接收子组件传过来的数据 -->
    <v-list :list="list" @init="newInit" @edit="edit($event)"></v-list>

    <!-- 分页 -->
    <!-- 50.分页 
    total：总条数
    page-size:一页的数量
    current-change:当前页码发生了修改，会触发，回调函数的参数就是新的页码
    -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    >
    </el-pagination>
    <!-- 弹框 -->
    <v-form :info="info" @init="newInit" ref="form"></v-form>
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
        title: ""
      },
      // 列表数据初始值
      list: [],
      total: 0,
      size: 2,
      page: 1
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
      this.info.title = "添加管理员";
    },
    //重新从数据库请求列表数据（更新）渲染，当我点击某事件的时候重新渲染列表
    init() {
      reqUserList({ page: this.page, size: this.size }).then(res => {
        if (res.data.code == 200) {
          // 这个解决如果管理员全部都删空了，就报错，因为都删空了取到的数据是null，而要求必须是list
          let list = res.data.list ? res.data.list : [];

          // 56.如果取到的list是[],并且page>1,page自减，请列表
          if (list.length === 0 && this.page > 1) {
            this.page--;
            this.init();
            return;
          }

          this.list = list;
        }
      });
    },
    // 编辑
    edit(uid) {
      this.info.isshow = true;
      this.info.title = "编辑管理员";
      this.$refs.form.getOne(uid);
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
    this.init();
    this.getCount();
  }
};
</script>

<style scoped></style>
