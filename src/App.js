import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Main from './components/Main';
import Search from './components/Search';

class BooksApp extends React.Component {
    render() {
        return (
            <div className="app">
                <Route path="/" exact component={Main} />
                <Route path="/search" component={Search} />
            </div>
        )
    }
}

export default BooksApp;
