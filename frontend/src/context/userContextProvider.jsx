import React, { createContext, useState, useEffect } from 'react';

// Crea un contexto para el usuario
const UserContext = createContext({
  user: null,
  setUser: () => {},
});

// Crea un componente que proveerá el contexto a los componentes hijos
const UserProvider = ({ children }) => {
  // El estado para el usuario, inicializado con el valor de localStorage (si existe)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Efecto para guardar el usuario en localStorage cuando cambia
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));  // Guarda en localStorage
    } else {
      localStorage.removeItem('user');  // Elimina del localStorage si no hay usuario
    }
  }, [user]);

  useEffect(() => {
    console.log("información del usuario");
    console.log(user?.user_id);
  }, [user]);

  // Retorna el contexto con el usuario y la función para actualizar el usuario
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider, UserContext };
