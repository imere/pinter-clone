<template lang="pug">
  el-main
    div(class="cards")
      div(v-for="pin in pins", :id="pin.id",  class="card")
        el-card(:body-style="{ padding: '0' }")
          img(:src="pin.url", onerror="this.src = window.HOLDER")
          div(style="padding: 14px;")
            span {{pin.title}}
            div(class="bottom clearfix")
              time(class="time") {{pin.date}}
              el-button(type="text" class="button", :data-id="pin.id", @click="del") DELETE
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { CancelTokenSource } from "axios";

@Component
export default class MyPins extends Vue {
  pins: Array<any> = [];
  source: CancelTokenSource = this.$http.CancelToken.source();

  getPins() {
    const loading = this.$loading({ target: ".cards" });
    this.$http
      .post(`${window.location.origin}/v1/pins`, {
        cancelToken: this.source.token
      })
      .then((data: any) => {
        const d = JSON.parse(data.data);
        loading.close();
        d.forEach((v: any, i: number) => {
          this.pins.push(v);
        });
      })
      .catch((ex: any) => {
        loading.close();
        if (this.$http.isCancel(ex)) return;
        this.$message.error(ex.message);
      });
  }

  del(e: any) {
    let id = e.target.parentNode.dataset.id;
    if (!id) return;
    this.$http
      .delete(`${window.location.origin}/v1/pins/${id}`, {
        validateStatus: function(status) {
          return status < 300;
        }
      })
      .then(_ => {
        (document.querySelector(`[id="${id}"]`) as any).remove();
      })
      .catch(ex => {
        this.$message.error("Delete error");
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
.time
  font-size: 13px
  color: #999

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
