<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <!-- 所属角色 -->
      <el-form :model="user">
        <el-form-item label="所属角色" label-width="120px">
          <el-select placeholder="请选择角色" v-model="user.roleid">
            <el-option v-for="item in roleList" :value="item.id" :key='item.id' :label="item.rolename"></el-option>
          </el-select>
        </el-form-item>
        <!-- 用户名 -->
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="user.username" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="user.password" autocomplete="off" placeholder="请输入密码"></el-input>
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
        <el-button type="primary" @click="add" v-if="info.title == '添加管理员'"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
      {{ user }}
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { routes } from "../../../router";
import { reqRoleList,reqUserList,reqUserDel,reqUserDetail,reqUserUpdate,reqUserAdd} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";

export default {
  // 接收info

  props: ["info"],
  data() {
    return {
      user: {
        roleid:'',
        username:'',
        password:'',
        status:1
      },
      // 角色列表
      roleList: []
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
        roleid:'',
        username:'',
        password:'',
        status:1
      };
    },
    //12.点击了添加按钮
    add() {
      // 添加用户到数据库
      reqUserAdd(this.user).then(res => {
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
    getOne(uid) {
      // console.log('我要获取的id是' +id);
      reqUserDetail(uid).then(res => {
        // 此时user上是没有ID的,但是有uid
        this.user = res.data.list;
        this.user.password =''
  

      });
    },
    // 37 点击更新
    update() {
      // 上面在获取一条数据的时候就把id给补上了
      // 修改数据库的数据
      // 但是树上的数据修改，不会自动传值到 user的menus里要用输的语法获取到user
      // this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqUserUpdate(this.user).then(res => {
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
      if (this.info.title === "编辑管理员") {
        this.empty();
      }
    }
  },
  mounted() {
    // 一进来就把角色类别显示在form表单上
    reqRoleList().then(res => {
      this.roleList = res.data.list;
    });
  }
};
</script>

<style scoped></style>
