import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

import SHELVES from '../constants/Shelves';

class Main extends Component {
    componentDidMount() {
        this.props.fetchMyReads();
    }

    render() {
        const { loading, updating, myReads, updateBook } = this.props;

        const bookshelves = SHELVES.map((cat, index) => (
            <Bookshelf
                key={index}
                name={cat.label}
                filter={cat.value}
                books={myReads}
                onBookShelfChanged={updateBook}
                loading={loading}
            />
        ));

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    { loading ? (
                        <div><p>Loading books...</p></div>
                    ) : (
                        <div>
                            {updating && (<p>Updating...</p>)}
                            {bookshelves}
                        </div>
                    )}
                </div>
                  <div className="open-search">
                      <Link to="/search">Add a book</Link>
                  </div>
            </div>
        );
    }
}

export default Main;
