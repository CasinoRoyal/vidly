import http from './httpService';
import jwtDecode from 'jwt-decode';
import { baseUrl } from '../config.json';

const tokenKey = 'token';

export const login = (email,password) => {
  return http.post(`${baseUrl}/auth`, {email, password})
    .then(({ data }) => localStorage.setItem(tokenKey, data))
}

export const loginWithJwt = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
}

export const getJwt = () => {
  return localStorage.getItem(tokenKey);
}

export const logout = () => {
  localStorage.removeItem(tokenKey);
}

export const getCurrentUser = () => {
  const token = localStorage.getItem(tokenKey);

    if (token) {
      return jwtDecode(token);
    }
}
