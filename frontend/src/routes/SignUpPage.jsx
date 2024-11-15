import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, FormControl, FormLabel, Input, Button, Flex, Image, Text, InputGroup, InputRightElement } from '@chakra-ui/react'
import DataBeatsLogo from '../assets/images/uvgcloudlogo.png'

const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSignUp = async (event) => {
    event.preventDefault()

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setError('') // Limpiar mensaje de error si todo es válido

    const user = { email, password }
    const response = await fetch(`${backendUrl}/users/create_user/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    const data = await response.json()
    navigate('/login')
  }

  return (
    <Flex 
      h="100vh" 
      w="100vw" 
      align="center" 
      justify="center" 
      bgColor="#008F2E"
    >
      <Box
        bg="white"
        p={6}
        mx="auto"
        maxW="600px"
        borderWidth="1px"
        borderRadius="2xl"
        boxShadow="dark-lg"
      >
        <Flex mb={8} align="center">
          <Image src={DataBeatsLogo} alt="Data Beats Logo" w="100px" mr={6} />
          <Text fontSize="2xl" fontWeight="bold">Sign Up</Text>
        </Flex>
        
        {error && <Text color="red.500" mb={4} textAlign="center">{error}</Text>}
        
        <form onSubmit={handleSignUp}>
          <FormControl mb={8}>
            <FormLabel htmlFor="email" fontSize="lg" color="gray.600">Email</FormLabel>
            <Input
              id="email"
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              rounded="lg"
              w="100%"
              bg="gray.200"
              p={4}
              _focus={{ bg: "white", boxShadow: "outline" }}
            />
          </FormControl>
          
          <FormControl mb={8}>
            <FormLabel htmlFor="password" fontSize="lg" color="gray.600">Password</FormLabel>
            <InputGroup>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                rounded="lg"
                w="100%"
                bg="gray.200"
                p={4}
                _focus={{ bg: "white", boxShadow: "outline" }}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? 'Ocultar' : 'Ver'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl mb={8}>
            <FormLabel htmlFor="confirmPassword" fontSize="lg" color="gray.600">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              rounded="lg"
              w="100%"
              bg="gray.200"
              p={4}
              _focus={{ bg: "white", boxShadow: "outline" }}
            />
          </FormControl>

          <Button 
            type="submit"
            mt={8}
            w="100%"
            variantColor="yellow"
            variant="solid"
            rounded="lg"
            fontSize="lg"
            border="2px solid #008F2E"
            _hover={{ bg: "#008F2E", color: "white" }}
            _active={{ bg: "yellow.700" }}
          >
            Regístrate
          </Button>
        </form>

        <Text textAlign="center" mt={4} fontSize="sm" color="gray.500">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </Text>
      </Box>
    </Flex>
  )
}

export default SignUpPage
