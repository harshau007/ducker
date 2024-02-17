import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import NoImage from './components/NoImage'
import WithImage from './components/WithImage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NoImage/>
    <WithImage/>
  </React.StrictMode>,
)
