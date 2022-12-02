<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { formRule1 } from '../../api/types/form'
interface FormProps {
    model: { name: string, phone: string},
    rule: formRule1
}

const props = defineProps<FormProps>()
console.log(props, 'props')
</script>

<style lang="scss" scoped>

</style>
