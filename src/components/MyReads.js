import React from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';
import BookStore from './BookStore';

class Main extends BookStore {
    componentDidMount() {
        this.fetchMyReads();
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    { this.state.loading ? (
                        <div><p>Loading books...</p></div>
                    ) : (
                        <div>
                            {this.state.updating && (<p>Updating...</p>)}

                            <Bookshelf name="Currently Reading" filter="currentlyReading" books={this.state.myReads} onBookShelfChanged={this.updateBook} />
                            <Bookshelf name="Want to Read" filter="wantToRead" books={this.state.myReads} onBookShelfChanged={this.updateBook} />
                            <Bookshelf name="Read" filter="read" books={this.state.myReads} onBookShelfChanged={this.updateBook} />
                        </div>
                    )}
                </div>
                  <div className="open-search">
                      <Link to="/search">Add a book</Link>
                  </div>
            </div>
        );
    }
}

export default Main;
