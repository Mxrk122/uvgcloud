import React, { createContext, useState, useEffect } from 'react';

// Crea un contexto para el usuario
const UserContext = createContext({
  user: null,
  setUser: () => {},
});

// Crea un componente que proveerá el contexto a los componentes hijos
const  UserProvider = ({ children }) => {
  // El estado para el usuario
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log("información del usuario")
    console.log(user?.user_id)
    }, [user])

  // Retorna el contexto con el usuario y la función para actualizar el usuario
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export {UserProvider, UserContext}