import React from 'react';
import './Book.scss';
import { Link } from 'react-router-dom';

const Book = props => (
  <Link to={`/book/${props.id}/author/${props.author}`}>
    <img src={props.cover} alt={props.title} />
  </Link>
);

export default Book;
