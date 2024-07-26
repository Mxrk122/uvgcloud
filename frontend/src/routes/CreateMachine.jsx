import React, { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../context/userContextProvider'
import { Box, Heading, Image, Text, Flex, Button, HStack, Radio } from '@chakra-ui/react'
import "../styles/main.css"
//Creamos un main donde se pondrá el array de los vinilos con un formato json
const CreateMachine = () => {
    const navigate = useNavigate()

    const { user } = React.useContext(UserContext)

    const [result, setResult] = useState()

    // busqueda cuando cambia el filtro
    useEffect(() => {
      if (user === null){
        navigate("/login")
      }
    }, [])

    const handleClick = async (event) => {
      const response = await fetch('http://localhost:8080/commands/do_command', {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data)
        console.log(data)
      } else {
          const errorData = await response.json();
          console.log(errorData.detail)
      }
    }

    return (
        <Box as= 'main'
            w='100%'
            h='100%'

        
        >

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
        <h1 className='button' onClick={handleClick}>REalizar comando ls</h1>
      </div>
      <h4>{result}</h4>
      <Box as='footer'
        w='auto'
        h='auto'
        p='10'
        bgColor={"#ffca38"}
      >
        <Text
          textAlign='center'
          fontSize='sm'
        >
          DataBeats © 2023
        </Text>
      </Box>
    </Box>

    )
}

export default CreateMachine