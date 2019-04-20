import { findNode, deepCopy } from '@mobov/es-helper'
import { merge } from 'lodash'
import { Vue, Component, Prop, Provide, Emit, Inject, Mixins } from 'vue-property-decorator'
import { CreateElement, VNode, VNodeData } from 'vue'
import Store, { PageData, SET_ACTIVE_UID } from '@/store'
import { UiNode, UiModule, ProjectData } from '@megh5/ui/types/core/constants'

export function getPathNode (uid: string, rootNode: UiNode[]): UiNode {
  const result = findNode({
    data: rootNode,
    field: 'uid',
    key: uid,
    childField: 'children'
  })

  return result
}

export function getPathParentNode (uid: string, rootNode: UiNode[]): UiNode {
  const result = findNode({
    data: rootNode,
    field: 'uid',
    key: uid,
    childField: 'children'
  })

  return result
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
            node
          }
        }

        if (node.nodeData.slot) {
          elementData.slot = node.nodeData.slot
          // delete node.nodeData.slot
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
