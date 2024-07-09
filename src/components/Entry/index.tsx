import { formatDateTime } from '../../functions/formatDateTime'
import { TableCell, TableRow } from '@mui/material'
import { MainContext } from '../../contexts/main'
import { File } from '../../interfaces/Folder'
import { filesize } from 'filesize'
import { useContext } from 'react'
import './styles.scss'

interface EntryProps {
  blob: File
  onFolderClick: (file: File) => void
}

export function Entry({ blob, onFolderClick }: EntryProps) {
  const { currentFolder } = useContext(MainContext)!

  return (
    <TableRow>
      <TableCell>
        {blob.type === 'folder' ? (
          <a className='folder-link' onClick={() => onFolderClick(blob)}>
            {blob.name.replace(currentFolder, '')}
          </a>
        ) : (
          <a className='file-link' href={`${location.origin}/${blob.name}`}>
            {blob.name.replace(currentFolder, '')}
          </a>
        )}
      </TableCell>
      <TableCell className='last-modified'>
        {blob.type === 'file' && (
          formatDateTime(blob.lastModified!)
        )}
      </TableCell>
      <TableCell className='content-length'>
        {blob.type === 'file' && (
          filesize(blob.contentLength!)
        )}
      </TableCell>
    </TableRow>
  )
}