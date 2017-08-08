import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid.js';
import * as BooksAPI from '../utils/BooksAPI';

class Search extends Component {
    state = {
        loading: false,
        updating: false,
        books: [],
        myBooks: [],
        query: '',
        maxResults: 10 // TODO: find out why maxResults isn't working
    }

    updateQuery = (query) => {
        this.setState({ query: query.replace(/^\s+/, '') });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.searchBooks();
    }

    componentDidMount() {
        this.fetchMyBooks();
    }

    fetchMyBooks = () => {
        BooksAPI.getAll().then( myBooks => this.setState({ myBooks }));
    }

    searchBooks = () => {
        const { query, maxResults } = this.state;

        if (!query) return;

        this.setState({ loading: true });

        BooksAPI.search(query, maxResults).then( books => {
            let searchedBooks = books.error ? [] : books;

            /*
             * Mapping the search results with our own Reads to
             * set the proper Book Shelf status
             */
            searchedBooks = searchedBooks.map( sBook => {
                return this.state.myBooks.filter( myBook => myBook.id === sBook.id)[0] || sBook;
            });

            this.setState({
                books: searchedBooks,
                loading: false
            });
        });
    }

    updateBook = (book, shelf) => {
        this.setState({ updating: true });

        BooksAPI.update(book, shelf).then( () => {
            this.setState({
                updating: false,
                books: this.state.books.map( b => {
                    return (b.id !== book.id) ? b : { ...book, shelf };
                })
            });
        });
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Back to Homepage</Link>
                    <div className="search-books-input-wrapper">
                        <form onSubmit={this.handleSubmit}>
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                value={this.state.query}
                                onChange={e => this.updateQuery(e.target.value) }
                            />
                        </form>
                    </div>
                </div>
                <div className="search-books-results">
                    { this.state.loading ? (
                        <div><p>Loading books...</p></div>
                    ) : (
                        <div>
                            {this.state.updating && (<p>Updating...</p>)}
                            {!this.state.books.length ? (
                                <p>No results.</p>
                            ) : (
                                <BooksGrid filter='all' books={this.state.books} onBookShelfChanged={this.updateBook} />
                            )}
                        </div>
                    )}

                </div>
            </div>
        );
    }
};

export default Search;
