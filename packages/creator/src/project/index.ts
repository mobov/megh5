/**
 * Created by nocoolyoyo on 2019/3/19.
 */
import { ProjectData } from '@megh5/ui/types/core/constants'
import JSZip from 'jszip'
import { merge, cloneDeep } from 'lodash'
import defPackageData from './files/package'
import defMegh5Data from './files/megh5.project'
import defMainData from './files/main'

export async function exportProject (project: ProjectData) {
  const Pack = new JSZip()
  const PackSrc = Pack.folder('src')
  const PackageData = cloneDeep(defPackageData)
  const Megh5Data = cloneDeep(defMegh5Data)
  const MainData = cloneDeep(defMainData)

  merge(PackageData, {
    name: project.name,
    version: project.version
  })
  merge(Megh5Data, {
    name: project.name,
    version: project.version
  })

  PackSrc.file('megh5.json', JSON.stringify(Megh5Data, null, 2))
  PackSrc.file('main.js', MainData)
  Pack.file('package.json', JSON.stringify(PackageData, null, 2))

  const content = await Pack.generateAsync({ type: 'blob' })
  const a: HTMLAnchorElement = document.createElement('a')
  // 利用URL.createObjectURL()方法为a元素生成blob URL
  a.href = URL.createObjectURL(content)
  // 设置文件名，目前只有Chrome和FireFox支持此属性
  a.download = `${PackageData.name}.zip`
  a.click()
}

export async function importProject () {

}

export {
  defMegh5Data as tempateProject
}
