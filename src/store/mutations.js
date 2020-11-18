// 数据
export const state = {
  // 初始值
  userInfo: sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):{}
};
//  修改数据
export const mutations = {
    changeUserInfo(state,obj){
        // vuex存了一份
        state.userInfo=obj
        // 本地存储也存了一份
        if(obj.token){
            sessionStorage.setItem("userInfo",JSON.stringify(obj))
        }else{
            sessionStorage.removeItem("userInfo")
        }
    }
};
// 导出数据
export const getters = {
    userInfo(state){
        return state.userInfo
    }
};
