import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContextProvider';
import { Box, Heading, Text, Input, Button, FormControl, FormLabel, Image, VStack, Select, Spinner } from '@chakra-ui/react';


const osOptions = [
  {
    id: 'ubuntu',
    name: 'ubuntu',
    description: 'A popular Linux distribution.',
    imageUrl: 'https://example.com/ubuntu.png', // Reemplaza con la URL de la imagen de Ubuntu
  },
  {
    id: 'cirros',
    name: 'cirros',
    description: 'A lightweight Linux distribution for testing.',
    imageUrl: 'https://example.com/cirros.png', // Reemplaza con la URL de la imagen de Cirros
  },
  {
    id: 'fedora',
    name: 'fedora',
    description: 'A cutting-edge Linux distribution.',
    imageUrl: 'https://example.com/fedora.png', // Reemplaza con la URL de la imagen de Fedora
  },
];

const CreateMachine = () => {
    const navigate = useNavigate();
    const { user } = React.useContext(UserContext);

    const [name, setName] = useState('');
    const [flavor, setFlavor] = useState('');
    const [os, setOs] = useState('');
    const [result, setResult] = useState('');
    const [selectedOS, setSelectedOS] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Redirección si el usuario no está autenticado
    useEffect(() => {
      // if (user === null) {
      //   navigate("/login");
      // }
    }, [user, navigate]);

    const handleClick = async () => {
      setIsLoading(true);
      const owner = user.user_id
      try {
        const response = await fetch('http://localhost:8080/cloud_machines/create_machine', {
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
          setResult(data);
          console.log(data);
        } else {
          const errorData = await response.json();
          console.log(errorData.detail);
          setResult(`Error: ${errorData.detail}`);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
        navigate("/main")
      }
    };

    return (
        <Box as='main' w='100%' h='100%' p={5}>
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
          
          <Box p={5} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            <FormControl id='name' mb={3}>
              <FormLabel>Name</FormLabel>
              <Input type='text' value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
            </FormControl>

            <FormControl id='flavor' mb={3}>
              <FormLabel>Flavor</FormLabel>
              <Select placeholder='Select flavor' value={flavor} onChange={(e) => setFlavor(e.target.value)} disabled={isLoading}>
                <option value='m1.small'>Small</option>
                <option value='m1.medium'>Medium</option>
                <option value='m1.large'>Large</option>
              </Select>
            </FormControl>

            <FormLabel mb={3}>Operating System</FormLabel>
            <VStack spacing={4} display="flex" flexDirection="row" flexWrap="wrap" justifyContent='center'>
              {osOptions.map((operativeSystem) => (
                <Box
                  width={200}
                  height={150}
                  key={operativeSystem.id}
                  p={4}
                  borderWidth={2}
                  borderColor={selectedOS === operativeSystem.id ? 'blue.500' : 'gray.200'}
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
                  {/* <Image src={operativeSystem.imageUrl} alt={operativeSystem.name} objectFit='cover' mb={2} /> */}
                  <div className="example-img"></div>
                  <Text fontWeight='bold'>{operativeSystem.name}</Text>
                  <Text fontSize='sm' color='gray.600'>{operativeSystem.description}</Text>
                </Box>
              ))}
            </VStack>

            <Button colorScheme='blue' onClick={handleClick} mt={4} isLoading={isLoading} loadingText="Creating Machine">Create Machine</Button>
          </Box>

          {isLoading && (
            <Box p={5} textAlign='center'>
              <Spinner size='xl' />
              <Text mt={2}>Espere por favor, su máquina está siendo creada</Text>
            </Box>
          )}

          {result && !isLoading && (
            <Box p={5}>
              <Text fontSize='lg'>{result}</Text>
            </Box>
          )}

          {/* <Box as='footer' w='auto' h='auto' p='10' bgColor="#ffca38">
            <Text textAlign='center' fontSize='sm'>
              UVGCLOUD © 2024
            </Text>
          </Box> */}
        </Box>
    );
};

export default CreateMachine;
