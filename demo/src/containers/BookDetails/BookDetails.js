import React, { Component } from 'react';
import './BookDetails.scss';
import { withRouter } from 'react-router';
import * as queries from '../../utils/axiosQueries';
import { updateObject, removeFields } from '../../utils/utility';

class BookDetails extends Component {
  constructor(props) {
    super(props);
    const { OLID, author } = this.props.match.params;

    this.state = {
      loaded: false,
      inDatabase: false,
      externalData: {
        OLID,
        author,
        title: null,
        coverID: null,
        publishDate: null,
        description: null,
        subjects: [],
      },
      internalData: {
        ratingsAverage: 4.5,
        ratingsQuantity: 0,
        reviews: [],
        likes: 0,
        wantRead: 0,
        haveRead: 0,
        currentlyReading: 0,
      },
    };
  }

  async componentDidMount() {
    const externalData = await this.loadExternalData();
    const internalData = await this.loadInternalData();

    console.log(externalData);

    this.setState(state => ({
      ...state,
      ...internalData,
      externalData: updateObject(state.externalData, externalData),
      loaded: true,
    }));
  }

  async loadExternalData() {
    const OLID = this.state.externalData.OLID;
    const response = await queries.getExternalBook(OLID);
    const result = response.data;

    const externalData = {
      coverID: result.covers[0],
      description: result.description.value || result.description,
      title: result.title,
      publishDate: result.first_publish_date,
      subjects: result.subjects.slice(0, 10),
    };

    return externalData;
  }

  async loadInternalData() {
    try {
      const OLID = this.state.externalData.OLID;
      const response = await queries.getBook(OLID);
      let internalData = updateObject({}, response.data.data);
      internalData = removeFields(internalData, 'id', '_id');

      return { inDatabase: true, internalData };
    } catch (err) {
      return { inDatabase: false };
    }
  }

  putNewBookToAPI = async () => {
    try {
      const { OLID, title, coverID, author } = this.state.externalData;
      const data = { OLID, title, coverID, author };
      await queries.postBook(data);
    } catch (err) {
      console.log(err.response.data.message);
    }
  };

  render() {
    const loaded = this.state.loaded;
    if (!loaded) return false;
    const { OLID, author, title, coverID, publishDate, description, subjects } = this.state.externalData;
    const { ratingsAverage, ratingsQuantity, reviews, likes, wantRead, haveRead, currentlyReading } =
      this.state.internalData;

    return (
      <div>
        ID: {OLID}
        <br />
        Author: {author}
        <br />
        Title: {title}
        <br />
        Cover: {`http://covers.openlibrary.org/b/id/${coverID}-M.jpg`}
        <br />
        Publish Date: {publishDate}
        <br />
        Description: {description}
        <br />
        Subjects:{' '}
        <ul>
          {subjects.map(subject => (
            <li key={subject}>{subject}</li>
          ))}
        </ul>
        Average Ratings: {ratingsAverage}
        <br />
        Ratings Quantity: {ratingsQuantity}
        <br />
        Reviews: <br />
        <ul>
          {reviews.map(review => (
            <li key={review._id}>
              Review: {review.review}
              <br /> Rating: {review.rating}
              <br /> Username: {review.user.name}
              <br /> User Photo: {review.user.photo}
            </li>
          ))}
        </ul>
        Likes: {likes}
        <br />
        Want Read: {wantRead}
        <br />
        Have Read: {haveRead}
        <br />
        Currently Reading: {currentlyReading}
        <br />
        <button onClick={this.putNewBookToAPI}>Add Book</button>
      </div>
    );
  }
}

export default withRouter(BookDetails);
