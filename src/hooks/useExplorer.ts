import { getBlobServiceClient } from '../functions/getBlobServiceClient'
import { setUrlPrefix } from '../functions/setUrlPrefix'
import { useContext, useEffect, useState } from 'react'
import { PREFIX } from '../constants/urlSearchParams'
import { DELIMITER } from '../constants/Breadcrumbs'
import { MainContext } from '../contexts/main'
import { File } from '../interfaces/Folder'

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

    // const blobServiceClient = getBlobServiceClient()
    // const containerClient = blobServiceClient.getContainerClient(CONTAINER)

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
            contentLength: blob.properties.contentLength,
            contentType: blob.properties.contentType
          }

          filesAndFolders.push(file)
        }
      }

      filesAndFolders.sort((a, b) => {
        if (a.name.endsWith(DELIMITER)) {
          return -1;
        } else if (b.name.endsWith(DELIMITER)) {
          return 1;
        } else {
          return a.name.localeCompare(b.name);
        }
      });


      setBlobs(filesAndFolders)
    } catch (error) {
      console.error('Error listing blobs:', error);
    }

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