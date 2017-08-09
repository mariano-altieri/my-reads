import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Bookshelf from './Bookshelf';
import SHELVES from '../constants/Shelves';

class Main extends Component {
    static propTypes = {
        myReads: PropTypes.array.isRequired,
        fetchMyReads: PropTypes.func.isRequired,
        updateBook: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.fetchMyReads();
    }

    render() {
        const { myReads, updateBook } = this.props;

        const bookshelves = SHELVES.map((cat, index) => (
            <Bookshelf
                key={index}
                name={cat.label}
                filter={cat.value}
                books={myReads}
                onBookShelfChanged={updateBook}
            />
        ));

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {bookshelves}
                </div>
                  <div className="open-search">
                      <Link to="/search">Add a book</Link>
                  </div>
            </div>
        );
    }
}

export default Main;
