<template>
  <div class="whitespace-pre-wrap">
    {{ message }}
  </div>
</template>

<script lang="ts" setup>
defineProps({
  message: {
    type: String,
    default: ''
  }
})
</script>
