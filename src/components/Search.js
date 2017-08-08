import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from 'throttle-debounce';
import BooksGrid from './BooksGrid.js';

class Search extends Component {
    state = {
        query: '',
        maxResults: 10
    }

    handleChange = (e) => {
        const query = (e.target.value).replace(/^\s+/, '');
        this.setState({ query });
        this.doSearch(query);
    }

    doSearch = (query) => {
        this.props.searchBooks(query, this.state.maxResults);
    }

    componentWillMount() {
        this.doSearch = debounce(400, this.doSearch);
    }

    componentDidMount() {
        this.props.fetchMyReads(false);
    }

    render() {
        const { loading, updating, searchedBooks, updateBook } = this.props;
        const { query } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Back to Homepage</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    { loading ? (
                        <div><p>Loading books...</p></div>
                    ) : (
                        <div>
                            {updating && (<p>Updating...</p>)}

                            {!searchedBooks.length ? (
                                <p>No results.</p>
                            ) : (
                                <BooksGrid filter='all' books={searchedBooks} onBookShelfChanged={updateBook} />
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
};

export default Search;
