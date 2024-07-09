import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { ROWS_PER_PAGE_KEY } from '../constants/localStorage'
import { File } from '../interfaces/Folder'

interface IMainContext {
  currentFolder: string
  currentPage: number
  loading: boolean
  sorting: 'asc' | 'desc'
  sortingBy: keyof File
  rowsPerPage: number
  viewingFile: File | undefined
  setCurrentFolder: Dispatch<SetStateAction<string>>
  setCurrentPage: Dispatch<SetStateAction<number>>
  setLoading: Dispatch<SetStateAction<boolean>>
  setSorting: Dispatch<SetStateAction<'asc' | 'desc'>>
  setSortingBy: Dispatch<SetStateAction<keyof File>>
  setRowsPerPage: Dispatch<SetStateAction<number>>
  setViewingFile: Dispatch<SetStateAction<File | undefined>>
}

interface ProviderProps {
  children: ReactNode[] | ReactNode | undefined
}

export const MainContext = createContext<IMainContext | undefined>(undefined)

export function MainContextProvider({ children }: ProviderProps) {
  const [currentFolder, setCurrentFolder] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [sorting, setSorting] = useState<'asc' | 'desc'>('desc')
  const [sortingBy, setSortingBy] = useState<keyof File>('name')

  const [rowsPerPage, setRowsPerPage] = useState<number>(() => {
    const value = localStorage.getItem(ROWS_PER_PAGE_KEY)
    if (value) {
      return parseInt(value, 10)
    }

    return 10
  })

  const [viewingFile, setViewingFile] = useState<File | undefined>(undefined)

  const defaultValue: IMainContext = {
    currentFolder,
    currentPage,
    loading,
    sorting,
    sortingBy,
    rowsPerPage,
    viewingFile,
    setCurrentFolder,
    setCurrentPage,
    setLoading,
    setSorting,
    setSortingBy,
    setRowsPerPage,
    setViewingFile
  }

  return (
    <MainContext.Provider value={defaultValue}>
      {children}
    </MainContext.Provider>
  )
}