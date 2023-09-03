<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Button from '@/components/Button/Button.vue'
import Input from '@/components/Input/Input.vue'
import { createMessage } from './components/Message/method'

const value = ref('')
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
  <div style="width: 300px;">
    <Input type="text" v-model="value" />
  </div>
</template>

<style scoped></style>
