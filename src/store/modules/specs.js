// 状态层也可以处理逻辑，存储数据
//  外界要调用 action 必须仓库的  dispatch
//
import { reqspecsCount, reqspecsList } from "../../utils/http";

const state = {
  // 分类list
  list: [],
  total: 0,
  // 这里的size是是要显示的个数
  size: 2,
  page: 1
};
const mutations = {
  // 修改list
  changeList(state, arr) {
    state.list = arr;
    // console.log(state.list);

  },
  changeTotal(state, num) {
    state.total = num;
    // console.log(state.total);
  },
  changePage(state, page) {
    state.page = page;

  }
};
const actions = {
  //  发起请求

  reqList(context) {
    // 发起请求，成功之后，修改list
    // 这里的size是每次要请求回来的的数据
    //  p={page:xx,size:xx}
    reqspecsList({ page: context.state.page, size: context.state.size }).then(
      res => {
        let list = res.data.list ? res.data.list : [];
        //处理删除末尾页在后一条数据的bug问题
        if(list.length==0&&context.state.page>1){
          context.commit('changePage',context.state.page-1)
          context.dispatch('reqList');
          return;
        }
        list.forEach(item => {
          item.attrs = JSON.parse(item.attrs);
        });
        context.commit("changeList", list);
      }
    );
  },
  // 请求总数
  reqCount(context) {
    reqspecsCount().then(res => {
      context.commit("changeTotal", res.data.list[0].total);
    });
  },
  // 修改页码
  changePage(context, page) {
    context.commit("changePage", page);
    // 在action 里面调用另外一个action
    context.dispatch("reqList");
  }
};
const getters = {
  list(state) {
    return state.list;
  },
  total(state) {
    return state.total;
  },
  size(state) {
    return state.size;
  }
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true
};
