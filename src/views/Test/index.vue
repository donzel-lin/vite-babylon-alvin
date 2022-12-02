<template>
  <div>
    test页面
    <p>{{ value }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref('aaa')
</script>

<style lang="scss" scoped>

</style>
