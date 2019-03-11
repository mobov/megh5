import { UiNode } from '@megh5/ui/types/core/constants'

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

  return result
}
