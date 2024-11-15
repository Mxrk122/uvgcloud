import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContextProvider';
import { Box, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Grid, GridItem, IconButton, VStack, HStack, Spinner } from '@chakra-ui/react';
import { FaTh, FaList, FaStop } from 'react-icons/fa';
import { IoReloadCircleSharp } from "react-icons/io5";
import { MdEdit, MdDelete  } from "react-icons/md";
import { FaCopy } from "react-icons/fa6";
import CustomButton from '../Components/CustomButton';
import NoMachinesLogo from '../assets/images/error.png'
import SSHGuide from '../Components/ConnectionInstructions';
import { Tooltip } from '@chakra-ui/react';

const MainPage = () => {
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);
  const [machines, setMachines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // UI
  const isEmpty = machines.length === 0;

  const machines_example = [
    { vm_name: "Machine A", vm_size: "t2.micro", os: "ubuntu", status: "running", port: "6666" },
    { vm_name: "Machine B", vm_size: "t3.medium", os: "windowsserver", status: "stopped" },
    { vm_name: "Machine C", vm_size: "m5.large", os: "ubuntu", status: "running" },
    { vm_name: "Machine D", vm_size: "c5.xlarge", os: "debian", status: "pending" }
  ]

  const getPasswordByOS = (os) => {
    switch (os.toLowerCase()) {
      case 'ubuntu':
        return 'ubuntu';
      case 'cirros':
        return 'gocubsgo';
      default:
        return 'default_password'; // Contraseña predeterminada para otros sistemas operativos
    }
  };

  // Redirección si el usuario no está autenticado
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);

  const [viewMode, setViewMode] = useState('list');

  // Obtén la URL del backend de las variables de entorno
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchMachines = async () => {
        try {
            const response = await fetch(`${backendUrl}/cloud_machines/get_machines/${user.user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMachines(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setMachines([]);
        }
    };

    fetchMachines();
}, [navigate, user, backendUrl]);

  const handleCreateMachine = () => {
    navigate("/createmachine");
  };

  const handleEditMachine = (machineId) => {
    navigate(`/edit-machine/${machineId}`);
  };

  const handleDeleteMachine = async (machineId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta máquina?");
    
    if (confirmDelete) {
      setIsLoading(true);
      try {
        const response = await fetch(`${backendUrl}/cloud_machines/delete_machine/${machineId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Error al eliminar la máquina');
        }
        // Actualizar la lista de máquinas filtrando la eliminada
        setMachines(machines.filter((machine) => machine.id !== machineId));
      } catch (error) {
        console.error('Hubo un problema con la operación de eliminación:', error);
      }
      setIsLoading(false);
    }
  };

  const handleRebootMachine = async (machineId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas reiniciar esta máquina?");
    
    if (confirmDelete) {
      setIsLoading(true);
      try {
        const response = await fetch(`${backendUrl}/cloud_machines/reboot_machine/${machineId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Error al reiniciar la máquina');
        }
      } catch (error) {
        console.error('Hubo un problema con la operación de reinicio:', error);
      }
      setIsLoading(false);
    }
  };

  // copiar y pegar automatico
  const copyToClipboard = (os, port) => {
    const sshCommand = `ssh ${os}@192.168.244.4 -p ${port}`;
    navigator.clipboard.writeText(sshCommand)
      .then(() => {
        toast({
          title: "Comando copiado",
          description: "El comando SSH se ha copiado al portapapeles.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => console.error('Error al copiar al portapapeles:', err));
  };

  return (
    <Box as='main' w='100%' h='100%' display='flex' flexDirection='column' alignItems='center'
    justifyContent='center'>
      <Box mt='30px' p='5' d='flex' alignItems='center' justifyContent='center' flexDirection='column'>
        <Heading as='h1' fontSize='3xl' fontWeight='bold' textAlign='center' mb='5'>
          UVG CLOUD
        </Heading>
      </Box>

      <HStack justifyContent="center" alignItems="center" mb={5} opacity={isLoading ? 0.5 : 1}
        pointerEvents={isLoading ? 'none' : 'auto'}>
        <CustomButton w='fit-content' onClick={handleCreateMachine} disabled={isLoading}>Crear Máquina</CustomButton>
        <Tooltip label="Vista de lista" fontSize="md">
          <IconButton icon={<FaList />} onClick={() => setViewMode('list')} aria-label="List View" />
        </Tooltip>

        <Tooltip label="Vista de cards" fontSize="md">
          <IconButton icon={<FaTh />} onClick={() => setViewMode('grid')} aria-label="Grid View" />
        </Tooltip>

        <Tooltip label="Guia de conexión" fontSize="md">
          <IconButton icon={<SSHGuide />} aria-label="Guide" />
        </Tooltip>

      </HStack>

      {isLoading && (
            <Box p={5} textAlign='center'>
              <Spinner size='xl' />
              <Text mt={2}>Cargando operacion</Text>
            </Box>
          )}
      
      {isEmpty ? (
        <div className='no-machines'>
          <img src={NoMachinesLogo} alt="No hay uvgcloudmachines creadas" width="500px" height="500px"/>
          <p>No hay maquinas asociadas a tu cuenta :(</p>
        </div>
      ) : (
        <>
          {viewMode === 'list' ? (
          <Box display="flex" justifyContent="center" w="100%" overflowX="auto" opacity={isLoading ? 0.5 : 1}
              pointerEvents={isLoading ? 'none' : 'auto'}>
          <TableContainer overflowX="auto" maxWidth="100%">
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th textAlign="center">Nombre</Th>
                  <Th textAlign="center">Flavor</Th>
                  <Th textAlign="center">Sistema Operativo</Th>
                  <Th textAlign="center">Password default</Th>
                  <Th textAlign="center">Dirección y puerto asignado</Th>
                  <Th textAlign="center">Options</Th>
                </Tr>
              </Thead>
              <Tbody>
                {machines.map((machine, index) => (
                  <Tr key={index}>
                    <Td>{machine.vm_name}</Td>
                    <Td>{machine.vm_size}</Td>
                    <Td>{machine.os}</Td>
                    <Td textAlign="center">{getPasswordByOS(machine.os)}</Td>
                    <Td>
                      <Text>{machine.os}@192.168.244.4 {machine.port}</Text>
                    </Td>
                    <Td>
                      <CustomButton fontSize={25} onClick={() => handleEditMachine(machine.id)} disabled={isLoading}>
                        <MdEdit />
                      </CustomButton>
                      <CustomButton fontSize={25} onClick={() => handleRebootMachine(machine.id)}>
                        <IoReloadCircleSharp />
                      </CustomButton>
                      <CustomButton fontSize={25} onClick={() => handleDeleteMachine(machine.id)}>
                        <MdDelete />
                      </CustomButton>
                      <Tooltip label="Copiar comando ssh" fontSize="md" >
                        <IconButton icon={<FaCopy />} onClick={() => copyToClipboard(machine.os, machine.port)}/>
                      </Tooltip>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        
        ) : (
          <Grid className="machines-grid" templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6} p={5}>
            {machines.map((machine, index) => (
              <GridItem className="machine-grid" key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
                <VStack>
                  <Heading as="h3" size="md">{machine.vm_name}</Heading>
                  <Text>Flavor: {machine.vm_size}</Text>
                  <Text>OS: {machine.os}</Text>
                  <Text>PW: {getPasswordByOS(machine.os)}</Text>
                  <Text>{machine.os}@123.456.789.10 {machine.port}</Text>
                  
                  <HStack width='100%' alignItems='center' justifyContent='center'>
                    
                    <CustomButton width={20} fontSize={25} onClick={() => handleEditMachine(machine.id)}><MdEdit /></CustomButton>
                    <CustomButton width={20} fontSize={25}><IoReloadCircleSharp  /></CustomButton>
                    <CustomButton width={20} fontSize={25} onClick={() => handleDeleteMachine(machine.id)}><MdDelete /></CustomButton>
                    <Tooltip label="Copiar comando ssh" fontSize="md">
                      <IconButton icon={<FaCopy />} onClick={() => copyToClipboard(machine.os, machine.port)}/>
                    </Tooltip>
                  </HStack>
                </VStack>
              </GridItem>
            ))} 
          </Grid>
        )}
        </>
      )}

      <Box as='footer' w='auto' h='auto' p='10'>
        <Text textAlign='center' fontSize='sm'>
          UVGCLOUD
        </Text>
      </Box>
    </Box>
  );
};

export default MainPage;
