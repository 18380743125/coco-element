<script setup lang="ts">
import { onMounted, ref } from 'vue'

import Button from '@/components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import CollapseItem from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import type { ToolTipInstance } from './components/Tooltip/types'

const openedValue = ref(['a'])
const size = ref<any>('xl')
const trigger = ref<any>('click')
const tooltipRef = ref<ToolTipInstance | null>(null)

onMounted(() => {})

setTimeout(() => {
  size.value = '2xl'
  trigger.value = 'hover'
}, 3000)

const hello = () => {
  tooltipRef.value?.show()
}
const nick = () => {
  tooltipRef.value?.hide()
}
</script>

<template>
  <header>
    <Tooltip ref="tooltipRef" :popper-options="{placement: 'left', strategy: 'fixed'}" :open-delay="1000">
      哈哈
      <template #content>
        <h1>哈哈哈</h1>
      </template>
    </Tooltip>
  </header>
  <Button @click="hello" ref="buttonRef">Test Button</Button>
  <Button @click="nick" plain>Plain Button</Button>
  <Button round>Round Button</Button>
  <Button circle>VK</Button>
  <Button disabled>Disabled Button</Button><br /><br />
  <Button type="primary">Primary</Button>
  <Button type="success">Success</Button>
  <Button type="info">Info</Button>
  <Button type="warning">Warning</Button>
  <Button type="danger">Danger</Button><br /><br />
  <Button type="primary" plain>Primary</Button>
  <Button type="success" plain>Success</Button>
  <Button type="info" plain>Info</Button>
  <Button type="warning" plain>Warning</Button>
  <Button type="danger" plain>Danger</Button><br /><br />
  <Button size="large">Large</Button>
  <Button size="small">Small</Button><br /><br />
  <Button size="large" loading>Loading</Button>
  <Button size="large" icon="arrow-up">Icon</Button><br /><br />

  <Collapse v-model="openedValue">
    <CollapseItem name="a" title="Title A">
      <h1>headline title</h1>
      <div>this is content a aaa</div>
    </CollapseItem>
    <CollapseItem name="b" title="Title B">
      <div>this is bbbbb test</div>
    </CollapseItem>
    <CollapseItem name="c" title="Disabled Title" disabled>
      <div>this is cccc test</div>
    </CollapseItem>
  </Collapse>
  {{ openedValue }}
  <Icon icon="arrow-up" :size="size" spin type="danger" color="orange" />
</template>

<style scoped></style>
