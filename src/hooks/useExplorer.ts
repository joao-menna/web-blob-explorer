import { getBlobServiceClient } from '../functions/getBlobServiceClient'
import { BlobItem, BlobPrefix } from '@azure/storage-blob'
import { setUrlPrefix } from '../functions/setUrlPrefix'
import { useContext, useEffect, useState } from 'react'
import { LOCAL, LOCAL_ADDRESS } from '../constants/system'
import { PREFIX } from '../constants/urlSearchParams'
import { DELIMITER } from '../constants/Breadcrumbs'
import { CONTAINER } from '../constants/blobStorage'
import { MainContext } from '../contexts/main'
import { File } from '../interfaces/Folder'

type BlobItemOrPrefix = ({ kind: 'blob' } & BlobItem) | ({ kind: 'prefix' } & BlobPrefix)

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

    let blobServiceClient
    let containerClient
    let response

    if (!LOCAL) {
      blobServiceClient = getBlobServiceClient()
      containerClient = blobServiceClient.getContainerClient(CONTAINER)
    } else {
      const queryPrefix = `prefix=${currentFolder}`
      const query: string[] = []
      if (queryPrefix) query.push(queryPrefix)

      const request = await fetch(`${LOCAL_ADDRESS}/?${query.join('&')}`)
      response = await request.json()
    }

    const filesAndFolders: File[] = []

    const pushFilesAndFolders = (blob: BlobItemOrPrefix) => {
      if (blob.kind === 'prefix') {
        filesAndFolders.push({
          type: 'folder',
          name: blob.name
        })
        return
      }

      if (blob.kind === 'blob') {
        let file: File
        if (!LOCAL) {
          file = {
            type: 'file',
            name: blob.name,
            lastModified: blob.properties.lastModified.toISOString(),
            contentLength: blob.properties.contentLength,
            contentType: blob.properties.contentType
          }
        } else {
          file = {
            type: 'file',
            name: blob.name,
            lastModified: blob.properties.lastModified.toString(),
            contentLength: blob.properties.contentLength,
            contentType: blob.properties.contentType
          }
        }

        filesAndFolders.push(file)
      }
    }

    try {

      if (!LOCAL) {
        const blobsByHierarchy = containerClient!
          .listBlobsByHierarchy('/', { prefix: currentFolder })

        for await (const blob of blobsByHierarchy) {
          pushFilesAndFolders(blob)
        }
      } else {
        for (const blob of response) {
          pushFilesAndFolders(blob)
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