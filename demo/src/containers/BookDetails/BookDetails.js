import React, { Component } from 'react';
import './BookDetails.scss';
import { withRouter } from 'react-router';
import axios from 'axios';
import AsyncError from '../../utils/asyncError';
import withErrorHandler from '../../hoc/withErrorHandler';

class BookDetails extends Component {
  constructor(props) {
    super(props);
    const { id, author } = this.props.match.params;

    this.state = {
      id,
      author,
      loaded: false,
    };
  }

  componentDidMount() {
    this.loadBookData()
      .then(res => {
        this.setState(state => ({
          ...state,
          ...res,
        }));
      })
      .catch(err => {
        this.props.handleError(err);
      });
  }

  async loadBookData() {
    const bookData = await this.loadBookDataFromExternalAPI();
    const bookAdditionalData = await this.loadBookDataFromInternalAPI();

    return { ...bookData, ...bookAdditionalData };
  }

  async loadBookDataFromExternalAPI() {
    const id = this.state.id;
    const response = await axios.get(`https://openlibrary.org/works/${id}.json`).catch(err => {
      throw new AsyncError(err.response.statusText);
    });
    const data = response.data;
    const coverId = response.data.covers[0];

    const bookDetails = {
      cover: `http://covers.openlibrary.org/b/id/${coverId}-M.jpg`,
      title: data.title,
      publishDate: data.first_publish_date,
      description: data.description,
      subjects: data.subjects.slice(0, 10),
      loaded: true,
    };

    return bookDetails;
  }

  async loadBookDataFromInternalAPI() {
    try {
      const id = this.state.id;
      const response = await axios.get(`http://localhost:8080/api/v1/books/OLID/${id}`);
      const { data } = response.data;

      const bookRatings = {
        ratingsAverage: data.ratingsAverage,
        ratingsQuantity: data.ratingsQuantity,
        reviews: data.reviews,
        likes: data.likedBooksQuantity,
        wantRead: data.wantReadBooksQuantity,
        haveRead: data.haveReadBooksQuantity,
        currentlyReading: data.currentlyReadingBooksQuantity,
      };

      return bookRatings;
    } catch (err) {
      return {
        ratingsAverage: 4.5,
        ratingsQuantity: 0,
        reviews: [],
        likes: 0,
        wantRead: 0,
        haveRead: 0,
        currentlyReading: 0,
      };
    }
  }

  render() {
    return (
      this.state.loaded && (
        <div>
          ID: {this.state.id}
          <br />
          Author: {this.state.author}
          <br />
          Title: {this.state.title}
          <br />
          Cover: {this.state.cover}
          <br />
          Publish Date: {this.state.publishDate}
          <br />
          Description: {this.state.description}
          <br />
          Subjects:{' '}
          <ul>
            {this.state.subjects.map(subject => (
              <li key={subject}>{subject}</li>
            ))}
          </ul>
          Average Ratings: {this.state.ratingsAverage}
          <br />
          Ratings Quantity: {this.state.ratingsQuantity}
          <br />
          Reviews: <br />
          <ul>
            {this.state.reviews.map(review => (
              <li key={review._id}>
                Review: {review.review}
                <br /> Rating: {review.rating}
                <br /> Username: {review.user.name}
                <br /> User Photo: {review.user.photo}
              </li>
            ))}
          </ul>
          Likes: {this.state.likes}
          <br />
          Want Read: {this.state.wantRead}
          <br />
          Have Read: {this.state.haveRead}
          <br />
          Currently Reading: {this.state.currentlyReading}
          <br />
        </div>
      )
    );
  }
}

export default withRouter(withErrorHandler(BookDetails));
