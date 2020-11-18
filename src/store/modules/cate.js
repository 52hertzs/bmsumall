// 状态层也可以处理逻辑，存储数据
//  外界要调用 action 必须仓库的  dispatch
//
import { reqcateList } from "../../utils/http";

const state = {
  // 分类list
  list: []
};
const mutations = {
  // 修改list
  changeList(state, arr) {
    state.list = arr;
  }
};
const actions = {
  //  发起请求
  reqList(context) {
    // 发起请求，成功之后，修改list
    // istree= true 就是把所有数据都请回来，如果是pid就请求字列表的数据
    reqcateList({ istree: true }).then(res => {
      context.commit("changeList", res.data.list);
    });
  }
};
const getters = {
  list(state) {
    return state.list;
  }
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
};
