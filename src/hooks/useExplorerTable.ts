import { ROWS_PER_PAGE_KEY } from '../constants/localStorage'
import { ChangeEvent, useContext, useMemo } from 'react'
import { sortTable } from '../functions/sortTable'
import { MainContext } from '../contexts/main'
import { File } from '../interfaces/Folder'

export function useExplorerTable(blobs: File[]) {
  const {
    sorting, setSorting,
    sortingBy, setSortingBy,
    currentPage, setCurrentPage,
    rowsPerPage, setRowsPerPage
  } = useContext(MainContext)!

  const visibleRows = useMemo(() => (
    sortTable(sortingBy, sorting, blobs).slice(
      currentPage * rowsPerPage,
      currentPage * rowsPerPage + rowsPerPage,
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [sorting, sortingBy, currentPage, rowsPerPage, blobs])

  const handleChangePage = (_: unknown, newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    const newRowsPerPage = parseInt(event.target.value, 10)

    localStorage.setItem(ROWS_PER_PAGE_KEY, newRowsPerPage.toString())
    setRowsPerPage(newRowsPerPage)
    setCurrentPage(0)
  }


  const handleRequestSort = (property: keyof File) => {
    const isAsc = sortingBy === property && sorting === 'asc'
    setSorting(isAsc ? 'desc' : 'asc')
    setSortingBy(property)
  }

  return {
    handleRequestSort,
    handleChangePage,
    handleChangeRowsPerPage,
    visibleRows,
  }
}