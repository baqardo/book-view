import React from 'react';
import './Book.scss';
import { Link } from 'react-router-dom';

const Book = ({ data }) => (
  <Link to={`/book/${data.OLID}/author/${data.author}`}>
    <img src={data.cover} alt={`${data.title} ${data.year}`} />
  </Link>
);

export default Book;
