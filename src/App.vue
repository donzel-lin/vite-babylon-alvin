<script setup lang="ts">
import EmptyView from './views/Layout/EmptyView.vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

function findScroller (element: any) {
  element.onscroll = function () {
    console.log(element)
  }

  Array.from(element.children).forEach((el) => {
    return findScroller(el)
  })
}

findScroller(document.body)
</script>

<template>
  <empty-view />
</template>
