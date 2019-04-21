import Vue from 'vue'
import Vuex from 'vuex'
import { ActivePanels } from '@/constants'
import BaseModuleConfig from '../base.module.config'
import { UiNode, UiModule, UiNodeData, ProjectData } from '@megh5/ui/types/core/constants'
import { getPathNode } from '@/utils'
import { deepCopy } from '@mobov/es-helper'
import { ulid } from 'ulid'
import { merge } from 'lodash'
import domtoimage from 'dom-to-image'

Vue.use(Vuex)

function TimelineShotFilter (node: Node | any): boolean {
  return (node.tagName !== 'link')
}

export interface UiNodeOpts {
  uid: string
  locked?: boolean
  nodeData?: UiNodeData
}

export interface KV {
  [field: string]: any
}

export interface AddUiNodeOpts {
  name: string
  pid?: string
  nodeData?: UiNodeData
}

export interface StatePreviewer {
  ready: boolean
  $el: any
}

export type PageData = UiNode[]

export interface Device {
  height: number
  width: number
}

export interface GetModule {
  (name: string): UiModule
}

export interface SET_PROJECT {
  (val: ProjectData): {}
}

export interface SET_PROJECT_DATA {
  (val: KV): {}
}

export interface SET_PAGE_DATA {
  (val: UiNode[]): {}
}

export interface SET_UI_MODULE {
  (val: UiModule | UiModule[]): {}
}

export interface SET_PAGE_NODE {
  (val: UiNodeOpts): {}
}

export interface ADD_PAGE_NODE {
  (val: AddUiNodeOpts): {}
}

export interface SET_ACTIVE_UID {
  (val: string): {}
}

export interface DEL_ACTIVE_UID {
  (val: string): {}
}

export interface SET_ACTIVE_PANEL {
  (val: number): {}
}

export interface SET_PREVIEWER_READY {
  ($el: HTMLElement): {}
}

export interface SET_LOCK {
  (uid: string): {}
}

export interface ROLL_BACK {
  (uid: UiNode[]): {}
}


interface State {
  Project: ProjectData
  UiModules: Array<UiModule>
  activePanel: number
  activeUid: string
  Previewer: StatePreviewer
  timelineShot: boolean
  treeShot: string
}

let timelineShotTimer: any = null

export default new Vuex.Store<State>({
// export default new Vuex.Store({
  state: {
    Project: {
      name: 'demo',
      version: '0.0.1',
      mainUid: '0',
      dependencies: [],
      UiNodes: [],
      Device: {
        height: 736,
        width: 320
      }
    },
    UiModules: [],
    activePanel: ActivePanels.library,
    activeUid: '0',
    Previewer: {
      ready: false,
      $el: {}
    },
    timelineShot: false,
    treeShot: ''
  },
  getters: {
    PageData: (state): PageData => state.Project.UiNodes,
    Device: (state): Device => state.Project.Device,
    ActiveNode: (state): UiNode => getPathNode(state.activeUid, state.Project.UiNodes),
    GetModule: (state) => (name: string): UiModule => state.UiModules.find(item => item.name === name) as UiModule
  },
  mutations: {
    SET_PREVIEWER_READY (state, $el: HTMLElement) {
      state.Previewer.ready = true
      state.Previewer.$el = $el
    },
    SET_PROJECT (state, val: ProjectData) {
      state.Project = deepCopy(val)
    },
    SET_PROJECT_DATA (state, val: KV) {
      const data = deepCopy(val)
      merge(state.Project, data)
    },
    SET_PAGE_DATA (state, val: UiNode[]) {
      merge(state.Project.UiNodes, val)
    },
    SET_PAGE_NODE (state, val: UiNodeOpts) {
      const $target = getPathNode(val.uid, state.Project.UiNodes)
      merge($target, val)
      state.treeShot = $target.uid
      if (timelineShotTimer === null) {
        timelineShotTimer = setTimeout(() => {
          state.timelineShot = !state.timelineShot
          timelineShotTimer = null
        }, 1000)
      } else {
        clearTimeout(timelineShotTimer)
        timelineShotTimer = null
      }

      // if (val.nodeData && val.nodeData.props && val.nodeData.props.bgImg) {
      //   state.timelineShot = !state.timelineShot
      // }
    },
    ROLL_BACK (state, val: UiNode[]) {
      state.activeUid = state.Project.mainUid
      state.Project.UiNodes = val
    },
    SET_LOCK (state, uid: string) {
      const $target = getPathNode(uid, state.Project.UiNodes)
      if ($target && $target.uiConfig) {
        $target.uiConfig.locked = !$target.uiConfig.locked
      }
    },
    ADD_PAGE_NODE (state, val: AddUiNodeOpts) {
      const nodeModule = deepCopy(state.UiModules.find(item => item.name === val.name)) as UiModule
      const nodeData = nodeModule.nodeData
      let pid = val.pid

      if (pid && pid !== state.Project.mainUid) {
        const pNode = getPathNode(pid, state.Project.UiNodes)
        const pModule = state.UiModules.find(item => item.name === pNode.name) as UiModule

        if (pModule.uiConfig.isParent) {
          pid = pNode.uid
          if (pNode.nodeData.props && nodeData.props) {
            if (
              pNode.nodeData.props.height && nodeData.props.height &&
              pNode.nodeData.props.height < nodeData.props.height
            ) {
              nodeData.props.height = pNode.nodeData.props.height
            }

            if (
              pNode.nodeData.props.width && nodeData.props.width &&
              pNode.nodeData.props.width < nodeData.props.width
            ) {
              nodeData.props.width = pNode.nodeData.props.width
            }
          }
        } else {
          pid = state.Project.mainUid
        }
      } else {
        pid = state.Project.mainUid
      }

      const tempNode: UiNode = {
        name: val.name,
        uid: ulid(),
        pid: pid,
        uiConfig: nodeModule.uiConfig,
        nodeData,
        children: []
      }

      const $target = getPathNode(tempNode.pid, state.Project.UiNodes)
      Vue.set($target.children, $target.children.length, tempNode)
      state.activeUid = tempNode.uid
      state.timelineShot = !state.timelineShot
    },
    DEL_PAGE_NODE (state, val: string) {
      const $target = getPathNode(val, state.Project.UiNodes)
      const $parent = getPathNode($target.pid, state.Project.UiNodes)
      const index = $parent.children.findIndex($node => $node.uid === $target.uid)
      Vue.delete($parent.children, index)
      state.activeUid = state.Project.mainUid
      state.timelineShot = !state.timelineShot
    },
    SET_UI_MODULE (state, val: UiModule | UiModule[]) {
      if (val instanceof Array) {
        const result: any = val.map(item => merge(item, BaseModuleConfig))
        state.UiModules = state.UiModules.concat(result)
      } else {
        const result: UiModule = merge(val, BaseModuleConfig)
        state.UiModules.push(result)
      }
    },
    SET_ACTIVE_UID (state, val: string) {
      if (state.activeUid !== val) {
        state.activeUid = val
      }
    },
    SET_ACTIVE_PANEL (state, val: number) {
      state.activePanel = val
    }
  },
  actions: {
    async initProject ({ commit }, val: ProjectData): Promise<ProjectData> {
      commit('SET_PROJECT', val)
      return val
    }
  }
})
