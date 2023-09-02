import { render, h, shallowReactive } from 'vue'

import MessageConstructor from './Message.vue'
import type { CreateMessageProps, MessageContext } from './types'
import useZIndex from '../../hooks/useZIndex'

let seed = 1
const instances: MessageContext[] = shallowReactive([])

export const createMessage = (props: CreateMessageProps) => {
  const { nextZIndex } = useZIndex()
  const id = `message_${seed++}`
  const container = document.createElement('div')
  // 删除数组中的实例
  const destroy = () => {
    const idx = instances.findIndex((instance) => instance.id === id)
    if (idx === -1) return
    instances.splice(idx, 1)
    render(null, container)
  }
  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestroy: destroy
  }

  // 手动调用删除
  const manualDestroy = () => {
    const instance = instances.find((instance) => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }

  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)
  const instance: MessageContext = {
    id,
    vnode,
    vm: vnode.component!,
    props: newProps,
    destroy: manualDestroy
  }
  instances.push(instance)
  return instance
}

export const getLastInstance = () => {
  return instances.at(-1)
}

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id)
  if (idx <= 0) {
    return 0
  } else {
    const preInstance = instances[idx - 1]
    return preInstance.vm.exposed!.bottomOffset.value
  }
}

export const closeAll = () => {
  instances.forEach((instance) => {
    instance.destroy()
  })
}
