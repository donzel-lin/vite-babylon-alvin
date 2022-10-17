<template>
  <div class="form-row">
    <div class="label">
      {{ props.label }}
    </div>
    <div class="form-item">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
const props = defineProps({
  label: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>

</style>
