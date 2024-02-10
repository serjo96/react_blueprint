import React, {createContext, ReactNode, useContext, useState} from 'react';

// Создание контекста
const LoadingContext = createContext({
  isLoading: false,
  setLoading: (isLoading: boolean) => {}
});

// Провайдер контекста
export const LoadingProvider = ({ children }: {children: ReactNode;}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Хук для использования контекста
export const useLoading = () => useContext(LoadingContext);
