import React, { Component } from 'react';
import './BookDetails.scss';
import { withRouter } from 'react-router';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as queries from '../../utils/axiosQueries';

class BookDetails extends Component {
  constructor(props) {
    super(props);
    const { id, author } = this.props.match.params;

    this.state = {
      id,
      author,
      loaded: false,
      coverId: null,
      cover: null,
      title: null,
      publishDate: null,
      description: null,
      subjects: null,
      ratingsAverage: 4.5,
      ratingsQuantity: 0,
      reviews: [],
      likes: 0,
      wantRead: 0,
      haveRead: 0,
      currentlyReading: 0,
      inDataBase: false,
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
    const response = await queries.getExternalBook(id);
    const data = response.data;
    const coverId = response.data.covers[0];
    const description = data.description.value || data.description;

    const bookDetails = {
      cover: `http://covers.openlibrary.org/b/id/${coverId}-M.jpg`,
      coverId,
      title: data.title,
      publishDate: data.first_publish_date,
      description: description,
      subjects: data.subjects.slice(0, 10),
      loaded: true,
    };

    return bookDetails;
  }

  async loadBookDataFromInternalAPI() {
    try {
      const id = this.state.id;
      const response = await queries.getBook(id);
      const { data } = response.data;

      const bookRatings = {
        ratingsAverage: data.ratingsAverage,
        ratingsQuantity: data.ratingsQuantity,
        reviews: data.reviews,
        likes: data.likedBooksQuantity,
        wantRead: data.wantReadBooksQuantity,
        haveRead: data.haveReadBooksQuantity,
        currentlyReading: data.currentlyReadingBooksQuantity,
        inDataBase: true,
      };

      return bookRatings;
    } catch (err) {
      return { inDataBase: false };
    }
  }

  putNewBookToAPI = async () => {
    try {
      const id = this.state.id;
      const data = { OLID: id, title: this.state.title, coverID: this.state.coverId, author: this.state.author };
      await queries.postBook(data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

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
          <button onClick={this.putNewBookToAPI}>Add Book</button>
        </div>
      )
    );
  }
}

export default withRouter(withErrorHandler(BookDetails));
