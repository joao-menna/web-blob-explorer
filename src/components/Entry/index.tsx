import PictureAsPdfOutlined from '@mui/icons-material/PictureAsPdfOutlined'
import FolderZipOutlined from '@mui/icons-material/FolderZipOutlined'
import ArticleOutlined from '@mui/icons-material/ArticleOutlined'
import { formatDateTime } from '../../functions/formatDateTime'
import FolderOutlined from '@mui/icons-material/FolderOutlined'
import ImageOutlined from '@mui/icons-material/ImageOutlined'
import { Button, TableCell, TableRow } from '@mui/material'
import { MainContext } from '../../contexts/main'
import { File } from '../../interfaces/Folder'
import { filesize } from 'filesize'
import { useContext } from 'react'
import './styles.scss'
import { Language } from '../../contexts/language'

interface EntryProps {
  blob: File
  onFolderClick: (file: File) => void
}

export function Entry({ blob, onFolderClick }: EntryProps) {
  const { currentFolder, setViewingFile } = useContext(MainContext)!
  const { strings } = useContext(Language)!

  return (
    <TableRow>
      <TableCell>
        {blob.type === 'folder' && <FolderOutlined />}
        {blob.type === 'file' && blob.contentType?.startsWith('image') && <ImageOutlined />}
        {blob.type === 'file' && blob.contentType === 'application/pdf' && <PictureAsPdfOutlined />}
        {blob.type === 'file' && blob.contentType === 'text/plain' && <ArticleOutlined />}
        {blob.type === 'file' && blob.contentType!.indexOf('zip') > -1 && <FolderZipOutlined />}
      </TableCell>
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
      <TableCell>
        {blob.type === 'file' && (
          ['text/plain', 'application/pdf'].includes(blob.contentType!) ||
          blob.contentType?.startsWith('image')
        ) && (
          <Button onClick={() => setViewingFile(blob)}>{strings['open']}</Button>
        )}
      </TableCell>
    </TableRow>
  )
}