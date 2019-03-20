import { UiNode } from '@megh5/ui/types/core/constants'
import JSZip from 'jszip'
import { deepCopy } from '@megmore/es-helper'
import md5 from 'blueimp-md5'
const base64Reg = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i


function dataURLtoBlob(dataurl: string) {
  // @ts-ignore
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

export function handleExportNodeAssets (nodeData: UiNode[], Zip: typeof JSZip) {
  const AssetsMap: string[] = []
  nodeData.forEach(data => {
    if (data.nodeData.props) {
      const Props = data.nodeData.props
      Reflect.ownKeys(Props).forEach((propKey: any) => {
        if (base64Reg.test(Props[propKey])) {
          const fileName = md5(Props[propKey])
          if (!AssetsMap.includes(fileName)) {
            let suffix = Props[propKey].match(base64Reg)
            suffix = suffix[1].split('/')[1]
            Zip.file(`${fileName}.${suffix}`, dataURLtoBlob(Props[propKey]))
            Props[propKey] = `@/assets/${fileName}.${suffix}`
            AssetsMap.push(fileName)
          }
        }
      })
    }

    handleExportNodeAssets(data.children, Zip)
  })
}


