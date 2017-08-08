import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf.js';
import * as BooksAPI from '../utils/BooksAPI';

class Main extends Component {
    state = {
        loading: false,
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    // Should return a new array = pure function
    fetchBookByShelf = (shelf = '', books = []) => {
        return books.filter(book => book.shelf === shelf);
    }

    componentDidMount() {
        this.setState({ loading: true });

        BooksAPI.getAll().then((results) => {
            this.setState({
                currentlyReading: this.fetchBookByShelf('currentlyReading', results),
                wantToRead: this.fetchBookByShelf('wantToRead', results),
                read: this.fetchBookByShelf('read', results),
                loading: false
            });
        });
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    { this.state.loading ? (
                        <div>Loading books...</div>
                    ) : (
                        <div>
                            <BookShelf name="Currently Reading" books={this.state.currentlyReading} />
                            <BookShelf name="Want to Read" books={this.state.wantToRead} />
                            <BookShelf name="Read" books={this.state.read} />
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
