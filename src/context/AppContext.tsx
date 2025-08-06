import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppContextType = {
  username: string;
  setUsername: (name: string) => void;
  // Add more global state as needed (e.g., answers, result, etc.)
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState('');

  return (
    <AppContext.Provider value={{ username, setUsername }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
