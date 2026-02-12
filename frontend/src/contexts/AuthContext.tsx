import { createContext, useContext, useState, type ReactNode } from 'react';

interface AuthContextType {
  isConnected: boolean;
  setIsConnected: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnectedState] = useState(() => {
    const stored = localStorage.getItem('isConnected');
    return stored === 'true';
  });

  const setIsConnected = (value: boolean) => {
    setIsConnectedState(value);
    localStorage.setItem('isConnected', String(value));
  };

  return (
    <AuthContext.Provider value={{ isConnected, setIsConnected }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
