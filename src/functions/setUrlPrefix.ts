import { PREFIX } from '../constants/urlSearchParams'

export function setUrlPrefix(folderName: string) {
  const url = new URL(location.href)
  url.searchParams.set(PREFIX, folderName)

  if (!folderName) {
    url.searchParams.delete(PREFIX)
  }

  history.pushState({}, "", url)
}