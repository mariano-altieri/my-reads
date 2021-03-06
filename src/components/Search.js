import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { debounce } from 'throttle-debounce';

import BooksGrid from './BooksGrid.js';

class Search extends Component {
    state = {
        query: '',
        maxResults: 10
    }

    static propTypes = {
        myReads: PropTypes.array.isRequired,
        searchedBooks: PropTypes.array.isRequired,
        fetchMyReads: PropTypes.func.isRequired,
        searchBooks: PropTypes.func.isRequired,
        updateBook: PropTypes.func.isRequired
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
        /*
         * Note that we don't actually perform a search here,
         * we're just wrapping the method with a debounce function
         * for future usage.
         */
        this.doSearch = debounce(400, this.doSearch);
    }

    componentDidMount() {
        this.props.fetchMyReads(false);
        this.textInput.focus();

        // Resetting the component for the first render
        this.props.searchBooks('', this.state.maxResults);
    }

    render() {
        const { searchedBooks, updateBook } = this.props;
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
                            ref={input => this.textInput = input}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <BooksGrid filter='all' books={searchedBooks} onBookShelfChanged={updateBook} />
                </div>
            </div>
        );
    }
};

export default Search;
