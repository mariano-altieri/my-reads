import React from 'react';

const BookState = (props) => {
    return (
        <select value={props.shelf} onChange={()=> {}}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
        </select>
    );
};

const Book = (props) => (
    <li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.data.imageLinks.thumbnail})` }}></div>
                <div className="book-shelf-changer">
                    <BookState shelf={props.data.shelf} />
                </div>
            </div>
            <div className="book-title">To Kill a Mockingbird</div>
            <div className="book-authors">Harper Lee</div>
        </div>
    </li>
);

export default Book;
