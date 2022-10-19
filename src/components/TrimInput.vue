<template>
  <el-input
    v-model="inputValue"
    v-trim
    @blur="blur"
    @input="input"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// 定义props
const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})
// 自定义事件
const emit = defineEmits(['update:value'])

const inputValue = ref(props.value)

const blur = () => {
  console.log('asdfasdf', inputValue.value.length, inputValue.value, 'value')
  emit('update:value', inputValue.value)
}
const input = () => {
  console.log('input', inputValue.value.length, inputValue.value, 'input')
}
</script>

<style lang="scss" scoped>

</style>
