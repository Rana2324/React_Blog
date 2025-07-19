import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import router from './Routes/Routes.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster position="bottom-right" toastOptions={{
      duration: 3000,
      style: {
        background: '#333',
        color: '#fff',
      },
      success: {
        style: {
          background: '#4CAF50',
        },
      },
      error: {
        style: {
          background: '#F44336',
        },
      },
    }} />
  </React.StrictMode>
)
