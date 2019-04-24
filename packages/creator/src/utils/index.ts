import { findNode, deepCopy } from '@mobov/es-helper'
import { merge } from 'lodash'
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { CreateElement, VNode, VNodeData, VueConstructor } from 'vue'
import Store, { UiNodes, SET_ACTIVE_UID } from '@/store'
import { UiNode, UiModule, ProjectData } from '@megh5/ui/types/core/constants'

let getPathNodeCache: UiNode
export function getPathNode (uid: string, rootNode: UiNode[]): UiNode {
  if (getPathNodeCache && getPathNodeCache.uid === uid) {
    return getPathNodeCache
  }
  return findNode({
    data: rootNode,
    field: 'uid',
    key: uid,
    childField: 'children'
  })
}

export function compiler (h: CreateElement, PNode: UiNode []): VNode[] {
  const result: VNode[] = []
  if (PNode !== undefined) {
    for (let node of PNode) {
      // @ts-ignore
      const nodeModule = deepCopy(Store.state.UiModules.find(item => item.name === node.name)) as UiModule
      // @ts-ignore
      node.nodeData = merge(nodeModule.nodeData, node.nodeData)
      // @ts-ignore
      if (nodeModule.uiConfig.disabled) {
        result.push(h(node.name, node.nodeData, node.children ? compiler(h, node.children) : []))
      } else {
        const elementData: VNodeData = {
          key: node.uid,
          props: {
            ...nodeModule.uiConfig,
            node,
            value: node
          }
        }

        if (node.nodeData.slot) {
          elementData.slot = node.nodeData.slot
        }

        result.push(h(
          'comp-suit',
          elementData,
          []
        ))
      }
    }
  }

  return result
}
