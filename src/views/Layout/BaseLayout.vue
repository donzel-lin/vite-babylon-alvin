<template>
  <el-container class="mx-auto w-full h-full overflow-hidden">
    <el-header>
      <header-page />
    </el-header>
    <el-main class="p-0">
      <div class="content flex h-full">
        <div class="side-bar h-full">
          <side-menu />
        </div>
        <div class="flex-1">
          <empty-view />
        </div>
      </div>
    </el-main>
    <el-footer>
      <footer-page />
    </el-footer>
  </el-container>
</template>

<script lang="ts" setup>
import HeaderPage from './HeaderPage.vue'
import FooterPage from './FooterPage.vue'
import EmptyView from './EmptyView.vue'
import SideMenu from './SideMenu.vue'
</script>

<style lang="scss" scoped>
</style>
