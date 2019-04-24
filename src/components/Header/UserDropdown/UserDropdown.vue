<template lang="pug">
  div
    el-popover(v-if="$store.state.logged && $store.state.username", placement="bottom", trigger="click")
      span(slot="reference") {{$store.state.username}}

      el-button(round, style="width: 100%;", @click="logout").
        SIGN OUT

    el-popover(v-else, placement="bottom", trigger="click")
      span(slot="reference").
        Sign In

      el-form(ref="signInForm", :model="signInForm", :rules="toCreate ? signUpRules : signInRules", size="medium", status-icon)
        el-form-item(prop="username")
          el-input(v-model.trim="signInForm.username", placeholder="Username")
        el-form-item(prop="password", type="password")
          el-input(v-model.trim="signInForm.password", type="password", autocomplete="off", placeholder="Password")
        el-form-item(v-if="toCreate", prop="vpassword")
          el-input(v-model.trim="signInForm.vpassword", type="password", autocomplete="off", placeholder="Confirm Password")

      div(style="width: 100%; height: 10px")

      el-row
        el-col
          el-button(v-if="toCreate", round, type="primary", style="width: 100%", @click="submit('signInForm')", :loading="createBtnLoading").
            CREATE
          el-button(v-else, round, type="primary", style="width: 100%", @click="submit('signInForm')", :loading="signInBtnLoading").
            SIGN IN

      el-row
        el-col(:span="6")
          el-button(type="text", style="text-decoration: underline;", disabled).
            Twitter
        el-col(:span="toCreate ? 6 : 12", :offset="toCreate ? 12 : 6")
          el-button(type="text", @click="reset('signInForm')").
            {{toCreate ? 'Sign In' : 'Create account'}}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class UserDropdown extends Vue {
  toCreate: boolean = false;
  createBtnLoading: boolean = false;
  signInBtnLoading: boolean = false;
  username: string = "";
  password: string = "";
  signInForm = {
    username: "",
    password: "",
    vpassword: ""
  };
  signInRules = {
    username: {
      required: true,
      validator: this.validateUsername
    },
    password: {
      required: true,
      validator: this.validatePassword
    }
  };
  signUpRules = {
    username: {
      required: true,
      validator: this.validateUsername
    },
    password: {
      required: true,
      validator: this.validatePassword
    },
    vpassword: {
      required: true,
      validator: this.validateConfirm
    }
  };
  validateUsername(rule: any, value: string, callback: any) {
    if (value === "") {
      callback(new Error("Please input the username"));
    } else if (!/^[a-zA-Z]{5,10}$/.test(value)) {
      callback(new Error("Must be 5~10 letters"));
    } else {
      callback();
    }
  }
  validatePassword(rule: any, value: string, callback: any) {
    if (value === "") {
      callback(new Error("Please input the password"));
    } else if (
      !/^[a-zA-Z0-9\`\~\!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\{\}\\\|\;\:\'\"\,\<\.\>\/\?]{5,16}$/.test(
        value
      )
    ) {
      callback(new Error("Length must be 5~16"));
    } else {
      callback();
    }
  }
  validateConfirm(rule: any, value: string, callback: any) {
    if (value === "") {
      callback(new Error("Please input the password again"));
    } else if (value !== this.signInForm.password) {
      callback(new Error("Passwords don't match!"));
    } else {
      callback();
    }
  }
  submit(formName: string) {
    let flag = true as any;
    (this as any).$refs[formName].validate((valid: any) => {
      if (valid) {
      } else {
        flag = false;
        return false;
      }
    });
    if (flag) {
      let username = this.signInForm.username;
      let password = this.signInForm.password;
      if (this.toCreate) {
        this.createBtnLoading = true;
        this.$store
          .dispatch("create", { username, password })
          .then(_ => {
            this.createBtnLoading = false;
            this.$message.success("success");
          })
          .catch(ex => {
            this.createBtnLoading = false;
            this.$message.error(
              (ex.response && ex.response.data) || ex.message
            );
          });
      } else {
        this.signInBtnLoading = true;
        this.$store
          .dispatch("login", { username, password })
          .then(_ => {
            this.signInBtnLoading = false;
          })
          .catch(ex => {
            this.signInBtnLoading = false;
            this.$message.error(
              (ex.response && ex.response.data) || ex.message
            );
          });
      }
    }
  }
  reset(formName: string) {
    this.toCreate = !this.toCreate;
    this.$nextTick(() => {
      (this as any).$refs[formName].resetFields();
    });
  }
  logout(e: any) {
    this.$store
      .dispatch("logout")
      .then(_ => {
        window.location.href = "/";
      })
      .catch(ex => {
        this.$message.error(ex.message);
      });
  }
}
</script>
