import React, { Component } from 'react';
import * as BooksAPI from '../utils/BooksAPI';

class BookStore extends Component {
    state = {
        loading: false,
        updating: false,
        myReads: [],
        searchedBooks: [],
        query: '',
        maxResults: 10 // TODO: find out why maxResults isn't working
    }

    fetchMyReads = (showLoader = true) => {
        showLoader && this.setState({ loading: true });
        BooksAPI.getAll().then( myReads => this.setState({ myReads, loading: false }));
    }

    updateBook = (book, shelf) => {
        this.setState({ updating: true });

        BooksAPI.update(book, shelf).then( () => {
            this.setState({
                updating: false,
                myReads: this.state.myReads.map( b => {
                    return (b.id !== book.id) ? b : { ...book, shelf };
                })
            });
        });
    }

    searchBooks = () => {
        const { query, maxResults } = this.state;

        if (!query) return;

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

    updateQuery = (query) => {
        this.setState({ query: query.replace(/^\s+/, '') });
    }

    render() {
        return (
            /*
             * This component is meant to be extended, this is why we leave
             * the render method empty.
             */
            <div />
        );
    }
}

export default BookStore;
