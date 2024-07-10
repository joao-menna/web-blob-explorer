# Web Blob Explorer
Web Blob Explorer for Azure Storage static pages

## Setup

1. Copy the file `./src/constants/blobStorageExample.ts` to `./src/constants/blobStorage.ts` and fill it with your Azure data.
1. Copy the file `./src/constants/systemExample.ts` to `./src/constants/system.ts` and fill it with the desired values.
1. Put your favicon of choice in the folder `public` as `favicon.ico`.
1. Run `yarn` in the root folder to install the dependencies.
1. Run `yarn dev` to preview the app (optional).
1. Run `yarn build` to build the app for production.
1. Upload the files in the folder `dist/` to Azure Storage.

## Development

1. Follow the Setup for setting up the environment. `blobStorage.ts` won't be used, but has to be created. In `system.ts`, change `LOCAL` to `true`.
1. Setup Azurite using Docker (preferrably).
1. Enter the `local-server` folder using the terminal.
1. Run `npm i` to install the server dependencies.
1. Run the server using `node index.js`.
