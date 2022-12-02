<template>
  <div>
    <el-select
      v-model="fontSize"
      class="m-2"
      placeholder="Select"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const fontSize = ref('12')
const options = [
  {
    value: '12',
    label: '12px'
  },
  {
    value: '14',
    label: '14px'
  },
  {
    value: '16',
    label: '16px'
  }
]
</script>

<style lang="scss" scoped>

</style>
