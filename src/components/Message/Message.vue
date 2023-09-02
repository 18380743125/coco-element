<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import { getLastBottomOffset } from './method'
import type { MessageProps } from './types'

import RenderVnode from '../Common/RenderVnode'
import Icon from '../Icon/Icon.vue'
import useEventListener from '../../hooks/useEventListener'

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  showClose: true,
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up'
})

let timer: any
const visible = ref(false)
const messageRef = ref<HTMLDivElement>()
const height = ref(0) // message 的高度

const lastOffset = computed(() => getLastBottomOffset(props.id))
const topOffset = computed(() => lastOffset.value + props.offset)
const bottomOffset = computed(() => height.value + topOffset.value)
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}))

// watch(visible, (visible: boolean) => {
//   if (!visible) {
//     props.onDestroy()
//   }
// })

onMounted(async () => {
  visible.value = true
  startTimer()
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
})

useEventListener(document, 'keydown', (e: Event) => {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false
  }
})

// 自动关闭
const startTimer = () => {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
const clearTimer = () => {
  clearTimeout(timer)
}

const destroyComponent = () => {
  props.onDestroy()
}

const updateHeight = () => {
  height.value = messageRef.value!.getBoundingClientRect().height
}

defineExpose({
  bottomOffset,
  visible
})
</script>

<template>
  <Transition :name="transitionName" @enter="updateHeight" @after-leave="destroyComponent">
    <div
      ref="messageRef"
      class="tt-message"
      v-show="visible"
      role="alert"
      :class="{
        [`tt-message--${type}`]: type,
        'is-close': showClose
      }"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="tt-message__content">
        <slot>
          <RenderVnode :v-node="message" v-if="message" />
        </slot>
      </div>
      <div class="tt-message__close" v-if="showClose">
        <Icon @click.stop="visible = false" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>

<style lang="less" scoped></style>
