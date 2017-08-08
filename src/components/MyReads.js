import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

class Main extends Component {
    componentDidMount() {
        this.props.fetchMyReads();
    }

    render() {
        const { loading, updating, myReads, updateBook } = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    { loading ? (
                        <div><p>Loading books...</p></div>
                    ) : (
                        <div>
                            {updating && (<p>Updating...</p>)}

                            <Bookshelf name="Currently Reading" filter="currentlyReading" books={myReads} onBookShelfChanged={updateBook} />
                            <Bookshelf name="Want to Read" filter="wantToRead" books={myReads} onBookShelfChanged={updateBook} />
                            <Bookshelf name="Read" filter="read" books={myReads} onBookShelfChanged={updateBook} />
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
