import { useContext } from 'react';
import { AuthContext } from '~/features/auth/cotext/auth-context';

export const useAuth = () => useContext(AuthContext);
