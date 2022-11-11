<template>
  <div>
    <component
      :is="comName"
      :message="content"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  content: {
    type: String,
    default: ''
  }
})
const comName = computed(() => {
  const aa = props.type + '-row'
  console.log(aa, 'aa')
  return aa
})
</script>
<script lang="ts">
// eslint-disable-next-line import/first
import TextRow from './TextRow.vue'
export default {
  components: {
    TextRow
  }
}
</script>
