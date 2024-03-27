import { createContext } from 'react';
import { AuthContextType } from '~/features/auth/cotext/auth-provider';

export const AuthContext = createContext<AuthContextType | null>(null);
