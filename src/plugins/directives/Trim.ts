import type { Directive } from 'vue'

interface ElType extends HTMLElement {
  inputEl: any
  _blurhandler: (e: any) => any
}

const getInput = (el: HTMLElement): HTMLElement => {
  let inputEl: HTMLElement
  if (el.tagName !== 'INPUT') {
    inputEl = el.querySelector('input') as HTMLElement
  } else {
    inputEl = el
  }
  return inputEl
}

const dispatchEvent = (el: HTMLElement, type: string): void => {
  const evt = document.createEvent('Events')
  evt.initEvent(type, true, true)
  el.dispatchEvent(evt)
}

const Trim: Directive = {
  mounted (el: ElType) {
    const inputEl = getInput(el)
    const handler = (e: any): any => {
      const newVal = e.target.value?.trim()
      if (e.target.value !== newVal) {
        e.target.value = newVal
        // 需要
        dispatchEvent(inputEl, 'input')
        dispatchEvent(inputEl, 'blur')
      }
    }
    el.inputEl = inputEl
    el._blurhandler = handler
    inputEl.addEventListener('blur', handler)
  },
  unmounted (el: ElType) {
    const { inputEl } = el
    inputEl.removeEventListener('blur', el._blurhandler)
  }
}

export default Trim
