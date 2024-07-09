import { LanguageProvider } from './contexts/language.tsx'
import { MainContextProvider } from './contexts/main.tsx'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LanguageProvider>
      <MainContextProvider>
        <App />
      </MainContextProvider>
    </LanguageProvider>
  </React.StrictMode>,
)
