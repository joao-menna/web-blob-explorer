import { setUrlPrefix } from '../../functions/setUrlPrefix'
import { DELIMITER } from '../../constants/Breadcrumbs'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import { MainContext } from '../../contexts/main'
import { useContext } from 'react'
import './styles.scss'

export function ExplorerBreadcrumbs() {
  const { currentFolder, setCurrentFolder } = useContext(MainContext)!

  const getFolders = (fullPath: string) => {
    const splitted = fullPath.replace(/\/$/, '').split(DELIMITER)
    return splitted
  }

  const handleBreadcrumbClick = (fullPath: string, folderIndex: number, folderClicked: string) => {
    if (!folderClicked) {
      setUrlPrefix('')
      setCurrentFolder('')
      return
    }

    const splitted = fullPath.split(DELIMITER)
    if (
      folderClicked === splitted.slice(-2)[0] &&
      folderIndex !== splitted.indexOf(folderClicked)
    ) {
      return
    }

    const index = fullPath.indexOf(folderClicked) + 1
    const newPath = fullPath.substring(0, index + folderClicked.length)

    setUrlPrefix(newPath)
    setCurrentFolder(newPath)
  }

  return (
    <Breadcrumbs sx={{ display: 'flex', alignItems: 'center' }}>
      <a
        className='breadcrumb-link'
        onClick={() => handleBreadcrumbClick(currentFolder, 0, '')}
      >
        Raiz
      </a>
      {getFolders(currentFolder).map((val, idx) => (
        <a
          key={val}
          className='breadcrumb-link'
          onClick={() => handleBreadcrumbClick(currentFolder, idx, val)}
        >
          {val}
        </a>
      ))}
    </Breadcrumbs>
  )
}