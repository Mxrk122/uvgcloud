import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DataBeatsLogo from '../assets/images/uvgcloudlogo.png'
import { UserContext } from '../context/userContextProvider'
import { 
  Box, 
  Input, 
  Button, 
  Heading, 
  Text, 
  Flex, 
  FormControl, 
  FormLabel, 
  Stack 
} from '@chakra-ui/react'

const LoginPage = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [error, setError] = useState(null);

  // Contexto para adquirir y proveer el usuario a las demás páginas
  const { setUser } = React.useContext(UserContext)
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();

    const user = {
      email,
      password
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (response.ok) {
        const data = await response.json();
        console.log("Registro logrado!");
        setUser(data)
        navigate("/main")
    } else {
        const errorData = await response.json();
        console.log(errorData.detail)
        setError(errorData.detail);
    }
  };

  return (
    <Flex 
      h="100vh" 
      w="100vw" 
      align="center" 
      justify="center" 
      direction="column"
      bgColor="#008F2E"
    >
      <Box w={["100%", "30%"]} p={8} rounded="lg" bg="white" boxShadow="dark-lg">
        <Stack spacing={8}>
          <Box className="login-icon-container" align="center" p={6}>
            <img src={DataBeatsLogo} alt="Data Beats Logo" width="80px" height="80px"/>
            <Heading as="h1" textAlign="center" m={6}>¡Bienvenido a UVGCLOUD!</Heading>
          </Box>
          <FormControl>
            <FormLabel htmlFor="email" fontSize="lg" color="gray.600">Usuario</FormLabel>
            <Input
              type="text"
              id="email"
              placeholder="email"
              onChange={(event) => setEmail(event.target.value)}
              rounded="lg"
              w="100%"
              mt={4}
              bg="gray.200"
              p={4}
              _focus={{ bg: "white", boxShadow: "outline" }}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password" fontSize="lg" color="gray.600">Contraseña</FormLabel>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              rounded="lg"
              w="100%"
              mt={4}
              bg="gray.200"
              p={4}
              _focus={{ bg: "white", boxShadow: "outline" }}
            />
          </FormControl>

          <Button 
            onClick={handleLogin}
            mt={8}
            w="100%"
            variantColor="yellow"
            variant="solid"
            rounded="lg"
            fontSize="lg"
            bg="grey.200"
            _hover={{ bg: "#008F2E", color: "white" }}
            _active={{ bg: "yellow.700" }}>
            Iniciar Sesión
          </Button>
          
          <Text textAlign="center" mt={8} fontSize="sm" color="gray.500">
            ¿Aún no tienes una cuenta? <Link to="/sign-up">Regístrate</Link>
          </Text>

          {error && (
            <Text textAlign="center" mt={2} color="red.500">
              {error}
            </Text>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};

export default LoginPage;
