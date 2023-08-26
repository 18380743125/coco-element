<script setup lang="ts">
import { reactive, ref, watch, onUnmounted, computed } from 'vue'
import { debounce } from 'lodash-es'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'

import type { TooltipProps, TooltipEmits, ToolTipInstance } from './types'
import useClickOutSide from '../../hooks/useClickOutSide'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'top',
  trigger: 'hover',
  manual: false,
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0
})

const emits = defineEmits<TooltipEmits>()

let popperInstance: null | Instance = null
const isOpen = ref(false)
const triggerNode = ref<HTMLElement>()
const popperNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let outerEvents: Record<string, any> = reactive({})
let events: Record<string, any> = reactive({})

const popperOptions = computed(() => ({
  placement: props.placement,
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9]
      }
    }
  ],
  ...props.popperOptions
}))

// hooks
useClickOutSide(popperContainerNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    close()
  }
})

onUnmounted(() => {
  popperInstance?.destroy()
})

watch(
  isOpen,
  (newValue) => {
    if (newValue) {
      // 显示创建
      if (!triggerNode.value || !popperNode.value) return
      if (popperInstance === null) {
        popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
      }
    } else {
      // 隐藏销毁
      popperInstance?.destroy()
    }
  },
  {
    flush: 'post'
  }
)

watch(
  () => props.trigger,
  (newValue, oldValue) => {
    if (newValue !== oldValue && !props.manual) {
      // 清空事件
      outerEvents = reactive({})
      events = reactive({})
      attachEvents()
    }
  }
)

watch(
  () => props.manual,
  (isManual) => {
    if (isManual) {
      events = reactive({})
      outerEvents = reactive({})
    } else {
      attachEvents()
    }
  }
)

const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}

const open = () => {
  isOpen.value = true
  emits('visible-change', true)
}

const close = () => {
  isOpen.value = false
  emits('visible-change', false)
}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}
const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

// 添加事件
const attachEvents = () => {
  if (props.trigger === 'hover') {
    events['mouseenter'] = open
    outerEvents['mouseleave'] = close
  }
  if (props.trigger === 'click') {
    events['click'] = togglePopper
  }
}

if (!props.manual) {
  attachEvents()
}

defineExpose<ToolTipInstance>({
  show: openFinal,
  hide: closeFinal
})
</script>

<template>
  <div class="tt-tooltip" v-on="outerEvents" ref="popperContainerNode">
    <div class="tt-tooltip__trigger" ref="triggerNode" v-on="events">
      <slot />
    </div>
    <transition :name="transition">
      <div v-if="isOpen" class="tt-tooltip__popper" ref="popperNode">
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </transition>
  </div>
</template>

<style lang="less" scoped></style>
