import { getBlobServiceClient } from '../functions/getBlobServiceClient'
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

    // const blobServiceClient = getBlobServiceClient()
    // const containerClient = blobServiceClient.getContainerClient(CONTAINER)
    // const blobClient = containerClient.getBlobClient(viewingFile.name)

    // const download = await blobClient.download()
    // const downloaded = await download.blobBody

    // temp
    const request = await fetch(`http://localhost:8080/getBlob?name=${viewingFile.name}`)
    const downloaded = await request.blob()

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