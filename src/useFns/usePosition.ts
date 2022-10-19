import { ref, Ref, computed, reactive } from 'vue'
interface UsePositionRes {
  x: Ref<number>
  y: Ref<number>
}
export const usePosition = (a: number, b: number): UsePositionRes => {
  const x = ref(a)
  const y = ref(b)
  return {
    x, y
  }
}
