<template lang="pug">
  el-main
    el-form(ref="link", :model="link", :rules="linkRules", status-icon)
      el-form-item(prop="title", label="Title")
        el-input(v-model.trim="link.title", maxlength="20")

      el-form-item(prop="url", label="Url")
        el-input(v-model.trim="link.url", autocomplete="off")

      el-form-item(style="text-align: center;")
        el-button(type="primary", @click="submit('link')", :loading="submitLoading") SUBMIT
        el-button(@click="reset('link')") RESET
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class AddPin extends Vue {
  submitLoading = false;
  link = {
    title: "",
    url: ""
  };
  linkRules = {
    title: {
      required: true,
      validator: this.validateTitle
    },
    url: {
      required: true,
      validator: this.validateUrl
    }
  };
  validateTitle(rule: any, value: string, callback: any) {
    if (value === "") {
      callback(new Error("Please input the title"));
    } else {
      callback();
    }
  }
  validateUrl(rule: any, value: string, callback: any) {
    if (value === "") {
      callback(new Error("Please input the url"));
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
      this.submitLoading = true;
      this.$http
        .put(`${window.location.origin}/v1/pins`, {
          title: this.link.title,
          url: this.link.url
        })
        .then(data => {
          this.submitLoading = false;
          this.$message.success("Success");
          this.reset("link");
        })
        .catch(ex => {
          this.submitLoading = false;
          this.$message.error(ex.message);
        });
    }
  }
  reset(formName: string) {
    (this as any).$refs[formName].resetFields();
  }
}
</script>
