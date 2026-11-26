import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'
const Rt = import.meta.env.VITE_PREVIEW ? MemoryRouter : BrowserRouter
createRoot(document.getElementById('root')).render(
  <Rt>
    <App />
  </Rt>
)
