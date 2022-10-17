<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>

interface ruleFn {
    (value: string): boolean
}
interface FormProps {
    model: [],
    rule: ruleFn[]
}

const props = defineProps<FormProps>()
console.log(props, 'props')
</script>

<style lang="scss" scoped>

</style>
