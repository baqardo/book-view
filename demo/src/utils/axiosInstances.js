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
  baseURL:
    'https://openlibrary.org/search.json?q=ddc%3A8*+has_fulltext%3Atrue+AND+first_publish_year%3A%5B2018+TO+9998%5D&limit=30&sort=new&fields=key,title,author_name,first_publish_year,cover_i',
});
