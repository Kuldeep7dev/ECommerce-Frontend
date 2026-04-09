import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'remixicon/fonts/remixicon.css'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { SocketProvider } from './socket/SocketProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster
        position='top-right'
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fffff3',
            color: '#10100e',
            padding: '12px 16px',
            border: '1px solid #10100e'
          },
          success: {
            iconTheme: {
              primary: '#10100e',
              secondary: '#fffff3'
            },
          },
          error: {
            style: {
              background: '#10100e',
              color: '#fffff3',
              border: '#10100e'
            },
            iconTheme: {
              primary: '#16A34A',
              secondary: '#ffffff'
            }
          }
        }}
      />
      <AuthProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)