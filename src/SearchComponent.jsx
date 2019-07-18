import React, {Component} from 'react';

class SearchComponent extends Component {

    state = {
        query: "",
        data: []
    };

    handleInputChange = event => {
        this.setState({query: event.target.value});
        this.getDate();
    };

    componentDidMount() {
        window.FB.getLoginStatus(response => {
            if (!(response.status === 'connected')) {
                window.FB.login(null, {scope: 'public_profile,user_posts'});
            }
        },);
    }

    getDate = () => {
        const that = this;
        window.FB.api(
            "/me/feed",
            {limit: 10},
            function (response) {
                const data = response.data;
                const { query } = that.state;
                if (data)
                {
                    const filteredData = data.filter(m => m.message).filter(element => {
                        return element.message.toLowerCase().includes(query.toLowerCase());
                    });

                    that.setState({
                        data: filteredData
                    });
                }
            }
        );
    };

    render() {
        const { data } = this.state;
        return (
            <div className="searchForm">
                <form>
                    <input
                        placeholder="Search for..."
                        value={this.state.query}
                        onChange={this.handleInputChange}
                    />
                </form>
                <div>
                    <ul>
                        {data.map(item => (
                            <li>
                                {item.message}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default SearchComponent;