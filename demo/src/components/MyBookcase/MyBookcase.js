import React from 'react';
import { Link } from 'react-router-dom';

const MyBookcase = props => (
  <div className="my-bookcase">
    <ul>
      Books that I want to read:
      {props.booksLists.wantReadBooks.map(el => (
        <li key={el.OLID}>
          <Link to={`/book/${el.OLID}/author/${el.author}`}>
            <img src={`http://covers.openlibrary.org/b/olid/${el.coverID}-M.jpg`} alt={el.title} />
          </Link>
        </li>
      ))}
    </ul>
    <ul>
      Books that I'm currently reading:
      {props.booksLists.currentlyReadingBooks.map(el => (
        <li key={el.OLID}>
          <Link to={`/book/${el.OLID}/author/${el.author}`}>
            <img src={`http://covers.openlibrary.org/b/olid/${el.coverID}-M.jpg`} alt={el.title} />
          </Link>
        </li>
      ))}
    </ul>
    <ul>
      Books that I have read:
      {props.booksLists.haveReadBooks.map(el => (
        <li key={el.OLID}>
          <Link to={`/book/${el.OLID}/author/${el.author}`}>
            <img src={`http://covers.openlibrary.org/b/olid/${el.coverID}-M.jpg`} alt={el.title} />
          </Link>
        </li>
      ))}
    </ul>
    <ul>
      Books that I liked:
      {props.booksLists.likedBooks.map(el => (
        <li key={el.OLID}>
          <Link to={`/book/${el.OLID}/author/${el.author}`}>
            <img src={`http://covers.openlibrary.org/b/olid/${el.coverID}-M.jpg`} alt={el.title} />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default MyBookcase;
