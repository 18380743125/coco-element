<script setup lang="ts">
import { provide, ref, watch } from 'vue'

import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'

defineOptions({
  name: 'TTCollapse'
})

const props = defineProps<CollapseProps>()

const emits = defineEmits<CollapseEmits>()

const activeNames = ref<NameType[]>(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  activeNames.value = newVal
})

const handleItemClick = (item: NameType) => {
  if (props.accordion) {
    activeNames.value = [activeNames.value[0] === item ? '' : item]
    return
  }
  const index = activeNames.value.indexOf(item)
  if (index > -1) {
    // 存在则 删除（折叠）
    activeNames.value.splice(index, 1)
  } else {
    // 不存在 添加 name
    activeNames.value.push(item)
  }
  emits('update:modelValue', activeNames.value)
  emits('change', activeNames.value)
}

provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>
<template>
  <div class="tt-collapse">
    <slot />
  </div>
</template>

<style lang="less" scoped></style>
