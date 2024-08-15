import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContextProvider';
import { Box, Heading, Text, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, Grid, GridItem, IconButton, VStack, HStack } from '@chakra-ui/react';
import { FaTh, FaList } from 'react-icons/fa';
import "../styles/main.css";

const MainPage = () => {
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);

  const [machines, setMachines] = useState([
    { vm_name: "Machine A", vm_size: "t2.micro", os: "Ubuntu 20.04", status: "running" },
    { vm_name: "Machine B", vm_size: "t3.medium", os: "Windows Server 2019", status: "stopped" },
    { vm_name: "Machine C", vm_size: "m5.large", os: "CentOS 8", status: "running" },
    { vm_name: "Machine D", vm_size: "c5.xlarge", os: "Debian 10", status: "pending" }
  ]);

  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    const fetchMachines = async () => {
        try {
            const response = await fetch(`http://localhost:8080/cloud_machines/get_machines/${user.user_id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }); // <- Cierre del paréntesis aquí
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMachines(data);
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    fetchMachines();
}, [navigate, user])

  const handleClick = () => {
    navigate("/createmachine");
  };

  return (
    <Box as='main' w='100%' h='100%'>
      <Box mt='30px' p='5' d='flex' alignItems='center' justifyContent='center' flexDirection='column'>
        <Heading as='h1' fontSize='3xl' fontWeight='bold' textAlign='center' mb='5'>
          UVG CLOUD
        </Heading>
      </Box>

      <HStack justifyContent="center" mb={5}>
        <Button onClick={handleClick}>Crear Máquina</Button>
        <IconButton icon={<FaList />} onClick={() => setViewMode('list')} aria-label="List View" />
        <IconButton icon={<FaTh />} onClick={() => setViewMode('grid')} aria-label="Grid View" />
      </HStack>

      {viewMode === 'list' ? (
        <Box display="flex" justifyContent="center">
          <TableContainer>
            <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th textAlign="center">Nombre</Th>
                  <Th textAlign="center">Flavor</Th>
                  <Th textAlign="center">Sistema Operativo</Th>
                  <Th textAlign="center">Status</Th>
                  <Th textAlign="center">Options</Th>
                </Tr>
              </Thead>
              <Tbody>
                {machines.map((machine, index) => (
                  <Tr key={index}>
                    <Td>{machine.vm_name}</Td>
                    <Td>{machine.vm_size}</Td>
                    <Td>{machine.os}</Td>
                    <Td>{machine.status}</Td>
                    <Td>
                      <Button mr={2}>Editar</Button>
                      <Button mr={2}>Apagar</Button>
                      <Button>Eliminar</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6} p={5}>
          {machines.map((machine, index) => (
            <GridItem key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" p={5}>
              <VStack>
                <Heading as="h3" size="md">{machine.vm_name}</Heading>
                <Text>Flavor: {machine.vm_size}</Text>
                <Text>OS: {machine.os}</Text>
                <Text>Status: {machine.status}</Text>
                <HStack>
                  <Button size="sm" mr={2}>Editar</Button>
                  <Button size="sm" mr={2}>Apagar</Button>
                  <Button size="sm">Eliminar</Button>
                </HStack>
              </VStack>
            </GridItem>
          ))}
        </Grid>
      )}

      <Box as='footer' w='auto' h='auto' p='10'>
        <Text textAlign='center' fontSize='sm'>
          UVGCLOUD © 2024
        </Text>
      </Box>
    </Box>
  );
}

export default MainPage;