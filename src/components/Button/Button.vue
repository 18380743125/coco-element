<script setup lang="ts">
import { ref } from 'vue'

import type { ButtonProps } from './types'
import Icon from '../Icon/Icon.vue'

defineOptions({
  name: 'TTButton'
})
withDefaults(defineProps<ButtonProps>(), {
  nativeType: 'button'
})

const buttonRef = ref<HTMLButtonElement>()

defineExpose({
  ref: buttonRef
})
</script>

<template>
  <button
    ref="buttonRef"
    class="tt-button"
    :class="{
      [`tt-button--${type}`]: type,
      [`tt-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <Icon icon="spinner" spin v-if="loading" />
    <Icon :icon="icon" v-if="icon" />
    <span>
      <slot />
    </span>
  </button>
</template>

<style scoped></style>
