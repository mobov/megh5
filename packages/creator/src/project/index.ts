/**
 * Created by nocoolyoyo on 2019/3/19.
 */
import { ProjectData } from '@megh5/ui/types/core/constants'
import JSZip from 'jszip'
import { merge } from 'lodash'
import packageData from './files/package'
import megh5Data from './files/megh5.project'
import mainData from './files/main'

export async function exportProject (project: ProjectData) {
  const Pack = new JSZip()
  const PackSrc = Pack.folder('src')
  PackSrc.file('megh5.json', JSON.stringify(megh5Data, null, 2))
  PackSrc.file('main.js', mainData)
  merge(packageData, {
    name: project.name,
    version: project.version
  })
  Pack.file('package.json', JSON.stringify(packageData, null, 2))

  const content = await Pack.generateAsync({ type: 'blob' })
  const a: HTMLAnchorElement = document.createElement('a')
  // 利用URL.createObjectURL()方法为a元素生成blob URL
  a.href = URL.createObjectURL(content)
  // 设置文件名，目前只有Chrome和FireFox支持此属性
  a.download = `${project.name}.zip`
  a.click()
}

export async function importProject () {

}

export {
  megh5Data as tempateProject
}
