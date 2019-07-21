/* global FB*/
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import ReactDOM from 'react-dom';
import SearchComponent from "./SearchComponent";

export default class FacebookClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: []
        };
        this.checkLoginState = this.checkLoginState.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.testAPI = this.testAPI.bind(this);
        this.statusChangeCallback = this.statusChangeCallback.bind(this);
    }

    componentDidMount() {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '3214880471877150',
                cookie     : true,
                xfbml      : true,
                version    : 'v2.11'
            });
            FB.AppEvents.logPageView();
            FB.Event.subscribe('auth.statusChange', function(response) {
                if (response.authResponse) {
                    this.checkLoginState();
                } else {
                    console.log('---->User cancelled login or did not fully authorize.');
                }
            }.bind(this));
        }.bind(this);

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.
    testAPI() {
        const that = this;
        console.log('Welcome! Fetching your information.... ');
        FB.api(
            "/me/feed",
            {limit: 10},
            function (response) {
                if (that.state.items.length === 0)
                {
                    that.setState({items: response.data.filter(n => n.message)});
                }
                const items = that.state.items;
                const elements = <SearchComponent data={items.map(item => item.message)} />;
                ReactDOM.render(elements, document.getElementById('status'));
            }
        );
    }

    // This is called with the results from from FB.getLoginStatus().
    statusChangeCallback(response) {
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            this.testAPI();
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            document.getElementById('status').innerHTML = 'Please log into this app.';
        } else {
            // The person is not logged into Facebook, so we're not sure if
            // they are logged into this app or not.
            document.getElementById('status').innerHTML = 'Please log into Facebook.';
        }
    }

    checkLoginState() {
        FB.getLoginStatus(function(response) {
            this.statusChangeCallback(response);
        }.bind(this));
    }

    handleClick() {
        FB.login(this.checkLoginState(), {scope: 'public_profile,user_posts'});
    }

    render() {
        return (
            <main>
                <Container fluid>
                    <h1>
                        Facebook Login
                    </h1>
                </Container>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <Button onClick={this.handleClick} onlogin={this.checkLoginState}>Login</Button>
                            <div id="status">
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
        );
    }
}