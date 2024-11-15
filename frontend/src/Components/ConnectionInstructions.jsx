import React from 'react';
import { IoHelpOutline  } from "react-icons/io5";
import { Box, Button, VStack,Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Text } from '@chakra-ui/react';


const SSHGuide = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button onClick={onOpen} colorScheme="teal">
        <IoHelpOutline />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Guía de Conexión SSH</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Box p={5} borderWidth="1px" borderRadius="lg" w="100%" maxW="500px" margin="auto" mt={8}>
            <VStack spacing={3}>
                <Text>Para conectarte a tu máquina a través de SSH desde la terminal, utiliza el siguiente comando:</Text>
                <Box as="pre" p={4} bg="gray.100" borderRadius="md">
                ssh -p [puerto] [usuario]@[dirección_IP]
                </Box>
                <Text>Ejemplo:</Text>
                <Box as="pre" p={4} bg="gray.100" borderRadius="md">
                ssh -p 2222 uvuntu@123.456.789.1
                </Box>
                <Text>Detalles:</Text>
                <Text>- <b>2222</b>: Es el puerto especificado.</Text>
                <Text>- <b>uvuntu</b>: Es el usuario en la máquina remota. (en UVGClOUD el usuario sera el OS)</Text>
                <Text>- <b>123.456.789.1</b>: Es la dirección IP de la máquina.</Text>
            </VStack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="teal">
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SSHGuide;
