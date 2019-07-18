import React, { Component } from 'react';
import './App.css';
import SearchComponent from './SearchComponent';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginStatus: null
        };
    }

    render() {
        return (
            <div className="App">
                <div className="App-intro">
                    <div>
                        <SearchComponent />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;