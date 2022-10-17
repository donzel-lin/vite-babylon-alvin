
<template>
  <div
    class="drag-wrapper"
    draggable
    @drag="dragStart"
    @drop="drop"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
// import { ref, computed } from 'vue'
import { usePosition } from '../useFns/usePosition'
const dragStart = (e:Event) => {
  const evt = (e || window.event) as MouseEvent
  const { x, y } = usePosition(evt.clientX, evt.clientY)
  console.log(x.value, y.value)
}
// interface DragStyle {
//   left: string
//   top: string
// }
// const dragStyle: DragStyle = computed({
//   get: () => {
//     return {
//       left: x.value + 'px',
//       top: y.value + 'px'
//     }
//   }
// })
const drop = () => {
  console.log('drop')
}
</script>

<style lang="scss" scoped>
.drag-wrapper {
    width: 200px;
    height: 200px;
    background-color: aqua;
    position: fixed;
    z-index: 500;
}
</style>
