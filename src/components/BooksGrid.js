import React, { Component } from 'react';
import Book from './Book.js';

class BooksGrid extends Component {
    // Should return a new array, in other words a pure function
    filterBooksByShelf = (filter = 'all', books = []) => {
        return books.filter(book => filter === 'all' ? true : book.shelf === filter);
    }

    render() {
        const filteredBooks = this.filterBooksByShelf(this.props.filter, this.props.books);

        return (
            <ol className="books-grid">
                {filteredBooks.map( (book, index) => <Book key={index} data={book} onBookShelfChanged={this.props.onBookShelfChanged} /> )}
            </ol>
        );
    }
}

export default BooksGrid;
