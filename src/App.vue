<script setup lang="ts">
import Switch from '@/components/Switch/Switch.vue'
import { ref } from 'vue'
import type { SwitchValueType } from './components/Switch/types'

const value = ref(false)

const handleChange = (e: SwitchValueType) => {
  console.log(e)
}
</script>

<template>
  <div>
    <Switch active-text="ON" inactive-text="OFF" v-model="value" @change="handleChange"></Switch>
  </div>
</template>

<style scoped></style>
