import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const skipLink = document.createElement('a')
skipLink.href = '#main-content'
skipLink.className = 'skip-link'
skipLink.textContent = 'Skip to content'
root.parentNode.insertBefore(skipLink, root)

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
