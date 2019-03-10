// import { CreateElement, VNodeData, VNode } from 'vue'
import { UiNode } from '@megh5/ui/types/core/constants'
// import { deepCopy } from '@megmore/es-helper'
//
//
// export function compileProjectData(h: CreateElement, PNode: UiNode []): VNode[] {
//   const result: VNode[] = []
//   if (PNode !== undefined) {
//     for (let node of PNode) {
//       // const elementData: VNodeData = {
//       //   props: deepCopy(node.uiConfig)
//       // }
//       if (node.nodeData.slot) {
//         elementData.slot = node.nodeData.slot
//         delete node.nodeData.slot
//       }
//       result.push(h(
//         'Element',
//         elementData,
//         [h(node.name, node.nodeData, node.children ? compiler(h, node.children) : [])]
//       ))
//     }
//   }
//
//   return result
// }

export function getPathNode (path: string, rootNode: UiNode[]): UiNode {
  const pathData = path.split('/')
  let result: UiNode = {
    name: '',
    path: '',
    nodeData: {
      props: {}
    },
    children: rootNode
  }
  pathData.forEach(tempIndex => {
    // @ts-ignore
    result = result.children![tempIndex]
  })

  console.log(path)
  console.log(result)

  return result
}
