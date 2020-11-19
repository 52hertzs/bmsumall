import axios from "axios";
import qs from "qs";
import { errorAlert } from "./alert";
// 引入  store
import store from "../store";
// 引入 router
import router from "../router";
import Vue from 'vue'


// 开发环境使用8000,本地地址，后面的是处理图片地址 localhost3000是后台的地址
let baseUrl = "/aa";
Vue.prototype.$imgPre='http://localhost:3000'

// 生产环境打包
// let baseUrl ='';
// Vue.prototype.$imgPre=''

axios.interceptors.request.use(req => {
  // 除了登录接口以外都设置请求拦截
  if (req.url != baseUrl + "/api/userlogin") {
    // 后端要的是req.headers.authorization，其实是store.state.userInfo.token，
    // 因为要根据token 设置过期时间 因为登录的时候token 有登录时间 后端可以是值距离登录时间一小时就掉线
    req.headers.authorization = store.state.userInfo.token;
  }
  // 因为req是一个方法，外界要用到的时候要return
  return req;
});

// 响应拦截
axios.interceptors.response.use(res => {
  //  请求响应的接口
  console.log("本次请求的地址:" + res.config.url);
  console.log(res);
  //13.统一处理失败，组件内只需要处理成功即可
  if (res.data.code !== 200) {
    errorAlert(res.data.msg);
  }
  //  掉线处理
  if (res.data.msg === "登录已过期或访问权限受限") {
    // 清除登录信息 仓库要触发一个 action要用 dispatch
    store.dispatch("changeUser", {});
    //  跳转到登录页
    router.push("/login");
  }
  return res;
});

// ===========菜单接口 开始====================

//13.添加
export const reqMenuAdd = form => {
  return axios({
    url: baseUrl + "/api/menuadd",
    method: "post",
    data: qs.stringify(form)
  });
};

// 18.列表交互
export const reqMenuList = () => {
  return axios({
    url: baseUrl + "/api/menulist",
    method: "get",
    params: {
      istree: true
    }
  });
};

// 删除数据
export const reqMenuDel = id => {
  return axios({
    url: baseUrl + "/api/menudelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  });
};

// 获取一条数据
export const reqMenuDetail = id => {
  return axios({
    url: baseUrl + "/api/menuinfo",
    method: "get",
    params: {
      id: id
    }
  });
};
// 修改数据
export const reqMenuUpdate = form => {
  return axios({
    url: baseUrl + "/api/menuedit",
    method: "post",
    data: qs.stringify(form)
  });
};

// ===========菜单接口 结束====================

// ===========角色接口 开始====================
// 8.添加
export const reqRoleAdd = user => {
  return axios({
    url: baseUrl + "/api/roleadd",
    method: "post",
    data: qs.stringify(user)
  });
};

//18.列表
export const reqRoleList = () => {
  return axios({
    url: baseUrl + "/api/rolelist",
    method: "get"
  });
};

//26.删除
export const reqRoleDel = id => {
  return axios({
    url: baseUrl + "/api/roledelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  });
};
// 33.详情
export const reqRoleDetail = id => {
  return axios({
    url: baseUrl + "/api/roleinfo",
    method: "get",
    params: {
      id: id
    }
  });
};
// 38.修改
export const reqRoleUpdate = user => {
  return axios({
    url: baseUrl + "/api/roleedit",
    method: "post",
    data: qs.stringify(user)
  });
};
// ===========角色接口 结束====================

// ===========管理员接口 开始====================
// 8.添加
export const reqUserAdd = user => {
  return axios({
    url: baseUrl + "/api/useradd",
    method: "post",
    data: qs.stringify(user)
  });
};

//18.列表 p={page:1,size:10}
export const reqUserList = p => {
  return axios({
    url: baseUrl + "/api/userlist",
    method: "get",
    params: p
  });
};

//26.删除
export const reqUserDel = uid => {
  return axios({
    url: baseUrl + "/api/userdelete",
    method: "post",
    data: qs.stringify({
      uid: uid
    })
  });
};
// 33.详情
export const reqUserDetail = uid => {
  return axios({
    url: baseUrl + "/api/userinfo",
    method: "get",
    params: {
      uid: uid
    }
  });
};

// 38.修改
export const reqUserUpdate = user => {
  return axios({
    url: baseUrl + "/api/useredit",
    method: "post",
    data: qs.stringify(user)
  });
};
// 52 总数
export const reqUserCount = () => {
  return axios({
    url: baseUrl + "/api/usercount",
    method: "get"
  });
};

// ===========管理员接口 结束====================

// ===========登录接口 开始====================
//1.登录
export const reqLogin = user => {
  return axios({
    url: baseUrl + "/api/userlogin",
    method: "post",
    data: qs.stringify(user)
  });
};

// =========== 商品分类开始====================
// 8.添加 有图片
export const reqcateAdd = cate => {
  // 因为是文件格式所以要let FormData
  // 用 for  in  循环
  let d = new FormData();
  /*
    d.append("name",12)
    d.append("img",file)
    d.append("age",20)
    */
  //  这里 的 i就是对象里面的属性，cate[i]就是属性的值
  for (let i in cate) {
    d.append(i, cate[i]);
  }
  return axios({
    url: baseUrl + "/api/cateadd",
    method: "post",
    data: d
  });
};

//18.列表 p={istree:true} p={pid}
export const reqcateList = p => {
  return axios({
    url: baseUrl + "/api/catelist",
    method: "get",
    params: p
  });
};

//26.删除
export const reqcateDel = id => {
  return axios({
    url: baseUrl + "/api/catedelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  });
};
// 33.详情
export const reqcateDetail = id => {
  return axios({
    url: baseUrl + "/api/cateinfo",
    method: "get",
    params: {
      id: id
    }
  });
};

// 38.修改
export const reqcateUpdate = cate => {
  let d = new FormData();
    /*
    d.append("name",12)
    d.append("img",file)
    d.append("age",20)
    */
  for (let i in cate) {
    d.append(i, cate[i]);
  }
  return axios({
    url: baseUrl + "/api/cateedit",
    method: "post",
    data: d
  });
};

// =========== 商品分类开始====================

// =========== 商品规格开始====================

// 8.添加 
export const reqspecsAdd = user => {

  return axios({
    url: baseUrl + "/api/specsadd",
    method: "post",
    data: qs.stringify(user)
  });
};

//18.列表 p={page:xx,size:xx} 
export const reqspecsList = p => {
  return axios({
    url: baseUrl + "/api/specslist",
    method: "get",
    params: p
  });
};

//26.删除
export const reqspecsDel = id => {
  return axios({
    url: baseUrl + "/api/specsdelete",
    method: "post",
    data: qs.stringify({
      id: id
    })
  });
};
// 33.详情
export const reqspecsDetail = id => {
  return axios({
    url: baseUrl + "/api/specsinfo",
    method: "get",
    params: {
      id: id
    }
  });
};

// 38.修改
export const reqspecsUpdate = user => {
  
  return axios({
    url: baseUrl + "/api/specsedit",
    method: "post",
    data: qs.stringify(user)
  });
};

// 总数

export const reqspecsCount = user => {
  
  return axios({
    url: baseUrl + "/api/specslist",
    method: "get"
  });
};
// =========== 商品规格结束====================