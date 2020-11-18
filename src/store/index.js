import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
// 处理逻辑的
import actions from './actions'
//  处理数据的
import{state,mutations,getters} from './mutations';
//
import order from './modules/order'
import cate from './modules/cate'

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        order,
        cate
    }
})