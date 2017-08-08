import React, { Component } from 'react';
import Book from './Book.js';

class BooksGrid extends Component {
    // Should return a new array, in other words a pure function
    filterBooksByShelf = (filter = 'all', books = []) => {
        return books.filter(book => filter === 'all' ? true : book.shelf === filter);
    }

    render() {
        const { loading, filter, books, onBookShelfChanged } = this.props;
        const filteredBooks = this.filterBooksByShelf(filter, books);

        return (
            <div>
                { loading ? (
                    <p>Loading books...</p>
                ) : !filteredBooks.length ? (
                    <p>No results!</p>
                ) : (
                    <ol className="books-grid">
                        {filteredBooks.map( (book, index) => <Book key={index} data={book} onBookShelfChanged={onBookShelfChanged} /> )}
                    </ol>
                )}
            </div>
        );
    }
}

export default BooksGrid;
