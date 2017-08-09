import React from 'react';
import BookShelf from './BookShelf.js';

const Main = (props) => (
    <div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
              <BookShelf name="Currently Reading" />
              <BookShelf name="Want to Read" />
              <BookShelf name="Read" />
            </div>
      </div>
      <div className="open-search">
          <a onClick={props.onSearchClicked}>Add a book</a>
      </div>
    </div>
);

export default Main;
