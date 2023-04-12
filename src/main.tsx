import React from 'react'
import ReactDOM from 'react-dom/client'

// app
import { App } from './App'

// styles
import './styles/main.css'

// query
import { queryClient } from './services/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
)
