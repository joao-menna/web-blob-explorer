// import { AnonymousCredential, BlobItem, BlobServiceClient } from '@azure/storage-blob'
// import { ACCOUNT, CONTAINER } from '../../constants/blobStorage'
import { useExplorerTable } from '../../hooks/useExplorerTable'
import { ExplorerBreadcrumbs } from '../ExplorerBreadcrumbs'
import TablePagination from '@mui/material/TablePagination'
import TableContainer from '@mui/material/TableContainer'
import { useExplorer } from '../../hooks/useExplorer'
import { MainContext } from '../../contexts/main'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { TableSorter } from '../TableSorter'
import Table from '@mui/material/Table'
import Box from '@mui/material/Box'
import { useContext } from 'react'
import { Entry } from '../Entry'

export function Explorer() {
  const { rowsPerPage, currentPage } = useContext(MainContext)!
  const { blobs, handleFolderClick } = useExplorer()
  const {
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
    visibleRows
  } = useExplorerTable(blobs)

  return (
    <Box display={'flex'} flexDirection={'column'} gap={2}>
      <Box display={'flex'} alignItems={'center'} padding={3} paddingBottom={0}>
        <ExplorerBreadcrumbs />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSorter onRequestSort={handleRequestSort} sortProperty={'name'}>
                  Arquivo
                </TableSorter>
              </TableCell>
              <TableCell width={160}>
                <TableSorter onRequestSort={handleRequestSort} sortProperty={'lastModified'}>
                  Última modificação
                </TableSorter>
              </TableCell>
              <TableCell width={80}>
                <TableSorter onRequestSort={handleRequestSort} sortProperty={'contentLength'}>
                  Tamanho
                </TableSorter>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((blob) => (
              <Entry key={blob.name} blob={blob} onFolderClick={handleFolderClick} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={blobs.length}
        rowsPerPage={rowsPerPage}
        page={currentPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  )
}