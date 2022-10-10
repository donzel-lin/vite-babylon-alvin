<template>
  <div class="container mx-auto w-full h-full">
    <header-page />
    <div class="content flex">
      <div class="side-bar h-full">
        <side-menu />
      </div>
      <div class="flex-1">
        <empty-view />
      </div>
    </div>
    <footer-page />
  </div>
</template>

<script lang="ts" setup>
import HeaderPage from './HeaderPage.vue'
import FooterPage from './FooterPage.vue'
import EmptyView from './EmptyView.vue'
import SideMenu from './SideMenu.vue'
</script>

<style lang="scss" scoped>
.content {
  height: calc(100% - 8rem);
}
</style>
