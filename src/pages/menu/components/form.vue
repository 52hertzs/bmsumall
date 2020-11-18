<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <!-- 菜单名称 -->
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 上级菜单 -->
        <el-form-item label="上级菜单" label-width="120px">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            @change="changePid"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              :label="item.title"
              v-for="item in list"
              :key="item.id"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单类型 -->
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <!-- 菜单图标 -->
        <el-form-item
          v-if="form.type === 1"
          label="菜单图标"
          label-width="120px"
        >
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option :value="item" v-for="item in icons" :key="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单地址 -->
        <el-form-item label="菜单地址" label-width="120px" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in routes"
              :key="item.path"
              :label="item.name + '--/' + item.path"
              :value="'/' + item.path"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '添加菜单'"
          >添加</el-button
        >
        <el-button type="primary" v-else @click="update">修改</el-button>
      </div>
      {{ form }}
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { routes } from "../../../router";
import { reqMenuAdd, reqMenuDetail, reqMenuUpdate } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";

export default {
  // 接收list
  props: ["info", "list"],
  data() {
    return {
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1
      },
      icons: [
        "el-icon-s-tools",
        "el-icon-user-solid",
        "el-icon-s-help",
        "el-icon-s-operation"
      ],
      routes
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
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1
      };
    },
    //12.点击了添加按钮
    add() {
      // 添加菜单到数据库
      reqMenuAdd(this.form).then(res => {
        if (res.data.code === 200) {
          // 弹个成功
          // 系统自带的
          // this.$mesage()是系统自带的
          successAlert("添加成功");
          // 弹框消失
          this.cancel();
          //数据清空
          this.empty();
          // 通过自定义事件通知menu刷新列表数据
          this.$emit("init");
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    //27.上级菜单发生了修改
    changePid() {
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    // 获取一条数据
    getOne(id) {
      // console.log('我要获取的id是' +id);
      reqMenuDetail(id).then(res => {
        // 此时form上是没有ID的
        this.form = res.data.list;
        // 补一个id
        this.form.id = id;
      });
    },
    // 37 点击更新
    update() {
      // 上面在获取一条数据的时候就把id给补上了
      // 修改数据库的数据
      reqMenuUpdate(this.form).then(res => {
        //成功弹窗
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //通知父组件刷新
          this.$emit("init");
          // 弹窗关闭
          this.cancel();
          // form重置
          this.empty();
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    //整个弹框消失时触发的事件
    closed() {
      // 如果是点击添加的时候点击的取消就什么都不做
      // 如果是点击编辑的时候点击的取消就清空 form
      if (this.info.title === "编辑菜单") {
        this.empty();
      }
    }
  },
  mounted() {}
};
</script>

<style scoped></style>
