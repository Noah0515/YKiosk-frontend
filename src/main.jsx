import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 2. App을 감싸주기 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
