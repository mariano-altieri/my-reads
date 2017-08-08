import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf.js';
import * as BooksAPI from '../utils/BooksAPI';

class Main extends Component {
    state = {
        loading: false,
        books: [],
    }

    fetchAllBooks = () => {
        this.setState({ loading: true });

        BooksAPI.getAll().then((books) => {
            this.setState({
                books,
                loading: false
            });
        });
    }

    updateBook = (book, shelf) => {
        BooksAPI.update(book, shelf).then( () => {
            this.setState({
                books: this.state.books.map( b => {
                    return (b.id !== book.id) ? b : { ...book, shelf };
                })
            });
        });
    }

    componentDidMount() {
        this.fetchAllBooks();
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
                            <BookShelf name="Currently Reading" filter="currentlyReading" books={this.state.books} onBookShelfChanged={this.updateBook} />
                            <BookShelf name="Want to Read" filter="wantToRead" books={this.state.books} onBookShelfChanged={this.updateBook} />
                            <BookShelf name="Read" filter="read" books={this.state.books} onBookShelfChanged={this.updateBook} />
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
