import TableSortLabel from '@mui/material/TableSortLabel'
import { MainContext } from '../../contexts/main'
import { File } from '../../interfaces/Folder'
import { useContext } from 'react'

interface TableSorterProps {
  sortProperty: keyof File
  children: string
  onRequestSort: (property: keyof File) => void;
}

export function TableSorter({ sortProperty, children, onRequestSort }: TableSorterProps) {
  const { sorting, sortingBy } = useContext(MainContext)!

  return (
    <TableSortLabel
      active={sortingBy === sortProperty}
      direction={sortingBy === sortProperty ? sorting : 'desc' }
      onClick={() => onRequestSort(sortProperty)}
    >
      {children}
    </TableSortLabel>
  )
}