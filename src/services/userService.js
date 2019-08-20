import http from './httpService';
import { baseUrl } from '../config.json';

export const registrate = ({ email,password,username }) => {
  return http.post(`${baseUrl}/users`, {
    email,
    password,
    name: username
  })
}