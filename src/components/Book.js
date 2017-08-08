import React, { Component } from 'react';

class BookState extends Component {
    handleChange = (e) => {
        if (typeof this.props.onBookShelfChanged === 'function') {
            this.props.onBookShelfChanged(this.props.book, e.target.value);
        }
    }

     render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.props.book.shelf} onChange={this.handleChange}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

const Book = (props) => (
    <li>
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.data.imageLinks.thumbnail})` }}></div>
                <BookState book={props.data} onBookShelfChanged={props.onBookShelfChanged} />
            </div>
            <div className="book-title">{props.data.title}</div>
            <div className="book-authors">{props.data.authors[0]}</div>
        </div>
    </li>
);

export default Book;
