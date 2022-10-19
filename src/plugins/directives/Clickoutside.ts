import type { Directive } from 'vue'

const Clickoutside: Directive = {
  mounted (el, binding) {
    function eventHandler (e: Event) {
      if (el.contains(e.target) as boolean) {
        return false
      }
      if ((Boolean(binding.value)) && typeof binding.value === 'function') {
        binding.value(e)
      }
    }
    el.__click__outside = eventHandler
    document.addEventListener('click', eventHandler)
  },
  unmounted (el) {
    document.removeEventListener('click', el.__click__outside)
    delete el.__click__outside
  }
}
export default Clickoutside
