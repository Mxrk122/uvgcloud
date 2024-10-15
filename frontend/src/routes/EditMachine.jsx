import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContextProvider';
import { Box, Heading, Text, Input, Button, FormControl, FormLabel, Select, Spinner } from '@chakra-ui/react';
import "../styles/main.css";

const EditMachine = () => {
  const { machineId } = useParams(); // Obtener el ID de la máquina desde la URL
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);

  const [originalName, setOriginalName] = useState('');
  const [originalFlavor, setOriginalFlavor] = useState('');
  const [originalOs, setOriginalOs] = useState('');

  const [name, setName] = useState('');
  const [flavor, setFlavor] = useState('');
  const [os, setOs] = useState(''); // OS será solo de lectura
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState('');

  // Redirección si el usuario no está autenticado
  useEffect(() => {
    // if (user === null) {
    //   navigate("/login");
    // }
  }, [user, navigate]);

  useEffect(() => {
    console.log("Machine ID:", machineId); // Verifica si se está obteniendo correctamente el ID
  }, [machineId]);

  // Obtener los datos de la máquina existente
  useEffect(() => {
    const fetchMachineData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cloud_machines/get_machine/${machineId}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setOriginalName(data.vm_name);
          setOriginalFlavor(data.vm_size);
          setOriginalOs(data.os);
        } else {
          console.error('Error fetching machine data');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMachineData();
  }, [machineId]);

  // Manejo de la actualización de los datos de la máquina
  const handleUpdateClick = async () => {
    setIsLoading(true);
    const id = machineId;
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cloud_machines/edit_machine/${machineId}`, {
        method: 'PUT', // O PATCH, dependiendo de la API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          flavor,
          os,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult('Máquina actualizada con éxito');
        console.log(data);
      } else {
        const errorData = await response.json();
        console.log(errorData.detail);
        setResult(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('Error al actualizar la máquina');
    } finally {
      setIsLoading(false);
      navigate("/main");
    }
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
          Editar Máquina
        </Heading>
      </Box>
      
      <Box w="50%" p={5} display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
        {isLoading ? (
          <Spinner size='xl' />
        ) : (
          <>
            <FormControl id='name' mb={3}>
              <FormLabel>Nombre</FormLabel>
              <Input 
                type='text'
                placeholder={originalName + ' (nombre original)'}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading} 
                value={name} 
                borderColor="green" // Borde verde en el Input
                _hover={{ borderColor: "green" }} // Hover
                _focus={{ borderColor: "green", boxShadow: "0 0 0 2px green" }} // Focus
                />
            </FormControl>

            <FormControl id='flavor' mb={3}>
              <FormLabel>Flavor</FormLabel>
              <Select
                placeholder='Select flavor'
                value={originalFlavor}
                onChange={(e) => setFlavor(e.target.value)}
                disabled={isLoading}
                borderColor="green" // Borde verde en el Input
                _hover={{ borderColor: "green" }} // Hover
                _focus={{ borderColor: "green", boxShadow: "0 0 0 2px green" }} // Focus
              >
                <option value='m1.small'>Small</option>
                <option value='m1.medium'>Medium</option>
                <option value='m1.large'>Large</option>
              </Select>
            </FormControl>

            <FormControl id='os' mb={3}>
              <FormLabel>Sistema Operativo (No editable)</FormLabel>
              <Input type='text' value={originalOs} readOnly disabled />
            </FormControl>

            <Button
              onClick={handleUpdateClick}
              mt={4}
              isLoading={isLoading}
              loadingText="Actualizando Máquina"
              border="2px solid #008F2E"
              _hover={{ bg: "#008F2E", color: "white" }}
              _active={{ bg: "yellow.700" }}
            >
              Actualizar Máquina
            </Button>

            {result && (
              <Box p={5}>
                <Text fontSize='lg'>{result}</Text>
              </Box>
            )}
          </>
        )}
      </Box>

      <Box as='footer' w='auto' h='auto' p='10'>
        <Text textAlign='center' fontSize='sm'>
          UVGCLOUD © 2024
        </Text>
      </Box>
    </Box>
  );
};

export default EditMachine;
