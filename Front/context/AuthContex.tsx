import * as SecureStore from 'expo-secure-store';

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { decodeJWT } from '../utils/decodeJWT.util';

type TokenType = string | null;
type AuthenticatedType = boolean;
type RoleType = 'student' | 'professor' | null; 
type PurposeType = 'password-reset-token' | 'access-token' | null;

interface AuthState {
  token: TokenType; 
  authenticated: AuthenticatedType;
  role: RoleType;
  purpose: PurposeType;
}

interface ITokenPayload {
  id: number,
  role: RoleType,
  purpose: PurposeType,
  iat: number,
  exp: number
}

interface AuthProps {
  authState ?: AuthState;
  onLogin ?: (email:string, password: string) => Promise<any>;
  onLogout ?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = '';

const AuthContext = createContext<AuthProps>({});

const emptyAuthState:AuthState = {
  token: null,
  authenticated: false,
  role: null,
  purpose: null
}

export const AuthProvider = ({children}:{children:ReactNode}) => {
  const [authState, setAuthState] = useState<AuthState>(emptyAuthState);

  useEffect(()=> {
    const loadToken = async () => {
    /*   logout();  */ 
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if(token) {
        const tokenPayload = decodeJWT<ITokenPayload>(token);

        setAuthState({
          token,
          authenticated: true,
          role: tokenPayload.role,
          purpose: tokenPayload.purpose
        });
      }
    }
    loadToken();
  }, []);

  const login = async (email:string, password: string) => {
    try {
      const response = await fetch("http://192.168.1.172:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
      });

      const token = response.headers?.get('Authorization')?.replace('Bearer ','') ?? '';
      const tokenPayload = decodeJWT<ITokenPayload>(token);

      setAuthState({
        token: token,
        authenticated: true,
        role: tokenPayload.role,
        purpose: tokenPayload.purpose
      })

      await SecureStore.setItemAsync(TOKEN_KEY,token);

      return response;
    } catch (err) {
      return { error: true, message: (err as string)}
    }
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setAuthState({
      ...emptyAuthState
    });
  }

  const contextData = {
    onLogin: login,
    onLogout: logout,
    authState
  }
  
  return (
    <AuthContext.Provider value={contextData}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}


/* 
try {
      const response = await fetch("https://api.ejemplo.com/perfil", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, // 🔥 Se envía en los headers
          "Content-Type": "application/json",
        },
      });
*/