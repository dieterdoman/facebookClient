import React, {Component} from 'react';


export default class FacebookPosts extends Component {
    constructor(props) {
        super(props);
        let value = "";
        if (props.search)
        {
            value = "*" + props.search + "*";
        }
        this.state = {
            error: null,
            isLoaded: false,
            searchValue: value,
            items: []
        };
    }

    componentDidMount() {
        const that = this;
        window.FB.api(
            "/me/feed",
            {limit: 10},
            function (response) {
                that.setState({items: that.filterArray(response.data.filter(n => n.message), that.state.searchValue)});
                that.setState({isLoaded: true});
            }
        );
    }

    escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    convertWildcardStringToRegExp(expression) {
        const terms = expression.split('*');

        let trailingWildcard = false;

        let expr = '';
        for (let i = 0; i < terms.length; i++) {
            if (terms[i]) {
                if (i > 0 && terms[i - 1]) {
                    expr += '.*';
                }
                trailingWildcard = false;
                expr += this.escapeRegExp(terms[i]);
            } else {
                trailingWildcard = true;
                expr += '.*';
            }
        }

        if (!trailingWildcard) {
            expr += '.*';
        }

        return new RegExp('^' + expr + '$', 'i');
    }

    filterArray(array, expression) {
        const regex = this.convertWildcardStringToRegExp(expression);
        return array.filter(function(item) {
            return regex.test(item);
        });
    }

    render() {
        const { items } = this.state;
            return (
                <ul>
                    {items.map(item => (
                        <li>
                            {item.message}
                        </li>
                    ))}
                </ul>
            );
        }
}