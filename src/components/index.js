import Vue from 'vue'

// 注册删除组件为全局组件
import delBtn from './delBtn'
// 看见componet就代表注册成了全局组件了
Vue.component('delBtn',delBtn)