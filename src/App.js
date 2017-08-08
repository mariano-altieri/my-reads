import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';

import Main from './components/Main';
import Search from './components/Search';

class BooksApp extends React.Component {
    state = {
      showSearchPage: false
    }

    toggleSearchStatus = (state = true) => {
      this.setState({ showSearchPage: state });
    }

    render() {
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <Search onSearchClicked={this.toggleSearchStatus} />
                ) : (
                    <Main onSearchClicked={this.toggleSearchStatus} />
                )}
            </div>
        )
    }
}

export default BooksApp;
