import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob'
import express from 'express'
import cors from 'cors'

// Default for azurite
const ACCOUNT = 'devstoreaccount1'
const ACCOUNT_KEY = 'Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw=='
const CONTAINER = 'dev'

const server = express()

server.use(express.json())
server.use(cors({
    origin: '*',
    methods: 'GET'
}))

server.get('/', async (req, res) => {
    const { prefix } = req.query

    const credentials = new StorageSharedKeyCredential(ACCOUNT, ACCOUNT_KEY)
    const blobServiceClient = new BlobServiceClient(`http://127.0.0.1:10000/${ACCOUNT}`, credentials)

    const containerClient = blobServiceClient.getContainerClient('dev')

    const blobs = []
    for await (const blob of containerClient.listBlobsByHierarchy('/', { prefix }))
        blobs.push(blob)

    res.json(blobs)
})

server.get('/getBlob', async (req, res) => {
    const { name } = req.query

    const credentials = new StorageSharedKeyCredential(ACCOUNT, ACCOUNT_KEY)
    const blobServiceClient = new BlobServiceClient(`http://127.0.0.1:10000/${ACCOUNT}`, credentials)

    const containerClient = blobServiceClient.getContainerClient(CONTAINER)
    const blobClient = containerClient.getBlobClient(name)

    const downloaded = await blobClient.downloadToBuffer()
    res.send(downloaded)
})

server.listen(8080)
console.log('server running')
