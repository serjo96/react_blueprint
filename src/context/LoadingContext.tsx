import React, {createContext, ReactNode, useContext, useState} from 'react';

// Создание контекста
const LoadingContext = createContext({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

// Провайдер контекста
export const LoadingProvider = ({ children }: {children: ReactNode;}) => {
  const [isLoading, setIsLoading] = useState(false);
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, stopLoading, startLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Хук для использования контекста
export const useLoading = () => useContext(LoadingContext);
