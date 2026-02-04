import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './client/styles/base.scss'
import './client/styles/layout.scss'
import './client/styles/components.scss'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
