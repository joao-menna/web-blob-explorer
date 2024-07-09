export interface File {
  type: 'file' | 'folder'
  name: string
  lastModified?: string | undefined
  contentLength?: number | undefined
  contentType?: string | undefined
}