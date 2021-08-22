import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MyBookcase extends Component {
  render() {
    return (
      <div className="my-bookcase">
        <ul>
          Books that I want to read:
          {this.props.wantReadBooks.map(el => (
            <li key={el.OLID}>
              <Link to={`/book/${el.OLID}/author/${el.author}`}>
                <img src={`http://covers.openlibrary.org/b/olid/${el.coverID}-M.jpg`} alt={el.title} />
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          Books that I'm currently reading:
          {this.props.currentlyReadingBooks.map(el => (
            <li key={el.OLID}>
              <Link to={`/book/${el.OLID}/author/${el.author}`}>
                <img src={`http://covers.openlibrary.org/b/olid/${el.coverID}-M.jpg`} alt={el.title} />
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          Books that I have read:
          {this.props.haveReadBooks.map(el => (
            <li key={el.OLID}>
              <Link to={`/book/${el.OLID}/author/${el.author}`}>
                <img src={`http://covers.openlibrary.org/b/olid/${el.coverID}-M.jpg`} alt={el.title} />
              </Link>
            </li>
          ))}
        </ul>
        <ul>
          Books that I liked:
          {this.props.likedBooks.map(el => (
            <li key={el.OLID}>
              <Link to={`/book/${el.OLID}/author/${el.author}`}>
                <img src={`http://covers.openlibrary.org/b/olid/${el.coverID}-M.jpg`} alt={el.title} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    wantReadBooks: state.wantReadBooks,
    currentlyReadingBooks: state.currentlyReadingBooks,
    haveReadBooks: state.haveReadBooks,
    likedBooks: state.likedBooks,
  };
};

export default connect(mapStateToProps)(MyBookcase);
