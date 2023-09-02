import { onMounted, onUnmounted, type Ref } from 'vue'

function useClickOutside(
  elementRef: Ref<undefined | HTMLElement>,
  callback: (e: MouseEvent) => void
) {
  onMounted(() => {
    document.addEventListener('click', handler)
  })

  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })

  const handler = (e: MouseEvent) => {
    const element = elementRef.value
    if (!element || !e.target) return

    if (!element.contains(e.target as HTMLElement)) {
      callback(e)
    }
  }
}

export default useClickOutside
