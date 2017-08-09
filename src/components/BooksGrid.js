import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Book from './Book.js';

class BooksGrid extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        filter: PropTypes.string.isRequired,
        onBookShelfChanged: PropTypes.func.isRequired
    }

    // Should return a new array, in other words a pure function
    filterBooksByShelf = (filter = 'all', books = []) => {
        return books.filter(book => filter === 'all' ? true : book.shelf === filter);
    }

    render() {
        const { filter, books, onBookShelfChanged } = this.props;
        const filteredBooks = this.filterBooksByShelf(filter, books);

        return (
            <div>
                { !filteredBooks.length ? (
                    <p>No results!</p>
                ) : (
                    <ol className="books-grid">
                        {filteredBooks.map((book, index) => (
                            <Book
                                key={index}
                                data={book}
                                onBookShelfChanged={onBookShelfChanged}
                            />
                        ))}
                    </ol>
                )}
            </div>
        );
    }
}

export default BooksGrid;
