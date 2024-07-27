import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContextProvider';
import { Box, Heading, Text, Input, Button, FormControl, FormLabel, Image, VStack, Select, flexbox } from '@chakra-ui/react';
import "../styles/main.css";

const osOptions = [
  {
    id: 'ubuntu',
    name: 'Ubuntu',
    description: 'A popular Linux distribution.',
    imageUrl: 'https://example.com/ubuntu.png', // Reemplaza con la URL de la imagen de Ubuntu
  },
  {
    id: 'cirros',
    name: 'Cirros',
    description: 'A lightweight Linux distribution for testing.',
    imageUrl: 'https://example.com/cirros.png', // Reemplaza con la URL de la imagen de Cirros
  },
  {
    id: 'fedora',
    name: 'Fedora',
    description: 'A cutting-edge Linux distribution with latest features.',
    imageUrl: 'https://example.com/fedora.png', // Reemplaza con la URL de la imagen de Fedora
  },
];

const CreateMachine = () => {
    const navigate = useNavigate();
    const { user } = React.useContext(UserContext);

    const [name, setName] = useState('');
    const [flavor, setFlavor] = useState('');
    const [operatingSystem, setOperatingSystem] = useState('');
    const [result, setResult] = useState('');
    const [selectedOS, setSelectedOS] = useState('');

    // Redirección si el usuario no está autenticado
    // useEffect(() => {
    //   if (user === null) {
    //     navigate("/login");
    //   }
    // }, [user, navigate]);

    const handleClick = async () => {
      const response = await fetch('http://localhost:8080/commands/do_command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          flavor,
          operatingSystem,
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
          
          <Box p={5} d='flex' flexDirection='column' alignItems='center' justifyContent='center'>
            <FormControl id='name' mb={3}>
              <FormLabel>Name</FormLabel>
              <Input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>

            <FormControl id='flavor' mb={3}>
              <FormLabel>Flavor</FormLabel>
              <Select placeholder='Select flavor' value={flavor} onChange={(e) => setFlavor(e.target.value)}>
                <option value='small'>Small</option>
                <option value='medium'>Medium</option>
                <option value='large'>Large</option>
              </Select>
            </FormControl>

            <FormLabel mb={3}>Operating System</FormLabel>
            <VStack spacing={4} display="flex" flexDirection="row">
              {osOptions.map((os) => (
                <Box
                  maxWidth={200}
                  maxHeight={150}
                  key={os.id}
                  p={4}
                  borderWidth={2}
                  borderColor={selectedOS === os.id ? 'blue.500' : 'gray.200'}
                  borderRadius='md'
                  boxShadow='md'
                  cursor='pointer'
                  onClick={() => {
                    setSelectedOS(os.id);
                    setOperatingSystem(os.id);
                  }}
                  transition='border-color 0.3s'
                  _hover={{ borderColor: 'blue.300' }}
                >
                  <Image src={os.imageUrl} alt={os.name} objectFit='cover' mb={2} />
                  <Text fontWeight='bold'>{os.name}</Text>
                  <Text fontSize='sm' color='gray.600'>{os.description}</Text>
                </Box>
              ))}
            </VStack>

            <Button colorScheme='blue' onClick={handleClick} mt={4}>Create Machine</Button>
          </Box>

          {result && (
            <Box p={5}>
              <Text fontSize='lg'>{result}</Text>
            </Box>
          )}

          <Box as='footer' w='auto' h='auto' p='10' bgColor="#ffca38">
            <Text textAlign='center' fontSize='sm'>
              DataBeats © 2023
            </Text>
          </Box>
        </Box>
    );
};

export default CreateMachine;
