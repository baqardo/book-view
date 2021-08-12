import axios from 'axios';
import React, { Component } from 'react';
import Book from '../../components/Book/Book';
import './Home.scss';

class Home extends Component {
  state = { data: null };

  componentDidMount() {
    this.getBooksList()
      .then(res => {
        this.setState({ data: res });
      })
      .catch(err => console.log(err));
  }

  getBooksList = async () => {
    const response = await axios.get('https://openlibrary.org/subjects/literature.json?limit=30');
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
    console.log(data);

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

export default Home;
