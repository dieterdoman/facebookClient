import React, {Component} from 'react';
import StringUtil from './utils/StringUtil'

export default class FacebookPosts extends Component {
    constructor(props) {
        super(props);
        let value = "";
        if (props.search)
        {
            value = "*" + StringUtil.escapeRegExp(props.search) + "*";
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

    filterArray(array, expression) {
        const regex = StringUtil.convertWildcardStringToRegExp(expression);
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