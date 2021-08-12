import React, { useEffect } from 'react';
import './BookDetails.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = props => {
  const { id, author } = useParams();
  useEffect(() => {
    getBookDetails(id);
  });

  return <div>Book ID: {id}</div>;
};

const getBookDetails = async id => {
  const response = await axios.get(`https://openlibrary.org/works/${id}.json`);
  const data = response.data;

  const bookDetails = {
    cover: `http://covers.openlibrary.org/b/olid/${id}-M.jpg`,
    title: data.title,
    firstPublishDate: data.first_publish_date,
    description: data.description,
    subjects: data.subjects.slice(0, 10),
  };

  console.log(bookDetails);

  return bookDetails;
};

export default BookDetails;
