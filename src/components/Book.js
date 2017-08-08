import React, { Component } from 'react';
import SHELVES from '../constants/Shelves';

class BookState extends Component {
    handleChange = (e) => {
        if (typeof this.props.onBookShelfChanged === 'function') {
            this.props.onBookShelfChanged(this.props.book, e.target.value);
        }
    }

     render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.props.book.shelf || 'none'} onChange={this.handleChange}>
                    <option value="" disabled>Move to...</option>
                    {SHELVES.map((cat, index) => (
                        <option key={index} value={cat.value}>{cat.label}</option>
                    ))}
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

class Book extends Component {
    render() {
        const data = this.props.data;
        const { title, authors = [], imageLinks } = data;
        const thumbnail = imageLinks && imageLinks.thumbnail;

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${thumbnail})` }}
                        ></div>
                        <BookState book={data} onBookShelfChanged={this.props.onBookShelfChanged} />
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors[0]}</div>
                </div>
            </li>
        );
    }
}

export default Book;
