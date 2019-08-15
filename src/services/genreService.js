import http from './httpService';
import { baseUrl } from '../config.json';

export const getGenres = () => {
  return http.get(`${baseUrl}/genres`)
}