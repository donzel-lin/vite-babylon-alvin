<template>
  <div>
    <img
      draggable="true"
      @dragstart="dragStart"
      class="img-item"
      src="https://api.polotno.dev/text-templates/2021-06-01-text-plain-adventure-fun-cursive.png"
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const dragStart = (e) => {
  e.dataTransfer.setData('type', 'img')
}
</script>

<style lang="scss" scoped>
.img-item{
    width: 100px;
    height: 100px;
}
</style>
