import { onMounted, onUnmounted, isRef, watch, unref } from 'vue'
import type { Ref } from 'vue'

function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => any
) {
  if (isRef(target)) {
    watch(target, (newValue, oldValue) => {
      oldValue?.removeEventListener(event, handler)
      newValue?.addEventListener(event, handler)
    })
  } else {
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }

  onUnmounted(() => {
    unref(target)?.removeEventListener(event, handler)
  })
}

export default useEventListener
