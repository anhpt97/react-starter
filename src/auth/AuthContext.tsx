import { createContext } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: null,
  user: null,
  setUser: null,
});
