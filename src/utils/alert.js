// 封装弹窗的方法
import Vue from "vue";
let vm = new Vue();
//  成功的弹窗
export const successAlert = msg => {
  vm.$message({
    message: msg,
    type: "success"
  });
};
export const errorAlert = msg => {
  vm.$message({
    message: msg,
    type: "warning"
  });
};
