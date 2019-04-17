import Vue from 'vue'
import Vuex from 'vuex'
import { ActivePanels } from '@/constants'
import BaseModuleConfig from '../base.module.config'
import { UiNode, UiModule, UiNodeData, ProjectData } from '@megh5/ui/types/core/constants'
import { getPathNode } from '@/utils'
import { deepCopy } from '@mobov/es-helper'
import { ulid } from 'ulid'
import { merge } from 'lodash'

Vue.use(Vuex)

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

export type StateScreen = {
  height: number
  width: number
  scrollHeight: number
}

export type StateActivePanel = 'library' | 'setting' | 'tree' | 'editor'

export type StateUiModules = UiModule[]

export type GetterPageData = UiNode[]

export interface GetterDevice {
  height: number
  width: number
}

export interface MutationSetProject {
  (val: ProjectData): {}
}

export interface MutationSetProjectData {
  (val: KV): {}
}

export interface MutationSetPageData {
  (val: UiNode[]): {}
}

export interface MutationSetUiModule {
  (val: UiModule | UiModule[]): {}
}

export interface MutationSetPageNode {
  (val: UiNodeOpts): {}
}

export interface MutationAddPageNode {
  (val: AddUiNodeOpts): {}
}

export interface MutationSetActiveUid {
  (val: string): {}
}

export interface MutationDelActiveUid {
  (val: string): {}
}

export interface MutationSetActivePanel {
  (val: number): {}
}

export interface ActionInitProject {
  (val: ProjectData): Promise<ProjectData>
}

interface State {
  Project: ProjectData
  UiModules: StateUiModules
  activePanel: number
  activeUid: string
}

const store = new Vuex.Store<State>({
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
    activeUid: '0'
  },
  getters: {
    PageData: (state): GetterPageData => state.Project.UiNodes,
    Device: (state): GetterDevice => state.Project.Device,
    ActiveNode: (state): UiNode => getPathNode(state.activeUid, state.Project.UiNodes)
  },
  mutations: {
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
    },
    ADD_PAGE_NODE (state, val: AddUiNodeOpts) {
      const nodeModule = deepCopy(state.UiModules.find(item => item.name === val.name)) as UiModule
      let pid = val.pid
      if (pid && pid !== state.Project.mainUid) {
        const pNode = getPathNode(pid, state.Project.UiNodes)

        if (pNode.name === 'HView') {
          pid = pNode.uid
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
        locked: false,
        nodeData: { ...nodeModule.nodeData },
        children: []
      }

      const $target = getPathNode(tempNode.pid, state.Project.UiNodes)
      Vue.set($target.children, $target.children.length, tempNode)
      state.activeUid = tempNode.uid
    },
    DEL_PAGE_NODE (state, val: string) {
      const $target = getPathNode(val, state.Project.UiNodes)
      const $parent = getPathNode($target.pid, state.Project.UiNodes)
      const index = $parent.children.findIndex($node => $node.uid === $target.uid)
      Vue.delete($parent.children, index)
      state.activeUid = state.Project.mainUid
    },
    SET_UI_MODULE (state, val: UiModule | UiModule[]) {
      if (val instanceof Array) {
        const result = val.map(item => merge(item, BaseModuleConfig))
        state.UiModules = state.UiModules.concat(result)
      } else {
        const result = merge(val, BaseModuleConfig)
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

export default store
