import { createContext, ReactNode, useEffect, useState } from 'react'
import { loadLanguage } from '../functions/loadLanguage'

interface ILanguage {
  language: string
  strings: Record<string, string>
}

export const Language = createContext<ILanguage | undefined>(undefined)

interface ProviderProps {
  children: ReactNode | ReactNode[] | undefined
}

export const LanguageProvider = ({ children }: ProviderProps) => {
  const [strings, setStrings] = useState<Record<string, string>>({})

  useEffect(() => {
    load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document.documentElement.lang])

  const load = async () => {
    const languageValues = await loadLanguage(document.documentElement.lang)
    setStrings(languageValues)
  }

  const defaultValue: ILanguage = {
    language: document.documentElement.lang,
    strings
  }

  return (
    <Language.Provider value={defaultValue}>
      {children}
    </Language.Provider>
  )
}
