import React from 'react';
import Book from './Book.js';

const BooksGrid = (props) => (
    <ol className="books-grid">
        {props.books.map( (book, index) => <Book key={index} data={book} /> )}
    </ol>
);

export default BooksGrid;
