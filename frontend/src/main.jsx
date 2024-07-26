import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { UserProvider } from './context/userContextProvider'
import { ChakraProvider } from '@chakra-ui/react'

const root = document.getElementById('root')
const reactRoot = ReactDOM.createRoot(root)

reactRoot.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ChakraProvider>
        <App />
        </ChakraProvider>
      </UserProvider>  
    </BrowserRouter>
  </React.StrictMode>
)
