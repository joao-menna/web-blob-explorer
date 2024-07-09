import { LANGUAGE } from '../constants/system'
import { useEffect } from 'react'

export function useLanguage() {
  useEffect(() => {
    document.documentElement.lang = LANGUAGE
  }, [])
}