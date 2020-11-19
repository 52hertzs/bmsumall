import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
// 处理逻辑的
import actions from './actions'
//  处理数据的
import{state,mutations,getters} from './mutations';
//
import cate from './modules/cate'
import specs from './modules/specs'

export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules:{
        cate,
        specs
    }
})