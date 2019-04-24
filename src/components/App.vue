<template lang="pug">
  el-container(direction="vertical")
    Header
    div(style="width:100%; height:10px")
    router-view
    Footer
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { Loading } from "element-ui";
import { sget, sclear } from "./StorageControl";
import Header from "./Header/Header.vue";
import Footer from "./Footer/Footer.vue";

@Component({
  components: {
    Header,
    Footer
  }
})
export default class App extends Vue {
  @Watch("$route")
  onRouteChanged(to: Route, from: Route) {
    this.$root.$emit("auth");
  }

  auth(reload?: boolean) {
    if (sget("user") !== "") {
      return true;
    } else {
      if (reload) {
        alert("Authentication failed");
        window.location.href = "/";
      }
      sclear();
      return false;
    }
  }

  mounted() {
    this.$store.dispatch("init");
    this.$root.$on("auth", this.auth);
    this.auth();
    (window as any).HOLDER = (this as any).$HOLDER;
  }
}
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  box-sizing: border-box

li
  list-style-type: none

a
  text-decoration: none
  &.router-link-exact-active
    font-weight: bold

a:hover,
a:visited
  color: black
  text-decoration: none

.cards
  column-count: 1
  column-gap: 5px
  .card
    max-width: 200px
    margin-bottom: 5px
    break-inside: avoid
    img
      width: 100%
      height: auto

.el-container
  padding: 0 10%

.el-main
  min-height: 100px

@media all and (max-width: 850px)
  .el-container
    padding: 0 8%

@media all and (max-width: 700px)
  .el-container
    padding: 0 5%

@media all and (max-width: 550px)
  .el-container
    padding: 0

@media all
  .cards
    @for $i from 1 through 10
      @media (min-width: #{($i - 1) * 200 + 200}px)
        column-count: #{$i + 1}

.fade-enter-active,
.fade-leave-active
  transition: opacity .5s

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity: 0
</style>
