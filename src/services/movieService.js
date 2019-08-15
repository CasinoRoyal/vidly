import http from './httpService';
import { baseUrl } from '../config.json';

export const getMovies = () => {
  return http.get(`${baseUrl}/movies`)
}

export const getMovie = (id) => {
  return http.get(`${baseUrl}/movies/${id}`);
}

export const saveMovie = (movie) => {
  if (movie._id) {
    const body = {...movie};
    delete body._id;
    return http.put(`${baseUrl}/movies/${movie._id}`, body);
  }

  return http.post(baseUrl, movie);
}

export const deleteMovie = (id) => {
  return http.delete(`${baseUrl}/movies/${id}`)
}
