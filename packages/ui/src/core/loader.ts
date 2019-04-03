import { isBase64 } from '@mobov/es-helper'

export function loadAssets (data: any) {
  let result = data
  if (!isBase64(result)) {
    // result = require(`@/assets/${result}`)
    result = require(result)
  }
  return result
}
