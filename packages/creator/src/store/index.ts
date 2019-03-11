import Vue from 'vue'
import Vuex from 'vuex'
import { ProjectData } from '@/constants'
import BUTTON_BG from '@/assets/btn.png'
import { UiNode, UiModule, UiNodeData } from '@megh5/ui/types/core/constants'
import { getPathNode } from '@/utils'
import { deepCopy } from '@megmore/es-helper'
import { merge } from 'lodash'

Vue.use(Vuex)

export interface UiNodeOpts {
  path: string
  nodeData: UiNodeData
}

export type StateProject = ProjectData

export type StateScreen = {
  height: number
  width: number
  scrollHeight: number
}

export type StateActivePanel = 'library' | 'setting' | 'editor'

export enum ActivePanels {
  library = 0,
  setting = 1,
  editor = 2
}


export type StateUiModules = UiModule[]

export type StateSetting = {
  active: string
}

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

export interface MutationSetSettingActive {
  (val: string): {}
}

export interface MutationSetActivePanel {
  (val: StateActivePanel): {}
}

export interface ActionInitProject {
  (val: ProjectData): Promise<ProjectData>
}

interface State {
  Project: StateProject
  Screen: StateScreen
  UiModules: StateUiModules
  Setting: StateSetting
  activePanel: StateActivePanel
}

const store = new Vuex.Store<State>({
  state: {
    Project: {
      name: 'demo',
      version: '0.0.1',
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
    Setting: {
      active: ''
    }
  },
  getters: {
    PageData: (state): GetterPageData => state.Project.UiNodes
  },
  mutations: {
    SET_PROJECT (state, val: ProjectData) {
      state.Project = val
    },
    SET_PAGE_DATA (state, val: UiNode[]) {
      merge(state.Project.UiNodes, val)
    },
    SET_PAGE_NODE (state, val: UiNodeOpts) {
      const $target = getPathNode(val.path, state.Project.UiNodes)
      // Reflect.ownKeys(val.nodeData.props).forEach(prop => {
      //   if (['x', 'y', 'height', 'width'].includes(prop)) {
      //     val[prop] = Number()
      //   }
      //
      // })
      merge($target, val)
    },
    SET_SETTING_ACTIVE (state, val: string) {
      if (state.Setting.active !== val) {
        state.Setting.active = val
      }
    },
    ADD_PAGE_NODE (state, val: UiNode[]) {
      const Nodes = deepCopy(val)
      merge(state.Project.UiNodes, Nodes)
    },
    DEL_PAGE_NODE (state, val: UiNodeOpts) {
      let $target = getPathNode(val.path, state.Project.UiNodes)
      // delete $target
    },
    SET_UI_MODULE (state, val: UiModule | UiModule[]) {
      if (val instanceof Array) {
        state.UiModules = state.UiModules.concat(val)
      } else {
        state.UiModules.push(val)
      }
    },
    SET_ACTIVE_PANEL (state, val: StateActivePanel) {
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
