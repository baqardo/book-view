import { authorizedQuery, externalBookListQuery, externalBookQuery, query } from './axiosInstances';

export const getExternalBookList = async () => {
  return await externalBookListQuery.get();
};

export const getExternalBook = async id => {
  return await externalBookQuery.get(`${id}.json`);
};

export const getBook = async id => {
  return await query.get(`books/OLID/${id}`);
};

export const postBook = async data => {
  return await authorizedQuery.post('books/autoGenerate', data);
};

export const login = async data => {
  return await authorizedQuery.post('users/login', data);
};

export const restoreSession = async () => {
  return await authorizedQuery.get('users/me');
};

export const logout = async () => {
  return await authorizedQuery.get('users/logout');
};

export const patchPassword = async data => {
  return await authorizedQuery.patch('users/updateMyPassword', data);
};

export const patchUserData = async data => {
  return await authorizedQuery.patch('users/updateMe', data);
};

export const addBookToList = async (bookID, listName) => {
  return await authorizedQuery.patch(`books/${bookID}/users/add${listName}`);
};

export const removeBookFromList = async (bookID, listName) => {
  return await authorizedQuery.patch(`books/${bookID}/users/remove${listName}`);
};

export const postReview = async data => {
  return await authorizedQuery.post(`reviews`, data);
};
