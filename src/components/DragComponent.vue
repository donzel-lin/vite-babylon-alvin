
<template>
  <div
    id="drag1"
    class="drag-wrapper"
    :class="{
      'is-moving pointer': isMoving
    }"
    :style="dragStyle"
    draggable="true"
    @dragstart="dragStart"
    @drag="drag"
    @dragend="drop"
    @mousedown="selectCom"
    @mousewheel.prevent="mousewheel"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useDrag } from '../useFns/useDrag'
import { useTransform } from '../useFns/useTransform'
const { isMoving, dragStart, drag, dragPosition, drop } = useDrag()

// 缩放功能
const { isFocus, focusEl, scale } = useTransform('drag1')

const dragStyle = computed(() => {
  return {
    left: `${dragPosition.x - dragPosition.offsetX}px`,
    top: `${dragPosition.y - dragPosition.offsetY}px`,
    transform: `scale(${scale.value})`
  }
})

const selectCom = () => {
  focusEl()
}

const mousewheel = (evt: WheelEvent) => {
  if (isFocus.value) {
    const deltaY = evt.deltaY
    const deltaGap = Number((deltaY / 200).toFixed(2))
    scale.value += deltaGap
    if (scale.value <= 1) {
      scale.value = 1
    }
  }
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
