import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Box, FormControl, FormLabel, Input, Button, Flex, Image, Text } from '@chakra-ui/react'
import DataBeatsLogo from '../assets/images/DataBeatsLogo.png'


const SignUpPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const handleSignUp = async (event) => {
    event.preventDefault()
    if (password === confirmPassword) {

      const user = {
        email,
        password
      }

      const response = await fetch('http://localhost:8080/users/create_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
      const data = await response.json()
      
      console.log(data)
      navigate('/login')
    } else {
      console.log('passwords do not match')
    }
  }

  return (
    
    <Flex 
      h="100vh" 
      w="100vw" 
      align="center" 
      justify="center" 
      bgColor="#ffca38"
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
        <Image src={DataBeatsLogo} alt="Data Beats Logo" w={"100px"} mr={6} />
        <Text fontSize="2xl" fontWeight="bold">
          Sign Up
        </Text>
      </Flex>
      <form>
        <FormControl mb={8}>
          <FormLabel htmlFor="email" fontSize="lg" color="gray.600">email</FormLabel>
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
          <Input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        rounded="lg"
        w="100%"
        bg="gray.200"
        p={4}
        _focus={{ bg: "white", boxShadow: "outline" }}
        
      />
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
    onClick={handleSignUp}
    mt={1}
    w="100%"
    variantColor="yellow"
    variant="solid"
    rounded="lg"
    fontSize="lg"
    bg="grey.200"
    _hover={{ bg: "yellow.500" }}
    _active={{ bg: "yellow.700" }}>
      Regístrate
    </Button>
    </form>
    <Text textAlign="center" mt={4} fontSize="sm" color="gray.500">
    ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
    </Text>
    </Box>
  </Flex>
    
  );
};

export default SignUpPage;
