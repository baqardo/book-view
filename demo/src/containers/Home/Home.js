import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Book from '../../components/Book/Book';
import './Home.scss';
import * as queries from '../../utils/axiosQueries';

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
    const data = response.data;

    if (response.status !== 200) {
      throw Error('Error');
    }

    const works = data.works.map(work => {
      return {
        OLID: work.key.split('/')[2],
        title: work.title,
        cover: `http://covers.openlibrary.org/b/olid/${work.cover_edition_key}-M.jpg`,
        author: work.authors[0].name,
      };
    });

    return works;
  };

  render() {
    return (
      <main className="home">
        {this.state.data &&
          this.state.data.map(el => (
            <Book key={el.OLID} id={el.OLID} author={el.author} title={el.title} cover={el.cover} />
          ))}
      </main>
    );
  }
}

export default withRouter(Home);
