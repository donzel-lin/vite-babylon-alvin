<template>
  <div
    class="drag-com2 drag-wrapper"
    id="drag2"
    :style="dragStyle"
    @mousedown="selectCom"
    @mouseup="endMove"
    @mousewheel.prevent="onmousewheel"
    v-click-outside="unSelectCom"
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
import { computed, defineEmits } from 'vue'
import { useDrag2 } from '../useFns/useDrag2'
// 拖动功能
const {
  x, y, offsetSize,
  focusEl, blurEl, scale, isFocus,
  addMousemoveEvent, removeMousemoveEvent,
  mousewheel
} = useDrag2('drag2', 320, 260)

const emit = defineEmits(['select', 'blur', 'move', 'moveEnd', 'resize'])
// 内层 样式
const bodyStyle = computed(() => {
  return {
    transform: `scale(${scale.value})`
  }
})
// 最外层样式
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
// 选中目标
const selectCom = (e: MouseEvent) => {
  focusEl(e)
  addMousemoveEvent(e)
  emit('select', e, x.value, y.value)
}
const unSelectCom = (e: MouseEvent) => {
  blurEl(e)
  emit('blur', e, x.value, y.value)
  emit('moveEnd', e, x.value, y.value)
}
// 结束移动
const endMove = () => {
  removeMousemoveEvent()
}

const onmousewheel = (e: WheelEvent) => {
  mousewheel(e)
  emit('resize', e, scale.value)
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
