import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
import { Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button } from '@chakra-ui/react'
import "../styles/main.css"
//Creamos un main donde se pondrá el array de los vinilos con un formato json
const MainPage = () => {
    const navigate = useNavigate()

    const { user } = React.useContext(UserContext)

    const [machines, setMachines] = React.useState([
      {
        name: "Machine A",
        flavor: "t2.micro",
        operatingSystem: "Ubuntu 20.04",
        status: "running"
      },
      {
        name: "Machine B",
        flavor: "t3.medium",
        operatingSystem: "Windows Server 2019",
        status: "stopped"
      },
      {
        name: "Machine C",
        flavor: "m5.large",
        operatingSystem: "CentOS 8",
        status: "running"
      },
      {
        name: "Machine D",
        flavor: "c5.xlarge",
        operatingSystem: "Debian 10",
        status: "pending"
      }
    ])

    // llamar a las vms disponibles
    // useEffect(() => {
    //   if (user === null){
    //     navigate("/login")
    //   }
    // }, [])

    const handleClick = async (event) => {
      // Mandar a pedir las máquinas
      // const response = await fetch('http://localhost:8080/cloud_machines/do_command/', {
      //   method: 'GET',
      // });

      //  Example


      navigate("/createmachine")
    }
    

    return (
    <Box as= 'main'
      w='100%'
      h='100%'>

        <Box
            mt='30spx'
            p='5'
            d='flex'
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
        >
          <Heading as='h1'
              fontSize='3xl'
              fontWeight='bold'
              textAlign='center'
              mb='5'
              >
                  UVG CLOUD 
              </Heading>
        </Box>
      <div className='selections'>
        <h1 className='button' onClick={handleClick}>crear máquina</h1>
      </div>
      <Box display="flex" justifyContent="center">
        <TableContainer>
          <Table variant='simple'>
              <Thead>
                <Tr>
                  <Th textAlign="center">Nombre</Th>
                  <Th textAlign="center">Flavor</Th>
                  <Th textAlign="center">Sistema Operativo</Th>
                  <Th textAlign="center">status</Th>
                  <Th textAlign="center">options</Th>
                </Tr>
              </Thead>
            <Tbody>
            {machines.map((machine, index) => (
                
                <Tr key={index}>
                  <Td>{machine.name}</Td>
                  <Td>{machine.flavor}</Td>
                  <Td>{machine.operatingSystem}</Td>
                  <Td>{machine.status}</Td>
                  <Td>
                    <Button>editar</Button>
                    <Button>apagar</Button>
                    <Button>eliminar</Button>
                  </Td>
                </Tr>
                
            ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box as='footer'
          w='auto'
          h='auto'
          p='10'
          bgColor={"green"}
        >
          <Text
            textAlign='center'
            fontSize='sm'
          >
            UVGCLOUD © 2024
          </Text>
        </Box>
    </Box>

    )
}

export default MainPage