import React from 'react'
import ReactDOM from 'react-dom/client'

// App
import { App } from './App'

// Styles
import './styles/main.css'

// Query
import { queryClient } from './services/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
