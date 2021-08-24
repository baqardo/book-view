import axios from 'axios';

export const authorizedQuery = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
  withCredentials: true,
});

export const query = axios.create({
  baseURL: 'http://localhost:8080/api/v1/',
});

export const externalBookQuery = axios.create({
  baseURL: 'https://openlibrary.org/works/',
});

export const externalBookListQuery = axios.create({
  baseURL: 'https://openlibrary.org/subjects/literature.json?limit=30',
});
