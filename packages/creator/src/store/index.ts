import Vue from 'vue'
import Vuex from 'vuex'
import { ProjectData } from '@/constants'
import BUTTON_BG from '@/assets/btn.png'
import { UiNode, UiModule, UiNodeData } from '@megh5/ui/types/core/constants'
import { getPathNode } from '@/utils'
import { deepCopy } from '@megmore/es-helper'
import { ulid } from 'ulid'
import { merge } from 'lodash'

Vue.use(Vuex)

export interface UiNodeOpts {
  uid: string
  nodeData: UiNodeData
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

export enum ActivePanels {
  library = 0,
  setting = 1,
  tree = 2,
  editor = 3
}

export type StateUiModules = UiModule[]

export type GetterPageData = UiNode[]

export interface MutationSetProject {
  (val: ProjectData): {}
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
  (val: ActivePanels): {}
}

export interface ActionInitProject {
  (val: ProjectData): Promise<ProjectData>
}

interface State {
  Project: ProjectData
  Screen: StateScreen
  UiModules: StateUiModules
  activePanel: StateActivePanel
  activeUid: string,
}

const store = new Vuex.Store<State>({
  state: {
    Project: {
      name: 'demo',
      version: '0.0.1',
      mainUid: '0',
      dependencies: [],
      UiNodes: []
    },
    UiModules: [],
    Screen: {
      height: 736,
      width: 320,
      scrollHeight: 736
    },
    activePanel: 'library',
    activeUid: '0'
  },
  getters: {
    PageData: (state): GetterPageData => state.Project.UiNodes,
    ActiveNode: (state): UiNode => getPathNode(state.activeUid, state.Project.UiNodes)
  },
  mutations: {
    SET_PROJECT (state, val: ProjectData) {
      state.Project = val
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
      const tempNode: UiNode = {
        name: val.name,
        uid: ulid(),
        pid: state.Project.mainUid,
        nodeData: { ...nodeModule.nodeData },
        children: []
      }
      merge(tempNode, val)

      const $target = getPathNode(tempNode.pid, state.Project.UiNodes)
      Vue.set($target.children, $target.children.length, tempNode)
      console.log(state.Project.UiNodes)
      // state.activeUid = val.uid
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
        state.UiModules = state.UiModules.concat(val)
      } else {
        state.UiModules.push(val)
      }
    },
    SET_ACTIVE_PATH (state, val: string) {
      if (state.activeUid !== val) {
        state.activeUid = val
      }
    },
    SET_ACTIVE_PANEL (state, val: ActivePanels) {
      if (typeof val === 'number') {
        state.activePanel = ActivePanels[val] as StateActivePanel
      } else {
        state.activePanel = val
      }
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
