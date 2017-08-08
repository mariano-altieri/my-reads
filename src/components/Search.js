import React from 'react';
import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid.js';
import BookStore from './BookStore';

class Search extends BookStore {
    handleSubmit = (e) => {
        e.preventDefault();
        this.searchBooks();
    }

    componentDidMount() {
        this.fetchMyReads(false);
    }

    render() {
        const searchedBooks = this.state.searchedBooks;

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

                            {!searchedBooks.length ? (
                                <p>No results.</p>
                            ) : (
                                <BooksGrid filter='all' books={searchedBooks} onBookShelfChanged={this.updateBook} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
};

export default Search;
