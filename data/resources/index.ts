import alternatives from './alternatives.json'
import htmlcss from './htmlcss.json'
import webaccessibility from './webaccessibility.json'
import javascript from './javascript.json'
import typescript from './typescript.json'
import react from './react.json'
import reacttypescript from './reacttypescript.json'
import next from './next.json'
import node from './node.json'
import git from './git.json'
import regex from './regex.json'
import neovim from './neovim.json'
import lua from './lua.json'

export type ResourceType =
  | 'course'
  | 'tutorial'
  | 'guide'
  | 'game'
  | 'book'
  | 'example'
  | 'collection'
  | 'series'
  | 'reference'
  | 'community'
  | 'exercise'
  | 'blog'

export interface SerializedResource {
  title: string
  url: string
  type: ResourceType[]
  source?: string
}

export interface Resource {
  title: string
  url: string
  type: ResourceType[]
  source: string
}

export type Resources = {
  [resourceId: string]: SerializedResource
}

const alternateSources = <Resources>alternatives

const resources = <Resources>{
  ...htmlcss,
  ...webaccessibility,
  ...javascript,
  ...typescript,
  ...react,
  ...reacttypescript,
  ...next,
  ...node,
  ...git,
  ...regex,
  ...neovim,
  ...lua,
}

const deserializeResource = (resource: SerializedResource): Resource => ({
  ...resource,
  source:
    resource.source || new URL(resource.url).hostname.replace(/^www./, ''),
})

export { alternateSources, deserializeResource }
export default resources
