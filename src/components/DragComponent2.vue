<template>
  <div
    class="drag-com2 drag-wrapper"
    id="drag2"
    :style="dragStyle"
    @mousedown="selectCom"
    @mousewheel.prevent="mousewheel"
    v-click-outside="blurEl"
  >
    <div
      class="wrapper"
      :style="bodyStyle"
    >
      <span>x: {{ x }}</span>
      <span>y: {{ y }}</span>
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useDrag2 } from '../useFns/useDrag2'
import { useTransform } from '../useFns/useTransform'
// 缩放功能
const { isFocus, focusEl, blurEl, scale } = useTransform('drag2')
// 元素中心点
const { x, y, offsetSize } = useDrag2('drag2', scale)

const bodyStyle = computed(() => {
  return {
    transform: `scale(${scale.value})`
  }
})
const dragStyle = computed(() => {
  // 找到中心点，然后 在计算 左上角的坐标
  const left = x.value - offsetSize.w * scale.value / 2
  const top = y.value - offsetSize.h * scale.value / 2
  return {
    left: `${left}px`,
    top: `${top}px`,
    width: offsetSize.w * scale.value + 'px',
    height: offsetSize.h * scale.value + 'px'
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
    // 还需要处理 缩放后，位置问题
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
    box-sizing: border-box;
    .wrapper {
      width: 200px;
      height: 200px;
      position: absolute;
      left: 0;
      top: 0;
      transform-origin: left top;
      pointer-events: none;
    }
    &.is-select {
      border: 2px dashed #eee;
    }
}
</style>
