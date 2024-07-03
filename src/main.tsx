import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MovieSearchProvider } from './context/MovieSearchContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MovieSearchProvider>
      <App />
    </MovieSearchProvider>
  </React.StrictMode>,
)
