import { AnonymousCredential, BlobServiceClient } from "@azure/storage-blob"
import { ACCOUNT } from "../constants/blobStorage"

export function getBlobServiceClient() {
  const anonymousCredential = new AnonymousCredential()

  const blobServiceClient = new BlobServiceClient(
    `https://${ACCOUNT}.blob.core.windows.net`,
    anonymousCredential
  )

  return blobServiceClient
}