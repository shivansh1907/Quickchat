import { useState } from 'react'
import { Navigate, Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react'
import { AuthContext } from '../context/context.jsx'

function App() {
  const {authUser,token}=useContext(AuthContext)


  return (
    
    <>

    <div className="bg-[url('./bgImage.svg')] bg-contain">
    <ToastContainer/>



    <Routes>
      <Route path='/' element={authUser?<Home/>:<Navigate to="/login"  />}/>
       <Route path='/login' element={!authUser ? <Login/>: <Navigate to="/" />}/>
        <Route path='/profile' element={authUser? <Profile/>: <Navigate to="/login" />}/>

    </Routes>

    </div>

 

    
      
        
    </>
  )
}

export default App
