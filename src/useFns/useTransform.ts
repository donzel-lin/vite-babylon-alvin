import { ref, watchEffect } from 'vue'
export const useTransform = (selector: string) => {
  const targetEl = document.getElementById(selector)
  const scale = ref(1)
  const isFocus = ref(false)
  const focusEl = () => {
    isFocus.value = true
  }
  const blurEl = () => {
    isFocus.value = false
  }
  // watchEffect(isFocus, () => {
  //   if (isFocus.value) {
  //     targetEl
  //   } else {

  //   }
  // })
  return {
    targetEl,
    isFocus,
    focusEl,
    blurEl,
    scale
  }
}
