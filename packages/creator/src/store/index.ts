/**
 * store应用状态机
 * Created by nocoolyoyo on 2018/2/19.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { ProjectData } from '@/constants'
import BUTTON_BG from '@/assets/btn.png'
import { UiNode, UiModule } from '@megh5/ui/types/core/constants'
import { deepCopy } from '@megmore/es-helper'
import { merge } from 'lodash'

Vue.use(Vuex)

export type StateProject = ProjectData

export type StateScreen = {
  height: number
  width: number
  scrollHeight: number
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

export interface ActionInitProject {
  (val: ProjectData): Promise<ProjectData>
}

interface State {
  Project: StateProject
  Screen: StateScreen
  UiModules: StateUiModules
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
      const Nodes = deepCopy(val)
      merge(state.Project.UiNodes, Nodes)
    },
    ADD_PAGE_NODE (state, val: UiNode[]) {
      const Nodes = deepCopy(val)
      merge(state.Project.UiNodes, Nodes)
    },
    SET_UI_MODULE (state, val: UiModule | UiModule[] ) {
      if (val instanceof Array) {
        state.UiModules = state.UiModules.concat(val)
      } else {
        state.UiModules.push(val)
      }
    },
  },
  actions: {
    async initProject ({ commit }, val: ProjectData): Promise<ProjectData> {
      commit('SET_PROJECT', val)
      return val
    }
  }
})

export default store
