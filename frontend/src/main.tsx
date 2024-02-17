import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import NoImage from './components/NoImage.tsx'
import WithImage from './components/WithImage.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NoImage/>
    <WithImage/>
  </React.StrictMode>,
)
