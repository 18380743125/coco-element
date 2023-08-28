<script setup lang="ts">
import { onMounted, ref, h } from 'vue'

import Button from '@/components/Button/Button.vue'
import Collapse from './components/Collapse/Collapse.vue'
import CollapseItem from './components/Collapse/CollapseItem.vue'
import Icon from './components/Icon/Icon.vue'
import Tooltip from './components/Tooltip/Tooltip.vue'
import type { TooltipInstance } from './components/Tooltip/types'
import type { MenuOption } from './components/Dropdown/types'
// import Dropdown from './components/Dropdown/Dropdown.vue'
import Dropdown from './components/Dropdown/Dropdown'

const openedValue = ref(['a'])
const size = ref<any>('xl')
const trigger = ref<any>('click')
const dropdownRef = ref<TooltipInstance | null>(null)

onMounted(() => {})

setTimeout(() => {
  size.value = '2xl'
  trigger.value = 'hover'
}, 3000)

const open = () => {
  dropdownRef.value?.show()
}
const close = () => {
  dropdownRef.value?.hide()
}

const options: MenuOption[] = [
  { key: 1, label: h('b', 'this is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' }
]

const inlineConsole = (...args: any) => {
  console.log(...args)
}
</script>

<template>
  <Dropdown
    placement="bottom"
    :trigger="trigger"
    :menu-options="options"
    @visible-change="(e: boolean) => inlineConsole('visible change', e)"
    @select="(e: MenuOption) => inlineConsole('select', e)"
    
    ref="dropdownRef"
  >
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </Dropdown>
  <Button @click="open" ref="buttonRef">Test Button</Button>
  <Button @click="close" plain>Plain Button</Button>
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
