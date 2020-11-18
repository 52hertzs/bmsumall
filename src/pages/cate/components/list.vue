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
      <!-- 分类编号 -->
      <el-table-column prop="id" label="分类编号" sortable> </el-table-column>
      <!--  分类名称 -->
      <el-table-column prop="catename" label="分类名称" sortable>
      </el-table-column>
      <!-- 图片 -->
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgPre + scope.row.img" alt="" />
        </template>
      </el-table-column>
      <!--  测试添加还没做 -->
      <el-table-column label="添加">
        <template slot-scope="scope">
          <el-button type="primary"  v-if="scope.row.pid==0" @click='willAdd(scope.row.id)'>添加</el-button>
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column label="状态">
        <template slot-scope="scope">
          <!-- 不能原样输出的数据都要scope.row.status去拿，表示row表示列表每一行存在的数据 -->
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <!-- 操作 -->
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
import { reqcateDel } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";

export default {
  data() {
    return {
    };
  },
  computed: {
    // 引入数据
    ...mapGetters({
      // 这里的list是一个数组形式的json 一个数组里面有很多的对象
      list: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      // 处理逻辑当请求回来的数据在状态层就自动复制给了list
      //  但是这个方法需要掉一下
      // 把这个方法引入
      reqList: "cate/reqList"
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      // 当点击确定就执行这条
      reqcateDel(id).then(res => {
        if (res.data.code == 200) {
          //  提示删除成功
          successAlert(res.data.msg);
          //  刷新页面
          this.reqList();
        }
      });
    },
    // list页面的添加
    willAdd(id){
      this.$emit("add",id);
    }
  },
  mounted() {
    // 一进来就发请求
    this.reqList();
  }
};
</script>

<style scoped>
img {
  width: 100px;
}
</style>
