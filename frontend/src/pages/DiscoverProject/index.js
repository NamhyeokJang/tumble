import React, { Component } from 'react';
import qs from 'query-string'

class index extends Component {
    state = {}
    render() {
        console.log(qs.parse(this.props.location.search))
        return (
            <div>
                <h2>discover</h2>
            </div>
        );
    }
}

export default index;