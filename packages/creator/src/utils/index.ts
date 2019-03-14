import { findNode } from '@megmore/es-helper'
import { UiNode } from '@megh5/ui/types/core/constants'

export function getPathNode (uid: string, rootNode: UiNode[]): UiNode {
  const result = findNode({
    data: rootNode,
    field: 'uid',
    key: uid,
    childField: 'children'
  })

  return result
}
