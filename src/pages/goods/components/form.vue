<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      <el-form :model="user">
        <!-- 一级分类 -->
        <el-form-item label="一级分类" label-width="120px">
          <el-select v-model="user.first_cateid" @change="changeFirst">
            <!-- 遍历一级分类 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!--  二级分类 -->
        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="user.second_cateid">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品名称 -->
        <el-form-item label="商品名称" label-width="120px">
          <el-input
            v-model="user.goodsname"
            placeholder="请输入商品名称"
          ></el-input>
        </el-form-item>
        <!-- 价格 -->
        <el-form-item label="价格" label-width="120px">
          <el-input v-model="user.price" placeholder="价格"></el-input>
        </el-form-item>
        <!-- 市场价格 -->
        <el-form-item label="市场价格" label-width="120px">
          <el-input
            v-model="user.market_price"
            placeholder="市场价格"
          ></el-input>
        </el-form-item>
        <!-- 原生JS上传图片 -->
        <el-form-item label="图片" label-width="120px">
          <div class="myupload">
            <h3>+</h3>
            <img class="img" :src="imgUrl" alt="" v-if="imgUrl" />
            <input
              v-if="info.isshow"
              type="file"
              class="ipt"
              @change="changeFile"
            />
            <!-- 如果添加成功，此时input上的文件应该清掉，所以直接将input节点清除 -->
          </div>
        </el-form-item>
        <!-- 商品规格 -->
        <el-form-item label="商品规格" label-width="120px">
          <el-select v-model="user.specsid" @change="changeSpecsId">
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 规格属性 -->
        <el-form-item label="规格属性" label-width="120px">
          <el-select v-model="user.specsattr" multiple>
            <el-option
              v-for="item in attrsList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 是否新品 -->
        <el-form-item label="是否新品" label-width="120px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>
        <!-- 是否热卖 -->
        <el-form-item label="是否热卖" label-width="120px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          >
            <el-input></el-input>
          </el-switch>
        </el-form-item>
        <!-- 商品描述 -->
        <el-form-item label="商品描述" label-width="120px">
          <textarea v-model="user.description" rows="20" cols="50"></textarea>
        </el-form-item>
      </el-form>
      <!-- 底部按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '添加商品'"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
      {{ user }}
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import { mapGetters, mapActions } from "vuex";
import { routes } from "../../../router";
import {
  reqcateList,
  reqgoodsDetail,
  reqgoodsUpdate,
  reqgoodsAdd
} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";

export default {
  // 接收info
  props: ["info"],
  data() {
    return {
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1
      },
      //二级分类的list
      secondCateList: [],
      // 图片路径
      imgUrl: "",
      // 规格属性list
      attrsList: []
    };
  },
  computed: {
    ...mapGetters({
      // 一级分类list
      // 因为如果没访问过就是一个空数组
      // 访问过才有数据
      cateList: "cate/list",

      // 规格的list
      specsList: "specs/list"
    })
  },
  methods: {
    ...mapActions({
      reqcateList: "cate/reqList",
      reqspecsList: "specs/reqList"
    }),
    // 根据一级分类的id得到二级分类的id
    changeFirst() {
      // 二级分类的id 重置
      this.user.second_cateid = "";
      // 获取二级分类的id
      reqcateList({ pid: this.user.first_cateid }).then(res => {
        this.secondCateList = res.data.list;
      });
    },
    changeFile(e) {
      // console.log(e);
      let file = e.target.files[0];
      // console.log(file);
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
      this.user.img = file;
      // console.log(this.cate);
    },
    // 修改了规格，计算出规格属性的list
    changeSpecsId() {
      // 进来先清空
      this.user.specsattr = [];
      // 取出 specsList，哪条数据的id和this.user.specsid是一样的
      let obj = this.specsList.find(item => item.id === this.user.specsid);
      this.attrsList = obj.attrs;
      console.log(this.attrsList);
    },
    // 就将这条数据的attrs 取出来，赋值给attrsList
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

      let d = { ...this.user };
      d.specsattr = JSON.stringify(d.specsattr);
      // 添加用户到数据库
      reqgoodsAdd(this.user).then(res => {
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
      if (this.info.title === "编辑商品") {
        this.empty();
      }
    }
  },
  mounted() {
    // 一进来请求一级分类的列表
    this.reqcateList();
    this.reqspecsList(true);
  }
};
</script>

<style scoped>
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
