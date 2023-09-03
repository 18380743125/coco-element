<script setup lang="ts">
import { omit } from 'lodash-es'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IconProps } from './types'
import { computed } from 'vue'

defineOptions({
  name: 'TTIcon',
  inheritAttrs: false
})

const props = defineProps<IconProps>()

const filteredProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => (props.color ? { color: props.color } : {}))
</script>

<template>
  <i class="tt-icon" :class="{ [`tt-icon--${type}`]: type }" :style="customStyles" v-bind="$attrs">
    <FontAwesomeIcon v-bind="filteredProps" />
  </i>
</template>

<style scoped></style>
