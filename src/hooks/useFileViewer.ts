import { getBlobServiceClient } from '../functions/getBlobServiceClient'
import { LOCAL, LOCAL_ADDRESS } from '../constants/system'
import { CONTAINER } from '../constants/blobStorage'
import { MainContext } from '../contexts/main'
import { useContext, useEffect } from 'react'

export function useFileViewer() {
  const { viewingFile, setViewingFile } = useContext(MainContext)!

  useEffect(() => {
    if (!viewingFile) {
      return
    }

    getBlob()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewingFile])

  const getBlob = async () => {
    if (!viewingFile) {
      return
    }

    let downloaded

    if (!LOCAL) {
      try {
        const blobServiceClient = getBlobServiceClient()
        const containerClient = blobServiceClient.getContainerClient(CONTAINER)
        const blobClient = containerClient.getBlobClient(viewingFile.name)

        const download = await blobClient.download()
        downloaded = await download.blobBody
      } catch (err) {
        console.error('Error downloading blob', err)
      }
    }

    if (LOCAL) {
      try {
        const request = await fetch(`${LOCAL_ADDRESS}/getBlob?name=${viewingFile.name}`)
        downloaded = await request.blob()
      } catch (err) {
        console.error('Error downloading blob', err)
      }
    }

    if (!downloaded) {
      return
    }

    const url = URL.createObjectURL(new Blob([downloaded], { type: viewingFile.contentType }))
    window.open(url, '_blank')
    setTimeout(() => {
      URL.revokeObjectURL(url)
      setViewingFile(undefined)
    }, 100);
  }
}