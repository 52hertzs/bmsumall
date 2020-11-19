<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <!-- 一级分类 -->
      <el-form :model="user">
        <el-form-item label="一级分类" label-width="120px">
          <el-select v-model="user.status">
            <el-option label=手机通讯 value="1"></el-option>
          </el-select>
        </el-form-item>
        <!-- 规格属性 -->
        <el-form-item
          label="规格属性"
          label-width="120px"
          v-for="(item, index) in attrArr"
          :key="index"
        >
          <div class="line">
            <el-input
              v-model="item.value"
              autocomplete="off"
              placeholder="请输入规格属性"
            ></el-input>
            <el-button type="primary" v-if="index === 0" @click="addAttr"
              >新增规格属性</el-button
            >
            <el-button type="danger" @click="delAttr(index)" v-else
              >删除</el-button
            >
          </div>
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
        <el-button
          type="primary"
          @click="add"
          v-if="info.title == '添加商品规格'"
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
import {
  reqspecsDetail,
  reqspecsUpdate,
  reqspecsAdd
} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";

export default {
  // 接收info
  props: ["info"],
  data() {
    return {
      user: {
        specsname: "",
        attrs: "[]",
        status: 1
      },
      // 属性
      attrArr: [{ value: "" }]
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqCount: "specs/reqCount"
    }),
    cancel() {
      this.info.isshow = false;
    },
    addAttr() {
      this.attrArr.push({ value: "" });
    },
    delAttr(index) {
      // 从这个下标开始删，第一个参数是从第几个开始，第二参数是删除几个，第三个参数是替换
      this.attrArr.splice(index, 1);
    },
    empty() {
      this.user = {
        specsname: "",
        attrs: "",
        status: 1
      };
      this.attrArr = [{ value: "" }];
    },
    //12.点击了添加按钮
    add() {
      this.user.attrs = JSON.stringify(
        this.attrArr.map(item => {
          return item.value;
        })
      );
      // 添加用户到数据库
      reqspecsAdd(this.user).then(res => {
        if (res.data.code === 200) {
          // 弹个成功
          successAlert("添加成功");
          // 弹框消失
          this.cancel();
          // 清空数据
          this.empty();
          // 刷新列表数据
          this.reqList();
          // 重新请求总数
          this.reqCount();
          // console.log(this.user, this.attrArr);
        }
      });
    },

    // 获取一条数据
    getOne(id) {
      // console.log('我要获取的id是' +id);
      reqspecsDetail(id).then(res => {
        // 此时user上是没有ID的,但是有uid
        this.user = res.data.list[0];
        //  '["s","M"]'-->[{value:"s"},{value:"M"}]
        // 下面不能直接{}会认为是一个函数体，只能在{}加一个（）
        this.attrArr = JSON.parse(this.user.attrs).map(item => ({
          value: item
        }));
        console.log(this.user);
      });
    },
    // 37 点击更新
    update() {
      this.user.attrs = JSON.stringify(this.attrArr.map(item => item.value));
      // 修改数据库的数据
      reqspecsUpdate(this.user).then(res => {
        //成功弹窗
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //刷新
          this.reqList();
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
      if (this.info.title === "编辑商品规格") {
        this.empty();
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
.line {
  display: flex;
}
.line .el-input {
  flex: 1;
}
.line .el-button {
  width: auto;
}
</style>
