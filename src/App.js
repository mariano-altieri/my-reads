import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';
import * as BooksAPI from './utils/BooksAPI';
import MyReads from './components/MyReads';
import Search from './components/Search';
import Feedback from './components/Feedback';

class BooksApp extends Component {
    state = {
        loading: false,
        updating: false,
        myReads: [],
        searchedBooks: []
    }

    fetchMyReads = (showLoader = true) => {
        showLoader && this.setState({ loading: true });
        BooksAPI.getAll().then( myReads => this.setState({ myReads, loading: false }));
    }

    updateBookCollection = (stateName, book, shelf) => {
        return this.state[stateName].map( b => (b.id !== book.id) ? b : { ...book, shelf });
    }

    updateBook = (book, shelf) => {
        this.setState({ updating: true });

        BooksAPI.update(book, shelf).then( () => {
            this.setState({
                updating: false,
                myReads: this.updateBookCollection('myReads', book, shelf),
                searchedBooks: this.updateBookCollection('searchedBooks', book, shelf)
            });
        });
    }

    searchBooks = (query = '', maxResults = 10) => {
        if (!query) {
            this.setState({ searchedBooks: [] });
            return;
        };

        this.setState({ loading: true });

        BooksAPI.search(query, maxResults).then( books => {
            let searchedBooks = books.error ? [] : books;

            /*
             * Mapping the search results with our own Reads to
             * set the proper Book Shelf status
             */
            searchedBooks = searchedBooks.map( sBook => {
                return this.state.myReads.filter( myBook => myBook.id === sBook.id)[0] || sBook;
            });

            this.setState({
                searchedBooks,
                loading: false
            });
        });
    }

    render() {
        return (
            <div className="app">
                <Feedback loading={this.state.loading} updating={this.state.updating} />
                <Route path="/" exact render={() => (
                    <MyReads
                        myReads={this.state.myReads}
                        fetchMyReads={this.fetchMyReads}
                        updateBook={this.updateBook}
                    />
                )} />
                <Route path="/search" render={() => (
                    <Search
                        myReads={this.state.myReads}
                        searchedBooks={this.state.searchedBooks}
                        fetchMyReads={this.fetchMyReads}
                        updateBook={this.updateBook}
                        searchBooks={this.searchBooks}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp;
