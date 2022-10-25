import { ref, reactive, onMounted } from 'vue'

export const useDrag2 = (selector: string) => {
  let el: HTMLElement | null
  onMounted(() => {
    el = document.getElementById(selector)
  })
  const scale = ref(1)
  const isFocus = ref(false)
  const focusEl = (e: MouseEvent) => {
    isFocus.value = true
  }
  const blurEl = (e: MouseEvent) => {
    isFocus.value = false
  }

  // 鼠标位置
  const x = ref(100)
  const y = ref(100)
  const offsetSize = reactive({
    w: 200,
    h: 200,
    offsetX: 0,
    offsetY: 0
  })
  // 移动鼠标
  const updatePosition = (e: MouseEvent) => {
    // 给中心点坐标吧
    x.value = e.pageX - offsetSize.offsetX + offsetSize.w * scale.value / 2
    y.value = e.pageY - offsetSize.offsetY + offsetSize.h * scale.value / 2
  }
  const addMousemoveEvent = (e: MouseEvent) => {
    offsetSize.offsetX = e.offsetX
    offsetSize.offsetY = e.offsetY
    el?.addEventListener('mousemove', updatePosition)
  }
  const removeMousemoveEvent = () => {
    el?.removeEventListener('mousemove', updatePosition)
  }
  // 鼠标缩放
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
  return {
    x,
    y,
    offsetSize,
    isFocus,
    focusEl,
    blurEl,
    scale,
    addMousemoveEvent,
    removeMousemoveEvent,
    mousewheel
  }
}
