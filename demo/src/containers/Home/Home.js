import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './Home.scss';
import * as queries from '../../utils/axiosQueries';
import BookList from '../../components/BookList/BookList';

class Home extends Component {
  state = { data: null };

  componentDidMount() {
    this.props.history.replace('/');

    this.getBooksList()
      .then(res => {
        this.setState({ data: res });
      })
      .catch(err => console.log(err));
  }

  getBooksList = async () => {
    const response = await queries.getExternalBookList();
    const data = response.data.docs;

    if (response.status !== 200) {
      throw Error('Error');
    }

    const works = data.map(work => {
      return {
        OLID: work.key.split('/')[2],
        title: work.title,
        cover: `http://covers.openlibrary.org/b/id/${work.cover_i}-M.jpg`,
        author: work.author_name[0],
        year: work.first_publish_year,
      };
    });

    return works;
  };

  render() {
    return <main className="home">{this.state.data && <BookList books={this.state.data} />}</main>;
  }
}

export default withRouter(Home);
