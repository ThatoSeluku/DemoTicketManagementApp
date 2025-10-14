import React from 'react'
import ReactDOM from 'react-dom/client'
import TicketManagementApp from './App.jsx'
import './global.css' // 👈 include the reset BEFORE anything else

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TicketManagementApp />
  </React.StrictMode>
)
