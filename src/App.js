import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import MyReads from './components/MyReads';
import Search from './components/Search';

class BooksApp extends Component {
    render() {
        return (
            <div className="app">
                <Route path="/" exact component={MyReads} />
                <Route path="/search" component={Search} />
            </div>
        )
    }
}

export default BooksApp;
