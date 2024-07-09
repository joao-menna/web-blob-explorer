export interface Folder {
  name: string
  files: File[]
}

export interface File {
  type: 'file' | 'folder'
  name: string
  lastModified?: string | undefined
  contentLength?: number | undefined
}