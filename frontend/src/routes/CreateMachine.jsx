import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ubuntu from "../assets/images/ubuntu.png"
import cirros from "../assets/images/cirros_logo.jpeg"
import { UserContext } from '../context/userContextProvider';
import { Box, Heading, Text, Input, Button, FormControl, FormLabel, VStack, Select, Spinner, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';

const osOptions = [
  {
    id: 'ubuntu',
    name: 'ubuntu-custom',
    description: 'A popular Linux distribution.',
    imageUrl: ubuntu,
    defaultpw : 'ubuntu'
  },
  {
    id: 'cirros',
    name: 'cirros',
    description: 'A lightweight Linux distribution for testing.',
    imageUrl: cirros,
    defaultpw : 'gocubsgo'
  },
  // {
  //   id: 'fedora',
  //   name: 'fedora',
  //   description: 'A cutting-edge Linux distribution.',
  //   imageUrl: 'https://example.com/fedora.png',
  // },
];

 // Obtén la URL del backend de las variables de entorno
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CreateMachine = () => {
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);

  const [name, setName] = useState('');
  const [flavor, setFlavor] = useState('');
  const [os, setOs] = useState('');
  const [result, setResult] = useState('');
  const [selectedOS, setSelectedOS] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados para el AlertDialog
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const onCloseAlert = () => setIsAlertOpen(false);
  const cancelRef = React.useRef(); // referencia para el botón de cancelar

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleClick = async () => {
    setIsLoading(true);
    const owner = user.user_id;
    try {
      const response = await fetch(`${backendUrl}/cloud_machines/create_machine`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          owner,
          name,
          flavor,
          os,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setResult(data); // Guardas la respuesta completa en `result`
        setIsAlertOpen(true); // Abrir el diálogo cuando se haya creado la máquina
      } else {
        const errorData = await response.json();
        // console.log(errorData.detail);
        setResult(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleNavigate = () => {
    navigate("/main");
  };

  return (
    <Box as='main' w='100%' h='100%' p={5} display="flex" flexDirection="column" alignItems="center">
      <Box
          mt='30px'
          p='5'
          d='flex'
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
      >
        <Heading as='h1' fontSize='3xl' fontWeight='bold' textAlign='center' mb='5'>
            UVG CLOUD
        </Heading>
      </Box>
      
      <Box w="50%" p={5} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
      <FormControl 
        id="name" 
        mb={3} 
      >
        <FormLabel>Name</FormLabel>
        <Input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          disabled={isLoading} 
          borderColor="green" // Borde verde en el Input
          _hover={{ borderColor: "green" }} // Hover
          _focus={{ borderColor: "green", boxShadow: "0 0 0 2px green" }} // Focus
        />
      </FormControl>

      <FormControl 
        id="flavor" 
        mb={3} 
      >
        <FormLabel>Flavor</FormLabel>
        <Select 
          placeholder="Select flavor" 
          value={flavor} 
          onChange={(e) => setFlavor(e.target.value)} 
          disabled={isLoading} 
          borderColor="green" // Borde verde en el Select
          _hover={{ borderColor: "green" }} // Hover
          _focus={{ borderColor: "green", boxShadow: "0 0 0 2px green" }} // Focus
        >
          <option value="m1.small">Small</option>
          <option value="m1.medium">Medium</option>
          <option value="m1.large">Large</option>
        </Select>
      </FormControl>


        <FormLabel mb={3}>Operating System</FormLabel>
        <VStack spacing={4} display="flex" flexDirection="row" flexWrap="wrap" justifyContent='center'>
          {osOptions.map((operativeSystem) => (
            <Box
              width={200}
              height={200}
              key={operativeSystem.id}
              p={4}
              borderWidth={2}
              borderColor={selectedOS === operativeSystem.id ? '#008F2E' : 'gray.200'}
              borderRadius='md'
              boxShadow='md'
              cursor='pointer'
              onClick={() => {
                setSelectedOS(operativeSystem.id);
                setOs(operativeSystem.name);
              }}
              transition='border-color 0.3s'
              _hover={{ borderColor: 'blue.300' }}
              opacity={isLoading ? 0.5 : 1}
              pointerEvents={isLoading ? 'none' : 'auto'}
              display='flex'
              flexDirection='column'
              alignItems='center'
            >
              <img src={operativeSystem.imageUrl} width={50}/>
              <Text fontWeight='bold'>{operativeSystem.name}</Text>
              <Text fontSize='sm' color='gray.600'>{operativeSystem.description}</Text>
              <Text fontSize='sm' color='gray.600'>password: {operativeSystem.defaultpw}</Text>
            </Box>
          ))}
        </VStack>

        <Button
          onClick={handleClick}
          mt={4}
          isLoading={isLoading}
          loadingText="Creating Machine"
          w="200px"
          variantColor="yellow"
          variant="solid"
          rounded="lg"
          fontSize="lg"
          border="2px solid #008F2E"
          _hover={{ bg: "#008F2E", color: "white" }}
          _active={{ bg: "yellow.700" }}>
            Create Machine</Button>
      </Box>

      {isLoading && (
        <Box p={5} textAlign='center'>
          <Spinner size='xl' />
          <Text mt={2}>Espere por favor, su máquina está siendo creada</Text>
        </Box>
      )}

      {/* Alert Dialog para mostrar el resultado */}
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onCloseAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Máquina Creada
            </AlertDialogHeader>

            <AlertDialogBody>
                {result ? (
                  <>
                    Tu máquina ha sido creada exitosamente. <br />
                    ID de la máquina: {result.machine_id} <br />
                    Puerto asignado: {result.port}
                  </>
                ) : (
                  "Tu máquina ha sido creada."
                )}
              </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAlert}>
                Cancelar
              </Button>
              <Button colorScheme="green" onClick={handleNavigate} ml={3}>
                Ir a la página principal
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    </Box>
  );
};

export default CreateMachine;
