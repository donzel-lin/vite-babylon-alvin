<template>
  <div>
    <el-input
      v-model="inputValue"
      @blur="blur"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  value: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['validate'])
const inputValue = ref(props.value)

// const change = () => {
//   console.log(inputValue.value, 'asdf111', inputValue)
//   emit('update:value', inputValue.value)
// }
const blur = () => {
  console.log('blur', inputValue.value, '222222222222')
  emit('validate')
}

</script>

<style lang="scss" scoped>

</style>
