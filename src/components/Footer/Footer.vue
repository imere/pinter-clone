<template lang="pug">
footer
  a(target="_blank" href="http://www.beian.gov.cn" style="display: inline-block; text-decoration: none; height: 20px; line-height: 20px;")
    img(id="ba" style="float: left;")
    p(style="float: left; height: 20px; line-height: 20px; margin: 0px 0px 0px 5px; color: rgb(147, 147, 147);").
      XXXX备 XXXX号

</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ba from "../../assets/b.png";

@Component
export default class Footer extends Vue {
  mounted() {
    if (!!ba) {
      (document.querySelector("#ba") as HTMLImageElement).src = ba;
    }
  }
}
</script>

<style lang="sass" scoped>
footer
  width: 100%
  display: flex
  justify-content: center
</style>
