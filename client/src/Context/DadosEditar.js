import React, { createContext, useState, useContext } from 'react';

const EditarContext = createContext();

// PROVIDER
export default function DadosEditarProvider({ children }) {
  const [dadosEditar, setDadosEditar] = useState({});

  return (
    <EditarContext.Provider
      value={{
        dadosEditar,
        setDadosEditar
      }}
    >
      {children}
    </EditarContext.Provider>
  );
}

// HOOK
export function useDadosEditar() {
  const context = useContext(EditarContext);
  if (!context) throw new Error("useLogado deve estar dentro de um EditarContext.Provider");
  const { dadosEditar, setDadosEditar } = context;
  return { dadosEditar, setDadosEditar };
}