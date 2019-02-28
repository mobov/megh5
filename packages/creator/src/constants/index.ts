
export interface ProjectNode {
  tag: string
  uiConfig?: any
  data?: any
  children?: ProjectNode []
}

export interface ProjectData {
  name: string
  version: string,
  dependencies: any,
  ProjectNode: ProjectNode []
}

