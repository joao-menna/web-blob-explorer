import { File } from "../interfaces/Folder"

const SORT = 'desc'

export function sortTable(
  property: keyof File,
  sorting: 'asc' | 'desc',
  items: File[]
) {
  return items.sort((a, b) => {
    if (a.type === 'folder' && b.type === 'folder') {
      const compare = a.name.localeCompare(b.name)
      return sorting === SORT ? compare : -compare
    }

    if (!a[property] || !b[property] || a.type === 'folder' || b.type === 'folder') {
      if (b.type === 'folder') {
        return 1
      }

      return -1
    }

    if (typeof a[property] === 'number' && typeof b[property] === 'number') {
      if (a[property] > b[property]) {
        return sorting === SORT ? 1 : -1
      } else if (a[property] < b[property]) {
        return sorting === SORT ? -1 : 1
      } else {
        return 0
      }
    }

    if (typeof a[property] === 'string' && typeof b[property] === 'string') {
      const compare = a[property].localeCompare(b[property])
      return sorting === SORT ? compare : -compare
    }

    return 0
  })
}