
export interface ProjectNode {
  tag: string
  rootNode?: boolean,
  data?: any
  children?: ProjectNode []
}

export interface ProjectData {
  name: string
  version: string,
  dependencies: any,
  ProjectNode: ProjectNode []
}

