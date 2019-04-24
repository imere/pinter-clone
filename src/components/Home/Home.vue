<template lang="pug">
  el-main
    div(class="cards")
      div(v-for="pin in pins", class="card")
        trasition(name="fade")
          el-card(:body-style="{ padding: '0' }")
            img(:src="pin.url", onerror="this.src = window.HOLDER")
            div(style="padding: 14px;")
              span {{pin.title}}
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { CancelTokenSource } from "axios";

@Component
export default class Home extends Vue {
  pins: Array<any> = [];
  source: CancelTokenSource = this.$http.CancelToken.source();

  getPins() {
    const loading = this.$loading({ target: ".cards" });
    this.$http
      .get(`${window.location.origin}/v1/pins`, {
        cancelToken: this.source.token
      })
      .then((data: any) => {
        const d = JSON.parse(data.data);
        loading.close();
        d.forEach((v: any) => this.pins.push(v));
      })
      .catch((ex: any) => {
        loading.close();
        if (this.$http.isCancel(ex)) return;
        this.$message.error((ex.response && ex.response.data) || ex.message);
      });
  }

  mounted() {
    this.getPins();
  }

  beforeDestroy() {
    this.source.cancel();
  }
}
</script>

<style lang="sass" scoped>
.bottom
  margin-top: 13px
  line-height: 12px

.clearfix:before,
.clearfix:after
  display: table
  content: ""

.clearfix:after
  clear: both
</style>
