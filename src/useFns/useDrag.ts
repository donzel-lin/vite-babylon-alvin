import { ref, reactive } from 'vue'

interface DragPosition {
  offsetX: number
  offsetY: number
  x: number
  y: number
}
export const useDrag = () => {
  const isMoving = ref(false)
  const dragPosition: DragPosition = reactive({
    offsetX: 0,
    offsetY: 0,
    x: 0,
    y: 0
  })
  const dragStart = (evt: DragEvent) => {
    dragPosition.offsetX = evt.offsetX
    dragPosition.offsetY = evt.offsetY
  }
  const drag = (evt: DragEvent) => {
    dragPosition.x = evt.clientX
    dragPosition.y = evt.clientY
    isMoving.value = true
  }

  const drop = (evt: DragEvent) => {
    dragPosition.x = evt.clientX
    dragPosition.y = evt.clientY
    isMoving.value = false
  }
  return {
    drop, drag, dragStart, isMoving, dragPosition
  }
}
