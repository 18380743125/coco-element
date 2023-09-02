import type { VNode, ComponentInternalInstance } from 'vue'

export interface MessageProps {
  id: string
  zIndex: number
  message?: string | VNode
  duration?: number
  showClose?: boolean
  type?: 'success' | 'info' | 'warning' | 'danger'
  offset?: number
  transitionName?: string
  onDestroy: () => void
}

export type CreateMessageProps = Omit<MessageProps, 'onDestroy' | 'id' | 'zIndex'>

export interface MessageContext {
  id: string
  vnode: VNode
  vm: ComponentInternalInstance
  props: MessageProps
  destroy: () => void
}
