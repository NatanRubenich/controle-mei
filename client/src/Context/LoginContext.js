import React, { createContext, useState, useContext } from 'react';

const LoginContext = createContext();

// PROVIDER
export default function LoginProvider({ children }) {
  const [logado, setLogado] = useState(false);

  return (
    <LoginContext.Provider
      value={{
        logado,
        setLogado
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

// HOOK
export function useLogin() {
  const context = useContext(LoginContext);
  if (!context) throw new Error("useLogado deve estar dentro de um LoginProvider");
  const { logado, setLogado } = context;
  return { logado, setLogado };
}