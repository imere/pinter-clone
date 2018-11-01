import Vue from 'vue'
import axios from 'axios'
import { Loading, MessageBox, Notification, Message } from "element-ui";

// 在 types/vue.d.ts 里 Vue 有构造函数类型
declare module 'vue/types/vue' {
  interface Vue {
    $http: typeof axios,
    $loading: typeof Loading.service,
    $msgbox: typeof MessageBox,
    $alert: typeof MessageBox.alert,
    $confirm: typeof MessageBox.confirm,
    $prompt: typeof MessageBox.prompt,
    $notify: typeof Notification,
    $message: typeof Message
  }
}
