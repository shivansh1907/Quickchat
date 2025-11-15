import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../context/context.jsx'
import { chatContextProvider } from '../chatContext/chatContext.jsx'


createRoot(document.getElementById('root')).render(


    <BrowserRouter>
    <AuthProvider>
        <chatContextProvider>
    <App />
    </chatContextProvider>
    </AuthProvider>
    </BrowserRouter>
 

)
