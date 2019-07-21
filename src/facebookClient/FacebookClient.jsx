/* global FB*/
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from "react-bootstrap/Button";
import ReactDOM from 'react-dom';
import SearchComponent from "../searchComponent/SearchComponent";

const limit = 10;
const facebookVersion = 'v2.11';
const appId = '3214880471877150';

export default class FacebookClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
          items: []
        };
        this.checkLoginState = this.checkLoginState.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.getPersonsFacebookFeed = this.getPersonsFacebookFeed.bind(this);
        this.statusChangeCallback = this.statusChangeCallback.bind(this);
    }

    componentDidMount() {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : appId,
                cookie     : true,
                xfbml      : true,
                version    : facebookVersion
            });
            FB.AppEvents.logPageView();
            FB.Event.subscribe('auth.statusChange', function(response) {
                if (response.authResponse) {
                    this.checkLoginState();
                }
            }.bind(this));
        }.bind(this);
        FacebookClient.loadFacebookSDKAsynchronously();
    }

    static loadFacebookSDKAsynchronously(){
        (function(d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = '//connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    getPersonsFacebookFeed() {
        FB.api(
            "/me/feed",
            {limit: limit},
            (response) => this.facebookFeedResponseHandler(response)
        );
    }

    facebookFeedResponseHandler(response) {
        if (this.state.items.length === 0)
        {
            this.setState({items: response.data.filter(n => n.message)});
        }
        const items = this.state.items;
        const elements = <SearchComponent data={items.map(item => item.message)} />;
        ReactDOM.render(elements, document.getElementById('status'));
    }

    statusChangeCallback(response) {
        if (response.status === 'connected') {
            this.getPersonsFacebookFeed();
        } else if (response.status === 'not_authorized') {
            document.getElementById('status').innerHTML = 'Please log into this app.';
        } else {
            document.getElementById('status').innerHTML = 'Please log into Facebook.';
        }
    }

    checkLoginState() {
        FB.getLoginStatus((response) => this.statusChangeCallback(response));
    }

    handleClick() {
        FB.login(this.checkLoginState(), {scope: 'public_profile,user_posts'});
    }

    render() {
        return (
            <main>
                <Container fluid>
                    <h1>
                        Facebook Client Login
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