import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import MainPage from './routes/MainPage'
import LoginPage from './routes/LoginPage'
import SignUpPage from './routes/SignUpPage'

const App = () => {
  
  return (<Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/main" element={<MainPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/sign-up" element={<SignUpPage />} />

  </Routes>)
}

export default App
