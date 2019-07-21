import React, { Component } from 'react';
import './App.css';
import FacebookClient from "./facebookClient/FacebookClient";

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
                        <FacebookClient />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;