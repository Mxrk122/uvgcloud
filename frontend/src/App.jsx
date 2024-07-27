import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import MainPage from './routes/MainPage'
import LoginPage from './routes/LoginPage'
import SignUpPage from './routes/SignUpPage'
import CreateMachine from './routes/CreateMachine'

const App = () => {
  
  return (<Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/main" element={<MainPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/createmachine" element={<CreateMachine />} />

  </Routes>)
}

export default App
