<template>
  <div>
    <span>echarts</span>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import echarts from '../../useFns/useCharts'
onMounted(() => {
  console.log(echarts, 'echarts')
})
</script>

<style lang="scss" scoped>

</style>
