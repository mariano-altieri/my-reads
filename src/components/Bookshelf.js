import React from 'react';
import PropTypes from 'prop-types';

import BooksGrid from './BooksGrid.js';

const Bookshelf = (props) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.name}</h2>
        <div className="bookshelf-books">
            <BooksGrid {...props} />
        </div>
    </div>
);

Bookshelf.propTypes = {
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    filter: PropTypes.string.isRequired,
    onBookShelfChanged: PropTypes.func.isRequired
};

export default Bookshelf;
