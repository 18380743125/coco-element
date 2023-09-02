<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

import type { DropdownProps, DropdownEmits, DropdownInstance, MenuOption } from './types'
import type { TooltipInstance } from '../Tooltip/types'

import Tooltip from '../Tooltip/Tooltip.vue'
import RenderVnode from '../Common/RenderVnode'

defineOptions({
  name: 'TTDropdown'
})

const props = withDefaults(defineProps<DropdownProps>(), {
  hideAfterClick: true
})
const emits = defineEmits<DropdownEmits>()

const tooltipRef = ref() as Ref<TooltipInstance>

const visibleChange = (visible: boolean) => {
  emits('visible-change', visible)
}

const itemClick = (item: MenuOption) => {
  if (item.disabled) {
    return
  }
  emits('select', item)
  if (props.hideAfterClick) {
    tooltipRef.value.hide()
  }
}

defineExpose<DropdownInstance>({
  show: () => tooltipRef.value.show(),
  hide: () => tooltipRef.value.hide()
})
</script>

<template>
  <div class="tt-dropdown">
    <Tooltip
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      @visible-change="visibleChange"
      manual
      ref="tooltipRef"
    >
      <slot />
      <template #content>
        <ul class="tt-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li v-if="item.disabled" class="divided-placeholder" role="separator" />
            <li
              class="tt-dropdown__item"
              :class="{ 'is-disabled': item.disabled, 'is-divided': item.divided }"
              :id="`dropdown-item-${item.key}`"
              @click="itemClick(item)"
            >
              <RenderVnode :v-node="item.label" />
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<style lang="less" scoped></style>
