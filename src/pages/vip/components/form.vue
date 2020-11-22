<template>
  <div>
    <el-dialog :title="会员修改" :visible.sync="user.isshow">
      <el-form ref="form" :model="user" label-width="120px">
        <!-- 手机号 -->
        <el-form-item label="手机号">
          <el-input
            placeholder="请输入手机号"
            autocomplete="off"
            v-model="user.phone"
            clearable
          >
          </el-input>
        </el-form-item>
        <!-- 昵称 -->
        <el-form-item label="昵称">
          <el-input
            placeholder="请输入昵称"
            autocomplete="off"
            v-model="user.nickname"
            clearable
          >
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码">
          <el-input
            placeholder="请输入密码"
            v-model="user.password"
            autocomplete="off"
            clearable
            show-password
          >
          </el-input>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="update">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({})
  },
  data() {
    return {
      user: {
        uid:'',
        nickname:'',
        phone:'',
        password:'',
        status:'',
        status: 1,
        isshow: fasle
      }
    };
  },
  mounted() {}
};
</script>

<style scoped></style>
