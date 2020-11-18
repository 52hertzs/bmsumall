<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <!-- 角色名称 -->
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="120px">
          <!-- 通过v-model将user绑定到表单上 -->
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 角色权限 -->
        <el-form-item label="角色权限" label-width="120px">
          <!-- 树形控件 -->
          <!-- 树形控件
            data:数据
            :props="{children:'哪个字段是代表有下一个子节点',label:'展示在页面的字段'}"
            node-key:选中节点后，得到什么字段
            this.$refs.tree.getCheckedNodes() 可以取到选中的节点对应的整条数据，拼成的数组
            this.$refs.tree.getCheckedKeys() 可以取到选中节点的key拼成的数组
            this.$refs.tree.setCheckedKeys([10,11,12]); 给树设置值
          -->
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{
              children: 'children',
              label: 'title'
            }"
          >
          </el-tree>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '添加角色'"
          >添加</el-button
        >
        <el-button type="primary"  @click="update" v-else>修改</el-button>
      </div>
      {{ user }}
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { routes } from "../../../router";
import { reqRoleAdd, reqMenuList, reqRoleDetail,reqRoleUpdate } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";

export default {
  // 接收list
  props: ["info", "list"],
  data() {
    return {
      user: {
        rolename: "",
        menus: "",
        status: 1
      },
      // 初始化树形控件数据
      menuList: []
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        rolename: "",
        menus: "",
        status: 1
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    //12.点击了添加按钮
    add() {
      this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      // 添加角色到数据库
      reqRoleAdd(this.user).then(res => {
        if (res.data.code === 200) {
          // 弹个成功
          successAlert("添加成功");
          // 弹框消失
          this.cancel();
          // 清空数据
          this.empty();
          // 通过自定义事件通知menu刷新列表数据
          this.$emit("init");
        }
      });
    },

    // 获取一条数据
    getOne(id) {
      // console.log('我要获取的id是' +id);
      reqRoleDetail(id).then(res => {
        // 此时user上是没有ID的
        this.user = res.data.list;
        //处理树形控件的数据
        this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
        // 因为修改需要id 所以要补一个id

        this.user.id = id;
      });
    },
    // 37 点击更新
    update() {
      // 上面在获取一条数据的时候就把id给补上了
      // 修改数据库的数据
      // 但是树上的数据修改，不会自动传值到 user的menus里要用输的语法获取到user
      this.user.menus =JSON.stringify(this.$refs.tree.getCheckedKeys())
      reqRoleUpdate(this.user).then(res => {
        //成功弹窗
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //通知父组件刷新
          this.$emit("init");
          // 弹窗关闭
          this.cancel();
          // form重置
          this.empty();
        } 
      });
    },
    //整个弹框消失时触发的事件
    closed() {
      // 如果是点击添加的时候点击的取消就什么都不做
      // 如果是点击编辑的时候点击的取消就清空 form
      if (this.info.title === "编辑角色") {
        this.empty();
      }
    }
  },
  mounted() {
    // 一进来就把角色类别显示在form表单上
    reqMenuList().then(res => {
      this.menuList = res.data.list;
    });
  }
};
</script>

<style scoped></style>
