import { ref, reactive, onMounted, onUnmounted, Ref } from 'vue'

export const useDrag2 = (selector: string, scale: Ref<number>) => {
  let el: HTMLElement | null
  onMounted(() => {
    el = document.getElementById(selector)
    el?.addEventListener('mousedown', _eventHandle)
  })
  // 鼠标位置
  const x = ref(100)
  const y = ref(100)
  const offsetSize = reactive({
    w: 200,
    h: 200,
    offsetX: 0,
    offsetY: 0
  })
  const updatePosition = (e: MouseEvent) => {
    // 给中心点坐标吧
    x.value = e.pageX - offsetSize.offsetX + offsetSize.w * scale.value / 2
    y.value = e.pageY - offsetSize.offsetY + offsetSize.h * scale.value / 2
  }
  const _eventHandle = (e: MouseEvent) => {
    // 移动前保留offsetX
    offsetSize.offsetX = e.offsetX
    offsetSize.offsetY = e.offsetY
    el?.addEventListener('mousemove', updatePosition)
    el?.addEventListener('mouseup', () => {
      el?.removeEventListener('mousemove', updatePosition)
    })
  }
  // 怎么触发是关键
  // 移除监听事件
  onUnmounted(() => {
    el?.removeEventListener('mousedown', _eventHandle)
    el?.removeEventListener('mouseup', () => {
      el?.removeEventListener('mousemove', updatePosition)
    })
  })
  return { x, y, offsetSize }
}
