<template lang="pug">
  el-row
    el-col(:span="12", :offset="6") Not Found
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class NotFound extends Vue {}
</script>

<style lang="sass" scoped>
.el-row
  padding-top: 15vh

.el-col
  text-align: center
</style>
