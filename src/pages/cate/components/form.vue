<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <!-- 上级分类 -->
      <el-form :model="cate">
        <el-form-item label="上级分类" label-width="120px">
          <el-select placeholder="请选择" v-model="cate.pid">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 分类名称 -->
        <el-form-item label="分类名称" label-width="120px">
          <el-input
            v-model="cate.catename"
            autocomplete="off"
            placeholder="请输入分类名称"
          ></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="120px" v-if="cate.pid != 0">
          <!-- 原生JS上传图片 -->
          <!-- <div class="myupload">
            <h3>+</h3> -->
          <!-- img比h3层级高，但比input层级要低 -->
          <!-- <img class="img" :src="imgUrl" alt="" v-if="imgUrl" /> -->
          <!-- <input
              v-if="info.isshow"
              type="file"
              class="ipt"
              @change="changeFile"
            /> -->
          <!-- 如果添加成功，此时input上的文件应该清掉，所以直接将input节点清除 -->
          <!-- </div> -->
          <!-- element ui 上传图片 -->
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="cate.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '添加分类'"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
      {{ cate }}
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import { mapGetters, mapActions } from "vuex";
import { routes } from "../../../router";
import {
  reqRoleList,
  reqcateList,
  reqcateDel,
  reqcateDetail,
  reqcateUpdate,
  reqcateAdd
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";

export default {
  // 接收info

  props: ["info"],
  data() {
    return {
      cate: {
        pid: "",
        catename: "",
        img: null,
        status: 1
      },
      // 动态图片
      imgUrl: ""
    };
  },
  computed: {
    ...mapGetters({
      // 获取list表的数据
      list: "cate/list"
    })
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList"
    }),
    changeFile(e) {
      // console.log(e);
      let file = e.target.files[0];
      console.log(file);
      //判断文件大小 file.size B ，1M=1024KB 1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件大小不能超过2M");
        return;
      }
      // 判断文件类型
      let extname = path.extname(file.name);
      let arr = [".jpg", "jpeg", ".png", "gif"];
      if (!arr.includes(extname)) {
        errorAlert("请上传正确的图片格式");
        return;
      }
      //  希望选择的图片先在input,将一个文件生成一个图片地址
      this.imgUrl = URL.createObjectURL(file);
      // console.log(this.imgUrl);
      //给cate 的img 赋值
      this.cate.img = file;
      // console.log(this.cate);
    },
    changeFile2(e) {
      console.log(e);
      let file = e.raw;
      //判断文件大小 file.size B ，1M=1024KB 1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        errorAlert("文件大小不能超过2M");
        return;
      }
      // 判断文件类型
      let extname = path.extname(file.name);
      let arr = [".jpg", "jpeg", ".png", "gif"];
      if (!arr.includes(extname)) {
        errorAlert("请上传正确的图片格式");
        return;
      }
      this.imgUrl = URL.createObjectURL(file);

      this.cate.img = file;
    },
    cancel() {
      this.info.isshow = false;
    },
    empty() {
      this.cate = {
        pid: "",
        catename: "",
        img: null,
        status: 1
      };
      // 这个清空只是让表面的图片清空，实际上传的file文件
      this.imgUrl = "";
    },
    //12.点击了添加按钮
    add() {
      // console.log(this.cate);
      // 添加用户到数据库
      reqcateAdd(this.cate).then(res => {
        if (res.data.code === 200) {
          // 弹个成功
          successAlert("添加成功");
          // 弹框消失
          this.cancel();
          // 清空数据
          this.empty();
          // 刷新列表数据
          this.reqList();
        }
      });
    },

    // 获取一条数据
    getOne(id) {
      // console.log('我要获取的id是' +id);
      reqcateDetail(id).then(res => {
        // 此时cate上是没有ID的,但是有pid
        // 先改变一下img的格式,使他显示在form表单中
        this.imgUrl = this.$imgPre + res.data.list.img;
        // 使他显示在form之上
        this.cate = res.data.list;
        // 因为修改需要传id所以要这个时候要补一个id上去
        this.cate.id = id;
        // console.log(this.cate);
      });
    },

    // list页面获取一条数据
    getOne1(id) {
      // console.log('我要获取的id是' +id);
      reqcateDetail(id).then(res => {
        this.cate.pid = id;
      });
    },
    // 37 点击更新
    update() {
      // 上面在获取一条数据的时候就把id给补上了
      // 修改数据库的数据

      reqcateUpdate(this.cate).then(res => {
        //成功弹窗
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //通知父组件刷新
          this.reqList();
          // 弹窗关闭
          this.cancel();
          // form重置
          this.empty();
        }
      });
    },
    //整个弹框消失时触发的事件 这个
    // 这个关闭是一个动画，当关闭的时候触发。同时让数据进行清空操作
    closed() {
      // 如果是点击添加的时候点击的取消就什么都不做
      // 如果是点击编辑的时候点击的取消就清空 form
      if (this.info.title === "编辑分类") {
        this.empty();
      }
    }
  },
  mounted() {}
};
</script>

<style scoped lang="stylus">
.myupload {
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px dashed #ccc;
}

.myupload h3 {
  width: 100%;
  height: 100%;
  color: darkgray;
  font-size: 30px;
  font-weight: 100;
  line-height: 100px;
  text-align: center;
}
.myupload .ipt {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.myupload .img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

/* elementui上传图片的样式编辑 */
// 穿透
.add >>> .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
