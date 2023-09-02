<script setup lang="ts">
import { onMounted } from 'vue'

import Button from '@/components/Button/Button.vue'
import { createMessage } from './components/Message/method'

onMounted(() => {})

const open = () => {
  createMessage({
    type: 'warning',
    message: 'hello，你好'
  })
}
</script>

<template>
  <Button @click="open" ref="buttonRef">Test Button</Button>
</template>

<style scoped></style>
