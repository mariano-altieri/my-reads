import React from 'react';
import BooksGrid from './BooksGrid.js';

const BookShelf = (props) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.name}</h2>
        <div className="bookshelf-books">
            <BooksGrid />
        </div>
    </div>
);

export default BookShelf;
