import { useContext, useEffect, useState } from 'react'
import { MainContext } from '../contexts/main'
import { File } from '../interfaces/Folder'
import { setUrlPrefix } from '../functions/setUrlPrefix'
import { PREFIX } from '../constants/urlSearchParams'

export function useExplorer() {
  const [blobs, setBlobs] = useState<File[]>([])
  const {
    currentFolder, setCurrentFolder,
    loading, setLoading,
  } = useContext(MainContext)!

  useEffect(() => {
    if (loading) {
      return
    }

    const prefix = location.search.replace(`?${PREFIX}=`, '')

    if (decodeURIComponent(prefix) !== currentFolder) {
      setCurrentFolder(decodeURIComponent(prefix))
      return
    }

    fetchData(currentFolder)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFolder])

  const fetchData = async (currentFolder: string) => {
    setLoading(true)
    setBlobs([])

    // const anonymousCredential = new AnonymousCredential()

    // const blobServiceClient = new BlobServiceClient(
    //   `https://${account}.blob.core.windows.net`,
    //   anonymousCredential
    // )

    // const containerClient = blobServiceClient.getContainerClient(container)

    // temp
    const queryPrefix = `prefix=${currentFolder}`
    const query: string[] = []
    if (queryPrefix) query.push(queryPrefix)
    const request = await fetch(`http://localhost:8080/?${query.join('&')}`)
    const response = await request.json()

    try {
      const filesAndFolders: File[] = []

      // const blobsByHierarchy = containerClient
      //   .listBlobsByHierarchy('/', { prefix: currentFolder })
      //   .byPage({ maxPageSize: maxPages })

      // for await (const blob of blobsByHierarchy) {
      // temp
      for (const blob of response) {
        if (blob.kind === 'prefix') {
          filesAndFolders.push({
            type: 'folder',
            name: blob.name
          })
          continue
        }

        if (blob.kind === 'blob') {
          const file: File = {
            type: 'file',
            name: blob.name,
            // lastModified: blob.properties.lastModified.toISOString(),
            // temp
            lastModified: blob.properties.lastModified,
            contentLength: blob.properties.contentLength
          }

          filesAndFolders.push(file)
        }
      }

      filesAndFolders.sort((a, b) => {
        if (a.name.endsWith('/')) {
          return -1;
        } else if (b.name.endsWith('/')) {
          return 1;
        } else {
          return a.name.localeCompare(b.name);
        }
      });


      setBlobs(filesAndFolders)
    } catch (error) {
      console.error('Error listing blobs:', error);
    }

    // await containerClient.delete()
    setLoading(false)
  }


  const handleFolderClick = (folder: File) => {
    setCurrentFolder(folder.name)
    setUrlPrefix(folder.name)
  }

  return {
    blobs,
    handleFolderClick
  }
}