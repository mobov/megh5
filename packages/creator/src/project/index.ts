/**
 * Created by nocoolyoyo on 2019/3/19.
 */
import { ProjectData } from '@megh5/ui/types/core/constants'
import JSZip from 'jszip'
import { merge, cloneDeep } from 'lodash'
import defPackageData from './files/package'
import defMegh5Data from './files/megh5.project'
import defMainData from './files/main'
import AppData from './files/App'
import { handleExportNodeAssets, handleImportNodeAssets } from './utils'
import { saveAs } from 'file-saver'

export async function exportProject (project: ProjectData) {
  const Pack = new JSZip()
  const PackSrc = Pack.folder('src')
  const PackSrcAssets = PackSrc.folder('assets')
  const PackageData = cloneDeep(defPackageData)
  const Megh5Data = cloneDeep(project)
  const MainData = cloneDeep(defMainData)

  merge(PackageData, {
    name: project.name,
    version: project.version
  })
  // Megh5Data base64提取成静态资源
  handleExportNodeAssets(Megh5Data.UiNodes, PackSrcAssets)
  // PackSrcAssets.file("smile.gif", imgData, { base64: true })
  PackSrc.file('megh5.json', JSON.stringify(Megh5Data, null, 2))
  PackSrc.file('main.js', MainData)
  PackSrc.file('App.vue', AppData)
  Pack.file('package.json', JSON.stringify(PackageData, null, 2))

  const content = await Pack.generateAsync({ type: 'blob' })
  saveAs(content, `${PackageData.name}.zip`)
}

export async function importProject (file: any): Promise<ProjectData> {
  const Zip = await JSZip.loadAsync(file)
  let megh5DataStr = await Zip.file('src/megh5.json').async('binarystring')
  const megh5Data: ProjectData = JSON.parse(megh5DataStr)
  await handleImportNodeAssets(megh5Data.UiNodes, Zip)
  return cloneDeep(megh5Data)
}

export {
  defMegh5Data as tempateProject
}
