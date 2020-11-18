<template>
  <div class="login">
    <div class="con">
      <h3>登录</h3>
      <div class="line">
        <el-input placeholder="请输入内容" v-model="user.username" clearable>
        </el-input>
      </div>
      <div class="line">
        <el-input
          placeholder="请输入密码"
          v-model="user.password"
          clearable
          show-password
        >
        </el-input>
      </div>
      <div class="last">
        <el-button type="success" @click="login" class="lastbtn"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqLogin } from "../../utils/http";
import { successAlert } from "../../utils/alert";
export default {
  data() {
    return {
      // 2.初始化
      user: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser"
    }),
    login() {
      reqLogin(this.user).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 存入vuex,和本地
          this.changeUser(res.data.list);
          // 一定是先存数据，再跳页面
          this.$router.push("/");
        }
      });
    }
  },
  mounted() {
    console.log(this.$store);
  }
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);
}
.con {
  position: absolute;
  width: 400px;
  padding: 20px;
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
h3 {
  text-align: center;
  margin: 10px;
}
.line {
  margin-bottom: 15px;
}
.last {
  text-align: center;
}
.lastbtn {
  width: 100%;
}
</style>
