import React, { Component, createRef } from 'react';
import './BookDetails.scss';
import { withRouter } from 'react-router';
import * as queries from '../../utils/axiosQueries';
import { updateObject } from '../../utils/utility';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/app';

class BookDetails extends Component {
  constructor(props) {
    super(props);
    const { OLID, author } = this.props.match.params;
    this.state = {
      loading: true,
      saved: false,
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
        id: null,
        ratingsAverage: 4.5,
        ratingsQuantity: 0,
        reviews: [],
        liked: 0,
        wantRead: 0,
        haveRead: 0,
        currentlyReading: 0,
      },
    };

    this.reviewRef = createRef();
    this.ratingRef = createRef();
  }

  async componentDidMount() {
    const externalData = await this.loadExternal();
    const internalData = await this.loadInternal();

    if (!externalData && !internalData) return;

    const newState = {
      ...this.state,
      loading: false,
      externalData: updateObject(this.state.externalData, externalData),
      internalData: updateObject(this.state.internalData, internalData),
    };

    if (internalData) newState.saved = true;

    this.setState(newState);
  }

  async loadExternal() {
    try {
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
    } catch (err) {
      this.props.onExternalError(err);
      return null;
    }
  }

  async loadInternal() {
    try {
      const OLID = this.state.externalData.OLID;
      const response = await queries.getBook(OLID);
      const result = response.data.data;

      const internalData = {
        id: result.id,
        ratingsAverage: result.ratingsAverage,
        ratingsQuantity: result.ratingsQuantity,
        reviews: [...result.reviews],
        liked: result.liked,
        wantRead: result.wantRead,
        haveRead: result.haveRead,
        currentlyReading: result.currentlyReading,
      };

      return internalData;
    } catch (err) {
      this.props.onInternalError(err);
      return null;
    }
  }

  async saveBook() {
    try {
      const { OLID, title, coverID, author } = this.state.externalData;
      const response = await queries.postBook({ OLID, title, coverID, author });
      const result = response.data.data;

      const internalData = {
        id: result.id,
        ratingsAverage: result.ratingsAverage,
        ratingsQuantity: result.ratingsQuantity,
        reviews: [],
        liked: result.liked,
        wantRead: result.wantRead,
        haveRead: result.haveRead,
        currentlyReading: result.currentlyReading,
      };

      this.setState({ saved: true, internalData });
    } catch (err) {
      this.props.onInternalError(err);
    }
  }

  addToList = async listName => {
    if (!this.state.saved) await this.saveBook();
    const { id } = this.state.internalData;
    if (!id) return;

    this.props.onAddBook(id, listName);

    const internalData = { ...this.state.internalData };
    listName = listName.replace('Books', '');
    internalData[listName] = internalData[listName] + 1;

    this.setState({ internalData });
  };

  removeFromList = async listName => {
    if (!this.state.saved) await this.saveBook();
    const { id } = this.state.internalData;
    if (!id) return;

    this.props.onRemoveBook(id, listName);
    listName = listName.replace('Books', '');
    const internalData = { ...this.state.internalData };
    internalData[listName] = internalData[listName] - 1;
    this.setState({ internalData });
  };

  addReview = async () => {
    const review = this.reviewRef.current.value;
    const rating = this.ratingRef.current.value;

    if (!this.state.saved) await this.saveBook();
    const bookID = this.state.internalData.id;
    if (!bookID) return;

    const result = await queries.postReview({ review, rating, book: bookID });
    const data = result.data.data;
    console.log(result);
    const internalData = { ...this.state.internalData };
    internalData.reviews = [...this.state.internalData.reviews];
    internalData.reviews.push(data);
    this.setState({ internalData });
  };

  render() {
    if (this.state.loading) return false;
    const { OLID, author, title, coverID, publishDate, description, subjects } = this.state.externalData;
    const { ratingsAverage, ratingsQuantity, reviews, liked, wantRead, haveRead, currentlyReading } =
      this.state.internalData;

    let reviewElements;
    if (this.props.isAuthenticated)
      reviewElements = (
        <>
          <textarea placeholder="Your review..." name="review" ref={this.reviewRef} />
          <input type="number" min="1" max="5" name="rating" ref={this.ratingRef} />
          <button onClick={this.addReview}>Add Review</button>
        </>
      );

    return (
      <div>
        OLID: {OLID}
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
        Liked: {liked}
        <br />
        Want Read: {wantRead}
        <br />
        Have Read: {haveRead}
        <br />
        Currently Reading: {currentlyReading}
        <br />
        <button onClick={() => this.addToList('likedBooks')}>Add Book to Liked</button>
        <button onClick={() => this.addToList('wantReadBooks')}>Add Book to Want Read</button>
        <button onClick={() => this.addToList('currentlyReadingBooks')}>Add Book to Currently Reading</button>
        <button onClick={() => this.addToList('haveReadBooks')}>Add Book to Have Read</button>
        <br />
        <button onClick={() => this.removeFromList('likedBooks')}>Remove Book to Liked</button>
        <button onClick={() => this.removeFromList('wantReadBooks')}>Remove Book to Want Read</button>
        <button onClick={() => this.removeFromList('currentlyReadingBooks')}>Remove Book to Currently Reading</button>
        <button onClick={() => this.removeFromList('haveReadBooks')}>Remove Book to Have Read</button>
        <br />
        {reviewElements}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onExternalError: err => dispatch(actionCreators.addExternalAsyncError(err)),
    onInternalError: err => dispatch(actionCreators.addInternalAsyncError(err)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(BookDetails));
