import React, { Component } from 'react';
import Book from './Book.js';

class BooksGrid extends Component {
    // Should return a new array, in other words a pure function
    filterBooksByShelf = (filter = 'all', books = []) => {
        return books.filter(book => filter === 'all' ? true : book.shelf === filter);
    }

    render() {
        const { filter, books, onBookShelfChanged } = this.props;
        const filteredBooks = this.filterBooksByShelf(filter, books);

        return (
            <ol className="books-grid">
                {filteredBooks.map( (book, index) => <Book key={index} data={book} onBookShelfChanged={onBookShelfChanged} /> )}
            </ol>
        );
    }
}

export default BooksGrid;
