import { MainContextProvider } from './contexts/main.tsx'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainContextProvider>
      <App />
    </MainContextProvider>
  </React.StrictMode>,
)
