import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/home" element={
        <UserProtectedWrapper>
          <Home />
        </UserProtectedWrapper>
      } />

      <Route path="/login" element={<UserLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/user-logout" element={
        <UserProtectedWrapper>
          <UserLogout />
        </UserProtectedWrapper>
      } />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />
      
    </Routes>
  )
}

export default App