import { Button } from '@chakra-ui/react';

const CustomButton = ({ children, onClick, ...props }) => {
  return (
    <Button
      mr={2}          // Margen derecho común para todos los botones
      bg="#008F2E"    // Color de fondo común
      color="white"    // Color de texto común
      w={20}
      textAlign="center"
      _hover={{ bg: "#008F2E", transform: "scale(1.05)" }} // Efecto hover común
      onClick={onClick} // Función onClick específica de cada botón
      {...props}       // Permite pasar props adicionales para personalización
    >
      {children}      
    </Button>
  );
};

export default CustomButton;
