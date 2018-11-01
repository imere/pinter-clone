<template lang="pug">
  el-header
    el-row
      el-col
        el-menu(mode="horizontal", router=true, :default-active="$route.path")

          el-menu-item(index="/" type="text")
            router-link(to="/") Home

          el-menu-item(index="" type="text", style="float: right;")
            UserDropdown

          el-menu-item(v-if="$store.state.logged", index="/add-pin" type="text", style="float: right;")
            router-link(to="/add-pin") Add

          el-menu-item(v-if="$store.state.logged", index="/my-pins" type="text", style="float: right;")
            router-link(to="/my-pins") My Pins
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import UserDropdown from "./UserDropdown/UserDropdown.vue";

@Component({
  components: {
    UserDropdown
  }
})
export default class Header extends Vue {}
</script>
<style lang="scss" scoped>
@media all and (max-width: 600px) {
  .el-menu-item {
    font-size: 0.2rem;
  }
}
</style>
