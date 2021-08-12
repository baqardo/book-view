import React, { Component } from 'react';
import './BookDetails.scss';
import { withRouter } from 'react-router';
import axios from 'axios';

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
    this.getBookDetails().then(res => {
      this.setState(state => ({
        ...state,
        ...res,
      }));
    });
    this.getBookRatings().then(res => {
      this.setState(state => ({
        ...state,
        ...res,
      }));
    });
  }

  async getBookDetails() {
    const id = this.state.id;
    const response = await axios.get(`https://openlibrary.org/works/${id}.json`);
    const data = response.data;

    const bookDetails = {
      cover: `http://covers.openlibrary.org/b/olid/${id}-M.jpg`,
      title: data.title,
      publishDate: data.first_publish_date,
      description: data.description,
      subjects: data.subjects.slice(0, 10),
      loaded: true,
    };

    return bookDetails;
  }

  async getBookRatings() {
    const id = this.state.id;
    const response = await axios.get(`http://localhost:8080/api/v1/books/OLID/${id}`);
    const { data } = response.data;

    const bookRatings = {
      ratingsAverage: data.ratingsAverage,
      ratingsQuantity: data.ratingsQuantity,
      reviews: data.reviews,
    };

    console.log(data);

    return bookRatings;
  }

  render() {
    return (
      this.state.loaded && (
        <div>
          ID: {this.state.id}
          {console.log(this.state)}
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
        </div>
      )
    );
  }
}

export default withRouter(BookDetails);
